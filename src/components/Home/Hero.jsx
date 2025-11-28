import React from 'react';
import BannerImage from '/banner-img.webp';
import { Link } from 'react-router-dom';

const Hero = () => {
	return (
		<section className="container grid grid-cols-1 md:grid-cols-2 items-center justify-items-center mb-8">
			<div className="h-full flex flex-col md:items-start justify-center gap-5">
				<h1 className="text-[#0F172A] font-bold text-4xl">
					Unlock Your Potential
					<br /> with Byway
				</h1>
				<p className="text-[#334155] text-[16px]">
					Welcome to Byway, where learning knows no bounds. We believe that
					education is the key to personal and professional growth, and we're
					here to guide you on your journey to success.
				</p>
				<div>
					<Link to="/courses">
						<button className="min-w-[170px] bg-[#3B82F6] text-white text-sm font-medium p-2 rounded-md cursor-pointer transation duration-300 hover:scale-105">
							Start your journy
						</button>
					</Link>
				</div>
			</div>
			<div>
				<img src={BannerImage} alt="banner image" />
			</div>
		</section>
	);
};

export default Hero;
