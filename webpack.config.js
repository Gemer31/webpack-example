const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    }
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetsWebpackPlugin(),
      new TerserWebpackPlugin(),
      new CssMinimizerWebpackPlugin(),
    ];
  }

  return config;
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`;
const cssLoaders = (extra = []) => {
  return [MiniCssExtractPlugin.loader, 'css-loader', ...extra];
}

module.exports = {
  mode: isDev ? 'development' : 'production',
  context: path.resolve(__dirname, 'src'),
  entry: {
    main: './index.js',
    analytics: './analytics'
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    alias: {
      '@models': path.resolve(__dirname, 'src', 'models'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  devServer: {
    port: 4200,
    hot: true,
  },
  optimization: optimization(),
  plugins: [
    new HTMLWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: filename('css')
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src', 'favicon.ico'),
          to: path.resolve(__dirname, 'dist')
        }
      ]
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.less$/,
        use: cssLoaders('less-loader'),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.xml$/,
        use: ['xml-loader']
      },
    ]
  }
}