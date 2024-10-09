import React from 'react';
import { act } from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  act(() => {
    render(<App />);
  });
  const dashboardElement = screen.getByText(/User Dashboard/i);
  expect(dashboardElement).toBeInTheDocument();
});
