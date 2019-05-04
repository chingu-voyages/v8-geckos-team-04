import axios from 'axios'; // Axios for talking to the YouTube API.
 
/**
 * Sort the languages array.
 * @param {propName} The property of the languages we want to sort by.
 * @return The sorted languages array. 
 */ 
export function sortLanguages(propName) {

    if (propName === 'language') {

        return (a, b) => a[propName].toLowerCase() === b[propName].toLowerCase() ? 0 : a[propName].toLowerCase() < b[propName].toLowerCase() ? -1 : 1;

    }

    return (a, b) => a[propName] === b[propName] ? 0 : a[propName] < b[propName] ? -1 : 1;

}



export async function Languages() {

    // The REST endpoint for getting the videos.
    const API_URL = 'https://still-taiga-98730.herokuapp.com/api/languages';
    const VIDEO_URL = 'https://www.youtube.com/embed/';

    let nextid = 1; // Simple way to get a unique id to act as the key in the list of languages.

    let new_languages = []; // Create a new array to hold the languages.

    try {
        
        // Get the videos from the endpoint.

            const response = await axios.get(API_URL);

            if (response) {

console.log('durr');

            } else {

                // no response from the endpoint.

            }

    } catch(e) {

        console.log(e.message);

    }

}

