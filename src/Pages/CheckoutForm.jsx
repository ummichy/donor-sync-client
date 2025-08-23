import React, { useContext, useEffect, useState } from 'react';
import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { AuthContext } from '../provider/AuthProvider';
import axios from 'axios';

const CheckoutForm = () => {
  const { user } = useContext(AuthContext);
  const [amount, setAmount] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    const { data } = await axios.post('https://assignment-no-twelve-server.vercel.app/create-payment-intent', { amount }, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('access-token')}`,
      }
    });

    const result = await stripe.confirmCardPayment(data.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: user?.displayName || "Anonymous",
          email: user?.email,
        },
      },
    });

    if (result.paymentIntent?.status === 'succeeded') {
      await axios.post('https://assignment-no-twelve-server.vercel.app/fundings', {
        name: user?.displayName,
        email: user?.email,
        amount: parseFloat(amount),
      }, {
        headers: {
          authorization: `Bearer ${localStorage.getItem('access-token')}`,
        }
      });

      alert('Funding successful!');
      setAmount('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-center gap-4">
        <input
          type="number"
          min="1"
          required
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="input input-bordered w-40"
          placeholder="Amount"
        />
        <button type="submit" className="btn btn-primary bg-[#5C0000] " disabled={!stripe}>
          Give Fund
        </button>
      </div>
      <div className="mt-4">
        <CardElement className="p-2 border rounded" />
      </div>
    </form>
  );
};

export default CheckoutForm;
