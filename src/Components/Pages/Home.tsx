import Hero from "../Specified Components/Hero";
import Features from "../Specified Components/Features";
import Integration from "../Specified Components/Integration";
import CallToAction from "../Specified Components/CallToAction";
import GSAPReveal from "../ui/GSAPReveal";

export default function Home() {
  return (
    <>
      <Hero />

      <Features />

      <GSAPReveal width="100%">
        <Integration />
      </GSAPReveal>

      <GSAPReveal width="100%">
        <CallToAction />
      </GSAPReveal>
      
      {/* <Solutions /> */}
      {/* <FAQs /> */}
    </>
  );
}
