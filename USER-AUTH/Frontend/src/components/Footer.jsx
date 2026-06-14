import { Link } from 'react-router-dom';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-slate-800 text-gray-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
          <h2 className="text-xl font-bold text-white mb-3 underline"> UserAuth </h2>
          <p className="text-sm text-gray-400 leading-relaxed">
            A secure and complete user authentication system built with the MERN Stack. 
            Fast, reliable, and easy to integrate into any project.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3 underline"> Quick Links </h3>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="text-sm text-gray-400 hover:text-blue-400 transition"> 
                Home 
              </Link>
            </li>
            <li>
              <Link to="/login" className="text-sm text-gray-400 hover:text-blue-400 transition"> 
                Sign In 
              </Link>
            </li>
            <li>
              <Link to="/register" className="text-sm text-gray-400 hover:text-blue-400 transition"> 
                Create Account
              </Link>
            </li>
            <li>
              <Link to="/dashboard" className="text-sm text-gray-400 hover:text-blue-400 transition">
                Dashboard
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white mb-3 underline"> Let's Connect! </h3>
          <p className="text-sm text-gray-400 mb-4"> Follow development or reach out. </p>
          <div className="flex items-center gap-4">
            <a href="https://github.com/ZehabFaisal" target="_blank" rel="noopener noreferrer"
              className="text-gray-400 hover:text-white transition text-xl" > <FaGithub />
            </a>

            <a href="https://www.linkedin.com/in/zehab-faisal-7b4428322/" target="_blank" rel="noopener noreferrer" 
              className="text-gray-400 hover:text-blue-500 transition text-xl" > <FaLinkedin />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-700">
          <p className="text-md text-white text-center mt-4">
            &#169; 2026 AuthSystem, Created by Zehab Faisal | All rights reserved.
          </p>
      </div>
    </footer>
  );
};

export default Footer;