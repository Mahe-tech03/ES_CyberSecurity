import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useLayoutEffect } from "react";
import Navbar from "./Components/Wrapper Components/Navbar";
import Footer from "./Components/Wrapper Components/Footer";
import Home from "./Components/Pages/Home";
import Contact from "./Components/Specified Components/contact";
import Faq from "./Components/Specified Components/FAQs";
import GlassyCursor from "./Components/ui/GlassyCursor";
import Plasma from "./Components/ui/Plasma";

import SmoothScroll from "./Components/Wrapper Components/SmoothScroll";

function ScrollHandler() {
  const { pathname, hash } = useLocation();

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    if (!hash) {
      window.scrollTo(0, 0);
      const timer = setTimeout(() => window.scrollTo(0, 0), 50);
      return () => clearTimeout(timer);
    } else {
      const id = hash.replace("#", "");
      const el = document.getElementById(id);
      if (el) {
        setTimeout(() => {
          el.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      {/* Fullscreen Plasma Background */}
      
      
      <SmoothScroll />
      <GlassyCursor />
      <ScrollHandler />
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>

      <Faq />
      <Footer />
      <Plasma 
        fullscreen={true}
        color="#9c5af2"
        speed={2}
        direction="forward"
        scale={1}
        opacity={0.1}
        mouseInteractive={true}
      />
    </BrowserRouter>
  );
}
