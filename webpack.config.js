const path = require('path');

module.exports = {
  entry: path.join(__dirname, './src/client/index.jsx'),
  mode: 'development',
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist')
  },
  watch: true,
  resolve: {
    extensions: ['.js', '.jsx']
  }
};