import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import registerLottie from "../assets/Lotties/lottie.json";

const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const Register = () => {
  const { createUser, setUser, updateUser } = useContext(AuthContext);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [upazilas, setUpazilas] = useState([]);
  const navigate = useNavigate();

  // Load districts and upazilas from public folder JSONs
  useEffect(() => {
    fetch("/district.json")
      .then((res) => res.json())
      .then((data) => setDistricts(data));

    fetch("/upazila.json")
      .then((res) => res.json())
      .then((data) => setUpazilas(data));
  }, []);

  const validatePassword = (password) => {
    return /[A-Z]/.test(password) && /[a-z]/.test(password) && password.length >= 6;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const photo = form.photo.value;
    const email = form.email.value;
    const password = form.password.value;
    const confirm = form.confirm.value;
    const blood = form.blood.value;
    const district = form.district.value;
    const upazila = form.upazila.value;

    setError("");

    if (!validatePassword(password)) {
      toast.error("Password must include uppercase, lowercase, and be at least 6 characters.");
      return;
    }

    if (password !== confirm) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      const result = await createUser(email, password);
      await updateUser({ displayName: name, photoURL: photo });
      setUser({
        ...result.user,
        displayName: name,
        photoURL: photo,
        blood,
        district,
        upazila,
        role: "donor",
        status: "active",
      });
      toast.success("Registration successful!");
      navigate("/");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row items-center justify-center pt-32 pb-10 px-4 max-w-screen-xl mx-auto gap-10">
      <div className="bg-[#edeceb] w-full lg:w-1/2">
        <div className="card bg-base-100 w-full shadow-2xl p-6">
          <h2 className="font-semibold text-2xl text-center">Register your account</h2>
          <form onSubmit={handleRegister} className="card-body p-0 mt-4 space-y-2">

            <label>Name</label>
            <input name="name" type="text" className="input input-bordered w-full" required />

            <label>Photo URL (ImageBB)</label>
            <input name="photo" type="text" className="input input-bordered w-full" required />

            <label>Email</label>
            <input name="email" type="email" className="input input-bordered w-full" required />

            <label>Blood Group</label>
            <select name="blood" className="select select-bordered w-full" required>
              <option value="">Select Blood Group</option>
              {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
            </select>

            <label>District</label>
            <select name="district" className="select select-bordered w-full" required>
              <option value="">Select District</option>
              {districts.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
            </select>

            <label>Upazila</label>
            <select name="upazila" className="select select-bordered w-full" required>
              <option value="">Select Upazila</option>
              {upazilas.map(u => <option key={u.id} value={u.name}>{u.name}</option>)}
            </select>

            <label>Password</label>
            <div className="relative">
              <input name="password" type={showPassword ? "text" : "password"} className="input input-bordered w-full" required />
              <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            <label>Confirm Password</label>
            <div className="relative">
              <input name="confirm" type={showConfirm ? "text" : "password"} className="input input-bordered w-full" required />
              <button type="button" className="absolute right-3 top-1/2 transform -translate-y-1/2" onClick={() => setShowConfirm(!showConfirm)}>
                {showConfirm ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {error && <p className="text-error text-sm">{error}</p>}

            <button type="submit" className="btn btn-neutral mt-4 hover:bg-blue-700 transition-colors">Register</button>

            <p className="text-center mt-3">
              Already have an account? <Link className="text-blue-600" to="/login">Login</Link>
            </p>
          </form>
        </div>
      </div>

      <div className="w-full lg:w-1/2 hidden lg:flex justify-center">
        <Lottie style={{ width: '300px' }} animationData={registerLottie} loop={true}></Lottie>
      </div>
    </div>
  );
};

export default Register;
