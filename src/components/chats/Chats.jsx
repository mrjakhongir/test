import './chats.scss';
import userImg from '../../assets/images/user.png';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

function Chats() {
	const [chats, setChats] = useState([]);

	const { currentUser } = useContext(AuthContext);
	const { dispatch } = useContext(ChatContext);

	useEffect(() => {
		const getChats = () => {
			const unsub = onSnapshot(doc(db, 'userChats', currentUser.uid), (doc) => {
				setChats(doc.data());
			});

			return () => {
				unsub();
			};
		};

		currentUser.uid && getChats();
	}, [currentUser.uid]);

	function handleSelect(user) {
		dispatch({ type: 'CHANGE_USER', payload: user });
	}

	return (
		<div className='chats'>
			{Object.entries(chats)
				?.sort((a, b) => b[1].date - a[1].date)
				.map((chat) => (
					<div
						className='chats__user'
						key={chat[0]}
						onClick={() => handleSelect(chat[1].userInfo)}>
						<img src={userImg} alt='' />
						<div className='chats__user_info'>
							<p>{chat[1].userInfo.displayName}</p>
							<span>{chat[1].lastMessage?.text}</span>
						</div>
					</div>
				))}
		</div>
	);
}

export default Chats;
