import postProcessNode from './postProcessNode';
import { CliOptions } from '..';
import fs from 'fs';
import path from 'path';


function isNode(options: CliOptions) {
  return fs.existsSync(path.join(options.templatePath, 'package.json'));
}

function postProcess(options: CliOptions) {
  if (isNode(options)) {
    return postProcessNode(options);
  }
  return true;
}

export default postProcess;
