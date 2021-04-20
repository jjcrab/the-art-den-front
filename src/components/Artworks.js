import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import APIurl from '../config';
import Grid from './Grid';
import Card from './Card';

const Artworks = () => {
	const [artworks, setArtworks] = useState();

	useEffect(() => {
		axios(`${APIurl}/artworks/`)
			.then((res) => {
				setArtworks(res.data);
				console.log(res.data);
			})
			.catch(console.error);
	}, []);

	if (!artworks) {
		return <h1>Loading...</h1>;
	}

	return (
		<div>
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
		</div>
	);
};

export default Artworks;
