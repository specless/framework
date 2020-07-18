const general = {
    key: 'general',
    title: 'General Settings',
    schema: {
        type: 'object',
        properties: {
            name: {
                type: 'string',
                title: 'Creative Name',
                default: 'Untitled Creative',
                description: 'This name will be used to identify the project when being developed locally.'
            }
        }
    }
}

const exits = {
    key: 'exits',
    title: 'Exits (Click Throughs)',
    schema: {
        type: 'array',
        items: {
            type: 'object',
            title: 'Exit',
            required: [
                'id'
            ],
            properties: {
                id: {
                    type: 'string',
                    title: 'Unique ID',
                    description: 'Provide an unique identifier for this exit.',
                },
                name: {
                    type: 'string',
                    title: 'Name',
                    description: "Please provide a semantic name for this exit. This name will be shown in reporting data."
                },
                description: {
                    type: 'string',
                    title: 'Description',
                    description: "Please describe this exit. This text will be used to aid in the trafficking process."
                },
                silent: {
                    type: 'boolean',
                    title: 'Fires Silently?',
                    description: "Silent click trackers are used for click destinations that need to be determined by the creative (such as dynamic URLs, social engagement, etc). If a click destination is provided for this URL via the trafficking configuration, it will fire silently in the background so that third party click data can be recorded.",
                    default: false
                }
            }
        }
    },
    uiSchema: {
        "ui:options": {
            addButtonLabel: 'Add Exit'
        }
    }
}

const trackers = {
    key: 'trackers',
    title: 'Custom Trackers',
    schema: {
        type: 'array',
        items: {
            type: 'object',
            title: 'Custom Tracker',
            required: [
                'id'
            ],
            properties: {
                id: {
                    type: 'string',
                    title: 'Unique ID',
                    description: 'Provide an unique identifier for this tracker.',
                    format: 'unique-identifier'
                },
                name: {
                    type: 'string',
                    title: 'Name',
                    description: "Please provide a semantic name for this tracker. This name will be shown in reporting data."
                },
                description: {
                    type: 'string',
                    title: 'Description',
                    description: "Please describe when this tracker fires."
                },
                fireOnce: {
                    type: 'boolean',
                    title: 'Fire Once',
                    description: "Notes if this tracker should fire a maximum of once per impression.",
                    default: false
                }
            }
        }
    },
    uiSchema: {
        items: {
            fireOnce: {
                "ui:widget": 'checkbox',
                "ui:options": {
                    label: "Only fire once"
                }
            }
        },
        "ui:options": {
            addButtonLabel: 'Add Tracker'
        }
    }
}

