# 1、vite 基础

## vite 是什么

vite : 下一代的前端工具链 ，包含 2 个模块

- 开发服务器 : 基于原生 ES 模块`<script type="module">`， 速度快到惊人的热模块更新（HMR）
- 构建指令 : 预配置了一套用于生产环境的 [rollup](https://rollupjs.org/) 构建指令

### vite 使用环境依赖

- 浏览器支持原生 ESM `<script type="module">`
- 浏览器支持 ES6 动态导入方法`import()`
- 浏览器支持 `import.meta`

## 为什么需要 vite

### 现状：慢

- 以往的构建工具(例：webpack)都是将项目所有的文件进行打包
- 随着项目的演进，文件越来越多，基于 js 的构建工具在启动开发环境时会变得越来越慢
- 即使使用了 HMR , 文件修改会，也会先打包再呈现效果，也变得越来越慢

### vite 的解决方案

- 极速开发服务器: 使用原生 ESM 模块，不对模块打包，直接加载
  - 依赖：使用 esbuild(go 编写)预构建，使用`Cache-Control: max-age=31536000,immutable`强缓存
  - 源码：浏览器 ESM 直接加载，按需动态导入，使用`304 Not Modified`协商缓存
- rollup 构建指令
  - 开箱即用：默认支持`js,ts,jsx,tsx,css,scss,less,sass,stylus` 无需配置，只需安装 sass/less/stylus 依赖即可
  - 自带构建优化：
    - CSS 代码分割
    - 预加载指令生成 ： <link rel="modulepreload"> 、
    - 异步 Chunk 加载优化 ：异步加载模块时，会同时加载异步模块的依赖模块 （常规：需要加载异步模块，再解析之后，才加载依赖模块）

## 如何使用

### 使用 vite 创建新项目

- `pnpm create vite` : 创建项目模版
- `pnpm run dev`: 启动开发服务器
- `pnpm run build`: 构建生产产物
- `pnpm run preview`: 预览构建产物，需要先构建生成文件
