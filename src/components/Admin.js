import React, { useState, useEffect, useRef } from 'react';
import { useGlobal } from 'reactn'; // Import from reactn to store the language array global state.
import AdminOneVideoForm from './AdminOneVideoForm';
import { getTitleStartIndex, getLanguageFromTitleStartIndex, sortLanguages } from '../api/Helpers.js'; // Admin helper functions.
import '../bootstrap.min.css'; // Styling for Admin table.
import axios from 'axios'; // Axios for talking to the YouTube API.

// import { readFiles, writeFiles } from '../api/DatabaseFileBased.js'; // not yet - uncomment after.

export default function Admin() {

    // Get the YouTube API key from the .env file (environmental variables)
    const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_V3_KEY;

    ///////////////////////////////////// SABRINA CHANGE TO 50 WHEN DONE TESTING
    const API_URL = 'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=5&playlistId=UUBgWgQyEb5eTzvh4lLcuipQ&key=' + API_KEY;
    const VIDEO_URL = 'https://www.youtube.com/watch?v=';

    // Use the useState hooks to manage the local state for the fetched data.
    const [languagetable, setLanguageTable] = useState();
    const [refresh, setRefresh] = useState();
    const [loading, setLoading] = useState(false);
    const [global, setGlobal] = useGlobal(); // Store the languages array in the ReactN global state.


    // Updates the admin table display after CRUD operations.
    const redrawAdminTable = (updated_languages) => {

        if (updated_languages) {
    
            let languagetable = updated_languages.map(lang => (
                
                <tr key={lang.id}>
                    <td>{lang.id}</td>
                    <td><a href={lang.url} target='_blank' rel='noopener noreferrer'>{lang.url}</a></td>
                    <td>{lang.language}</td>
                    <td>{lang.starttime}</td>
                    <td>{lang.endttime}</td>
                    <td><button onClick={() => handleSave(lang.id)}>Save</button></td>
                    <td><button onClick={() => deleteVideo(lang.id)}>Delete</button></td>
                </tr>
    
            ));
    
            // Update the language table layout.
            setLanguageTable(languagetable);
    
        }

        return;
    
    } 


    const deleteVideo = (id) => {
        
        setGlobal({languages: global.languages.filter(lang => lang.id !== id)}); // Remove the language record that matches.

        // Update the admin table.
        redrawAdminTable(global.languages);

    }


    const handleSave = (id) => {


        // Update the admin table.
        redrawAdminTable(global.languages);

    }


    let nextid = 1; // Simple way to get a unique id to act as the key in the list of languages.
    
    const isFirstRun = useRef(true); // Check if this is the initial load.

    // Use the useEffect hook to fetch the data with axios from the YouTube API as a side effect.
    useEffect(() => {
        
        // Only execute the rest of this is NOT the initial page load.
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }
         
        let new_languages = []; // Create a new array instead of mutating state.

        const fetchVideos = async (next) => {

            try {

                setLoading(true);
                
                // YouTube only allows 50 per API call, and we have many more than 50 videos to get, so
                // we use recursion to execute fetchVideos with the API's provided nextPageToken, until
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

                    new_languages.sort(sortLanguages); // Sort the languages.

                    // await writeFiles([{ languages: new_languages }]); //

                    setGlobal({ languages: new_languages }); // Update the global languages array.

                    if (nextPagetoken) {

                        ///////////////////////////////// ATTN SABRINA - UNCOMMENT WHEN DONE TESTING:
                        // There are more videos to retrieve, because API says nextPagetoken is not null, so call fetchVideos again.
                        //fetchVideos(nextPagetoken); // enable after testing so we don't hit youtube quota too soon.
                    }

                    // Update the admin table.
                    redrawAdminTable(new_languages);

                } 

            } catch(error) {

                console.error(error);

            } finally {

                setLoading(false); // Don't show loading indicator any more.          
            }
        };

        fetchVideos();

    },[refresh]);

    // Display the records.

    /* NEXT:
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
                            <th scope="col">Start Time</th>
                            <th scope="col">End Time</th>
                            <th scope="col">Edit</th>
                            <th scope="col">Delete</th>
                        </tr>

                        {languagetable}

                    </tbody>
                </table>

            }
        </div>
    );

}

