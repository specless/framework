let React = {};
if (typeof window === 'object') {
    React = window[`__speclessInstance_${BUILD_ID}_React`];
} else {
    React = global[`__speclessInstance_${BUILD_ID}_React`];
}
export const Component = React.Component;
export const useState = React.useState;
export const userReducer = React.userReducer;
export const useEffect = React.useEffect;
export const useLayoutEffect = React.useLayoutEffect;
export const useRef = React.useRef;
export const useImperativeHandle = React.useImperativeHandle;
export const useMemo = React.useMemo;
export const useCallback = React.useCallback;
export const useContext = React.useContext;
export const useDebugValue = React.useDebugValue;
export const render = React.render;
export const hydrate = React.hydrate;
export const h = React.h;
export const createPortal = React.createPortal;
export const createElement = React.createElement;
export const createContext = React.createContext;
export const createFactory = React.createFactory;
export const cloneElement = React.cloneElement;
export const createRef = React.createRef;
export const isValidElement = React.isValidElement;
export const Fragment = React.Fragment;
export const findDOMNode = React.findDOMNode;
export const PureComponent = React.PureComponent;
export const forwardRef = React.forwardRef;
export const Suspense = React.Suspense;
export const lazy = React.lazy;
export default React;