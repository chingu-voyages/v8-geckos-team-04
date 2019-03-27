import React, { useState, useEffect, useRef } from 'react';
import AdminOneVideoForm from './AdminOneVideoForm';

// Admin helper functions.
import { getTitleStartIndex } from '../api/Helpers.js';

// axios for talking to the YouTube API.
import axios from 'axios'; 

// import { readFiles, writeFiles } from '../api/DatabaseFileBased.js'; // not yet - uncomment after.

export default function Admin() {

    // get the YouTube API key from the .env file (environmental variables)
    const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_V3_KEY;
    const API_URL = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=UUBgWgQyEb5eTzvh4lLcuipQ&key=' + API_KEY;
    const VIDEO_URL = 'https://www.youtube.com/watch?v=';

    // use the useState hook to manage the local state for the fetched data.
    // items = matching YouTube videos.
    const [videos, setVideos] = useState([]);
    const [languages, setLanguages] = useState([]);
    const [languagetable, setLanguageTable] = useState();
    const [refresh, setRefresh] = useState();
    const [loading, setLoading] = useState(false);

    const deleteVideo = (id) => {
        
        console.log(id);
        // remove the language record that matches.
        setLanguages(languages.filter(lang => lang.id !== id));

    }

    const handleSave = (id) => {

        console.log(id);
        
    }

    const extractLanguage = () => {


    }

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

                    let url = '', title = '', language = '';

                    for (let i = 0; i < itemslength; i++) {

                        // add each video object to the copy of the videos array, new_videos.
                        new_videos.push(response.data.items[i]);

                        // get the url field for the video.
                        url = VIDEO_URL + response.data.items[i].snippet.resourceId.videoId;

                        // get the title field of the video.
                        title = response.data.items[i].snippet.title;

                        // extract the language from the title. 
                        let startindex = getTitleStartIndex(title);

                        // Check if a language name still isn't present. If not, do not execute the below for this video.
                        if (startindex !== -1) {

                            language = title.slice(startindex);
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

                    // sort the languages.
                    new_languages.sort(sortLanguages);

                    //await writeFiles([{ languages: new_languages }, { videos: new_videos }]); //

                    setLanguages(new_languages);
                    setVideos(new_videos);

                    if (nextPagetoken) {

                        //////////////////////////////////////////////////////////////////////////// ATTN ME
                        // There are more videos to retrieve, so call fetchVideos again.
                        //fetchVideos(nextPagetoken); // enable after testing so we don't hit youtube quota too soon.
                    }

                    // draw the language table.
                    if (new_languages) {

                        let languagetable = new_languages.map(lang => (
                            
                            <tr key={lang.id}>
                                <td>{lang.id}</td>
                                <td><a href={lang.url} target='_blank' rel='noopener noreferrer'>{lang.url}</a></td>
                                <td>{lang.language}</td>
                                <td><button onClick={() => handleSave(lang.id)}>Save</button></td>
                                <td><button onClick={() => deleteVideo(lang.id)}>Delete</button></td>
                            </tr>

                        ));

                        // update the language table layout.
                        setLanguageTable(languagetable);
                    }

                } 

            } catch(error) {

                console.error(error);

            } finally {

                setLoading(false); // don't show loading indicator any more.          
            }
        };

        function sortLanguages(a, b) {

            // const languageA = a.language.toUpperCase();
            // const languageB = b.language.toUpperCase();
            const languageA = a.id;
            const languageB = b.id;

            let comparison = 0;

            if (languageA > languageB) {

                comparison = 1;

            } else if (languageA < languageB) {

                comparison = -1

            }

            return comparison;
        }

        fetchVideos();

    },[refresh]);

    // display the records.

    /* NEXT:
        GET FROM AXIOS and make JSON file. ---done
        GET FROM JSON file automatically when page is loaded (only from YouTube when button clicked!)
        MAKE TABLE WITH FORM PER VIDEO.
        CHECK FRONT END AND GET RANDOM STUFF FROM JSON FILE ON DEMAND (language, matching url etc)
    */
   
    return(

        <div className="container">
            <div><button onClick={() => setRefresh(1)}>Refresh Video List</button></div>
            {loading ? <div>Loading...</div> : 

                <table className='table table-bordered table-striped'>
                    <tbody>
                        <tr>
                            <th scope="col">ID</th>
                            <th scope="col">Language</th>
                            <th scope="col">URL</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>

                        {languagetable}

                    </tbody>
                </table>

            }
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous">
            </link>
        </div>
    );

}

