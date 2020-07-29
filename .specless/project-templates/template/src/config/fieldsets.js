export const fieldsets = [
    {
        key: 'general',
        title: 'General Settings',
        schema: {
            type: 'object',
            properties: {
                headline: {
                    type: 'string',
                    title: 'Headline Text',
                    description: 'Please enter a headline for your ad.',
                    help: 'Headline should be less than 100 characters.',
                    maxLength: 100
                },
                logo: {
                    type: 'string',
                    title: 'Logo File',
                    'ui:widget': 'image',
                    'ui:options': {
                        maxWidth: 100,
                        maxHeight: 100
                    }
                }
            }
        }
    }
]