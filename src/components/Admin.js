import React, { useState, useEffect } from 'react'
import * as CRUD from '../api/CRUD.js' // For CRUD operations.
import AddLanguage from './AddLanguage' // Add a new record form.
import EditLanguages from './EditLanguages' // Edit one of the records.

export default function Admin() {
    // Use the useState hooks to manage the  state of the fetched data.
    const [languageArray, setLanguageArray] = useState([])
    const [loading, setLoading] = useState(false) // Loading indicator.
    let nextid = 0
  
    const sortType = (type) => {
        languageArray.sort(CRUD.sortTable(type))
    }

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
                setLanguageArray(languages)
            })
            .catch(err => console.log(err))
        setLoading(false) // Don't show loading indicator any more.
    },[])

    // Display the records.   
    return (
        <div className="container">
            <AddLanguage />
            {loading 
                ? <div className='text-center mt-3'><img src='./images/geckopreloader.gif' width='130' alt='Loading...'/></div> 
                : <table className='table table-bordered table-striped mt-2'>
                    <tbody>
                        <tr>
                            <th scope="col" className="adminsort" onClick={sortType('id')}>#</th>
                            <th scope="col" className="adminsort" onClick={sortType('uuid')}>UUID</th>
                            <th scope="col" className="adminsort" onClick={sortType('name')}>Language</th>
                            <th scope="col" className="adminsort" onClick={sortType('url')}>URL</th>
                            <th scope="col" className="adminnosort">Edit</th>
                            <th scope="col" className="adminnosort">Delete</th>
                        </tr>
                        {
                            languageArray.map(lang => (
                                <EditLanguages key={lang.uuid} nextid={++nextid} language={lang} />
                            ))                            
                        }
                    </tbody>
                </table>
            }
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous">
            </link>
        </div>
    )
}

