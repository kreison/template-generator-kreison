import { buildLoaders } from './buildLoaders';
import { buildPlugins } from './buildPlugins';
import { buildResolves } from './buildResolves';
import { BuildOptions } from './types/config';
import { buildDevServer } from './buildDevServer';
import type { Configuration } from 'webpack';
import 'webpack-dev-server';


export function buildWebpackConfig(options: BuildOptions): Configuration {
  const { mode, paths, isDev, port } = options;

  return {
    mode: mode,
    entry: paths.entry,
    output: {
      filename: '[name].[contenthash].js',
      path: paths.build,
      clean: true,
      publicPath: '/',
      assetModuleFilename: 'static/fonts/[hash][ext][query]',
      chunkFilename: 'static/js/[contenthash].js',
      sourceMapFilename: 'static/maps/[file].map[query]',
    },
    plugins: buildPlugins(options, port),
    module: { rules: buildLoaders(options) },
    resolve: buildResolves(options),
    stats: isDev ? 'minimal' : 'none',
    devtool: isDev ? false : 'source-map',
    devServer: isDev ? buildDevServer(options) : undefined,
    performance: { hints: false },
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
      concatenateModules: true,
      minimize: !isDev,
      nodeEnv: isDev ? 'development' : 'production',
      usedExports: 'global',
    },
  };
}

