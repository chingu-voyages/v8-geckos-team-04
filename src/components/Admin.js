import React, { useState, useEffect, useRef } from 'react';
import { useGlobal } from 'reactn'; // Import from reactn to store the language array global state.
import AdminOneVideoForm from './AdminOneVideoForm';
import { sortLanguages } from '../api/Helpers.js'; // Admin helper functions.

// import { readFiles, writeFiles } from '../api/DatabaseFileBased.js'; // not yet - uncomment after.

export default function Admin() {

    // Use the useState hooks to manage the  state of the fetched data.
    const [languagetable, setLanguageTable] = useState();
    const [refresh, setRefresh] = useState();
    const [loading, setLoading] = useState(false); // Loading indicator.
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

    const sortTable = (sortby) => {

        sortLanguages(sortby);

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


    // let nextid = 1; // Simple way to get a unique id to act as the key in the list of languages.
    
    const isFirstRun = useRef(true); // Check if this is the initial load.

    // Use the useEffect hook to fetch the data with axios from the YouTube API as a side effect.
    useEffect(() => {
    
        // Only execute the rest of this is NOT the initial page load.
        if (isFirstRun.current) {
            isFirstRun.current = false;
            return;
        }

        setLoading(true); // Show loading indicator.

        // Update the admin table.
        redrawAdminTable(global.languages);

        setLoading(false); // Don't show loading indicator any more.

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
                            <th scope="col" onClick={sortTable('language')}>Language</th>
                            <th scope="col" onClick={sortTable('url')}>URL</th>
                            <th scope="col" onClick={sortTable('starttime')}>Start Time</th>
                            <th scope="col" onClick={sortTable('endtime')}>End Time</th>
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

