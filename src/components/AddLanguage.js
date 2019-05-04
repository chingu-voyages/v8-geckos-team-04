import React, {useState} from 'react';

export default function AddLanguage () {
  const initialFormState = {uuid: '', name: ''}
  const [newLanguage, setNewLanguage] = useState(initialFormState)

  // Handle the user editing the form fields.
  function handleInputChange (event) {
    // Object destructuring will allow us to easily get the names and values from the form.
    const {name, value} = event.target
    setNewLanguage({...newLanguage, [name]: value })
  }
  
  // Submit the new record.
  function handleNewRecord (event) {
    event.preventDefault()
    setNewLanguage(initialFormState)
  }

  return (
      <form className="mt-3">
        <div className="form-row align-items-center">
          <div className="col-auto">
            <div className="mb-2">Add a New Language:</div>
          </div>
          <div className="col-auto">
            <label className="sr-only" htmlFor="uuid">Name</label>
            <input type="text" className="form-control mb-2" name="uuid" id="uuid" placeholder="Video UUID" value={newLanguage.uuid} onChange={handleInputChange}/>
          </div>
          <div className="col-auto">
            <label className="sr-only" htmlFor="name">Username</label>
            <div className="input-group mb-2">
              <input type="text" className="form-control" name="name" id="name" placeholder="Language Name" value={newLanguage.name} onChange={handleInputChange}/>
            </div>
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-2" onClick={handleNewRecord}>Submit</button>
          </div>
        </div>
      </form>
  )
}

