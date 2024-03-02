import { useContext } from 'react';
import Input from '../input/Input';
import Messages from '../messages/Messages';
import './chat.scss';
import { ChatContext } from '../../context/ChatContext';

function Chat() {
	const { data } = useContext(ChatContext);
	return (
		<main className='chat'>
			<div className='chat__user-info'>
				<p>{data.user?.displayName}</p>
			</div>
			<Messages />
			<Input />
		</main>
	);
}

export default Chat;
