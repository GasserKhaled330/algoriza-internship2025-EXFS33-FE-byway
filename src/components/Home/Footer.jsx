import React from 'react';
import Facebook from '/facebook.png';
import Microsoft from '/microsoft.png';
import Github from '/github.png';
import Google from '/google.png';
import X from '/twitter.png';
import Logo from '/logo.svg';
import { Link } from 'react-router-dom';

const Footer = () => {
	const helpLinks = [
		{ name: 'Contact Us', href: '#' },
		{ name: 'Latest Articles', href: '#' },
		{ name: 'FAQ', href: '#' },
	];

	const programLinks = [
		{ name: 'Art & Design', href: '#' },
		{ name: 'Business', href: '#' },
		{ name: 'IT & Software', href: '#' },
		{ name: 'Languages', href: '#' },
		{ name: 'Programming', href: '#' },
	];

	const socialIcons = [
		{ name: 'facebook', Icon: Facebook, href: '#' },
		{ name: 'github', Icon: Github, href: '#' },
		{ name: 'google', Icon: Google, href: '#' },
		{ name: 'twitter', Icon: X, href: '#' },
		{ name: 'microsoft', Icon: Microsoft, href: '#' },
	];

	const LinkList = ({ title, links }) => (
		<div>
			<h4 className="text-xl font-bold mb-5">{title}</h4>
			<ul className="space-y-3">
				{links.map((link) => (
					<li key={link.name}>
						<a
							href={link.href}
							className="text-gray-400 hover:text-white transition duration-200 text-base">
							{link.name}
						</a>
					</li>
				))}
			</ul>
		</div>
	);
	return (
		<footer className="bg-[#1C2534] text-white">
			<div className="container mx-auto px-4 py-16">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
					<div>
						<div className="flex items-center mb-4">
							<div className="flex items-center">
								<img src={Logo} alt="by way logo" />
								<span className="text-3xl font-semibold">Byway</span>
							</div>
						</div>
						<p className="text-gray-400 text-sm mb-4 leading-relaxed">
							Empowering learners through accessible and engaging online
							education.
						</p>
						<p className="text-gray-400 text-sm leading-relaxed">
							Byway is a leading online learning platform dedicated to providing
							high-quality, flexible, and affordable educational experiences.
						</p>
					</div>

					<LinkList title="Get Help" links={helpLinks} />

					<LinkList title="Programs" links={programLinks} />

					<div>
						<h4 className="text-xl font-bold mb-5">Contact Us</h4>
						<div className="space-y-3 text-gray-400 text-sm">
							<p>
								<span className="font-medium text-white">Address:</span> 123
								Main Street, Anytown, CA 12345
							</p>
							<p>
								<span className="font-medium text-white">Tel:</span> +(123)
								456-7890
							</p>
							<p>
								<span className="font-medium text-white">Mail:</span>{' '}
								bywayedu@webkul.in
							</p>
						</div>

						{/* Social Icons */}
						<div className="flex space-x-3 mt-6">
							{socialIcons.map(({ name, Icon, href }) => (
								<Link
									key={name}
									href={href}
									className={`flex items-center justify-center w-8 h-8 rounded-full bg-white hover:bg-gray-200 transition duration-200`}
									aria-label={Icon.name}>
									<img src={Icon} alt={name} className={`w-4 h-4`} />
								</Link>
							))}
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
