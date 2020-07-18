//const fs = require('fs');
const path = require('path');
//const BUILD_DIR = path.resolve(__dirname, '../../../build');
const babel = require("@babel/core");
function GenerateSSRPlugin(options) {}

GenerateSSRPlugin.prototype.apply = (compiler) => {
    compiler.plugin('emit', function(compilation, callback) {
        for (let key in compilation.assets) {
            if (key === 'specless.run.js' || (key.startsWith('panel.') && key.endsWith('.js')) || key === 'data.meta.js') {
                const data = compilation.assets[key].source();
                babel.transform(data, {
                    "plugins": ["@babel/plugin-transform-modules-commonjs"]
                }, (err, result) => {
                    if (!err && result) {
                        compilation.assets[`__ssr.${key}`] = {
                            source: function() {
                                return result.code;
                            },
                            size: function() {
                                return result.code.length;
                            }
                        }
                    } else {

                    }
                    callback()
                })
            }
        }
    })
}

module.exports = GenerateSSRPlugin;