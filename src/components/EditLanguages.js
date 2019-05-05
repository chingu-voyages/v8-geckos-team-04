import React, {useState} from 'react';
import * as CRUD from '../api/CRUD.js' // For CRUD operations.
import {VIDEO_URL} from '../api/CRUD.js' // For base video url.

export default function EditLanguages (props) {

  const initialFormState = {uuid: props.language.uuid, name: props.language.name}
  const [newLanguage, setNewLanguage] = useState(initialFormState)
  
  // Handle the user editing the form fields.
  function handleInputChange (event) {
    // Object destructuring will allow us to easily get the names and values from the form.
    const {name, value} = event.target
    setNewLanguage({...newLanguage, [name]: value })
  }

  return (
    <tr>
      <td>{props.nextid}</td>
      <td>{newLanguage.uuid}</td>
      <td>
          <input type="text" className="form-control" name="name" id={props.nextid} placeholder="Language Name" required value={newLanguage.name} onChange={handleInputChange}/>
      </td>
      <td><a href={VIDEO_URL + props.language.uuid} target='_blank' rel='noopener noreferrer'>{VIDEO_URL + props.language.uuid}</a></td>
      <td><button onClick={() => CRUD.handleCRUD('patch', newLanguage.uuid, newLanguage.name)}>Save</button></td>
      <td><button onClick={() => CRUD.handleCRUD('delete', newLanguage.uuid, newLanguage.name)}>Delete</button></td>
    </tr>
  )

}