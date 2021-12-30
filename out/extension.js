"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = vscode.commands.registerCommand('markdownToggleTask.toggleTask', () => {
        // The code you place here will be executed every time your command is executed
        // Display a message box to the user
        let editor = vscode.window.activeTextEditor;
        editor?.edit(target => {
            editor?.selections.forEach(selection => {
                let cursorPos = selection.active;
                if (cursorPos) {
                    let cursorLine = editor?.document.lineAt(cursorPos.line);
                    if (cursorLine) {
                        let startPos = new vscode.Position(cursorPos?.line, cursorLine?.firstNonWhitespaceCharacterIndex);
                        let firstPosEnd = new vscode.Position(startPos.line, startPos.character + 2);
                        let firstRange = new vscode.Range(startPos, firstPosEnd);
                        let firstStr = editor?.document.getText(firstRange);
                        let secondPosEnd = new vscode.Position(startPos.line, startPos.character + 6);
                        let secondRange = new vscode.Range(startPos, secondPosEnd);
                        let secondStr = editor?.document.getText(secondRange);
                        if (firstStr != '- ') {
                            target.insert(startPos, '- ');
                        }
                        else {
                            if (secondStr == '- [ ] ') {
                                target.replace(secondRange, '- [x] ');
                            }
                            else if (secondStr == '- [x] ') {
                                target.replace(secondRange, '- [ ] ');
                            }
                            else {
                                target.replace(firstRange, '- [ ] ');
                            }
                        }
                    }
                }
            });
        });
    });
    context.subscriptions.push(disposable);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map