import React, { useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import APIurl from '../config';

const ArtworkUpdateForm = ({ artwork, getData, setAppear }) => {
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
			url: `${APIurl}/studentartworks/${artwork.id}/`,
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
				getData();
				setAppear(false);
			})
			.catch((error) => {
				setResult({ error });
				console.log(result);
				setAppear(true);
			});
	};

	const handleClick = (event) => {
		event.preventDefault();
		setAppear(false);
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

	return (
		<div>
			<h4>Update the artwork</h4>
			<div className='updateartform'>
				<form
					encType='multipart/form-data'
					onSubmit={handleSubmit}
					ref={formRef}>
					<label htmlFor='title'>Title</label>
					<input
						id='title'
						name='title'
						type='text'
						placeholder={artwork.title}
						required
					/>
					<label htmlFor='price'>Price</label>
					<input
						id='price'
						name='price'
						type='text'
						placeholder={artwork.price}
						required
					/>
					<label htmlFor='publication_date'>Publication Date</label>
					<input
						id='publication_date'
						name='publication_date'
						type='date'
						required
					/>
					<label htmlFor='student_id'>Student ID</label>
					<input
						id='student_id'
						name='student_id'
						type='number'
						placeholder={artwork.student_id}
						required
					/>
					<label htmlFor='owner'>Owner ID</label>
					<input
						id='owner'
						name='owner'
						type='number'
						placeholder={artwork.owner}
					/>
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
				{result?.error && <p className='message failure'>An error occurred.</p>}
			</div>
			<button variant='outline-danger' onClick={handleClick}>
				Cancel
			</button>
		</div>
	);
};

export default ArtworkUpdateForm;
