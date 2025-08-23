import { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Link } from "react-router";
import Swal from "sweetalert2";
import { AuthContext } from "../provider/AuthProvider";
import { auth } from "../firebase/firebase.config";

const Login = () => {
  const { user } = useContext(AuthContext);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    const email = e.target.email.value;
    const password = e.target.password.value;

    signInWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log("Logged in user:", res.user);
        Swal.fire({
          icon: "success",
          title: "Login Successful",
          text: "Welcome back!",
          timer: 1500,
          showConfirmButton: false,
        });
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        setError("Invalid email or password.");
      });
  };

  return (
    <div className="max-w-md mx-auto my-30 px-8 py-10 bg-white border rounded-2xl shadow-lg space-y-5">
      <h2 className="text-3xl font-semibold text-center text-[#5C0000]">Welcome Back</h2>
      <p className="text-center text-gray-500 text-sm">Log in to continue to your account</p>

      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1 text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C0000]/50"
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-1 text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            name="password"
            placeholder="Enter your password"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#5C0000]/50"
          />
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}

        <button
          type="submit"
          className="w-full bg-[#5C0000] text-white py-2.5 rounded-lg font-semibold hover:bg-[#430000] transition duration-200"
        >
          Login
        </button>
      </form>

      <p className="text-sm text-center mt-4 text-gray-600">
        New to our platform?{" "}
        <Link to="/register" className="text-[#5C0000] font-medium hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
