import React, { useState, useEffect } from 'react';
import Languages from '../api/Languages.js'; // Make the languages array.

export default function Admin() {

    // Use the useState hooks to manage the  state of the fetched data.
    const [languagetable, setLanguageTable] = useState();
    const [loading, setLoading] = useState(false); // Loading indicator.

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



    }

    const deleteVideo = (id) => {
        


    }


    const handleSave = (id) => {


    }

    // Use the useEffect hook to build the admin table from the languages data.
    useEffect(() => {

        setLoading(true); // Show loading indicator.

        // Get the languages from the endpoint.
        const Languages = Languages();

        // Update the admin table.
        redrawAdminTable(Languages);

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

