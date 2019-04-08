import React from 'react';
import { create } from 'react-test-renderer';
import Main from '../components/Main';

describe('Main', () => {
  test('it matches snapshot', () => {
    const component = create(<Main />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});

