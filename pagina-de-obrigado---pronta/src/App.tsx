/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import TopBar from "./components/TopBar";
import HeroSection from "./components/HeroSection";
import OfferSection from "./components/OfferSection";
export default function App() {
  return (
    <div className="relative w-full bg-[#050505] text-[#e5e7eb] font-sans antialiased overflow-x-hidden pb-0">
      
      {/* Sticky top-bar indicating purchase confirmation */}
      <TopBar />

      {/* Absolute Ambient Background Lights for Luxury/Premium Vibe */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-gradient-to-br from-[#c4a34f]/10 to-transparent rounded-full blur-[90px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-5 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] bg-gradient-to-bl from-[#e7c279]/5 to-transparent rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute top-[85%] left-0 -translate-y-1/2 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-gradient-to-tr from-[#c4a34f]/5 to-transparent rounded-full blur-[70px] sm:blur-[120px] pointer-events-none" />

      {/* Main Single Page Layout Container */}
      <main className="relative w-full flex flex-col gap-0 pb-0">
        <HeroSection />
        <OfferSection />
      </main>
      
    </div>
  );
}

