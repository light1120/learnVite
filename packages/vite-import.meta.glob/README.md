# 通过 vite import.meta.glob 实现 目录即路由

```
在pages目录下，添加或者删除，页面，目录，会自动生成路由.
http://localhost:5173/#/view1
http://localhost:5173/#/view2
http://localhost:5173/#/detail/view3
http://localhost:5173/#/detail/view4

```

## import.meta.glob

meta 下并没有 glob 方法，需要加上 `vite/client` 类型，vscode 才能解析道这个 glob 方法。
可以在 src 目录下添加`vite-env.d.ts`文件即可，文件内容 `/// <reference types="vite/client" />`

## 如何使用

- 文件目录

```
-/packages1/src/modules
    - task
        - task1/index.ts
        - task2/index.ts
    - task3/index.ts
```

- vite.config.ts

这里是 monorepo 跨了 package ，导入的 @xxx/packages1 包里的文件，需要在 vite.config.ts 中设置 alias

```
resolve: {
    alias: {
      '@xxx/packages1': path.resolve(__dirname, '../../packages/packages1'),
    },
},
```

- 调用方式

```
const modules = import.meta.glob('@xxx/packages1/src/modules/**/index.ts');
// 双星号，可以匹配多级目录，单星号只能匹配一级目录。
// 上面可以匹配 task3/index.ts 、task/task1/index.ts
const modules = import.meta.glob([
    '@xxx/packages1/src/modules/*/index.ts',
    '@xxx/packages1/src/modules/task/*/index.ts',
]);
// 或者也可以穿入多个路径值
// 这里不可以有变量，只能是单纯的字符串，或者字符串数组

```

- 编译后的代码

```
const modules = Object.assign({
 "../../packages/packages1/src/modules/task/task1/index.ts":
    () =>
        __vitePreload(
            () => import("./index-fb330504.js"),
            [
                "assets/index-fb330504.js",
                "assets/index-b2f9067b.js",
                "assets/TableOperationPopConfirm-d263e355.js",
                "assets/editorWorker-d4a683f7.js",
            ]
        ),
 "../../packages/packages1/src/modules/task/task2/index.ts":
    () =>
        __vitePreload(
            () => import("./index-f28d9066.js"),
            [
                "assets/index-f28d9066.js",
                "assets/index-b2f9067b.js",
                "assets/TableOperationPopConfirm-d263e355.js",
                "assets/ExcelTaskDetailModal-fdce56bf.js",
                "assets/editorWorker-d4a683f7.js",
            ]
        ),
"../../packages/packages1/src/modules/task3/index.ts":
    () =>
        __vitePreload(
            () => import("./index-f436e515.js"),
            [
                "assets/index-f436e515.js",
                "assets/ExcelTaskDetailModal-fdce56bf.js",
                "assets/index-b2f9067b.js",
                "assets/editorWorker-d4a683f7.js",
            ]
        ),
});
```
