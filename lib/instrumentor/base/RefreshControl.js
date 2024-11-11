"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshControlHelper = void 0;
const IOpenRUMProperties_1 = require("./OpenRUMProperty");
const RefreshControlHelper = (OpenRUM) => ({
    attachOnRefresh: (refreshControlProps) => {
        if ((0, IOpenRUMProperties_1.isOpenRUMIgnored)(refreshControlProps)) {
            return;
        }
        const origOnRefresh = refreshControlProps.onRefresh;
        const nameOfAction = _findActionName(refreshControlProps);
        if (origOnRefresh != null) {
            refreshControlProps.onRefresh = () => {
                const finalNameOfAction = nameOfAction == null ? 'Swipe to Refesh' : `Swipe to Refesh ${nameOfAction}`;
                const action = OpenRUM.enterAutoAction(finalNameOfAction);
                try {
                    if (origOnRefresh != null) {
                        origOnRefresh();
                    }
                }
                finally {
                    action.leaveAction();
                }
            };
        }
    },
});
exports.RefreshControlHelper = RefreshControlHelper;
const _findActionName = (refreshControlProps) => {
    if ((0, IOpenRUMProperties_1.isOpenRUMNaming)(refreshControlProps)) {
        return refreshControlProps.brActionName;
    }
    else if (refreshControlProps.accessibilityLabel != null) {
        return refreshControlProps.accessibilityLabel;
    }
    return null;
};
