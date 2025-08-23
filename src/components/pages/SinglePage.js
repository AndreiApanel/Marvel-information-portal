import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';

import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import AppBanner from '../appBanner/AppBanner';

const SinglePage = ({Component, dataType}) => {
  const {id} = useParams();
  const [data, setData] = useState(null);
  const {loading, error, getComic, getCharacter, clearError} = useMarvelService();

  useEffect(() => {
    clearError();

    const updateData = async () => {
      try {
        switch (dataType) {
          case 'comic':
            return setData(await getComic(id));
          case 'character':
            return setData(await getCharacter(id));
          default:
            console.error(`Unknown dataType: ${dataType}`);
        }
      } catch (e) {
        console.error(e);
      }
    };

    updateData();
  }, [id, dataType, clearError, getComic, getCharacter]);

  const errorMessage = error ? <ErrorMessage /> : null;
  const spinner = loading ? <Spinner /> : null;
  const content = !(loading || error || !data) ? <Component data={data} /> : null;

  return (
    <>
      <AppBanner />
      {errorMessage}
      {spinner}
      {content}
    </>
  );
};

export default SinglePage;
