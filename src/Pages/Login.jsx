import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../Provider/AuthProvider';
import { toast } from 'react-toastify';

const Login = () => {
  useEffect(() => {
    document.title = "Login";
  }, []);

  const [error, setError] = useState('');
  const { signIn, setUser } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleEmailPasswordLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn(email, password)
      .then((result) => {
        setUser(result.user);
        setError('');
        toast.success('Logged in successfully!');
        navigate(location.state?.from || '/');
      })
      .catch((err) => {
        setError(err.message);
        toast.error('Login failed: ' + err.message);
      });
  };

  return (
    <div className="flex justify-center py-32 items-center px-2">
      <div className="card bg-base-100 w-full max-w-sm drop-shadow-lg py-5 px-4">
        <h2 className="font-semibold text-2xl text-center mb-4">Login your account</h2>
        <form onSubmit={handleEmailPasswordLogin} className="card-body space-y-2">
          <label>Email</label>
          <input name="email" type="email" className="input input-bordered" required />
          <label>Password</label>
          <input name="password" type="password" className="input input-bordered" required />
          {error && <p className="text-red-500 text-xs">{error}</p>}
          <button type="submit" className="btn btn-neutral hover:bg-blue-700 transition-colors">Login</button>
        </form>
        <p className="text-center pt-4">
          Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
