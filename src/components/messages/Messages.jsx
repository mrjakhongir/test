import { useContext, useEffect, useState } from 'react';
import Message from '../message/Message';
import { ChatContext } from '../../context/ChatContext';
import './messages.scss';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../../firebase';

function Messages() {
	const [messages, setMessages] = useState([]);
	const { data } = useContext(ChatContext);

	useEffect(() => {
		const unSub = onSnapshot(doc(db, 'chats', data.chatId), (doc) => {
			doc.exists() && setMessages(doc.data().messages);
		});

		return () => {
			unSub();
		};
	}, [data.chatId]);

	return (
		<div className='messages'>
			{messages.map((msg) => (
				<Message message={msg} key={msg.id} />
			))}
		</div>
	);
}

export default Messages;
