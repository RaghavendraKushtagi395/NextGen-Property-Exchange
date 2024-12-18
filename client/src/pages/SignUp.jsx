import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        setError(data.message);
        setLoading(false);
        return;
      }

      setError(null);
      setLoading(false);
      navigate("/signin");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg w-full max-w-md p-8">
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">Sign Up</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Username"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            id="username"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            placeholder="Email Address"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            id="email"
            onChange={handleChange}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring focus:ring-indigo-300"
            id="password"
            onChange={handleChange}
            required
          />
          <button
            disabled={loading}
            className="bg-indigo-600 text-white p-3 rounded-lg uppercase font-semibold hover:bg-indigo-700 disabled:bg-indigo-400"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
          <div className="relative flex items-center">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-4 text-gray-500 font-medium">OR</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>
          <OAuth />
        </form>
        <div className="text-sm text-center text-gray-600 mt-6">
          <p>
            Already have an account?{" "}
            <Link to="/signin" className="text-indigo-600 font-medium hover:underline">
              Sign In
            </Link>
          </p>
        </div>
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}
      </div>
    </div>
  );
}
