import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import APIurl from '../config';
import Gridforlist from './Gridforlist';
import Card from './Card';
import Loading from './Loading';

const Students = () => {
	const [students, setStudents] = useState();

	useEffect(() => {
		axios(`${APIurl}/students/`)
			.then((res) => {
				console.log(res);
				setStudents(res.data);
			})
			.catch(console.error);
	}, []);

	if (!students) {
		return <Loading />;
	}

	return (
		<div>
			<Gridforlist>
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
			</Gridforlist>
		</div>
	);
};

export default Students;
