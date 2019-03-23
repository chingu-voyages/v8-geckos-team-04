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
    // const [nextpage, setNextPage] = useState('');

    // use the useEffect hook to fetch the data with axios from the YouTube API.
    useEffect(() => {

        // ASYNC/AWAIT notes:
        // define an async function inside the useEffect because async returns an
        // AsyncFunction object, but useEffect should return either nothing at all,
        // or a clean-up function. Since the function depends on the server to response,
        // it must be asynchronous.
        // The async keyword will automatically create a new Promise and return it.

        const fetchVideos = async (next) => {

            try {

                // Await - pauses the execution of async functions, so we are awaiting
                // the response to come from the server here, before moving on to the next
                // commands in the fetchVideos function. With await, we do not have to write
                // a .then() block. We are still using promises under the hood here.
                
                // YouTube only allows 50 per API call, and we have (currently) 562 videos to get, so
                // we use recursion to execute fetchVideos with the API's provided nextPageToken, until
                // it returns results that do not have nextPageToken, which means we have reached the end
                // of the list and have all the videos.
                
                let pagetoken = ''; // default start index for this iteration.

                // if the 'next' property exists in the results, it is the code for the next starting index (next page).
                if (next) {
                    pagetoken = '&pageToken=' + next; // append the pageToken (next) value onto the API_URL query.
                }

                const response = await axios.get(API_URL + pagetoken);

                if (response) {

                    let nextPagetoken = response.data.nextPageToken;

                    // The YouTube API returns a collection of search results (i.e. an array of objects, data.items)

                    let itemslength = response.data.items.length;

                    let title = '', languagestartindex = 0, language = '';

                    for (let i = 0; i < itemslength; i++) {

                        setVideos(videos.push(response.data.items[i])); // add each video object to the videos array. (update state?!?!)

                        title = response.data.items[i].snippet.title;

                        // extract the language from the title:
                        languagestartindex = title.lastIndexOf('peaking ') + 7; // string after 'speaking ' is the language(s).
                        if (languagestartindex === -1) {
                            // speaking or Speaking is not present, so check for signing or Signinng:
                            languagestartindex = title.lastIndexOf('igning ') + 6; // string after 'signing ' is the language(s).
                        }
                        
                        language = title.slice(languagestartindex);

                        console.log(language); // titles. I need to get the language from here.



                    }
                    
                    if (nextPagetoken) {

                        fetchVideos(nextPagetoken);
                    }
                    
                }   

            } catch(error) {

                console.error(error);
            }

            // console.log(videos);
            // return videos;

        };

        fetchVideos();

     // the second argument is an empty array (below) so we only fetch the data
     // when the component mounts, not every time it is updated!
    }, []);

    // display the records.
    return(

        <ul>
{ videos }
        </ul>
    );

}

export default Admin;