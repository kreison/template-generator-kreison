import { CURR_DIR, TemplateConfig } from '..';
import { gitignoreContent } from '../variables/gitignoreContent';
import path from 'path';
import fs from 'fs';


const SKIP_FILES = [ 'node_modules', '.template.json' ];

function createDirectoryContents(templatePath: string, projectName: string, config: TemplateConfig) {
  const filesToCreate = fs.readdirSync(templatePath);

  filesToCreate.forEach(file => {
    const origFilePath = path.join(templatePath, file);
    const stats = fs.statSync(origFilePath);

    if (SKIP_FILES.indexOf(file) > -1) return;

    if (stats.isFile()) {
      const contents = fs.readFileSync(origFilePath, 'utf8');

      const writePath = path.join(CURR_DIR, projectName, file);

      fs.writeFileSync(writePath, contents, 'utf8');
    } else if (stats.isDirectory()) {
      fs.mkdirSync(path.join(CURR_DIR, projectName, file));
      createDirectoryContents(path.join(templatePath, file), path.join(projectName, file), config);
    }
  });
  createGitIgnoreFile(path.join(CURR_DIR, projectName, '.gitignore'));
  fs.writeFileSync(
    path.join(CURR_DIR, projectName, '.env'),
    '',
    'utf8',
  );
}

function createGitIgnoreFile(writePath: string) {
  fs.writeFileSync(
    writePath,
    gitignoreContent,
    'utf8',
  );
}

export default createDirectoryContents;
