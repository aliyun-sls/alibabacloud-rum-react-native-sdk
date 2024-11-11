"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PickerHelper = void 0;
exports.PickerHelper = (OpenRUMSDK, Logger) => {
    return {
        attachToOnValueChange: function (onValueChange, children) {
            return (itemValue, itemNumber) => {
                let value = this.getPickerItemValue(children, itemNumber, itemValue);
                if(OpenRUMSDK != null){
                    OpenRUMSDK.enterAction(`Picked Value: ${value}`);
                }
                if (onValueChange !== undefined) {
                    onValueChange(itemValue, itemNumber);
                }
            };
        },
        getPickerItemValue(children, index, value) {
            if (children && index >= 0) {
                if (children && children.length >= index && isPickerItemProps(children[index].props)) {
                    return children[index].props.label;
                }
            }
            return value;
        }
    };
};
function isPickerItemProps(props) {
    return props.label !== undefined;
}
