"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const br_jscodeshift = require('jscodeshift');
const br_jscodeshift_collection = require("jscodeshift/src/Collection");
const br_path = require('path');
const br_path_constants = require('../util/PathsConstants');
const fs = require('fs');
const br_babel = require('./parser/babel');
const Logger_1 = require("../util/Logger");
const { CLIENT_RENEG_LIMIT } = require('tls');
const default_filter_file = "node_modules";
const types=require("./model/types");
const componentArr = [
    {
        orige: {
            path: "react",
            name: "Component"
        },
        replace: {
            path: "@OpenRUM/react-native-plugin/lib/react",
            name: "Component"
        }
    },
    {
        orige: {
            path: "react",
            name: "PureComponent"
        },
        replace: {
            path: "@OpenRUM/react-native-plugin/lib/react",
            name: "PureComponent"
        }
    },
    {
        orige: {
            path: "react-native",
            name: "TouchableHighlight"
        },
        replace: {
            path: "@OpenRUM/react-native-plugin/lib/react-native",
            name: "TouchableHighlight"
        }
    },
    {
        orige: {
            path: "react-native",
            name: "TouchableOpacity"
        },
        replace: {
            path: "@OpenRUM/react-native-plugin/lib/react-native",
            name: "TouchableOpacity"
        }
    },
    {
        orige: {
            path: "react-native",
            name: "TouchableNativeFeedback"
        },
        replace: {
            path: "@OpenRUM/react-native-plugin/lib/react-native",
            name: "TouchableNativeFeedback"
        }
    },
    {
        orige: {
            path: "react-native",
            name: "TouchableWithoutFeedback"
        },
        replace: {
            path: "@OpenRUM/react-native-plugin/lib/react-native",
            name: "TouchableWithoutFeedback"
        }
    },
    {
        orige: {
            path: "react-native",
            name: "Button"
        },
        replace: {
            path: "@OpenRUM/react-native-plugin/lib/react-native",
            name: "Button"
        }
    },
    {
        orige: {
            path: "react-native",
            name: "Picker"
        },
        replace: {
            path: "@OpenRUM/react-native-plugin/lib/react-native",
            name: "Picker"
        }
    },
    {
        orige: {
            path: "react-native",
            name: "RefreshControl"
        },
        replace: {
            path: "@OpenRUM/react-native-plugin/lib/react-native",
            name: "RefreshControl"
        }
    },
    {
        orige: {
            path: "react-native",
            name: "Switch"
        },
        replace: {
            path: "@OpenRUM/react-native-plugin/lib/react-native",
            name: "Switch"
        }
    },
    {
        orige: {
            path: "react-native",
            name: "Text"
        },
        replace: {
            path: "@OpenRUM/react-native-plugin/lib/react-native",
            name: "Text"
        }
    },
    {
        orige: {
            path: "react-native",
            name: "Pressable"
        },
        replace: {
            path: "@OpenRUM/react-native-plugin/lib/react-native",
            name: "Pressable"
        }
    },
    // {
    //     orige:{
    //         path:"IFTide",
    //         name:"Button"
    //     },
    //     replace:{
    //         path:"@OpenRUM/react-native-plugin/lib/private",
    //         name:"Button"
    //     }
    // }
];
const originArr=[
    "Component",
    "PureComponent",
    "TouchableHighlight",
    "TouchableOpacity",
    "TouchableNativeFeedback",
    "TouchableWithoutFeedback",
    "Button",
    "Picker",
    "RefreshControl",
    "Switch",
    "Text",
    "Pressable",
    "AppRegistry"
]

const appRegistry = ["AppRegistry"];

