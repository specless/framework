const general = {
    key: 'general',
    title: 'General Settings',
    schema: {
        type: 'object',
        properties: {
            elements: {
                type: 'string',
                title: 'Custom Elements'
            }
        }
    },
    uiSchema: {
        elements: {
            'ui:widget': 'elements'
        }
    }
}

const wide = {
    key: 'wide',
    title: 'Wide Design Settings',
    view: 'wide',
    schema: {
        type: 'object',
        properties: {
            artwork: {
                type: 'string',
                title: 'Main Artwork'
            },
            elements: {
                type: 'string',
                title: 'Custom Elements: Design Configuration'
            }
        }
    },
    uiSchema: {
        artwork: {
            'ui:widget': 'image'
        },
        elements: {
            'ui:widget': 'elementsDesign',
            'ui:options': {
                parentIdPath: ['general', 'elements'],
                xMin: 0,
                xMax: 1280,
                yMin: 0,
                yMax: 450
            }
        }
    }
}

const large = {
    key: 'large',
    title: 'Large Design Settings',
    view: 'large',
    schema: {
        type: 'object',
        properties: {
            artwork: {
                type: 'string',
                title: 'Main Artwork'
            },
            elements: {
                type: 'string',
                title: 'Custom Elements: Design Configuration'
            }
        }
    },
    uiSchema: {
        artwork: {
            'ui:widget': 'image'
        },
        elements: {
            'ui:widget': 'elementsDesign',
            'ui:options': {
                parentIdPath: ['general', 'elements'],
                xMin: 0,
                xMax: 1280,
                yMin: 0,
                yMax: 450
            }
        }
    }
}

const medium = {
    key: 'medium',
    title: 'Medium Design Settings',
    view: 'medium',
    schema: {
        type: 'object',
        properties: {
            artwork: {
                type: 'string',
                title: 'Main Artwork'
            },
            elements: {
                type: 'string',
                title: 'Custom Elements: Design Configuration'
            }
        }
    },
    uiSchema: {
        artwork: {
            'ui:widget': 'image'
        },
        elements: {
            'ui:widget': 'elementsDesign',
            'ui:options': {
                parentIdPath: ['general', 'elements'],
                xMin: 0,
                xMax: 1280,
                yMin: 0,
                yMax: 450
            }
        }
    }
}

const small = {
    key: 'small',
    title: 'Small Design Settings',
    view: 'small',
    schema: {
        type: 'object',
        properties: {
            artwork: {
                type: 'string',
                title: 'Main Artwork'
            },
            elements: {
                type: 'string',
                title: 'Custom Elements: Design Configuration'
            }
        }
    },
    uiSchema: {
        artwork: {
            'ui:widget': 'image'
        },
        elements: {
            'ui:widget': 'elementsDesign',
            'ui:options': {
                parentIdPath: ['general', 'elements'],
                xMin: 0,
                xMax: 1280,
                yMin: 0,
                yMax: 450
            }
        }
    }
}

module.exports = [
    general,
    wide,
    large,
    medium,
    small
]