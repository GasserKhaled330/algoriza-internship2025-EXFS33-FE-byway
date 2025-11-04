import React from 'react';
import { RotatingLines } from 'react-loader-spinner';
const Spinner = ({ width, height }) => {
	return (
		<RotatingLines
			visible={true}
			height={height}
			width={width}
			color="white"
			strokeWidth="2"
			animationDuration="0.75"
			ariaLabel="rotating-lines-loading"
			wrapperStyle={{}}
			wrapperClass="flex justify-center items-center"
		/>
	);
};

export default Spinner;
