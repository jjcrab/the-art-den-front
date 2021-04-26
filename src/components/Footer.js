import React from 'react';
import { Link } from 'react-router-dom';
import artdenlogo from './images/artdenlogo.png';

const Footer = () => {
	return (
		<div className='footer'>
			<p>
				Copyright &copy; {new Date().getFullYear()}{' '}
				<img src={artdenlogo} alt='artdenlogo' className='footerlogo' />
				<Link to='/'>The Little Art Den</Link>
			</p>
		</div>
	);
};

export default Footer;
