import * as vscode from "vscode";

export const Logger = vscode.window.createOutputChannel("jorapg", "json");
export const Debug = vscode.window.createOutputChannel("jorapg debug");

export default Logger;
