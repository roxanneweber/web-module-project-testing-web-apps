import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ContactForm from './ContactForm';

// https://testing-library.com/docs/react-testing-library/cheatsheet

test('renders without errors', () => {
	render(<ContactForm />);
});

test('renders the contact form header', () => {
	//Arrange
	render(<ContactForm />);

	//Act
	const header = screen.queryByText(/contact form/i);
	//Assert
	expect(header).toBeTruthy();
});

test('renders ONE error message if user enters less then 5 characters into firstname.', async () => {
	render(<ContactForm />);
	// 1. find field
	const firstNameField = screen.getByPlaceholderText('Burke');
	// 2. enter text
	userEvent.type(firstNameField, 'roxanne');
	// 3. find submit
	const submitButton = screen.getByRole('button');
	// 4. click submit
	userEvent.click(submitButton);
	// 5. find error message on screen
	const firstNameSubmitError = screen.queryByText(/is a required field/i);
});

test('renders THREE error messages if user enters no values into any fields.', async () => {
	render(<ContactForm />);
	// 1. find fields
	const firstNameField = screen.getByPlaceholderText('Edd');
	const lastNameField = screen.getByPlaceholderText('Burke');
	const eMailField = screen.getByPlaceholderText('bluebill1049@hotmail.com');
	// 2. enter text
	userEvent.type(firstNameField, '');
	userEvent.type(lastNameField, '');
	userEvent.type(eMailField, '');
	// 3. find submit
	const submitButton = screen.getByRole('button');
	// 4. click submit
	userEvent.click(submitButton);
	// 5. find error message on screen
	const firstNameSubmitError = screen.queryByText(/is a required field/i);
	const lastNameSubmitError = screen.queryByText(/is a required field/i);
	const eMailSubmitError = screen.queryByText(/is a required field/i);
});

test('renders ONE error message if user enters a valid first name and last name but no email.', async () => {
	render(<ContactForm />);
	// 1. find fields
	const firstNameField = screen.getByPlaceholderText('Edd');
	const lastNameField = screen.getByPlaceholderText('Burke');
	const eMailField = screen.getByPlaceholderText('bluebill1049@hotmail.com');
	// 2. enter text
	userEvent.type(firstNameField, 'roxanne');
	userEvent.type(lastNameField, 'weber');
	userEvent.type(eMailField, '');
	// 3. find submit
	const submitButton = screen.getByRole('button');
	// 4. click submit
	userEvent.click(submitButton);
	// 5. find error message on screen
	expect(firstNameField).toBeTruthy();
	expect(lastNameField).toBeTruthy();
	const eMailSubmitError = screen.queryByText(/is a required field/i);
});

test('renders "email must be a valid email address" if an invalid email is entered', async () => {
	render(<ContactForm />);
	// 1. find fields
	const eMailField = screen.getByPlaceholderText('bluebill1049@hotmail.com');
	// 2. enter text
	userEvent.type(eMailField, 'rox.com');
	// 3. find submit
	const submitButton = screen.getByRole('button');
	// 4. click submit
	userEvent.click(submitButton);
	// 5. find error message on screen
	const eMailSubmitError = screen.queryByText(/must be a valid email address/i);
});

test('renders "lastName is a required field" if an last name is not entered and the submit button is clicked', async () => {});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {});

test('renders all fields text when all fields are submitted.', async () => {});

test('Renders new species when submitting with all fields filled', () => {
	//Arrange
	// render(<ContactForm />);
	//Act:
	// 1. find text field
	// const speciesField1 = screen.getByPlaceholderText(/species/i);
	// make sure something on the screen
	// 2. type into text field
	// userEvent.type(speciesField1, 'feline');
	// adds virtual value to virtual input field
	// 3. find second text field
	// const speciesField2 = screen.getByLabelText(/species/i);
	// 4. type into text field
	// userEvent.type(speciesField2, 'cat');
	// add text into second field
	// 5. find the last field
	// const speciesField3 = screen.getByLabelText(/species/i);
	// 6. type into text field
	// userEvent.type(speciesField3, 'roxanne');
	// 7. find submit button
	// const button = screen.getByRole('button');
	// get specific items with role like button for click
	// 8. click submit button
	// userEvent.click(button);
	// clicking on the button
	//Assert: items should be rendered without error
	// 9. submit renders all text
	// const speciesFeedbackPromise = screen.findByText('feline');
	// speciesFeedbackPromise.then((speciesFeedback) => {
	// 	console.log(speciesFeedback);
});

// this returns a promise that is executed AFTER change of state is complete
// const speciesFeedback2 = await screen.fiendByText('feline');
// expect(speciesFeedback2).toBeDefined();
// this await will wait until all renders are complete before testing

// 10. renders without fail
// });
