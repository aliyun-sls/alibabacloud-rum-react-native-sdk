"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Switch = void 0;
const ReactNative = require("react-native");
const Types_1 = require("../instrumentor/model/types");
if (typeof ReactNative.Switch === 'object') {
    exports.Switch = Object.assign({ _brInfo: { type: Types_1.Types.Switch } }, ReactNative.Switch);
}
else {
    exports.Switch = (_a = class Switch extends ReactNative.Switch {
        },
        _a._brInfo = { type: Types_1.Types.Switch },
        _a);
}
