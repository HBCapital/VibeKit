import * as assert from 'assert';
import * as vscode from 'vscode';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');

	test('Extension should be present', () => {
		assert.ok(vscode.extensions.getExtension('vibekit.vibekit-vscode'));
	});

	test('Should activate', async function() {
		this.timeout(10000);
		const ext = vscode.extensions.getExtension('vibekit.vibekit-vscode');
		if (ext) {
			await ext.activate();
			assert.ok(ext.isActive);
		}
	});

	test('Commands should be registered', async () => {
		const commands = await vscode.commands.getCommands(true);
		assert.ok(commands.includes('vibekit.sync'));
		assert.ok(commands.includes('vibekit.configureRepo'));
		assert.ok(commands.includes('vibekit.showProvider'));
	});

	test('Configuration should exist', () => {
		const config = vscode.workspace.getConfiguration('vibekit');
		assert.ok(config.has('gitRepo'));
		assert.ok(config.has('autoSync'));
		assert.ok(config.has('provider'));
	});
});
