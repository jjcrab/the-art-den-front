import React, { useState } from 'react';
// import { Link, useHistory } from 'react-router-dom';
import { Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { NavDropdownMenu } from 'react-bootstrap-submenu';
import Username from './Username';

const Navi = () => {
	const [username, setUsername] = useState(localStorage.getItem('username'));
	// const history = useHistory();

	const handleClick = (event) => {
		// event.preventDefault();
		localStorage.clear();
		setUsername(false);
		// history.push('/');np
	};

	return (
		<div>
			<Navbar bg='light' expand='lg'>
				<Navbar.Brand href='/'>The Little Art Den</Navbar.Brand>
				<Navbar.Toggle aria-controls='responsive-navbar-nav' />
				<Navbar.Collapse id='responsive-navbar-nav'>
					<Nav className='mr-auto'>
						<Nav.Link href='/'>
							<h4 className='link-text'>Home</h4>
						</Nav.Link>
						<Nav.Link href='/artworks'>
							<h4 className='link-text'>Artworks</h4>
						</Nav.Link>
						<Nav.Link href='/students'>
							<h4 className='link-text'>Students</h4>
						</Nav.Link>
						<Nav.Link href='/students'>
							<h4 className='link-text'>Students</h4>
						</Nav.Link>
						<Nav.Link href='/about'>
							<h4 className='link-text'>About</h4>
						</Nav.Link>
						<Nav.Link href='/studentsignup'>
							<h4 className='link-text'>Sign Up</h4>
						</Nav.Link>
						<Nav.Link href='/studentlogin'>
							<h4 className='link-text'>Log In</h4>
						</Nav.Link>
						<Nav.Link href='/studentaccount-artworks'>
							<h4 className='link-text'>Your Artworks</h4>
						</Nav.Link>
						<Nav.Link href='/studentaccount-profile'>
							<h4 className='link-text'>Your Profile</h4>
						</Nav.Link>
						<Nav.Link href='/'>
							<h4 className='link-text' onClick={handleClick}>
								Log Out
							</h4>
						</Nav.Link>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
			{/* <NavDropdownMenu id='collasible-nav-dropdown' title='Menu'>
				<NavDropdown.Item href='/'>
					<h4 className='link-text'>Home</h4>
				</NavDropdown.Item>
				<NavDropdown.Item href='/artworks'>
					<h4 className='link-text'>Artworks</h4>
				</NavDropdown.Item>
				<NavDropdown.Item href='/students'>
					<h4 className='link-text'>Students</h4>
				</NavDropdown.Item>
				<NavDropdown.Item href='/about'>
					<h4 className='link-text'>About</h4>
				</NavDropdown.Item> */}

			{username ? <Username /> : null}
			{/* </NavDropdownMenu> */}
		</div>
	);
};

export default Navi;
