import { useState } from "react";
import SetPremium from "../organs/SetPremium";
import Statistic from "../organs/Statistic";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("premium");

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Dashboard</h2>
        <ul>
          <li
            className={`p-3 rounded-lg cursor-pointer mb-2 text-gray-700 hover:bg-gray-200 ${
              activeTab === "premium"
                ? "bg-blue-500 text-white font-semibold"
                : ""
            }`}
            onClick={() => setActiveTab("premium")}
          >
            Set Premium Account
          </li>
          <li
            className={`p-3 rounded-lg cursor-pointer text-gray-700 hover:bg-gray-200 ${
              activeTab === "statistics"
                ? "bg-blue-500 text-white font-semibold"
                : ""
            }`}
            onClick={() => setActiveTab("statistics")}
          >
            Statistics
          </li>
        </ul>
      </div>

      {/* Content */}
      <div className="flex-1 p-6">
        {activeTab === "premium" && <SetPremium />}
        {activeTab === "statistics" && <Statistic />}
      </div>
    </div>
  );
};

export default Dashboard;
