type IconKind = "moon" | "cube" | "sphere" | "cluster";

const gradients: Record<IconKind, [string, string]> = {
  moon: ["#d6c6ac", "#494d54"],
  cube: ["#aa9371", "#2a2c30"],
  sphere: ["#fef4e3", "#aa9371"],
  cluster: ["#494d54", "#000000"],
};

export default function DecoIcon({ kind, className = "" }: { kind: IconKind; className?: string }) {
  const [c1, c2] = gradients[kind];
  const gid = `deco-${kind}`;

  return (
    <svg viewBox="0 0 200 200" className={className} style={{ width: "100%", height: "auto" }}>
      <defs>
        <linearGradient id={gid} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={c1} />
          <stop offset="100%" stopColor={c2} />
        </linearGradient>
      </defs>
      {kind === "moon" && <circle cx="100" cy="100" r="80" fill={`url(#${gid})`} />}
      {kind === "cube" && (
        <g transform="translate(30,30)">
          <polygon points="70,0 140,35 70,70 0,35" fill={c1} opacity="0.9" />
          <polygon points="0,35 70,70 70,140 0,105" fill={c2} />
          <polygon points="140,35 70,70 70,140 140,105" fill={c1} opacity="0.6" />
        </g>
      )}
      {kind === "sphere" && <circle cx="100" cy="100" r="75" fill={`url(#${gid})`} />}
      {kind === "cluster" && (
        <g>
          <circle cx="70" cy="70" r="50" fill={c1} opacity="0.85" />
          <circle cx="130" cy="110" r="35" fill={c2} />
          <circle cx="90" cy="140" r="25" fill={c1} opacity="0.6" />
        </g>
      )}
    </svg>
  );
}
