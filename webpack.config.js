module.exports = {
   
  
    resolve: {
      alias: {
        'react-native$': 'react-native-web'
      }
    }
  }
  // const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
// const polyfill =require('@babel/polyfill');
// import polyfill from "@babel/polyfill";
// const babelConfig = JSON.parse(
//   fs.readFileSync(path.join(__dirname, '/.babelrc'))
// );

module.exports = {
  entry: ['@babel/polyfill', path.join(__dirname, '/index.web.js')],
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    publicPath: '/'
  },
  plugins: [
    new webpack.DefinePlugin({
      __DEV__: process.env.NODO_ENV === 'development',
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        PLATFORM_ENV: JSON.stringify('web')
      }
    })
  ],
 mode:'development',
  module: {
    rules: [
      {
        test: /\.ttf$/,
        loader: 'url-loader',
        include: path.resolve(
          __dirname,
          '../node_modules/react-native-vector-icons'
        )
      },
      {
        // Many react-native libraries do not compile their ES6 JS.
        test: /\.js$/,
        include: [
          path.join(__dirname, '/index.web.js'),
          // path.join(__dirname, '/App.js'),
          path.join(__dirname, '/App.web.js'),
          /node_modules\/react-native-/,
          path.join(__dirname, '/src'),
          

        ],
        exclude: /node_modules\/react-native-web\/react-native-camera\/react-navigation/,
        loader: 'babel-loader',
        options: {
          presets:["module:metro-react-native-babel-preset","@babel/preset-env","@babel/preset-react"],
          plugins: ["react-native-web",'transform-class-properties'],
          cacheDirectory: true
        }
      },
      {
        test: /\.(gif|jpe?g|png|svg)$/,
        loader: 'url-loader',
        query: { name: 'images/[name]-[hash:16].[ext]' }
      },
      {
        test: /\.ttf$/,
        loader: "url-loader", // or directly file-loader
        include: path.resolve(__dirname, "node_modules/react-native-vector-icons"),
      },
      {
        test: /\.(mp3|wav)$/,
        loader: 'file-loader',
        query: { name: 'sounds/[name]-[hash:16].[ext]' }
      }
    ]
  }
}