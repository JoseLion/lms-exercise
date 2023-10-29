import DotenvWebpackPlugin from "dotenv-webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import { addDisplayNameTransformer } from "ts-react-display-name";
import { Configuration } from "webpack";

import path from "path";

const webpackConfig: Configuration = {
  entry: {
    main: "./src/main.tsx",
  },
  module: {
    rules: [{
      resolve: { fullySpecified: false },
      test: /\.m?js$/,
    }, {
      exclude: /node_modules/,
      test: /\.tsx?$/,
      use: [{
        loader: "ts-loader",
        options: {
          compilerOptions: { module: "ES2020" },
          getCustomTransformers: () => ({
            before: [addDisplayNameTransformer()],
          }),
          transpileOnly: true,
        },
      }],
    }, {
      test: /\.css$/,
      use: ["style-loader", "css-loader"],
    }, {
      generator: { filename: "assets/images/[contenthash][ext][query]" },
      test: /\.(jpeg|jpg|png)(\?v=\d+\.\d+\.\d+)?$/i,
      type: "asset/resource",
    }, {
      generator: { filename: "assets/fonts/[contenthash][ext][query]" },
      test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/i,
      type: "asset/resource",
    }, {
      generator: { filename: "assets/svg/[contenthash][ext][query]" },
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    }],
  },
  optimization: {
    moduleIds: "deterministic",
    removeEmptyChunks: true,
    runtimeChunk: "single",
    splitChunks: {
      automaticNameDelimiter:  ".",
      cacheGroups: {
        vendors: {
          name: "vendors",
          test: /[\\/]node_modules[\\/]/,
        },
      },
      chunks: "all",
      filename: "[name].[chunkhash].chunk.js",
      maxSize: 256 * 1024,
      usedExports: true,
    },
  },
  output: {
    assetModuleFilename: "assets/[contenthash][ext][query]",
    chunkFilename: "[name].[chunkhash].chunk.js",
    filename: "[name].[contenthash].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
  },
  performance: {
    maxAssetSize: 1024 * 1024,
    maxEntrypointSize: 1024 * 1024,
  },
  plugins: [
    new DotenvWebpackPlugin({
      allowEmptyValues: true,
      defaults: true,
      safe: true,
    }),
    new HtmlWebpackPlugin({ template: "./src/index.html" }),
  ],
  resolve: {
    extensions: [".js", ".ts", ".tsx", ".json"],
  },
};

export default webpackConfig;