function instrument(src, name, config, rnversion) {
    //判断文件类型，是否需要转换
    let needInstrument = isInstrumentFile(name = relativePath(name));
    if (needInstrument!==-1) {
        let replace = false;
        //解析文件为ast节点
        let astSource = parserSrcToAST(name)(src);
        if(needInstrument===2){
            checkAstSource(astSource)
            replace = true;
        }else if (needInstrument===1) {
            //rn嵌码启动
            if(name.endsWith('AppRegistry.js')){
                embededStartCode(astSource);
                replace = true;
            }
        } else {

            // getNavigation(name,astSource)
            //读取配置表
            if (config !== undefined
                && config.instrument !== undefined
                && config.instrument(name) === false) {
                return src;
            } else if (defaultFilterFile(name)) {
                return src;
            }
            if(lifecycle(astSource)){
                replace = true;
            }
            let instruments = componentArr;
            instruments.forEach(function (element) {
                let result = replaceImportPath(astSource, element);
                astSource = result.ast;
                replace = replace || result.success;
            })
        }
        //修改文件内容
        if (replace) {
            rewriterFile(src = astSource.toSource({
                quote: 'single',
            }), name);
            Logger_1.Logger.logDebug(`modify file: ${name}`)
        }else{
            // try {
            //     var r = a.join(br_path_constants.default.getBuildPath(), name + ".br");
            //     e.default.checkIfFileExistsSync(r),
            //     e.default.deleteFileSync(r)
            // } catch(n) {}
        }
    } else if (name.includes(br_path.join("@OpenRUM", "react-native-plugin"))) {
      Logger_1.Logger.logDebug(`OpenRUM define file: ${name}`)
    }
    return src;
}
function O(n, r) {
    return br_jscodeshift.objectExpression([br_jscodeshift.objectProperty(br_jscodeshift.identifier("type"), br_jscodeshift.numericLiteral(n)), br_jscodeshift.objectProperty(br_jscodeshift.identifier("name"), br_jscodeshift.stringLiteral(r))])
}
function A(n, r, e) {
    for (r = br_jscodeshift.expressionStatement(br_jscodeshift.assignmentExpression("=", br_jscodeshift.memberExpression(br_jscodeshift.identifier(e), br_jscodeshift.identifier("_brInfo")), O(r, e)));
    void 0 !== n.parentPath && "body" !== n.parentPath.name;)
     n = n.parentPath;
    void 0 !== n.parentPath && n.insertAfter(r)
}
function lifecycle(n){
    var r = n.findJSXElements(),t = !1;
    if(r.length>0){
        n.find(br_jscodeshift.FunctionDeclaration).forEach(function(n) {
            var r, e = (0, br_jscodeshift_collection.fromPaths)([n]);
            0 < e.findJSXElements().length && null != n && null != n.value && null != n.value.id && n.value.id.name && (
                r = e.find(br_jscodeshift.ClassDeclaration), e = e.find(br_jscodeshift.ClassExpression), 0 === r.length)
                 && 0 === e.length && (A(n, types.Types.FunctionalComponent, n.value.id.name), t = !0)
        })
        n.find(br_jscodeshift.ClassDeclaration).forEach(function(n) {
            0 < (0, br_jscodeshift_collection.fromPaths)([n]).findJSXElements().length && null != n && null != n.value && n.value.id && n.value.id.name && (A(n, types.Types.ClassComponent, n.value.id.name), t = !0)
        })
         n.find(br_jscodeshift.ArrowFunctionExpression).forEach(function(n) {
            0 < (0, br_jscodeshift_collection.fromPaths)([n]).findJSXElements().length && null != n.parent && null != n.parent.value && null != n.parent.value.id && null != n.parent.value.id.name && (A(n, types.Types.FunctionalComponent, n.parent.value.id.name), t = !0)
        })
    }
    return t
}

function checkAstSource(n) {
    var r;
    n = n.find(br_jscodeshift.Program);
    if(1 === n.length){
        r = br_jscodeshift.expressionStatement(
            br_jscodeshift.callExpression(
                br_jscodeshift.memberExpression(
                    br_jscodeshift.callExpression(
                        br_jscodeshift.identifier("require"),
                        [
                            br_jscodeshift.stringLiteral("@OpenRUM/react-native-plugin/lib/instrumentor/base/ElementHelper")
                        ]
                    ),
                    br_jscodeshift.identifier("instrumentCreateElement")
                ),
                [
                    br_jscodeshift.memberExpression(br_jscodeshift.identifier("module"),
                    br_jscodeshift.identifier("exports"))
                ]
            )
        )
        n.paths()[0].node.body.push(r)
    }
}

function defaultFilterFile(name) {
    return name.includes(default_filter_file) && !name.includes(default_filter_file+"\\react-native\\Libraries");
}

