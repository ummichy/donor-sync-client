import React, { useEffect } from "react";
import { motion } from "framer-motion";

const TermsAndConditions = () => {
    useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);
  return (
    <section className="bg-gray-50 py-20">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl font-bold text-center text-[#5C0000]  mb-10"
        >
          Terms & Conditions
        </motion.h2>

        {/* Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="bg-white shadow-lg rounded-2xl p-8 space-y-6"
        >
          <p className="text-gray-600">
            Welcome to <span className="font-semibold text-[#5C0000] ">DonorSync</span>. 
            By accessing or using our platform, you agree to comply with and be bound by 
            the following Terms and Conditions. Please read them carefully.
          </p>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">1. Acceptance of Terms</h3>
            <p className="text-gray-600">
              By registering or using our services, you confirm that you are at least 
              18 years old and agree to these terms. If you do not agree, please do not use 
              our platform.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">2. User Responsibilities</h3>
            <p className="text-gray-600">
              You agree to provide accurate information when signing up and using our platform. 
              Misuse of the platform for fraudulent or harmful activities is strictly prohibited.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">3. Service Availability</h3>
            <p className="text-gray-600">
              We strive to keep our services available at all times, but we do not guarantee 
              uninterrupted access due to maintenance, updates, or unforeseen issues.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">4. Privacy & Data Protection</h3>
            <p className="text-gray-600">
              Your personal data is handled in accordance with our{" "}
              <a href="/privacy" className="text-[#5C0000]  underline">
                Privacy Policy
              </a>. By using our services, you consent to our data practices.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">5. Limitation of Liability</h3>
            <p className="text-gray-600">
              DonorSync is not responsible for any damages, losses, or risks arising from 
              the use of our platform. Users are solely responsible for their interactions 
              and actions.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">6. Changes to Terms</h3>
            <p className="text-gray-600">
              We reserve the right to update these Terms & Conditions at any time. Continued 
              use of the platform after changes constitutes acceptance of the new terms.
            </p>
          </div>

          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">7. Contact Us</h3>
            <p className="text-gray-600">
              If you have any questions regarding these Terms, please contact us at{" "}
              <a href="mailto:support@donorsync.com" className="text-[#5C0000]  underline">
                donorsync@gmail.com
              </a>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TermsAndConditions;
