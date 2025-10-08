import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logo from '/logo.svg';
import { House, User, Folders, LogOut } from 'lucide-react';
import { useSetAtom } from 'jotai';
import { logoutAtom } from '../../Atoms/authAtoms.js';

const menuItems = [
	{ name: 'Home', icon: <House size={18} />, to: '/dashboard' },
	{
		name: 'Instructors',
		icon: <User size={18} />,
		to: '/dashboard/instructors',
	},
	{ name: 'Courses', icon: <Folders size={18} />, to: '/dashboard/courses' },
];

const SideBar = () => {
	// const [open, setOpen] = useState(true);
	const setLogout = useSetAtom(logoutAtom);

	const handleLogoutClick = () => {
		setLogout();
	};
	return (
		<>
			<aside className="flex flex-col bg-white shadow-md">
				<Link className="flex p-4" to="/dashboard">
					<img src={Logo} alt="Byway Logo" loading="lazy" />
					<span className="text-2xl font-semibold">Byway</span>
				</Link>
				<div className="flex justify-center items-center">
					<div className="flex flex-col min-w-[240px]">
						{menuItems.map((item) => (
							<NavLink
								to={item.to}
								key={item.name}
								className="flex items-center p-3 sidebar-link"
								end>
								<span className="mr-2">{item.icon}</span>
								<span>{item.name}</span>
							</NavLink>
						))}
						<div className="border-t border-gray-200 p-3 mt-2">
							<button
								className="flex items-center cursor-pointer"
								onClick={handleLogoutClick}>
								<LogOut color="#96A0B6" size={18} />
								<span className="text-[#96A0B6]">logout</span>
							</button>
						</div>
					</div>
				</div>
			</aside>
		</>
	);
};

export default SideBar;
