import React from "react";
import Dashboard from "./Dashboard";
import { useNavigate } from "react-router-dom";

const Job = () => {
  const navigate = useNavigate();
  return (
    <Dashboard>
      <div className="mt-12">
        <button
          className="bg-blue-600 text-white px-4 py-1 rounded-md shadow-lg hover:bg-blue-500"
          onClick={() => {
            navigate("/jobs/create-interview");
          }}
        >
          Create Interview
        </button>
      </div>
    </Dashboard>
  );
};

export default Job;
