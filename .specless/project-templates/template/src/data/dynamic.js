export const settings = {
    timeout: null,
    maxAge: null,
    serverMaxAge: null 
}

export const fallbackData = {};

export default (data, request, axios) => {
    return new Promise((resolve, reject) => {
        resolve({
            someData: 'value'
        })
    })
}