function isInstrumentFile(path) {
    if (path && path.includes("@OpenRUM")) {
        return -1;  //-1
    }
    let extname = br_path.extname(path);
    if (".js" !== extname && ".ts" !== extname &&  ".tsx" !== extname && ".jsx" !== extname) {
        return -1;
    }
    let element = br_path.parse(path);
    let expRecords = element.dir.split(br_path.sep);
    for(var i=0,j=expRecords.length;i<j;i++){
        if(expRecords[i]==="node_modules"){
            if(expRecords[i+1]==="react-native"||"create-react-class" === expRecords[i + 1]||"react-clone-referenced-element" === expRecords[i + 1]){
                return  originArr.includes(element.name) ? 1: -1;
            }
            if ("react" === expRecords[i + 1] && "index" === element.name){
                return 2
            } 
        }
    }
    // return !(0 < expRecords.length && "node_modules" === expRecords[0]) || "react-native" !== expRecords[1] && "create-react-class" !== expRecords[1] && "react-clone-referenced-element" !== expRecords[1] || appRegistry.includes(element.name);
    return 0
}

function parserSrcToAST(path) {
    return br_jscodeshift.withParser(br_babel.babelParser(br_path.extname(path)));
}

//rn 设置OpenRUM.start嵌码
function embededStartCode(astsource) {
    let results = findposition(astsource, "runApplication",1);
    if (results.length === 1) {
        insertVariable(astsource, {
            variable: "_OpenRUMApplicationHandler",
            path: "@OpenRUM/react-native-plugin",
            name: "ApplicationHandler"
        });
        //insert code
        insertOpenRUMStart(results.paths()[0].parent.value.body.body, 0, startCodeAST("_OpenRUMApplicationHandler", "startup"))
    }
}

//插码 OpenRUM.start
function insertOpenRUMStart(paths, address) {
    let argl = arguments.length;
    let vargs = new Array(2 < argl ? argl - 2 : 0);
    for (let i = 2; i < argl; i++) {
        vargs[i - 2] = arguments[i];
    }
    return paths.splice.apply(paths, [address, 0].concat(vargs));
}

//插入start ast节点
function startCodeAST(className, property) {
    let memberExpression = br_jscodeshift.memberExpression(br_jscodeshift.identifier(className), br_jscodeshift.identifier(property));
    let callExpression = br_jscodeshift.callExpression(memberExpression, []);
    return br_jscodeshift.expressionStatement(callExpression);
}

//插入变量
function insertVariable(astsource, source) {
    let position = astsource.find(br_jscodeshift.VariableDeclaration);
    if (position.length > 0) {
        br_jscodeshift(position.paths()[0]).insertAfter(generateAST(source));
    }
}

function generateAST(source) {
    const callExpression = br_jscodeshift.callExpression(br_jscodeshift.identifier("require"), [br_jscodeshift.literal(source.path)]);
    const memberExpression = br_jscodeshift.memberExpression(callExpression, br_jscodeshift.identifier(source.name));
    const declarator = br_jscodeshift.variableDeclarator(br_jscodeshift.identifier(source.variable), memberExpression);
    return br_jscodeshift.variableDeclaration("const", [declarator])
}

// function findposition(astsource, anchor) {
    // let length = arguments.length;
    // let args = new Array(3 < length ? length - 3 : 0);

    // for (let i = 3; i < length; i++) {
    //     args[i - 3] = arguments[i];
    // }

    // return astsource.find(br_jscodeshift.Identifier).filter(function (e) {
    //     return e.node.name === anchor;
    // }).filter(function (e) {
    //     let value = (undefined !== e.parent && undefined !== e.parent.value && undefined !== e.parent.value.params && e.parent.value.params.length === args.length);
    //     let length = args.length;
    //     for (let i = 0; i < length; i++) {
    //         value = value && e.parent.value.params[i].name === args[i];
    //     }
    //     return value;
    // });
function findposition(n, r,t) {
    for (var e = arguments.length,
        i = new Array(3 < e ? e - 3 : 0), u = 3; u < e; u++) i[u - 3] = arguments[u];
        return n.find(br_jscodeshift.Identifier).filter(function(n) {
            return n.node.name === r
        }).filter(function(n) {
            return void 0 !== n.parent && void 0 !== n.parent.value && void 0 !== n.parent.value.params
        }).filter(function(n) {
            var r = void 0 !== n.parent && void 0 !== n.parent.value;
            t || (r = r && n.parent.value.params.length === i.length);
            for (var e = 0; e < 0; e++) r = r && n.parent.value.params[e].name === i[e];
            return r
    })
}

