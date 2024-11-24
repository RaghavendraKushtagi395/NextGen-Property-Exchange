import { Link } from "react-router-dom";
import Github from '../assets/github.png';
import Instagram from '../assets/instagram.png';
const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-10 flex justify-between flex-col">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1 */}
          <div>
           <Link to={'/'}><h3 className="r-7 font-bold text-lg mb-4">NextGen Property Exchange</h3></Link> 
            <ul className="space-y-2">

              <Link to={'/about'}><li>About Us</li></Link>
              <li>Services</li>
              <li>Contact</li>
            </ul>
          </div>
          {/* Column 2 */}
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
              <li>FAQs</li>
            </ul>
          </div>
          {/* Column 3 */}
          <div>
            <h3 className="font-bold text-lg mb-4">Connect</h3>
            <div className="flex space-x-4">
              <a href="https://github.com/RaghavendraKushtagi395"><img src={Github} alt="Github" className="rounded-full h-9 hover:scale-105 " /></a>
              <a href="https://www.instagram.com/raghavendra_395/"><img src={Instagram} alt="Instagram" className="rounded-full h-9 hover:scale-105"/></a>
              
            </div>
          </div>
  {/* Column 4 */}
  <div>
          <h3 className="font-bold text-lg mb-4">Explore More</h3>
          <ul className="space-y-2">
           <Link to={'/search'}><li>Real Estate Listings</li></Link> 
            <li>Price Prediction Tool</li>
            <li>Chat with Bob (Our AI Assistant)</li>
            
          </ul>
        </div>
        </div>
        <div className=" text-center mt-10 text-gray-400 text-sm">
          © 2024 NextGen Property Exchange. All rights reserved. 
          <br />
          <b>Minor Project</b>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  