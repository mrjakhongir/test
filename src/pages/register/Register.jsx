import { Link } from 'react-router-dom';
import './register.scss';

function Register() {
	return (
		<div className='register'>
			<div className='register__inner'>
				<h1>Sign Up to Telegram</h1>
				<p>Please enter your username, email and password.</p>
				<form>
					<fieldset>
						<legend>Username</legend>
						<input
							type='text'
							name='username'
							id='username'
							placeholder='Your username...'
							reduired
						/>
					</fieldset>
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
					<button>Sign Up</button>
				</form>
				<p>
					Already have an account? <Link to='/signin'>Sign In</Link>
				</p>
			</div>
		</div>
	);
}

export default Register;
