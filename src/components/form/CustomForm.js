import {useForm} from 'react-hook-form';
import useMarvelService from '../../services/MarvelService';
import './form.scss';

const CustomForm = () => {
  const {getCharacterByName} = useMarvelService();
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();

  const onSubmit = data => getCharacterByName(data.characterName);
  console.log(watch('example'));
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
        </form>
        {errors.characterName && (
          <div className='custom__errors'>
            {errors.characterName.type === 'required' ? 'This field is required' : 'Minimum length is 2 characters'}
          </div>
        )}
      </div>
    </>
  );
};

export default CustomForm;
