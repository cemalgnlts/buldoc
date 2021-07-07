# Introduction

Converts Markdown files to HTML pages. It uses [Bulma](https://github.com/jgthms/bulma) CSS library. It uses the [showdownjs](https://github.com/showdownjs/showdown) library to convert the markdown file to HTML code.

# Setup

1. Download project
2. `npm install -g .`

# Usage

To create a new document: `buldoc new flowers`

Result:
```
flowers/
├─ docs/
│  ├─ index.md
├─ static/
```

Documents should be added to the **docs** folder.


To generate the HTML pages, in the home directory *( ./flowers or ./flowers/docs )*
run: `buldoc build`

HTML pages are added to the **static** folder.

Result:
```
flowers/
├─ docs/
│  ├─ index.md
├─ static/
│  ├─ index.html
```