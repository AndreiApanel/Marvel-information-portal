import AppHeader from '../appHeader/AppHeader';
import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';

import decoration from '../../pictures/vision.png';
// import Spinner from '../spinner/spinner';

export default function App() {
	return (
		<div className="app">
			<AppHeader />
			<main>
				<RandomChar />
				<div className="char__content">
					<CharList />
					<CharInfo />
				</div>
				<img className="bg-decoration" src={decoration} alt="vision" />
			</main>
		</div>
	);
}
