const showdown = require("showdown");

const template = fs.readFileSync(
    path.join(__dirname, "template.html"),
    "utf-8"
);

const options = {};

showdown.setFlavor("github");

const converter = new showdown.Converter({
    ...options
});

module.exports = {
    parse(text) {
        return template.replace("%CONTENT%", converter.makeHtml(text));
    }
}
