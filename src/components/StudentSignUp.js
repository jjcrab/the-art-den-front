import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import APIurl from '../config';

function SignUp() {
	const initialState = {
		username: '',
		email: '',
		password: '',
		re_password: '',
	};
	const [formState, setFormState] = useState(initialState);
	const [user, setUser] = useState('');
	const [error, setError] = useState();

	const handleChange = (event) => {
		setFormState({ ...formState, [event.target.id]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		axios
			.post(`${APIurl}/users/`, formState)
			.then(() => {
				setUser(formState.username);
				setFormState(initialState);
			})
			.catch((error) => {
				if (error.response) {
					console.log(error.response.statusText);
				}
				if (error.response.data) {
					Object.values(error.response.data).forEach((err) => console.log(err));
					setError(Object.values(error.response.data));
				}
			});
	};

	return (
		<div>
			<h4>Sign Up</h4>
			<form onSubmit={handleSubmit}>
				<label htmlFor='username'>Username:</label>
				<input
					id='username'
					type='text'
					onChange={handleChange}
					value={formState.username}
				/>
				<label htmlFor='email'>Email:</label>
				<input
					id='email'
					type='text'
					onChange={handleChange}
					value={formState.email}
					placeholder='Must be your .edu email account.'
				/>
				<label htmlFor='password'>Password:</label>
				<input
					id='password'
					type='password'
					onChange={handleChange}
					value={formState.password}
				/>
				<label htmlFor='re_password'>Re Password:</label>
				<input
					id='re_password'
					type='password'
					onChange={handleChange}
					value={formState.re_password}
				/>
				<button type='submit'>Sign Up</button>
			</form>
			{user ? (
				<p>
					Welcome {user}! Please login <Link to='/studentlogin'>here</Link>
				</p>
			) : (
				''
			)}
			{error ? (
				<div>
					{error.map((err) => (
						<p>{err}</p>
					))}
				</div>
			) : (
				''
			)}
		</div>
	);
}
export default SignUp;
