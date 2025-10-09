import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useAtom } from 'jotai';
import { pageIndexAtom, pageSizeAtom } from '../Atoms/instructorAtoms';

const Pagination = ({ totalPages, isPlaceholderData }) => {
	const [currentPage, setCurrentPage] = useAtom(pageIndexAtom);
	const [pageSize, setPageSize] = useAtom(pageSizeAtom);

	const baseClasses =
		'min-w-[100px] h-10 px-3 flex items-center justify-center font-medium rounded-lg transition-colors duration-200 border border-gray-300 shadow-sm whitespace-nowrap cursor-pointer disabled:cursor-not-allowed';

	const handleOnPageChange = (newPageIndex) => {
		setCurrentPage(newPageIndex);
	};
	const handlePageSizeChange = (e) => {
		setCurrentPage(1);
		setPageSize(Number(e.target.value));
	};
	return (
		<>
			<div className="flex items-center justify-between">
				<div>
					<select
						id="pageSize"
						name="pageSize"
						title="select page size"
						value={pageSize}
						onChange={handlePageSizeChange}
						className="min-w-[40px] bg-gray-100 text-black text-sm font-medium cursor-pointer p-2 mx-2 bordder-[#ccc] rounded-md hover:border-[#999] focus:outline-none focus:border-[#007bff] focus:shadow-md">
						<option value="5">5</option>
						<option value="10">10</option>
						<option value="20">20</option>
					</select>
					<span className="m-2">
						Current Page: {currentPage} of {totalPages}
					</span>
				</div>
				<nav
					className="flex flex-wrap justify-end items-center space-x-2 sm:space-x-3 text-sm"
					aria-label="Pagination">
					{/* Previous Button */}
					<button
						onClick={() => handleOnPageChange(Math.max(currentPage - 1, 1))}
						disabled={currentPage === 1}
						className={`${baseClasses}`}
						aria-label="Previous page">
						<ChevronLeft size={18} />
						<span className="ml-1 hidden sm:inline">Previous</span>
					</button>

					{/* Next Button */}
					<button
						onClick={() => {
							if (!isPlaceholderData && currentPage !== totalPages)
								handleOnPageChange((currentPage) => currentPage + 1);
						}}
						disabled={isPlaceholderData || currentPage === totalPages}
						className={`${baseClasses}`}
						aria-label="Next page">
						<span className="mr-1 hidden sm:inline">Next</span>
						<ChevronRight size={18} />
					</button>
				</nav>
			</div>
		</>
	);
};

export default Pagination;
