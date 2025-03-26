// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
    entry: path.join(__dirname, "src", "index.js"),
    output: {
      path:path.resolve(__dirname, "dist"),
    },
    plugins: [
      new ModuleFederationPlugin({
        name: 'remote',
        filename: 'remoteEntry.js',
        remotes: {
          web_mf_blog: 'web_mf_blog@http://localhost:3010/tn/_next/static/chunks/remoteEntry.js',
          // ptvweb: 'ptvweb@http://localhost:8081/_next/static/chunks/remoteEntry.js',
        },
        exposes: {
          './App': './src/View.js',
        },
        shared: {
          react: {       
            requiredVersion: false,
            singleton: true,
          },
          'react-dom': {       
            requiredVersion: false,
            singleton: true,
          },
        },
      }),
      new HtmlWebpackPlugin({
        template: path.join(__dirname, "public", "index.html"),
      }),
    ],
    module: {
        rules: [
          {
            test: /\.?js$/,
            exclude: /node_modules/,
            use: {
              loader: "babel-loader",
              options: {
                presets: ['@babel/preset-env', '@babel/preset-react']
              }
            }
          },
        ]
      },
  devServer: {
    port: 8800,
  },
};