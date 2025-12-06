import * as vscode from 'vscode';
import * as fs from 'fs/promises';
import * as path from 'path';
import { BaseProvider, SyncResult, Agent, ProviderCapabilities } from './base';

/**
 * Generic provider for standard VSCode or unknown editors
 * Serves as a fallback when no specific provider is detected
 */
export class GenericProvider extends BaseProvider {
	readonly name = 'generic';
	readonly displayName = 'Generic VSCode';
	readonly capabilities: ProviderCapabilities = {
		supportsRules: true,
		supportsAgents: true,
		supportsWorkflows: false,
		supportsMemory: false
	};

	/**
	 * Always returns true - this is the fallback provider
	 */
	detect(): boolean {
		return true;
	}

	/**
	 * Get path to generic rules directory
	 */
	getRulesPath(): string {
		const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
		if (!workspaceFolder) {
			throw new Error('No workspace folder open');
		}
		return path.join(workspaceFolder.uri.fsPath, '.vscode', 'rules');
	}

	/**
	 * Get path to generic agents directory
	 */
	getAgentsPath(): string {
		const workspaceFolder = vscode.workspace.workspaceFolders?.[0];
		if (!workspaceFolder) {
			throw new Error('No workspace folder open');
		}
		return path.join(workspaceFolder.uri.fsPath, '.vscode', 'agents');
	}

	/**
	 * Sync rules to .vscode/rules/ directory
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
				console.log(`[Generic] Backed up existing rules to ${backupPath}`);
			} catch {
				// File doesn't exist, no backup needed
			}

			// Write new rules
			await fs.writeFile(rulesFile, content, 'utf-8');
			console.log(`[Generic] Synced rules to ${rulesFile}`);

			return this.createSuccessResult([rulesFile]);
		} catch (error) {
			const errorMsg = error instanceof Error ? error.message : String(error);
			console.error(`[Generic] Failed to sync rules: ${errorMsg}`);
			return this.createErrorResult([errorMsg]);
		}
	}

	/**
	 * Sync agents to .vscode/agents/ directory
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
				
				// Format agent content
				const agentContent = this.formatAgentContent(agent);
				
				await fs.writeFile(filePath, agentContent, 'utf-8');
				filesWritten.push(filePath);
				console.log(`[Generic] Synced agent: ${fileName}`);
			}

			return this.createSuccessResult(filesWritten);
		} catch (error) {
			const errorMsg = error instanceof Error ? error.message : String(error);
			console.error(`[Generic] Failed to sync agents: ${errorMsg}`);
			return this.createErrorResult([errorMsg]);
		}
	}

	/**
	 * Format agent content
	 */
	private formatAgentContent(agent: Agent): string {
		let content = `# ${agent.name}\n\n`;
		
		if (agent.description) {
			content += `${agent.description}\n\n`;
		}

		if (agent.trigger) {
			content += `**Trigger:** \`${agent.trigger}\`\n\n`;
		}

		content += `---\n\n${agent.content}`;
		
		return content;
	}

	/**
	 * Get generic setup instructions
	 */
	getSetupInstructions(): string {
		return `Configure VibeKit for VSCode:\n\n` +
			`1. Open your project in VSCode\n` +
			`2. Set your Git repository URL in VibeKit settings\n` +
			`3. Run "VibeKit: Sync Rules & Agents"\n\n` +
			`Your rules will be synced to: .vscode/rules/main.md\n` +
			`Your agents will be synced to: .vscode/agents/\n\n` +
			`Note: This is a generic provider. For better integration, ` +
			`use Cursor, Windsurf, or Antigravity.`;
	}
}
