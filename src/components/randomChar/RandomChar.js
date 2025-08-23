import {useState, useEffect, useCallback} from 'react';
import useMarvelService from '../../services/MarvelService';
import setContent from '../../utils/setContent';

import mjolnir from '../../pictures/mjolnir.png';

import './randomChar.scss';

const RandomChar = () => {
  const [char, setChar] = useState(null);
  const {getCharacter, clearError, process, setProcess} = useMarvelService();

  // name: null,
  // discription: null,
  // thumbnail: null,
  // homepage: null,
  // wiki: null,
  const updateChar = useCallback(() => {
    const id = Math.floor(Math.random() * (1011400 - 1011000) + 1011000);
    getCharacter(id)
      .then(onCharLoaded)
      .then(() => setProcess('confirmed'));
  }, [getCharacter, setProcess]);

  useEffect(() => {
    clearError();
    updateChar();

    const timerId = setInterval(updateChar, 63000);
    return () => clearInterval(timerId);
  }, [clearError, updateChar]);

  const onCharLoaded = char => {
    setChar(char);
  };

  // const { name, discription, thumbnail, homepage, wiki } = this.state;

  return (
    <div className='randomchar'>
      {setContent(process, View, char)}
      <div className='randomchar__static'>
        <p className='randomchar__title'>
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className='randomchar__title'>Or choose another one</p>
        <button onClick={updateChar} className='button button__main'>
          <div className='inner'>try it</div>
        </button>
        <img src={mjolnir} alt='mjolnir' className='randomchar__decoration' />
      </div>
    </div>
  );
};

const View = ({data}) => {
  const {name, thumbnail, description, homepage, wiki} = data;
  let imgStyle = {objectFit: 'cover'};
  if (thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
    imgStyle = {objectFit: 'contain'};
  }
  return (
    <div className='randomchar__block'>
      <img src={thumbnail} alt='Random character' style={imgStyle} className='randomchar__img' />
      <div className='randomchar__info'>
        <p className='randomchar__name'>{name}</p>
        <p className='randomchar__descr'>{description}</p>
        <div className='randomchar__btns'>
          <a href={homepage} className='button button__main'>
            <div className='inner'>homepage</div>
          </a>
          <a href={wiki} className='button button__secondary'>
            <div className='inner'>Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};
export default RandomChar;
