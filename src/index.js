import { panelUrl } from '@utils/panelUrl';

const setSizing = (slot, parent, sizeData) => {
    const width = parent.getBoundingClientRect().width;
    let currentSize, newWidth, newHeight;
    if (sizeData.breakpointType === 'min') {
        sizeData.sizes.forEach(size => {
            if (width >= size.breakpoint) {
                currentSize = size;
            }
        })
    }
    if (currentSize) {
        if (currentSize.type === 'aspect') {
            const heightRatio = currentSize.size.h/currentSize.size.w;
            newWidth = '100%';
            newHeight = (width * heightRatio) + 'px';
        }
    }

    if (newWidth && newHeight) {
        slot.maxHeight = newHeight;
        //parent.maxHeight = newHeight;
        slot.style.width = newWidth;
        slot.style.height = newHeight;
    }
}

export const placement = (csf) => {
    


    // Create iFrame
    const iframe = document.createElement('IFRAME');

    // Styles
    iframe.style.border = 'none';
    iframe.style.width = '100%';
    iframe.style.height = '100%';
    document.body.style.position = 'relative';
    document.documentElement.style.position = 'relative';
    document.body.style.width = '100%';
    document.documentElement.style.width = '100%';
    document.body.style.height = '100%';
    document.documentElement.style.height = '100%';
    document.body.style.overflow = 'hidden';

    // Start csf
    const constants = csf.constantsStore.get();
    const data = csf.placementStore.get();
    

    
    // Default Geometry
    const slot = csf.env.slot;

    
    // Setup Panel
    const panelId = data.general.panel || 'default';
    const panel = csf.createPanel(panelId);
    panel.start(slot).then(() => {
        const geom = panel.measure.get();
        iframe.src = panelUrl({
            id: panelId,
            initialWidth: geom.width,
            initialHeight: geom.height
        }, constants);
        document.body.appendChild(iframe);
        panel.show();

        // Connect to remote panel
        panel.connect(slot, iframe);
    })

}



