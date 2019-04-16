import React from 'react';
import { create } from 'react-test-renderer';
import Game from '../components/Game';

describe('Main', () => {
  test('it matches snapshot', () => {
    const component = create(<Game />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});

