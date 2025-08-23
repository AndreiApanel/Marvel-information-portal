import {useState, useEffect, useCallback} from 'react';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Skeleton from '../skeleton/Skeleton';

import './charInfo.scss';
// import thor from '../../pictures/thor.jpeg';

const CharInfo = ({charId}) => {
  const [char, setChar] = useState(null);
  const {loading, error, getCharacter, clearError} = useMarvelService();

  // componentDidMount() {
  // 	updateChar();
  // }
  // componentDidUpdate(prevProps) {
  // 	if (this.props.charId !== prevProps.charId) {
  // 		this.updateChar();
  // 	}
  // }

  const updateChar = useCallback(() => {
    if (!charId) return; // wait until a character is selected
    clearError();
    getCharacter(charId)
      .then(setChar)
      .catch(err => console.error(err));
  }, [charId, clearError, getCharacter]);

  useEffect(() => {
    updateChar();
  }, [updateChar]);

  const skeleton = !char && !loading && !error ? <Skeleton /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = char && !(loading || error) ? <View char={char} /> : null;
  return (
    <div className='char__info'>
      {!char && !loading && !error}
      {skeleton}
      {errorMessage}
      {spinner}
      {content}
    </div>
  );
};

const View = ({char}) => {
  const {name, description, thumbnail, homepage, wiki, comics} = char;
  let imgStyle = {objectFit: 'cover'};
  if (thumbnail.includes('image_not_available')) imgStyle = {objectFit: 'contain'};

  return (
    <>
      <div className='char__basics'>
        <img src={thumbnail} alt={name} style={imgStyle} />
        <div>
          <div className='char__info-name'>{name}</div>
          <div className='char__btns'>
            <a href={homepage} className='button button__main'>
              <div className='inner'>homepage</div>
            </a>
            <a href={wiki} className='button button__secondary'>
              <div className='inner'>Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className='char__descr'>{description}</div>
      <div className='char__comics'>Comics:</div>
      <ul className='char__comics-list'>
        {comics.length
          ? comics.slice(0, 10).map((item, i) => (
              <li key={i} className='char__comics-item'>
                {item.name}
              </li>
            ))
          : 'There are no comics with this character'}
      </ul>
    </>
  );
};

CharInfo.propTypes = {
  charId: PropTypes.number,
};

export default CharInfo;
