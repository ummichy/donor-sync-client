
import React, { useEffect, useState } from "react";
import axios from "axios";
import { loadStripe } from "@stripe/stripe-js";
import { useQuery } from "@tanstack/react-query";

const stripePromise = loadStripe("pk_test_51NZvKpLVAv9TyL03mXhhuhIZfMe2A8qH8FC7kXoAwWoKHAN4F0H4OQ5oQdStXYHqHDl3Xw3PrUQmDfDtwR9Z3qRz00asAmsBzX");
const FundingLinks = () => {
  const [page, setPage] = useState(1);
  const limit = 5;

  // Fetch funding data
  const { data: fundings = [], refetch, isLoading } = useQuery({
    queryKey: ["fundings", page],
    queryFn: async () => {
      const res = await axios.get(`/http://localhost:3000/fundings?page=${page}&limit=${limit}`);
      return res.data;
    },
  });

  const handleGiveFund = async () => {
    const res = await axios.post("/http://localhost:3000/create-checkout-session", {
      amount: 500, // amount in cents ($5.00), you can make this dynamic
    });
    const stripe = await stripePromise;
    await stripe.redirectToCheckout({ sessionId: res.data.sessionId });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">User Fundings</h2>
        <button
          onClick={handleGiveFund}
          className="bg-green-600 text-white px-4 py-2 rounded"
        >
          Give Fund
        </button>
      </div>

      {isLoading ? (
        <p>Loading fundings...</p>
      ) : (
        <>
          <table className="w-full border-collapse mb-4">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="border px-4 py-2">Donor Name</th>
                <th className="border px-4 py-2">Amount</th>
                <th className="border px-4 py-2">Date</th>
              </tr>
            </thead>
            <tbody>
              {fundings?.data?.map((fund) => (
                <tr key={fund._id} className="border-b">
                  <td className="border px-4 py-2">{fund.donorName}</td>
                  <td className="border px-4 py-2">${(fund.amount / 100).toFixed(2)}</td>
                  <td className="border px-4 py-2">
                    {new Date(fund.date).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Pagination */}
          <div className="flex justify-end gap-2">
            {Array.from({ length: fundings.totalPages }, (_, idx) => (
              <button
                key={idx + 1}
                onClick={() => setPage(idx + 1)}
                className={`px-3 py-1 rounded ${
                  page === idx + 1 ? "bg-blue-600 text-white" : "bg-gray-200"
                }`}
              >
                {idx + 1}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FundingLinks;
