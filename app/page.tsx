import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import LogoBar from "@/components/sections/LogoBar";
import Features from "@/components/sections/Features";
import Pricing from "@/components/sections/Pricing";
import FAQ from "@/components/sections/FAQ";
import Waitlist from "@/components/sections/Waitlist";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="flex flex-1 flex-col">
        <Hero />
        <LogoBar />
        <Features />
        <Pricing />
        <FAQ />
        <Waitlist />
      </main>
      <Footer />
    </>
  );
}
