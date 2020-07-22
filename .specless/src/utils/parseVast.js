export const parseVast = ({url, xml, constants}) => {
    return new Promise((resolve, reject) => {
        import(/* webpackIgnore: true */ constants.placementAssetsPath + '/specless.parseVast.js').then(parserModule => {
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