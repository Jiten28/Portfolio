import FadeIn from "./FadeIn";
import ContactButton from "./ContactButton";
import Navbar from "./Navbar";
import GlassCursorLayer from "./GlassCursorLayer";
import GlowHeading from "./GlowHeading";
import RevealKeyword from "./RevealKeyword";

const keywords = [
  { text: "Neural Networks", top: "16%", left: "6%" },
  { text: "React.js", top: "20%", left: "34%" },
  { text: "Generative AI", top: "17%", left: "60%" },
  { text: "LLM Apps", top: "22%", left: "85%" },
  { text: "Python", top: "15%", left: "46%" },
  { text: "TensorFlow", top: "78%", left: "6%" },
  { text: "Flask API", top: "85%", left: "26%" },
  { text: "RAG Pipelines", top: "76%", left: "48%" },
  { text: "Deep Learning", top: "90%", left: "62%" },
  { text: "Computer Vision", top: "78%", left: "84%" },
];

const HEADING_CLASSES =
  "hero-heading font-black uppercase tracking-tight leading-none whitespace-nowrap w-full text-[14vw] sm:text-[15vw] md:text-[16vw] lg:text-[17.5vw] text-center";

export default function HeroSection() {
  return (
    <section className="h-screen flex flex-col relative" style={{ overflowX: "clip" }}>
      <GlassCursorLayer>
        <div className="h-screen flex flex-col relative">
          {keywords.map((k) => (
            <RevealKeyword key={k.text} text={k.text} top={k.top} left={k.left} />
          ))}

          <Navbar />

          {/* Heading -- centered in the remaining space */}
          <div className="flex-1 flex items-center justify-center overflow-hidden relative z-20">
            <FadeIn delay={0.15} y={40}>
              <GlowHeading text="Hi, i'm jiten" className={HEADING_CLASSES} />
            </FadeIn>
          </div>

          {/* Bottom bar */}
          <div className="flex justify-end items-end pb-7 sm:pb-8 md:pb-10 px-6 md:px-10 relative z-20">
            <FadeIn delay={0.5} y={20}>
              <ContactButton />
            </FadeIn>
          </div>
        </div>
      </GlassCursorLayer>
    </section>
  );
}
