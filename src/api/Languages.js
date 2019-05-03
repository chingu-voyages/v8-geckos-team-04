import { sortLanguages } from './Helpers'; // Admin helper functions.
import axios from 'axios'; // Axios for talking to the YouTube API.
        
export default async function Languages(next) {

    // The REST endpoint for getting the videos.
    const API_URL = 'https://still-taiga-98730.herokuapp.com/api/languages';
    const VIDEO_URL = 'https://www.youtube.com/embed/';

    let nextid = 1; // Simple way to get a unique id to act as the key in the list of languages.

    let new_languages = []; // Create a new array to hold the languages.

    try {
        
        // Get the videos from the endpoint.

            const response = await axios.get(API_URL);

            if (response) {

                // The endpoint returns a collection of search results (i.e. an array of objects, data.items).

                let videoslength = response.languages.length; // Number of results returned this axios call.

                let nextid = 1; // Simple way to get a unique id to act as the key in the list of languages.

                let uuid = null, url = '', language = '';

                for (let i = 0; i < videoslength; i++) {

                    uuid = response.language.uuid; // Get the youtube uuid for the video.
                    url = VIDEO_URL + uuid; // Build the video url given its uuid.
                    language = response.language.name; // Get the language name of the video.

                    // Add the language to the new_languages array.
                    if (!empty(language) && !empty(uuid)) {

                        new_languages.push({
                            id: nextid++,
                            url,
                            language
                        });

                    }

                }

                // Sort the languages.
                new_languages.sort(sortLanguages('id'));
                //console.log("By id", new_languages);

                // Return the updated list of languages.
                return new_languages;

            } else {

                // no response from the endpoint.

            }

    } catch(e) {

        console.log(e.message);

    }

}

