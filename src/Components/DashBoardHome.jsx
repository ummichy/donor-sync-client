

import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../provider/AuthProvider';
import SpecificDonorReq from '../components/SpecificDonorReq'; // Adjust path if needed
import TotalUser from './TotalUser';

const DashboardHome = () => {
  const { user } = useContext(AuthContext);
  const [role, setRole] = useState('');

  useEffect(() => {
    if (user?.email) {
      axios
        .get(`http://localhost:3000/users/${user.email}`)
        .then((res) => {
          setRole(res.data?.role || '');
        })
        .catch((err) => {
          console.error('Error fetching user role:', err);
        });
    }
  }, [user]);

  const renderRoleMessage = () => {
    if (role === 'donor') {
      return (
        <>
          You're logged in as a{' '}
          <span className="font-semibold text-green-600">Donor</span>. Thank you for your donations!
        </>
      );
    } else if (role === 'volunteer') {
      return (
        <>
          You're logged in as a{' '}
          <span className="font-semibold text-blue-600">Volunteer</span>. Thank you for your dedicated work!
        </>
      );
    } else if (role === 'admin') {
      return (
        <>
          You're logged in as an{' '}
          <span className="font-semibold text-purple-600">Admin</span>.
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-2xl md:text-3xl font-semibold text-indigo-700">
        Welcome{user?.displayName ? `, ${user.displayName}` : ''}!
      </h1>
      <p className="mt-2 text-gray-600">{renderRoleMessage()}</p>

      {/* Show recent donation requests if donor */}
      {role === 'donor' && <SpecificDonorReq></SpecificDonorReq>}
      {role === 'admin' && <TotalUser></TotalUser>}
      {role === 'volunteer' && <TotalUser></TotalUser>}
    </div>
  );
};

export default DashboardHome;


