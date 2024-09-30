import { NavLink, useLocation, useNavigate } from "react-router-dom"; 
import { useState } from "react";

const Navbar = () => {
  useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const storageKey = "loggedInUser";
  const userDataString = localStorage.getItem(storageKey);
  const userData = userDataString ? JSON.parse(userDataString) : null;
  
  const navigate = useNavigate();

  const onLogout = () => {
    localStorage.removeItem(storageKey);
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  };
// @ts-ignore
  const handleHomeClick = (e) => {
    if (!userData) {
      e.preventDefault();  
      alert("You can only go to the Home page after logging in!");
      navigate("/login"); 
    }
  };

  return (
    <nav className="bg-white shadow-md w-full px-5 py-1 rounded-md relative z-50">
      <div className="flex items-center justify-between opacity-100">
        <div className="flex items-center space-x-2 mx-auto animate-logo">
          <svg
            className="h-8 w-8 text-black transition-transform duration-300 hover:scale-110"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 0C5.372 0 0 5.372 0 12c0 6.627 5.372 12 12 12 6.627 0 12-5.373 12-12C24 5.372 18.627 0 12 0zm0 22c-5.522 0-10-4.478-10-10S6.478 2 12 2s10 4.478 10 10-4.478 10-10 10zm-1-15h2v5h-2v-5zm0 6h2v2h-2v-2z" />
          </svg>
          <span className="text-black font-semibold text-xl transition-colors duration-300 hover:text-blue-600">Country</span>
          <span className="text-black font-semibold text-xl transition-colors duration-300 hover:text-blue-600">Search</span>
        </div>

        <div className="md:hidden flex items-center">
          <button
            className="text-black focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg
              className="w-8 h-8"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>

        <ul className="hidden md:flex items-center space-x-6">
          <li className="text-black duration-200 font-semibold text-lg hover:text-blue-600 transform hover:scale-105 transition-all">
            <NavLink to="/" onClick={handleHomeClick}>Home</NavLink>
          </li>
          {userData ? (
            <div className="flex items-center text-black space-x-4">
              <button
                className="bg-black text-white p-2 rounded-md cursor-pointer transition-colors duration-300 hover:bg-blue-600"
                onClick={onLogout}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-3">
              <li className="text-black duration-200 font-semibold text-lg hover:text-blue-600 transform hover:scale-105 transition-all">
                <NavLink to="/register">Register</NavLink>
              </li>
              <li className="text-black duration-200 font-semibold text-lg hover:text-blue-600 transform hover:scale-105 transition-all">
                <NavLink to="/login">Login</NavLink>
              </li>
            </div>
          )}
        </ul>

        {menuOpen && (
          <ul className="md:hidden flex flex-col items-start space-y-1 fixed top-8 right-3 w-40 bg-white p-4 shadow-lg rounded-md z-50">
            <button className="bg-black text-white p-1 rounded-md w-full text-sm transition-colors duration-300 hover:bg-blue-600">
              <NavLink to="/" onClick={(e) => { handleHomeClick(e); setMenuOpen(false); }}>
                Home
              </NavLink>
            </button>
            <button className="bg-black text-white p-1 rounded-md w-full text-sm transition-colors duration-300 hover:bg-blue-600">
              <NavLink to="/register" onClick={() => setMenuOpen(false)}>
                Register
              </NavLink>
            </button>
            {userData ? (
              <button
                className="bg-black text-white p-1 rounded-md w-full text-sm transition-colors duration-300 hover:bg-blue-600"
                onClick={() => {
                  setMenuOpen(false);
                  onLogout();
                }}
              >
                Logout
              </button>
            ) : (
              <button className="bg-black text-white p-1 rounded-md w-full text-sm transition-colors duration-300 hover:bg-blue-600">
                <NavLink to="/login" onClick={() => setMenuOpen(false)}>
                  Login
                </NavLink>
              </button>
            )}
          </ul>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
