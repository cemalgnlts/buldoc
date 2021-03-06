const fs = require("fs");
const path = require("path");
const parser = require("./parser");

let template = parser.getTemplate(path.join(__dirname, "template.html"));

function render(workingDir) {
    console.log("\u29d7 Rendering...");
    console.time("renderTime");

    const docsFolder = path.join(workingDir, "docs");
    const outputFolder = path.join(workingDir, "static");

    eachFolder(docsFolder, outputFolder);

    console.timeEnd("renderTime");
    console.log("\u2713 Completed.");
}

function eachFolder(docsFolder, outputFolder) {
    if (!fs.existsSync(outputFolder)) fs.mkdirSync(outputFolder);
    const markdowns = fs.readdirSync(docsFolder);

    for (let fileName of markdowns) {
        const fileDir = path.join(docsFolder, fileName);
        const isDirectory = fs.lstatSync(fileDir).isDirectory();

        if (isDirectory === true) {
            eachFolder(
                path.join(docsFolder, fileName),
                path.join(outputFolder, fileName)
            );
            continue;
        }

        mdToHtml(fileDir, fileName, outputFolder);
    }
}

function mdToHtml(fileDir, fileName, outputDir) {
    const content = fs.readFileSync(fileDir, "utf-8");
    const data = parser.parse(content, template);
    const newFileName = fileName.replace(/\.md$/, ".html");
    const dir = path.join(outputDir, newFileName);
    fs.writeFileSync(dir, data);
    console.timeLog("renderTime", fileName, "\u279c", newFileName);
}

module.exports.render = render;
