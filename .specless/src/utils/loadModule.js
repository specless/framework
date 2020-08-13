export const loadModule = (moduleName, constants) => {
    return import(/* webpackIgnore: true */ `${constants.templateLibraryRoot}/assets/specless.${moduleName}.js`)
}