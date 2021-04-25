import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import axios from 'axios';
import APIurl from '../config';

function StudentLogin() {
	const initialState = { email: '', password: '' };
	const [formState, setFormState] = useState(initialState);
	// const [user, setUser] = useState('');
	const [error, setError] = useState(false);
	const [username, setUsername] = useState('');
	const [token, setToken] = useState('');
	// const [userId, setUserId] = useState('');
	// const [profileId, setProfileId] = useState('');

	const handleChange = (event) => {
		setFormState({ ...formState, [event.target.id]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		axios
			.post(`${APIurl}/token/login`, formState)
			.then(({ data }) => {
				setToken(data.auth_token);
				localStorage.setItem('token', data.auth_token);
				setFormState(initialState);
			})
			// .then(() => {
			// 	setUser(formState.email);
			// 	localStorage.setItem('email', formState.email);

			// 	localStorage.setLogin('login', login);
			// 	setFormState(initialState);
			// })
			.catch(() => setError(true));
	};

	useEffect(() => {
		axios({
			url: `${APIurl}/users/`,
			method: 'GET',
			headers: {
				Authorization: `Token ${localStorage.getItem('token')}`,
			},
		})
			.then((res) => {
				console.log(res.data[0]);
				setUsername(res.data[0].username);
				localStorage.setItem('username', res.data[0].username);
				// setUserId(res.data[0].id);
			})
			.catch(console.error);
	}, [token]);

	useEffect(() => {
		axios({
			url: `${APIurl}/studentprofile/`,
			method: 'GET',
			headers: {
				Authorization: `Token ${localStorage.getItem('token')}`,
			},
		})
			.then((res) => {
				console.log(res.data[0]);
				localStorage.setItem('profileID', res.data[0].id);
				localStorage.setItem('userID', res.data[0].studentuser_account);
				localStorage.setItem('email', res.data[0].studentuser_email);
			})
			.catch(console.error);
	}, [token]);

	// if (username) {
	// 	localStorage.setItem('username', username);
	// }
	// if (userId) {
	// 	localStorage.setItem('userid', userId);
	// }
	// if (profileId) {
	// 	localStorage.setItem('profileid', profileId);
	// }

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
			{username ? (
				<p>Welcome back {username}</p>
			) : (
				<h6>
					You haven't log in yet. Haven't have an account?{' '}
					<Link to={'/studentsignup'}>Sign up</Link> today.
				</h6>
			)}
			{error ? <p>The provided username or password is incorrect</p> : ''}
		</div>
	);
}
export default StudentLogin;
