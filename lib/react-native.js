"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("proxy-polyfill");
const Touchables_1 = require("./react-native/Touchables");
const reactNative = require("react-native");
const OpenRUMInstrument = {
    TouchableHighlight: Touchables_1.TouchableHighlight,
    TouchableNativeFeedback: Touchables_1.TouchableNativeFeedback,
    TouchableOpacity: Touchables_1.TouchableOpacity,
    TouchableWithoutFeedback: Touchables_1.TouchableWithoutFeedback,
    Button: Touchables_1.Button,
    // Text: Touchables_1.Text,
    // Pressable: Touchables_1.Pressable,
    // RefreshControl: RefreshControl_1.RefreshControl
};
const OpenRUMProxy = new Proxy(reactNative, {
    get(target, property) {
        if (OpenRUMInstrument[property] !== undefined) {
            return OpenRUMInstrument[property];
        }
        return target[property];
    }
});
module.exports = OpenRUMProxy;
