import React, { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import APIurl from '../config';
import Form from 'react-bootstrap/Form';
import { Col } from 'react-bootstrap/';
import Button from 'react-bootstrap/Button';
import Loading from './Loading';

const ProfileForm = () => {
	const history = useHistory();
	const formRef = useRef(null);
	const [previewImage, setPreviewImage] = useState(null);
	const [imageName, setImageName] = useState(null);
	const [result, setResult] = useState(null);
	const [invalidFile, setInvalidFile] = useState(false);
	const [user, setUser] = useState(null);

	useEffect(() => {
		axios({
			url: `${APIurl}/users/`,
			method: 'GET',
			headers: {
				Authorization: `Token ${localStorage.getItem('token')}`,
			},
		})
			.then((res) => {
				console.log(res.data);
				setUser(res.data);
			})
			.catch(console.error);
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();

		const formData = new FormData(event.target);

		axios({
			url: `${APIurl}/studentprofile/`,
			method: 'POST',
			headers: {
				Authorization: `Token ${localStorage.getItem('token')}`,
			},
			data: formData,
		})
			.then((res) => {
				setImageName(null);
				setPreviewImage(null);
				formRef.current.reset();
				setResult({ success: res });
				localStorage.setItem('profileID', res.data.id);
				localStorage.setItem('userID', res.data.studentuser_account);
				history.push(`/studentaccount-profile`);
			})
			.catch((error) => {
				setResult({ error });
				console.log(error);
			});
	};

	const handleClick = (event) => {
		event.preventDefault();
		history.push(`/`);
	};

	const handleFilePreview = (event) => {
		const file = event.target.files[0];
		setResult(null);
		setImageName(null);
		setPreviewImage(null);
		URL.revokeObjectURL(previewImage);
		if (file?.type.slice(0, 5) === 'image') {
			setInvalidFile(false);
			const fileUrl = URL.createObjectURL(file);
			setPreviewImage(fileUrl);
			setImageName(file.name);
		} else {
			setInvalidFile(true);
		}
	};

	if (!user) {
		return <Loading />;
	}
	return (
		<div>
			{user && <p className='hide'>{user[0].id}</p>}
			<div className='form'>
				<Form
					encType='multipart/form-data'
					onSubmit={handleSubmit}
					ref={formRef}>
					<Form.Group controlId='name'>
						<Form.Label>Name</Form.Label>
						<Form.Control name='name' type='text' required />
					</Form.Group>
					<Form.Group controlId='school'>
						<Form.Label>School</Form.Label>
						<Form.Control name='school' type='text' required />
					</Form.Group>
					<Form.Row>
						<Form.Group as={Col} controlId='graduation_year'>
							<Form.Label>Graduate in</Form.Label>
							<Form.Control
								name='graduation_year'
								type='number'
								required
								placeholder='Must between 2019-2030 '
							/>
						</Form.Group>
						<Form.Group as={Col} controlId='studentuser_account'>
							<Form.Label>User ID</Form.Label>
							<Form.Control
								name='studentuser_account'
								value={user[0].id}
								required
							/>
						</Form.Group>
					</Form.Row>
					<Form.Group controlId='personal_story'>
						<Form.Label>Personal Story</Form.Label>
						<Form.Control
							name='personal_story'
							required
							as='textarea'
							rows={10}
						/>
					</Form.Group>

					{/* <form
					encType='multipart/form-data'
					onSubmit={handleSubmit}
					ref={formRef}>
					<label htmlFor='name'>Name</label>
					<input id='name' name='name' type='text' required />
					<label htmlFor='school'>School</label>
					<input id='school' name='school' type='text' required />
					<label htmlFor='graduation_year'>Graduate in </label>
					<input
						id='graduation_year'
						name='graduation_year'
						type='number'
						required
					/>
					<label htmlFor='personal_story'>Personal Story </label>
					<input
						id='personal_story'
						name='personal_story'
						type='text'
						required
					/>
					<label htmlFor='studentuser_account'>Student ID</label>
					<input
						id='studentuser_account'
						name='studentuser_account'
						// type='number'
						value={user[0].id}
						required
					/> */}

					<label htmlFor='avatar'>
						Avatar image: {imageName && <strong>{imageName}</strong>}
					</label>
					<div
						className={invalidFile ? 'file-upload file-error' : 'file-upload'}>
						{previewImage && (
							<img
								src={previewImage}
								alt={imageName}
								className='preview-image'
							/>
						)}
						<input
							type='file'
							id='avatar'
							name='avatar'
							accept='image/*'
							onChange={handleFilePreview}
						/>
					</div>

					{/* <button type='submit'>Send it</button> */}
					<Button
						variant='outline-primary'
						type='submit'
						className='submit-btn btn'>
						Submit
					</Button>
					<Button
						variant='outline-secondary'
						onClick={handleClick}
						className='cancel-btn btn'>
						Cancel
					</Button>
				</Form>
				{/* </form> */}
				{result?.success && (
					<Link to='/studentaccount-profile'>See your profile.</Link>
				)}
				{result?.error && <p className='message failure'>An error occurred.</p>}
			</div>

			{/* <button variant='outline-danger' onClick={handleClick}>
				Cancel
			</button> */}
		</div>
	);
};

export default ProfileForm;
