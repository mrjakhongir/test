import React from 'react';
import Search from '../search/Search';
import Navbar from '../navbar/Navbar';
import Chats from '../chats/Chats';

import './sidebar.scss';

function Sidebar() {
	return (
		<aside className='sidebar'>
			<Navbar />
			<Search />
			<Chats />
		</aside>
	);
}

export default Sidebar;
