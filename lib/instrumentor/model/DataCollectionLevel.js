"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataCollectionLevel = void 0;
const OpenRUMBridge_1 = require("@OpenRUM/react-native-plugin/lib/instrumentor/base/OpenRUMBridge");
let DataCollectionLevel;
(function (DataCollectionLevel) {
    DataCollectionLevel[DataCollectionLevel["Off"] = OpenRUMBridge_1.OpenRUMNative.DATA_COLLECTION_OFF] = "Off";
    DataCollectionLevel[DataCollectionLevel["Performance"] = OpenRUMBridge_1.OpenRUMNative.DATA_COLLECTION_PERFORMANCE] = "Performance";
    DataCollectionLevel[DataCollectionLevel["User"] = OpenRUMBridge_1.OpenRUMNative.DATA_COLLECTION_USERBEHAVIOR] = "User";
    DataCollectionLevel[DataCollectionLevel["UserBehavior"] = OpenRUMBridge_1.OpenRUMNative.DATA_COLLECTION_USERBEHAVIOR] = "UserBehavior";
})(DataCollectionLevel = exports.DataCollectionLevel || (exports.DataCollectionLevel = {}));
