# 4、vite 依赖预构建

vite 在加载本地项目之前预构建了项目依赖，默认情况下是自动透明完成的。可以使用 `vite -d --force` 查看构建日志

```
Forced re-optimization of dependencies
  vite:deps scanning for dependencies... +0ms
  vite:deps Crawling dependencies using entries:
  ......
  vite:deps Scan completed in 15.24ms:
  ......
  vite:deps Dependencies bundled in 30.05ms +0ms
```

预构建完成后可于 `node_modules/.vite/deps` 目录查看到构建产物。后续在期待开发服务器时，如果没有`--force`，就会直接使用这里预构建好的依赖

### 目的

- CommonJS 和 UMD 兼容性 ：vite 把所有模块都当作 esm ，所以需要将 commonjs 和 umd 换行成 esm
- 性能：为了提高后续页面的加载性能，Vite 将那些具有许多内部模块（例如 `lodash-es` 有 600 多个模块）的 ESM 依赖项转换为单个模块。优化网络拥挤。

预构建仅作用于开发环境，生成环境使用`@rollup/plugin-commonjs`插件完成

### Monorepo 和链接依赖

monorepo 中一个包可能是另一个包的依赖，vite 不会打包依赖的包，而是分析依赖的包的依赖项列表。

如果依赖的包导出的是 ESM 会自动完成，如果不是 ESM , 需要配置 `optimizeDeps.include` , `build.commonjsOptions.include`

### 自定义处理特殊场景 `optimizeDeps`

- entries
- exclude
- include
- esbuildOptions
- force
- disabled
- needsInterop

### 缓存

- 文件系统缓存 : `node_modules/.vite` ； 以下发生变更会触发重新构建
  - 锁文件内容 `pnpm-lock.yaml`
  - `vite.config.js` 配置字段
  - `NODE_ENV` 的值
- 浏览器缓存 ： `max-age=31536000, immutable`
