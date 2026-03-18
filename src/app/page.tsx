import dynamic from "next/dynamic";
import { Header } from "@/components/layout/Header";
import { ScrollProgress } from "@/components/animations";
import { HeroSlider } from "@/components/HeroSlider";

const About = dynamic(() => import("@/components/sections/About").then((m) => m.About));
const Awards = dynamic(() => import("@/components/sections/Awards").then((m) => m.Awards));
const Sponsors = dynamic(() => import("@/components/sections/Sponsors").then((m) => m.Sponsors));
const Schedule = dynamic(() => import("@/components/sections/Schedule").then((m) => m.Schedule));
const CTA = dynamic(() => import("@/components/sections/CTA").then((m) => m.CTA));

export default function Home() {
  return (
    <main className="min-h-screen overflow-x-hidden">
      <ScrollProgress />
      <Header />
      <HeroSlider />
      <About />
      <Awards />
      <Sponsors />
      <Schedule />
      <CTA />
    </main>
  );
}
