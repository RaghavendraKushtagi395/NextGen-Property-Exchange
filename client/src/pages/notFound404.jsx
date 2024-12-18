import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-50 to-indigo-100">
        <h1 className="text-8xl font-extrabold text-indigo-600 drop-shadow-lg">404</h1>
        <p className="text-xl text-gray-700 mt-6 text-center">
            Sorry, we can't find the page you're looking for.
        </p>
        <p className="text-sm text-gray-500 mt-2">
            You may have mistyped the address, or the page has been moved.
        </p>
        <Link to="/">
            <button className="mt-8 px-8 py-3 bg-indigo-600 text-white font-semibold text-lg rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300 transform hover:scale-105">
                Back to Home
            </button>
        </Link>
    </div>
);

export default NotFound;
