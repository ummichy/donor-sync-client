import React, { useState, useEffect, useRef } from 'react';
import { Outlet, useLocation } from 'react-router';
// import Loader from '../pages/Loader';
// import Footer from '../components/Footer';
// import Navbar from '../components/Navbar';
import Loader from '../Pages/Loader';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';

const MyLayouts = () => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const prevPath = useRef(location.pathname);

  const routesWithLoader = ['/', '/profile', '/dashboard', '/service', '/notfound'];

  const shouldShowLoader = (pathname) => {
    return routesWithLoader.some(route =>
      pathname === route || pathname.startsWith(route + '/')
    );
  };

  useEffect(() => {
    // First load
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const from = prevPath.current;
    const to = location.pathname;

    const fromNeedsLoader = shouldShowLoader(from);
    const toNeedsLoader = shouldShowLoader(to);

    if (from !== to && (fromNeedsLoader || toNeedsLoader)) {
      setLoading(true); // show immediately
      const timer = setTimeout(() => {
        setLoading(false); // then hide
      }, 1000);
      prevPath.current = to;
      return () => clearTimeout(timer);
    }
  }, [location.pathname]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className='poppins flex flex-col min-h-screen'>
          <Navbar />
          <div className="flex-1 bg-gradient-to-b from-[#f5eadd] to-white">
            <Outlet />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
};

export default MyLayouts;