import React, { useState } from 'react';
import Logo from '/logo.svg';
import SearchBar from './SearchBar.jsx';
import { Link } from 'react-router-dom';
import {
	isAuthenticatedAtom,
	userAtom,
	logoutAtom,
} from '../Atoms/authAtoms.js';
import { useAtomValue, useSetAtom } from 'jotai';
import { ShoppingCart, LogOut, Menu } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import Cart from '../api/Cart.js';
import Loader from './Common/Loader.jsx';

const Navbar = () => {
	const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
	const setLogout = useSetAtom(logoutAtom);
	const isAuthenticated = useAtomValue(isAuthenticatedAtom);
	const user = useAtomValue(userAtom);

	const handleSearch = (term) => {
		console.log('Searching for:', term);
	};

	const toggleMobileMenu = () => {
		setIsMobileMenuOpen(!isMobileMenuOpen);
	};

	const {
		isError,
		isLoading,
		data: cartCount,
	} = useQuery({
		queryKey: ['cartCount'],
		queryFn: Cart.getCartItemsCount,
		enabled: isAuthenticated && user.roles.includes('User'),
	});

	if (isLoading) return <Loader />;
	if (isError) return <p>An error occurred while fetching cart data.</p>;

	return (
		<nav className="container min-h-[70px]">
			<div className="flex flex-wrap items-center justify-between py-4 sm:justify-normal sm:flex-nowrap">
				<Link to="/">
					<div className="flex items-center mr-2">
						<img
							src={Logo}
							alt="Byway Logo"
							loading="lazy"
							className="w-8 h-8"
						/>
						<span className="text-2xl font-semibold">Byway</span>
					</div>
				</Link>
				<button
					onClick={toggleMobileMenu}
					type="button"
					className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
					aria-controls="navbar-default"
					aria-expanded={isMobileMenuOpen}>
					<span className="sr-only">Open main menu</span>
					<Menu />
				</button>

				<div
					className={`${
						isMobileMenuOpen ? 'block' : 'hidden'
					} flex flex-col w-full mt-4 transition duration-300 sm:flex sm:flex-row sm:items-center sm:ml-2 sm:mt-0`}
					id="navbar-default">
					<div className="flex flex-col gap-y-4 grow shrink px-4 sm:flex-row sm:px-0">
						<SearchBar onSearch={handleSearch} placeHolder="Search Courses" />

						<Link
							className="p-2 border border-[#334155] rounded-md text-black/60 text-center transition duration-200  hover:text-black/80 hover:ease-in-out focus:text-black/80 active:text-black/80 motion-reduce:transition-none sm:border-none sm:mt-0"
							to="/courses"
							onClick={() => setIsMobileMenuOpen(false)}>
							Courses
						</Link>
					</div>

					{isAuthenticated && user.roles.includes('User') ? (
						<div className="flex gap-x-4 items-center justify-center">
							<div title="shopping cart" className="relative cursor-pointer">
								<Link to={'/cart'}>
									<ShoppingCart
										strokeWidth={1.5}
										className="w-6 h-6 text-gray-700"
									/>
									{cartCount > 0 && (
										<span className="bg-red-600 text-white text-xs rounded-full  w-5 h-5 flex items-center justify-center  ring-2 ring-white absolute top-0 right-0 transform -translate-y-1/2 translate-x-1/2">
											{cartCount > 9 ? '9+' : cartCount}
										</span>
									)}
								</Link>
							</div>

							<button
								title="logout"
								className="cursor-pointer"
								onClick={() => setLogout()}>
								<LogOut strokeWidth={1.5} />
							</button>

							<span className="flex justify-center items-center size-8 text-lg text-bold text-white font-medium border border-gray-200 rounded-full bg-[#334155] cursor-pointer">
								{user?.name[0].toUpperCase()}
							</span>
						</div>
					) : (
						<div className="flex flex-col gap-y-4 p-4 mt-4 border-gray-100 rounded-lg bg-gray-50 sm:bg-transparent sm:justify-between sm:shrink-0 sm:flex-row sm:space-x-4 sm:mt-0 sm:p-0 sm:border-0">
							<Link
								className="text-[#334155] text-center border border-[#334155] rounded-md px-4 py-1 transition duration-300 hover:text-white hover:bg-[#334155] sm:px-2"
								to="/signin"
								aria-label="Sign In"
								onClick={() => setIsMobileMenuOpen(false)}>
								Sign In
							</Link>

							<Link
								className="bg-[#334155] text-white  text-center border border-[#334155] px-4 py-1  rounded-md transition duration-300 hover:text-black hover:bg-white sm:px-2"
								to="/signup"
								aria-label="Sign Up"
								onClick={() => setIsMobileMenuOpen(false)}>
								Sign Up
							</Link>
						</div>
					)}
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
