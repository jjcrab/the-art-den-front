import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import APIurl from '../config';

const ArtworkID = ({ match }) => {
	const [artwork, setArtwork] = useState({});
	const [appear, setAppear] = useState('');
	const token = localStorage.getItem('token');
	const [error, setError] = useState('');

	const getData = () => {
		axios(`${APIurl}/artworks/${match.params.id}`)
			.then((res) => {
				setArtwork(res.data);
			})
			.catch(console.error);
	};

	useEffect(() => {
		getData();
	}, [match.params.id]);

	const handleDelete = (event) => {
		event.preventDefault();
		axios({
			url: `${APIurl}/artworks/${match.params.id}`,
			method: 'DELETE',
			headers: {
				Authorization: `Token ${localStorage.getItem('token')}`,
			},
		})
			.then(() => {
				console.log('delete');
			})
			.catch(console.error);
	};

	// const updating = (event) => {
	// 	appear === ''
	// 		? setAppear(event.target.attributes.class.nodeValue)
	// 		: setAppear('');
	// 	error === '' ? setError(true) : setError('');
	// };

	if (!artwork) {
		return <h1>Loading...</h1>;
	}

	return (
		<div className='artworkContainer'>
			<div className='artworkInform'>
				<div className='artworkDesc'>
					<h1>{artwork.title}</h1>

					<div className='artworkText'>
						<p>Details</p>
						<p>{artwork.price}</p>
					</div>
				</div>
				<div className='backLink'>
					<Link to={'/artworks'}>
						<p>Other Artworks</p>
					</Link>
				</div>
				<button onClick={handleDelete} className={artwork.id}>
					Delete
				</button>
			</div>
		</div>
	);
};

export default ArtworkID;
