import React from 'react';
import aboutme from './images/aboutme.jpg';

const About = () => {
	return (
		<div>
			<h6 className='about'>About The Developer</h6>
			<div className='intro'>
				<div className='introText'>
					<p>
						Hello! I am Jingjing Li, a budding software developer by profession
						and an artist at heart.
					</p>
					<p>
						Art has always been a constant in my life and I couldn’t imagine it
						any other way. My goal was to create a platform for artists, in
						particular students, to showcase their pieces of work and connect
						with potential buyers. Having been a student before, I understand
						the struggles, and hence, wanted to create an easy to use, online
						art store, catered specifically to students, giving them the freedom
						to express themselves, and in the process catching the eye of an
						aesthete.
					</p>
					<p>
						I hope you enjoy using this website as much as I did building it.
						Cheers!
					</p>
				</div>
				<div className='introImg'>
					<img src={aboutme} alt='developer' />
				</div>
			</div>
		</div>
	);
};

export default About;
