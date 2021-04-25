import React, { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import APIurl from '../config';

const ProfileUpdateForm = (match) => {
	const history = useHistory();
	const formRef = useRef(null);
	const [previewImage, setPreviewImage] = useState(null);
	const [imageName, setImageName] = useState(null);
	const [result, setResult] = useState(null);
	const [invalidFile, setInvalidFile] = useState(false);
	const [profile, setProfile] = useState(null);
	const profileid = localStorage.getItem('profileID');

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
				setProfile(res.data[0]);
			})
			.catch(console.error);
	}, []);

	const handleSubmit = (event) => {
		event.preventDefault();
		const formData = new FormData(event.target);

		axios({
			url: `${APIurl}/studentprofile/${profileid}/`,
			method: 'PUT',
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
				history.push(`/studentaccount-profile`);
			})
			.catch((error) => {
				setResult({ error });
				console.log(error);
			});
	};

	const handleClick = (event) => {
		event.preventDefault();
		history.push(`/studentaccount-profile`);
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

	if (!profile) {
		return <p>loading</p>;
	}
	return (
		<div>
			<h4>Update Your Profile</h4>
			{profile && (
				<div className='createartform'>
					<form
						encType='multipart/form-data'
						onSubmit={handleSubmit}
						ref={formRef}>
						<label htmlFor='name'>Name</label>
						<input
							id='name'
							name='name'
							type='text'
							placeholder={profile.name}
							required
						/>
						<label htmlFor='school'>School</label>
						<input
							id='school'
							name='school'
							type='text'
							placeholder={profile.school}
							required
						/>
						<label htmlFor='graduation_year'>Graduate in </label>
						<input
							id='graduation_year'
							name='graduation_year'
							type='number'
							placeholder={profile.graduation_year}
							required
						/>
						<label htmlFor='personal_story'>Personal Story </label>
						<input
							id='personal_story'
							name='personal_story'
							type='text'
							placeholder={profile.personal_story}
							required
						/>
						<label htmlFor='studentuser_account'>Profile ID</label>
						<input
							id='studentuser_account'
							name='studentuser_account'
							value={profile.id}
							required
						/>

						<label htmlFor='avatar'>
							Avatar image: {imageName && <strong>{imageName}</strong>}
						</label>
						<div
							className={
								invalidFile ? 'file-upload file-error' : 'file-upload'
							}>
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
						<button type='submit'>Send it</button>
					</form>
					{/* {result?.success && (
					<Link to='/studentaccount-profile'>your profile.</Link>
				)} */}
					{result?.error && (
						<p className='message failure'>An error occurred.</p>
					)}
				</div>
			)}
			<button variant='outline-danger' onClick={handleClick}>
				Cancel
			</button>
		</div>
	);
};

export default ProfileUpdateForm;
