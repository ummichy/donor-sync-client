
import React from 'react';
import { FaHandHoldingHeart, FaUserMd, FaHeartbeat } from 'react-icons/fa';

const FeaturedSection = () => {
  return (
    <section className="py-12 bg-red-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8 text-red-600">Why Choose BloodLink?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-red-300 transition">
            <FaHandHoldingHeart className="text-4xl text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Trusted Donations</h3>
            <p className="text-gray-600">All blood requests are verified and managed by real users, ensuring safe and reliable donations.</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-red-300 transition">
            <FaUserMd className="text-4xl text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Medical Accuracy</h3>
            <p className="text-gray-600">Requests include blood group, hospital, and expiry details to ensure timely and accurate donation.</p>
          </div>

          <div className="bg-white shadow-lg rounded-lg p-6 text-center hover:shadow-red-300 transition">
            <FaHeartbeat className="text-4xl text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2">Life-Saving Network</h3>
            <p className="text-gray-600">Join a growing network of donors and volunteers committed to saving lives in their local community.</p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturedSection;
