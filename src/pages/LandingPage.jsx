import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import About from "../components/About";
import Features from "../components/Features";
import CTA from "../components/CTA";
import Footer from "../components/Footer";
import AuthModal from "../components/AuthModal";
import { useState } from "react";

export default function LandingPage() {
    const [isAuthOpen, setIsAuthOpen] = useState(false);
  return (
    <div className="min-h-screen selection:bg-primary/30">
      <Navbar onLoginClick={() => setIsAuthOpen(true)} />
      <main>
        <Hero />
        <About />
        <Features />
        <CTA />
      </main>
      <Footer />

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => setIsAuthOpen(false)} 
      />
    </div>
  );
}