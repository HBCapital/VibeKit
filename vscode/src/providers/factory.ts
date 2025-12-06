import * as vscode from 'vscode';
import { RulesProvider } from './base';
import { CursorProvider } from './cursor';
import { WindsurfProvider } from './windsurf';
import { AntigravityProvider } from './antigravity';
import { GenericProvider } from './generic';

/**
 * Factory for creating and detecting the appropriate provider
 */
export class ProviderFactory {
	private static providers: RulesProvider[] = [
		new CursorProvider(),
		new WindsurfProvider(),
		new AntigravityProvider(),
		new GenericProvider() // Fallback - must be last
	];

	/**
	 * Auto-detect the appropriate provider based on the current editor
	 * @returns The detected provider
	 */
	static detect(): RulesProvider {
		for (const provider of this.providers) {
			if (provider.detect()) {
				console.log(`[VibeKit] Detected provider: ${provider.displayName}`);
				return provider;
			}
		}

		// Should never reach here since GenericProvider always returns true
		console.warn('[VibeKit] No provider detected, using Generic');
		return new GenericProvider();
	}

	/**
	 * Get a specific provider by name
	 * @param name Provider name (e.g., 'cursor', 'windsurf')
	 * @returns The requested provider or undefined if not found
	 */
	static getByName(name: string): RulesProvider | undefined {
		return this.providers.find(p => p.name === name);
	}

	/**
	 * Get all available providers
	 * @returns Array of all providers
	 */
	static getAll(): RulesProvider[] {
		return [...this.providers];
	}

	/**
	 * Get provider based on configuration or auto-detect
	 * @param config VSCode configuration
	 * @returns The appropriate provider
	 */
	static getProvider(config: vscode.WorkspaceConfiguration): RulesProvider {
		const providerName = config.get<string>('provider', 'auto');

		if (providerName === 'auto') {
			return this.detect();
		}

		const provider = this.getByName(providerName);
		if (provider) {
			console.log(`[VibeKit] Using forced provider: ${provider.displayName}`);
			return provider;
		}

		console.warn(`[VibeKit] Provider '${providerName}' not found, falling back to auto-detect`);
		return this.detect();
	}
}
