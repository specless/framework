const { META_DATA_OUTPUT_NAME, DEMO_DATA, DEMO_DATA_OUTPUT_NAME } = require('./../../constants');
const importFresh = require('import-fresh');
const Ajv = require('ajv');
const path = require('path');

class JsonSchemaData {
    constructor(options) {
        this.options = options;
    }

    apply(compiler) {
        compiler.hooks.done.tapAsync('JsonSchemaData', ({compilation}, callback) => {
            const data = importFresh(DEMO_DATA);
            const dataJSON = JSON.stringify(data);
            if (compilation.assets[META_DATA_OUTPUT_NAME]) {
                const meta = JSON.parse(compilation.assets[META_DATA_OUTPUT_NAME].source());
                const { fieldsets } = meta;
                if (fieldsets) {
                    fieldsets.forEach((fieldset) => {
                        const ajv = new Ajv({ useDefaults: true });
                        const schema = Object.assign({}, fieldset.schema);
                        try {
                            const valid = ajv.validate(schema, data[fieldset.key]);
                            if (!valid) {
                                ajv.errors.forEach(error => {
                                    const errorMessage = `'/meta/data.json':\nDemo data validation failed. The value for the property '${error.dataPath}' in the fieldset '${fieldset.key}' is not valid.\n'${error.dataPath}' ${error.message}.`;
                                    compilation.errors.push(new Error(errorMessage))
                                })
                            }
                        } catch (err) {
                            compilation.errors.push(err);
                        }
                    })
                }
            }
            
            compilation.assets[DEMO_DATA_OUTPUT_NAME] = {
                source: function() {
                    return dataJSON;
                },
                size: function() {
                    return dataJSON.length;
                }
            };

            callback();
        })
    }
}

module.exports = JsonSchemaData