var inquirer = require('inquirer');
const specless = require('./../project-templates/specless.json');
const path = require('path');
const fs = require('fs');
const ROOT_PATH = path.resolve(__dirname, '../../');
const BASE_NAME = path.basename(ROOT_PATH);
const SETTINGS_FILE = path.join(ROOT_PATH, 'specless.json');
console.log(SETTINGS_FILE);
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
    const settings = Object.assign({}, specless, answers, {
        devPort: Number(answers.devPort),
        projectId: BASE_NAME
    });
    fs.writeFileSync(SETTINGS_FILE, JSON.stringify(settings));
}).catch(error => {
    if(error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else when wrong
    }
});