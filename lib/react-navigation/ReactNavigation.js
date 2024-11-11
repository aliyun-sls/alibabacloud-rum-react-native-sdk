"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerListener = void 0;
const React = require("react");
// const Logger_1 = require("../instrumentor/base/Logger");
const OpenRUMSDK_1 = require("../instrumentor/base/OpenRUMSDK");
const OpenRUM_1=require("../instrumentor/base/OpenRUM");
let isRegistered = false;
const registerListener = (navContainer) => {
    React.useEffect(() => {
        if (isRegistered && navContainer.current != null && navContainer.current.addListener != null) {
            isRegistered = true;
            navContainer.current.addListener('__unsafe_action__', (data) => {
                if (data != null && data.data != null && data.data.action != null) {
                    // Logger_1.Logger.logDebug(`ReactNavigation Listener Dispatch: ${JSON.stringify(data.data.action)}`);
                }
            });
            navContainer.current.addListener('state', (state) => {
                OpenRUM_1.OpenRUM.reportRouterData(state)
                // Logger_1.Logger.logDebug(`ReactNavigation Listener State: ${JSON.stringify(state)}`);
            });
        }
    });
};
exports.registerListener = registerListener;
