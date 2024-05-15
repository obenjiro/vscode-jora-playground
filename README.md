# VSCode jora playground

![jora-playground](https://raw.githubusercontent.com/obenjiro/vscode-jora-playground/master/icon2.png)

A fork of vscode-jq-playground but with power of [Jora](https://github.com/discoveryjs/jora).

Check jora [tutorial](https://discoveryjs.github.io/jora/#article:getting-started&!anchor=your-first-query) or [examples](https://discoveryjs.github.io/jora/#article:jora-syntax-complex-examples)

[![Open issues](https://img.shields.io/github/issues/obenjiro/vscode-jora-playground)](https://img.shields.io/github/issues/obenjiro/vscode-jora-playground)
[![Closed issues](https://img.shields.io/github/issues-closed/obenjiro/vscode-jora-playground)](https://img.shields.io/github/issues-closed/obenjiro/vscode-jora-playground)

## Demo

### jora Manual examples

![jora-manual-examples](https://raw.githubusercontent.com/obenjiro/vscode-jora-playground/master/images/general-demo.gif)

### Usage example

#### Create playground from filter

![vscode-jora-payground](https://github.com/obenjiro/vscode-jora-playground/raw/master/images/inputbox-1.gif)

#### Filter json on the fly

![vscode-jora-payground](https://github.com/obenjiro/vscode-jora-playground/raw/master/images/inputbox-2.gif)

![vscode-jora-payground](https://raw.githubusercontent.com/obenjiro/vscode-jora-playground/master/images/example_multiline.gif)

![vscode-jora-playground](https://github.com/obenjiro/vscode-jora-playground/raw/master/images/buffers-examples.gif)

#### Autocomplete with inline documentation

![Autocomplete](https://media.giphy.com/media/eHFSm80lXQnxQe2D64/giphy.gif)

[**_ More examples _**](https://obenjiro.github.io/vscode-jora-playground/)

## Main Features

- Create notebook with multiple executable jora filters in one file
- Support different data inputs:
  - json text
  - javascript string
  - file
- Support [input variable](https://code.visualstudio.com/docs/editor/variables-reference#_input-variables)
- Redirect output
- Command lines as input with variables support
- Highlighting code
- Autocomplete with documentation and examples
- Open command filter result in output console or in new buffer
- Open examples from jora manual and run it (ctrl+shift+p → JORAPG: Examples)
- Support hotkeys
  - ctrl+enter → to output
  - shift+enter → to editor

## Usage

Open new file and change _'Language Mode'_ to `jorapg` (jora PlayGround) or
use a file with `.jorapg` extension.

### Start write jora filters

```
jora <jora filter>
[ JSON_TEXT | JAVASCRIPT_STRING | FILE ]
```

### Open official jora examples in jora playground

```
Command Palette... (ctrl + shift + p): jora playground: Examples
```

### JSON_TEXT

```json
# Example 1
jora foo
{"foo": 42, "bar": "less interesting data"}

# Example 2
jora foo
{
    "foo": 42,
    "bar": "less interesting data"
}
```

### JAVASCRIPT STRINGS

```json
# Example 1
jora foo
{foo: 42, bar: "less interesting data"}

# Example 2
jora foo
{
    foo: 42,
    bar: "less interesting data"
}
```

### FILE

```json
# Example 1: relative pahts
jora '.foo,.bar'
../files/example.json

# Example 2: absolute pahts
jora '.foo,.bar'
/home/dev/files/example.json
```

### Multiline jora filter

```json
# Example 1
jora '
  ($ + $)
  *
  2
'
2
```

### Input Variable

```json
{
  // See https://go.microsoft.com/fwlink/?LinkId=733558
  // for the documentation about the tasks.json format
  "version": "2.0.0",
  "tasks": [
    {
      "label": "jora test",
      "type": "shell",
      "command": "curl",
      "args": ["-v", "${input:urls}\\&param=${input:param}"],
      "problemMatcher": []
    }
  ],
  "inputs": [
    {
      "id": "urls",
      "type": "command",
      "command": "extension.executeJoraInputCommand",
      "args": {
        "filter": ".[3]",
        "input": "/home/david/dev/tmp/jorapg-examples/tmp.json"
      }
    },
    {
      "id": "param",
      "type": "command",
      "command": "extension.executeJoraInputCommand",
      "args": {
        "filter": ".[2]",
        "input": "[10, 50, 100]",
        "jsonInput": true
      }
    }
  ]
}
```

### Open online manual

`ctrl+shift+p → > Manual`

### Open online Tutoral

`ctrl+shift+p → > Tutorial`

## Thanks

I be inspired by [vscode-jora-playground](https://github.com/obenjiro/vscode-jora-playground) [David Nussio](https://github.com/davidnussio)
