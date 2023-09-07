const DIST_DIR = './demo',
      SRC_DIR = './src',
      path = require('path'),
      glob = require('glob'),
      DIST_PATH = path.resolve(__dirname, DIST_DIR),
      SRC_PATH = path.resolve(__dirname, SRC_DIR),
      BrowserSyncPlugin = require('browser-sync-webpack-plugin'),
      ssi = require('browsersync-ssi'),
      RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts'),
      MiniCssExtractPlugin = require('mini-css-extract-plugin'),
      TerserPlugin = require('terser-webpack-plugin'),
      entries = {};

glob.sync('*.scss', {
  cwd: SRC_DIR + '/scss',
  ignore: '_*.scss',
}).map(function(key){
  entries[key.replace('.scss', '.css')] = SRC_DIR + '/scss/' + key;
});

module.exports = {
  output: {
    path: DIST_PATH,
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: false,
              //sourceMap: false,
              importLoaders: 2,
            }
          },
          'postcss-loader',
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                outputStyle: 'compressed',
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name]',
    }),
    new RemoveEmptyScriptsPlugin(),
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: { baseDir: [DIST_DIR] },
      files: [
        DIST_DIR + '/**/*.html',
        DIST_DIR + '/**/*.css',
        DIST_DIR + '/**/*.js',
        DIST_DIR + '/**/*.json'
      ],
      'middleware': ssi({
        baseDir: DIST_DIR,
        ext: '.html',
        version: '1.4.0'
      })
    })
  ],
  entry: entries,
  mode: 'production',
  cache: true,
  watch: true,
  watchOptions: {
    ignored: ['/node_modules', '/gitignore']
  },
};