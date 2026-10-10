const palettes = [
  ["#494d54", "#2a2c30"],
  ["#aa9371", "#494d54"],
  ["#d6c6ac", "#aa9371"],
  ["#2a2c30", "#000000"],
];

export default function MarqueeTile({ index, label }: { index: number; label: string }) {
  const [c1, c2] = palettes[index % palettes.length];
  return (
    <div
      className="rounded-2xl flex-shrink-0 flex items-center justify-center"
      style={{
        width: 420,
        height: 270,
        background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`,
        border: "1px solid rgba(254,244,227,0.08)",
      }}
    >
      <span
        className="font-black uppercase tracking-wide text-center px-6"
        style={{ color: "#fef4e3", fontSize: "2rem", opacity: 0.9 }}
      >
        {label}
      </span>
    </div>
  );
}
