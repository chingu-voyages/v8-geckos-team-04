import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

// axios for talking to the YouTube API.
import axios from 'axios'; 

import Admin from '../components/Admin';

describe('Admin component', () => {

  it('renders the admin page without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Admin />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
  
  it('calls axios and returns json', () => {
    // We are only utilizing the axios.get function, so that's all we are going to mock.
  
  
  });
  
  it('displays a list of videos', () => {
  
  
  
      
  });  


});



