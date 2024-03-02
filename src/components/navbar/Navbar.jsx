import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { AuthContext } from '../../context/AuthContext';
import './navbar.scss';
import { useContext } from 'react';
import userImg from '../../assets/images/user.png';

function Navbar() {
	const { currentUser } = useContext(AuthContext);
	return (
		<nav className='navbar'>
			<div className='user-info'>
				<img src={userImg} alt='user avatar' />
				<p>{currentUser?.displayName}</p>
			</div>
			<div>
				<button onClick={() => signOut(auth)}>Logout</button>
			</div>
		</nav>
	);
}

export default Navbar;
