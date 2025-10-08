import React from 'react';
import {Link} from 'react-router-dom';
import gridImage from '../assets/shape/grid-01.svg';
const NotFound = () => {
    return (
        <main className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden z-1">

            <div className="absolute right-0 top-0 -z-1 w-full max-w-[250px] xl:max-w-[450px]">
                <img alt="grid"
                     src={gridImage}/>
            </div>
            <div className="absolute bottom-0 left-0 -z-1 w-full max-w-[250px] rotate-180 xl:max-w-[450px]"><img
                alt="grid" src={gridImage}/>
            </div>
            <div className="mx-auto w-full max-w-[242px] text-center sm:max-w-[472px]">
                <p className="text-base font-semibold text-[#465FFF]">404</p>

                <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance sm:text-7xl">Page not found</h1>

                <p className="mt-10 mb-6 text-base text-gray-700 dark:text-gray-400 sm:text-lg">
                    We can’t seem to find the page you are looking for!</p>
                <Link
                    className="rounded-md bg-gray-950 px-6 py-3 text-sm font-semibold text-white shadow-xs cursor-pointer hover:bg-gray-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-700"
                    to="/" data-discover="true">
                    Back to Home Page
                </Link>
            </div>

        </main>
    );
};

export default NotFound;