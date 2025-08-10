import {useForm} from 'react-hook-form';

import './form.scss';

const CustomForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: {errors},
  } = useForm();

  const onSubmit = data => console.log(data);
  console.log(watch('example'));
  return (
    <>
      <div className='custom__form__container'>
        <p className='custom__form__name'>Or find a character by name:</p>
        <form onSubmit={handleSubmit(onSubmit)} className='custom__form'>
          <input
            {...register('exampleRequired', {required: true, minLength: 2})}
            className='custom__form__input'
            type='text'
            placeholder='Enter name'
          />
          <button className='button button__main' type='submit'>
            <div className='inner'>Find</div>
          </button>
        </form>
        {errors.exampleRequired && <span>This field is required</span> ? (
          <div className='custom__errors'>This field is required</div>
        ) : null}
      </div>
    </>
  );
};

export default CustomForm;
