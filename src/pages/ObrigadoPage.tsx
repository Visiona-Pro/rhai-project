import ObrigadoTopBar from "../components/obrigado/TopBar";
import ObrigadoHeroSection from "../components/obrigado/HeroSection";
import ObrigadoVideoSection from "../components/obrigado/VideoSection";
import ObrigadoOfferSection from "../components/obrigado/OfferSection";

export default function ObrigadoPage() {
  return (
    <div className="relative w-full bg-[#050505] text-[#e5e7eb] font-sans antialiased overflow-x-hidden pb-12">

      {/* Ambient background lights */}
      <div className="absolute top-0 left-1/4 -translate-x-1/2 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] bg-gradient-to-br from-[#c4a34f]/10 to-transparent rounded-full blur-[90px] sm:blur-[140px] pointer-events-none" />
      <div className="absolute top-1/3 right-5 w-[250px] sm:w-[450px] h-[250px] sm:h-[450px] bg-gradient-to-bl from-[#e7c279]/5 to-transparent rounded-full blur-[80px] sm:blur-[120px] pointer-events-none" />
      <div className="absolute top-[85%] left-0 -translate-y-1/2 w-[200px] sm:w-[400px] h-[200px] sm:h-[400px] bg-gradient-to-tr from-[#c4a34f]/5 to-transparent rounded-full blur-[70px] sm:blur-[120px] pointer-events-none" />

      <ObrigadoTopBar />

      <main className="relative w-full flex flex-col gap-0 pb-0">
        <ObrigadoHeroSection />
        <ObrigadoVideoSection />
        <ObrigadoOfferSection />
      </main>
    </div>
  );
}
