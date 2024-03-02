import { useContext, useEffect, useRef } from 'react';
import './message.scss';
import { ChatContext } from '../../context/ChatContext';
import { AuthContext } from '../../context/AuthContext';

function Message({ message }) {
	const { currentUser } = useContext(AuthContext);
	const { data } = useContext(ChatContext);

	const ref = useRef();

	useEffect(() => {
		ref.current?.scrollIntoView({ behavior: 'smooth' });
	}, [message]);
	return (
		<div
			ref={ref}
			className={`message ${message.senderId === currentUser.uid && 'owner'}`}>
			<div className='message__content'>
				<p>{message.text}</p>
			</div>
		</div>
	);
}

export default Message;