//rewriter
function rewriterFile(content, path) {
    let out = br_path.join(br_path_constants.path.getBuildPath(), path);
    Logger_1.Logger.logDebug('write build file to path=>'+out);
    try {
        checkIfFileExistsSync(br_path.dirname(out));
    } catch (e) {
        createDirectorySync(br_path.dirname(out));
    }
    writeTextToFileSync(out + ".br", content);
}

//判断build文件目录是否存在
function checkIfFileExistsSync(file) {
    fs.statSync(file);
    return file;
}

//创建build文件目录
function createDirectorySync(directory) {
    try {
        mkdirSyncRecursive(directory);
        return true;
    }
    catch (e) {
        return false;
    }
}

//创建指定文件目录
function mkdirSyncRecursive(directory) {
    let pathParts = directory.split(br_path.sep);
    for (let i = 1; i <= pathParts.length; i++) {
        let segment = pathParts.slice(0, i).join(br_path.sep);
        if (segment.length > 0) {
            !fs.existsSync(segment) ? fs.mkdirSync(segment) : null;
        }
    }
}

function writeTextToFileSync(_file, _text) {
    try {
        fs.writeFileSync(_file, _text);
        return _file;
    } catch (err) {
        throw new Error(err + " Could not write to file: " + br_path.resolve(_file));
    }
}

function relativePath(name) {
    let appPath = applicationPath();
    return br_path.isAbsolute(name) ? name.replace(appPath + br_path.sep, "") : name;
}

function applicationPath() {
    return br_path.join(__dirname, "..", "..", "..", "..");
}

function replaceImportPath(astsource, element) {
    let result = findAndReplaceSpecifiers(astsource, element.orige, element.replace)
        || findAndReplaceImportReactOrReactNative(astsource, element.orige, element.replace)
        || replaceRequirePath(astsource, element.orige.path, element.replace.path.substring(0, element.replace.path.length-1));
        return {
        ast: astsource,
        success: result
    }
}

//替换Specifiers节点
function findAndReplaceSpecifiers(astsource, orige, replace) {
    let paths = findPath(astsource, orige);
    if (paths.length > 0) {
        let result = filterImportModule(paths, orige.name, false);
        if (result !== undefined) {
            replace.localName = result.localName;
            replaceNewComponent(astsource, replace);
            return true;
        }
    }
    return false;
}

function findAndReplaceImportReactOrReactNative(astsource, orig, replace) {
    const results = findImportFromReactOrReactNativeNode(astsource, orig.path);
    if (1 === results.length) {
        const node = filterImportModule(results, orig.name, true);
        if (undefined !== node) {
            return replaceReactOrReactNativePath(astsource, replace.path, node.localName, "ImportNamespaceSpecifier" === node.type), true;
        }
    }
    return false;
}

function findImportFromReactOrReactNativeNode(astsource, importName) {
    return astsource.find(br_jscodeshift.ImportDeclaration).filter(function (importSpecifier) {
        return importSpecifier.node.source.value === importName;
    });
}

function replaceReactOrReactNativePath(astsource, replacePath, replaceModule, isImportNamespaceSpecifier) {
    const results = findImportFromReactOrReactNativeNode(astsource, replacePath);
    const replaceNode = isImportNamespaceSpecifier ? importNamespaceSpecifierNode(replaceModule) : importDefaultSpecifierNode(replaceModule);
    if (results.length > 0) {
        addMoudleFromNewPath(astsource, replacePath, replaceNode);
    } else {
        addMoudleWithReplaceImportDeclaration(astsource, replacePath, [replaceNode]);
    }
}

function importDefaultSpecifierNode(name) {
    return br_jscodeshift.importDefaultSpecifier(br_jscodeshift.identifier(name));
}

function importNamespaceSpecifierNode(name) {
    return br_jscodeshift.importNamespaceSpecifier(br_jscodeshift.identifier(name));
}

function replaceRequirePath(astsource, oldPath, newPath) {
    let flag = false;
    return astsource.find(br_jscodeshift.CallExpression).filter(function (variableDeclarator) {
        return calleeNameIsRequire(variableDeclarator.node.callee) && argumentTypeIsStringLiteral(variableDeclarator.node.arguments[0]) && variableDeclarator.node.arguments[0].value === oldPath && undefined !== variableDeclarator.parent;
    }).forEach(function (assignedCallExpression) {
        assignedCallExpression.node.arguments[0].value = newPath;
        flag = flag || true;
    }), flag;
}

