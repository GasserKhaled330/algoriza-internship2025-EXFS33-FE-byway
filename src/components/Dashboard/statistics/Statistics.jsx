import React from 'react';
import { BellDot, User, NotebookText, Folders, Calendar } from 'lucide-react';
import SubscriptionLineChart from './SubscriptionLineChart.jsx';
import EntityPieChart from './EntityPieChart.jsx';
import { useQueries } from '@tanstack/react-query';
import Category from '../../../api/Category.js';
import Instructor from '../../../api/Instructor.js';
import Course from '../../../api/Course.js';
import Loader from '../../Common/Loader.jsx';

const Statistics = () => {
	const subscriptionData = [
		{ month: 'Jan', deposit: 120, withdraw: 50 },
		{ month: 'Feb', deposit: 150, withdraw: 100 },
		{ month: 'Mar', deposit: 170, withdraw: 150 },
		{ month: 'Apr', deposit: 90, withdraw: 110 },
		{ month: 'May', deposit: 200, withdraw: 170 },
		{ month: 'Jun', deposit: 250, withdraw: 180 },
		{ month: 'Jul', deposit: 300, withdraw: 190 },
		{ month: 'Aug', deposit: 280, withdraw: 300 },
		{ month: 'Sep', deposit: 320, withdraw: 400 },
		{ month: 'Oct', deposit: 310, withdraw: 200 },
		{ month: 'Nov', deposit: 330, withdraw: 300 },
		{ month: 'Dec', deposit: 400, withdraw: 350 },
	];

	const results = useQueries({
		queries: [
			{
				queryKey: ['categories'],
				queryFn: () => Category.getCategories(),
				gcTime: 1000 * 60 * 10,
			},
			{
				queryKey: ['instructors', 'count'],
				queryFn: () => Instructor.getInstructorsCount(),
				staleTime: 1000 * 60,
			},
			{
				queryKey: ['courses', 'count'],
				queryFn: () => Course.getCoursesCount(),
				staleTime: 1000 * 60,
			},
		],
	});

	const isLoading = results.some((query) => query.isLoading);

	if (isLoading) return <Loader width={100} height={100} />;

	const [categoriesQuery, instructorsQuery, coursesQuery] = results;
	const categories = categoriesQuery.data;
	const instructorsCount = instructorsQuery.data;
	const coursesCount = coursesQuery.data;

	const entityCounts = {
		instructors: instructorsCount,
		categories: categories?.length,
		courses: coursesCount,
	};

	return (
		<div className="container pb-4">
			<header className="flex justify-between items-center border-b-1 border-[#E2E6EE] h-24">
				<h1 className="text-3xl font-medium">Dashboard</h1>
				<span className="cursor-pointer">
					<BellDot size={24} />
				</span>
			</header>

			<main className="grid grid-rows-[110px_400px] gap-5 mt-5">
				<section className="grid grid-cols-3 gap-5">
					<div className="flex flex-col justify-between drop-shadow-md bg-[#FFFFFF] rounded-2xl px-6 py-4">
						<div className="flex justify-between">
							<p className="text-3xl font-bold">{entityCounts.instructors}</p>
							<span className="flex justify-center items-center w-10 h-10 bg-sky-100 rounded-md">
								<User color="#647FBC" size={30} />
							</span>
						</div>
						<p className="font-bold">Instructors</p>
					</div>
					<div className="flex flex-col justify-between drop-shadow-md bg-[#FFFFFF] rounded-2xl px-6 py-4">
						<div className="flex justify-between">
							<p className="text-3xl font-bold">{entityCounts.categories}</p>
							<span className="flex justify-center items-center w-10 h-10 bg-sky-100 rounded-md">
								<NotebookText color="#647FBC" size={30} />
							</span>
						</div>
						<p className="font-bold">Categories</p>
					</div>
					<div className="flex flex-col justify-between drop-shadow-md bg-[#FFFFFF] rounded-2xl px-6 py-4">
						<div className="flex justify-between">
							<p className="text-3xl font-bold">{entityCounts.courses}</p>
							<span className="flex justify-center items-center w-10 h-10 bg-sky-100 rounded-md">
								<Folders color="#647FBC" size={30} />
							</span>
						</div>
						<p className="font-bold">Courses</p>
					</div>
				</section>
				<section className="grid grid-cols-[_2fr_1fr] gap-5">
					<div className="flex flex-col justify-between drop-shadow-md bg-[#FFFFFF] rounded-2xl px-6 py-4">
						<div className="flex justify-between">
							<p className="text-2xl font-medium">Wallet</p>
							<span className="flex justify-center items-center w-35 bg-[#F4F7FE] text-[#A3AED0] rounded-md">
								<Calendar className="mr-2" color="#A3AED0" size={18} />
								This month
							</span>
						</div>
						<div>
							<SubscriptionLineChart data={subscriptionData} />
						</div>
					</div>

					<div className="flex flex-col justify-between drop-shadow-md bg-[#FFFFFF] rounded-2xl px-6 py-4">
						<EntityPieChart data={entityCounts} />
					</div>
				</section>
			</main>
		</div>
	);
};

export default Statistics;
