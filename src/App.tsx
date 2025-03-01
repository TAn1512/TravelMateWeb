import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { animateScroll } from "react-scroll";

import NavBar from "./components/organs/NavBar";
import Home from "./components/pages/Home";
import Dashboard from "./components/pages/Dashboard"; // Import trang Dashboard
import Footer from "./components/organs/Footer";

const App: React.FC = () => {
  const directory = useLocation();

  useEffect(() => {
    animateScroll.scrollToTop({
      duration: 0,
    });
  }, [directory.pathname]);

  const isDashboard = directory.pathname.startsWith("/dashboard");

  return (
    <div className="w-full bg-white text-gray-950 font-poppins relative">
      {!isDashboard && <NavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      {!isDashboard && <Footer />}
    </div>
  );
};

export default App;
