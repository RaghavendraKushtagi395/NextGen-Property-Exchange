import { FaSearch } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react'; // Import useEffect for lifecycle management

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

        <header className='bg-slate-200 shadow-md'>
            <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>

                <Link to='/'>
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                        <span className='text-slate-600 mr-1'>NextGen</span>
                        <span className='text-blue-800'>Property Exchange</span>
                    </h1>
                </Link>

                <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>

                    <input
                        type='text'
                        placeholder='Search'
                        className='bg-transparent focus:outline-none w-24 sm:w-64'
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button type="submit">
                        <FaSearch className='text-slate-600' />
                    </button>
                </form>

                <ul className='flex gap-4'>

                    <Link to='/'>
                        <li className='hidden sm:inline text-slate-700 hover:underline'>Home</li>
                    </Link>

                    <Link to='/about'>
                        <li className='hidden sm:inline text-slate-700 hover:underline'>About</li>
                    </Link>

                    <Link to='/predict'>
                        <li className='hidden sm:inline text-slate-700 hover:underline'>Predict Price</li>
                    </Link>

                    <Link to='/profile'>
                        {currentUser ? (
                            <img
                                className='rounded-full h-7 w-7 object-cover'
                                src={currentUser.avatar}
                                alt='profile'
                            />
                        ) : (
                            <li className='text-slate-700 hover:underline'>Sign in</li>
                        )}
                    </Link>
                </ul>
            </div>
        </header>
    );
}