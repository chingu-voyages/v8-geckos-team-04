import React from 'react';
import ReactDOM from 'react-dom';
import Admin from '../components/Admin';

it('renders the admin page without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Admin />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('can connect to the API with axios', () => {


});

it('returns JSON data from the API', () => {

});

it('displays a list of the first 50 video titles', () => {


});
