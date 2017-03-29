// This is a karma config file. For more details see
//   http://karma-runner.github.io/0.13/config/configuration-file.html
// we are also using it with karma-webpack
//   https://github.com/webpack/karma-webpack

const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('../../build/webpack.base.conf');
const utils = require('../../build/utils');
const webpack = require('webpack');
const projectRoot = path.resolve(__dirname, '../../');
const config = require('../../config');

const webpackConfig = merge(baseConfig, {
  devtool: '#inline-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.test.env
    })
  ]
});

// no need for app entry during tests
delete webpackConfig.entry;

// Use babel for test files too
webpackConfig.module.loaders.some(function (loader, i) {
  if (/^babel(-loader)?$/.test(loader.loader)) {
    loader.include.push(path.resolve(projectRoot, 'test/unit'));
    return true;
  }
});

module.exports = function (config) {
  config.set({
    // to run in additional browsers:
    // 1. install corresponding karma launcher
    //    http://karma-runner.github.io/0.13/config/browsers.html
    // 2. add it to the `browsers` array below.
    browsers: ['Chrome'],
    frameworks: ['mocha', 'sinon-chai'],
    reporters: ['spec'],
    files: ['./index.js'],
    preprocessors: {
      './index.js': ['webpack', 'sourcemap']
    },
    webpack: webpackConfig,
    webpackMiddleware: {
      noInfo: true,
    },
  });
};
