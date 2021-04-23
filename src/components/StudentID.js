import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import APIurl from '../config';

const StudentID = ({ match }) => {
	const [student, setStudent] = useState({});
	// const [appear, setAppear] = useState('');
	const token = localStorage.getItem('token');
	// const [error, setError] = useState('');

	const getData = () => {
		axios(`${APIurl}/students/${match.params.id}`)
			.then((res) => {
				setStudent(res.data);
			})
			.catch(console.error);
	};

	useEffect(() => {
		getData();
	}, [match.params.id]);

	const handleDelete = (event) => {
		event.preventDefault();
		axios({
			url: `${APIurl}/students/${match.params.id}`,
			method: 'DELETE',
			headers: {
				Authorization: `Token ${localStorage.getItem('token')}`,
			},
		})
			.then(() => {
				console.log('delete');
			})
			.catch(console.error);
	};

	// const updating = (event) => {
	// 	appear === ''
	// 		? setAppear(event.target.attributes.class.nodeValue)
	// 		: setAppear('');
	// 	error === '' ? setError(true) : setError('');
	// };

	if (!student) {
		return <h1>Loading...</h1>;
	}

	return (
		<div className='studentContainer'>
			<div className='studentInform'>
				<div className='studentDesc'>
					<h1>{student.name}</h1>
					<div className='studentText'>
						<p>Details</p>
						<p>Name: {student.name}</p>
						{student.avatar ? (
							<img
								src={student.avatar}
								alt='avatar'
								className='studentIDavatar'
							/>
						) : (
							<p>Loading image</p>
						)}
						<p>School: {student.school}</p>
					</div>
				</div>
				<div className='backLink'>
					<Link to={'/students'}>
						<p>Other students</p>
					</Link>
				</div>
				<button onClick={handleDelete} className={student.id}>
					Delete
				</button>
			</div>
		</div>
	);
};

export default StudentID;
