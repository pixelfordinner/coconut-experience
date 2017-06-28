var webpack = require('webpack');
var path = require('path');

module.exports = {
    cache: true,
    target: 'web',
    entry: {
        app: path.join(__dirname, 'assets/js/app.js'),
      },
    output: {
        path: path.join(__dirname, 'dist/js'),
        publicPath: '',
        filename: '[name].min.js',
      },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
              },
              { test: /\.(glsl|frag|vert)$/, loader: 'raw', exclude: /node_modules/ },
              { test: /\.(glsl|frag|vert)$/, loader: 'glslify', exclude: /node_modules/ },
        ],
      },
    resolve: {
      alias: {
        shaderlib: path.join(__dirname, 'node_modules/three/src/renderers/shaders/ShaderLib'),
      },
    },
    externals: {
        backbone: 'Backbone',
        underscore: '_',
      },
    plugins: [
        new webpack.ProvidePlugin({
            // Automatically detect jQuery and $ as free var in modules
            // and inject the jquery library
            // This is required by many jquery plugins
            backbone: 'Backbone',
            underscore: '_',
          }),
    ],
  };
