import React from 'react';
import ReactDOM from 'react-dom';
import { mount } from '../../enzyme';
import { MemoryRouter } from 'react-router';
import Main from '../components/Main';
import Game from '../components/Game';
import App from '../components/App';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

test("path '/' should redirect to Main page", () => {
  const wrapper = mount(
    <MemoryRouter initialEntries={[ '/' ]}>
      <App/>
    </MemoryRouter>
  );
  expect(wrapper.find(Main)).toHaveLength(1);
  expect(wrapper.find(Game)).toHaveLength(0);
});
