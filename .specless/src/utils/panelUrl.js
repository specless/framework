const passedConstants = [
    'templateConfig',
    'templateLibraryRoot',
    'templateLibraryBuild',
    'csfUrl',
    'isPreview',
    'isPreviewInterface',
    'deviceType'
]

export const panelUrl = (panel, constants) => {
    const baseUrl = `${constants.templateRoot}/html/${panel.id}`;
    delete panel.id;
    const panelProps = [];
    const constantProps = [];
    for (let key in panel) {
        panelProps.push(`panel[${key}]=${panel[key]}`)
    }
    for (let key in constants) {
        if (passedConstants.includes(key)) {
            constantProps.push(`constants[${key}]=${constants[key]}`)
        }
    }
    const panelQuery = panelProps.join('&');
    const constantQuery = constantProps.join('&');
    const queryString = `?${panelQuery}&${constantQuery}`;
    return baseUrl + queryString;
}