var inquirer = require('inquirer');
const specless = require('./../project-templates/specless.json');
const path = require('path');
const fs = require('fs');
const ncp = require('ncp');
const readmeGenerator = require('./readme-generator');

const ROOT_PATH = path.resolve(__dirname, '../../');
const BASE_NAME = path.basename(ROOT_PATH);
const SETTINGS_FILE = path.join(ROOT_PATH, 'specless.json');
const TEMPLATE_SRC = path.join(ROOT_PATH, './.specless/project-templates/template/src');
const PLACEMENT_SRC = path.join(ROOT_PATH, './.specless/project-templates/placement/src');
const GITHUB_ACTIONS = path.join(ROOT_PATH, './.specless/project-templates/.github');
const GIT_IGNORE = path.join(ROOT_PATH, './.specless/project-templates/gitignore.txt');
const SRC_DESTINATION = path.join(ROOT_PATH, '/src');
const GITHUB_ACTIONS_DESTINATION = path.join(ROOT_PATH, '/.github');
const GITHUB_IGNORE_DESTINATION = path.join(ROOT_PATH, '/.gitignore');
const README_DESTINATION = path.join(ROOT_PATH, '/readme.md');

const start = () => {
    if (fs.existsSync(SETTINGS_FILE)) {
        confirmSetup();
    } else {
        runSetup();
    }
}

const generateFiles = (config) => {
    let SRC = TEMPLATE_SRC;
    if (config.projectType === 'placement') {
        SRC = PLACEMENT_SRC;
    }
    console.log('Copying project files...');
    ncp(SRC, SRC_DESTINATION, function (srcError) {
        if (!srcError) {
            console.log('Copying GitHub actions...');
            ncp(GITHUB_ACTIONS, GITHUB_ACTIONS_DESTINATION, function (actionsError) {
                if (!actionsError) {
                    console.log('Generating new .gitignore file...');
                    fs.copyFile(GIT_IGNORE, GITHUB_IGNORE_DESTINATION, (gitIgnoreError) => {
                        if (!gitIgnoreError) {
                            console.log('Generating project README...');
                            const readme = readmeGenerator(config);
                            fs.writeFile(README_DESTINATION, readme, (readmeError) => {
                                if (!readmeError) {
                                    console.log('Generating project config specless.json file...')
                                    fs.writeFile(SETTINGS_FILE, JSON.stringify(config), (settingsError) => {
                                        if (!settingsError) {
                                            console.log('Project successfully setup!')
                                        } else {
                                            console.error(settingsError);
                                        }
                                    })
                                }
                            })
                        } else {
                            console.error(gitIgnoreError)
                        }
                    })
                } else {
                    console.error(actionsError);
                }
            });
        } else {
            console.error(srcError);
        }
    });
    
}

const confirmSetup = () => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'proceed',
            message: `You've already setup this project. Setting up the project again may override the files in your /src directory. Do you still want to proceed?`,
            choices: ['NO', 'YES']
        }
    ]).then(answers => {
        if (answers.proceed === 'YES') {
            runSetup()
        }
    }).catch(error => {
        console.error(error);
    });
}

const runSetup = () => {

    inquirer.prompt([
        {
            type: 'list',
            name: 'projectType',
            message: 'What kind of project would you like to create?',
            choices: ['Creative Template', 'Ad Placement'],
            filter: function (val) {
                if (val === 'Creative Template') {
                    return 'template'
                } else if (val === 'Ad Placement') {
                    return 'placement'
                }
            }
        },
        {
            type: 'input',
            name: 'name',
            default: BASE_NAME,
            message: 'What would you like to name this project?'
        },
        {
            type: 'input',
            name: 'devPort',
            default: '3232',
            message: 'What port would you like to run the local development server on?',
            validate: function (value) {
                var pass = value.match(
                    /^([0-9]{1,4}|[1-5][0-9]{4}|6[0-4][0-9]{3}|65[0-4][0-9]{2}|655[0-2][0-9]|6553[0-5])$/i
                );
                if (pass) {
                    if (value.length === 4) {
                        return true;
                    } else {
                        return 'Port number should be 4 digits.'
                    }
                }
                return 'Please enter a valid port number.';
            }
        },
    ]).then(answers => {
        answers.devPort = Number(answers.devPort);
        const config = Object.assign({}, specless, answers, {
            devPort: Number(answers.devPort),
            projectId: BASE_NAME
        });
        generateFiles(config);
    }).catch(error => {
        console.error(error);
    });
}

start();