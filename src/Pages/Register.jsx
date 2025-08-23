import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser } = useContext(AuthContext);

  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState("");
  const [filteredUpazilas, setFilteredUpazilas] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/district.json")
      .then((res) => res.json())
      .then(setDistricts)
      .catch(console.error);
  }, []);

  useEffect(() => {
    fetch("/upazila.json")
      .then((res) => res.json())
      .then(setUpazilas)
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (selectedDistrictId) {
      const filtered = upazilas.filter(
        (upazila) => upazila.district_id === selectedDistrictId
      );
      setFilteredUpazilas(filtered);
    } else {
      setFilteredUpazilas([]);
    }
  }, [selectedDistrictId, upazilas]);

  const handleRegister = (e) => {
    e.preventDefault();
    setError("");

    const form = e.target;
    const email = form.email.value;
    const name = form.name.value;
    const avatar = form.avatar.value;
    const bloodGroup = form.blood.value;
    const district = form.district.value;
    const upazila = form.upazila.value;
    const password = form.password.value;
    const confirm = form.confirm.value;

    if (password !== confirm) {
      setError("Passwords do not match");
      return;
    }

    createUser(email, password)
      .then((res) => {
        const registeredUser = res.user;

        updateProfile(registeredUser, {
          displayName: name,
          photoURL: avatar,
        }).then(() => {
          fetch("https://assignment-no-twelve-server.vercel.app/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              name,
              avatar,
              bloodGroup,
              district,
              upazila,
              role: "donor",
              status: "active",
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log("User saved to DB:", data);
              form.reset();
              setSelectedDistrictId("");
              setFilteredUpazilas([]);
            })
            .catch(console.error);

          form.reset();
          setSelectedDistrictId("");
          setFilteredUpazilas([]);
        });
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
      });
  };

  return (
    <div className="max-w-xl mx-auto my-28 px-8 py-10 bg-white border border-gray-200 rounded-2xl shadow-lg">
      <h2 className="text-3xl font-semibold text-center text-[#5C0000] mb-2">
        Create Your Account
      </h2>
      <p className="text-center text-sm text-gray-500 mb-6">
        Join our community of blood donors and save lives.
      </p>

      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C0000]/40"
        />
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C0000]/40"
        />
        <input
          type="url"
          name="avatar"
          placeholder="Avatar URL (optional)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C0000]/40"
        />

        <select
          name="blood"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600"
        >
          <option value="">Select Blood Group</option>
          {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map((group) => (
            <option key={group} value={group}>
              {group}
            </option>
          ))}
        </select>

        <select
          name="district"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600"
          onChange={(e) => setSelectedDistrictId(e.target.value)}
        >
          <option value="">Select District</option>
          {districts.map((district) => (
            <option key={district.id} value={district.id}>
              {district.name}
            </option>
          ))}
        </select>

        <select
          name="upazila"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-600"
        >
          <option value="">Select Upazila</option>
          {filteredUpazilas.map((upazila) => (
            <option key={upazila.id} value={upazila.name}>
              {upazila.name}
            </option>
          ))}
        </select>

        <input
          type="password"
          name="password"
          placeholder="Password"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C0000]/40"
        />
        <input
          type="password"
          name="confirm"
          placeholder="Confirm Password"
          required
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#5C0000]/40"
        />

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          className="w-full bg-[#5C0000] text-white py-2.5 rounded-lg font-semibold hover:bg-[#430000] transition duration-200"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
