import { BuildOptions } from './types/config';


export function buildDevServer(options: BuildOptions): object {
  return {
    port: options.port,
    open: false,
    historyApiFallback: true,
    hot: true,
  };
}
