import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import APIurl from '../config';
import ArtworkUpdateForm from './ArtworkUpdateForm';

const ArtworkID = ({ match }) => {
	const [artwork, setArtwork] = useState({});
	const [appear, setAppear] = useState(false);
	// const [error, setError] = useState('');
	const history = useHistory();

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
			url: `${APIurl}/studentartworks/${match.params.id}/`,
			method: 'DELETE',
			headers: {
				Authorization: `Token ${localStorage.getItem('token')}`,
			},
		})
			.then(() => {
				console.log('delete');
				history.push(`/artworks/`);
			})
			.catch(console.error);
	};

	const handleClick = (event) => {
		setAppear(true);
	};

	if (!artwork) {
		return <h1>Loading...</h1>;
	}

	return (
		<div className='artworkContainer'>
			<div className='artworkDesc'>
				<h1>{artwork.title}</h1>
				<div className='artworkText'>
					<p>Details</p>
					{artwork.artwork_image ? (
						<img
							src={artwork.artwork_image}
							alt='artwork'
							className='artworkid'
						/>
					) : (
						<p>Loading image</p>
					)}
					<p>For Sale: ${artwork.price}</p>
					<p>Publication Date: {artwork.publication_date}</p>
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
			<button onClick={handleClick} className={artwork.id}>
				Update
			</button>
			{appear && (
				<ArtworkUpdateForm
					match={match}
					getData={getData}
					artwork={artwork}
					setAppear={setAppear}
				/>
			)}
		</div>
	);
};

export default ArtworkID;
