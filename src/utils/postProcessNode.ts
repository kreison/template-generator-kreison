import { CliOptions } from '..';
import chalk from 'chalk';
import shell from 'shelljs';


function postProcessNode(options: CliOptions) {
  shell.cd(options.tartgetPath);

  let cmd = '';

  if (shell.which('yarn')) {
    cmd = 'yarn';
  } else if (shell.which('npm')) {
    cmd = 'npm install';
  }

  if (cmd) {
    const result = shell.exec(cmd);

    if (result.code !== 0) {
      return false;
    }
  } else {
    console.log(chalk.red('No yarn or npm found. Cannot run installation.'));
  }

  return true;
}
export default postProcessNode;
