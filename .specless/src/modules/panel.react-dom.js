let ReactDOM = {};
if (typeof window === 'object') {
    ReactDOM = window[`__speclessInstance_${BUILD_ID}_ReactDOM`];
} else {
    ReactDOM = global[`__speclessInstance_${BUILD_ID}_ReactDOM`];
}
export default ReactDOM;