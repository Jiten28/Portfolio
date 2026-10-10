export default function LinePattern({ className = "" }: { className?: string }) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 ${className}`}
      style={{
        backgroundImage:
          "repeating-linear-gradient(115deg, rgba(214,198,172,0.16) 0px, rgba(214,198,172,0.16) 1.5px, transparent 1.5px, transparent 34px)",
      }}
    />
  );
}
