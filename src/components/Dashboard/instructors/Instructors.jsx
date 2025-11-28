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
	instructorJobTitlesAtom,
} from '../../../Atoms/instructorAtoms.js';
import Loader from '../../Common/Loader.jsx';
import toast from 'react-hot-toast';

const Instructors = () => {
	const tableColName = ['Name', 'Job Title', 'Rate', 'Action'];
	const [{ data: jobTitles }] = useAtom(instructorJobTitlesAtom);
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
		staleTime: 1000 * 60 * 5,
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

	if (isError) {
		toast.error(
			<p className="text-sm font-medium">
				An error occured while fetching instructors data, try later agian
			</p>
		);
	}
	return (
		<div className="px-4">
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
							className="bg-gray-800 text-white px-3 py-1 rounded cursor-pointer text-nowrap transition duration-300 hover:bg-gray-950">
							Add Instructor
						</button>

						<select
							name="jobTitle"
							id="jobTitle"
							value={jobTitle}
							onChange={handleJobTitleChange}
							className="min-w-[175px] bg-gray-100 text-sm font-medium cursor-pointer p-2 mx-2 bordder-[#ccc] rounded-md hover:border-[#999] focus:outline-none focus:border-[#007bff] focus:shadow-md">
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
					{isPending || isFetching ? (
						<Loader width={80} height={80} />
					) : (
						<InstructorsList
							columns={tableColName}
							data={instructors?.data || []}
						/>
					)}
				</div>

				<div>
					{!isError && (
						<Pagination
							isPlaceholderData={isPlaceholderData}
							totalPages={totalPages}
						/>
					)}
				</div>
			</section>

			<AddInstructorForm onClose={handleClosePopup} />
		</div>
	);
};

export default Instructors;
