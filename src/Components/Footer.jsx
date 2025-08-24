import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router";
import { GiBlood } from "react-icons/gi";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-100 to-gray-200 text-gray-700  border-t">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-4 gap-8">
        {/* Brand */}
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-[#5C0000] ">
            <GiBlood />DonorSync
          </h2>
          <p className="mt-2 text-sm">
            Saving lives, one drop at a time. Join us in making a difference.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/" className="hover:underline">Home</Link></li>
            <li><Link to="/Blood-req" className="hover:underline">Donation Requests</Link></li>
            <li><Link to="/about" className="hover:underline">About Us</Link></li>
            <li><Link to="/contact" className="hover:underline">Contact</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Support</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to="/faq" className="hover:underline">FAQ</Link></li>
            <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
            <li><Link to="/terms" className="hover:underline">Terms & Conditions</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <p className="text-sm">
            Email: donorsync@gmail.com <br />
            Phone: +880 1234 567890
          </p>
          <div className="flex gap-4 mt-3 text-[#5C0000] ">
            <a href="https://facebook.com" target="_blank"><FaFacebookF /></a>
            <a href="https://twitter.com" target="_blank"><FaTwitter /></a>
            <a href="https://instagram.com" target="_blank"><FaInstagram /></a>
          </div>
        </div>
      </div>

      <div className="text-center text-xs py-4 border-t border-gray-200">
        &copy; {new Date().getFullYear()} DonorSync. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
