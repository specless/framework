
const requireFromString = require('require-from-string');
const { META_DATA_OUTPUT_NAME } = require('./../../constants');

function GenerateMetaData(options) {}

GenerateMetaData.prototype.apply = (compiler) => {
    compiler.plugin('emit', function(compilation, callback) {
        for (let key in compilation.assets) {
            if (key === '__ssr.data.meta.js') {
                try {
                    const mod = requireFromString(compilation.assets[key].source())
                    const data = JSON.stringify(mod.meta);
                    compilation.assets[META_DATA_OUTPUT_NAME] = {
                        source: function() {
                            return data;
                        },
                        size: function() {
                            return data.length;
                        }
                    }
                    delete compilation.assets['__ssr.data.meta.js'];
                    delete compilation.assets['data.meta.js'];
                } catch (err) {
                    console.error(err);
                }
            }
        }
        callback()
    })
}

module.exports = GenerateMetaData;