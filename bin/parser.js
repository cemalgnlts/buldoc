const showdown = require("showdown");
const fs = require("fs");

const options = {};

showdown.setFlavor("github");

const converter = new showdown.Converter({
    ...options
});

module.exports = {
    getTemplate(path) {
        return fs.readFileSync(path, "utf-8");
    },
    parse(text, template) {
        return template.replace("%CONTENT%", converter.makeHtml(text));
    }
}
