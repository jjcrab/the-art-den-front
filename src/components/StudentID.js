import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import APIurl from '../config';
import Loading from './Loading';

const StudentID = ({ match }) => {
	const [student, setStudent] = useState();
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

	// const handleDelete = (event) => {
	// 	event.preventDefault();
	// 	axios({
	// 		url: `${APIurl}/studentprofile/${match.params.id}`,
	// 		method: 'DELETE',
	// 		headers: {
	// 			Authorization: `Token ${localStorage.getItem('token')}`,
	// 		},
	// 	})
	// 		.then(() => {
	// 			console.log('delete');
	// 		})
	// 		.catch(console.error);
	// };

	// const updating = (event) => {
	// 	appear === ''
	// 		? setAppear(event.target.attributes.class.nodeValue)
	// 		: setAppear('');
	// 	error === '' ? setError(true) : setError('');
	// };

	if (!student) {
		return <Loading />;
	}

	return (
		<div className='studentContainer'>
			<div className='studentInform'>
				<div className='studentDesc'>
					<h3>{student.name}</h3>
					<div className='studentText'>
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
						<p>Graduate in: {student.graduation_year}</p>
						<p>Personal_story:</p>
						<p>{student.personal_story}</p>
						<p>Contact: {student.studentuser_email}</p>
					</div>
				</div>
				<div className='backLink'>
					<Link to={'/students'}>
						<p>Other students</p>
					</Link>
				</div>
				{/* <button onClick={handleDelete} className={student.id}>
					Delete
				</button> */}
			</div>
		</div>
	);
};

export default StudentID;
