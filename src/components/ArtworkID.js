import React, { useState, useEffect } from 'react';
import { useHistory, Link } from 'react-router-dom';
import axios from 'axios';
import APIurl from '../config';
import ArtworkUpdateForm from './ArtworkUpdateForm';
import Loading from './Loading';
import Button from 'react-bootstrap/Button';

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
				history.push(`/studentaccount-artworks`);
			})
			.catch(console.error);
	};

	const handleClick = (event) => {
		setAppear(true);
	};

	if (!artwork) {
		return <Loading />;
	}

	return (
		<div className='artworkContainer'>
			<div className='artworkDesc'>
				<h3>{artwork.title}</h3>
				<div className='artworkText'>
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
				<Link to={'/studentaccount-artworks'}>
					<p>Your Artworks</p>
				</Link>
			</div>
			{/* <button onClick={handleDelete} className={artwork.id}>
				Delete
			</button> */}
			{/* <button onClick={handleClick} className={artwork.id}>
				Update
			</button> */}
			{localStorage.getItem('userID') === artwork.owner ? (
				<div>
					<Button
						variant='outline-success'
						onClick={handleClick}
						className='update-btn btn'>
						Update
					</Button>
					<Button
						variant='outline-danger'
						type='submit'
						className='delete-btn btn'
						onClick={handleDelete}>
						Delete
					</Button>
				</div>
			) : null}
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
