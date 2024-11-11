"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ElementHelper_1 = require("@OpenRUM/react-native-plugin/lib/instrumentor/base/ElementHelper");
const Types_1 = require("@OpenRUM/react-native-plugin/lib/instrumentor/model/types");
const Component_1 = require("@OpenRUM/react-native-plugin/lib/react/Component");
try {
    let _jsxDevRuntime;
    try {
        _jsxDevRuntime = require('react/jsx-dev-runtime.js');
    }
    catch (error) {
        try {
            _jsxDevRuntime = require('react/jsx-dev-runtime');
        }
        catch (error) {
            _jsxDevRuntime = null;
        }
    }
    if (_jsxDevRuntime != null) {
        const jsxDEV = (...args) => {
            if (args[0] !== undefined && args[0]._brInfo !== undefined && !(0, ElementHelper_1.isBrActionIgnore)(args[1])) {
                if (args[0]._brInfo.type === Types_1.Types.FunctionalComponent) {
                    const wrapperProps = { children: [] };
                    wrapperProps.brActionName = (args[1] !== undefined &&
                        args[1].brActionName !== undefined) ? args[1].brActionName : args[0]._brInfo.name;
                    wrapperProps.children.push(_jsxDevRuntime.jsxDEV(args[0], args[1], ...args));
                    return _jsxDevRuntime.jsxDEV(Component_1.OpenRUMFnWrapper, wrapperProps);
                }
                else if (args[0]._brInfo.type === Types_1.Types.ClassComponent &&
                    args[0].prototype !== undefined && args[0].prototype.isReactComponent !== undefined) {
                    const wrapperProps = { children: [] };
                    wrapperProps.children.push(_jsxDevRuntime.jsxDEV(args[0], args[1], ...args));
                    return _jsxDevRuntime.jsxDEV(Component_1.OpenRUMClassWrapper, wrapperProps);
                }
                if (Array.isArray(args[1].children)) {
                    (0, ElementHelper_1.modifyElement)(args[0], args[1], ...args[1].children);
                }
                else {
                    (0, ElementHelper_1.modifyElement)(args[0], args[1], args[1].children);
                }
            }
            return _jsxDevRuntime.jsxDEV(...args);
        };
        module.exports = Object.assign(Object.assign({}, _jsxDevRuntime), { jsxDEV });
    }
    else {
        module.exports = {};
    }
}
catch (error) {
    module.exports = {};
}
