const CompressionPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const UglifyJSPlugin = require("uglifyjs-webpack-plugin");
const webpack = require("webpack");
const webpackMerge = require("webpack-merge");
const common = require("./webpack.common.js");

const srcPath = path.resolve(__dirname, "src");

module.exports = webpackMerge(common, {
  mode: "production",
  performance: {
    assetFilter: assetFilename => !assetFilename.startsWith("vendors"),
    hints: "warning"
  },
  stats: {
    entrypoints: false,
    children: false
  },
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        include: srcPath,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              minimize: true,
              localIdentName: "[hash:base64]"
            }
          },
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  optimization: {
    minimizer: [
      new UglifyJSPlugin({
        cache: true,
        parallel: true,
        uglifyOptions: {
          minimize: true,
          output: {
            comments: false,
            beautify: false
          }
        }
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV:
          JSON.stringify(process.env.NODE_ENV) || JSON.stringify("production")
      }
    }),
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$|\.eot?.+$|\.ttf?.+$|\.woff?.+$|\.svg?.+$/,
      threshold: 10240,
      minRatio: 0.8
    })
  ]
});
