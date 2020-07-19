const importFresh = require('import-fresh');
//const { Instantiator } = require('json-schema-default-instance');
const fs = require('fs');
//const path = require('path');
const Ajv = require('ajv');
const {
  CONFIG_MODULE,
  DEMO_DATA,
  DEFAULT_DATA_OUTPUT_NAME,
  DEMO_DATA_OUTPUT_NAME
} = require('./../../constants');

function JsonSchemaData(options) {}

JsonSchemaData.prototype.apply = (compiler) => {
    compiler.plugin('emit', function(compilation, callback) {
        const config = importFresh(CONFIG_MODULE);
        const fieldsets = config.fieldsets;
        const data = {};
        let demoExists = false;
        let demoData = data;
        const validDemoData = {};
        console.log(DEMO_DATA);
        try {
          if (fs.existsSync(DEMO_DATA)) {
            demoExists = true;
            demoData = importFresh(DEMO_DATA);
          }
        } catch(err) {
          demoExists = false;
        }
        
        fieldsets.forEach((fieldset) => {
            const schema = Object.assign({}, fieldset.schema);
            if (schema) {
                //schema['$schema'] = 'http://json-schema.org/draft-04/schema#';
                // const id = generateId();
                // schema.id = id;
                const ajvDefault = new Ajv({ useDefaults: true });
                //ajvDefault.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));
                var defaults = {};
                try {
                  const validate = ajvDefault.compile(schema);
                  validate(defaults);
                } catch (err) {
                  compilation.errors.push(err);
                }
                data[fieldset.key] = defaults;

                if (demoExists) {
                  let fieldData = demoData[fieldset.key];
                  const ajvDemo = new Ajv({ useDefaults: true });
                  //ajvDemo.addMetaSchema(require('ajv/lib/refs/json-schema-draft-04.json'));
                  if (!fieldData) {
                    fieldData = defaults;
                  } else {
                    const valid = ajvDemo.validate(schema, fieldData);
                    if (!valid) {
                      const error = ajvDemo.errors[0];
                      const errorMessage = `'/meta/data.json':\nDemo data validation failed. The value for the property '${error.dataPath}' in the fieldset '${fieldset.key}' is not valid.\n'${error.dataPath}' ${error.message}. Default values for the fieldset '${fieldset.key}' will be used until the issue is resolved. \nSchema Path: '${error.schemaPath}'.`;
                      compilation.errors.push(new Error(errorMessage))
                      fieldData = defaults;
                    }
                  }
                  validDemoData[fieldset.key] = fieldData;
                }
            }
        })
        const demoDataJson = JSON.stringify(validDemoData);
        const defaultData = JSON.stringify(data);

        compilation.assets[DEFAULT_DATA_OUTPUT_NAME] = {
          source: function() {
            return defaultData;
          },
          size: function() {
            return defaultData.length;
          }
        };

        compilation.assets[DEMO_DATA_OUTPUT_NAME] = {
          source: function() {
            return demoDataJson;
          },
          size: function() {
            return demoDataJson.length;
          }
        };
    
        callback();
    });
}

module.exports = JsonSchemaData;