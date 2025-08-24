import React from "react";
import { CheckCircle, XCircle } from "lucide-react";

const EligibilitySection = () => {
  return (
    <section className="bg-gradient-to-b from-gray-100 to-white py-16">
      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <h2 className="text-3xl md:text-5xl font-bold text-center text-[#5C0000]  mb-12">
          Blood Donation Eligibility
        </h2>

        {/* Two Columns */}
        <div className="grid md:grid-cols-2 gap-10">
          {/* Who Can Donate */}
          <div className="bg-white shadow-lg rounded-2xl p-8 border-t-8 border-green-500 hover:shadow-2xl transition">
            <h3 className="text-2xl font-semibold text-green-600 flex items-center gap-2 mb-6">
              <CheckCircle className="w-7 h-7 text-green-500" /> Who Can Donate
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Age between <span className="font-semibold">18 - 60 years</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Weight above <span className="font-semibold">50 kg</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Hemoglobin level <span className="font-semibold">≥ 12.5 g/dL</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                No major illness or recent surgery
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Normal blood pressure & pulse rate
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                At least <span className="font-semibold">3 months</span> since last donation
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                No alcohol or drugs taken in last 24 hours
              </li>
            </ul>
          </div>

          {/* Who Cannot Donate */}
          <div className="bg-white shadow-lg rounded-2xl p-8 border-t-8 border-[#5C0000] hover:shadow-2xl transition">
            <h3 className="text-2xl font-semibold text-[#5C0000] flex items-center gap-2 mb-6">
              <XCircle className="w-7 h-7 text-[#5C0000]" /> Who Cannot Donate
            </h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-[#5C0000]" />
                Under <span className="font-semibold">18 years old</span> or above 60
              </li>
              <li className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-[#5C0000]" />
                Pregnant or breastfeeding women
              </li>
              <li className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-[#5C0000]" />
                History of <span className="font-semibold">HIV, Hepatitis, or Malaria</span>
              </li>
              <li className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-[#5C0000]" />
                Recent surgery, infection, or chronic illness
              </li>
              <li className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-[#5C0000]" />
                Had a <span className="font-semibold">tattoo, piercing, or dental surgery</span> in last 6 months
              </li>
              <li className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-[#5C0000]" />
                Cancer, uncontrolled diabetes, or heart disease patients
              </li>
              <li className="flex items-center gap-2">
                <XCircle className="w-5 h-5 text-[#5C0000]" />
                Took antibiotics or strong medications recently
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EligibilitySection;
