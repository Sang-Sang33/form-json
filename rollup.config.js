import peerDepsExternal from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import { terser } from "rollup-plugin-terser";
import babel from "@rollup/plugin-babel";
import path from "path";
import postcss from "rollup-plugin-postcss";
import dts from "rollup-plugin-dts";

const packageJson = require("./package.json");
const babelOptions = {
  presets: ["@babel/preset-env"],
  extensions: [".js", ".jsx", ".ts", ".tsx", ".scss"],
  exclude: "**/node_modules/**",
};

const entry = path.resolve(__dirname, "src", "index.tsx");

export default [
  {
    input: entry,
    format: "iife",
    output: [
      {
        file: packageJson.main,
        format: "cjs",
        sourcemap: true
      },
      {
        file: packageJson.module,
        format: "esm",
        sourcemap: true,
      },
    ],
    plugins: [
      peerDepsExternal(),
      commonjs({
        include: /node_modules/,
      }),
      resolve(),
      babel(babelOptions),
      typescript({
        useTsconfigDeclarationDir: true,
        tsconfig: path.resolve(__dirname, "tsconfig.json"),
        check: false,
      }),
      postcss({
        modules: true,
      }),
      // terser(),
    ],
    external: ["lodash-es", "immer", "antd", "@ant-design/icons"],
  },
  {
    input: entry,
    output: [{ filename: "index.d.ts", dir: "lib/es/type", format: "esm" }],
    plugins: [dts.default()],
  },
];
