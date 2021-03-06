import React, {useState} from 'react';
import * as CRUD from '../api/CRUD.js' // For CRUD operations.

export default function AddLanguage () {
  // const [languageArray, setLanguageArray] = useState([])
  const initialFormState = {uuid: '', name: ''}
  const [newLanguage, setNewLanguage] = useState(initialFormState)
  const [crudError, setCrudError] = useState()

  // Handle the user editing the form fields.
  function handleInputChange (event) {
    // Object destructuring will allow us to easily get the names and values from the form.
    const {name, value} = event.target
    setNewLanguage({...newLanguage, [name]: value })
  }
  
  // Submit the new record.
  function handleNewRecord (event) {
    event.preventDefault()
    if (newLanguage.uuid && newLanguage.name) {
      CRUD.handleCRUD('post', newLanguage.uuid, newLanguage.name)
      .then(function(res) {
          if (res.data.error) {
            let error = res.data.error
            if (error.uuid[0] === 'is invalid') {
              setCrudError('You entered an invalid UUID.')
            } else if (error.uuid[0] === 'has already been taken') {
              setCrudError('There is already a video in the system with the UUID you entered.')        
            } else {
              setCrudError('An unknown error occurred.')       
            }
          } else {
            // setLanguageArray([...languageArray, newLanguage])
            setCrudError('Successfully added!') 
          }
          //console.log(res)
      })
      .catch(err => console.log(err))
    } else {
      setCrudError('Please complete both the UUID and language name form fields.')
    }
    // Reset the form.
    setNewLanguage(initialFormState)
  }

  return (
      <form className="mt-3">
        {
          crudError
          && ((crudError === 'Successfully added!')
            ? <div className="form-row align-items-center alert alert-success" role="alert">{crudError}</div>
            : <div className="form-row align-items-center alert alert-danger" role="alert">{crudError}</div>)
        }        
        <div className="form-row align-items-center">
          <div className="col-auto">
            <div className="mb-2">Add a New Language:</div>
          </div>
          <div className="col-auto">
            <label className="sr-only" htmlFor="uuid">Name</label>
            <input type="text" className="form-control mb-2" name="uuid" id="uuid" placeholder="Video UUID" required value={newLanguage.uuid} onChange={handleInputChange}/>
          </div>
          <div className="col-auto">
            <label className="sr-only" htmlFor="name">Username</label>
            <div className="input-group mb-2">
              <input type="text" className="form-control" name="name" id="name" placeholder="Language Name" required value={newLanguage.name} onChange={handleInputChange}/>
            </div>
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-2" onClick={handleNewRecord}>Submit</button>
          </div>
        </div>
      </form>
  )
}

