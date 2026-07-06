import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import TelemetryOverlay from "@/components/TelemetryOverlay";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

export const metadata = {
  title: "Meta Planet — Exoplanet Discovery & Cataloguing",
  description:
    "Patch into a live deep-space transmission. Explore exoplanets from the far reaches of the cosmos — Etheron, Lumenara, Orionis — charted in real-time telemetry.",
  keywords: ["exoplanet", "space", "discovery", "telemetry", "planets", "deep space"],
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <TelemetryOverlay />
        {children}
      </body>
    </html>
  );
}

