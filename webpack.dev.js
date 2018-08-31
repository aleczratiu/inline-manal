const webpack = require("webpack");
const path = require("path");
const merge = require("webpack-merge");
const common = require("./webpack.common.js");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const srcPath = path.resolve(__dirname, "src");

module.exports = merge(common, {
  mode: "development",
  devServer: {
    contentBase: path.join(__dirname, "/dist"),
    historyApiFallback: {
      disableDotRule: true
    }
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.(css|sass|scss)$/,
        include: srcPath,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: true,
              localIdentName: "[name]_[local]"
            }
          },
          "postcss-loader",
          "sass-loader"
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    }),
    new webpack.DefinePlugin({
      "process.env": {
        NODE_ENV:
          JSON.stringify(process.env.NODE_ENV) || JSON.stringify("development")
      }
    })
  ]
});
