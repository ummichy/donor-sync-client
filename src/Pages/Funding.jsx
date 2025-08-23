import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../provider/AuthProvider';
import axios from 'axios';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from './CheckoutForm';


const stripePromise = loadStripe('pk_test_51RqfUDDqfPGLJevetn2bQQGZ4ezD52YTyp1M0hGYKHMRHeLehTjyZfwEaIcyReFuiQhXHAwq5ENyxiG5MmjbRp1r00sI3tyzza');

const Funding = () => {
  const { user } = useContext(AuthContext);
  const [fundings, setFundings] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);

  const limit = 5;

  useEffect(() => {
    axios.get(`https://assignment-no-twelve-server.vercel.app/fundings?page=${page}&limit=${limit}`)
      .then(res => {
        setFundings(res.data.fundings);
        setTotal(res.data.total);
      })
      .catch(err => console.error(err));
  }, [page]);

  return (
    <div className='py-28 px-20'>
      <h2 className='text-2xl font-semibold mb-4'>Funding Records</h2>

     
      <Elements stripe={stripePromise}>
        <CheckoutForm />
      </Elements>

     
      <div className="overflow-x-auto mt-6">
        <table className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Amount (USD)</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {fundings.map(fund => (
              <tr key={fund._id}>
                <td>{fund.name}</td>
                <td>${fund.amount}</td>
                <td>{new Date(fund.date).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination */}
      <div className="mt-4 flex gap-2">
        {Array.from({ length: Math.ceil(total / limit) }, (_, i) => (
          <button key={i} onClick={() => setPage(i + 1)}
            className={`btn ${page === i + 1 ? 'btn-primary' : 'btn-outline'}`}>
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Funding;
