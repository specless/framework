const parseItem = (item, existingSchema) => {
    const uiSchema = existingSchema || {};
    Object.keys(item).forEach(key => {
        if (key.startsWith('ui:')) {
            uiSchema[key] = item[key];
        }
    })
    if (item.type === 'object') {
        Object.keys(item.properties).forEach(key => {
            uiSchema[key] = parseItem(item.properties[key], uiSchema[key]);
        })
    } else if (item.type === 'array') {
        if (Array.isArray(item.items)) {
            uiSchema.items = [];
            item.items.forEach(thing => {
                uiSchema.items.push(parseItem(thing));
            })
        } else if (typeof item.items ==='object') {
            uiSchema.items = parseItem(item.items, uiSchema.items);
        }
    }
    return uiSchema;
}

export const parseFieldsets = (fieldsets) => {
    fieldsets.forEach(set => {
        const uiSchema = set.uiSchema || {};
        if (set.schema) {
            set.uiSchema = parseItem(set.schema, uiSchema);
        }
    })
    return fieldsets
}