import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react'; // Import useEffect for lifecycle management
// import LOGO from '../assets/logo2.png'
import LOGO from '../assets/logoname-header.png'
import logo from '../assets/logo-header.png'

export default function Header() {
    const { currentUser } = useSelector((state) => state.user);
    const [searchTerm, setSearchTerm] = useState(''); // State for search term
    const navigate = useNavigate();

    // Handles form submission to navigate to the search page with query parameters
    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set('searchTerm', searchTerm);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
    };

    // Updates the search term from the URL on component mount or when location.search changes
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        if (searchTermFromUrl) {
            setSearchTerm(searchTermFromUrl);
        }
    }, [window.location.search]); // Dependency updated to match usage

    return (

        <header className="border-b bg-slate-200 shadow-md z-50">
            <div className="flex justify-between items-center max-w-6xl mx-auto p-4">
                {/* Combined Logos */}
                <div className="flex items-center space-x-4">
                    <Link to="/">
                        <img
                            src={logo}
                            alt="logo"
                            className="h-12 rounded-lg shadow-sm transition-transform transform"
                        />
                    </Link>
                    <Link to="/">
                        <img
                            src={LOGO}
                            alt="logo"
                            className="h-12 rounded-lg shadow-sm transition-transform transform"
                        />
                    </Link>
                </div>


                {/* Search bar */}
                <form onSubmit={handleSubmit} className="bg-gray-100 p-2 rounded-full shadow-sm flex items-center">
                    <input
                        type="text"
                        placeholder="Search"
                        className="bg-transparent focus:outline-none w-32 sm:w-64 px-2 text-gray-700"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit" className="text-gray-600 hover:text-gray-900">
                        <FaSearch className="text-lg" />
                    </button>
                </form>

                {/* Navigation links */}
                <ul className="flex items-center gap-6 text-gray-700 font-medium">
                    <Link to="/">
                        <li className="hidden sm:inline hover:text-indigo-600">Home</li>
                    </Link>
                    <Link to="/about">
                        <li className="hidden sm:inline hover:text-indigo-600">About</li>
                    </Link>
                    <Link to="/predict">
                        <li className="hidden sm:inline hover:text-indigo-600">Predict Price</li>
                    </Link>
                    <Link to="/profile">
                        {currentUser ? (
                            <img
                                className="rounded-full h-8 w-8 object-cover border border-gray-300 hover:scale-125 transition"
                                src={currentUser.avatar}
                                alt="profile"
                            />
                        ) : (
                            <li className="hover:text-blue-600">Sign in</li>
                        )}
                    </Link>
                </ul>
            </div>
        </header>

    );
}