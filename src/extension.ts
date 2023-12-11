import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  const documentChangeListener = vscode.workspace.onDidChangeTextDocument((event) => {
    if (event.document.languageId === 'typescript') {
      const documentContent = event.document.getText();
      const helloWorldRegex = /\bhelloWorld\s*\(/;
      if (helloWorldRegex.test(documentContent)) {
        showCustomAlert();
      }
    }
  });

  context.subscriptions.push(documentChangeListener);
}

export function deactivate() {}

function showCustomAlert() {
  // Create a webview panel
  const panel = vscode.window.createWebviewPanel(
    'customAlert',
    'Custom Alert',
    vscode.ViewColumn.Active,
    {
      enableScripts: true,
      retainContextWhenHidden: true,
    }
  );

  // Load custom HTML content into the webview
  panel.webview.html = getCustomAlertContent();
}

function getCustomAlertContent() {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        body {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 100vh;
          margin: 0;
        }
        .alert {
          padding: 20px;
          background-color: #f44336;
          color: white;
          text-align: center;
          border-radius: 8px;
        }
      </style>
    </head>
    <body>
      <div class="alert">
        <h2>Hello World!</h2>
      </div>
    </body>
    </html>
  `;
}
