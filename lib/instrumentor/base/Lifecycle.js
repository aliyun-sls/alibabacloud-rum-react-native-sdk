"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LifecycleHelper = void 0;
const React = require("react");
const StringUtils_1 = require("../../util/StringUtils");
const Configuration_1 = require("../Configuration");
exports.LifecycleHelper = (OpenRUMSDK, Logger) => {
    return {
        evtTime:0,
        cacheData:{},
        regExpFilter:null,
        viewDidFocus:null,
        viewDidBlur:null,
        viewFocus:null,
        viewBlur:null,
        isRouteExit:false,
        viewName:'undefined',
        reportComponentRegExp:function(componentName){
            if(StringUtils_1.StringUtils.isStringNullEmptyOrUndefined(this.regExpFilter)){
                if(!StringUtils_1.StringUtils.isStringNullEmptyOrUndefined(Configuration_1.react.lifecycle)
                    && !StringUtils_1.StringUtils.isStringNullEmptyOrUndefined(Configuration_1.react.lifecycle.componentName)){
                    this.regExpFilter = new RegExp(Configuration_1.react.lifecycle.componentName);
                }else{
                    this.regExpFilter = new RegExp('.*');
                }
            }
            return this.regExpFilter.test(componentName);
        },
        attachFunctionalLifecycleListenerIn: function (props) {
            if(props&&props.children[0]&&props.children[0].props&&props.children[0].props.rootTag){
                let rootTag=props.children[0].props.rootTag;
                OpenRUMSDK.changRootTag(rootTag)
            }
            // return (...args) => {
            //     let component = origFunction(...args);
            //     React.useEffect(() => {
            //         console.info("view function event"+actionName);
            //     });
            //     return component;
            // };
        },
        attachFunctionalLifecycleListenerOut: function (props) {
            const actionName = props != null && props.brActionName !== undefined ? props.brActionName : origFunction._brInfo.name;
            // return (...args) => {
            //     let component = origFunction(...args);
            //     React.useEffect(() => {
            //         console.info("view function event"+actionName);
            //     });
            //     return component;
            // };
        },
        attachLifecycleListener: function (lifecycleComponent) {
            let componentDidMountOrig;
            if(lifecycleComponent.props&&lifecycleComponent.props.rootTag!==undefined){
                OpenRUMSDK.changRootTag(lifecycleComponent.props.rootTag)
            }
            if (lifecycleComponent.componentDidMount !== undefined) {
                componentDidMountOrig = lifecycleComponent.componentDidMount.bind(lifecycleComponent);
            }
            lifecycleComponent.componentDidMount = () => {
                this._componentDidMountOpenRUM(lifecycleComponent, componentDidMountOrig);
            };
            let componentDidUpdateOrig;
            if (lifecycleComponent.componentDidUpdate !== undefined) {
                componentDidUpdateOrig = lifecycleComponent.componentDidUpdate.bind(lifecycleComponent);
            }
            lifecycleComponent.componentDidUpdate = (prevProps, prevState, snapshot) => {
                this._componentDidUpdateOpenRUM(lifecycleComponent, prevProps, prevState, snapshot, componentDidUpdateOrig);
            };
            let renderOrig;
            if (lifecycleComponent.render !== undefined) {
                renderOrig = lifecycleComponent.render.bind(lifecycleComponent);
            }
            lifecycleComponent.render = () => {
                return this._renderOpenRUM(lifecycleComponent, renderOrig);
            };
            let componentWillUnmountOrig;
            if (lifecycleComponent.componentWillUnmount !== undefined) {
                componentWillUnmountOrig = lifecycleComponent.componentWillUnmount.bind(lifecycleComponent);
            }
            lifecycleComponent.componentWillUnmount = () => {
                this._componentWillUnmountOpenRUM(lifecycleComponent, componentWillUnmountOrig);
            };
        },
        _reportDataUpdateCache:function(evtTime,viewName,model,loadTime,funcName,routeId){
            if (OpenRUMSDK !== undefined && viewName !== 'undefined') {
                //路由进入事件
                if(model === 1){
                    if (StringUtils_1.StringUtils.isStringNullEmptyOrUndefined(this.cacheData.viewName)) {
                        this.cacheData.viewName = {'viewId':buildViewID()};
                    }else{
                        this.cacheData.viewName['viewId'] = buildViewID();
                    }
                    this.viewName = viewName;
                    OpenRUMSDK.setOrUpdateViewName(viewName);
                }
                //路由退出事件
                if(model === 2){
                    OpenRUMSDK.removeViewName();
                    OpenRUMSDK.setOrUpdateViewName(viewName);
                }
                if (!StringUtils_1.StringUtils.isStringNullEmptyOrUndefined(this.cacheData.viewName)) {
                    OpenRUMSDK.reportViewEvent(evtTime,this.cacheData.viewName['viewId'],this.viewName,loadTime,model,funcName,routeId);
                }
            }
        },

        _componentDidMountOpenRUM: function (lifecycleComponent, componentDidMountOrig) {
            const loadTime = (new Date()).getTime() - this.evtTime;
            if (componentDidMountOrig !== undefined) {
                componentDidMountOrig();
            }

            const componentName = getNameFromComponent(lifecycleComponent);
            this._addNavigationListener(componentName,lifecycleComponent,loadTime);
            lifecycleComponent._OpenRUMMounted = true;
        },
        _componentDidUpdateOpenRUM: function (lifecycleComponent, prevProps, prevState, snapshot, componentDidUpdateOrig) {
            if (componentDidUpdateOrig !== undefined) {
                componentDidUpdateOrig(prevProps, prevState, snapshot);
            }
        },
        _addNavigationListener : function(componentName,lifecycleComponent,loadTime){
            let that=this
            if(this.reportComponentRegExp(componentName) ){
                if(!StringUtils_1.StringUtils.isStringNullEmptyOrUndefined(lifecycleComponent)
                    && !StringUtils_1.StringUtils.isStringNullEmptyOrUndefined(lifecycleComponent.props.navigation)) {
                    if (Configuration_1.react.lifecycle.listenNavigation) {
                        try {
                            this.viewDidFocus = lifecycleComponent.props.navigation.addListener(
                                'didFocus',
                                (obj) => {
                                    let viewName
                                    let routeId
                                    if (obj.state) {
                                        viewName = obj.state.routeName;
                                        routeId=obj.state.key;
                                    } else {
                                        viewName = componentName;
                                    }
                                    const focusKey = viewName + 'focus';
                                    const blurKey = viewName + 'blur';
                                    if (!StringUtils_1.StringUtils.isStringNullEmptyOrUndefined(StringUtils_1.routerFunctionRoot.blurKey)) {
                                        delete StringUtils_1.routerFunctionRoot.blurKey;
                                    }
                                    //判断当前页面的路由监听是否不存在
                                    if (StringUtils_1.StringUtils.isStringNullEmptyOrUndefined(StringUtils_1.routerFunctionRoot.focusKey)) {
                                        if(this.evtTime === 0 ){
                                            loadTime = 0;
                                        }
                                        this._reportDataUpdateCache((new Date()).getTime(),viewName, 1, loadTime, 'didFocus()',routeId);
                                        StringUtils_1.routerFunctionRoot.focusKey = 'locked';
                                        this.isRouteExit = false;
                                    }
                                }
                            );
                            this.viewDidBlur = lifecycleComponent.props.navigation.addListener(
                                'didBlur',
                                (obj) => {
                                    this.evtTime = (new Date()).getTime();
                                    let viewName
                                    let routeId
                                    if (obj.state) {
                                        viewName = obj.state.routeName;
                                        routeId=obj.state.key;
                                    } else {
                                        viewName = componentName;
                                    }
                                    const focusKey = viewName + 'focus';
                                    const blurKey = viewName + 'blur';
                                    if (!StringUtils_1.StringUtils.isStringNullEmptyOrUndefined(StringUtils_1.routerFunctionRoot.focusKey)) {
                                        delete StringUtils_1.routerFunctionRoot.focusKey;
                                    }
                                    //判断当前页面的路由监听是否不存在
                                    if (StringUtils_1.StringUtils.isStringNullEmptyOrUndefined(StringUtils_1.routerFunctionRoot.blurKey)) {
                                        this._reportDataUpdateCache((new Date()).getTime(),viewName, 2, 0, 'didBlur()',routeId);
                                        StringUtils_1.routerFunctionRoot.blurKey = 'locked';
                                        this.isRouteExit = true;
                                        this.evtTime=0;
                                    }
                                }
                            );
                            this.viewFocus = lifecycleComponent.props.navigation.addListener(
                                'focus',
                                (obj) => {
                                    let viewName
                                    let routeId
                                    if (obj.target) {
                                        viewName = obj.target.substring(0, obj.target.indexOf('-'));
                                        routeId=obj.state&&obj.state.key;
                                    } else {
                                        viewName = componentName;
                                    }
                                    const focusKey = viewName + 'focus';
                                    const blurKey = viewName + 'blur';
                                    if (!StringUtils_1.StringUtils.isStringNullEmptyOrUndefined(StringUtils_1.routerFunctionRoot.blurKey)) {
                                        delete StringUtils_1.routerFunctionRoot.blurKey;
                                    }
                                    //判断当前页面的路由监听是否不存在
                                    if (StringUtils_1.StringUtils.isStringNullEmptyOrUndefined(StringUtils_1.routerFunctionRoot.focusKey)) {
                                        if(this.evtTime === 0 ){
                                            loadTime = 0;
                                        }
                                        this._reportDataUpdateCache((new Date()).getTime(),viewName, 1, loadTime, 'focus()',routeId);
                                        StringUtils_1.routerFunctionRoot.focusKey = 'locked';
                                        this.isRouteExit = false;
                                    }
                                }
                            );
                            this.viewBlur = lifecycleComponent.props.navigation.addListener(
                                'blur',
                                (obj) => {
                                    this.evtTime = (new Date()).getTime();
                                    let viewName
                                    let routeId
                                    if (obj.target) {
                                        viewName = obj.target.substring(0, obj.target.indexOf('-'));
                                        routeId=obj.state&&obj.state.key;
                                    } else {
                                        viewName = componentName;
                                    }
                                    const focusKey = viewName + 'focus';
                                    const blurKey = viewName + 'blur';
                                    if (!StringUtils_1.StringUtils.isStringNullEmptyOrUndefined(StringUtils_1.routerFunctionRoot.focusKey)) {
                                        delete StringUtils_1.routerFunctionRoot.focusKey;
                                    }
                                    //判断当前页面的路由监听是否不存在
                                    if (StringUtils_1.StringUtils.isStringNullEmptyOrUndefined(StringUtils_1.routerFunctionRoot.blurKey)) {
                                        this._reportDataUpdateCache((new Date()).getTime(),viewName, 2, 0, 'blur()',routeId);
                                        StringUtils_1.routerFunctionRoot.blurKey = 'locked';
                                        this.isRouteExit = true;
                                        this.evtTime=0;
                                    }
                                }
                            );
                        } catch (e) {
                            Logger.logWarn('----------Failed to register navigation listening----------');
                        }
                    } else {
                        const componentName = getNameFromComponent(lifecycleComponent);
                        this._reportDataUpdateCache((new Date()).getTime(),componentName, 1, loadTime, 'componentDidMount()');
                    }
                }
            }
        },
        _renderOpenRUM: function (lifecycleComponent, renderOrig) {
            this.evtTime = (new Date()).getTime();
            return renderOrig();
        },
        _componentWillUnmountOpenRUM: function (lifecycleComponent, componentWillUnmountOrig) {
            this.evtTime = (new Date()).getTime();
            if (componentWillUnmountOrig !== undefined) {
                componentWillUnmountOrig();
            }
            if(Configuration_1.react.lifecycle.listenNavigation){
                //判定是否销毁了当前页面，并打开了路由监听开关，构造退出事件
                if(!this.isRouteExit ){
                    const focusKey = this.viewName + 'focus';
                    const blurKey = this.viewName + 'blur';
                    if (!StringUtils_1.StringUtils.isStringNullEmptyOrUndefined(StringUtils_1.routerFunctionRoot.blurKey)) {
                        delete StringUtils_1.routerFunctionRoot.blurKey;
                    }
                    if (!StringUtils_1.StringUtils.isStringNullEmptyOrUndefined(StringUtils_1.routerFunctionRoot.focusKey)) {
                        delete StringUtils_1.routerFunctionRoot.focusKey;
                    }
                    this._reportDataUpdateCache(this.evtTime,this.viewName,2,0,'componentWillUnmount()');
                    StringUtils_1.routerFunctionRoot.blurKey = 'locked';
                }
            }else{
                const componentName = getNameFromComponent(lifecycleComponent);
                this._reportDataUpdateCache(this.evtTime,componentName,2,0,'componentWillUnmount()');
            }
            lifecycleComponent._OpenRUMMounted = false;
        },
    };
};
//获取viewname
function getNameFromComponent(component) {
    if (isOpenRUMProperties(component.props) && component.props.brActionName !== undefined) {
        return component.props.brActionName;
    }
    if (isConstructorComponentConstructor(component.constructor)) {
        return component.constructor.displayName;
    }
    if (component.constructor && component.constructor._brInfo) {
        return component.constructor._brInfo.name;
    }
    return component.constructor.name;
}
function isConstructorComponentConstructor(constructor) {
    return constructor.displayName !== undefined;
}
function isOpenRUMProperties(properties) {
    return properties.brActionName !== undefined;
}
function buildViewID(){
    return Date.now().toString(36);// 最大进制支持转为36进制，使用字符是0-9a-z;
}
