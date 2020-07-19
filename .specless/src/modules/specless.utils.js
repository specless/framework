import { getLayout as _getLayout } from './../utils/getLayout.js';
import { createUseStyles as _createUseStyles } from 'react-jss';
const utils = {
    getLayout: _getLayout,
    createUseStyles: _createUseStyles
}
if (typeof window === 'object') {
    window[`__speclessInstance_${BUILD_ID}_utils`] = utils;
} else {
    global[`__speclessInstance_${BUILD_ID}_utils`] = utils;
}
export const getLayout = _getLayout;
export const createUseStyles = _createUseStyles;