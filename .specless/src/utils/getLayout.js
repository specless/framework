import layoutParser from './LayoutManager';

export const layoutApi = layoutParser;

export const getLayout = (layoutObj, width, height) => {
    const layouts = [];
    if (layoutObj) {
        for (let key in layoutObj) {
           layouts.push({
                id: key,
                ...layoutObj[key]
            })
        }
    }
    const chosenLayout = layoutParser.closest(layouts, {
        width: width,
        height: height
    });

    let scaling = 1;
    let scalingDimension = 'width';

    if (chosenLayout.id !== 'none' && chosenLayout.id !== 'error') {
        scaling = layoutParser.scale(chosenLayout, {
            width: width,
            height: height
        })
        scalingDimension = layoutParser.scalingDimension(chosenLayout, {
            width: width,
            height: height
        })
    }

    const layoutProps = {
        id: chosenLayout.id,
        scale: scaling,
        nativeMinWidth: chosenLayout.width[0],
        nativeMaxWidth: chosenLayout.width[1],
        minWidth: chosenLayout.width[0] * scaling,
        maxWidth: chosenLayout.width[1] * scaling,
        nativeMinHeight: chosenLayout.height[0],
        nativeMaxHeight: chosenLayout.height[1],
        minHeight: chosenLayout.height[0] * scaling,
        maxHeight: chosenLayout.height[1] * scaling,
        scaledDimension: scalingDimension,
    }
    return layoutProps
}