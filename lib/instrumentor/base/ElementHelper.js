"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isBrActionIgnore = exports.modifyElement = exports.instrumentCreateElement = void 0;
const Types_1 = require("@OpenRUM/react-native-plugin/lib/instrumentor/model/types");
const Component_1 = require("@OpenRUM/react-native-plugin/lib/react/Component");
// const Logger_1 = require("./Logger");
const Picker_1 = require("@OpenRUM/react-native-plugin/lib/instrumentor/base/Picker");
const Touchable_1 = require("@OpenRUM/react-native-plugin/lib/instrumentor/base/Touchable");
const OpenRUMSDK_1 = require("@OpenRUM/react-native-plugin/lib/instrumentor/base/OpenRUMSDK");
const RefreshControl_1 = require("@OpenRUM/react-native-plugin/lib/instrumentor/base/RefreshControl");
const Switch_1 = require("@OpenRUM/react-native-plugin/lib/instrumentor/base/Switch");
const instrumentCreateElement = (reactModule) => {
    if (reactModule != null && reactModule.createElement != null) {
        const reactCreateElement = reactModule.createElement;
        reactModule.createElement = (type, props, ...children) => {
            if (type != null && type._brInfo != null && !(0, exports.isBrActionIgnore)(props)) {
                if (type._brInfo.type === Types_1.Types.FunctionalComponent) {
                    return reactCreateElement(Component_1.OpenRUMFnWrapper, {}, reactCreateElement(type, props, ...children));
                }else if (type._brInfo.type === Types_1.Types.ClassComponent &&
                    type.prototype !== undefined && type.prototype.isReactComponent !== undefined) {
                        return reactCreateElement(Component_1.OpenRUMClassWrapper, {}, reactCreateElement(type, props, ...children));
                }else {
                    (0, exports.modifyElement)(type, props, ...children);
                }
            }
            return reactCreateElement(type, props, ...children);
        };
    }
};
exports.instrumentCreateElement = instrumentCreateElement;
const modifyElement = (type, props, ...children) => {
    if (props != null) {
        if (type._brInfo.type === Types_1.Types.RefreshControl && props.onRefresh != null) {
            (0, RefreshControl_1.RefreshControlHelper)(OpenRUMSDK_1.OpenRUMSDK).attachOnRefresh(props);
        }else if (type._brInfo.type === Types_1.Types.Switch && props.onValueChange != null) {
            (0, Switch_1.SwitchHelper)(OpenRUMSDK_1.OpenRUMSDK).attachOnValueChange(props);
        }else if (type._brInfo.type === Types_1.Types.Button ||
            type._brInfo.type === Types_1.Types.Text ||
            type._brInfo.type === Types_1.Types.Pressable ||
            (0, Types_1.isTypeTouchable)(type._brInfo.type)) {
            if (props.onPress != null) {
                props.onPress = (0, Touchable_1.TouchableHelper)(OpenRUMSDK_1.OpenRUMSDK).attachOnPress(type,false, props, children);
            }
            if (props.onLongPress != null) {
                props.onLongPress = (0, Touchable_1.TouchableHelper)(OpenRUMSDK_1.OpenRUMSDK).attachOnPress(type,true, props, children);
            }
        }else if (props.onValueChange != null && type._brInfo.type === Types_1.Types.Picker) {
            (0, Picker_1.PickerHelper)(OpenRUMSDK_1.OpenRUMSDK).attachOnValueChange(props);
        }
    }
};
exports.modifyElement = modifyElement;
const isBrActionIgnore = (props) => props != null && String(props.brActionIgnore).toLowerCase() === 'true';
exports.isBrActionIgnore = isBrActionIgnore;
