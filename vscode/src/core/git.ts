import simpleGit, { SimpleGit, SimpleGitOptions } from 'simple-git';
import * as path from 'path';
import * as fs from 'fs/promises';
import * as os from 'os';
import { Agent } from '../providers/base';

/**
 * Git repository information
 */
export interface GitRepoInfo {
	url: string;
	branch: string;
	localPath: string;
}

/**
 * Rules and agents from repository
 */
export interface RepoContent {
	rules: string;
	agents: Agent[];
	workflows?: any[];
}

/**
 * Git service for cloning and pulling repositories
 */
export class GitService {
	private git: SimpleGit;
	private repoCache: Map<string, string> = new Map();

	constructor() {
		const options: Partial<SimpleGitOptions> = {
			baseDir: process.cwd(),
			binary: 'git',
			maxConcurrentProcesses: 6,
		};
		this.git = simpleGit(options);
	}

	/**
	 * Clone or pull a repository
	 * @param repoUrl Repository URL
	 * @param branch Branch to checkout
	 * @param token Optional authentication token
	 * @returns Local path to the repository
	 */
	async ensureRepo(repoUrl: string, branch: string = 'main', token?: string): Promise<string> {
		const repoKey = `${repoUrl}#${branch}`;
		
		// Check cache first
		if (this.repoCache.has(repoKey)) {
			const cachedPath = this.repoCache.get(repoKey)!;
			try {
				await fs.access(cachedPath);
				// Pull latest changes
				await this.pullLatest(cachedPath, branch);
				return cachedPath;
			} catch {
				// Cache invalid, remove it
				this.repoCache.delete(repoKey);
			}
		}

		// Clone or update repository
		const localPath = await this.cloneOrPull(repoUrl, branch, token);
		this.repoCache.set(repoKey, localPath);
		
		return localPath;
	}

	/**
	 * Clone repository or pull if already exists
	 */
	private async cloneOrPull(repoUrl: string, branch: string, token?: string): Promise<string> {
		const repoName = this.getRepoName(repoUrl);
		const localPath = path.join(os.tmpdir(), 'vibekit', repoName);

		try {
			// Check if repo already exists
			await fs.access(path.join(localPath, '.git'));
			
			// Repo exists, pull latest
			console.log(`[Git] Pulling latest from ${repoUrl}`);
			await this.pullLatest(localPath, branch);
			
			return localPath;
		} catch {
			// Repo doesn't exist, clone it
			console.log(`[Git] Cloning ${repoUrl} to ${localPath}`);
			
			// Ensure parent directory exists
			await fs.mkdir(path.dirname(localPath), { recursive: true });
			
			// Add token to URL if provided
			const urlWithAuth = token ? this.addTokenToUrl(repoUrl, token) : repoUrl;
			
			await this.git.clone(urlWithAuth, localPath, ['--branch', branch, '--single-branch']);
			
			return localPath;
		}
	}

	/**
	 * Pull latest changes
	 */
	private async pullLatest(localPath: string, branch: string): Promise<void> {
		const git = simpleGit(localPath);
		await git.checkout(branch);
		await git.pull('origin', branch);
		console.log(`[Git] Pulled latest changes for branch ${branch}`);
	}

	/**
	 * Read rules and agents from repository
	 */
	async readRepoContent(localPath: string): Promise<RepoContent> {
		const content: RepoContent = {
			rules: '',
			agents: []
		};

		// Try to read rules from multiple possible locations
		const rulesPaths = [
			'.cursorrules',
			'.windsurfrules',
			'.antigravity/rules/vibekit.md',
			'rules/vibekit.md'
		];

		for (const rulesPath of rulesPaths) {
			try {
				const fullPath = path.join(localPath, rulesPath);
				content.rules = await fs.readFile(fullPath, 'utf-8');
				console.log(`[Git] Found rules at ${rulesPath}`);
				break;
			} catch {
				// Try next path
			}
		}

		// Try to read agents from multiple possible locations
		const agentsPaths = [
			'.cursor/agents',
			'.windsurf/agents',
			'.antigravity/agents',
			'.windsurfcascade/agents'
		];


		for (const agentsPath of agentsPaths) {
			try {
				const fullPath = path.join(localPath, agentsPath);
				const agentFiles = await fs.readdir(fullPath);
				
				for (const file of agentFiles) {
					if (file.endsWith('.md')) {
						const filePath = path.join(fullPath, file);
						const agentContent = await fs.readFile(filePath, 'utf-8');
						
						content.agents.push({
							name: path.basename(file, '.md'),
							description: '',
							content: agentContent
						});
					}
				}
				
				if (content.agents.length > 0) {
					console.log(`[Git] Found ${content.agents.length} agents at ${agentsPath}`);
					break;
				}
			} catch {
				// Try next path
			}
		}

		return content;
	}

	/**
	 * Extract repository name from URL
	 */
	private getRepoName(url: string): string {
		// Handle GitHub shorthand (user/repo)
		if (/^[\w-]+\/[\w-]+$/.test(url)) {
			return url.replace('/', '-');
		}

		// Extract from full URL
		const match = url.match(/\/([^\/]+?)(\.git)?$/);
		return match ? match[1] : 'unknown-repo';
	}

	/**
	 * Add authentication token to Git URL
	 */
	private addTokenToUrl(url: string, token: string): string {
		if (url.startsWith('https://')) {
			return url.replace('https://', `https://${token}@`);
		}
		return url;
	}

	/**
	 * Clear repository cache
	 */
	clearCache(): void {
		this.repoCache.clear();
	}

	/**
	 * Get cached repository path
	 */
	getCachedPath(repoUrl: string, branch: string = 'main'): string | undefined {
		return this.repoCache.get(`${repoUrl}#${branch}`);
	}
}
