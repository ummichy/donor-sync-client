import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../Components/Navbar';
import { Outlet, useLocation } from 'react-router';
import Footer from '../Components/Footer';
import Loader from '../Pages/Loader';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MainLayout = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const prevPath = useRef(location.pathname);

  const routesWithLoader = ['/', '/donation-requests', '/register', '/login', '/blog', '/funding-links'];

  const shouldShowLoader = (pathname) => {
    return routesWithLoader.some(route =>
      pathname === route || pathname.startsWith(route + '/') || (route === '*' && pathname === '/notfound')
    );
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const from = prevPath.current;
    const to = location.pathname;

    const fromNeedsLoader = shouldShowLoader(from);
    const toNeedsLoader = shouldShowLoader(to);

    if (from !== to && (fromNeedsLoader || toNeedsLoader)) {
      setLoading(true);
      const timer = setTimeout(() => {
        setLoading(false);
      }, 1500);

      prevPath.current = to;

      return () => clearTimeout(timer);
    } else {
      prevPath.current = to;
    }
  }, [location.pathname]);

 
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      {loading ? (
        <Loader />
      ) : (
        <div className="poppins flex flex-col min-h-screen">
          <Navbar />
          <div className="flex-1  ">
            <Outlet />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default MainLayout;
