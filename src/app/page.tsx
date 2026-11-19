import { Challenge } from "@/components/sections/challenge";
import { Dimensions } from "@/components/sections/dimensions";
import { Faq } from "@/components/sections/faq";
import { FinalCta } from "@/components/sections/final-cta";
import { Hero } from "@/components/sections/hero";
import { Impact } from "@/components/sections/impact";
import { Platform } from "@/components/sections/platform";
import { Process } from "@/components/sections/process";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Challenge />
      <Platform />
      <Dimensions />
      <Process />
      <Impact />
      <Faq />
      <FinalCta />
    </>
  );
}
