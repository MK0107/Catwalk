// __tests__/fetch.test.js
import React from 'react';
import App from '../components/App';


import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';


jest.mock('react', () => {
  const react = jest.requireActual('react');

  return {
    ...react,
    useRef: () => null
  };
});

jest.mock('react-router-dom', () => ({
  useRouteMatch: jest.fn().mockReturnValue({
    params: { product: 18078 }
  }),
  useHistory: () => ({
    push: jest.fn()
  })
}));

jest.mock('../utils', () => {
  const product = require('../mocks/product.json');
  const utils = jest.requireActual('../utils');

  return {
    __esModule: true,
    ...utils,
    getFavorites: () => [18078],
    getFullProduct: () => ({ then: (setter) => setter(product) }),
    getProductStub: () => ({ then: (setter) => setter(product) }),
    getRandomInteger: () => 1,
    getRefetch: () => { },
    namedExport: jest.fn()
  };
});


test('loads and indicates as such, then displays proper header', async () => {
  let component;

  await act(async () => {
    component = render(<App />);
    expect(component.getByText('Loading')).toBeInTheDocument();
  });

  const [header] = component.getAllByTestId('header');
  expect(header.textContent).toBe("MEOWWALK");
});

test('shows two reviews initially', async () => {
  let component;

  await act(async () => {
    component = render(<App />);
  });

  const reviews = component.getAllByTestId('tile');

  expect(reviews).toHaveLength(2);
});

test('shows four reviews after clicking the button', async () => {
  let component, button;

  await act(async () => {
    component = render(<App />);
  });

  await act(async () => {
    button = component.getByText('More Reviews');
    await fireEvent.click(button);
  });

  const reviews = component.getAllByTestId('tile');
  expect(reviews).toHaveLength(4);
});
