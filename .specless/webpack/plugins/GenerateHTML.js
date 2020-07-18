//const fs = require('fs');
const path = require('path');
//const BUILD_DIR = path.resolve(__dirname, '../../../build');
//const babel = require("@babel/core");
function GenerateHTML(options) {};
const fs = require('fs');
const Mustache = require('mustache');

GenerateHTML.prototype.apply = (compiler) => {
    compiler.plugin('emit', function(compilation, callback) {
        for (let key in compilation.assets) {
            if (key.startsWith('demo.') && key.endsWith('.js')) {
                const template = fs.readFileSync(path.resolve(__dirname, '../../src/demo-page/template.html'), 'utf8');
                const data = {
                    js: key
                }
                const contents = Mustache.render(template, data);
                const fileName = key.replace('.js', '.html');
                compilation.assets[fileName] = {
                    source: function() {
                        return contents
                    },
                    size: function() {
                        return contents.length;
                    }
                }
            }
        }
        callback()
    })
}

module.exports = GenerateHTML;