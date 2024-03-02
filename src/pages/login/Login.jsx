import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import './login.scss';

function Login() {
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();
	async function handleSubmit(e) {
		e.preventDefault();
		const email = e.target['email'].value;
		const password = e.target['password'].value;

		try {
			setLoading(true);
			await signInWithEmailAndPassword(auth, email, password);
			navigate('/');
		} catch (err) {
			setError(true);
			setLoading(false);
		}
	}
	return (
		<div className='register'>
			<div className='register__inner'>
				<h1>Sign In to Telegram</h1>
				<p>Please enter your email and password.</p>
				<form onSubmit={handleSubmit}>
					<fieldset>
						<legend>Email</legend>
						<input
							type='email'
							name='email'
							id='email'
							placeholder='Your email...'
							required
						/>
					</fieldset>
					<fieldset>
						<legend>Password</legend>
						<input
							type='password'
							name='password'
							id='password'
							placeholder='Your password...'
							required
						/>
					</fieldset>
					<button disabled={loading}>
						{loading ? 'Signig in...' : 'Sign In'}
					</button>
					{error && <span>Incorrect email or password</span>}
				</form>
				<p>
					Don't have an account yet? <Link to='/register'>Sign Up</Link>
				</p>
			</div>
		</div>
	);
}

export default Login;
