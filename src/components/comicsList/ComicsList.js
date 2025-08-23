import {useState, useEffect, useCallback} from 'react';
import {Link} from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './comicsList.scss';

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

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [newItemLoading, setnewItemLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [comicsEnded, setComicsEnded] = useState(false);
  const {getAllComics, process, setProcess} = useMarvelService();
  const onComicsLoaded = newComicsList => {
    let ended = false;
    if (newComicsList.length < 8) {
      ended = true;
    }

    setComicsList(prevList => [...prevList, ...newComicsList]);
    setnewItemLoading(false);
    setOffset(prevOffset => prevOffset + 8);
    setComicsEnded(ended);
  };
  const onRequest = useCallback(
    (offset, initial) => {
      initial ? setnewItemLoading(false) : setnewItemLoading(true);
      getAllComics(offset)
        .then(onComicsLoaded)
        .then(() => setProcess('confirmed'));
    },
    [getAllComics, setProcess],
  );

  useEffect(() => {
    onRequest(0, true); // always start at 0 on mount
  }, [onRequest]);

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      return (
        <li className='comics__item' key={item.id}>
          <Link to={`/comics/${item.id}`}>
            <img src={item.thumbnail} alt={item.title} className='comics__item-img' />
            <div className='comics__item-name'>{item.title}</div>
            <div className='comics__item-price'>{item.price ? `${item.price}$` : 'Not available'}</div>
          </Link>
        </li>
      );
    });

    return <ul className='comics__grid'>{items}</ul>;
  }
  const items = renderItems(comicsList);

  return (
    <div className='comics__list'>
      {setContent(process, () => items, newItemLoading)}
      <button
        disabled={newItemLoading}
        style={{display: comicsEnded ? 'none' : 'block'}}
        className='button button__main button__long'
        onClick={() => onRequest(offset)}>
        <div className='inner'>load more</div>
      </button>
    </div>
  );
};
export default ComicsList;
