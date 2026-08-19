import React from "react";
import Navbar from "../components/home/Navbar";
import HeroSection from "../components/home/HeroSection";
import AboutSection from "../components/home/AboutSection";
import ServicesSection from "../components/home/ServicesSection";
import ApproachSection from "../components/home/ApproachSection";
import TestimonialsSection from "../components/home/TestimonialsSection";
import FaqSection from "../components/home/FaqSection";
import ContactSection from "../components/home/ContactSection";
import Footer from "../components/home/Footer";
import BookingNextSteps from "../components/home/BookingNextSteps";

export default function Home() {
  return (
    <div className="font-body">
      <Navbar />
      <BookingNextSteps />
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <ApproachSection />
      <TestimonialsSection />
      <FaqSection />
      <ContactSection />
      <Footer />
    </div>
  );
}