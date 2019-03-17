import React, { useState, useEffect } from 'react';

// axios for talking to the YouTube API.
import axios from 'axios'; 

function Admin() {

    // get the YouTube API key from the .env file (environmental variables)
    const API_KEY = process.env.REACT_APP_YOUTUBE_DATA_API_V3_KEY;
    
    // use the useState hook to manage the local state for the fetched data.
    // items = matching YouTube videos.
    const [videos, setVideos] = useState({ items: []});

    // use the useEffect hook to fetch the data with axios from the YouTube API.
    useEffect(() => {

        // define an async function inside the useEffect because async returns an
        // AsyncFunction object, but useEffect should return either nothing at all,
        // or a clean-up function.
        const fetchVideos = async () => {

            const result = await axios(
                'https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=50&playlistId=UUBgWgQyEb5eTzvh4lLcuipQ&key=' + API_KEY
            );

            console.log(result.data.items);

            setVideos(result.data.items);
        };

        fetchVideos();

     // the second argument is an empty array (below) so we only fetch the data
     // when the component mounts, not every time it is updated!
    }, []);

    // display the records.
    return(

        <ul>



        </ul>
    );

}

export default Admin;