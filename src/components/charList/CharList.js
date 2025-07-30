import {useState, useEffect, useRef, createRef} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import PropTypes from 'prop-types';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

const CharList = props => {
  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);
  const {loading, error, getAllCharacters} = useMarvelService();
  useEffect(() => {
    onRequest(offset, true);
  }, []);

  const onRequest = (offset, initial) => {
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
    getAllCharacters(offset).then(onCharListLoaded);
  };

  const onCharListLoaded = newCharList => {
    // const {logger, secondFunc} = await import('./someFunc.js');
    // logger();
    // secondFunc();

    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    setCharList(charList => [...charList, ...newCharList]);
    setNewItemLoading(false);
    setOffset(offset => offset + 9);
    setCharEnded(ended);
  };

  const itemRefs = useRef([]);

  const focusOnItem = index => {
    console.log('Clearing selection from all items');
    itemRefs.current.forEach(ref => {
      if (ref.current) ref.current.classList.remove('char__item_selected');
    });
    const node = itemRefs.current[index].current;
    console.log('Selecting item at index', index);
    if (node) {
      node.classList.add('char__item_selected');
      node.focus();
    }
  };

  const renderItems = arr => {
    itemRefs.current = [];

    return (
      <TransitionGroup component="ul" className="char__grid">
        {arr.map((item, i) => {
          const ref = createRef();
          itemRefs.current.push(ref);
          const imgStyle = item.thumbnail.includes('image_not_available') ? {objectFit: 'unset'} : {objectFit: 'cover'};
          return (
            <CSSTransition key={item.id} timeout={500} classNames="item" nodeRef={ref}>
              <li
                className="char__item"
                tabIndex={0}
                ref={ref}
                onClick={() => {
                  props.onCharSelected(item.id);
                  focusOnItem(i);
                }}
                onKeyDown={e => {
                  if (e.key === ' ' || e.key === 'Enter') {
                    props.onCharSelected(item.id);
                    focusOnItem(i);
                  }
                }}>
                <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                <div className="char__name">{item.name}</div>
              </li>
            </CSSTransition>
          );
        })}
      </TransitionGroup>
    );
  };

  const items = renderItems(charList);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading && !newItemLoading ? <Spinner /> : null;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {items}
      <button
        className="button button__main button__long"
        disabled={newItemLoading}
        style={{display: charEnded ? 'none' : 'block'}}
        onClick={() => onRequest(offset)}>
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};
export default CharList;

// if (loading) {
//   import('./someFunc.js')
//     .then(obj => {
//       obj.default();
//     })
//     .catch();
// }
