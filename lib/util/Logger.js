"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const Configuration_1 = require("@OpenRUM/react-native-plugin/lib/instrumentor/Configuration");
const LOG_PREFIX = "OpenRUM: ";
exports.Logger = {
    logDebug(message) {
        if (Configuration_1.react.debug) {
            console.debug(LOG_PREFIX + message);
        }
    },
    logInfo(message) {
        console.info(LOG_PREFIX + message);
    },
    logWarn(message) {
        console.warn(LOG_PREFIX + message);
    }
};
