import { loadModule } from './loadModule';

export const parseVAST = ({url, xml, constants}) => {
    return new Promise((resolve, reject) => {
        loadModule('VAST', constants).then(parserModule => {
            parserModule.default({url, xml, constants}).then((vast) => {
                resolve(vast);
            }).catch(err => {
                reject(err)
            })
        }).catch(err => {
            reject(err)
        })
    })
}