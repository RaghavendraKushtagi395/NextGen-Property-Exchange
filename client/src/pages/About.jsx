import React from "react";
import RK from '../assets/RK.jpg';
import Footer from "./Footer";
import footerImage from '../assets/footer.png';

const About = () => {
  return (
    <div className="bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-6 lg:px-20 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to NextGen Property Exchange</h1>
          <p className="text-lg">
            Revolutionizing the way you buy, sell, and explore properties with modern technology and seamless experiences.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 container mx-auto px-6 lg:px-20">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Who We Are
        </h2>
        <p className="text-gray-600 text-center mb-10">
          NextGen Property Exchange is a modern real estate platform built to simplify property dealings. 
          With features like property price prediction and personalized suggestions, our mission is to 
          make your property journey stress-free and transparent.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white shadow-md p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold text-indigo-600">Our Mission</h3>
            <p className="text-gray-600 mt-4">
              Empower individuals and businesses with cutting-edge tools for effortless property management and discovery.
            </p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold text-indigo-600">Our Vision</h3>
            <p className="text-gray-600 mt-4">
              To become the most trusted and innovative platform for real estate solutions.
            </p>
          </div>
          <div className="bg-white shadow-md p-6 rounded-lg text-center">
            <h3 className="text-xl font-bold text-indigo-600">Our Values</h3>
            <p className="text-gray-600 mt-4">
              Integrity, transparency, and customer-centric solutions are at the core of everything we do.
            </p>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6 lg:px-20">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Why Choose Us
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-center space-x-4">
              <div className="bg-indigo-600 text-white p-3 rounded-full">
                <i className="fas fa-chart-line"></i>
              </div>
              <p className="text-gray-600">Accurate Property Price Predictions</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-purple-600 text-white p-3 rounded-full">
                <i className="fas fa-home"></i>
              </div>
              <p className="text-gray-600">Personalized Property Recommendations</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-green-600 text-white p-3 rounded-full">
                <i className="fas fa-handshake"></i>
              </div>
              <p className="text-gray-600">Hassle-Free Buying & Selling Experience</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-blue-600 text-white p-3 rounded-full">
                <i className="fas fa-shield-alt"></i>
              </div>
              <p className="text-gray-600">Connect directly to landloards</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-yellow-600 text-white p-3 rounded-full">
                <i className="fas fa-users"></i>
              </div>
              <p className="text-gray-600">User-Friendly Interface</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="bg-red-600 text-white p-3 rounded-full">
                <i className="fas fa-comments"></i>
              </div>
              <p className="text-gray-600">Chat Support with Bob (Your AI Assistant)</p>
            </div>
          </div>
        </div>
      </section>

      {/* Meet the Guy Section */}
      <section className="py-16 container mx-auto px-6 lg:px-20">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Meet the Guy
        </h2>
        <p className="text-gray-600 text-center mb-10">
          Behind every successful project is a passionate and dedicated individual. Here’s a look at the person behind NextGen Property Exchange.
        </p>
        <div className="flex justify-center">
          <div className="text-center">
            <img
              src={RK}
              alt="Raghavendra Kushtagi"
              className="mx-auto rounded-full w-32 h-32"
            />
            <h3 className="text-xl font-bold text-gray-800 mt-4">Raghavendra Kushtagi</h3>
            <p className="text-gray-600">Project Developer</p>
          </div>
        </div>
      </section>
         
  

      {/* Footer */}
    <footer className='w-full mt-10'>
        <img src={footerImage} className='w-full object-cover' alt='Footer'/> 
      </footer>
      <Footer/>
    </div>
  );
};

export default About;
