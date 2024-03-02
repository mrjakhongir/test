import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/'>
					<Route index element={<Home />} />
					<Route path='register' element={<Register />} />
					<Route path='login' element={<Login />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
