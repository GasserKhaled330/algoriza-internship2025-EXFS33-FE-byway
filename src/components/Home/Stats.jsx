import React from 'react';

const Stats = () => {
	return (
		<section className="bg-[#F8FAFC] mb-8 min-h-[170px] grid grid-cols-4 h-full items-center justify-items-center">
			<div className="flex flex-col justify-center items-center relative  after:content-['']  after:border-r-2 after:border-[#E2E8F0] after:absolute after:right-[-3em] after:bottom-[-.3em] after:h-12">
				<p className="text-[#0F172A] font-semibold text-3xl">250+</p>
				<span className="text-[#0F172A] text-sm">
					Courses by our best mentors
				</span>
			</div>
			<div className="flex flex-col justify-center items-center relative  after:content-['']  after:border-r-2 after:border-[#E2E8F0] after:absolute after:right-[-3em] after:bottom-[-.3em] after:h-12">
				<p className="text-[#0F172A] font-semibold text-3xl">1000+</p>
				<span className="text-[#0F172A] text-sm">
					Courses by our best mentors
				</span>
			</div>
			<div className="flex flex-col justify-center items-center relative  after:content-['']  after:border-r-2 after:border-[#E2E8F0] after:absolute after:right-[-3em] after:bottom-[-.3em] after:h-12">
				<p className="text-[#0F172A] font-semibold text-3xl">15</p>
				<span className="text-[#0F172A] text-sm">
					Courses by our best mentors
				</span>
			</div>
			<div className="flex flex-col justify-center items-center">
				<p className="text-[#0F172A] font-semibold text-3xl">2400+</p>
				<span className="text-[#0F172A] text-sm">
					Courses by our best mentors
				</span>
			</div>
		</section>
	);
};

export default Stats;
