import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import APIurl from '../config';
import Gridforlist from './Gridforlist';
import Card from './Card';
import Loading from './Loading';

const StudentArtworks = () => {
	const [artworks, setArtworks] = useState();
	const profileid = localStorage.getItem('profileID');

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

	if (localStorage.getItem('token') && !artworks) {
		return (
			<div>
				<Loading />
			</div>
		);
	}

	if (!localStorage.getItem('token')) {
		return (
			<div className='containerlogin'>
				<h3>Please login to see your artworks.</h3>
			</div>
		);
	}

	if (!profileid) {
		return (
			<h3>
				We want to know you more. Please complete your profile{' '}
				<Link to='/studentaccount-profile'>here</Link> first before uploading
				your first artwork.
			</h3>
		);
	}

	return (
		<div>
			<Link to='/add-artwork'>
				<div className='addArtworklink link-text'>
					<h5>Add an artwork</h5>
				</div>
			</Link>

			<p>{artworks.title}</p>
			<Gridforlist>
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
			</Gridforlist>
		</div>
	);
};
export default StudentArtworks;
