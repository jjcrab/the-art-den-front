import React, { useState } from 'react';
import {
	Nav,
	Navbar,
	Container,
	Dropdown,
	DropdownButton,
} from 'react-bootstrap';
import Username from './Username';
import artdenlogo from './images/artdenlogo.png';

const Navi = () => {
	const [username, setUsername] = useState(localStorage.getItem('username'));
	// const history = useHistory();

	const handleClick = (event) => {
		// event.preventDefault();
		localStorage.clear();
	};

	return (
		<div>
			<div className='nav'>
				<Container className='navbar'>
					<Navbar
						collapseOnSelect
						bg='light'
						variant='light'
						expand='false'
						fixed='top'>
						<Navbar.Brand href='/' id='appname'>
							<h2 id='appnameText'>
								<img src={artdenlogo} alt='artdenlogo' className='artdenlogo' />
								The Little Art Den
							</h2>
						</Navbar.Brand>
						{username ? <Username className='hi' /> : null}
						<Dropdown className='profile-dropdown'>
							<DropdownButton id='dropdown-customer-button' title=''>
								<Container className='menu'>
									{!username ? (
										<Dropdown.Item href='/studentlogin' className='ddtext'>
											<h6 className='link-text'>Log In</h6>
										</Dropdown.Item>
									) : null}
									<Dropdown.Item
										href='/studentaccount-artworks'
										className='ddtext'>
										<h6 className='link-text'>Your Artworks</h6>
									</Dropdown.Item>
									<Dropdown.Item
										href='/studentaccount-profile'
										className='ddtext'>
										<h6 className='link-text'>Your Profile</h6>
									</Dropdown.Item>
									{!username ? (
										<Dropdown.Item href='/studentsignup' className='ddtext'>
											<h6 className='link-text'>Sign Up</h6>
										</Dropdown.Item>
									) : null}
									{username ? (
										<Dropdown.Item href='/' className='ddtext'>
											<h6 className='link-text' onClick={handleClick}>
												Log Out
											</h6>
										</Dropdown.Item>
									) : null}
								</Container>
							</DropdownButton>
						</Dropdown>

						<Navbar.Toggle
							aria-controls='responsive-navbar-nav'
							className='navToggle'
						/>

						<Navbar.Collapse id='responsive-navbar-nav'>
							<Nav className='navsub'>
								<Nav.Link href='/'>
									<h6 className='link-text'>Home</h6>
								</Nav.Link>
								<Nav.Link href='/artworks'>
									<h6 className='link-text'>All our Artworks</h6>
								</Nav.Link>
								<Nav.Link href='/students'>
									<h6 className='link-text'>All Our Students</h6>
								</Nav.Link>
								<Nav.Link href='/about'>
									<h6 className='link-text'>About</h6>
								</Nav.Link>
							</Nav>
						</Navbar.Collapse>
					</Navbar>
				</Container>
			</div>
		</div>
	);
};

export default Navi;
