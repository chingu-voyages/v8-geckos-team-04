import React, { useState, useEffect } from 'react';
import Languages from '../api/Languages.js'; // Make the languages array.
import { sortLanguages } from '../api/Helpers.js'; // Admin helper functions.

export default function Admin() {

    // Use the useState hooks to manage the  state of the fetched data.
    const [languagetable, setLanguageTable] = useState();
    const [loading, setLoading] = useState(false); // Loading indicator.

    // The localStorage key for the languages array.
    const localStorageKey = 'stored_languages';

    // Updates the admin table display after CRUD operations.
    const redrawAdminTable = (updated_languages) => {

        if (updated_languages) {
    
            let languagetable = updated_languages.map(lang => (
                
                <tr key={lang.id}>
                    <td>{lang.id}</td>
                    <td>{lang.language}</td>
                    <td><a href={lang.url} target='_blank' rel='noopener noreferrer'>{lang.url}</a></td>
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

        // Return the list of languages from the localStore.
        const new_languages = JSON.parse(localStorage.getItem(localStorageKey));
        
        new_languages.sort(sortLanguages(sortby));

        // Update the languages array in localStorage to reflect the deletion.
        localStorage.setItem(localStorageKey, JSON.stringify(new_languages));

        // Update the admin table.
        redrawAdminTable(new_languages);

    }

    const deleteVideo = (id) => {
        
        // Get the current languages array from the browser's localStorage.
        const local_languages = JSON.parse(localStorage.getItem(localStorageKey));

        // Create a new array without the deleted language.
        const updated_languages = local_languages.filter(lang => lang.id !== id);

        // Update the languages array in localStorage to reflect the deletion.
        localStorage.setItem(localStorageKey, JSON.stringify(updated_languages));

        // Update the admin table.
        redrawAdminTable(updated_languages);

    }


    const handleSave = (id) => {

        // Get the current languages array from the browser's localStorage.
        const local_languages = JSON.parse(localStorage.getItem(localStorageKey));

        // Create a new array that reflects the edits made to a language.
        const updated_languages = local_languages.filter(lang => lang.id !== id);

        // Update the languages array in localStorage to reflect the changes to a language.
        localStorage.setItem(localStorageKey, JSON.stringify(updated_languages));

        // Update the admin table.
        redrawAdminTable(updated_languages);

    }

    // Use the useEffect hook to build the admin table from the languages data.
    useEffect(() => {

        setLoading(true); // Show loading indicator.

        // Get the languages data from the browser's localStorage.
        const localLanguages = JSON.parse(localStorage.getItem(localStorageKey));

        // Update the admin table.
        redrawAdminTable(localLanguages);

        setLoading(false); // Don't show loading indicator any more.

    },[]);

    // Display the records.   
    return (

        <div className="container">

            {loading ? <div>Loading...</div> : 

                <table className='table table-bordered table-striped'>
                    <tbody>
                        <tr>
                            <th scope="col" className="adminsort" onClick={sortTable.bind(sortTable, 'id')}>ID</th>
                            <th scope="col" className="adminsort" onClick={sortTable.bind(sortTable, 'language')}>Language</th>
                            <th scope="col" className="adminsort" onClick={sortTable.bind(sortTable, 'url')}>URL</th>
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

    )

}

