import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import APIurl from '../config';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

// ====================Material UI============================
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
	root: {
		height: '100vh',
	},
	image: {
		backgroundImage: 'url(https://source.unsplash.com/collection/8960414)',
		backgroundRepeat: 'no-repeat',
		backgroundColor:
			theme.palette.type === 'light'
				? theme.palette.grey[50]
				: theme.palette.grey[900],
		backgroundSize: 'cover',
		backgroundPosition: 'center',
	},
	paper: {
		margin: theme.spacing(8, 4),
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: '100%', // Fix IE 11 issue.
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

// ====================component============================
function StudentLogin() {
	const initialState = { email: '', password: '' };
	const [formState, setFormState] = useState(initialState);
	// const [user, setUser] = useState('');
	const [error, setError] = useState(false);
	const [username, setUsername] = useState('');
	const [token, setToken] = useState('');
	// const [userId, setUserId] = useState('');
	// const [profileId, setProfileId] = useState('');
	const classes = useStyles();
	const history = useHistory;

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

	const handleClick = (event) => {
		// event.preventDefault();
		localStorage.clear();
	};

	return (
		<div>
			<Grid container component='main' className={classes.root}>
				<CssBaseline />
				<Grid item xs={false} sm={4} md={7} className={classes.image} />

				{token && username ? (
					<div>
						<h4>Hello {username}!</h4>
						<Link href={'/'} variant='body2' onClick={handleClick}>
							{'Log out'}
						</Link>
					</div>
				) : (
					<Grid
						item
						xs={12}
						sm={8}
						md={5}
						component={Paper}
						elevation={6}
						square>
						<div className={classes.paper}>
							<Avatar className={classes.avatar}>
								<LockOutlinedIcon />
							</Avatar>
							<Typography component='h1' variant='h5'>
								Sign in
							</Typography>
							<form onSubmit={handleSubmit} className={classes.form} noValidate>
								<TextField
									variant='outlined'
									margin='normal'
									required
									fullWidth
									id='email'
									label='Email Address'
									name='email'
									autoComplete='email'
									autoFocus
									onChange={handleChange}
									value={formState.email}
								/>
								<TextField
									variant='outlined'
									margin='normal'
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
								<FormControlLabel
									control={<Checkbox value='remember' color='primary' />}
									label='Remember me'
								/>
								<Button
									type='submit'
									fullWidth
									variant='contained'
									color='primary'
									className={classes.submit}>
									Sign In
								</Button>
								<Grid container>
									<Grid item xs>
										<Link href='#' variant='body2'>
											Forgot password?
										</Link>
									</Grid>
									<Grid item>
										<Link href={'/studentsignup'} variant='body2'>
											{"Don't have an account? Sign Up"}
										</Link>
									</Grid>
								</Grid>
								<Box mt={5}>
									<Copyright />
									{error ? (
										<p>The provided username or password is incorrect</p>
									) : (
										''
									)}
								</Box>
							</form>
						</div>
					</Grid>
				)}
			</Grid>
			{error ? <p>The provided username or password is incorrect</p> : ''}

			<div>
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
		</div>
	);
}

export default StudentLogin;
