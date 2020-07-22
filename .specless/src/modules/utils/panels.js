let utils = {};
if (typeof window === 'object') {
    utils = window[`__speclessInstance_${BUILD_ID}_utils`];
} else {
    utils = global[`__speclessInstance_${BUILD_ID}_utils`];
}
export const getLayout = utils.getLayout;
export const createUseStyles = utils.createUseStyles;