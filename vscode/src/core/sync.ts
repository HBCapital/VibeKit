import * as vscode from 'vscode';
import { RulesProvider, SyncResult } from '../providers/base';
import { GitService, RepoContent } from './git';
import { ConfigService, VibeKitConfig } from './config';

/**
 * Sync status
 */
export interface SyncStatus {
	lastSync?: Date;
	syncing: boolean;
	error?: string;
}

/**
 * Sync service orchestrating git operations and provider syncing
 */
export class SyncService {
	private gitService: GitService;
	private status: SyncStatus = { syncing: false };
	private statusChangeCallbacks: ((status: SyncStatus) => void)[] = [];

	constructor(private provider: RulesProvider) {
		this.gitService = new GitService();
	}

	/**
	 * Perform a full sync from Git repository
	 */
	async sync(): Promise<SyncResult> {
		if (this.status.syncing) {
			return {
				success: false,
				filesWritten: [],
				errors: ['Sync already in progress'],
				timestamp: new Date()
			};
		}

		this.updateStatus({ syncing: true, error: undefined });

		try {
			// Load configuration
			const config = ConfigService.load();
			
			// Validate configuration
			const validation = ConfigService.validate(config);
			if (!validation.valid) {
				throw new Error(`Invalid configuration: ${validation.errors.join(', ')}`);
			}

			// Show progress
			return await vscode.window.withProgress(
				{
					location: vscode.ProgressLocation.Notification,
					title: 'VibeKit',
					cancellable: false
				},
				async (progress) => {
					// Step 1: Clone/pull repository
					progress.report({ message: 'Fetching from Git...' });
					const localPath = await this.gitService.ensureRepo(
						config.gitRepo,
						config.gitBranch || 'main',
						config.gitToken
					);

					// Step 2: Read content from repository
					progress.report({ message: 'Reading rules and agents...' });
					const content = await this.gitService.readRepoContent(localPath);

					// Step 3: Sync rules
					let rulesResult: SyncResult | undefined;
					if (this.provider.capabilities.supportsRules && content.rules) {
						progress.report({ message: 'Syncing rules...' });
						rulesResult = await this.provider.syncRules(content.rules);
					}

					// Step 4: Sync agents
					let agentsResult: SyncResult | undefined;
					if (this.provider.capabilities.supportsAgents && content.agents.length > 0) {
						progress.report({ message: 'Syncing agents...' });
						agentsResult = await this.provider.syncAgents(content.agents);
					}

					// Combine results
					const filesWritten = [
						...(rulesResult?.filesWritten || []),
						...(agentsResult?.filesWritten || [])
					];

					const errors = [
						...(rulesResult?.errors || []),
						...(agentsResult?.errors || [])
					];

					const success = errors.length === 0;

					// Update status
					this.updateStatus({
						syncing: false,
						lastSync: new Date(),
						error: success ? undefined : errors.join('; ')
					});

					// Show result notification
					if (success) {
						vscode.window.showInformationMessage(
							`✓ VibeKit: Synced ${filesWritten.length} file(s) successfully`
						);
					} else {
						vscode.window.showErrorMessage(
							`✗ VibeKit: Sync failed - ${errors.join('; ')}`
						);
					}

					return {
						success,
						filesWritten,
						errors: errors.length > 0 ? errors : undefined,
						timestamp: new Date()
					};
				}
			);
		} catch (error) {
			const errorMsg = error instanceof Error ? error.message : String(error);
			console.error(`[Sync] Error: ${errorMsg}`);
			
			this.updateStatus({
				syncing: false,
				error: errorMsg
			});

			vscode.window.showErrorMessage(`VibeKit sync failed: ${errorMsg}`);

			return {
				success: false,
				filesWritten: [],
				errors: [errorMsg],
				timestamp: new Date()
			};
		}
	}

	/**
	 * Get current sync status
	 */
	getStatus(): SyncStatus {
		return { ...this.status };
	}

	/**
	 * Subscribe to status changes
	 */
	onStatusChange(callback: (status: SyncStatus) => void): vscode.Disposable {
		this.statusChangeCallbacks.push(callback);
		
		return {
			dispose: () => {
				const index = this.statusChangeCallbacks.indexOf(callback);
				if (index > -1) {
					this.statusChangeCallbacks.splice(index, 1);
				}
			}
		};
	}

	/**
	 * Update status and notify listeners
	 */
	private updateStatus(update: Partial<SyncStatus>): void {
		this.status = { ...this.status, ...update };
		this.statusChangeCallbacks.forEach(callback => callback(this.status));
	}

	/**
	 * Clear Git cache
	 */
	clearCache(): void {
		this.gitService.clearCache();
	}
}
