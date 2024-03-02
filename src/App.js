import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/home/Home';
import Login from './pages/login/Login';
import Register from './pages/register/Register';

import { useContext } from 'react';
import { AuthContext } from './context/AuthContext';

function App() {
	const { currentUser } = useContext(AuthContext);

	const ProtectedRoute = ({ children }) => {
		if (!currentUser) {
			return <Navigate to='/login' />;
		}

		return children;
	};
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/'>
					<Route
						index
						element={
							<ProtectedRoute>
								<Home />
							</ProtectedRoute>
						}
					/>
					<Route path='register' element={<Register />} />
					<Route path='login' element={<Login />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
