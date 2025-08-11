import {useForm} from 'react-hook-form';
import {useState} from 'react';
import {Link} from 'react-router-dom';
// import useMarvelService from '../../services/MarvelService';
import './form.scss';

const CustomForm = () => {
  const [characterName, setCharacterName] = useState(null);
  // const {getCharacterByName} = useMarvelService();
  const {
    register,
    handleSubmit,
    formState: {errors},
  } = useForm();

  const onSubmit = data => setCharacterName(data.characterName);
  const renderMessage = () => {
    if (errors.characterName) {
      return {
        text: errors.characterName.type === 'required' ? 'This field is required' : 'Minimum length is 2 characters',
        type: 'error',
      };
    }
    if (characterName) {
      return {
        text: `There is! Visit ${characterName} page?`,
        type: 'success',
      };
    }
    return {text: '', type: ''};
  };
  const message = renderMessage();
  return (
    <>
      <div className='custom__form__container'>
        <p className='custom__form__name'>Or find a character by name:</p>
        <form onSubmit={handleSubmit(onSubmit)} className='custom__form'>
          <input
            {...register('characterName', {required: true, minLength: 2})}
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
                <Link to={`/character/${characterName}`}>TO PAGE </Link>
              </div>
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default CustomForm;
