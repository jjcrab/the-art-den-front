import { Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './components/Home';
import About from './components/About';
import Artworks from './components/Artworks';
import Students from './components/Students';

import './App.css';

function App() {
	return (
		<div className='App'>
			<header className='App-header'>
				<Nav />
			</header>
			<main>
				<Route path='/' exact component={Home} />
				<Route path='/about' exact component={About} />
				<Route path='/artworks' exact component={Artworks} />
				<Route path='/students' exact component={Students} />
			</main>
			<footer></footer>
		</div>
	);
}

export default App;
