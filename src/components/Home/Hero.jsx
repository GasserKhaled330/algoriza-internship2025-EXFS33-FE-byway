import React from 'react';
import BannerImage from '/banner-img.webp';

const Hero = () => {
	return (
		<section className="grid grid-cols-2 items-center justify-items-center mb-8">
			<div className="max-w-[450px] h-full flex flex-col items-start justify-center gap-5">
				<h1 className="text-[#0F172A] font-bold text-4xl">
					Unlock Your Potential with Byway
				</h1>
				<p className="text-[#334155] text-[16px]">
					Welcome to Byway, where learning knows no bounds. We believe that
					education is the key to personal and professional growth, and we're
					here to guide you on your journey to success.
				</p>
				<button className="min-w-[170px] bg-[#3B82F6] text-white text-sm font-medium p-2 rounded-md cursor-pointer">
					Start your journy
				</button>
			</div>
			<div>
				<img src={BannerImage} alt="banner image" />
			</div>
		</section>
	);
};

export default Hero;
