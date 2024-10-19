import React from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className="flex min-h-screen h-auto">
      {/* Sidebar */}
      <aside className="w-16 bg-gray-900 text-white">
        <div className="flex flex-col items-center py-4">
          {/* Logo or icon */}
          <div className="flex items-center justify-center h-12 w-12 bg-blue-500 rounded-full mb-4">
            <span className="text-white font-bold">C</span>
          </div>
          {/* Home Icon */}
          <div className="flex items-center justify-center h-10 w-10 mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M13 5v6h6v8H5v-8h6V5z"
              />
            </svg>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 p-6 bg-white">
        {/* Top Navbar */}
        <div className="flex justify-between items-center">
          <div className="text-2xl font-bold">Cuvette</div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600">Contact</button>
            {/* Profile Dropdown */}
            <div className="relative">
              <div className="flex items-center border rounded-sm px-4 py-2 text-gray-600 cursor-pointer">
                <span>Your Name</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 ml-2 text-gray-600"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.292 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
            {sessionStorage.getItem("token") ? (
              <button
                className="text-gray-600 border rounded-sm px-4 py-2 cursor-pointer"
                onClick={() => {
                  sessionStorage.removeItem("token");
                  navigate("/");
                }}
              >
                Logout
              </button>
            ) : (
              ""
            )}
          </div>
        </div>

        {children}
      </div>
    </div>
  );
};

export default Dashboard;
