import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import APIurl from '../config';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

// ===========================Material UI=================================
function Copyright() {
	return (
		<Typography variant='body2' color='textSecondary' align='center'>
			{'Copyright © '}
			<Link color='inherit' href='https://material-ui.com/'>
				The Little Art Den
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	);
}

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(8),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%',
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

//====================Componenet========================

function SignUp() {
	const classes = useStyles();

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
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<div className={classes.paper}>
					<Avatar className={classes.avatar}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Sign up
					</Typography>
					<form onSubmit={handleSubmit} className={classes.form} noValidate>
						<TextField
							autoComplete='username'
							name='username'
							variant='outlined'
							required
							fullWidth
							id='username'
							label='User Name'
							autoFocus
							onChange={handleChange}
							value={formState.username}
						/>
						<TextField
							variant='outlined'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
							onChange={handleChange}
							value={formState.email}
							placeholder='Must be your .edu email account.'
						/>
						<TextField
							variant='outlined'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
							onChange={handleChange}
							value={formState.password}
						/>
						<TextField
							variant='outlined'
							required
							fullWidth
							name='re_password'
							label='re_password'
							type='password'
							id='re_password'
							autoComplete='current-re_password'
							onChange={handleChange}
							value={formState.re_password}
						/>
						<FormControlLabel
							control={<Checkbox value='allowExtraEmails' color='primary' />}
							label='I want to receive inspiration, marketing promotions and updates via email.'
						/>
						<Button
							type='submit'
							fullWidth
							variant='contained'
							color='primary'
							className={classes.submit}>
							Sign Up
						</Button>
						<Grid container justify='flex-end'>
							<Grid item>
								<Link to='/studentlogin' variant='body2'>
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</form>
				</div>
				<Box mt={5}>
					<Copyright />
				</Box>
			</Container>

			{/* ================================= */}
			{/* <form onSubmit={handleSubmit}>
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
			)} */}
		</div>
	);
}
export default SignUp;
