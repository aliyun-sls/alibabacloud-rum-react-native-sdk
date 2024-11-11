"use strict";
var _a, _b, _c, _d;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Pressable = exports.Text = exports.TouchableWithoutFeedback = exports.TouchableNativeFeedback = exports.TouchableHighlight = exports.TouchableOpacity = exports.Button = void 0;
const ReactNative = require("react-native");
const React = require("react");
const Types_1 = require("../instrumentor/model/types");
exports.Button = React.forwardRef((props, ref) => React.createElement(ReactNative.Button, Object.assign({}, props, { ref: ref })));
exports.Button._brInfo = { type: Types_1.Types.Button };
if (typeof ReactNative.TouchableOpacity === 'object') {
    exports.TouchableOpacity = Object.assign({ _brInfo: { type: Types_1.Types.TouchableOpacity } }, ReactNative.TouchableOpacity);
}
else {
    exports.TouchableOpacity = (_a = class TouchableOpacity extends (ReactNative.TouchableOpacity) {
        },
        _a._brInfo = { type: Types_1.Types.TouchableOpacity },
        _a);
}
if (typeof ReactNative.TouchableHighlight === 'object') {
    exports.TouchableHighlight = Object.assign({ _brInfo: { type: Types_1.Types.TouchableHighlight } }, ReactNative.TouchableHighlight);
}
else {
    exports.TouchableHighlight = (_b = class TouchableHighlight extends (ReactNative.TouchableHighlight) {
        },
        _b._brInfo = { type: Types_1.Types.TouchableHighlight },
        _b);
}
if (typeof ReactNative.TouchableNativeFeedback === 'object') {
    exports.TouchableNativeFeedback = Object.assign({ _brInfo: { type: Types_1.Types.TouchableNativeFeedback } }, ReactNative.TouchableNativeFeedback);
}
else {
    exports.TouchableNativeFeedback = (_c = class TouchableNativeFeedback extends (ReactNative.TouchableNativeFeedback) {
        },
        _c._brInfo = { type: Types_1.Types.TouchableNativeFeedback },
        _c);
}
exports.TouchableWithoutFeedback = React.forwardRef((props, ref) => React.createElement(ReactNative.TouchableWithoutFeedback, Object.assign({}, props, { ref: ref })));
exports.TouchableWithoutFeedback._brInfo = { type: Types_1.Types.TouchableWithoutFeedback };
if (typeof ReactNative.Text === 'object') {
    exports.Text = Object.assign({ _brInfo: { type: Types_1.Types.Text } }, ReactNative.Text);
}
else {
    exports.Text = (_d = class Text extends ReactNative.Text {
        },
        _d._brInfo = { type: Types_1.Types.Text },
        _d);
}
exports.Pressable = React.forwardRef((props, ref) => React.createElement(ReactNative.Pressable, Object.assign({}, props, { ref: ref })));
exports.Pressable._brInfo = { type: Types_1.Types.Pressable };
