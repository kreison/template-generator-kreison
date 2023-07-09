import { CliOptions } from '..';
import chalk from 'chalk';


function showMessage(options: CliOptions) {
  console.log('');
  console.log(chalk.green('Finished!'));
  console.log(chalk.green(`Go into the project: cd ${options.projectName}`));

  const message = options.config.postMessage;

  if (message) {
    console.log('');
    console.log(chalk.yellow(message));
    console.log('');
  }

}
export default showMessage;
