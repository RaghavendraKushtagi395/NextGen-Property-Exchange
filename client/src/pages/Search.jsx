import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/Listingitem';

export default function Search() {

  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    parking: false,
    furnished: false,
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] =useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const parkingFromUrl = urlParams.get('parking');
    const furnishedFromUrl = urlParams.get('furnished');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (
      searchTermFromUrl ||
      typeFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      offerFromUrl ||
      sortFromUrl ||
      orderFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        parking: parkingFromUrl === 'true' ? true : false,
        furnished: furnishedFromUrl === 'true' ? true : false,
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/listing/get?${searchQuery}`);
      const data = await res.json();
      if(data.length > 8){
        setShowMore(true);
      } else{
        setShowMore(false)
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);
  const handleChange = (e) => {
    if (
      e.target.id === 'all' ||
      e.target.id === 'rent' ||
      e.target.id === 'sale'
    ) {
      setSidebardata({ ...sidebardata, type: e.target.id });
    }
    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }
    if (
      e.target.id === 'parking' ||
      e.target.id === 'furnished' ||
      e.target.id === 'offer'
    ) {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }

    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';
      const order = e.target.value.split('_')[1] || 'desc';
      setSidebardata({ ...sidebardata, sort, order });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('parking', sidebardata.parking);
    urlParams.set('furnished', sidebardata.furnished);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-50">
      {/* Filter Panel */}
      <aside className="lg:w-1/3 xl:w-1/4 bg-white shadow-xl p-6 lg:sticky top-0">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Filter Your Search</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Search Input */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Search by Keyword
            </label>
            <input
              type="text"
              id="searchTerm"
              placeholder="Search..."
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
  
          {/* Property Type */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Property Type
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['all', 'rent', 'sale'].map((type) => (
                <label
                  key={type}
                  className={`p-2 text-center border rounded-md cursor-pointer transition ${
                    sidebardata.type === type
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-gray-100 text-gray-700 border-gray-300'
                  }`}
                >
                  <input
                    type="radio"
                    id={type}
                    className="hidden"
                    onChange={handleChange}
                    checked={sidebardata.type === type}
                  />
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </label>
              ))}
            </div>
          </div>
  
          {/* Amenities */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Select Amenities
            </label>
            <div className="flex flex-wrap gap-3">
              {['parking', 'furnished'].map((amenity) => (
                <label
                  key={amenity}
                  className={`px-4 py-2 border rounded-md cursor-pointer transition ${
                    sidebardata[amenity]
                      ? 'bg-blue-500 text-white border-blue-500'
                      : 'bg-gray-100 text-gray-700 border-gray-300'
                  }`}
                >
                  <input
                    type="checkbox"
                    id={amenity}
                    className="hidden"
                    onChange={handleChange}
                    checked={sidebardata[amenity]}
                  />
                  {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                </label>
              ))}
            </div>
          </div>
  
          {/* Sort Options */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Sort By
            </label>
            <select
              id="sort_order"
              className="w-full p-3 rounded-md border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400"
              value={sidebardata.sort_order}
              onChange={handleChange}
            >
              <option value="regularPrice_desc">Price: High to Low</option>
              <option value="regularPrice_asc">Price: Low to High</option>
              <option value="createdAt_desc">Newest First</option>
              <option value="createdAt_asc">Oldest First</option>
            </select>
          </div>
  
          {/* Apply Filter Button */}
          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white font-bold rounded-md shadow-md hover:bg-blue-700 transition"
          >
            Apply Filters
          </button>
        </form>
      </aside>
  
      {/* Main Listings Section */}
      <main className="flex flex-col mt-4 ml-4 mb-5">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Available Listings</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {!loading && listings.length === 0 && (
            <p className="text-gray-600 text-center col-span-full">No results found.</p>
          )}
          {loading && (
            <p className="text-gray-600 text-center col-span-full">Loading...</p>
          )}
          {!loading &&
            listings.map((listing) => (
              <div
                key={listing._id}
                className="bg-white hover:ring-2 hover:ring-blue-400 transition duration-300 rounded-xl overflow-hidden"
              >
                <ListingItem listing={listing} />
              </div>
            ))}
  
          {showMore && (
            <button
              onClick={onShowMoreClick}
              className="col-span-full mt-4 text-blue-600 font-semibold hover:scale-105 transition"
            >
              Show More Results
            </button>
          )}
        </div>
      </main>
    </div>
  );
  
}