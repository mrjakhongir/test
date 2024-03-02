import { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { ChatContext } from '../../context/ChatContext';
import { v4 as uuid } from 'uuid';
import './input.scss';
import {
	Timestamp,
	arrayUnion,
	doc,
	serverTimestamp,
	updateDoc,
} from 'firebase/firestore';
import { db } from '../../firebase';

function Input() {
	const [text, setText] = useState('');

	const { currentUser } = useContext(AuthContext);
	const { data } = useContext(ChatContext);
	function handleKey(e) {
		e.code === 'Enter' && handleSend();
	}
	async function handleSend() {
		setText('');
		await updateDoc(doc(db, 'chats', data.chatId), {
			messages: arrayUnion({
				id: uuid(),
				text,
				senderId: currentUser.uid,
				date: Timestamp.now(),
			}),
		});

		await updateDoc(doc(db, 'userChats', currentUser.uid), {
			[data.chatId + '.lastMessage']: {
				text,
			},
			[data.chatId + '.date']: serverTimestamp(),
		});

		await updateDoc(doc(db, 'userChats', data.user.uid), {
			[data.chatId + '.lastMessage']: {
				text,
			},
			[data.chatId + '.date']: serverTimestamp(),
		});
	}
	return (
		<div className='input'>
			<input
				type='text'
				placeholder='Type something...'
				onChange={(e) => setText(e.target.value)}
				onKeyDown={handleKey}
				value={text}
			/>
		</div>
	);
}

export default Input;
