import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Catalogue from "@/components/Catalogue";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Catalogue />
      </main>
      <Footer />
    </>
  );
}
