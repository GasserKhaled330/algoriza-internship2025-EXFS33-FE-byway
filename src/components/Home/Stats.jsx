import React from 'react';
import NumberAnimated from '../Common/NumberAnimated';

const Stats = () => {
	return (
		<section className="bg-[#F8FAFC] mb-8 min-h-[170px] grid grid-cols-1 gap-y-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 h-full items-center justify-items-center py-4">
			<div className="flex flex-col justify-center items-center relative  md:after:content-['']  md:after:border-r-2 after:border-[#E2E8F0] after:absolute after:right-[-3em] after:bottom-[-.3em] after:h-12">
				<div className="flex items-center text-[#0F172A] font-semibold text-3xl">
					<NumberAnimated num={250} />+
				</div>
				<span className="text-[#0F172A] text-sm">
					Courses by our best mentors
				</span>
			</div>

			<div className="flex flex-col justify-center items-center relative  md:after:content-['']  md:after:border-r-2 after:border-[#E2E8F0] after:absolute after:right-[-3em] after:bottom-[-.3em] after:h-12">
				<div className="flex items-center text-[#0F172A] font-semibold text-3xl">
					<NumberAnimated num={1000} />+
				</div>
				<span className="text-[#0F172A] text-sm">
					Courses by our best mentors
				</span>
			</div>

			<div className="flex flex-col justify-center items-center relative  md:after:content-['']  md:after:border-r-2 after:border-[#E2E8F0] after:absolute after:right-[-3em] after:bottom-[-.3em] after:h-12">
				<div className="flex items-center text-[#0F172A] font-semibold text-3xl">
					<NumberAnimated num={15} />
				</div>
				<span className="text-[#0F172A] text-sm">
					Courses by our best mentors
				</span>
			</div>

			<div className="flex flex-col justify-center items-center">
				<div className="flex items-center text-[#0F172A] font-semibold text-3xl">
					<NumberAnimated num={2400} />+
				</div>
				<span className="text-[#0F172A] text-sm">
					Courses by our best mentors
				</span>
			</div>
		</section>
	);
};

export default Stats;
