export default function ContactButton() {
  return (
    <button
      className="glow-button rounded-full text-white font-medium uppercase tracking-widest px-8 py-3 sm:px-10 sm:py-3.5 md:px-12 md:py-4 text-xs sm:text-sm md:text-base cursor-pointer"
      style={{
        background:
          "linear-gradient(123deg, #000000 7%, #494d54 37%, #aa9371 72%, #d6c6ac 100%)",
        boxShadow:
          "0px 4px 4px rgba(170, 147, 113, 0.25), 4px 4px 12px #494d54 inset",
        outline: "2px solid white",
        outlineOffset: "-3px",
      }}
    >
      Contact Me
    </button>
  );
}
