import React from 'react';
import Main from '../components/Main';
import { mount } from '../../enzyme';
import { MemoryRouter } from 'react-router-dom';

describe('Main', () => {
  test('it matches snapshot', () => {
    const component = mount(<MemoryRouter><Main /></MemoryRouter>);
    expect(component.render()).toMatchSnapshot();
  });
});

