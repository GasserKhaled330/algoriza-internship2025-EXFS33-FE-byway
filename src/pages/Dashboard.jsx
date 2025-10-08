import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../components/Dashboard/SideBar.jsx';
// import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

// const queryClient = new QueryClient();

const Dashboard = () => {
	return (
		<div className="min-h-screen grid grid-cols-[256px_auto] gap-5 ">
			<SideBar />
			{/* <QueryClientProvider client={queryClient}> */}
			<Outlet />
			{/* </QueryClientProvider> */}
		</div>
	);
};

export default Dashboard;
