# 集成指南

RN插件的集成有**远端**和**本地**两种方式。

* 远端集成

```json
yarn add git+https://github.com/aliyun-sls/alibabacloud-rum-react-native-sdk.git
```

或者直接在 package.json 中的 dependencies 类库中引入插件库后，执行 npm install 或 yarn install 指令加载依赖库:

```json
"@OpenRUM/react-native-plugin": "git+https://github.com/aliyun-sls/alibabacloud-rum-react-native-sdk.git"
```

* 本地集成

将 `@OpenRUM`整体拖进工程的`node_modules`路径下即可。

<br>

> 若iOS工程使用的是RN工程ios目录下的工程，则cd到ios路径下执行`pod install`集成iOS采集SDK即可。
> 
> 若iOS的工程单独嵌入了移动端的SDK，则需要将RN插件目录下`react-native-plugin/ios`内的`OpenRUMRNBridge.h`和`OpenRUMRNBridge.m`拖入工程内，并在`.m`文件中修正SDK头文件的引用。

# 插件配置

在系统文件中配置Transformer:

若`React Native`版本大于等于0.72.1,在根目录的 metro.config.js 的 transformer 中添加 transformer.babelTransformerPath;
示例如下:

```js
module.exports = {
  transformer: {
    babelTransformerPath: require.resolve(
      '@OpenRUM/react-native-plugin/lib/OpenRUM-transformer',
    )
  },
};
```

另：需要添加`.babelrc.js`文件

#### react自动执行
react 在React v17.x，React v16.14.0，React v15.7.0，React v14.0支持了jsx语法(https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html).

这也影响了我们的探针的正常运行，需要添加如下`importSource`属性配置：
ps:在项目根目录下添加`.babelrc.js`文件（有就修改，没有就新增）

```js
module.exports = {
  plugins: [
    [
      "@babel/plugin-transform-react-jsx",
      {
        runtime: "automatic", 
        importSource: "@OpenRUM/react-native-plugin"
      }
    ]
  ]
}

```
###### 用 babel-preset-expo:
```js
module.exports = {
  presets: [
    ['babel-preset-expo',
      {
        jsxRuntime: 'automatic',
        jsxImportSource: '@OpenRUM/react-native-plugin',
      },
    ],
  ],
};
```

###### 用 @react-native/babel-preset:
```js
module.exports = {
  presets: [
    ['module:@react-native/babel-preset'],
  ],
  plugins: [
      [
          '@babel/plugin-transform-react-jsx',
          {
              runtime: 'automatic',
              importSource: "@OpenRUM/react-native-plugin"
          },
      ],
  ],
};
```

###### 用 metro-react-native-babel-preset:

```js
module.exports = {
  presets: [
    ['module:metro-react-native-babel-preset'],
  ],
  plugins: [
      [
          '@babel/plugin-transform-react-jsx',
          {
              runtime: 'automatic',
              importSource: "@OpenRUM/react-native-plugin"
          },
      ],
  ],
};
```




若 `React Native` 版本大于等于 0.59，小于0.72.1在根目录的 `metro.config.js` 的 `transformer` 中添加 `transformer.babelTransformerPath`;

若 `React Native` 版本等于 0.57 或 0.58，在根目录的 `rn-cli.config.js` 的 `transformer` 中添加 `transformer.babelTransformerPath`.

示例如下:

```js
module.exports = {
  transformer: {
    babelTransformerPath: require.resolve(
      '@OpenRUM/react-native-plugin/lib/OpenRUM-transformer',
    ),
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
```

若 `React Native` 版本小于0.57，在根目录的 `rn-cli.config.js`(如果没有需创建） 的 `transformer` 中添加 `getTransformModulePath `,示例如下：

```js
module.exports = {
  getTransformModulePath() {
    return require.resolve('@OpenRUM/react-native-plugin/lib/OpenRUM-transformer');
  },
  getSourceExts() {
    return ['js'];
  }
}
```

>注意事项: 若项目使用`react-native bundle` 打包且配置了–config参数，请在配置的js文件中添加`getTransformModulePath` 或者 `transformer.babelTransformerPath` 配置信息

RN插件支持自定义的配置信息，需要在项目的根目录下创建文件`OpenRUM.config.js`，内容模板如下：

```js
module.exports = {
    react: {
        /**
         * Debug Logs
         */
        debug: false,

        /**
         * Allows you to filter the instrumentation for touch events, refresh events and picker events in certain files
         * True = Will be instrumented
         */
        instrument: (filename) => {
            return true;
        },


        lifecycle: {
            /**
             * Monitor the navigation service switch. The default value is false
             */
            listenNavigation: true,

            /**
             * The data collection rules of component life cycle can be set to specify the fuzzy matching of component name
             */
            componentName: null,
        },
    }
};
```

# react-navigation库支持

### react-navigation@6.x版本

支持`react-navigation`库6.x版本，需要在导航配置里为RN插件配置事件监听：

```js
onReady={() => {OpenRUM.reportRouterData(navigationRef) }}
onStateChange={() => {OpenRUM.reportRouterData(navigationRef)}}
```

示例如下：

```js
···
import { NavigationContainer ,useNavigationContainerRef } from '@react-navigation/native';
import { OpenRUM } from "@OpenRUM/react-native-plugin";
··· 
···
export default function App(){
    let navigationRef = useNavigationContainerRef()
    return (
        <NavigationContainer ref={navigationRef}
            onReady={() => {OpenRUM.reportRouterData(navigationRef) }}
            onStateChange={() => {OpenRUM.reportRouterData(navigationRef)}}
        >
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="About" component={AboutScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
} 
```

### react-navigation@5.x版本

支持`react-navigation`库5.x版本，需要在导航配置里为RN插件配置事件监听：

```js
useEffect(()=>{
    OpenRUM.reportRouterDataV5(navigationRef)
},[]);
```

示例如下：

```js
import { OpenRUM } from "@OpenRUM/react-native-plugin";

export default function App(){
  const navigationRef = React.useRef(null);
  //下面代码为获取数据代码，可以做适当调整
  useEffect(()=>{
      OpenRUM.reportRouterDataV5(navigationRef)
  },[]);
  return (<NavigationContainer ref={navigationRef}>
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  </NavigationContainer>)
}
```

### react-navigation 2.10.x版本

支持`react-navigation`库2.10.x版本示例如下：

```js
import {OpenRUM} from "@OpenRUM/react-native-plugin";
<AppContainer
    onNavigationStateChange={OpenRUM.reportRouterDataV2}
/>

//也可以利用 defaultProps
AppContainer.defaultProps={
    onNavigationStateChange:OpenRUM.reportRouterDataV2
}
```