const specs = {
    key: 'specs',
    title: 'Specifications',
    schema: {
        type: 'object',
        properties: {
            platformSupport: {
                type: "array",
                title: "Supported Platforms",
                items: {
                  type: "string",
                  enum: [
                    "smartphone",
                    "tablet",
                    "desktop",
                    "app"
                  ],
                  enumNames: [
                    "Smartphone",
                    "Tablet",
                    "Desktop",
                    "Mobile Apps"
                  ]
                },
                uniqueItems: true,
                description: 'Note which devices/platforms this creative is compatible with.',
            },
            hasDynamicData: {
                type: "boolean",
                title: "Uses Dynamic Data?",
                description: 'Notes if this creative needs to fetch dynamic data from an external data source when loading.',
                default: false
            },
            containsVideo: {
                type: 'string',
                title: 'Contains Video?',
                description: 'Notes if this creative contains video content.',
                default: 'no',
                enum: [
                    'yes',
                    'no',
                    'sometimes',
                    'optional'
                ],
                enumNames: [
                    'Yes',
                    'No',
                    'Sometimes (depends on serving environment/device)',
                    'Optional (depends on configuration)'
                ]
            },
            containsInteractivity: {
                type: 'string',
                title: 'Contains Interactive Elements?',
                description: 'Notes if this creative contains interactive elements (e.g. carousels, galleries, hotspots, etc).',
                default: 'no',
                enum: [
                    'yes',
                    'no',
                    'sometimes',
                    'optional'
                ],
                enumNames: [
                    'Yes',
                    'No',
                    'Sometimes (depends on serving environment/device)',
                    'Optional (depends on configuration)'
                ]
            },
            requiresMultipleClickThroughs: {
                type: 'string',
                title: 'Requires Multiple Click Destinations?',
                description: 'Notes if this creative requires multiple click destinations.',
                default: 'no',
                enum: [
                    'yes',
                    'no',
                    'sometimes',
                    'optional'
                ],
                enumNames: [
                    'Yes',
                    'No',
                    'Sometimes (depends on serving environment/device)',
                    'Optional (depends on configuration)'
                ]
            },
            containsCustomAssets: {
                type: 'string',
                title: 'Contains Custom Assets?',
                description: 'Notes if this creative requires custom assets that need to be designed to spec (as opposed to leveraging existing brand assets such as logos, videos etc).',
                default: 'no',
                enum: [
                    'yes',
                    'no',
                    'sometimes',
                    'optional'
                ],
                enumNames: [
                    'Yes',
                    'No',
                    'Sometimes (depends on serving environment/device)',
                    'Optional (depends on configuration)'
                ]
            },
            containsAnimation: {
                type: 'string',
                title: 'Contains Animation?',
                description: 'Notes if this creative contains animation.',
                default: 'no',
                enum: [
                    'yes',
                    'no',
                    'sometimes',
                    'optional'
                ],
                enumNames: [
                    'Yes',
                    'No',
                    'Sometimes (depends on serving environment/device)',
                    'Optional (depends on configuration)'
                ]
            },
            containsParallax: {
                type: 'string',
                title: 'Contains Parallax or Scroll Effects?',
                description: 'Notes if this creative contains parallax effects or other effects that trigger when the ad scrolls.',
                default: 'no',
                enum: [
                    'yes',
                    'no',
                    'sometimes',
                    'optional'
                ],
                enumNames: [
                    'Yes',
                    'No',
                    'Sometimes (depends on serving environment/device)',
                    'Optional (depends on configuration)'
                ]
            },
            supportsUnfriendlyFrame: {
                type: 'string',
                title: 'Supports Unfriendly Iframes?',
                description: 'Notes if this creative will work in an unfriendly iframe.',
                default: 'no',
                enum: [
                    'yes',
                    'no',
                    'partially',
                    'sometimes',
                    'optional'
                ],
                enumNames: [
                    'Yes',
                    'No (ad will not work in unfriendly iframe)',
                    'Partial Support (contains a fallback experience)',
                    'Sometimes (depends on serving environment/device)',
                    'Optional (depends on coniguration'
                ]
            },
            requiredMacros: {
                type: 'array',
                title: 'Required Macros',
                description: "List all macros that this creative needs to be passed from the ad server in order to function properly.",
                items: {
                    type: 'string',
                    title: 'Macro Key',
                },
                uniqueItems: true
            },
            callouts: {
                type: 'array',
                title: 'Caveats and Callouts',
                description: "Please enter any caveats or callouts that should be listed with this creative's specs.",
                items: {
                    type: 'object',
                    properties: {
                        calloutType: {
                            type: 'string',
                            title: 'Callout Type',
                            default: 'info',
                            enum: [
                                'info',
                                'success',
                                'warning',
                                'error'
                            ],
                            enumNames: [
                                'Info Callout',
                                'Success Callout',
                                'Warning Callout',
                                'Error Callout'
                            ]
                        },
                        calloutMessage: {
                            title: "Message",
                            type: "string"
                        }
                    }
                }
            }
        }
    },
    uiSchema: {
        platformSupport: {
            "ui:widget": "checkboxes"
        },
        hasDynamicData: {
            "ui:widget": "radio"
        },
        requiredMacros: {
            'ui:options': {
                addButtonLabel: 'Add Macro'
            }
        },
        callouts: {
            items: {
                calloutMessage: {
                    "ui:widget": "textarea"
                }
            },
            'ui:options': {
                addButtonLabel: 'Add Callout'
            }
        }
    }
}

module.exports = [
    general,
    exits,
    trackers,
    specs
]