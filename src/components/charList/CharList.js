import {useState, useEffect, useRef, createRef, useMemo, useCallback} from 'react';
import {CSSTransition, TransitionGroup} from 'react-transition-group';

import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

const setContent = (process, Component, newItemLoading) => {
  switch (process) {
    case 'waiting':
      return <Spinner />;
    case 'loading':
      return newItemLoading ? <Component /> : <Spinner />;
    case 'error':
      return <ErrorMessage />;
    case 'confirmed':
      return <Component />;
    default:
      throw new Error('Unexpected process state');
  }
};

const CharList = props => {
  const {onCharSelected} = props;

  const [charList, setCharList] = useState([]);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [offset, setOffset] = useState(210);
  const [charEnded, setCharEnded] = useState(false);
  const {getAllCharacters, process, setProcess} = useMarvelService();

  const onRequest = useCallback(
    (offset, initial) => {
      initial ? setNewItemLoading(false) : setNewItemLoading(true);
      getAllCharacters(offset)
        .then(onCharListLoaded)
        .then(() => setProcess('confirmed'));
    },
    [getAllCharacters, setProcess],
  );

  useEffect(() => {
    onRequest(210, true);
  }, [onRequest]);

  const onCharListLoaded = newCharList => {
    let ended = false;
    if (newCharList.length < 9) {
      ended = true;
    }

    setCharList(charList => [...charList, ...newCharList]);
    setNewItemLoading(false);
    setOffset(offset => offset + 9);
    setCharEnded(ended);
  };

  const itemRefs = useRef({});

  const focusOnItem = id => {
    Object.values(itemRefs.current).forEach(ref => {
      if (ref?.current) ref.current.classList.remove('char__item_selected');
    });
    const node = itemRefs.current[id]?.current;
    if (node) {
      node.classList.add('char__item_selected');
      node.focus();
    }
  };

  const renderItems = useCallback(
    arr => {
      return (
        <TransitionGroup component='ul' className='char__grid'>
          {arr.map(item => {
            if (!itemRefs.current[item.id]) {
              itemRefs.current[item.id] = createRef();
            }
            const ref = itemRefs.current[item.id];

            const imgStyle = item.thumbnail.includes('image_not_available')
              ? {objectFit: 'unset'}
              : {objectFit: 'cover'};

            return (
              <CSSTransition key={item.id} timeout={500} classNames='char__item' nodeRef={ref}>
                <li
                  className='char__item'
                  tabIndex={0}
                  ref={ref}
                  onClick={() => {
                    onCharSelected(item.id);
                    focusOnItem(item.id);
                  }}
                  onKeyDown={e => {
                    if (e.key === ' ' || e.key === 'Enter') {
                      onCharSelected(item.id);
                      focusOnItem(item.id);
                    }
                  }}>
                  <img src={item.thumbnail} alt={item.name} style={imgStyle} />
                  <div className='char__name'>{item.name}</div>
                </li>
              </CSSTransition>
            );
          })}
        </TransitionGroup>
      );
    },
    [onCharSelected],
  );

  const elements = useMemo(() => {
    return setContent(process, () => renderItems(charList), newItemLoading);
  }, [process, charList, renderItems, newItemLoading]);

  return (
    <div className='char__list'>
      {elements}
      <button
        className='button button__main button__long'
        disabled={newItemLoading}
        style={{display: charEnded ? 'none' : 'block'}}
        onClick={() => onRequest(offset)}>
        <div className='inner'>load more</div>
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
