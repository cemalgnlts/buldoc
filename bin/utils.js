const fs = require("fs");

function isFolderAccessible(path) {
    try {
        fs.accessSync(path, fs.constants.W_OK | fs.constants.R_OK);
        return true;
    } catch (e) {
        return false;
    }
}

function isInProject(path) {
    if (path.endsWith("docs")) return true;
    return fs.readdirSync(path).includes("docs");
}

module.exports = {
    isFolderAccessible,
    isInProject
};
