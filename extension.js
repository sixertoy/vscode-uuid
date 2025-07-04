const vscode = require('vscode');
const uuid = require('uuid');

function replaceDocumentContent () {
  const editor = vscode.window.activeTextEditor;
  if (editor) {
    const search = /"%%UID%%"/g;
    const document = editor.document;
    const content = document.getText();
    const replacer = content.replace(search, () => `"${uuid.v4()}"`);
    editor.edit(editBuilder => {
      const range = new vscode.Range(0, 0, document.lineCount, 0)
      editBuilder.replace(range, replacer);
    });
  }
}

function activate(context) {
  console.log('Congratulations, your extension "vscode-uuid" is now active!');

  const disposable = vscode.commands.registerCommand(
    'vscode-uuid.generate',
    replaceDocumentContent
  );
  context.subscriptions.push(disposable);
}

function deactivate() {}

module.exports = {
  activate,
  deactivate
}
