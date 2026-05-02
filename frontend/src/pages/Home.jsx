import { useEffect, useState } from "react";
import { fetchPortfolio } from "../api";

import Header from "../components/Header";
import About from "../components/About";
import Skills from "../components/Skills";
import Projects from "../components/Projects";
import Services from "../components/Services";
import Contact from "../components/Contact";
import Footer from "../components/Footer";

export default function Home() {
  const [portfolio, setPortfolio] = useState(null);
  const [status, setStatus] = useState("Loading portfolio...");

  useEffect(() => {
    fetchPortfolio()
      .then(setPortfolio)
      .catch((error) => {
        console.error(error);
        setStatus("Unable to load portfolio data: " + error.message);
      });
  }, []);

  if (!portfolio) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center px-6 py-12">
        <div className="bento-card p-14 text-center max-w-xl">
          <p className="text-xl font-medium tracking-tight animate-pulse">{status}</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header hero={portfolio.hero} />
      <main className="mt-12 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <About about={portfolio.about} />
          </div>
          <div className="lg:col-span-1">
            <Skills skills={portfolio.skills} />
          </div>
        </div>
        <Projects projects={portfolio.projects} />
        <Services services={portfolio.services} />
        <Contact contact={portfolio.contact} />
        <Footer />
      </main>
    </>
  );
}
