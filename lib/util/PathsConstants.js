const nodePath = require('path');
let rootPath = __dirname;
const PATH_FILES = "files";
const PATH_LOGS = "logs";
exports.path = {
    setRoot: function (newRoot) {
        rootPath = nodePath.resolve(newRoot);
    },
    getApplicationPath: function () {
        return nodePath.join(getPluginPath(), "..", "..", "..");
    },
    getBuildPath: function () {
        return nodePath.join(getPluginPath(),"..","brbuild");
    },
    getConfigFilePath: function () {
        return nodePath.join(this.getApplicationPath(), "..","OpenRUM.config.js");
    },
    getLocalConfigFile: function () {
        return nodePath.join(rootPath,"..","instrumentor", "Configuration.js");
    },
    getDefaultConfig: function () {
        return nodePath.join(getPluginPath(), "..",PATH_FILES, "default.config.js");
    },
    getLogPath: function () {
        return nodePath.join(getPluginPath(), PATH_LOGS);
    },
    getPackageJsonFile:function(){
        return nodePath.join(this.getApplicationPath(), "package.json");
    },
    getMetroSouceMapPath: function () {
        return nodePath.join(this.getApplicationPath(), "node_modules", "metro", "src", "DeltaBundler", "Serializers", "helpers");
    },
};

function getPluginPath() {
    return nodePath.join(rootPath, "..");
}
