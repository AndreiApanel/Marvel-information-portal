import {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './character.scss';

const Character = props => {
  const charId = useParams();
  const [character, setCharacter] = useState(null);
  const {loading, error, getCharacter, clearError} = useMarvelService();
  useEffect(() => {
    updateChar();
  }, [charId]);
  const updateChar = () => {
    const {charId} = props;
    if (!charId) {
      return;
    }
    clearError();
    getCharacter(charId).then(onCharLoaded);
  };
  const onCharLoaded = character => {
    setCharacter(character);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !character) ? <View char={char} /> : null;
  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};
const View = ({character}) => {
  const {title, description, thumbnail, pageCount, language, price} = character;
  return (
    <div className='character'>
      <img src={thumbnail} alt={title} className='single-comic__img' />
      <div className='character__info'>
        <h2 className='character__name'>{title}</h2>
        <p className='character__descr'>{description}</p>
        <p className='character__descr'>{pageCount} pages</p>
        <p className='character__descr'>Language: {language}</p>
        <div className='character__price'>{price}</div>
      </div>
      <Link to='/character' className='character__back'>
        Back to all
      </Link>
    </div>
  );
};

export default Character;
