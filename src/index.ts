#!/usr/bin/env node
import showMessage from './utils/showMessage';
import getTemplateConfig from './utils/getTemplateConfig';
import createProject from './utils/createProject';
import postProcess from './utils/postProcess';
import createDirectoryContents from './utils/createDirectoryContents';
import { gitignoreContent } from './variables/gitignoreContent';
import inquirer from 'inquirer';
import { argv } from 'yargs';
import * as path from 'path';
import * as fs from 'fs';


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
  });

function createGitIgnoreFile(writePath: string) {
  fs.writeFileSync(
    writePath,
    gitignoreContent,
    'utf8',
  );
}
