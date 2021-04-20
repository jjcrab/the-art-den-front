import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import APIurl from '../config';
import Grid from './Grid';
import Card from './Card';

const Students = () => {
	const [students, setStudents] = useState();

	useEffect(() => {
		axios(`${APIurl}/students/`)
			.then((res) => {
				setStudents(res.data);
			})
			.catch(console.error);
	}, []);

	if (!students) {
		return <h1>Loading...</h1>;
	}

	return (
		<div>
			<Grid>
				{students.map((student) => (
					<div className='studentLink'>
						<Card>
							<Link to={`/students/${student.id}`}>
								<img
									src={student.avatar}
									alt='student'
									className='studentAvatarImg'
								/>
								<p>{student.name}</p>
								<p>{student.school}</p>
							</Link>
						</Card>
					</div>
				))}
			</Grid>
		</div>
	);
};

export default Students;
