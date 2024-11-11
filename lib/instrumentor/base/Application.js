"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationHandler = void 0;
const ErrorHandler_1 = require("./ErrorHandler");
const OpenRUM_1 = require("./OpenRUMSDK");
const Configuration_1 = require("../Configuration");
const Logger_1 = require("../../util/Logger");
const puginVersionString = require('../../../package.json').version;

let isStarted = false;

exports.ApplicationHandler = {
    startup() {
        if (isStarted) return;
        // let config;
        // if (Platform.OS === 'android') {
        //     config = Configuration_1.android
        // } else if (Platform.OS === 'ios') {
        //     config = Configuration_1.ios
        // }
        // if (config !== undefined) {
        //     let appID = config.appKey;
        //     let configAddress = config.redirectURL;
        //     if (appID === undefined) {
        //         Logger_1.Logger.logWarn("OpenRUM.config.js appKey is null!");
        //         return;
        //     }
        //     if (configAddress === undefined) {
        //         Logger_1.Logger.logWarn("OpenRUM.config.js redirectURL is null!");
        //         return;
        //     }
        // }
        //注册崩溃
        ErrorHandler_1.ErrorHandler(OpenRUM_1.OpenRUMSDK,Logger_1.Logger).registerErrorHandler();
        isStarted = true;
        Logger_1.Logger.logInfo("OpenRUM React Native Plugin("+puginVersionString+") started!");
    },
};
