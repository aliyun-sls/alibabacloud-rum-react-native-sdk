"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const StringUtils_1 = require("../../util/StringUtils");
const types_1 = require("../model/types");
exports.TouchableHelper = void 0;
exports.TouchableHelper = (OpenRUMSDK, Logger) => {
    return {
        attachOnPress: function (type,longPress, props, children) {
            const origFunction = longPress && this._isLongPress(props) ? props.onLongPress : props.onPress;
            const nameOfAction = this._findActionName(props, children);
            const isButton = this._isPropsButton(props);
            return (event) => {
                if(nameOfAction==null){
                    if(origFunction != null){
                        // 找不到名称，跳过创建操作
                        return origFunction(event);
                    }
                }else if(origFunction != null && origFunction._brWrapped !== undefined && origFunction._brWrapped === true){
                    // 已经包装过了，跳过包装
                    return origFunction(event);
                }else{
                    const propsName = types_1.Types[type._brInfo.type];
                    const evt = event.timeStamp||(new Date()).getTime();
                    if (origFunction != null) {
                        origFunction(event);
                    }
                    const stayTime = (new Date()).getTime() - evt;
                    if(OpenRUMSDK != null){
                        OpenRUMSDK.onActionEvent(evt,nameOfAction,stayTime,1,propsName);
                        // OpenRUMSDK.onActionEvent(evt,nameOfAction,stayTime,1);
                    }
                }

            };
        },
        _findActionName: function (props, children) {
            if (this._isOpenRUMProperties(props)) {
                return props.brActionName;
            }
            else if (this._isPropsButton(props) && props.title != null) {
                return props.title;
            }
            else if (children != null && children.length > 0) {
                if (children.length === 1 &&
                    typeof children[0] === 'string') {
                    return children[0];
                }
                else {
                    return this._walkChildrenToFindText(children);
                }
            }
            else if (props.accessibilityLabel != null) {
                return props.accessibilityLabel;
            }
            else if(props.children != null){
                if (typeof props.children === 'string') {
                    return props.children;
                }
                else {
                    return this._walkChildrenToFindText(props.children);
                }
            }
            return null
        },
        _isPropsButton(props) {
            return props.title != null;
        },
        _isImageButton(props) {
            return props.source != null;
        },
        _isLongPress(props) {
            return props.onLongPress != null;
        },
        _isImageURISourceType(source) {
            return source.uri != null;
        },
        _isIconButton(element) {
            let type = element.type;
            return type != null && type.name === "Icon";
        },
        _walkTreeToFindText: function (element) {
            if (element == null || element.props == null) {
                return null;
            }
            else if (this._isImageButton(element.props)) {
                if (this._isImageURISourceType(element.props.source)) {
                    return "Image Button: " + element.props.source.uri;
                }
                else {
                    return "Image Button";
                }
            }
            else if (this._isIconButton(element) && element.props.name != null) {
                return "Icon Button: " + element.props.name;
            }
            return this._walkChildrenToFindText(element.props.children);
        },
        _walkChildrenToFindText: function (children) {
            if (typeof children === "string") {
                return children;
            }
            else if (Array.isArray(children)) {
                for (let i = 0; i < children.length; i++) {
                    let childrenValueElem = children[i];
                    if (this._isReactElement(childrenValueElem)) {
                        let name = this._walkTreeToFindText(childrenValueElem);
                        if (name != null) {
                            return name;
                        }
                    }
                }
                return null;
            }
            else {
                return this._walkTreeToFindText(children);
            }
        },
        _isReactElement(node) {
            return node != null && node.props != null;
        },
        _isOpenRUMProperties(properties) {
            return properties.brActionName !== undefined;
        }
    };
};
