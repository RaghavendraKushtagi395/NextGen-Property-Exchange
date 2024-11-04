import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
        <h1 className="text-5xl font-bold text-red-500">404</h1>
        <p className="text-lg mt-4">Oops! The page you're looking for doesn't exist.</p>
        <Link to="/">
            <button className="mt-7  px-6 py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300">
                Go Back
            </button>
        </Link>
    </div>
);

export default NotFound;