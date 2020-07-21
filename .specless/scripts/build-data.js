const axios = require('axios');
const { writeFileSync} = require('fs');
const { DEMO_AD, DEMO_AD_DATA_PATH } = require('./../constants');
(async () => {
    if (DEMO_AD) {
        try {
            const buildData = await axios.get(`https://us-central1-specless-next.cloudfunctions.net/api/live-build/${DEMO_AD}`);
            writeFileSync(DEMO_AD_DATA_PATH, JSON.stringify(buildData.data));
            console.log('Demo Ad Data Downloaded from Specless Server');
        } catch(err) {
            console.error(err);
            console.error('Unable to load demo ad data from Specless server.');
        }
    }
})()