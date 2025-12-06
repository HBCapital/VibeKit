import * as vscode from 'vscode';
import { ProviderFactory } from './providers/factory';
import { RulesProvider } from './providers/base';
import { SyncService } from './core/sync';
import { ConfigService } from './core/config';

let syncService: SyncService;
let provider: RulesProvider;
let statusBarItem: vscode.StatusBarItem;

/**
 * Extension activation
 */
export async function activate(context: vscode.ExtensionContext) {
	console.log('[VibeKit] Activating extension...');

	try {
		// Load configuration
		const config = ConfigService.load();

		// Detect or get configured provider
		provider = ProviderFactory.getProvider(vscode.workspace.getConfiguration('vibekit'));
		console.log(`[VibeKit] Using provider: ${provider.displayName}`);

		// Initialize sync service
		syncService = new SyncService(provider);

		// Create status bar item
		statusBarItem = vscode.window.createStatusBarItem(
			vscode.StatusBarAlignment.Right,
			100
		);
		statusBarItem.command = 'vibekit.sync';
		updateStatusBar();
		statusBarItem.show();

		// Register commands
		registerCommands(context);

		// Watch for configuration changes
		context.subscriptions.push(
			ConfigService.onDidChange(async (newConfig) => {
				console.log('[VibeKit] Configuration changed');
				// Reinitialize provider if changed
				const newProvider = ProviderFactory.getProvider(
					vscode.workspace.getConfiguration('vibekit')
				);
				if (newProvider.name !== provider.name) {
					provider = newProvider;
					syncService = new SyncService(provider);
					console.log(`[VibeKit] Switched to provider: ${provider.displayName}`);
					vscode.window.showInformationMessage(
						`VibeKit: Switched to ${provider.displayName}`
					);
				}
			})
		);

		// Watch for sync status changes
		context.subscriptions.push(
			syncService.onStatusChange((status) => {
				updateStatusBar();
			})
		);

		console.log('[VibeKit] Extension activated successfully');
	} catch (error) {
		const errorMsg = error instanceof Error ? error.message : String(error);
		console.error(`[VibeKit] Activation failed: ${errorMsg}`);
		vscode.window.showErrorMessage(`VibeKit activation failed: ${errorMsg}`);
	}
}

/**
 * Register all commands
 */
function registerCommands(context: vscode.ExtensionContext) {
	// Sync command
	context.subscriptions.push(
		vscode.commands.registerCommand('vibekit.sync', async () => {
			await syncService.sync();
		})
	);

	// Configure repository command
	context.subscriptions.push(
		vscode.commands.registerCommand('vibekit.configureRepo', async () => {
			const repoUrl = await vscode.window.showInputBox({
				prompt: 'Enter Git repository URL',
				placeHolder: 'https://github.com/user/repo.git or user/repo',
				value: ConfigService.get('gitRepo', '')
			});

			if (repoUrl) {
				await ConfigService.set('gitRepo', repoUrl);
				vscode.window.showInformationMessage(`VibeKit: Repository set to ${repoUrl}`);
			}
		})
	);

	// Enable auto-sync command
	context.subscriptions.push(
		vscode.commands.registerCommand('vibekit.enableAutoSync', async () => {
			await ConfigService.set('autoSync', true);
			vscode.window.showInformationMessage('VibeKit: Auto-sync enabled');
		})
	);

	// Disable auto-sync command
	context.subscriptions.push(
		vscode.commands.registerCommand('vibekit.disableAutoSync', async () => {
			await ConfigService.set('autoSync', false);
			vscode.window.showInformationMessage('VibeKit: Auto-sync disabled');
		})
	);

	// Show provider command
	context.subscriptions.push(
		vscode.commands.registerCommand('vibekit.showProvider', async () => {
			const message = `Current Provider: ${provider.displayName}\n\n${provider.getSetupInstructions()}`;
			vscode.window.showInformationMessage(message, { modal: true });
		})
	);
}

/**
 * Update status bar item
 */
function updateStatusBar() {
	const status = syncService.getStatus();
	
	if (status.syncing) {
		statusBarItem.text = '$(sync~spin) VibeKit: Syncing...';
		statusBarItem.tooltip = 'Syncing rules and agents';
	} else if (status.error) {
		statusBarItem.text = '$(error) VibeKit';
		statusBarItem.tooltip = `Error: ${status.error}`;
	} else if (status.lastSync) {
		const timeAgo = getTimeAgo(status.lastSync);
		statusBarItem.text = `$(check) VibeKit: ${provider.name}`;
		statusBarItem.tooltip = `Last synced: ${timeAgo}\nProvider: ${provider.displayName}\nClick to sync`;
	} else {
		statusBarItem.text = `$(cloud-download) VibeKit: ${provider.name}`;
		statusBarItem.tooltip = `Provider: ${provider.displayName}\nClick to sync`;
	}
}

/**
 * Get human-readable time ago string
 */
function getTimeAgo(date: Date): string {
	const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
	
	if (seconds < 60) {
		return 'just now';
	}
	
	const minutes = Math.floor(seconds / 60);
	if (minutes < 60) {
		return `${minutes}m ago`;
	}
	
	const hours = Math.floor(minutes / 60);
	if (hours < 24) {
		return `${hours}h ago`;
	}
	
	const days = Math.floor(hours / 24);
	return `${days}d ago`;
}

/**
 * Extension deactivation
 */
export function deactivate() {
	console.log('[VibeKit] Extension deactivated');
	if (statusBarItem) {
		statusBarItem.dispose();
	}
}

