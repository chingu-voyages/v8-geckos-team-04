import React from 'react';
import { create } from 'react-test-renderer';
import {render, fireEvent, cleanup} from 'react-testing-library';
import Game from '../components/Game';

describe('Game', () => {
  afterEach(cleanup);

  test('it matches snapshot', () => {
    const component = create(<Game />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test("Redirect to /game page when 'New Game' button is clicked", () => {
    const {getByText} = render(<Game />);
    global.window = Object.create(window);
    Object.defineProperty(window, "location", {
        value: {
           href: '/'
        },
        writable: true
    });
    expect(window.location.href).toBe('/');
    fireEvent.click(getByText('New Game'));
    expect(window.location.href).toBe('/game');
  });
});

