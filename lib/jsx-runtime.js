"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ElementHelper_1 = require("./instrumentor/base/ElementHelper");
const Types_1 = require("./instrumentor/model/types");
const Component_1 = require("./react/Component");
try {
    let _jsxRuntime;
    try {
        _jsxRuntime = require('react/jsx-runtime.js');
    }
    catch (error) {
        try {
            _jsxRuntime = require('../../../react/jsx-runtime');
        }
        catch (error) {
            _jsxRuntime = null;
        }
    }
    if (_jsxRuntime != null) {
        const jsxProd = (type, config, maybeKey) => jsxHelper(_jsxRuntime.jsx, type, config, [maybeKey]);
        const jsxDev = (type, config, maybeKey, source, self) => jsxHelper(_jsxRuntime.jsx, type, config, [maybeKey, source, self]);
        const jsxsDev = (type, config, maybeKey, source, self) => jsxHelper(_jsxRuntime.jsxs, type, config, [maybeKey, source, self]);
        const jsxHelper = (jsxFn, type, config, args) => {
            if (type !== undefined && type._brInfo !== undefined && !(0, ElementHelper_1.isBrActionIgnore)(config)) {
                if (type._brInfo.type === Types_1.Types.FunctionalComponent) {
                    const wrapperProps = { children: [] };
                    wrapperProps.brActionName = (config !== undefined &&
                        config.brActionName !== undefined) ? config.brActionName : type._brInfo.name;
                    wrapperProps.children.push(jsxFn(type, config, ...args));
                    return _jsxRuntime.jsxs(Component_1.OpenRUMFnWrapper, wrapperProps);
                }
                else if (type._brInfo.type === Types_1.Types.ClassComponent &&
                    type.prototype !== undefined && type.prototype.isReactComponent !== undefined) {
                    const wrapperProps = { children: [] };
                    wrapperProps.children.push(jsxFn(type, config, ...args));
                    return _jsxRuntime.jsxs(Component_1.OpenRUMClassWrapper, wrapperProps);
                }
                if (Array.isArray(config.children)) {
                    (0, ElementHelper_1.modifyElement)(type, config, ...config.children);
                }
                else {
                    (0, ElementHelper_1.modifyElement)(type, config, config.children);
                }
            }
            return jsxFn(type, config, ...args);
        };
        module.exports = Object.assign(Object.assign({}, _jsxRuntime), { jsx: __DEV__ ? jsxDev : jsxProd, jsxs: __DEV__ ? jsxsDev : jsxProd });
    }
    else {
        module.exports = {};
    }
}
catch (error) {
    module.exports = {};
}
