import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import axios from 'axios';
import APIurl from '../config';

function StudentLogin() {
	const initialState = { email: '', password: '' };
	const [formState, setFormState] = useState(initialState);
	const [user, setUser] = useState('');
	const [error, setError] = useState(false);

	const handleChange = (event) => {
		setFormState({ ...formState, [event.target.id]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		axios
			.post(`${APIurl}/token/login`, formState)
			.then(({ data }) => {
				localStorage.setItem('token', data.auth_token);
			})
			.then(() => {
				setUser(formState.email);
				localStorage.setItem('email', formState.email);
				setFormState(initialState);
			})
			.catch(() => setError(true));
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label htmlFor='email'>Email:</label>
				<input
					id='email'
					type='text'
					onChange={handleChange}
					value={formState.email}
				/>
				<label htmlFor='password'>Password:</label>
				<input
					id='password'
					type='password'
					onChange={handleChange}
					value={formState.password}
				/>
				<button type='submit'>Login</button>
			</form>
			{user ? (
				<p>Hello {user}</p>
			) : (
				<Link to={'/user/signup'}>
					<h6>Haven't have an account yet? Sign up today.</h6>
				</Link>
			)}
			{error ? <p>The provided username or password is incorrect</p> : ''}
		</div>
	);
}
export default StudentLogin;
