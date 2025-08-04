
import './form.scss';

const CustomForm = () => {
	return (
		<>
			<div className='custom__form__container'>
			<form className='custom__form'>
				<input className='custom__form__input' type='text' placeholder='Enter name' />
				<button className='custom__form__button' type='submit'><span>FIND</span>

				</button>
			</form>
			</div>
		</>

	);
}

export default CustomForm;