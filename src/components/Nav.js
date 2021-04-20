import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
	return (
		<div className='nav'>
			<h1>The Little Art Den</h1>
			<Link to='/' className='navlink'>
				<p>Home</p>
			</Link>
			<Link to='/artworks' className='navlink'>
				<p>Artworks</p>
			</Link>
			<Link to='/students' className='navlink'>
				<p>Students</p>
			</Link>
			<Link to='/about' className='navlink'>
				<p>About</p>
			</Link>
			<Link to='/user/signup'>
				<p>Sign up</p>
			</Link>
			<Link to='/user/login'>
				<p>Log in</p>
			</Link>
		</div>
	);
};

export default Nav;
