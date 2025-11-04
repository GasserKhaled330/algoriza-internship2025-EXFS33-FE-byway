import React from 'react';
import { TailSpin } from 'react-loader-spinner';

const Loader = ({ width, height }) => {
	return (
		<div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center z-10">
			<TailSpin
				visible={true}
				height={height}
				width={width}
				color="#F0F0F0"
				ariaLabel="tail-spin-loading"
				radius="1"
				wrapperStyle={{}}
				wrapperClass="animate-spin"
			/>
		</div>
	);
};

export default Loader;
