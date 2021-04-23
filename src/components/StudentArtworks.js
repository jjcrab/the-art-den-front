import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import APIurl from '../config';
import Grid from './Grid';
import Card from './Card';

const StudentArtworks = () => {
	const [artworks, setArtworks] = useState();

	useEffect(() => {
		axios({
			url: `${APIurl}/studentartworks`,
			method: 'GET',
			headers: {
				Authorization: `Token ${localStorage.getItem('token')}`,
			},
		})
			.then((res) => {
				console.log(res.data);
				setArtworks(res.data);
			})
			.catch(console.error);
	}, []);

	if (!artworks) {
		return <h1>Please login to see your profile.</h1>;
	}

	return (
		<div>
			test
			<p>{artworks.title}</p>
			<Grid>
				{artworks.map((art) => (
					<div className='artworkLink'>
						<Card>
							<Link to={`/artworks/${art.id}`}>
								<img
									src={art.artwork_image}
									alt='artwork'
									className='artworkImg'
								/>
								<p>{art.title}</p>
							</Link>
						</Card>
					</div>
				))}
			</Grid>
			<Link to={`/add-artwork`} className='addArtworklink'>
				<p>Add an artwork</p>
			</Link>
		</div>
	);
};
export default StudentArtworks;
