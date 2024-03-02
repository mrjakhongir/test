import React from 'react';
import Search from '../search/Search';
import Navbar from '../navbar/Navbar';
import Chats from '../chats/Chats';

import './sidebar.scss';

function Sidebar() {
	return (
		<div>
			<Navbar />
			<Search />
			<Chats />
		</div>
	);
}

export default Sidebar;
