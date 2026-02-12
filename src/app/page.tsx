import {
  About,
  Awards,
  Sponsors,
  Schedule,
  CTA,
} from "@/components/sections";
import { Header } from "@/components/layout/Header";
import { ScrollProgress } from "@/components/animations";
import { HeroSlider } from "@/components/HeroSlider";

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
