import ReactDOM from 'preact/compat';
if (typeof window === 'object') {
    window[`__speclessInstance_${BUILD_ID}_ReactDOM`] = ReactDOM;
} else {
    global[`__speclessInstance_${BUILD_ID}_ReactDOM`] = ReactDOM;
}
export default ReactDOM;