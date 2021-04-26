import React, { useState, useRef } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import APIurl from '../config';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Col } from 'react-bootstrap/';

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
			<div className='form'>
				<Form
					encType='multipart/form-data'
					onSubmit={handleSubmit}
					ref={formRef}>
					<Form.Group controlId='title'>
						<Form.Label>Title</Form.Label>
						<Form.Control
							type='text'
							placeholder={artwork.title}
							name='title'
							required
						/>
					</Form.Group>
					<Form.Row>
						<Form.Group as={Col} controlId='price'>
							<Form.Label>Price</Form.Label>
							<Form.Control
								type='text'
								placeholder={artwork.price}
								name='price'
								required
							/>
						</Form.Group>
						<Form.Group as={Col} controlId='publication_date'>
							<Form.Label>Publication Date</Form.Label>
							<Form.Control
								type='date'
								placeholder='$00.00'
								name='publication_date'
								required
							/>
						</Form.Group>
					</Form.Row>
					<Form.Row>
						<Form.Group as={Col} controlId='student_id'>
							<Form.Label>Profile ID</Form.Label>
							<Form.Control
								name='student_id'
								type='number'
								value={artwork.student_id}
								required
							/>
						</Form.Group>
						<Form.Group as={Col} controlId='owner'>
							<Form.Label>User ID</Form.Label>
							<Form.Control
								name='owner'
								type='number'
								value={artwork.owner}
								required
							/>
						</Form.Group>
					</Form.Row>

					{/* <form
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
						value={artwork.student_id}
						required
					/>
					<label htmlFor='owner'>Owner ID</label>
					<input id='owner' name='owner' type='number' value={artwork.owner} /> */}
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

					{/* </form> */}
				</Form>
				{result?.error && <p className='message failure'>An error occurred.</p>}
			</div>
		</div>
	);
};

export default ArtworkUpdateForm;
