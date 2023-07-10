#!/usr/bin/env node
import showMessage from './utils/showMessage';
import getTemplateConfig from './utils/getTemplateConfig';
import createProject from './utils/createProject';
import postProcess from './utils/postProcess';
import createDirectoryContents from './utils/createDirectoryContents';
import { gitignoreContent } from './variables/gitignoreContent';
import checkForLatestVersion from './utils/checkForLastVersion';
import inquirer from 'inquirer';
import { argv } from 'yargs';
import semver from 'semver';
import chalk from 'chalk';
import shell from 'shelljs';
import * as path from 'path';
import * as fs from 'fs';


const packageJson = require('../package.json');


const CHOICES = fs.readdirSync(path.join(__dirname, 'templates'));

const QUESTIONS = [
  {
    name: 'template',
    type: 'list',
    message: 'What project template would you like to generate?',
    choices: CHOICES,
    when: (): boolean => !argv[ 'template' ],
  }, {
    name: 'name',
    type: 'input',
    message: 'Project name:',
    when: () => !argv[ 'name' ],
    validate: (input: string) => {
      if (/^([A-Za-z\-\_\d])+$/.test(input)) return true;
      else return 'Project name may only include letters, numbers, underscores and hashes.';
    },
  },
];

export const CURR_DIR = process.cwd();

export interface TemplateConfig {
  files?: string[]
  postMessage?: string
}

export interface CliOptions {
  projectName: string
  templateName: string
  templatePath: string
  tartgetPath: string
  config: TemplateConfig
}

inquirer.prompt(QUESTIONS)
  .then((answers: any) => {

    answers = Object.assign({}, answers, argv);

    const projectChoice = answers[ 'template' ];
    const projectName = answers[ 'name' ];
    const templatePath = path.join(__dirname, 'templates', projectChoice);
    const tartgetPath = path.join(CURR_DIR, projectName);
    const templateConfig = getTemplateConfig(templatePath);

    const options: CliOptions = {
      projectName,
      templateName: projectChoice,
      templatePath,
      tartgetPath,
      config: templateConfig,
    };

    checkForLatestVersion()
      .catch(() => {
        try {
          return shell.exec('npm view template-generator-kreison version').toString().trim();
        } catch (e) {
          return null;
        }
      })
      .then(latest => {
        if (latest && semver.lt(packageJson.version, latest)) {
          console.log();
          console.error(
            chalk.yellow(
              // eslint-disable-next-line max-len
              `You are running \`template-generator-kreison\` ${packageJson.version}, which is behind the latest release (${latest}).\n\n` +
              'We recommend always using the latest version of create-react-app if possible.',
            ),
          );
          console.log();
        } else {
          if (!createProject(tartgetPath)) {
            return;
          }

          createDirectoryContents(templatePath, projectName, templateConfig);

          createGitIgnoreFile(path.join(CURR_DIR, projectName, '.gitignore'));
          fs.writeFileSync(
            path.join(CURR_DIR, projectName, '.env'),
            '',
            'utf8',
          );

          if (!postProcess(options)) {
            return;
          }

          showMessage(options);
        }
      });
  });

function createGitIgnoreFile(writePath: string) {
  fs.writeFileSync(
    writePath,
    gitignoreContent,
    'utf8',
  );
}
