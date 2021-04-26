import React from 'react';
import '../App.css';

export default function Loading() {
	return (
		<div>
			<div className='lds-spinner'>
				<div></div>
				<div></div>
				<div></div>
			</div>
		</div>
	);
}
