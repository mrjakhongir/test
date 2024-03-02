import { Link, useNavigate } from 'react-router-dom';
import './register.scss';
import { useState } from 'react';
import { auth, db } from '../../firebase';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

function Register() {
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	async function handleChange(e) {
		e.preventDefault();
		const username = e.target['username'].value;
		const email = e.target['email'].value;
		const password = e.target['password'].value;

		try {
			setLoading(true);
			const res = await createUserWithEmailAndPassword(auth, email, password);
			await updateProfile(res.user, { displayName: username });
			await setDoc(doc(db, 'users', res.user.uid), {
				uid: res.user.uid,
				displayName: username,
				email,
			});
			await setDoc(doc(db, 'userChats', res.user.uid), {});
			navigate('/');
		} catch (err) {
			console.log(err.message);
			setError(true);
			setLoading(false);
		}
	}

	return (
		<div className='register'>
			<div className='register__inner'>
				<h1>Sign Up to Telegram</h1>
				<p>Please enter your username, email and password.</p>
				<form onSubmit={handleChange}>
					<fieldset>
						<legend>Username</legend>
						<input
							type='text'
							name='username'
							id='username'
							placeholder='Your username...'
							required
						/>
					</fieldset>
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
					<button disabled={loading}>{loading ? 'Loading...' : 'Sign Up'}</button>
					{error && <span>Something went wrong</span>}
				</form>
				<p>
					Already have an account? <Link to='/signin'>Sign In</Link>
				</p>
			</div>
		</div>
	);
}

export default Register;
