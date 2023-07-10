import { BuildOptions } from './types/config';
import clearConsole from './utils';
import { HOST_URL } from '../../webpack.config';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ReactRefreshWebpackPlugin from '@pmmmwh/react-refresh-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import { WebpackCompilerPlugin } from 'webpack-compiler-plugin';


export function buildPlugins(options: BuildOptions, port: number): webpack.WebpackPluginInstance[] {

  const { isDev, dotenv } = options;

  const plugins = [
    new HtmlWebpackPlugin({ template: options.paths.html, favicon: options.paths.favicon }),
    new webpack.ProgressPlugin({
      activeModules: false,
      entries: true,
      modules: true,
      modulesCount: 5000,
      profile: false,
      dependencies: true,
      dependenciesCount: 10000,
      percentBy: null,
    }),
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].css',
    }),
    new webpack.DefinePlugin({ __IS_DEV__: isDev, 'process.env': JSON.stringify(dotenv.parsed) }),
    new ForkTsCheckerWebpackPlugin(),
    new ESLintPlugin({
      extensions: ['js',
        'mjs',
        'jsx',
        'ts',
        'tsx'],
      eslintPath: require.resolve('eslint'),
      failOnError: isDev,
      resolvePluginsRelativeTo: __dirname,
      emitWarning: false,
      failOnWarning: false,
      cache: false,
      threads: true,
    })
  ];

  if (isDev) {
    plugins.push(new ReactRefreshWebpackPlugin());
    plugins.push(new WebpackCompilerPlugin({
      name: 'clear-console-plugin',
      listeners: {
        compileStart: (): void => {
          clearConsole();
          console.log();
          console.log('\x1b[32m%s\x1b[0m', `DEV SERVER AT ----- http://${HOST_URL}:${port}`);
          console.log();
        },
      },
      stageMessages: undefined,
    }));
  }

  return plugins;
}
