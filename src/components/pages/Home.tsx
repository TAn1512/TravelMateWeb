import { useEffect } from "react";
import BookingSteps from "../organs/BookingSteps";
import HeroSection from "../organs/HeroSection";
import NewsLetter from "../organs/NewsLetter";
import Services from "../organs/Services";

const Home = () => {
  useEffect(() => {
    // Tạo script để config chatbot
    const script1 = document.createElement("script");
    script1.innerHTML = `window.chtlConfig = { chatbotId: "7769621771" };`;
    document.body.appendChild(script1);

    // Tạo script để nhúng chatbot
    const script2 = document.createElement("script");
    script2.src = "https://chatling.ai/js/embed.js";
    script2.async = true;
    script2.dataset.id = "7769621771";
    script2.id = "chatling-embed-script";
    document.body.appendChild(script2);

    // Cleanup khi component unmount
    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return (
    <>
      <HeroSection />
      <Services />
      <BookingSteps />
      <NewsLetter />
    </>
  );
};

export default Home;
