import React, { useEffect, useState } from "react";
import { UserPlus, Droplet } from "lucide-react";
import axios from "axios";

const TotalUser = () => {
  const [userCount, setUserCount] = useState(0);
  const [donationCount, setDonationCount] = useState(0);

  // useEffect(() => {
  //   // Fetch all users
  //   axios.get("http://localhost:3000/users")
  //     .then(res => {
  //       const donors = res.data.filter(user => user.role === "donor");
  //       setUserCount(donors.length);
  //     })
  //     .catch(err => console.error("Error fetching users:", err));

  //   // Fetch all donations
  //   axios.get("http://localhost:3000/donations/all")
  //     .then(res => setDonationCount(res.data.length))
  //     .catch(err => console.error("Error fetching donations:", err));
  // }, []);
  useEffect(() => {
  // Fetch all users
  axios.get("http://localhost:3000/users")
    .then(res => {
      setUserCount(res.data.length); // total users
    })
    .catch(err => console.error("Error fetching users:", err));

  // Fetch all donations
  axios.get("http://localhost:3000/donations/all")
    .then(res => setDonationCount(res.data.length))
    .catch(err => console.error("Error fetching donations:", err));
}, []);

  const cards = [
    {
      title: "Total Donors",
      count: userCount,
      icon: <UserPlus className="w-10 h-10 text-blue-600" />,
      bg: "bg-blue-100"
    },
    {
      title: "Total Donation Requests",
      count: donationCount,
      icon: <Droplet className="w-10 h-10 text-red-600" />,
      bg: "bg-red-100"
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-4">
      {cards.map((card, idx) => (
        <div
          key={idx}
          className={`flex items-center justify-between rounded-xl p-6 shadow ${card.bg}`}
        >
          <div>
            <h3 className="text-xl font-semibold">{card.title}</h3>
            <p className="text-3xl font-bold mt-2">{card.count}</p>
          </div>
          <div>{card.icon}</div>
        </div>
      ))}
    </div>
  );
};

export default TotalUser;
