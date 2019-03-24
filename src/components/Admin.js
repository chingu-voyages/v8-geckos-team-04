import React, { useState, useEffect } from 'react';

// axios for talking to the YouTube API.
import axios from 'axios'; 

function Admin() {

    // get the YouTube API key from the .env file (environmental variables)
    const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_V3_KEY;
    const API_URL = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=UUBgWgQyEb5eTzvh4lLcuipQ&key=' + API_KEY;
    
    // use the useState hook to manage the local state for the fetched data.
    // items = matching YouTube videos.
    const [videos, setVideos] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [refresh, setRefresh] = useState(0);

    // use the useEffect hook to fetch the data with axios from the YouTube API as a side effect.
    useEffect(() => {

        const fetchVideos = async (next) => {

            try {
                
                // YouTube only allows 50 per API call, and we have (currently) 562 videos to get, so
                // we use recursion to execute fetchVideos with the API's provided nextPageToken, until
                // it returns results that do not have nextPageToken, which means we have reached the end
                // of the list and have all the videos.
                
                let pagetoken = ''; // default start page code.

                // if the 'next' property exists in the results, it is the code for the next starting index (next page).
                if (next) {
                    // so append the pageToken (next) value onto the API_URL query.
                    pagetoken = '&pageToken=' + next; 
                }

                const response = await axios.get(API_URL + pagetoken);

                if (response) {

                    // provided by YouTube results to let us know if there are more results we can get.
                    let nextPagetoken = response.data.nextPageToken; 

                    // The YouTube API returns a collection of search results (i.e. an array of objects, data.items).

                    let itemslength = response.data.items.length; // number of results returned this axios call.

                    let title = '', languagestartindex = 0, language = '';

                    let new_videos = [...videos]; // don't mutate state.
                    let new_languages = [...languages];

                    for (let i = 0; i < itemslength; i++) {

                        // add each video object to the copy of the videos array, new_videos.
                        new_videos.push(response.data.items[i]);

                        // get the title field of the video.
                        title = response.data.items[i].snippet.title;

                        // extract the language from the title. 
                        // FIRST check the rest of the string after 'speaking ' is the language(s).
                        languagestartindex = title.lastIndexOf('peaking ') + 7;
                        
                        if (languagestartindex === -1) {
                            // SECOND since speaking or Speaking is not present, check for signing or Signing:
                            // the rest of the string after 'signing ' is the language(s).
                            languagestartindex = title.lastIndexOf('igning ') + 6;
                        }
                        
                        language = title.slice(languagestartindex);

                        new_languages.push(language);

                    }

                    setVideos(new_videos);
                    setLanguages(new_languages);
                    
                    if (nextPagetoken) {

                        // There are more videos to retrieve, so call fetchVideos again.
                        fetchVideos(nextPagetoken);
                    }
                    
                }   

            } catch(error) {

                console.error(error);
            }

        }

        fetchVideos();
        
    },[refresh]);

    // display the records.
    return(

        <div>
            <button onClick={() => setRefresh(1)}>Refresh Video List</button>
            <ul>
            {languages.map(lang => (
                <li key={lang}>{lang}</li>
            ))}
            </ul>
        </div>
    );

}

export default Admin;