/**
 * Base provider interface for VibeKit
 * Defines the contract that all editor-specific providers must implement
 */

/**
 * Represents an agent/slash command configuration
 */
export interface Agent {
	name: string;
	description: string;
	content: string;
	trigger?: string;
}

/**
 * Sync result information
 */
export interface SyncResult {
	success: boolean;
	filesWritten: string[];
	errors?: string[];
	timestamp: Date;
}

/**
 * Provider capabilities
 */
export interface ProviderCapabilities {
	supportsRules: boolean;
	supportsAgents: boolean;
	supportsWorkflows: boolean;
	supportsMemory: boolean;
}

/**
 * Base interface that all providers must implement
 */
export interface RulesProvider {
	/**
	 * Unique identifier for this provider (e.g., 'cursor', 'windsurf')
	 */
	readonly name: string;

	/**
	 * Human-readable display name (e.g., 'Cursor', 'Windsurf')
	 */
	readonly displayName: string;

	/**
	 * Provider capabilities
	 */
	readonly capabilities: ProviderCapabilities;

	/**
	 * Detect if this provider should be used for the current editor
	 * @returns true if this provider matches the current editor
	 */
	detect(): boolean;

	/**
	 * Get the path where rules should be written
	 * @returns Absolute or relative path to rules file/directory
	 */
	getRulesPath(): string;

	/**
	 * Get the path where agents/commands should be written
	 * @returns Absolute or relative path to agents directory
	 */
	getAgentsPath(): string;

	/**
	 * Get the path for workflows (if supported)
	 * @returns Path to workflows directory or undefined if not supported
	 */
	getWorkflowsPath?(): string;

	/**
	 * Sync rules content to the editor-specific location
	 * @param content Rules content to write
	 * @returns Promise resolving to sync result
	 */
	syncRules(content: string): Promise<SyncResult>;

	/**
	 * Sync agents/commands to the editor-specific location
	 * @param agents Array of agent configurations
	 * @returns Promise resolving to sync result
	 */
	syncAgents(agents: Agent[]): Promise<SyncResult>;

	/**
	 * Validate the provider configuration
	 * @returns Promise resolving to true if configuration is valid
	 */
	validateConfig(): Promise<boolean>;

	/**
	 * Get provider-specific configuration instructions
	 * @returns Human-readable setup instructions
	 */
	getSetupInstructions(): string;

	/**
	 * Backup existing files before syncing
	 * @returns Promise resolving to backup location
	 */
	backup(): Promise<string>;

	/**
	 * Restore from backup
	 * @param backupPath Path to backup to restore from
	 * @returns Promise resolving to true if restore succeeded
	 */
	restore(backupPath: string): Promise<boolean>;
}

/**
 * Abstract base class providing common functionality for providers
 */
export abstract class BaseProvider implements RulesProvider {
	abstract readonly name: string;
	abstract readonly displayName: string;
	abstract readonly capabilities: ProviderCapabilities;

	abstract detect(): boolean;
	abstract getRulesPath(): string;
	abstract getAgentsPath(): string;
	abstract syncRules(content: string): Promise<SyncResult>;
	abstract syncAgents(agents: Agent[]): Promise<SyncResult>;

	/**
	 * Default implementation of validateConfig
	 */
	async validateConfig(): Promise<boolean> {
		// Default: check if paths are accessible
		return true;
	}

	/**
	 * Default setup instructions
	 */
	getSetupInstructions(): string {
		return `Configure VibeKit for ${this.displayName}:\n` +
			`1. Set your Git repository URL\n` +
			`2. Run "VibeKit: Sync Rules & Agents"\n` +
			`3. Your rules will be synced to ${this.getRulesPath()}`;
	}

	/**
	 * Default backup implementation
	 */
	async backup(): Promise<string> {
		const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
		return `.vibekit-backup-${timestamp}`;
	}

	/**
	 * Default restore implementation
	 */
	async restore(backupPath: string): Promise<boolean> {
		// To be implemented by subclasses if needed
		return false;
	}

	/**
	 * Helper method to create a successful sync result
	 */
	protected createSuccessResult(filesWritten: string[]): SyncResult {
		return {
			success: true,
			filesWritten,
			timestamp: new Date()
		};
	}

	/**
	 * Helper method to create a failed sync result
	 */
	protected createErrorResult(errors: string[]): SyncResult {
		return {
			success: false,
			filesWritten: [],
			errors,
			timestamp: new Date()
		};
	}
}
