# 2、vite 功能

### 1、NPM 依赖解析和预构建

- 预构建：提高页面加载速度 （ 预构建 是啥？ 做了什么）
- 依赖解析: 将 CommonJS / UMD 模块依赖 转成 ESM 格式

```
import { createApp } from 'vue' // 源码
import { createApp } from "/node_modules/.vite/deps/vue.js?v=8a589509"; //解析后
```

### 2、模块热替换 : HMR API

### 3、TypeScript : 天然支持 .ts

- 仅转译： 为了保障速度，仅进行 Typescript 到 javascript 的转译
- 借助工具： 借助 IDE 或者执行 `tsc --noEmit --watch`

### 4、Vue

- 2.x : `@vitejs/plugin-vue2`,`@vitejs/plugin-vue2-jsx`
- 3.x : `@vitejs/plugin-vue`,`@vitejs/plugin-vue-jsx`

### 5、JSX

- 开箱即用 `.tsx .jsx` : esbuild 进行转译
- 自定义 jsx : vite.config.js 中配置 esbuild 中的 `jsxFactory`和`jsxFragment`

```
esbuild: {
  // preact 配置
  jsxFactory: 'h',
  jsxFragment: 'Fragment',
},
```

### 6、CSS

- `.css`: 文件会把内容插入到`<style>`标签中，同时带 HMRz 支持
- `.module.css` : 导入的 css module 文件会返回一个模块对象
- PostCSS : `postcss.config.js` `.postcssrc.js` 或者 `.postcssrc.yml` 的配置都将直接自动应用
- CSS 预处理器 : 内置`.scss`,`.less`,`.sass`,`.stylus`文件支持 或者 `<style lang="sass">` 开启 。只需安装依赖
- @import 内联和变基 : 通过 `postcss-import` 预配置支持了 CSS @import 内联

### 7、静态资源处理

- 1、将资源引入为 URL

```
import imgUrl from './img.png'
document.getElementById('hero-img').src = imgUrl
// 生产构建之后: /assets/img.2d8efhg.png
```

- 2、显式 URL 引入: 加上后缀`?url`

```
import workletURL from 'extra-scalloped-border/worklet.js?url'
CSS.paintWorklet.addModule(workletURL)
// 导入的就是一个url
```

- 3、将资源引入为字符串 : 加上后缀`?raw`

```
import shaderString from './shader.glsl?raw'
```

- 4、导入脚本作为 Worker : 加上后缀`?worker`

```
import Worker from './shader.js?worker'
const worker = new Worker()
// 生产构建：会自动 split chunk
```

- 5: new URL(url, import.meta.url) : 动态导入

```
export function getImageUrl(name: string) {
  // import.meta.url 当前模块的url
  return new URL(`../assets/images/${name}`, import.meta.url).href
}
```

vite 把第一个参数`../assets/images/${name}`作为一个正则去匹配，把所有匹配到的资源做一个映射。 同样对把配置 `build.assetsDir`中 的全部资源进行转换成真实的 url ，生产环境也会进行 MD5 `const __vite_glob_0_0 = "/xx/xx/assets/images/xxx1-46c93025.png";` 这样，生产环境中 getImageUrl 就会获取真实的资源

```
function getImageUrl(name) {
  return new URL(
      /* @__PURE__ */ Object.assign({
      "../assets/images/xxx1.png": __vite_glob_0_0,
      "../assets/images/xxx3.png": __vite_glob_0_1,
      "../assets/images/xxx2.png": __vite_glob_0_2,
      })[`../assets/images/${name}`],
      self.location
  ).href;
}

```

- 6、public 目录 ： 直接拷贝到打包，位于项目根目录，代码中对应 `/`
  - 目录中的资源，不能被 js 引用
  - 源码中使用必须使用根目录 `/` : `<link rel="icon" href="/favicon.ico" />`
  - 必须保持原有文件名
- 7、build.assetsDir : 默认 `assets` 资源目录
- 8、build.assetsInlineLimit : 默认 4096 (4kb), 小于会构建成 base64
- 9、assetsinclude : 扩展资源类型

### JSON

```
// 导入整个对象
import json from './example.json'
// 对一个根字段使用具名导入 —— 有效帮助 treeshaking！
import { field } from './example.json'

```

### Glob 导入 : `import.meta.glob`

```
const modules = import.meta.glob('./dir/*.js')
```

### 动态导入 : 仅支持单层，file 中不允许有`/`

```
const module = await import(`./dir/${file}.js`)

```

### WebAssembly : ?init

```
import init from './example.wasm?init'

init().then((instance) => {
  instance.exports.test()
})

```

### Web Workers

```
const worker = new Worker(new URL('./worker.js', import.meta.url))

```

### 构建优化

- CSS 代码分割 ：异步 模块 css 会自动抽离
- 预加载指令生成 ： 入口 chunk 自动生成`<link rel="modulepreload">`
- 异步 Chunk 加载优化 ：vite 会同时加载 异步 chunk 和 其依赖的 chunk 。（之前需要先解析异步 chunk，再加载依赖 chunk）
