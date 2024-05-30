// import { About } from "@/components/landing/About";
// import { Cta } from "@/components/landing/Cta";
// import { FAQ } from "@/components/landing/FAQ";
// import { Features } from "@/components/landing/Features";
// import { Footer } from "@/components/landing/Footer";
// import { Hero } from "@/components/landing/Hero";
// import { HowItWorks } from "@/components/landing/HowItWorks";
// import { Navbar } from "@/components/landing/Navbar";
// import { Newsletter } from "@/components/landing/Newsletter";
// import { Pricing } from "@/components/landing/Pricing";
// import { ScrollToTop } from "@/components/landing/ScrollToTop";
// import { Services } from "@/components/landing/Services";
// import { Sponsors } from "@/components/landing/Sponsors";
// import { Team } from "@/components/landing/Team";
// import { Testimonials } from "@/components/landing/Testimonials";
// import MacbookScrollSection from "@/components/landing_target/MacbookScrollSection";

import AboutApp from "@/components/landing_target/AboutApp";
import AboutUs from "@/components/landing_target/AboutUs";
import Hero from "@/components/landing_target/Hero";
import Navbar from "@/components/landing_target/Navbar";
import Footer from "@/components/landing_target/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutApp />
      <AboutUs />
      <Footer/>
      {/* <About />
      <Features />
      <Team />
      <Newsletter />
      <FAQ />
      <Footer />
      <ScrollToTop /> */}
    </>
  );
}

export default App;
