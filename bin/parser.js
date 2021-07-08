const showdown = require("showdown");

const options = {};

showdown.setFlavor("github");

const converter = new showdown.Converter({
    ...options
});

module.exports = {
    parse(text) {
        return converter.makeHtml(text);
    }
}
