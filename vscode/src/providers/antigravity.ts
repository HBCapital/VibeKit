import * as vscode from 'vscode';
import * as fs from 'fs/promises';
import * as path from 'path';
import { BaseProvider, SyncResult, Agent, ProviderCapabilities } from './base';

/**
 * Provider for Antigravity editor (Google)
 * Uses .agent/ directory structure
 */
export class AntigravityProvider extends BaseProvider {
	readonly name = 'antigravity';
	readonly displayName = 'Antigravity';
	readonly capabilities: ProviderCapabilities = {
		supportsRules: true,
		supportsAgents: true,
		supportsWorkflows: true,
		supportsMemory: true
	};

	/**
	 * Detect if running in Antigravity editor
	 */
	detect(): boolean {
		const appName = vscode.env.appName.toLowerCase();
		return appName.includes('antigravity');
	}

	/**
	 * Get path to .agent directory
	 */
	private getAgentDir(): string {
		const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
		if (!workspaceFolder) {
			throw new Error('No workspace folder open');
		}
		return path.join(workspaceFolder.uri.fsPath, '.agent');
	}

	/**
	 * Get path to rules directory
	 */
	getRulesPath(): string {
		return path.join(this.getAgentDir(), 'rules');
	}

	/**
	 * Get path to workflows directory
	 */
	getWorkflowsPath(): string {
		return path.join(this.getAgentDir(), 'workflows');
	}

	/**
	 * Get path to agents directory
	 */
	getAgentsPath(): string {
		return path.join(this.getAgentDir(), 'agents');
	}

	/**
	 * Sync rules to .agent/rules/ directory
	 */
	async syncRules(content: string): Promise<SyncResult> {
		try {
			const rulesPath = this.getRulesPath();
			const rulesFile = path.join(rulesPath, 'main.md');
			
			// Ensure rules directory exists
			await fs.mkdir(rulesPath, { recursive: true });

			// Backup existing file if it exists
			try {
				await fs.access(rulesFile);
				const backupPath = `${rulesFile}.backup`;
				await fs.copyFile(rulesFile, backupPath);
				console.log(`[Antigravity] Backed up existing rules to ${backupPath}`);
			} catch {
				// File doesn't exist, no backup needed
			}

			// Write new rules
			await fs.writeFile(rulesFile, content, 'utf-8');
			console.log(`[Antigravity] Synced rules to ${rulesFile}`);

			return this.createSuccessResult([rulesFile]);
		} catch (error) {
			const errorMsg = error instanceof Error ? error.message : String(error);
			console.error(`[Antigravity] Failed to sync rules: ${errorMsg}`);
			return this.createErrorResult([errorMsg]);
		}
	}

	/**
	 * Sync agents to .agent/agents/ directory
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
				
				// Format agent content for Antigravity
				const agentContent = this.formatAgentContent(agent);
				
				await fs.writeFile(filePath, agentContent, 'utf-8');
				filesWritten.push(filePath);
				console.log(`[Antigravity] Synced agent: ${fileName}`);
			}

			return this.createSuccessResult(filesWritten);
		} catch (error) {
			const errorMsg = error instanceof Error ? error.message : String(error);
			console.error(`[Antigravity] Failed to sync agents: ${errorMsg}`);
			return this.createErrorResult([errorMsg]);
		}
	}

	/**
	 * Format agent content for Antigravity
	 * Antigravity uses YAML frontmatter + markdown
	 */
	private formatAgentContent(agent: Agent): string {
		let content = '---\n';
		content += `name: ${agent.name}\n`;
		
		if (agent.description) {
			content += `description: ${agent.description}\n`;
		}
		
		if (agent.trigger) {
			content += `trigger: ${agent.trigger}\n`;
		}
		
		content += '---\n\n';
		content += agent.content;
		
		return content;
	}

	/**
	 * Validate Antigravity configuration
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
	 * Get Antigravity-specific setup instructions
	 */
	getSetupInstructions(): string {
		return `Configure VibeKit for Antigravity:\n\n` +
			`1. Open your project in Antigravity\n` +
			`2. Set your Git repository URL in VibeKit settings\n` +
			`3. Run "VibeKit: Sync Rules & Agents"\n\n` +
			`Your rules will be synced to: .agent/rules/main.md\n` +
			`Your agents will be synced to: .agent/agents/\n` +
			`Your workflows will be synced to: .agent/workflows/\n\n` +
			`After syncing, Antigravity will automatically use these configurations.`;
	}
}
