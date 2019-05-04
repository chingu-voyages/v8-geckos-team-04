import axios from 'axios'; // talk to the backend endpoints.

// The base REST url for getting the videos.
const API_URL = 'https://still-taiga-98730.herokuapp.com/api/languages';
// The base URL for YouTube videos.
const VIDEO_URL = 'https://www.youtube.com/embed/';

/**
 * Connect to endpoint and return the response for processing.
 * @httpMethod The axios http request method that maps to a CRUD operation at the backend.
 * @return The response from the axios request.
 */
export function doRemote(httpMethod) {
    switch (httpMethod) {
        case 'get':
            // get all the videos
            break;
        case 'post':
            // add a new video
            break;
        case 'delete':
            // delete a video
            break;
        case 'patch':
            // update a video
        default:
            // problem.
    }


}

/**
 * Sort the languages.
 * @param {propName} The property of the languages we want to sort by.
 * @return The sorted languages array. 
 */ 
export function sortLanguages(propName) {
    if (propName === 'language') {
        return (a, b) => a[propName].toLowerCase() === b[propName].toLowerCase() ? 0 : a[propName].toLowerCase() < b[propName].toLowerCase() ? -1 : 1;
    }
    return (a, b) => a[propName] === b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1;
}

/**
 * Get the list of all languages.
 * @return The array of languages.
 */ 
export function getAllLanguages() {

}

/**
 * Create a new language. Will return an error if the ID already exists.
 * @return JSON from a successful create operation.
 */ 
export function addLanguage() {


}

/**
 * Delete a language.
 * @return JSON from a successful delete operation.
 * @param {id} The uuid of the language to delete.
 */ 
export function deleteLanguage(uuid) {


}

/**
 * Delete a language. Will return an error if the ID already exists.
 * @return JSON from a successful update operation.
 * @param {id} The uuid of the language to save.
 */ 
export function updateLanguage(uuid) {


}



