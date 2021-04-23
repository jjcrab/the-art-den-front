import React from 'react';
import background from './images/background.jpg';

const Home = () => {
	return (
		<div className='home'>
			<p>Welcome to The Little Art Den (TLAD)! Best wishes to your jorney!</p>
			<img
				src={background}
				alt='background'
				className='homepageBackgroundImg'
			/>
		</div>
	);
};

export default Home;
