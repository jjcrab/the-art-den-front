import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
	const handleClick = () => {
		localStorage.clear();
	};

	return (
		<div className='nav'>
			<h1>The Little Art Den</h1>
			<div className='navlinkdiv'>
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
				<Link to='/studentsignup'>
					<p>Sign up</p>
				</Link>
				<Link to='/studentlogin'>
					<p>Log in</p>
				</Link>
				<Link to='/studentaccount-artworks'>
					<p>Your Artworks</p>
				</Link>
				<Link to='/studentaccount-profile'>
					<p>Your profile</p>
				</Link>
				<Link to='/'>
					<p onClick={handleClick}>Log out</p>
				</Link>
			</div>
		</div>
	);
};

export default Nav;
