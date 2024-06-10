import { AboutApp } from "@/components/landing/AboutApp";
import { AboutUs } from "@/components/landing/AboutUs";
import { Footer } from "@/components/landing/Footer";
import { Hero } from "@/components/landing/Hero";
import { Navbar } from "@/components/landing/Navbar";

function App() {
  return (
    <div className="bg-[#152959]">
      <Navbar />
      <Hero />
      <AboutApp />
      <AboutUs />
      <Footer />
    </div>
  );
}

export default App;
