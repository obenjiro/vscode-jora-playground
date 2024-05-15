import * as path from "path";

export const CONFIGS = {
  FILEPATH: undefined,
  FILENAME: /^win32/.test(process.platform) ? "./jora.exe" : "./jora",
  MANUAL_PATH: path.join(".", "examples", "manual.jorapg"),
  LANGUAGES: ["jorapg", "jora"],
  EXECUTE_JQ_COMMAND: "extension.executeJoraCommand",
  EXECUTE_JQ_COMMAND_CONSOLE_TITLE: /^darwin/.test(process.platform)
    ? "⚡ console (cmd+enter)"
    : "⚡ console (ctrl+enter)",
  EXECUTE_JQ_COMMAND_EDITOR_TITLE: "⚡ editor (shift+enter)",
  CODE_LENS_TITLE: "jora",
  JQ_PLAYGROUND_VERSION: "vscode-jora-playground.version",
  SHOW_EXAMPLES: "vscode-jora-payground.showExamples",
};
