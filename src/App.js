import { Route } from 'react-router-dom';
import Navi from './components/Navi';
import Home from './components/Home';
import About from './components/About';
import Artworks from './components/Artworks';
import Students from './components/Students';
import StudentLogin from './components/StudentLogin';
import ArtworkForm from './components/ArtworkForm';
import ArtworkID from './components/ArtworkID';
import StudentArtworks from './components/StudentArtworks';
import StudentSignUp from './components/StudentSignUp';
import StudentID from './components/StudentID';
import StudentProfile from './components/StudentProfile';
import ProfileUpdateForm from './components/ProfileUpdateForm';
// import Username from './components/Username';

import './App.css';

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				{/* <Username /> */}
				<Navi />
			</header>
			<main>
				<Route path='/' exact component={Home} />
				<Route path='/about' exact component={About} />
				<Route path='/artworks' exact component={Artworks} />
				<Route path='/students' exact component={Students} />
				<Route path='/studentlogin' exact component={StudentLogin} />
				<Route path='/add-artwork' exact component={ArtworkForm} />
				<Route path='/artworks/:id' exact component={ArtworkID} />
				<Route
					path='/studentaccount-artworks'
					exact
					component={StudentArtworks}
				/>
				<Route path='/studentsignup' exact component={StudentSignUp} />
				<Route path='/students/:id' exact component={StudentID} />
				<Route
					path='/studentaccount-profile'
					exact
					component={StudentProfile}
				/>
				<Route
					path='/studentaccount-profile/:id'
					exact
					component={ProfileUpdateForm}
				/>
			</main>
			<footer></footer>
		</div>
	);
}

export default App;
