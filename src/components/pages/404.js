import ErrorMessage from '../errorMessage/ErrorMessage';
import {Link} from 'react-router-dom';

const Page404 = () => {
	return (

			<div >
		<ErrorMessage />
			<p style={{'textAlign': 'center','fontWeight': 'bold','fontSize': '24px'}}>Page Not Found</p>
			<Link style={{'display': 'block', 'fontSize': '24px', 'textAlign': 'center', 'fontWeight': 'bold'}}>
				Go back to Home
			</Link>
		</div>
	
	);
}
export default Page404;