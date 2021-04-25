import React, { useState, useRef, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import APIurl from '../config';

const ArtworkForm = () => {
	const history = useHistory();
	const formRef = useRef(null);
	const [previewImage, setPreviewImage] = useState(null);
	const [imageName, setImageName] = useState(null);
	const [result, setResult] = useState(null);
	const [invalidFile, setInvalidFile] = useState(false);

	const handleSubmit = (event) => {
		event.preventDefault();

		const formData = new FormData(event.target);

		axios({
			url: `${APIurl}/studentartworks/`,
			method: 'POST',
			headers: {
				Authorization: `Token ${localStorage.getItem('token')}`,
			},
			data: formData,
		})
			// .then((response) => response.json())
			.then((res) => {
				// setArtwork(initialState);
				setImageName(null);
				setPreviewImage(null);
				formRef.current.reset();
				setResult({ success: res });
				// console.log(result);
			})
			.catch((error) => {
				setResult({ error });
				console.log(error);
			});
	};

	const handleClick = (event) => {
		event.preventDefault();
		history.push(`/artworks`);
	};

	const handleFilePreview = (event) => {
		// When you select a single file with a file input
		// you can access the file via event.target.files[0]
		const file = event.target.files[0];
		// If there's a previous upload result, clear it
		setResult(null);
		// If there was a previous file preview, clear it
		setImageName(null);
		setPreviewImage(null);
		// To manage memory better, manually revoke
		// any previous URL object we created to preview the image
		URL.revokeObjectURL(previewImage);
		// Make sure we have a file that is of an image type
		if (file?.type.slice(0, 5) === 'image') {
			// Set the invalid file type state to false
			setInvalidFile(false);
			// You can use the URL Web API's createObjectURL to
			// create a temporary local link to the blob in memory
			const fileUrl = URL.createObjectURL(file);
			// Use this object url as the src for an image to
			// display a preview of the image!
			setPreviewImage(fileUrl);
			// Use file.name to access the file's name
			setImageName(file.name);
		} else {
			// We didn't get a file or a file of an image type
			// so set the invalid file type state to false
			setInvalidFile(true);
		}
	};

	return (
		<div>
			<h4>Add a new artwork</h4>
			<div className='createartform'>
				<form
					encType='multipart/form-data'
					onSubmit={handleSubmit}
					ref={formRef}>
					<label htmlFor='title'>Title</label>
					<input id='title' name='title' type='text' required />
					<label htmlFor='price'>Price</label>
					<input
						id='price'
						name='price'
						type='text'
						placeholder='$00.00'
						required
					/>
					<label htmlFor='publication_date'>Publication Date</label>
					<input
						id='publication_date'
						name='publication_date'
						type='date'
						required
					/>
					<label htmlFor='student_id'>Profile ID</label>
					<input
						id='student_id'
						name='student_id'
						type='number'
						value={localStorage.getItem('profileID')}
						required
					/>
					<label htmlFor='owner'>Owner ID</label>
					<input
						id='owner'
						name='owner'
						type='number'
						value={localStorage.getItem('userID')}
					/>

					{/* Make sure the name attribute of the file field is the same as the value passed to the multer upload method on the back end */}
					<label htmlFor='artwork_image'>
						Artwork image: {imageName && <strong>{imageName}</strong>}
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
							id='artwork_image'
							name='artwork_image'
							accept='image/*'
							onChange={handleFilePreview}
						/>
					</div>
					<button type='submit'>Send it</button>
				</form>
				{result?.success && (
					<p className='message success'>
						Click{' '}
						<a
							href={result.success.data.artwork_image}
							target='_blank'
							rel='noopener noreferrer'>
							here
						</a>{' '}
						to see your image! See all{' '}
						<Link to='/artworks'>other artworks.</Link> Go to{' '}
						<Link to='/studentaccount-artworks'>your artworks.</Link>
					</p>
				)}
				{result?.error && <p className='message failure'>An error occurred.</p>}
			</div>
			<button variant='outline-danger' onClick={handleClick}>
				Cancel
			</button>
		</div>
	);
};

export default ArtworkForm;
