import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Features from "../components/Features";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import TrainBackground from "../components/TrainBackground"; // Import here

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-bg-light dark:bg-bg-dark">
      {/* Animation Layer */}
      <TrainBackground />
      
      {/* Content Layer (Ensure relative and z-10 so it sits above the train) */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Features />
          <CTA />
        </main>
        <Footer />
      </div>
    </div>
  );
}