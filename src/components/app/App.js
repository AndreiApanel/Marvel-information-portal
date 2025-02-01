import AppHeader from '../appHeader/AppHeader';

import decoration from '../../pictures/vision.png';

import decoration from '../../pictures/vision.png';

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
