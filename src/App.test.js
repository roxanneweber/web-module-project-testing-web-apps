import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders without errors', () => {
	render(<App />);
});

test('displays header text', () => {
	// Arrange: Setup our App component
	render(<App />);
	// Act: Find our header component on the screen
	const header = screen.queryByText(/Integration Testing Challenge/i);
	// i tells the test that case does not matter

	// Assert: Confirm header text exists
	expect(header).toBeTruthy();
});

// get assumes something is there or not there
// find is similar but it also returns a promise, not actually the element
// query allows more robust test checks
