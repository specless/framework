## Creative Template Development Workflow

### Open `/src/panel.default.js`
1. Once you have run the initial setup process and have the development server running, open the project folder in your code editor of choice. 
2. In your code editor, navigate to `/src/panel.default.js` and open that file. 

This file contains as two named exports `config` and `Panel`. These are required exports, so whatever edits you make to this file, please ensure it always exports these two properties. Making changes to this file will automatically force the preview interface to reload.

### What are panels?
Panels represent unique chunks of content within an ad. A typical ad displays only one panel-- what you see inside of an ad slot. If the ad placement where your creative is trafficked supports ad expansion, then the expanded portion of the ad would have content populated from a second panel -- perhaps one called `expanded`. 

All projects require at least one panel and require at least one panel to have an id of `default`. 

### The `Panel` export
The `Panel` export is a React component. You can modify the code that renders and manages the lifecycle of the component just as you would with any compont that extends `React.Component`. The ad has been populated with a simple example showing how you can use user provided data to to populate your template and use various layouts to style the ad depending on the size the ad is currently rendering at. 

### The panel `config` export
The `config` export must be an object that contains information about this panel that the Specless framework can read to understand how it should be rendered. 

#### `name`
You can give the panel a more semantic name by editing the `name` property-- this will be used in the Specless UI to refernce this panel instead of the panel's unique id. 

#### `layouts`
The `layouts` property is an array that contains any number of layout configurations. Layouts are a way of expressing the criteria in which specific design considerations would come into effect within the rendering logic of the ad. When an ad first renders and when the ad resizes, we choose the best possible layout fit based on the criteria you've entered in each layout's configuration. Only one layout is active at a time. You can read which layout is active in your component by reading the `layout` prop on the `Panel` component. 

### Add Assets to `/src/assets`
You can add images, fonts and other assets you need to reference in your project to the `/src/assets` folder. To use one of those files, import the file from `/@assets/[file-name-here]` into your panel module (e.g. `/src/panel.default.js`) the same way you'd import as ES6 module. The value of that import will be the path to the file that you can use within your project. 

```
import myImage from '/@assets/my-image.png';

console.log(myImage) // /assets.my-image.png;
```

When referencing the path within your component you should use the `url` method to make sure the url remains relative to where the project is being served-- this is esspecially import once your project has been deployed to Specless servers. 

The `url` method is attached as part of the `api` property passed into your component.

```
import myImage from '/@assets/my-image.png';

export const config = {};

export const Panel = (props) => {
    const imageUrl = props.api.url(myImage);
    /*
        In development, this would return something like 'http://localhost:3232/assets.my-image.png'. 
        When being served in the live environment this would return something like: 'https://worker.specless.app/1/builds/unique-build-id/assets/assets.my-image.png`.
    */
}

```