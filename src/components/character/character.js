import {useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './character.scss';

const Character = props => {
  const name = useParams();
  const [character, setCharacter] = useState(null);
  const {loading, error, getCharacterByName, clearError} = useMarvelService();
  useEffect(() => {
    updateChar();
  }, [name]);
  const updateChar = () => {
    const {name} = props;
    if (!name) {
      return;
    }
    clearError();
    getCharacterByName(name).then(onCharLoaded);
  };
  const onCharLoaded = character => {
    setCharacter(character);
  };

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !character) ? <View chararacter={character} /> : null;
  return (
    <>
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};
const View = ({character}) => {
  const {name, description, thumbnail} = character;
  return (
    <div className='character'>
      <img src={thumbnail} alt={name} className='character__img' />
      <div className='character__info'>
        <h2 className='character__name'>{name}</h2>
        <p className='character__descr'>{description}</p>
      </div>
      <Link to='/character' className='character__back'>
        Back to all
      </Link>
    </div>
  );
};

export default Character;
