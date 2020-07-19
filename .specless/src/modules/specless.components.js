import { Context as _Context } from './../components/Context.js';
import { Controller as _Controller } from './../components/Controller.js';
import { Component as _Component } from './../components/Component.js';
import { Body as _Body } from './../components/Body.js';
import { Wrapper as _Wrapper } from './../components/Wrapper.js';
import { Layer as _Layer } from './../components/Layer.js';
import { Elements as _Elements } from './../components/Elements.js';
import { VideoPlayer as _VideoPlayer } from './../components/VideoPlayer.js';
import { Carousel as _Carousel } from './../components/Carousel.js';
const components = {
    Context: _Context,
    Controller: _Controller,
    Component: _Component,
    Body: _Body,
    Wrapper: _Wrapper,
    Layer: _Layer,
    Elements: _Elements,
    VideoPlayer: _VideoPlayer,
    Carousel: _Carousel
}

if (typeof window === 'object') {
    window[`__speclessInstance_${BUILD_ID}_components`] = components;
} else {
    global[`__speclessInstance_${BUILD_ID}_components`] = components;
}

export const Context = _Context;
export const Controller = _Controller;
export const Component = _Component;
export const Body = _Body;
export const Wrapper = _Wrapper;
export const Layer = _Layer;
export const Elements = _Elements;
export const VideoPlayer = _VideoPlayer;
export const Carousel = _Carousel;