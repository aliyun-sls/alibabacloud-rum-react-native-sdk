"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ElementHelper_1 = require("./instrumentor/base/ElementHelper");
const Types_1 = require("./instrumentor/model/types");
const Component_1 = require("./react/Component");
const _createElement = require('react').createElement;
const createElement = (type, props, ...children) => {
    if (type != null && type._brInfo != null && !(0, ElementHelper_1.isBrActionIgnore)(props)) {
        if (type._brInfo.type === Types_1.Types.FunctionalComponent) {
            return _createElement(Component_1.OpenRUMFnWrapper, {}, _createElement(type, props, ...children));
        }
        else if (type._brInfo.type === Types_1.Types.ClassComponent &&
            type.prototype !== undefined && type.prototype.isReactComponent !== undefined) {
            return _createElement(Component_1.OpenRUMClassWrapper, {}, _createElement(type, props, ...children));
        }
        else {
            (0, ElementHelper_1.modifyElement)(type, props, ...children);
        }
    }
    return _createElement(type, props, ...children);
};
module.exports = {
    createElement
};
