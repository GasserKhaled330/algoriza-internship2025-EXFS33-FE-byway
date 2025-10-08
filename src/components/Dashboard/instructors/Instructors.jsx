import React from 'react';
import { BellDot, ListFilter } from 'lucide-react';
import Breadcrumbs from '../../Breadcrumbs.jsx';
import SearchBar from '../../SearchBar.jsx';
import InstructorsList from './InstructorsList.jsx';
import Instructor from '../../../api/Instructor.js';
import Pagination from '../../Pagination.jsx';
import AddInstructorForm from './AddInstructorForm.jsx';

import { useDebounce } from '../../../hooks/useDebounce.js';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { useAtom, useSetAtom, useAtomValue } from 'jotai';
import {
	pageIndexAtom,
	pageSizeAtom,
	nameSearchAtom,
	jobTitleFilterAtom,
	showAddPopupAtom,
	closeAllPopupsAtom,
} from '../../../Atoms/instructorAtoms.js';

const Instructors = () => {
	const tableColName = ['Name', 'Job Title', 'Rate', 'Action'];
	const setShowPopup = useSetAtom(showAddPopupAtom);
	const closeAllPopups = useSetAtom(closeAllPopupsAtom);

	const [pageIndex, setPageIndex] = useAtom(pageIndexAtom);
	const pageSize = useAtomValue(pageSizeAtom);
	const [name, setName] = useAtom(nameSearchAtom);
	const [jobTitle, setJobTitle] = useAtom(jobTitleFilterAtom);

	const debouncedNameSearch = useDebounce(name, 300);

	const {
		isPending,
		isError,
		error,
		data: instructors,
		isFetching,
		isPlaceholderData,
	} = useQuery({
		queryKey: [
			'instructors',
			pageIndex,
			pageSize,
			debouncedNameSearch,
			jobTitle,
		],
		queryFn: () =>
			Instructor.getInstructors(
				pageIndex,
				pageSize,
				debouncedNameSearch,
				jobTitle
			),
		placeholderData: keepPreviousData,
	});

	const { data: jobTitles } = useQuery({
		queryKey: ['instructor', 'jobTitles'],
		queryFn: Instructor.getInstructorJobTitles,
	});

	const totalPages = Math.ceil((instructors?.totalCount || 0) / pageSize);

	const handleSearch = (e) => {
		setPageIndex(1);
		setName(e.target.value);
	};

	const handleJobTitleChange = (e) => {
		setPageIndex(1);
		setJobTitle(e.target.value);
	};

	const handleOpenPopup = () => setShowPopup(true);
	const handleClosePopup = closeAllPopups;

	return (
		<div className="container">
			<header className="flex justify-between items-center border-b-1 border-[#E2E6EE] h-24">
				<div className="flex items-end">
					<h1 className="text-3xl font-medium">Instructors</h1>
					<Breadcrumbs />
				</div>
				<span className="cursor-pointer">
					<BellDot size={24} />
				</span>
			</header>

			<section className="grid grid-cols[_1fr_2fr_1fr] gap-5 border border-[#F1F3F9] my-8 p-5 shadow-lg rounded">
				<div className="flex justify-between items-center">
					<p className="text-2xl font-medium">Instructors</p>
					<div className="flex items-center">
						<button
							onClick={handleOpenPopup}
							className="bg-[#020617] text-white p-2 rounded-xl cursor-pointer text-nowrap">
							Add Instructor
						</button>

						<select
							name="jobTitle"
							id="jobTitle"
							value={jobTitle}
							onChange={handleJobTitleChange}
							className="w-[200px] bg-gray-100 text-[#3962DC] text-sm font-medium cursor-pointer p-2 mx-2 bordder-[#ccc] rounded-md hover:border-[#999] focus:outline-none focus:border-[#007bff] focus:shadow-md">
							<option
								value=""
								className="bg-white text-[#333]  text-sm font-medium cursor-pointer hover:bg-[#eee]">
								All Job Titles
							</option>
							{jobTitles?.map((item) => (
								<option
									key={item}
									value={item}
									className="bg-white text-[#333] text-sm font-medium  cursor-pointer hover:bg-[#eee]">
									{item}
								</option>
							))}
						</select>

						<SearchBar
							value={name}
							onSearch={handleSearch}
							placeHolder="Search for Instructors"
						/>

						<span className="flex justify-center items-center w-10 h-10 bg-white ml-2 rounded-md drop-shadow-md">
							<ListFilter color="#96A0B6" size={18} />
						</span>
					</div>
				</div>

				<div>
					{isPending ? (
						<p>Loading... </p>
					) : (
						<InstructorsList
							columns={tableColName}
							data={instructors?.data || []}
						/>
					)}
				</div>

				<div>
					{isError ? null : (
						<Pagination
							isPlaceholderData={isPlaceholderData}
							totalPages={totalPages}
						/>
					)}
				</div>
			</section>

			<AddInstructorForm onClose={handleClosePopup} />

			{isFetching && <span>Loading...</span>}
			{isError && (
				<p className="mt-4 text-sm text-red-600">
					Error: {JSON.stringify(error.response.data.errors) || error.message}
				</p>
			)}
		</div>
	);
};

export default Instructors;
