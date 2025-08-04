import './form.scss';

const CustomForm = () => {
  return (
    <>
      <div className='custom__form__container'>
        <p className='custom__form__name'>Or find a character by name:</p>
        <form className='custom__form'>
          <input className='custom__form__input' type='text' placeholder='Enter name' />
          <button className='button button__main' type='submit'>
            <div className='inner'>Find</div>
          </button>
        </form>
      </div>
    </>
  );
};

export default CustomForm;
