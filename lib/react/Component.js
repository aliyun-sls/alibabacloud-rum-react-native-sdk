"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpenRUMClassWrapper = exports.OpenRUMFnWrapper = void 0;
const react_1 = require("react");
// const ConfigurationHandler_1 = require("../instrumentor/base/configuration/ConfigurationHandler");
// const NullAction_1 = require("../instrumentor/base/NullAction");
const Lifecycle_1 = require("@OpenRUM/react-native-plugin/lib/instrumentor/base/Lifecycle");
const OpenRUM_1 = require("@OpenRUM/react-native-plugin/lib/instrumentor/base/OpenRUMSDK");
const Logger_1 = require("@OpenRUM/react-native-plugin/lib/util/Logger");
const OpenRUMFnWrapper = (props) => {
    // action 事件相关
    Lifecycle_1.LifecycleHelper(OpenRUM_1.OpenRUMSDK,Logger_1.Logger).attachFunctionalLifecycleListenerIn(props)
    // (0, react_1.useEffect)(() => {
    //     Lifecycle_1.LifecycleHelper(OpenRUM_1.OpenRUMSDK,Logger_1.Logger).attachFunctionalLifecycleListenerOut(props)
    // });
    return props.children;
};
exports.OpenRUMFnWrapper = OpenRUMFnWrapper;
class OpenRUMClassWrapper extends react_1.Component {
    constructor(props) {
        super(props);
        this.wrappingName = getNameFromComponent(props);
        this.componentMounted = false;
        Lifecycle_1.LifecycleHelper(OpenRUM_1.OpenRUMSDK, Logger_1.Logger).attachLifecycleListener(this);
    }
    render() {
        // if (!ConfigurationHandler_1.ConfigurationHandler.isConfigurationAvailable()) {
        //     Logger_1.Logger.logInfo(`Component ${this.wrappingName}: React Native plugin has not been started yet! Component will not be reported!`);
        // }
        // else {
            // if (!this.componentMounted) {
            //     const actionPrefix = !this.componentMounted ? 'Render ' : 'Update ';
                // this.internalAction = OpenRUM_1.OpenRUM.enterAutoAction(actionPrefix + this.wrappingName);
            // }
        // }
        return this.props.children;
    }
    componentWillUnmount() {
        // this.componentMounted = false;
    }
    componentDidUpdate() {
        // this.reportFunctionEvent('componentDidUpdate()');
    }
    componentDidMount() {
        // this.componentMounted = true;
        // this.reportFunctionEvent('componentDidMount()');
    }
    reportFunctionEvent(event) {
        // if (this.internalAction !== undefined) {
        //     this.internalAction.reportEvent(`${this.wrappingName}.${event}`);
        //     this.internalAction.leaveAction();
        //     this.internalAction = undefined;
        // }
    }
}
exports.OpenRUMClassWrapper = OpenRUMClassWrapper;
const getNameFromComponent = (props) => {
    if (props !== undefined && props.children !== undefined) {
        let child;
        if (Array.isArray(props.children) && props.children.length === 1) {
            child = props.children[0];
        }
        else {
            child = props.children;
        }
        if (child.props !== undefined && child.props.brActionName !== undefined) {
            return child.props.brActionName;
        }
        else if (child.type !== undefined) {
            if (child.type.displayName !== undefined) {
                return child.type.displayName;
            }
            else if (child.type._brInfo !== undefined) {
                return child.type._brInfo.name;
            }
            else {
                return child.type.name;
            }
        }
    }
    else {
        return 'Undefined Name';
    }
};
