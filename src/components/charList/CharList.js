import './charList.scss';
import abyss from '../../pictures/abyss.jpg';

export default function CharList() {
	return (
		<div className="char__list">
			<ul className="char__grid">
				<li className="char__item">
					<img src={abyss} alt="abyss" />
					<div className="char__name">Abyss</div>
				</li>
				<li className="char__item char__item_selected">
					<img src={abyss} alt="abyss" />
					<div className="char__name">Abyss</div>
				</li>
				<li className="char__item">
					<img src={abyss} alt="abyss" />
					<div className="char__name">Abyss</div>
				</li>
				<li className="char__item">
					<img src={abyss} alt="abyss" />
					<div className="char__name">Abyss</div>
				</li>
				<li className="char__item">
					<img src={abyss} alt="abyss" />
					<div className="char__name">Abyss</div>
				</li>
				<li className="char__item">
					<img src={abyss} alt="abyss" />
					<div className="char__name">Abyss</div>
				</li>
				<li className="char__item">
					<img src={abyss} alt="abyss" />
					<div className="char__name">Abyss</div>
				</li>
				<li className="char__item">
					<img src={abyss} alt="abyss" />
					<div className="char__name">Abyss</div>
				</li>
				<li className="char__item">
					<img src={abyss} alt="abyss" />
					<div className="char__name">Abyss</div>
				</li>
			</ul>
			<button className="button button__main button__long">
				<div className="inner">load more</div>
			</button>
		</div>
	);
}
