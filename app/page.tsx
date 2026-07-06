import { FooterMissionLog } from "@/components/FooterMissionLog";
import { Hero } from "@/components/Hero";
import { Navbar } from "@/components/Navbar";
import { TelemetryCard } from "@/components/TelemetryCard";
import { planets } from "@/data/planets";

const heroPlanet = planets.find((planet) => planet.name === "Etheron") ?? planets[0];

export default function Home() {
  return (
    <div className="min-h-screen bg-void-950">
      <Navbar />
      <main>
        <Hero planet={heroPlanet} />
        <section id="catalogue" className="section-gap shell-container">
          <div className="mb-10 md:mb-14">
            <p className="text-label text-text-500">Orbital Catalogue</p>
            <h2 className="text-display-l text-text-100">Live Telemetry Feed</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-3">
            {planets.map((planet) => (
              <TelemetryCard key={planet.name} planet={planet} />
            ))}
          </div>
        </section>
      </main>
      <FooterMissionLog />
    </div>
  );
}
