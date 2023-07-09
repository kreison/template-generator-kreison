import { buildWebpackConfig } from './config/build/buildWebpackConfig';
import { BuildEnv, BuildPaths } from './config/build/types/config';
import webpack from 'webpack';
import doteenvConfig from 'dotenv';
import path from 'path';


export const HOST_URL = '127.0.0.1';


export default (env: BuildEnv): webpack.Configuration => {
  const paths: BuildPaths = {
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    build: path.resolve(__dirname, 'build'),
    html: path.resolve(__dirname, 'public', 'index.html'),
    src: path.resolve(__dirname, 'src'),
    favicon: path.resolve(__dirname, 'public', 'favicon.png'),
  };


  const dotenv = doteenvConfig.config({ path: __dirname + '/.env' });
  // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
  const mode = env.mode || 'development';
  const PORT = env.port || 3000;

  const isDev = mode === 'development';

  const config: webpack.Configuration = buildWebpackConfig({ dotenv, mode, paths, isDev, port: PORT });


  return config;
};
