# VSCode jora playground

![jora-manual-examples](https://raw.githubusercontent.com/obenjiro/vscode-jora-playground/master/icon.png)

A fork of vscode-jora-playground. Create a notebook with power of [jora](https://github.com/discoveryjs/jora).

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

### STRINGS

```json
# Example 1: raw input string
jora -R 'split(" ")'
non arcu risus quis varius quam quisque id diam vel

# Example 2
jora .[5:10]
"less interesting data"
```

### URL

```json
# Example 1
jora '.[0] | {message: .commit.message, name: .commit.committer.name}'
https://api.github.com/repos/stedolan/jora/commits?per_page=5
```

### FILE

```json
# Example 1: relative pahts
jora '.foo,.bar'
../files/example.json

# Example 2: absolute pahts
jora '.foo,.bar'
/home/dev/files/example.json

# Example 3: buffer file
jora '.'
Untitled-1

# Example 4: workspace file
jora '.'
opened-workspace-file-with-data.json

# Example 5 (Multifile)
jora '{
    (input_filename|rtrimstr(".json")) :
    .scripts | keys | map(select(. | contains("test"))) }'
/home/dev/client/package.json /home/dev/server/package.json
```

### COMMAND_LINE

```json
# Example 1
jora '.token'
$ curl -X GET "http://httpbin.org/bearer" -H "accept: application/json" -H "Authorization: Bearer 1234"

# Example 2
jora -R -s 'split("\n") | .[] | { file: ., lenght: . | length}'
$ ls /etc/
```

### COMMAND_LINE (with variables)

```json
TOKEN = 1234
ENDPOINT = bearer

# Example 1
jora '.token'
$ curl -X GET "http://httpbin.org/$ENDPOINT" -H "accept: application/json" -H "Authorization: Bearer $TOKEN"

# Example 2
jora -R -s 'split("\n") | .[] | { file: ., lenght: . | length}'
$ ls $HOME
```

### Multiline jora filter

```json
# Example 1
jora -r '(map(keys)
  | add
  | unique) as $cols
  | map(. as $row
  | $cols
  | map($row[.])) as $rows
  | $cols, $rows[]
  | @csv'
[
    {"code": "NSW", "name": "New South Wales", "level":"state", "country": "AU"},
    {"code": "AB", "name": "Alberta", "level":"province", "country": "CA"},
    {"code": "ABD", "name": "Aberdeenshire", "level":"council area", "country": "GB"},
    {"code": "AK", "name": "Alaska", "level":"state", "country": "US"}
]

# Exampmle 2
jora 'if . == 0 then
    "zero"
  elif . == 1 then
    "one"
  else
    "many"
  end
'
2
```

### Support jora command line options

```json
# Example 1
jora --slurp '. + [5] + [6]'
[
  1,
  2,
  3
]

# Example 2
jora --arg var val '.value = $var'
{}

# Example 3
jora --raw-input --slurp 'split("\\n")'
foo\nbar\nbaz

# Example 4
jora -r '(map(keys) | add | unique) as $cols | map(. as $row | $cols | map($row[.])) as $rows | $cols, $rows[] | @csv'
[
    {"code": "NSW", "name": "New South Wales", "level":"state", "country": "AU"},
    {"code": "AB", "name": "Alberta", "level":"province", "country": "CA"},
    {"code": "ABD", "name": "Aberdeenshire", "level":"council area", "country": "GB"},
    {"code": "AK", "name": "Alaska", "level":"state", "country": "US"}
]

# Example 5
jora --raw-output '"\(.one)\t\(.two)"'
{"one":1,"two":"x"}
```

## Use workspace file as command input or/and query filter

```json
# Opened workspace file as filter
jora opened-workspace-file-filter.jora
[1, 2, 3, 4, 5]

# Opened workspace file as filter and query input
jora opened-workspace-file-filter.jora
opened-workspace-file-with-data.json
```

## Redirect output's filter

```json
jora '[.[].url]'
> tmp.json
$ curl 'https://api.github.com/repos/stedolan/jora/commits?per_page=5'
```

## Available commands

http|curl|wget|cat|echo|ls|dir|grep|tail|head|find

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

## Contributors

Thanks for original vscode-jora-playground [💻](https://github.com/obenjiro/vscode-jora-playground) [David Nussio](https://github.com/davidnussio)

Thanks for cwd module patching [💻](https://github.com/obenjiro/vscode-jora-playground/commits?author=jpandersen87) [Joseph Andersen](https://github.com/jpandersen87)

Thanks for updating deps and binary [💻](https://github.com/obenjiro/vscode-jora-playground/commits?author=yozlet) [Yoz Grahame](https://github.com/yozlet)

Thanks for input variable [💻](https://github.com/obenjiro/vscode-jora-playground/commits?author=JeffreyMercado) [Jeff Mercado](https://github.com/JeffreyMercado)

Thanks for input variable [💻](https://github.com/obenjiro/vscode-jora-playground/commits?author=leonelgalan) [Leonel Galán](https://github.com/leonelgalan)

## Thanks

I be inspired by [vscode-jora](https://marketplace.visualstudio.com/items?itemName=dandric.vscode-jora)
