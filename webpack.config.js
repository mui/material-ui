var webpack = require('webpack')

module.exports = {

  output: {
    library: 'MaterialUI',
    libraryTarget: 'umd'
  },

  externals: [
    {
      'react': {
        root: 'React',
        commonjs2: 'react',
        commonjs: 'react',
        amd: 'react'
      },
      'react-dom': {
        root: 'ReactDOM',
        commonjs2: 'react-dom',
        commonjs: 'react-dom',
        amd: 'react-dom'
      },
      'react-addons-transition-group': {
        root: ['React', 'addons', 'TransitionGroup'],
        commonjs2: 'react-addons-transition-group',
        commonjs: 'react-addons-transition-group',
        amd: 'react-addons-transition-group',
      },
      'react-addons-create-fragment': {
        root: ['React', 'addons', 'createFragment'],
        commonjs2: 'react-addons-create-fragment',
        commonjs: 'react-addons-create-fragment',
        amd: 'react-addons-create-fragment',
      }
    }
  ],

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        exclude: /node_modules/
      }
    ]
  },

  node: {
    Buffer: false
  },

  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ]
}
