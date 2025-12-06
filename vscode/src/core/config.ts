import * as vscode from 'vscode';

/**
 * VibeKit configuration interface
 */
export interface VibeKitConfig {
	/** Git repository URL for rules and agents */
	gitRepo: string;
	
	/** Enable automatic syncing */
	autoSync: boolean;
	
	/** Auto-sync interval in minutes */
	syncInterval: number;
	
	/** Provider selection: 'auto' or specific provider name */
	provider: 'auto' | 'cursor' | 'windsurf' | 'antigravity' | 'generic';
	
	/** Custom paths override */
	customPaths?: {
		rules?: string;
		agents?: string;
		workflows?: string;
	};
	
	/** Git authentication token (optional) */
	gitToken?: string;
	
	/** Branch to sync from */
	gitBranch?: string;
}

/**
 * Configuration service for VibeKit
 */
export class ConfigService {
	private static readonly CONFIG_SECTION = 'vibekit';

	/**
	 * Load configuration from VSCode settings
	 */
	static load(): VibeKitConfig {
		const config = vscode.workspace.getConfiguration(this.CONFIG_SECTION);

		return {
			gitRepo: config.get<string>('gitRepo', ''),
			autoSync: config.get<boolean>('autoSync', false),
			syncInterval: config.get<number>('syncInterval', 30),
			provider: config.get<'auto' | 'cursor' | 'windsurf' | 'antigravity' | 'generic'>('provider', 'auto'),
			customPaths: config.get<any>('customPaths'),
			gitToken: config.get<string>('gitToken'),
			gitBranch: config.get<string>('gitBranch', 'main')
		};
	}

	/**
	 * Save configuration to VSCode settings
	 */
	static async save(config: Partial<VibeKitConfig>): Promise<void> {
		const vscodeConfig = vscode.workspace.getConfiguration(this.CONFIG_SECTION);

		for (const [key, value] of Object.entries(config)) {
			if (value !== undefined) {
				await vscodeConfig.update(key, value, vscode.ConfigurationTarget.Workspace);
			}
		}
	}

	/**
	 * Validate configuration
	 */
	static validate(config: VibeKitConfig): { valid: boolean; errors: string[] } {
		const errors: string[] = [];

		// Check if git repo is set
		if (!config.gitRepo || config.gitRepo.trim() === '') {
			errors.push('Git repository URL is required');
		}

		// Validate git repo URL format
		if (config.gitRepo && !this.isValidGitUrl(config.gitRepo)) {
			errors.push('Invalid Git repository URL format');
		}

		// Validate sync interval
		if (config.autoSync && config.syncInterval < 1) {
			errors.push('Sync interval must be at least 1 minute');
		}

		return {
			valid: errors.length === 0,
			errors
		};
	}

	/**
	 * Check if a string is a valid Git URL
	 */
	private static isValidGitUrl(url: string): boolean {
		// Support HTTPS and SSH formats
		const httpsPattern = /^https?:\/\/.+\/.+\.git$/i;
		const sshPattern = /^git@.+:.+\/.+\.git$/i;
		const githubShorthand = /^[\w-]+\/[\w-]+$/; // e.g., "user/repo"

		return httpsPattern.test(url) || sshPattern.test(url) || githubShorthand.test(url);
	}

	/**
	 * Get configuration value
	 */
	static get<T>(key: keyof VibeKitConfig, defaultValue?: T): T {
		const config = vscode.workspace.getConfiguration(this.CONFIG_SECTION);
		return config.get<T>(key as string, defaultValue as T);
	}

	/**
	 * Set configuration value
	 */
	static async set<K extends keyof VibeKitConfig>(
		key: K,
		value: VibeKitConfig[K]
	): Promise<void> {
		const config = vscode.workspace.getConfiguration(this.CONFIG_SECTION);
		await config.update(key, value, vscode.ConfigurationTarget.Workspace);
	}

	/**
	 * Reset configuration to defaults
	 */
	static async reset(): Promise<void> {
		const config = vscode.workspace.getConfiguration(this.CONFIG_SECTION);
		const keys: (keyof VibeKitConfig)[] = [
			'gitRepo',
			'autoSync',
			'syncInterval',
			'provider',
			'customPaths',
			'gitToken',
			'gitBranch'
		];

		for (const key of keys) {
			await config.update(key, undefined, vscode.ConfigurationTarget.Workspace);
		}
	}

	/**
	 * Watch for configuration changes
	 */
	static onDidChange(callback: (config: VibeKitConfig) => void): vscode.Disposable {
		return vscode.workspace.onDidChangeConfiguration(event => {
			if (event.affectsConfiguration(this.CONFIG_SECTION)) {
				callback(this.load());
			}
		});
	}
}
