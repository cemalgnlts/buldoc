#!/usr/bin/env node
const fs = require("fs");
const { parse } = require("path");
const path = require("path");
const docGenerator = require("./DocGenerator");
const { isFolderAccessible, isInProject } = require("./utils");

const [, , ...args] = process.argv;
const cwd = process.cwd();

const fun = args[0];

if (fun === "new") {
    if (!args[1]) {
        console.error("Please write folder name: buldoc new foldername");
        return;
    }
    
    if (!isFolderAccessible(projectDir)) {
        console.error("The directory you are in is not readable or writable!");
        return;
    }

    createProject(path.join(cwd, args[1]));
} else if (fun === "build") {
    if (!isInProject(cwd)) {
        console.log("The docs folder could not be found.");
        console.error(
            "\t",
            "This command should be run while in the docs folder."
        );
        return;
    } else {
        let folder = cwd;
        if (folder.endsWith("docs")) {
            folder = folder.split(path.sep);
            folder.pop();
            folder = folder.join(path.sep);
        }
        docGenerator.render(folder);
    }
} else {
    console.log("Command not found!");
    console.log("\t", "buldoc new [name] Create new document");
    console.log("\t", "buldoc build      Build your document");
}

function createProject(projectDir) {
    if (fs.existsSync(projectDir)) {
        console.error("This folder already exists!");
        return;
    }
    const projectDocsDir = path.join(projectDir, "docs");

    fs.mkdirSync(projectDir);
    fs.mkdirSync(projectDocsDir);
    fs.mkdirSync(path.join(projectDir, "static"));
    fs.writeFileSync(path.join(projectDocsDir, "index.md"), "# Hello");

    console.log("\u2713 Created.");
}
