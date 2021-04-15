const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  mode: 'development',
  entry: './main.js',
  output: {
    path: path.resolve(__dirname, '..', 'server', 'public', 'dist'),
    //path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: './dist/',
  },
  module:{
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ]
      },
      {
        test: /\.(png|jpg)$/,
        use : [{
          loader: 'file-loader',
          options:{
            esModule: false,
            name: "[path][name].[ext]"
          }
        }]
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
  devServer: {
    //hot: true
  }
}