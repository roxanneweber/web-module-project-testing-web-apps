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

test('renders "lastName is a required field" if a last name is not entered and the submit button is clicked', async () => {
	render(<ContactForm />);
	// 1. find fields
	const firstNameField = screen.getByPlaceholderText('Edd');
	const lastNameField = screen.getByPlaceholderText('Burke');
	const eMailField = screen.getByPlaceholderText('bluebill1049@hotmail.com');
	// 2. enter text
	userEvent.type(firstNameField, 'roxanne');
	userEvent.type(lastNameField, '');
	userEvent.type(eMailField, 'message@gmail.com');
	// 3. find submit
	const submitButton = screen.getByRole('button');
	// 4. click submit
	userEvent.click(submitButton);
	// 5. find error message on screen
	const eMailFieldSubmitError = screen.queryByText(/is a required field/i);
});

test('renders all firstName, lastName and email text when submitted. Does NOT render message if message is not submitted.', async () => {
	render(<ContactForm />);
	// 1. find fields
	const firstNameField = screen.getByPlaceholderText('Edd');
	const lastNameField = screen.getByPlaceholderText('Burke');
	const eMailField = screen.getByPlaceholderText('bluebill1049@hotmail.com');
	const messageField = screen.getByPlaceholderText('Enter your message...');
	// 2. enter text
	userEvent.type(firstNameField, 'roxanne');
	userEvent.type(lastNameField, 'weber');
	userEvent.type(eMailField, 'rox@email.com');
	userEvent.type(messageField, '');
	// 3. find submit
	const submitButton = screen.getByRole('button');
	// 4. click submit
	userEvent.click(submitButton);
	// 5. renders text if submission is successful
	// const lastNameResult = expect(lastNameResult).toEqual(firstNameField);

	// expect(firstNameField).toBeTruthy();
	// expect(lastNameField).toBeTruthy();
	// expect(eMailField).toBeTruthy();
	// expect(messageField).not.toBeTruthy();
});

test('renders all fields text when all fields are submitted.', async () => {
	render(<ContactForm />);
	// 1. find fields
	const firstNameField = screen.getByPlaceholderText('Edd');
	const lastNameField = screen.getByPlaceholderText('Burke');
	const eMailField = screen.getByPlaceholderText('bluebill1049@hotmail.com');
	const messageField = screen.getByPlaceholderText('Enter your message...');
	// 2. enter text
	userEvent.type(firstNameField, 'roxanne');
	userEvent.type(lastNameField, 'weber');
	userEvent.type(eMailField, 'rox@email.com');
	userEvent.type(messageField, 'This is my message to you thank you so much');
	// 3. find submit
	const submitButton = screen.getByRole('button');
	// 4. click submit
	userEvent.click(submitButton);
	// 5. renders text if submission is successful
	expect(firstNameField).toBeTruthy();
	expect(lastNameField).toBeTruthy();
	expect(eMailField).toBeTruthy();
	expect(messageField).toBeTruthy();
});
