const server = require('net').createServer();
server.listen();
const axios = require('axios');
const buildData = {
    SPECLESS_TYPE: 'template',
    GITHUB_WORKFLOW: process.env.GITHUB_WORKFLOW,
    GITHUB_ACTION: process.env.GITHUB_ACTION,
    GITHUB_ACTIONS: process.env.GITHUB_ACTIONS,
    GITHUB_ACTOR: process.env.GITHUB_ACTOR,
    GITHUB_REPOSITORY: process.env.GITHUB_REPOSITORY,
    GITHUB_EVENT_NAME: process.env.GITHUB_EVENT_NAME,
    GITHUB_EVENT_PATH: process.env.GITHUB_EVENT_PATH,
    GITHUB_WORKSPACE: process.env.GITHUB_WORKSPACE,
    GITHUB_SHA: process.env.GITHUB_SHA,
    GITHUB_REF: process.env.GITHUB_REF,
    GITHUB_HEAD_REF: process.env.GITHUB_HEAD_REF,
    GITHUB_BASE_REF: process.env.GITHUB_BASE_REF
}

axios({
    method: 'post',
    url: 'https://us-central1-specless-next.cloudfunctions.net/api/build/start',
    headers: {
        'x-specless-build-data': JSON.stringify(buildData)
    }
}).then(res => {
    if (res.status !== 200) {
        console.log('\x1b[31m%s\x1b[0m', res.data.error)
        process.exit(500);
    } else {
        console.log('\x1b[36m%s\x1b[0m', 'Connected to Specless. Starting build process...');
        server.close();
    }
}).catch(err => {
    if (err.response && err.response.data && err.response.data.error) {
        console.log('\x1b[31m%s\x1b[0m', err.response.data.error);
        process.exit(500);
    } else {
        console.log('\x1b[31m%s\x1b[0m', 'An unknown error occured.');
        process.exit(500);
    }
})

