import {useForm} from 'react-hook-form';
import {useState} from 'react';
import {Link} from 'react-router-dom';

import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './form.scss';

const CustomForm = () => {
  const [characterName, setCharacterName] = useState(null);
  const {error, getCharacterByName, setProcess} = useMarvelService();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = async data => {
    setProcess('loading');
    try {
      const char = await getCharacterByName(data.characterName);
      if (char.length > 0) {
        setCharacterName(char[0]);
        setProcess('confirmed');
      } else {
        setCharacterName(null);
        setProcess('error');
      }
    } catch (e) {
      setCharacterName(null);
      setProcess('error');
    }
  };

  const message = errors.characterName
    ? {
        text:
          errors.characterName.type === 'required'
            ? 'This field is required'
            : 'The character was not found. Check the name and try again',
        type: 'error',
      }
    : characterName
      ? {text: `There is! Visit ${characterName.name} page?`, type: 'success'}
      : {text: '', type: ''};

  return (
    <div className='custom__form__container'>
      <p className='custom__form__name'>Or find a character by name:</p>
      <form onSubmit={handleSubmit(onSubmit)} className='custom__form'>
        <input
          {...register('characterName', {
            required: 'This field is required',
            minLength: {
              value: 2,
              message: 'Minimum length is 2 characters',
            },
            validate: async name => {
              const char = await getCharacterByName(name);
              return char.length > 0 || 'The character was not found. Check the name and try again';
            },
          })}
          onChange={() => setProcess('loading')}
          className='custom__form__input'
          type='text'
          placeholder='Enter name'
        />
        <button className='button button__main' type='submit' disabled={message.type === 'success'}>
          <div className='inner'>Find</div>
        </button>
        {message.text && <div className={`custom__message ${message.type}`}>{message.text}</div>}
        {message.type === 'success' && characterName && (
          <Link to={`/characters/${characterName.id}`} className='button button__secondary'>
            <div className='inner'>TO PAGE</div>
          </Link>
        )}
      </form>
      {error && (
        <div className='char__search-critical-error'>
          <ErrorMessage />
        </div>
      )}
    </div>
  );
};

export default CustomForm;
