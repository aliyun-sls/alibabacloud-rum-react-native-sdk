"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NavComponent = exports.PureComponent = exports.Component = void 0;
const Lifecycle_1 = require("../instrumentor/base/Lifecycle");
const OpenRUM_1 = require("../instrumentor/base/OpenRUMSDK");
const Logger_1 = require("../util/Logger");
const React = require("react");
class Component extends React.Component {
    constructor(props) {
        super(props);
        Lifecycle_1.LifecycleHelper(OpenRUM_1.OpenRUMSDK, Logger_1.Logger).attachLifecycleListener(this);
    }
}
exports.Component = Component;
class PureComponent extends React.PureComponent {
    constructor(props) {
        super(props);
        Lifecycle_1.LifecycleHelper(OpenRUM_1.OpenRUMSDK, Logger_1.Logger).attachLifecycleListener(this);
    }
}
exports.PureComponent = PureComponent;
class NavComponent extends React.Component {
    constructor(props) {
        super(props);
        const renderOrig = this.render.bind(this);
        this.render = () => {
            return renderOrig();
        };
    }
}
exports.NavComponent = NavComponent;
