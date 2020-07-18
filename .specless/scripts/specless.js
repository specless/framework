const fs = require('fs');
const FormData = require('form-data');
const axios = require('axios');
var http = require('http');

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

const run = () => {
    const formData = new FormData();
    const assetsFolder = fs.readdirSync('./build');
    assetsFolder.forEach((file) => {
        const isDirectory = fs.statSync('./build/' + file).isDirectory();
        if (!isDirectory) {
            formData.append(`${file}`, fs.createReadStream(`./build/${file}`));
        }
    })

    const headers = formData.getHeaders();
    headers['x-specless-build-data'] = JSON.stringify(buildData);
    const request = http.request({
        method: 'post',
        host: 'us-central1-specless-next.cloudfunctions.net',
        path: '/api/build/upload',
        headers: headers
    });

    formData.pipe(request);

    request.on('response', (res) => {
        if (res.statusCode !== 200) {
            console.log('\x1b[31m%s\x1b[0m', 'Build failed to upload to Specless.');
            axios({
                method: 'post',
                url: 'https://us-central1-specless-next.cloudfunctions.net/api/build/failed',
                headers: {
                    'x-specless-build-data': JSON.stringify(buildData)
                }
            })
        } else {
            console.log('\x1b[36m%s\x1b[0m', 'Uploaded Succeeded. Project has been deployed.');
        }
    });
}

console.log('\x1b[36m%s\x1b[0m', 'Build succeeded. Starting upload process...');

run();

