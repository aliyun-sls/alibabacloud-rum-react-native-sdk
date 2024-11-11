"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isOpenRUMIgnored = exports.isOpenRUMNaming = void 0;
const isOpenRUMNaming = (properties) => properties.ActionName !== undefined;
exports.isOpenRUMNaming = isOpenRUMNaming;
const isOpenRUMIgnored = (properties) => properties.brActionIgnore !== undefined
    && properties.brActionIgnore === true
    || properties.brActionIgnore === 'true';
exports.isOpenRUMIgnored = isOpenRUMIgnored;
