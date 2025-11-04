import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/Dashboard/SideBar.jsx';

const Dashboard = () => {
	return (
		<div className="min-h-screen grid grid-cols-[256px_auto] gap-5 ">
			<SideBar />
			<Outlet />
		</div>
	);
};

export default Dashboard;
