import { Link } from 'react-router-dom';
import './login.scss';

function Login() {
	return (
		<div className='register'>
			<div className='register__inner'>
				<h1>Sign In to Telegram</h1>
				<p>Please enter your email and password.</p>
				<form>
					<fieldset>
						<legend>Email</legend>
						<input
							type='email'
							name='email'
							id='email'
							placeholder='Your email...'
							reduired
						/>
					</fieldset>
					<fieldset>
						<legend>Password</legend>
						<input
							type='password'
							name='password'
							id='password'
							placeholder='Your password...'
							reduired
						/>
					</fieldset>
					<button>Sign In</button>
				</form>
				<p>
					Don't have an account yet? <Link to='/register'>Sign Up</Link>
				</p>
			</div>
		</div>
	);
}

export default Login;
