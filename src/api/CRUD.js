import React from 'react'; // So we can export the constants too.
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
    let params = ''
    let response = ''
    const langobj = {uuid, name}
    switch (httpMethod) {
        case 'get':
            // get all the videos
            params = API_URL
            break
        case 'post':
            // add a new video
            params = API_URL + ', ' + langobj
            break
        case 'delete':
            // delete a video
            params = API_URL + ':' + uuid
            break
        case 'patch':
            // update a video
            params = API_URL + ':' + uuid + ', ' + langobj
        default:
            params = ''
    }
    if (params) {
       try {
            response = await axios.httpMethod(params)
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

// /**
//  * Get the list of all languages.
//  * @return The array of languages.
//  */ 
// export function getAllLanguages () {
//     const response = handleCRUD ('get')
//     console.log(response)
// }

// /**
//  * Create a new language. Will return an error if the ID already exists.
//  * @return JSON from a successful create operation.
//  */ 
// export function addLanguage (uuid, name) {
//     const response = handleCRUD ('patch', uuid, name)
//     console.log(response)
// }

// /**
//  * Delete a language.
//  * @return JSON from a successful delete operation.
//  * @param {id} The uuid of the language to delete.
//  */ 
// export function deleteLanguage (uuid) {
//     const response = handleCRUD ('delete', uuid)
//     console.log(response)
// }

// /**
//  * Delete a language. Will return an error if the ID already exists.
//  * @return JSON from a successful update operation.
//  * @param {id} The uuid of the language to save.
//  */ 
// export function updateLanguage (uuid, name) {
//     const response = handleCRUD ('patch', uuid, name)
//     console.log(response)
// }



