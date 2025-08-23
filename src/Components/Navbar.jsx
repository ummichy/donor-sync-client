import { useState, useContext, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router";
import { Menu, X, ChevronDown } from "lucide-react";
import { AuthContext } from "../provider/AuthProvider";
import { GiBlood } from "react-icons/gi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { user, logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { name: "Home" },
    { name: "Donation Requests", path: "/Blood-req" },
    { name: "Blog", path: "/blogs" },
    
  ];

  const linkClasses = ({ isActive }) =>
    isActive
      ? "text-[#5C0000]  font-semibold"
      : "text-gray-700 hover:text-[#5C0000]  transition duration-200";

  const handleLogout = () => {
    logOut()
      .then(() => {
        navigate("/login");
      })
      .catch((err) => console.error(err));
  };

  return (
    <nav className="bg-white/70 backdrop-blur-md shadow border-b border-white/20 fixed top-0 left-0 right-0 z-50
   
    ">
      <div className="mx-auto px-4 sm:px-6 lg:px-32">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="text-2xl font-bold text-[#5C0000]">
            <div className="flex items-center gap-2">
              <GiBlood />
              <h1>DONOR SYNC</h1>
            </div>
          </NavLink>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 items-center">
            {navItems.map((item) => (
              <NavLink key={item.name} to={item.path} className={linkClasses}>
                {item.name}
              </NavLink>
            ))}

            {user && (
              <NavLink to="/funding" className={linkClasses}>
                Funding
              </NavLink>
            )}

            {!user && (
              <NavLink
                to="/login"
                className="bg-[#5C0000]  text-white px-4 py-2 rounded-lg hover:bg-[#5C0000]  transition"
              >
                Login
              </NavLink>
            )}

            {user && (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen((prev) => !prev)}
                  className="flex items-center space-x-2 focus:outline-none"
                  title={user.displayName || "User"}
                >
                  <img
                    src={user.photoURL || "/default-avatar.png"}
                    alt="avatar"
                    className="w-8 h-8 rounded-full object-cover border border-gray-300"
                  />
                  <ChevronDown size={16} />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg py-2 z-50">
                    <NavLink
                      to="/dashboard"
                      className="block px-4 py-2 text-gray-700 hover:bg-[#f8f2ea]"
                      onClick={() => setDropdownOpen(false)}
                    >
                      Dashboard
                    </NavLink>
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        handleLogout();
                      }}
                      className="w-full text-left px-4 py-2 text-gray-700 hover:bg-[#f8f2ea] "
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-700 focus:outline-none"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isOpen && (
        <div className="md:hidden bg-white/80 backdrop-blur-md px-4 pb-4 pt-2 shadow-md space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block ${
                  isActive
                    ? "text-[#5C0000]  font-semibold"
                    : "text-gray-700 hover:text-[#5C0000] "
                }`
              }
            >
              {item.name}
            </NavLink>
          ))}

          {user && (
            <>
              <NavLink
                to="/funding"
                onClick={() => setIsOpen(false)}
                className="block text-gray-700 hover:text-[#5C0000] "
              >
                Funding
              </NavLink>

              <NavLink
                to="/dashboard"
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2 text-gray-700 hover:bg-[#5C0000]  rounded"
              >
                Dashboard
              </NavLink>
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-[#5C0000]  rounded"
              >
                Logout
              </button>
            </>
          )}

          {!user && (
            <NavLink
              to="/login"
              onClick={() => setIsOpen(false)}
              className="block mt-2 bg-[#5C0000]  text-white text-center px-4 py-2 rounded-lg hover:bg-[#5C0000] "
            >
              Login
            </NavLink>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
