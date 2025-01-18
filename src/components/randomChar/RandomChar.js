import { Component } from 'react';
import Spinner from '../spinner/Spinner;';
import './randomChar.scss';
import mjolnir from '../../pictures/mjolnir.png';
import MarvelService from '../../services/MarvelService';
import { sassTrue } from 'sass';
class RandomChar extends Component {
	constructor(props) {
		super(props);
		this.updateChar();
	}
	state = {
		char: {},
		loading: true,
		error: false,
		discription: '',

		// name: null,
		// discription: null,
		// thumbnail: null,
		// homepage: null,
		// wiki: null,
	};
	marvelService = new MarvelService();

	onCharLoaded = (char) => {
		this.setState({ char, loading: false });
	};
	onError = () => {
		this.setState({ loading: false, error: true });
	};
	onTextDiscr = ({ discription, maxlengh }) => {
		if (discription.length > maxlengh) {
			return discription.slice(0, maxlengh) + '...';
		}
		return this.setState({ discription });
	};

	updateChar = () => {
		const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
		this.marvelService
			.getCharacter(id)
			.then(this.onCharLoaded)
			.catch(this.onError);
	};
	render() {
		// const { name, discription, thumbnail, homepage, wiki } = this.state;
		const { char, loading } = this.state;

		return (
			<div className="randomchar">
				{loading ? <Spinner /> : <View char={char} />}
				<div className="randomchar__static">
					<p className="randomchar__title">
						Random character for today!
						<br />
						Do you want to get to know him better?
					</p>
					<p className="randomchar__title">Or choose another one</p>
					<button className="button button__main">
						<div className="inner">try it</div>
					</button>
					<img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
				</div>
			</div>
		);
	}
}
const View = ({ char }) => {
	const { name, thumbnail, discription, homepage, wiki } = char;
	return (
		<div className="randomchar__block">
			<img src={thumbnail} alt="Random character" className="randomchar__img" />
			<div className="randomchar__info">
				<p className="randomchar__name">{name}</p>
				<p className="randomchar__descr">{discription}</p>
				<div className="randomchar__btns">
					<a href={homepage} className="button button__main">
						<div className="inner">homepage</div>
					</a>
					<a href={wiki} className="button button__secondary">
						<div className="inner">Wiki</div>
					</a>
				</div>
			</div>
		</div>
	);
};
export default RandomChar;
