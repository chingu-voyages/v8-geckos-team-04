import React, { useState, useEffect } from 'react'
import * as CRUD from '../api/CRUD.js' // Make the languages array.
import {VIDEO_URL} from '../api/CRUD.js'

export default function Admin() {
    // Use the useState hooks to manage the  state of the fetched data.
    const [languagetable, setLanguageTable] = useState();
    const [loading, setLoading] = useState(false); // Loading indicator.

    // Updates the admin table display after CRUD operations.
    const drawAdminTable = (updated_languages) => {
        let nextid = 0;
        if (updated_languages) {
            let languagetable = updated_languages.map(lang => (
                <tr key={++nextid}>
                    <td>{nextid}</td>
                    <td>{lang.uuid}</td>
                    <td>{lang.name}</td>
                    <td><a href={VIDEO_URL + lang.uuid} target='_blank' rel='noopener noreferrer'>{VIDEO_URL + lang.uuid}</a></td>
                    <td><button onClick={() => CRUD.handleCRUD('patch', lang.uuid, lang.name)}>Save</button></td>
                    <td><button onClick={() => CRUD.handleCRUD('delete', lang.uuid)}>Delete</button></td>
                </tr>
            ));
            // Update the language table layout.
            setLanguageTable(languagetable);
        }
        return;
    } 

    // const handleEdits = (uuid) => {


    // }

    // Use the useEffect hook to build the admin table from the languages data.
    useEffect(() => {
        setLoading(true) // Show loading indicator.
        // Get the languages from the endpoint.
        CRUD.handleCRUD('get')
            .then(function(res) {
                let languages = res.data.languages
                // Sort languages.
                languages.sort(CRUD.sortTable('name'))
                // Create the admin table.
                drawAdminTable(res.data.languages)
            })
            .catch(err => console.log(err))
        setLoading(false) // Don't show loading indicator any more.
    },[]);

    // Display the records.   
    return (
        <div className="container">
            {loading 
                ? <div className='text-center'><img src='./images/geckopreloader.gif' width='130' alt='Loading...'/></div> 
                : <table className='table table-bordered table-striped'>
                    <tbody>
                        <tr>
                            <th scope="col" className="adminsort" onClick={CRUD.sortTable('id')}>#</th>
                            <th scope="col" className="adminsort" onClick={CRUD.sortTable('uuid')}>UUID</th>
                            <th scope="col" className="adminsort" onClick={CRUD.sortTable('name')}>Language</th>
                            <th scope="col" className="adminsort" onClick={CRUD.sortTable('url')}>URL</th>
                            <th scope="col" className="adminnosort">Edit</th>
                            <th scope="col" className="adminnosort">Delete</th>
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

