import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import strip from "@rollup/plugin-strip";
import path from "path";
import externals from "rollup-plugin-node-externals";

import pkg from "./package.json";

export default [
  {
    input: "./src/indexPackage.js", // 入口文件
    output: [
      {
        // 出口文件
        dir: path.dirname(pkg.module),
        format: "es", // es模块导出，支持按需加载
        name: pkg.name,
        exports: "named", // 指定导出模式（自动、默认、命名、无）
        preserveModules: true, // 保留模块结构
        preserveModulesRoot: "src", // 将保留的模块放在根级别的此路径下
      },
    ],
    plugins: [
      // 自动将dependencies依赖声明为 externals
      externals({
        devDeps: false,
      }),
      // 处理外部依赖
      resolve(),
      // 支持基于 CommonJS 模块引入
      commonjs(),
      // 清除调试代码
      strip(),
    ],
  },
];
