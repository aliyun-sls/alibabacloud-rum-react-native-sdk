"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Platform = void 0;
const OpenRUMBridge_1 = require("@OpenRUM/react-native-plugin/lib/instrumentor/base/OpenRUMBridge");
let Platform;
(function (Platform) {
    Platform[Platform["Android"] = OpenRUMBridge_1.OpenRUMNative.PLATFORM_ANDROID] = "Android";
    Platform[Platform["Ios"] = OpenRUMBridge_1.OpenRUMNative.PLATFORM_IOS] = "Ios";
})(Platform = exports.Platform || (exports.Platform = {}));
