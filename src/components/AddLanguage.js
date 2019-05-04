import React from 'react';

export default function AddLanguage () {
  return (
      <form className="mt-3">
        <div className="form-row align-items-center">
          <div className="col-auto">
            <div className="mb-2">Add a New Language:</div>
          </div>
          <div className="col-auto">
            <label className="sr-only" htmlFor="inlineFormInput">Name</label>
            <input type="text" className="form-control mb-2" id="inlineFormInput" placeholder="Video UUID"/>
          </div>
          <div className="col-auto">
            <label className="sr-only" htmlFor="inlineFormInputGroup">Username</label>
            <div className="input-group mb-2">
              <input type="text" className="form-control" id="inlineFormInputGroup" placeholder="Language Name"/>
            </div>
          </div>
          <div className="col-auto">
            <button type="submit" className="btn btn-primary mb-2" onClick={handleNewRecord}>Submit</button>
          </div>
        </div>
      </form>
  )
}

export function handleNewRecord () {
  console.log('testtet')
}