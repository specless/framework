# Layout


```bash
npm install --save @specless/layout
```

Layouts determine the size and shape of a block of html by defining at least a height and width and an optional scaling value

```javascript
{
    id: "layoutname",
    height: [200],
    width: [200, 250]
}
```

is understood as

```javascript
{
    id: "layoutname",
    height: [200, 200],
    width: [200, 250],
    scale: [0.1, 1000]
}
```

the `height`, `width`, and `scale` values all contain ranges.

the `height` and `width` ranges define an area where the layout does not have to scale.

the `scale` range defines how far outside of the `height` and `width` the layout is willing to scale to. At default, this is `10x` smaller and `1000x` larger. The smaller scale on the min side has to do with webkituiviews in apps which do not allow html font size to go below `10px`. Because we are going to have the base at `100px` a `10x` reduction should cover almost all cases run into. If more space is needed, it should just be created as a separate layout.

### Inputs

#### Dimension Set

```javascript
var positiveInteger1 = 459;
var positiveInteger2 = 1028;
var dimensionSet = {
    height: positiveInteger1,
    width: positiveInteger2
};
```

#### Layout Set

```javascript
var layout1 = {
    id: 'layout1',
    height: 200,
    width: 200
};
var layout2 = {
    id: 'layout2',
    height: 400,
    width: 400
};
var layoutSet = [layout1, layout2];
```

### Methods

#### `closest(layoutSet, dimensionSet) => Layout`

pass a layout set and a dimension set to the closest method to allow it to choose the closest layout

#### `coverage(layout, dimensionSet) => Percentage`

pass a layout and dimension set to return the amount that will be covered by the given layout

#### `specificity(layout) => Number`

pass a layout to get a number relating to its specificity or an inverse of all of its ranges

#### `tooBig(layout, dimensionSet) => Boolean`

pass a layout and dimension set to determine if the layout is too big to fit in the given dimensions

#### `render(layout, dimensionSet) => Object`

compute all values applicable to how the passed layout should be able to present itself.