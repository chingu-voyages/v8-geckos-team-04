import axios from 'axios' // Talk to the backend endpoints.

// The base REST url for getting the videos.
const API_URL = 'https://still-taiga-98730.herokuapp.com/api/languages'
// The base URL for YouTube videos.
export const VIDEO_URL = 'https://www.youtube.com/embed/'

/**
 * Connect to endpoint and return the response for processing.
 * @httpMethod The axios http request method that maps to a CRUD operation at the backend.
 * @return The response from the axios request.
 */
export async function handleCRUD (httpMethod = '', uuid = '', name = '') {
    let url = ''
    let data = ''
    let response = ''
    const langobj = {uuid, name}
    switch (httpMethod) {
        case 'get':
            // get all the videos
            url = API_URL
            break
        case 'post':
            // add a new video
            url = API_URL
            data = langobj
            break
        case 'delete':
            // delete a video
            url = API_URL + ':' + uuid
            break
        case 'patch':
            // update a video
            url = API_URL + ':' + uuid
            data = langobj
            break
        default:
            httpMethod = ''
    }
    if (httpMethod) {
       try {
            response = await axios({
                method: httpMethod,
                url,
                data
              })
       } catch (err) {
            response = err
       }
    } else {
        response = 'Invalid http method'
    }
    return response
}

/**
 * Sort the languages.
 * @param {propName} The property of the languages we want to sort by.
 * @return The sorted languages array. 
 */ 
export function sortLanguages (propName) {
    if (propName === 'language') {
        return (a, b) => a[propName].toLowerCase() === b[propName].toLowerCase() ? 0 : a[propName].toLowerCase() < b[propName].toLowerCase() ? -1 : 1
    }
    return (a, b) => a[propName] === b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1
}

