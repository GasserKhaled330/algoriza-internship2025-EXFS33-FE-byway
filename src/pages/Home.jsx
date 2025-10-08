import React from 'react';
import Navbar from '../components/Navbar.jsx';
import { Outlet } from 'react-router-dom';
import Footer from '../components/Home/Footer.jsx';

const Home = () => {
	return (
		<>
			<div className="min-h-screen">
				<Navbar />
				<Outlet />
				<Footer />
			</div>
		</>
	);
};

export default Home;
