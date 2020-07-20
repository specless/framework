const fs = require('fs');
const path = require('path');
const PROJECT_TEMPLATE_ROOT = path.resolve(__dirname, './../project-templates');
const README_PATH = path.join(PROJECT_TEMPLATE_ROOT, '/readme.md');
const TEMPLATE_README_PATH = path.join(PROJECT_TEMPLATE_ROOT, '/template/readme.md');
const PLACEMENT_README_PATH = path.join(PROJECT_TEMPLATE_ROOT, '/placement/readme.md');
const README = fs.readFileSync(README_PATH);
const TEMPLATE_README = fs.readFileSync(TEMPLATE_README_PATH);
const PLACEMENT_README = fs.readFileSync(PLACEMENT_README_PATH);

module.exports = (config) => {
return `# ${config.name}
${(config.projectType === 'template') ? 'A creative template created with the Specless framework.' : 'An ad placement created with the Specless framework.'}

${README}

${(config.projectType === 'template') ? TEMPLATE_README : PLACEMENT_README}`
}