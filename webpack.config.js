module.exports = {
  entry: "./editor/app.js",
  output: {
    path: __dirname,
    filename: "editor/bundle.js"
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: "style-loader!css-loader?modules",
    }, {
      test: /.js?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
    }],
  }
};
