"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("proxy-polyfill");
const Component_1 = require("./react/Component");
const react = require("react");
// const ElementHelper_1 = require("./instrumentor/base/ElementHelper");
// createElement  react 17之后不用当前api
const OpenRUMInstrument = {
    // createElement: createElement, 
    Component: Component_1.Component,
    PureComponent: Component_1.PureComponent
};
const OpenRUMProxy = new Proxy(react, {
    get(target, property) {
        if (OpenRUMInstrument[property] !== undefined) {
            return OpenRUMInstrument[property];
        }
        return target[property];
    }
});
// 
// function createElement(type, props, ...children) {
//     type = ElementHelper_1.modifyElement(false, type, props, ...children);
//     return react.createElement(type, props, ...children);
// }
module.exports = OpenRUMProxy;

// 利用 proxy 代理react上的三个属性，createElement，Component，PureComponent
