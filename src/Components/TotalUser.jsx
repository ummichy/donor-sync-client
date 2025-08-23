import React, { useEffect, useState } from "react";
import { UserPlus, Droplet } from "lucide-react";
import axios from "axios";

const TotalUser = () => {
  const [userCount, setUserCount] = useState(0);
  const [donationCount, setDonationCount] = useState(0);

  // useEffect(() => {
  //   // Fetch all users
  //   axios.get("https://assignment-no-twelve-server.vercel.app/users")
  //     .then(res => {
  //       const donors = res.data.filter(user => user.role === "donor");
  //       setUserCount(donors.length);
  //     })
  //     .catch(err => console.error("Error fetching users:", err));

  //   // Fetch all donations
  //   axios.get("https://assignment-no-twelve-server.vercel.app/donations/all")
  //     .then(res => setDonationCount(res.data.length))
  //     .catch(err => console.error("Error fetching donations:", err));
  // }, []);
  useEffect(() => {
  // Fetch all users
  axios.get("https://assignment-no-twelve-server.vercel.app/users")
    .then(res => {
      setUserCount(res.data.length); // total users
    })
    .catch(err => console.error("Error fetching users:", err));

  // Fetch all donations
  axios.get("https://assignment-no-twelve-server.vercel.app/donations/all")
    .then(res => setDonationCount(res.data.length))
    .catch(err => console.error("Error fetching donations:", err));
}, []);

  const cards = [
    {
      title: "Total Donors",
      count: userCount,
      icon: <UserPlus className="w-10 h-10 text-[#5C0000]" />,
      bg: "bg-[#f8f2ea]"
    },
    {
      title: "Total Donation Requests",
      count: donationCount,
      icon: <Droplet className="w-10 h-10 text-[#5C0000]" />,
      bg: "bg-[#f8f2ea]"
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
