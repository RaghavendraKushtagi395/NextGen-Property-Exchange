import { useState, useEffect } from "react";
import footerImage from '../assets/footer.png';
import Footer from './Footer.jsx';
import wall from '../assets/bg-wall.jpg';

const PredictPrice = () => {
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState("");
  const [totalSqft, setTotalSqft] = useState("");
  const [bhk, setBhk] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await fetch("http://127.0.0.1:5000/get_location_names");
        if (!response.ok) {
          throw new Error("Failed to fetch locations");
        }
        const data = await response.json();
        setLocations(data.locations);
      } catch (err) {
        console.error(err.message);
        setError("Failed to load locations or Server is offline.");
      }
    };

    fetchLocations();
  }, []);

  const handlePredictPrice = async () => {
    setError(null);

    // Check for invalid input
    if (!location || !totalSqft || !bhk || !bathrooms) {
      setError("All fields are mandatory. Please fill out all fields.");
      return;
    }

    if (totalSqft <= 0 || bhk <= 0 || bathrooms <= 0) {
      setError("Values for Total Sqft, BHK, and Bathrooms must be greater than 0.");
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

  return (
    <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${wall})` }}>
      <div className="flex items-center justify-center min-h-screen bg-black bg-opacity-50">
        <div className="bg-white bg-opacity-90 shadow-2xl rounded-2xl p-8 sm:w-2/3 md:w-1/2 lg:w-1/3">
          <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">
            🏠 Home Price Prediction
          </h1>
          <div className="space-y-6">
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

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Total Sqft
              </label>
              <input
                type="number"
                placeholder="Enter total sqft"
                value={totalSqft}
                onChange={(e) => setTotalSqft(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              {totalSqft < 0 && (
                <p className="text-sm text-red-600">Total square feet cannot be negative.</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">BHK</label>
              <input
                type="number"
                placeholder="Enter number of bedrooms"
                value={bhk}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value < 0) {
                    setError("BHK value cannot be negative.");
                  } else {
                    setError(null);
                    setBhk(value);
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">Bathrooms</label>
              <input
                type="number"
                placeholder="Enter number of bathrooms"
                value={bathrooms}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value < 0) {
                    setError("Bathrooms value cannot be negative.");
                  } else {
                    setError(null);
                    setBathrooms(value);
                  }
                }}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              onClick={handlePredictPrice}
              className="w-full py-3 bg-indigo-600 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-700 transition duration-300"
            >
              Calculate Estimated Price
            </button>
          </div>

          {result && (
            <div className="mt-6 p-4 bg-green-200 text-green-800 font-semibold rounded-lg text-center">
              🎉 Estimated Price: ₹ {result} Lakhs
            </div>
          )}

          {error && (
            <div className="mt-6 p-4 bg-red-200 text-red-800 font-semibold rounded-lg text-center">
              🚨 Error: {error}
            </div>
          )}
        </div>
      </div>

      <footer className="w-full">
        <img src={footerImage} className="w-full object-cover" alt="Footer" />
        <Footer />
      </footer>
    </div>
  );
};

export default PredictPrice;
