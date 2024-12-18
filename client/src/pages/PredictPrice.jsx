import { useState, useEffect } from "react";
import footerImage from '../assets/footer.png';
import Footer from './Footer.jsx';
import wall from '../assets/bg-wall.jpg'

const PredictPrice = () => {
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState("");
  const [totalSqft, setTotalSqft] = useState("");
  const [bhk, setBhk] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);
  const [showBhkOptions, setShowBhkOptions] = useState(false);
  const [showBathroomOptions, setShowBathroomOptions] = useState(false);
  const [showScroller, setShowScroller] = useState(false);

  // Fetch locations when component mounts
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/get_location_names");
        if (!response.ok) {
          throw new Error("Failed to fetch locations");
        }
        const data = await response.json();
        setLocations(data.locations); // Assuming API returns { locations: [...] }
      } catch (err) {
        console.error(err.message);
        setError("Failed to load locations or Server is offline.");
      }
    };

    fetchLocations();
  }, []);

  const handlePredictPrice = async () => {
    setError(null);

    // Validation: Check if all fields are filled
  if (!location || !totalSqft || !bhk || !bathrooms) {
    setError("All fields are mandatory. Please fill out all fields.");
    return;
  }

    try {
      const response = await fetch("http://127.0.0.1:5000/predict_home_price", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          location,
          total_sqft: totalSqft,
          bhk,
          bath: bathrooms,
        }),
      });

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const data = await response.json();
      setResult(data.estimated_price);
    } catch (err) {
      setError(err.message);
    }
  };
  const handleFocus = () => {
    
    setShowScroller(true);
    setTimeout(() => {
      setShowScroller(false); 
    }, 6000);
  };

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${wall})` }}>
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
        {/* Form Container */}
        <div className="bg-white bg-opacity-90 shadow-2xl rounded-2xl p-8 sm:w-2/3 md:w-1/2 lg:w-1/3 ">
          <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
            🏠 Home Price Prediction
          </h1>
          <div className="space-y-6">
            {/* Location Dropdown */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Location</label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select Location</option>
                {locations.map((loc, index) => (
                  <option key={index} value={loc}>
                    {loc}
                  </option>
                ))}
              </select>
            </div>

            {/* Total Sqft with Scroller */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Total Sqft
              </label>
              <input
                type="number"
                placeholder="Enter total sqft"
                value={totalSqft}
                onChange={(e) => setTotalSqft(e.target.value)}
                // onFocus={() => setShowScroller(true),7000}
                // onBlur={() => setShowScroller(false)} // Hide scroller when focus is lost
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onClick={handleFocus}
              />
              {showScroller && (
                <input
                  type="range"
                  min="500"
                  max="10000"
                  step="50"
                  value={totalSqft}
                  onChange={(e) => setTotalSqft(e.target.value)}
                  className="w-full mt-2 accent-indigo-600"
                />
              )}
              <p className="text-sm text-gray-500 text-right">
                Current Value: <span className="font-semibold">{totalSqft} sqft</span>
              </p>
            </div>

             {/* BHK Section */}
          <div className="relative mt-4">
            <label className="text-sm font-semibold mb-1 block">BHK</label>
            <input
              type="number"
              placeholder="Enter BHK"
              value={bhk}
              onFocus={() => setShowBhkOptions(true)}
              onBlur={() => setTimeout(() => setShowBhkOptions(false), 150)}
              onChange={(e) => setBhk(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {showBhkOptions && (
              <div className="absolute top-full w-full bg-white border rounded-lg shadow-lg p-2 grid grid-cols-3 gap-1 z-10">
                {[1, 2, 3, 4, 5, 6].map((value) => (
                  <button
                    key={value}
                    className="py-2 px-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    onClick={() => {
                      setBhk(value);
                      setShowBhkOptions(false);
                    }}
                  >
                    {value} BHK
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Bathroom Section */}
          <div className="relative mt-4">
            <label className="text-sm font-semibold mb-1 block">Bathrooms</label>
            <input
              type="number"
              placeholder="Enter Bathrooms"
              value={bathrooms}
              onFocus={() => setShowBathroomOptions(true)}
              onBlur={() => setTimeout(() => setShowBathroomOptions(false), 150)}
              onChange={(e) => setBathrooms(e.target.value)}
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            {showBathroomOptions && (
              <div className="absolute top-full w-full bg-white border rounded-lg shadow-lg p-2 grid grid-cols-3 gap-1 z-10">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button
                    key={value}
                    className="py-2 px-3 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                    onClick={() => {
                      setBathrooms(value);
                      setShowBathroomOptions(false);
                    }}
                  >
                    {value} Bath
                  </button>
                ))}
              </div>
            )}
          </div>

            {/* Submit Button */}
            <button
              onClick={handlePredictPrice}
              className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
            >
              Calculate Estimated Price
            </button>
          </div>

          {/* Result Section */}
          {result && (
            <div className="mt-6 p-4 bg-green-200 text-green-800 font-semibold rounded-lg text-center">
              🎉 Estimated Price: ₹ {result} Lakhs
            </div>
          )}

          {/* Error Section */}
          {error && (
            <div className="mt-6 p-4 bg-red-200 text-red-800 font-semibold rounded-lg text-center">
              🚨 Error: {error}
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full">
        <img src={footerImage} className="w-full object-cover" alt="Footer" />
        <Footer />
      </footer>
    </div>
  );
};

export default PredictPrice;
