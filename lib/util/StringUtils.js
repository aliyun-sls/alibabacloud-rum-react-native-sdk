"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StringUtils = void 0;
exports.StringUtils = {
    isStringNullEmptyOrUndefined(value) {
        return !value;
    }
};
//路由切换回调执行锁
exports.routerFunctionRoot = {}

const isType = function(type){
    return function(data){
        return Object.prototype.toString.call(data) === '[object ' + type + ']';
    }
}
exports.isObject = isType( 'Object' );
exports.isFunction = isType( 'Function' );
exports.isString = isType( 'String' );
exports.isArray = isType( 'Array' );
exports.isNumber = isType( 'Number' );
