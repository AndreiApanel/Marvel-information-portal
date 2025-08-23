import {useState} from 'react';

import RandomChar from '../randomChar/RandomChar';
import CharList from '../charList/CharList';
import CharInfo from '../charInfo/CharInfo';
import ErrorBoundary from '../errorBoundary/ErrorBoundary';
import CustomForm from '../form/CustomForm';
import decoration from '../../pictures/vision.png';

const MainPage = () => {
  const [selectedChar, setChar] = useState(null);
  const onCharSelected = id => {
    setChar(id);
  };
  return (
    <>
      <ErrorBoundary>
        <RandomChar />
      </ErrorBoundary>
      <div className='char__content'>
        <ErrorBoundary>
          <CharList onCharSelected={onCharSelected} />
        </ErrorBoundary>
        <div className='char__form'>
          <ErrorBoundary>
            <CharInfo charId={selectedChar} />
          </ErrorBoundary>
          <ErrorBoundary>
            <CustomForm />
          </ErrorBoundary>
        </div>
      </div>

      <img className='bg-decoration' src={decoration} alt='vision' />
    </>
  );
};

export default MainPage;
