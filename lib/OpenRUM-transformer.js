"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUpstreamTransformer = exports.transform = void 0;
const semver_1 = require("semver");
const nodePath = require("path");
const instrumentor = require("./instrumentor/instrumentation");
const config = require("./config");
const logger_1 = require("./util/Logger");
const reactNativeVersionString = require('react-native/package.json').version;
const reactNativeMinorVersion = semver_1.minor(reactNativeVersionString);
const puginVersionString = require('../package.json').version;

console.log("------"+new Date()+"------OpenRUM plugin transForm started--version------"+puginVersionString);
function transform(src, filename, options) {
    if (typeof src === 'object') {
        ({ src, filename, options } = src);
    }
    let reactOptions = undefined;
    try {
        reactOptions = config.readConfig();
        src = instrumentor.instrument(src,filename,reactOptions.react, reactNativeMinorVersion);
    } catch (e) {
        if (e.message === config.ERROR_CONFIG_NOT_AVAILABLE) {
            logger_1.Logger.logInfo("OpenRUM.config.js not found!");
        }
        else {
            logger_1.Logger.logInfo("Couldn't instrument file: " + filename+";errMessage: "+e.message);
        }
    }
    return getUpstreamTransformer().transform({ src, filename, options });
}

function getUpstreamTransformer(reactOptions) {
    if (reactNativeMinorVersion >= 59) {
        return require('metro-react-native-babel-transformer/src/index');
    }
    else if (reactNativeMinorVersion >= 56) {
        return require('metro/src/reactNativeTransformer');
    }
    else if (reactNativeMinorVersion >= 52) {
        return require('metro/src/transformer');
    }
    else if (reactNativeMinorVersion >= 48) {
        return require('metro-bundler/src/transformer');
    }
    else {
    }
}
exports.getUpstreamTransformer = getUpstreamTransformer;
exports.transform = transform;