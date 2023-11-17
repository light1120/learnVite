# 3、vite 命令行

### `vite`

启动 vite 开发服务器，esbuild

- --host
- --port
- --https
- --open ：打开浏览器
- --cors
- --force ： 忽略缓存，重新构建
- --profile ：启动 nodejs 调试
- --strictPort : 指定端口，占用就推出

### `vite build`

构建生产版本，rollup , 支持 rollup 所有插件

- --target : 编译版本，默认`module`，支持 esm ； 也可以降级 `es2015` 或者 一个 browserlist
- --outDir : 输出目录， 默认 dist
- --assetsDir ：资源目录，默认 assets
- --assetsInlineLimit ：资源压缩成 base64 阈值
- --ssr ：指定 ssr 入口
- --minify ：开启或者指定压缩， 默认 esbuild
- --sourcemap ：输出 sourcemap 文件
- --manifest ：生成 manifest 文件
- --ssrManifest ：生成 ssrManifest 文件
- -w, --watch ： 变化，重新构建

### `vite preview`

预览构建产物，因为开发 esbuild ，生产是 rollup 。可以用来检查开发和生产是否有不同

- --host
- --port
- --https
- --open ：打开浏览器
- --strictPort : 指定端口，占用就推出

### `vite optimize`

预构建依赖，为了提升本地开发启动效率

- --force ：忽略缓存，重新构建

### 通用参数选项

- -l 、 --logLevel : 日志等级 Info | warn | error | silen
- --clearScreen : 允许或禁用打印日志时清除屏幕
- --base : 公共基础路径
- -c 、 --config : 使用指定的配置文件
- -m 、 --mode : 设置环境模式
- -f 、--filter : 过滤调试日志
- -d 、--debug : 显示调试日志
- -h 、--help : 显示可用的 CLI 选项
