import * as vscode from 'vscode';
import * as fs from 'fs/promises';
import * as path from 'path';
import { BaseProvider, SyncResult, Agent, ProviderCapabilities } from './base';

/**
 * Provider for Windsurf editor (by Codeium)
 * https://codeium.com/windsurf
 */
export class WindsurfProvider extends BaseProvider {
	readonly name = 'windsurf';
	readonly displayName = 'Windsurf';
	readonly capabilities: ProviderCapabilities = {
		supportsRules: true,
		supportsAgents: true,
		supportsWorkflows: false,
		supportsMemory: false
	};

	/**
	 * Detect if running in Windsurf editor
	 */
	detect(): boolean {
		const appName = vscode.env.appName.toLowerCase();
		return appName.includes('windsurf') || appName.includes('codeium');
	}

	/**
	 * Get path to Windsurf rules file
	 */
	getRulesPath(): string {
		const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
		if (!workspaceFolder) {
			throw new Error('No workspace folder open');
		}
		return path.join(workspaceFolder.uri.fsPath, '.windsurfrules');
	}

	/**
	 * Get path to Windsurf cascade directory
	 */
	getCascadePath(): string {
		const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
		if (!workspaceFolder) {
			throw new Error('No workspace folder open');
		}
		return path.join(workspaceFolder.uri.fsPath, '.windsurfcascade');
	}

	/**
	 * Get path to agents directory (using cascade)
	 */
	getAgentsPath(): string {
		return path.join(this.getCascadePath(), 'agents');
	}

	/**
	 * Sync rules to .windsurfrules file
	 */
	async syncRules(content: string): Promise<SyncResult> {
		try {
			const rulesPath = this.getRulesPath();
			
			// Backup existing file if it exists
			try {
				await fs.access(rulesPath);
				const backupPath = `${rulesPath}.backup`;
				await fs.copyFile(rulesPath, backupPath);
				console.log(`[Windsurf] Backed up existing rules to ${backupPath}`);
			} catch {
				// File doesn't exist, no backup needed
			}

			// Write new rules
			await fs.writeFile(rulesPath, content, 'utf-8');
			console.log(`[Windsurf] Synced rules to ${rulesPath}`);

			return this.createSuccessResult([rulesPath]);
		} catch (error) {
			const errorMsg = error instanceof Error ? error.message : String(error);
			console.error(`[Windsurf] Failed to sync rules: ${errorMsg}`);
			return this.createErrorResult([errorMsg]);
		}
	}

	/**
	 * Sync agents to cascade directory
	 */
	async syncAgents(agents: Agent[]): Promise<SyncResult> {
		try {
			const agentsPath = this.getAgentsPath();
			const filesWritten: string[] = [];

			// Ensure agents directory exists
			await fs.mkdir(agentsPath, { recursive: true });

			// Write each agent as a separate file
			for (const agent of agents) {
				const fileName = `${agent.name.toLowerCase().replace(/\s+/g, '-')}.md`;
				const filePath = path.join(agentsPath, fileName);
				
				// Format agent content for Windsurf
				const agentContent = this.formatAgentContent(agent);
				
				await fs.writeFile(filePath, agentContent, 'utf-8');
				filesWritten.push(filePath);
				console.log(`[Windsurf] Synced agent: ${fileName}`);
			}

			return this.createSuccessResult(filesWritten);
		} catch (error) {
			const errorMsg = error instanceof Error ? error.message : String(error);
			console.error(`[Windsurf] Failed to sync agents: ${errorMsg}`);
			return this.createErrorResult([errorMsg]);
		}
	}

	/**
	 * Format agent content for Windsurf
	 */
	private formatAgentContent(agent: Agent): string {
		let content = `# ${agent.name}\n\n`;
		
		if (agent.description) {
			content += `> ${agent.description}\n\n`;
		}

		if (agent.trigger) {
			content += `**Command:** \`${agent.trigger}\`\n\n`;
		}

		content += `---\n\n${agent.content}`;
		
		return content;
	}

	/**
	 * Validate Windsurf configuration
	 */
	async validateConfig(): Promise<boolean> {
		try {
			const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
			if (!workspaceFolder) {
				return false;
			}

			// Check if we can write to workspace
			const testPath = path.join(workspaceFolder.uri.fsPath, '.vibekit-test');
			await fs.writeFile(testPath, 'test', 'utf-8');
			await fs.unlink(testPath);

			return true;
		} catch {
			return false;
		}
	}

	/**
	 * Get Windsurf-specific setup instructions
	 */
	getSetupInstructions(): string {
		return `Configure VibeKit for Windsurf:\n\n` +
			`1. Open your project in Windsurf\n` +
			`2. Set your Git repository URL in VibeKit settings\n` +
			`3. Run "VibeKit: Sync Rules & Agents"\n\n` +
			`Your rules will be synced to: .windsurfrules\n` +
			`Your agents will be synced to: .windsurfcascade/agents/\n\n` +
			`After syncing, Windsurf will automatically use these rules and agents.`;
	}
}
