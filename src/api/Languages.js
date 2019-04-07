import { getTitleStartIndex, getLanguageFromTitleStartIndex, sortLanguages } from './Helpers'; // Admin helper functions.
import axios from 'axios'; // Axios for talking to the YouTube API.
        
export default async function Languages(next) {

    // Get the YouTube API key from the .env file (environmental variables).
    // NOT PRIVATE (JavaScript is client-side so don't store anything super sensitive in .env!)
    const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_V3_KEY;
    const API_URL = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=UUBgWgQyEb5eTzvh4lLcuipQ&key=' + API_KEY;
    const VIDEO_URL = 'https://www.youtube.com/embed/';

    let nextid = 1; // Simple way to get a unique id to act as the key in the list of languages.

    let new_languages = []; // Create a new array instead of mutating state.

    try {
        
        // Try to get the languages array from the client browser's localStorage first. If it is not there,
        // then fetch the languages from YouTube.

        // 1) Check if the stored_languages key exists in the browser's local storage. If not, add it from YouTube.
        const localStorageKey = 'stored_languages';
        
        if (!localStorage.getItem(localStorageKey)) {

            // First remove key in case it exists but is falsey.
            localStorage.removeItem(localStorageKey);

            // Return the list of languages by getting it from YouTube's API.

            // YouTube only allows 50 per API call, and we have many more than 50 videos to get, so
            // we use recursion to execute Languages with the API's provided nextPageToken, until
            // it returns results that do not have nextPageToken, which means we have reached the end
            // of the list and have all the videos.
            
            let pagetoken = ''; // Default first page token code.

            // if the 'next' property exists in the results, it is the code for the next starting index (next page).
            if (next) {
                
                pagetoken = '&pageToken=' + next; // So append the pageToken (next) value onto the API_URL query.
            }

            const response = await axios.get(API_URL + pagetoken);

            if (response) {

                // Token (next page) provided by YouTube results to let us know if there are more results we can get.
                let nextPagetoken = response.data.nextPageToken; 

                // The YouTube API returns a collection of search results (i.e. an array of objects, data.items).

                let itemslength = response.data.items.length; // Number of results returned this axios call.

                let url = '', title = '';
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

                                new_languages.push({
                                    id: nextid++,
                                    url,
                                    starttime: 10,
                                    endtime: 120,
                                    language: language_array[i]
                                });

                            }

                        }
                        
                    }

                }

                // Sort the languages.
                new_languages.sort(sortLanguages('id'));
                // console.log("By id", new_languages);

                // Save the languages array to the browser's localStorage.localStorageKey
                localStorage.setItem('stored_languages', JSON.stringify(new_languages));
                
                if (nextPagetoken) {

                    ///////////////////////////////// ATTN SABRINA - UNCOMMENT WHEN DONE TESTING:
                    // There are more videos to retrieve, because API says nextPagetoken is not null, so call Languages again.
                    //Languages(nextPagetoken); // enable after testing so we don't hit youtube quota too soon.
                }

                // Return the updated list of languages.
                return new_languages;

            } 

        } else {

            // Return the list of languages from the localStore.
            new_languages = JSON.parse(localStorage.getItem(localStorageKey));
            
            new_languages.sort(sortLanguages('id'));

            console.log("By id", new_languages);

            return new_languages;

        }

    } catch(error) {

        console.error(error);

    }

}

