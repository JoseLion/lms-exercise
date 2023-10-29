import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import ReactRefreshTypeScript from "react-refresh-typescript";
import { WebpackConfiguration } from "webpack-dev-server";
import { merge } from "webpack-merge";

import webpackConfig from "./webpack.config";

const webpackConfigDev: WebpackConfiguration = {
  devServer: {
    client: {
      overlay: false,
      progress: true,
    },
    compress: true,
    headers: { "Cache-Control": "public,max-age=31536000" },
    historyApiFallback: true,
    hot: true,
    liveReload: false,
    open:  true,
    port: 3000,
    watchFiles: {
      paths: ["src/**/*"],
    },
  },
  devtool: "source-map",
  mode: "development",
  module: {
    rules: [{
      enforce: "pre",
      test: /\.js$/,
      use: "source-map-loader",
    }, {
      exclude: /node_modules/,
      test: /\.tsx?$/,
      use: [{
        loader: "ts-loader",
        options: {
          compilerOptions: { module: "ESNext" },
          getCustomTransformers: () => ({
            before: [ReactRefreshTypeScript()],
          }),
          transpileOnly: true,
        },
      }],
    }],
  },
  plugins: [new ReactRefreshWebpackPlugin()],
  stats: {
    errorDetails: true,
    performance: true,
    warnings: true,
  },
};

export default merge(webpackConfig, webpackConfigDev);
