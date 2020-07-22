let components = {};
if (typeof window === 'object') {
    components = window[`__speclessInstance_${BUILD_ID}_components`];
} else {
    components = global[`__speclessInstance_${BUILD_ID}_components`];
}
export const Context = components.Context;
export const Controller = components.Controller;
export const Component = components.Component;
export const Body = components.Body;
export const Wrapper = components.Wrapper;
export const Layer = components.Layer;
export const Elements = components.Elements;
export const VideoPlayer = components.VideoPlayer;
export const Carousel = components.Carousel;