function addMoudleFromNewPath(astsource, replacePath, replaceNode) {
    astsource.find(br_jscodeshift.ImportDeclaration).filter(function (importSpecifier) {
        return importSpecifier.node.source.value === replacePath;
    }).forEach(function (imp) {
        imp.node.specifiers.push(replaceNode);
    });
}

function addMoudleWithReplaceImportDeclaration(astsource, replaceImportDeclaration, replaceNodeAST) {
    let results = astsource.find(br_jscodeshift.ImportDeclaration);
    if (0 < results.length) {
        br_jscodeshift(results.paths()[0]).insertAfter(generateReplaceImportDeclaration(replaceImportDeclaration, replaceNodeAST));
    } else {
        results = astsource.find(br_jscodeshift.Program);
        if (1 === results.length) {
            results.paths()[0].node.body.unshift(generateReplaceImportDeclaration(replaceImportDeclaration, replaceNodeAST));
        }
    }
}
function addModuleWithReplaceImportDeclaration(astsource, replaceImportDeclaration, replaceNodeAST) {
    let results = astsource.find(br_jscodeshift.ImportDeclaration);
    if (0 < results.length) {
        br_jscodeshift(results.paths()[0]).insertAfter(generateReplaceImportDeclaration(replaceImportDeclaration, replaceNodeAST));
    } else {
        results = astsource.find(br_jscodeshift.Program);
        if (1 === results.length) {
            results.paths()[0].node.body.unshift(generateReplaceImportDeclaration(replaceImportDeclaration, replaceNodeAST));
        }
    }
}
function calleeNameIsRequire(callee) {
    return "require" === callee.name;
}

function argumentTypeIsStringLiteral(argument) {
    return "StringLiteral" === argument.type || "Literal" === argument.type;
}

function filterImportModule(targetPaths, targetName, top) {
    let advertisement;
    return targetPaths.forEach(function (path) {
        if (undefined !== path.node.specifiers) {
            path.node.specifiers = path.node.specifiers.filter(function (node) {
                if (!existImported(node) || top) {
                    return !(!existImported(node) && top) || (null !== node.local && (advertisement = {
                        localName: node.local.name,
                        type: node.type
                    }), false);
                }
                const taskOpen = node.imported.name !== targetName;
                if (!taskOpen && node.local != null && node.imported.name === node.local.name) {
                    advertisement = {
                        localName: node.local.name,
                        type: node.type
                    }
                }
                return taskOpen;
            });
            if (0 === path.node.specifiers.length) {
                path.prune();
            }
        }
    }), advertisement;
}

function findPath(astsource, orige) {
    return astsource.find(br_jscodeshift.ImportDeclaration).filter(function (imp) {
        return imp.node.source.value === orige.path && imp.node.specifiers.some(function (node) {
            return existImported(node) && node.imported.name === orige.name || node.local && node.local.name === orige.name;
        });
    });
}

function existImported(node) {
    return node.imported !== undefined;
}

function replaceNewComponent(astsource, replace) {
    if (findReplacePath(astsource, replace.path).length > 0) {
        addModule(astsource, replace);
    } else {
        addModuleWithReplaceImportDeclaration(astsource, replace.path, [generateModuleNode(replace)]);
    }
}

function addModule(astsource, replace) {
    astsource.find(br_jscodeshift.ImportDeclaration).filter(function (importSpecifier) {
        return importSpecifier.node.source.value === replace.path;
    }).forEach(function (imp) {
        imp.node.specifiers.push(generateModuleNode(replace));
    });
}



function generateModuleNode(replace) {
    return replace.localName ? br_jscodeshift.importSpecifier(br_jscodeshift.identifier(replace.name), br_jscodeshift.identifier(replace.localName)) : br_jscodeshift.importSpecifier(br_jscodeshift.identifier(replace.name));
}

function generateReplaceImportDeclaration(value, key) {
    return br_jscodeshift.importDeclaration(key, br_jscodeshift.literal(value));
}

function findReplacePath(astsource, path) {
    return astsource.find(br_jscodeshift.ImportDeclaration).filter(function (importSpecifier) {
        return importSpecifier.node.source.value === path;
    })
}

exports.instrument = instrument;
