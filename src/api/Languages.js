import { sortLanguages } from './Helpers'; // Admin helper functions.
import axios from 'axios'; // Axios for talking to the YouTube API.
        
export default async function Languages(next) {

    // The REST endpoint for getting the videos.
    const API_URL = 'https://still-taiga-98730.herokuapp.com/api/languages';
    const VIDEO_URL = 'https://www.youtube.com/embed/';

    let nextid = 1; // Simple way to get a unique id to act as the key in the list of languages.

    let new_languages = []; // Create a new array instead of mutating state.

    try {
        
        // Get the videos from the endpoint.

            const response = await axios.get(API_URL);

            if (response) {

                // The endpoint returns a collection of search results (i.e. an array of objects, data.items).

                let itemslength = response.data.items.length; // Number of results returned this axios call.

                let url = '', language = '';
                for (let i = 0; i < itemslength; i++) {

                    url = VIDEO_URL + response.data.items[i].snippet.resourceId.videoId; // Get the url field for the video.
                    title = response.data.items[i].snippet.title; // Get the title field of the video.

                    let startindex = getTitleStartIndex(title); // Extract the language from the title.

                    // Check if a language name still isn't present. If not, do not execute the below for this video.
                    if (startindex !== -1) {

                        let language_array = getLanguageFromTitleStartIndex(startindex, title);

                        // Loop through the language array and add each one to new_languages.
                        for (let i = 0; i < language_array.length; i++) {

                            if (language_array[i] !== '') {

                                let trimmed_language = language_array[i].replace(/^\s+/g, "");

                                new_languages.push({
                                    id: nextid++,
                                    url,
                                    starttime: 10,
                                    endtime: 120,
                                    language: trimmed_language
                                });

                            }

                        }
                        
                    }

                }

                // Sort the languages.
                new_languages.sort(sortLanguages('id'));
                console.log("By id", new_languages);


                // Return the updated list of languages.
                return new_languages;

            } else {

                // no response from the endpoint.

            }

    } catch(error) {

        console.error(error);

    }

}

