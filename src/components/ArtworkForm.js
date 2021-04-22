import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import APIurl from '../config';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const ArtworkForm = () => {
	const initialState = {
		title: '',
		artwork_image: '',
		price: '',
		publication_date: ``,
		student_id: '3',
	};
	const history = useHistory();
	const [artwork, setArtwork] = useState({
		title: '',
		artwork_image: '',
		price: '',
		publication_date: ``,
		student_id: '3',
	});

	const handleChange = (event) => {
		setArtwork({ ...artwork, [event.target.id]: event.target.value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		axios({
			url: `${APIurl}/artworks/`,
			method: 'POST',
			headers: {
				Authorization: `Token ${localStorage.getItem('token')}`,
			},
			data: artwork,
		})
			.then(() => {
				setArtwork(initialState);
				history.push(`/artworks`);
			})
			.catch(console.error);
	};

	const handleClick = (event) => {
		event.preventDefault();
		history.push(`/artworks`);
	};

	return (
		<div>
			<h4>Add a new artwork</h4>
			<Form onSubmit={handleSubmit}>
				<Form.Group controlId='title'>
					<Form.Label>Title</Form.Label>
					<Form.Control
						type='text'
						placeholder='title of your artwork'
						onChange={handleChange}
						value={artwork.title}
					/>
				</Form.Group>
				<Form.Group controlId='artwork_image'>
					<Form.Label>Upload artwork image.</Form.Label>
					<Form.Control
						type='text'
						placeholder='image of your artwork'
						onChange={handleChange}
						value={artwork.artwork_image}></Form.Control>
				</Form.Group>
				<Form.Group controlId='price'>
					<Form.Label>Price</Form.Label>
					<Form.Control
						type='text'
						placeholder='$00.00'
						onChange={handleChange}
						value={artwork.price}
					/>
				</Form.Group>
				<Form.Group controlId='publication_date'>
					<Form.Label>Publication Date</Form.Label>
					<Form.Control
						type='text'
						placeholder='0000-00-00'
						onChange={handleChange}
						value={artwork.publication_date}
					/>
				</Form.Group>
				<Form.Group controlId='student_id'>
					<Form.Label>Student ID</Form.Label>
					<Form.Control
						type='number'
						placeholder='id'
						onChange={handleChange}
						value={artwork.student_id}
					/>
				</Form.Group>
				<Button variant='outline-primary' type='submit'>
					Submit
				</Button>
				<Button variant='outline-danger' onClick={handleClick}>
					Cancel
				</Button>
			</Form>
		</div>
	);
};

export default ArtworkForm;
