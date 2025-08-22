import {useForm} from 'react-hook-form';
import {useState} from 'react';
import {Link} from 'react-router-dom';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import './form.scss';

const CustomForm = () => {
  const [characterName, setCharacterName] = useState(null);
  const {error, getCharacterByName} = useMarvelService();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = async data => {
    const char = await getCharacterByName(data.characterName);
    setCharacterName(char[0]);
  };
  console.log(characterName);

  const renderMessage = () => {
    if (errors.characterName) {
      return {
        text:
          errors.characterName.type === 'required'
            ? 'This field is required'
            : 'The character was not found. Check the name and try again',
        type: 'error',
      };
    }
    if (characterName) {
      return {
        text: `There is! Visit ${characterName.name} page?`,
        type: 'success',
      };
    }
    return {text: '', type: ''};
  };
  const message = renderMessage();
  const errorMessage = error ? (
    <div className='char__search-critical-error'>
      <ErrorMessage />
    </div>
  ) : null;
  return (
    <>
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
            className='custom__form__input'
            type='text'
            placeholder='Enter name'
          />
          <button className='button button__main' type='submit'>
            <div className='inner'>Find</div>
          </button>

          {message.text && <div className={`custom__message ${message.type}`}>{message.text}</div>}
          {message.type === 'success' && (
            <button className='button button__secondary' type='submit'>
              <div className='inner'>
                {' '}
                <Link to={`/character/${characterName.id}`}>TO PAGE </Link>
              </div>
            </button>
          )}
        </form>
        {errorMessage}
      </div>
    </>
  );
};

export default CustomForm;
