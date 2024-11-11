"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchHelper = void 0;
const IOpenRUMProperties_1 = require("./OpenRUMProperty");
const SwitchHelper = (OpenRUM) => ({
    attachOnValueChange: (switchProps) => {
        if ((0, IOpenRUMProperties_1.isOpenRUMIgnored)(switchProps)) {
            return;
        }
        const origOnValueChange = switchProps.onValueChange;
        const nameOfAction = _findActionName(switchProps);
        if (origOnValueChange != null) {
            switchProps.onValueChange = (value) => {
                let finalNameOfAction;
                if (nameOfAction == null) {
                    finalNameOfAction = `Touch on Switch to ${value}`;
                }
                else {
                    finalNameOfAction = `Touch on Switch ${nameOfAction} to ${value}`;
                }
                const action = OpenRUM.enterAutoAction(finalNameOfAction);
                let isSyncError = true;
                try {
                    const returnValue = origOnValueChange(value);
                    if (_isPromise(returnValue)) {
                        isSyncError = false;
                        return returnValue.finally(() => {
                            action.leaveAction();
                        });
                    }
                    else {
                        action.leaveAction();
                    }
                    isSyncError = false;
                }
                finally {
                    if (isSyncError) {
                        action.leaveAction();
                    }
                }
            };
        }
    },
});
exports.SwitchHelper = SwitchHelper;
const _findActionName = (switchProps) => {
    if ((0, IOpenRUMProperties_1.isOpenRUMNaming)(switchProps)) {
        return switchProps.brActionName;
    }
    else if (switchProps.accessibilityLabel != null) {
        return switchProps.accessibilityLabel;
    }
    return null;
};
const _isPromise = (object) => object != null
    && typeof object.then === 'function'
    && typeof object.catch === 'function';
