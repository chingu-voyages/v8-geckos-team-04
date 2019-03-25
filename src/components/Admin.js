import React, { useState, useEffect, useRef } from 'react';

// axios for talking to the YouTube API.
import axios from 'axios'; 

function Admin() {

    // get the YouTube API key from the .env file (environmental variables)
    const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_V3_KEY;
    const API_URL = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=UUBgWgQyEb5eTzvh4lLcuipQ&key=' + API_KEY;
    const VIDEO_URL = 'https://www.youtube.com/watch?v='

    // use the useState hook to manage the local state for the fetched data.
    // items = matching YouTube videos.
    const [videos, setVideos] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [refresh, setRefresh] = useState();
    const [loading, setLoading] = useState(true);

    let nextid = 1; // simple way to get a unique id to act as the key in the list of languages.

    // check if this is the initial load.
    const isFirstRun = useRef(true);

    // use the useEffect hook to fetch the data with axios from the YouTube API as a side effect.
    useEffect(() => {
        
        // only execute the rest of this is NOT the initial page load.
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        let new_videos = [...videos]; // don't mutate state.
        let new_languages = [...languages];  // yeah, don't mutate state.

        const fetchVideos = async (next) => {

            try {

                setLoading(true);
                
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

                    let url = '', title = '', languagefindindex = 0, languagestartindex = 0, language = '';

                    for (let i = 0; i < itemslength; i++) {

                        // add each video object to the copy of the videos array, new_videos.
                        new_videos.push(response.data.items[i]);

                        // get the url field for the video.
                        url = VIDEO_URL + response.data.items[i].snippet.resourceId.videoId;

                        // get the title field of the video.
                        title = response.data.items[i].snippet.title;

                        // extract the language from the title. 
                        // FIRST check the rest of the string after 'speaking ' is the language(s).
                        languagefindindex = title.lastIndexOf('peaking ');
                        if (languagefindindex !== -1) {
                            languagestartindex = title.lastIndexOf('peaking ') + 7;
                        } else {
                           // SECOND since speaking or Speaking is not present, check for signing or Signing:
                            // the rest of the string after 'signing ' is the language(s).
                            languagefindindex = title.lastIndexOf('igning ');
                            if (languagefindindex !== -1) {
                                languagestartindex = title.lastIndexOf('igning ') + 6; 
                            }
                        }

                        // Check if a language name still isn't present. If not, do not execute the below for this video.
                        if (languagestartindex !== -1) {

                            language = title.slice(languagestartindex);

                            // Check to see if "language" variable contains multiple languages. First delimit languages in
                            // the title sentence with '|' character.
                            let delimit_languages = language.replace(/(\s+&\s+|,\s+and\s+|\s+and\s+|,\s+)/gi,'|');

                            // now create an array of languages from splitting them between the delimiter.
                            let language_array = delimit_languages.split('|');

                            // loop through the language array and add each one to new_languages.
                            for (let i = 0; i < language_array.length; i++) {

                                if (language_array[i] !== '') {

                                    new_languages.push({
                                        id: nextid++,
                                        url,
                                        language: language_array[i]
                                    });

                                }

                            }
                            
                        }

                    }

                    //console.log(new_languages);
                    setLanguages(new_languages);
                    setVideos(new_videos);

                    if (nextPagetoken) {

                        // There are more videos to retrieve, so call fetchVideos again.
                        fetchVideos(nextPagetoken);
                    }
                    
                } 

            } catch(error) {

                console.error(error);

            } finally {

                setLoading(false);
                // setRefresh(); // check if this resets the button properly?
            }
        };

        fetchVideos();

    },[refresh]);

    // display the records.
    /* NEXT:
        GET FROM AXIOS and copy it ALL Into json file - when button clicked.
        GET FROM JSON file when page is loaded otherwise, instead of from YouTube.
        MAKE TABLE WITH FORM PER LIST.
        CHECK FRONT END AND GET RANDOM STUFF FROM JSON FILE ON DEMAND (language, matching url etc)
    */
    return(

        <div>
            <button onClick={() => setRefresh(1)}>Refresh Video List</button>
            <ul>
            {loading ? <div>Loading...</div> : languages.map(lang => (
                <div key={lang.id}><a href={lang.url} target='_blank' rel='noopener noreferrer'>{lang.id} - {lang.language}</a></div>
            ))}
            </ul>
        </div>
    );

}

export default Admin;