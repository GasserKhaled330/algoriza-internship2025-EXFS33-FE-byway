import React, { useState } from 'react';
import SignupImg from '../assets/signup-img.jpg';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { setAuthAtom } from '../Atoms/authAtoms.js';
import { useSetAtom } from 'jotai';
import { useMutation } from '@tanstack/react-query';
import auth from '../api/auth.js';
import toast from 'react-hot-toast';
import Spinner from '../components/Common/Spinner.jsx';

const SignUp = () => {
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [userName, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const setAuth = useSetAtom(setAuthAtom);
	const navigate = useNavigate();

	const reset = () => {
		setFirstName('');
		setLastName('');
		setUserName('');
		setEmail('');
		setPassword('');
		setConfirmPassword('');
	};

	const validatePasswordAndConfirmPassword = () => {
		return password !== confirmPassword;
	};

	const mutation = useMutation({
		mutationKey: ['register'],
		mutationFn: (newUser) => auth.register(newUser),
		onSuccess: (data) => {
			const { token, userId, userName, isAuthenticated, roles, expiresOn } =
				data;
			setAuth({
				token,
				expiresOn,
				user: { id: userId, name: userName, roles },
				isAuthenticated,
			});
			reset();
			navigate('/');
			toast.success(
				<p className="text-sm font-medium">
					Your account created successfully!!!.
					<br /> check your email.
				</p>
			);
		},
		onError: (error) => {
			console.log(error);
			toast.error(
				<p className="text-sm font-medium">
					{error?.response.data ||
						'Register failed. Please check your credentials.'}
				</p>
			);
		},
	});

	const HandleFormSubmit = (e) => {
		e.preventDefault();
		const result = validatePasswordAndConfirmPassword();
		if (result) {
			document.getElementById('error-result').textContent =
				'The password and confirmation password do not match.';
		} else {
			mutation.mutate({
				firstName,
				lastName,
				userName,
				email,
				password,
				confirmPassword,
			});
		}
	};

	return (
		<div className="min-h-175 grid grid-cols-1  md:grid-cols-2">
			<img
				src={SignupImg || 'https://placehold.co/1900x1200'}
				alt="welcome signup image"
				className="hidden md:block min-h-full object-cover"
				loading="lazy"
			/>

			{/* sign up form */}
			<form
				className="flex flex-col justify-center  p-5"
				onSubmit={HandleFormSubmit}>
				{/* header */}
				<h2 className="text-center text-2xl font-bold mb-8">
					Create Your Account
				</h2>
				{/* sign up form */}
				<div className="grid">
					{/* full name */}
					<div className="grid grid-cols-2 gap-4 mb-2">
						<div>
							<label
								htmlFor="firstName"
								className="block text-gray-700 text-sm font-medium mb-2">
								First Name
							</label>
							<input
								type="text"
								id="firstName"
								name="firstName"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								maxLength={50}
								required
								autoComplete="firstName"
								className="text-sm outline-gray-300 outline-offset-1 outline border-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
							/>
						</div>
						<div>
							<label
								htmlFor="lastName"
								className="block text-gray-700 text-sm font-medium mb-2">
								Last Name
							</label>
							<input
								type="text"
								id="lastName"
								name="lastName"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								maxLength={50}
								required
								autoComplete="lastName"
								className="text-sm outline-gray-300 outline-offset-1 outline border-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
							/>
						</div>
					</div>
					{/* user name */}
					<div>
						<div className="mb-2">
							<label
								htmlFor="userName"
								className="block text-gray-700 text-sm font-medium mb-2">
								User Name
							</label>
							<input
								type="text"
								id="userName"
								name="userName"
								value={userName}
								onChange={(e) => setUserName(e.target.value)}
								maxLength={50}
								required
								autoComplete="userName"
								className="text-sm outline-gray-300 outline-offset-1 outline border-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
							/>
						</div>
					</div>
					{/* email */}
					<div>
						<div className="mb-2">
							<label
								htmlFor="email"
								className="block text-gray-700 text-sm font-medium mb-2">
								Email
							</label>
							<input
								type="email"
								id="email"
								name="email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								autoComplete="email"
								className="text-sm outline-gray-300 outline-offset-1 outline border-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
							/>
						</div>
					</div>
					{/* password and confirm password */}
					<div className="grid grid-cols-2 gap-4 mb-4">
						<div>
							<label
								htmlFor="password"
								className="block text-gray-700 text-sm font-medium mb-2">
								Password
							</label>
							<input
								type="password"
								id="password"
								name="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$"
								title="Password must at least 8 characters, contain 1 uppercase, 1 lowercase, 1 digit, 1 special character (!@#$%^&*)"
								required
								autoComplete="firstName"
								className="text-sm outline-gray-300 outline-offset-1 outline border-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
							/>
						</div>
						<div>
							<label
								htmlFor="confirmPassword"
								className="block text-gray-700 text-sm font-medium mb-2">
								Confirm Password
							</label>
							<input
								type="password"
								id="confirmPassword"
								name="confirmPassword"
								value={confirmPassword}
								onChange={(e) => setConfirmPassword(e.target.value)}
								required
								autoComplete="lastName"
								className="text-sm outline-gray-300 outline-offset-1 outline border-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-blue-500"
							/>
						</div>
					</div>
					{/* create account button */}
					<div className="flex items-center mb-2">
						<button
							type="submit"
							className="flex w-1/3 justify-center items-center rounded-md bg-gray-950 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs cursor-pointer hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
							{mutation.isPending ? (
								<p className="flex justify-center items-center">
									<Spinner width={20} height={20} />
									<span className="ml-2">Create Account</span>
								</p>
							) : (
								'Create Account'
							)}
							<ArrowRight strokeWidth={3} size={16} className="ml-2" />
						</button>
					</div>
				</div>
				{/* social media */}
				<div>
					<div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-[#94A3B8] after:mt-0.5 after:flex-1 after:border-t after:border-[#94A3B8]">
						<p className="mx-4 mb-0 text-center text-sm font-semibold dark:text-[#94A3B8]">
							Sign up with
						</p>
					</div>
					<div>
						<div className="grid grid-cols-3 gap-4">
							<button className="min-w-1/3 flex justify-center items-center border-[#B2B5C4] border-1 rounded-md px-1 py-1.5 sm:px-3  cursor-pointer hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
								<svg
									className="size-6 fill-blue-600"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512">
									<path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376 82.7 476.8 194.2 504.5l0-170.3-52.8 0 0-78.2 52.8 0 0-33.7c0-87.1 39.4-127.5 125-127.5 16.2 0 44.2 3.2 55.7 6.4l0 70.8c-6-.6-16.5-1-29.6-1-42 0-58.2 15.9-58.2 57.2l0 27.8 83.6 0-14.4 78.2-69.3 0 0 175.9C413.8 494.8 512 386.9 512 256z" />
								</svg>
								<span className="text-sm/6 text-blue-600 mx-1">Facebook</span>
							</button>
							<button className="min-w-1/3 flex justify-center items-center border-[#B2B5C4] border-1 rounded-md px-1 py-1.5 sm:px-3  cursor-pointer hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
								<svg
									className="size-6 fill-red-600"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 512 512">
									<path d="M500 261.8C500 403.3 403.1 504 260 504 122.8 504 12 393.2 12 256S122.8 8 260 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9c-88.3-85.2-252.5-21.2-252.5 118.2 0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9l-140.8 0 0-85.3 236.1 0c2.3 12.7 3.9 24.9 3.9 41.4z" />
								</svg>
								<span className="text-sm/6 text-red-600 mx-1">Google</span>
							</button>
							<button className="min-w-1/3 flex justify-center items-center border-[#B2B5C4] border-1 rounded-md px-1 py-1.5 sm:px-3  cursor-pointer hover:bg-gray-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-600">
								<svg
									className="size-6 fill-gray-900"
									xmlns="http://www.w3.org/2000/svg"
									viewBox="0 0 448 512">
									<path d="M0 32l214.6 0 0 214.6-214.6 0 0-214.6zm233.4 0l214.6 0 0 214.6-214.6 0 0-214.6zM0 265.4l214.6 0 0 214.6-214.6 0 0-214.6zm233.4 0l214.6 0 0 214.6-214.6 0 0-214.6z" />
								</svg>
								<span className="text-sm/6 text-gray-900 mx-1">Microsoft</span>
							</button>
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default SignUp;
