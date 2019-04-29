import React from 'react';
import {render, fireEvent, cleanup} from 'react-testing-library';
import Score from '../components/Score';
import { MemoryRouter } from 'react-router-dom';

describe('Score', () => {
  afterEach(cleanup);

  test("Redirect to /game page when 'New Game' button is clicked", () => {
    const {getByText} = render(<MemoryRouter><Score /></MemoryRouter>);
    global.window = Object.create(window);
    Object.defineProperty(window, "location", {
      value: {
         href: '/score'
      },
      writable: true
    });
    expect(window.location.href).toBe('/score');
    fireEvent.click(getByText('New Game'));
    expect(window.location.href).toBe('/game');
  });

  test("Redirect to /history page when 'View History' button is clicked", () => {
    const {getByText} = render(<MemoryRouter><Score /></MemoryRouter>);
    global.window = Object.create(window);
    Object.defineProperty(window, "location", {
      value: {
         href: '/score'
      },
      writable: true
    });
    expect(window.location.href).toBe('/score');
    fireEvent.click(getByText('View History'));
    expect(window.location.href).toBe('/history');
  });

});