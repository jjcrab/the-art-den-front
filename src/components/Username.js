import React from 'react';

function Username(props) {
	return (
		<div className='hi'>
			<p>Hi, {localStorage.getItem('username')}</p>
		</div>
	);
}

export default Username;
