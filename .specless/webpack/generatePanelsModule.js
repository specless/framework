module.exports = (panels) => {
let imports = ``;
let exports = `export default {`;
for (let key in panels) {
imports = imports + `
import * as _${key} from '@panels/${key}';`
exports = exports + `
    "${key}": _${key},`
}
exports = exports + `
}`
return `${imports}
${exports}`
}
