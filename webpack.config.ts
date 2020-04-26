import * as path from 'path';
import * as webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

console.info(`[webpack.config] NODE_ENV: ${process.env.NODE_ENV}`);
console.info(`[webpack.config] platform: ${process.platform}`);
console.info(`[webpack.config] version: ${process.version}`);
const isDevelopment = process.env.NODE_ENV !== 'production';

const DIR_ROOT = path.join(__dirname);
const DIR_APP_SRC = path.join(DIR_ROOT, 'src');
const DIR_APP_DIST = path.join(DIR_ROOT, 'dist');

const pkg = require(path.join(DIR_ROOT, 'package.json'));

const PATH_TO_INDEX_FILE = path.join(DIR_APP_SRC, 'index.js');

let BUILD = {
  output: {
    path: DIR_APP_DIST,
    publicPath: process.env.PUBLIC_PATH,
  },
  htmlTemplateName: path.join(DIR_APP_SRC, 'html', 'index.hbs'),
};

const getPlugins = () => {
  const plugins = [
    new ForkTsCheckerWebpackPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      inject: 'head',
      scriptLoading: 'defer',
      title: 'game_of_life',
      template: BUILD.htmlTemplateName,
      publicPath: process.env.PUBLIC_PATH,
      hash: true,
      meta: {
        'mobile-web-app-capable': 'yes',
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      '__DEV__': isDevelopment,
      '_VERSION_': JSON.stringify(pkg.version),
      'NODE_ENV': JSON.stringify(process.env.NODE_ENV) || 'development',
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? '[name].css' : '[name].[hash].css',
      chunkFilename: isDevelopment ? '[id].css' : '[id].[hash].css',
    }),
  ];

  if (isDevelopment) {
    plugins.push(new webpack.HotModuleReplacementPlugin());
  } else {
    // some only prod
  }

  if (false) {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static'
      }),
    );
  }

  return plugins;
};

const config: webpack.Configuration = {
  mode: isDevelopment ? 'development' : 'production',
  // mode: 'development',
  node: {
    fs: 'empty',
    __filename: true,
    __dirname: true
  },
  devtool: isDevelopment ? 'eval' : false,
  entry: [
    'core-js/stable',
    'regenerator-runtime/runtime',
    'react-hot-loader/patch',
    'whatwg-fetch',
    PATH_TO_INDEX_FILE,
  ],
  output: {
    path: BUILD.output.path,
    publicPath: BUILD.output.publicPath,
    filename: isDevelopment ? '[name].bundle.js' : 'app.[name].[contenthash].js',
  },
  devServer: {
    historyApiFallback: true,
    contentBase: './dist',
    port: 3000,
    hot: true,
    noInfo: true,
    quiet: false,
    inline: true,
    lazy: false,
    public: '',
    host: '0.0.0.0',
  },
  resolve: {
    alias: {
      'react-dom': isDevelopment ? '@hot-loader/react-dom' : 'react-dom',

      '~components': path.join(DIR_APP_SRC, 'components'),
      '~ui': path.join(DIR_APP_SRC, 'ui'),
      '~styles': path.join(DIR_APP_SRC, 'styles'),
      '~utils': path.join(DIR_APP_SRC, 'utils'),
    },
    extensions: [
      '.json',
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
    ],
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
  },
  optimization: {
    noEmitOnErrors: true,
    usedExports: true,
  },
  module: {
    rules: [
      {
        test: /\.hbs$/,
        use: [
          'handlebars-loader',
        ],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'thread-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|mp3)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDevelopment,
            },
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
            options: {
              esModule: false,
            }
          },
        ]
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
    ],
  },
  plugins: getPlugins(),
};
module.exports = config;
