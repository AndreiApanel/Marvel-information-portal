import {useParams} from 'react-router-dom';
import {useState, useEffect} from 'react';
import setContent from '../../utils/setContent';
import useMarvelService from '../../services/MarvelService';
import AppBanner from '../appBanner/AppBanner';

const SinglePage = ({Component, dataType}) => {
  const {id} = useParams();
  const [data, setData] = useState(null);
  const {getComic, getCharacter, clearError, process, setProcess} = useMarvelService();

  useEffect(() => {
    clearError();

    const updateData = async () => {
      try {
        let result = null;
        switch (dataType) {
          case 'comic':
            result = await getComic(id);
            break;
          case 'character':
            result = await getCharacter(id);
            break;
          default:
            console.error(`Unknown dataType: ${dataType}`);
            return;
        }
        setData(result);
        setProcess('confirmed');
      } catch (e) {
        console.error(e);
        setProcess('error');
      }
    };

    updateData();
  }, [id, dataType, clearError, getComic, getCharacter, setProcess]);

  return (
    <>
      <AppBanner />
      {setContent(process, Component, data)}
    </>
  );
};

export default SinglePage;
