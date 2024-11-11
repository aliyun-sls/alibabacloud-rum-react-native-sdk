#!/usr/bin/env node
"use strict";
const __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) {
        return value instanceof P ? value : new P(function (resolve) {
            resolve(value);
        });
    }

    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) {
            try {
                step(generator.next(value));
            } catch (e) {
                reject(e);
            }
        }

        function rejected(value) {
            try {
                step(generator["throw"](value));
            } catch (e) {
                reject(e);
            }
        }

        function step(result) {
            result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
        }

        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkConfiguration = exports.readConfig = exports.defaultConfig = exports.ERROR_CONFIG_NOT_AVAILABLE = void 0;
const fileOperationHelper_1 = require("./util/fileOperationHelper");
const pathsConstants_1 = require("./util/PathsConstants");
exports.ERROR_CONFIG_NOT_AVAILABLE = "-1";
exports.defaultConfig = {
    react: {
         /**
         * Debug Logs
         */
          debug: false,
          /**
           * Allows you to filter the instrumentation for touch events, refresh events and picker events in certain files
           * True = Will be instrumented
           */
          instrument: (filename) => {
              return true;
          },
          lifecycle: {
              /**
               * Monitor the navigation service switch. The default value is false
               */
              listenNavigation: true,
  
              /**
               * The data collection rules of component life cycle can be set to specify the fuzzy matching of component name
               */
              componentName: null,
          },
    }
};
// let isSaveOpenRUMConfig = false;
function readConfig() {
    let readConfig;
    let pathToConfig = pathsConstants_1.path.getConfigFilePath();
    // if (!isSaveOpenRUMConfig) {
        // patchMalformedConfiguration(pathToConfig);
        // isSaveOpenRUMConfig = true;
    // }
    readConfig = requireSourceCatch(pathToConfig)
    if (readConfig === undefined) {
        readConfig = {};
    }
    return addDefaultConfigs(readConfig);
}
exports.readConfig = readConfig;
function addDefaultConfigs(config) {
    let duplicateDefaultConfigReact = Object.assign({}, exports.defaultConfig.react);
    duplicateDefaultConfigReact = Object.assign(duplicateDefaultConfigReact, config.react);
    duplicateDefaultConfigReact.lifecycle = Object.assign(duplicateDefaultConfigReact.lifecycle, config.react.lifecycle);
    config.react = duplicateDefaultConfigReact;
    return config;
}

function patchMalformedConfiguration(pathToOpenRUMConfig) {
    let configContent = fileOperationHelper_1.default.readTextFromFileSync(pathToOpenRUMConfig);
    if (configContent.indexOf("\u200B") !== -1) {
        fileOperationHelper_1.default.writeTextToFileSync(pathsConstants_1.path.getLocalConfigFile(), configContent.split("\u200B").join(""));
    }else{
        fileOperationHelper_1.default.writeTextToFileSync(pathsConstants_1.path.getLocalConfigFile(), configContent);
    }

}

// 兼容用户未配置OpenRUM.js 配置文件启用内置配置文件
function requireSourceCatch(pathName){
    let reqData;
    try {
        reqData= require(pathName);
        patchMalformedConfiguration(pathName);  //文件读写
    } catch (error) {
        // 启用备用文件
        reqData=require('./../files/default.config.js')
    }
    return reqData;
}


function checkConfiguration() {
    return __awaiter(this, void 0, void 0, function* () {
        let pathToOpenRUMConfig = pathsConstants_1.path.getConfigFilePath();
        try {
            yield fileOperationHelper_1.default.checkIfFileExists(pathToOpenRUMConfig);
        }
        catch (e) {
            yield createNewConfiguration(pathToOpenRUMConfig);
        }
    });
}
exports.checkConfiguration = checkConfiguration;
function createNewConfiguration(pathToOpenRUMConfig) {
    return __awaiter(this, void 0, void 0, function* () {
        let defaultConfigContent = yield fileOperationHelper_1.default.readTextFromFile(pathsConstants_1.path.getDefaultConfig());
        yield fileOperationHelper_1.default.writeTextToFile(pathToOpenRUMConfig, defaultConfigContent);
        console.log("Created OpenRUM.config.js - Please insert your configuration and update the file!");
    });
}
