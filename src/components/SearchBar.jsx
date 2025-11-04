import React from 'react';

const SearchBar = ({ onSearch, placeHolder, value, isNumber }) => {
	return (
		<div className="min-w-[200px]">
			<input
				type={isNumber ? 'number' : 'search'}
				id="searchTerm"
				name="searchTerm"
				placeholder={placeHolder}
				value={value}
				onChange={onSearch}
				min={1}
				max={5}
				className="w-full text-[#96A0B6] text-sm font-medium  p-2 border-1 border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-gray-500"
			/>
		</div>
	);
};

export default SearchBar;
