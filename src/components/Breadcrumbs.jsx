import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs = () => {
	const location = useLocation();
	const rawPathnames = location.pathname.split('/').filter((x) => x);

	const getCrumbText = (segment) => {
		const segmentMap = {
			dashboard: 'Dashboard',
			instructors: 'Instructors',
			courses: 'Courses',
			add: 'Add New Course',
			edit: 'Edit Course',
			view: 'View Course',
		};

		if (segmentMap[segment]) {
			return segmentMap[segment];
		}

		if (segment.match(/^\d+$/) || segment.length > 5) {
			return null;
		}

		return segment.charAt(0).toUpperCase() + segment.slice(1);
	};

	const crumbsData = [];

	rawPathnames.forEach((name, index) => {
		const text = getCrumbText(name);

		if (text) {
			const routeTo = `/${rawPathnames.slice(0, index + 1).join('/')}`;

			crumbsData.push({
				name: text,
				route: routeTo,
			});
		}
	});

	return (
		<nav aria-label="breadcrumb">
			<ol className="breadcrumb">
				{crumbsData.map((crumb, index) => {
					const isLast = index === crumbsData.length - 1;

					return (
						<li
							key={crumb.route}
							className={`breadcrumb-item ${
								isLast ? 'text-gray-900 font-semibold' : 'text-gray-600'
							}`}>
							{isLast ? (
								<span aria-current="page">{crumb.name}</span>
							) : (
								<>
									<Link
										to={crumb.route}
										className="text-blue-600 hover:underline">
										{crumb.name}
									</Link>
									<span className="px-2 text-gray-400">/</span>
								</>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
};

export default Breadcrumbs;
