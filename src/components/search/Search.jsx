import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import './search.scss';
import userImg from '../../assets/images/user.png';
import {
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	serverTimestamp,
	setDoc,
	updateDoc,
	where,
} from 'firebase/firestore';
import { db } from '../../firebase';

function Search() {
	const [username, setUsername] = useState('');
	const [user, setUser] = useState(null);
	const [err, setErr] = useState(false);

	function handleKey(e) {
		e.code === 'Enter' && handleSearch();
	}

	async function handleSearch() {
		const q = query(
			collection(db, 'users'),
			where('displayName', '==', username)
		);

		try {
			const querySnapshot = await getDocs(q);
			querySnapshot.forEach((doc) => {
				setUser(doc.data());
			});
		} catch (err) {
			setErr(true);
		}
	}

	async function handleSelect() {
		const combinedId =
			currentUser.uid > user.uid
				? currentUser.uid + user.uid
				: user.uid + currentUser.uid;

		try {
			const res = await getDoc(doc(db, 'chats', combinedId));

			if (!res.exists()) {
				await setDoc(doc(db, 'chats', combinedId), { messages: [] });

				await updateDoc(doc(db, 'userChats', currentUser.uid), {
					[combinedId + '.userInfo']: {
						uid: user.uid,
						displayName: user.displayName,
					},
					[combinedId + '.date']: serverTimestamp(),
				});

				await updateDoc(doc(db, 'userChats', user.uid), {
					[combinedId + '.userInfo']: {
						uid: currentUser.uid,
						displayName: currentUser.displayName,
					},
					[combinedId + '.date']: serverTimestamp(),
				});
			}
		} catch (err) {
			console.log(err);
		}
		setUser(null);
		setUsername('');
	}

	const { currentUser } = useContext(AuthContext);
	return (
		<div className='search'>
			<div className='search__form'>
				<input
					type='text'
					placeholder='Search'
					onKeyDown={handleKey}
					onChange={(e) => setUsername(e.target.value)}
					value={username}
				/>
			</div>
			{err && <span>User not found!</span>}
			{user && (
				<div className='chats__user' onClick={handleSelect}>
					<img src={userImg} alt='user avatar' />
					<div className='chats__user_info'>
						<p>{user.displayName}</p>
					</div>
				</div>
			)}
		</div>
	);
}

export default Search;
