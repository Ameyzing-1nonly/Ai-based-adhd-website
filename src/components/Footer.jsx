
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';
import { useState } from 'react';
import axios from "axios"
const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:8000/api/notifications/subscribe', { email });
      alert('Subscribed successfully!');
      setEmail('');
    } catch (error) {
      console.error('Error subscribing:', error);
      alert('Subscription failed: ' + (error.response?.data?.message || error.message));
    }
  }


  return (
    <>
<div>
<hr className="border-t border-gray-300 dark:border-gray-600" />
<footer className="bg-gray-100 dark:bg-gray-800 pt-16 pb-12">
      <div className="container mx-auto px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About section */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">About Us</h3>
            <p className="text-gray-600 dark:text-gray-400">
              We are dedicated to providing resources and support for individuals with ADHD, helping them thrive and harness their unique strengths.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400">Home</Link></li>
              <li><Link to="/about-us" className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400">About Us</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400">Privacy Policy</Link></li>
              <li><Link to="/adhd-test" className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400">ADHD Test</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Contact Us</h3>
            <p className="text-gray-600 dark:text-gray-400">Green city</p>
            <p className="text-gray-600 dark:text-gray-400">Ambernath East</p>
            <p className="text-gray-600 dark:text-gray-400">Email: ameykandal@gmail.com</p>
            <p className="text-gray-600 dark:text-gray-400">Phone: 8390040846</p>
          </div>

          {/* Newsletter Signup */}
          <div>
                <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Stay Updated</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">Subscribe to our newsletter for the latest ADHD news and resources.</p>
                <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
                  <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email" 
                    className="flex-grow px-2 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-600 dark:bg-gray-700 dark:text-white"
                    required
                  />
                  <button 
                    type="submit" 
                    className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition duration-300"
                  >
                    Subscribe
                  </button>
                </form>
              </div>
            </div>

        {/* Social Media Icons */}
        <div className="mt-10 flex justify-center space-x-6">
          <a href="https://www.facebook.com/" className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400">
            <FaFacebookF className="w-6 h-6" />
          </a>
          <a href="https://x.com/" className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400">
            <FaTwitter className="w-6 h-6" />
          </a>
          <a href="https://www.instagram.com/" className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400">
            <FaInstagram className="w-6 h-6" />
          </a>
          <a href="https://www.linkedin.com/" className="text-gray-600 dark:text-gray-400 hover:text-pink-600 dark:hover:text-pink-400">
            <FaLinkedinIn className="w-6 h-6" />
          </a>
        </div>

        {/* Copyright */}
        <div className="mt-12 text-center text-gray-600 dark:text-gray-400">
          <p>&copy; 2024 ADHD Awareness. All rights reserved.</p>
        </div>
      </div>
    </footer>
</div>

    </>

  );
};

export default Footer;