import React, { useState, useEffect } from 'react';
import axios from 'axios';
import APIurl from '../config';
import ProfileForm from './ProfileForm';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

const StudentProfile = ({ match }) => {
	const [profile, setProfile] = useState({});
	const token = localStorage.getItem('token');

	useEffect(() => {
		axios({
			url: `${APIurl}/studentprofile/`,
			method: 'GET',
			headers: {
				Authorization: `Token ${localStorage.getItem('token')}`,
			},
		})
			.then((res) => {
				console.log(res.data[0]);
				setProfile(res.data[0]);
			})
			.catch(console.error);
	}, [match]);

	if (token && !profile) {
		return (
			<div>
				<h4>
					You don't have a profile yet. Please complete your profile below
				</h4>
				<ProfileForm />
			</div>
		);
	}

	if (!token) {
		return <h1>Please login to see your profile.</h1>;
	}

	return (
		<div className='profileContainer'>
			{profile && (
				<div className='profileInform'>
					<h1>{profile.name}</h1>
					<div className='profileText'>
						<p>Details</p>
						<p>Name: {profile.name}</p>
						{profile.avatar ? (
							<img
								src={profile.avatar}
								alt='avatar'
								className='profileIDavatar'
							/>
						) : (
							<p>Loading image</p>
						)}
						<p>School: {profile.school}</p>
						<p>Graduate in: {profile.graduation_year}</p>
						<p>Personal_story:</p>
						<p>{profile.personal_story}</p>
						<p>Contact: {profile.studentuser_email}</p>
					</div>
				</div>
			)}
			<div>
				<Link
					to={`/studentaccount-profile/${profile.id}`}
					profile={profile}
					setProfile={setProfile}>
					<Button variant='outline-success' className='update-btn btn'>
						Update
					</Button>
				</Link>
			</div>
		</div>
	);
};
export default StudentProfile;
