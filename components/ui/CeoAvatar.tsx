import { Sparkles } from "lucide-react";

export default function CeoAvatar({
  size = 40,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <div
      className={`relative flex shrink-0 items-center justify-center rounded-full bg-gradient-to-b from-gold-300 to-gold-600 text-ink-900 shadow-[0_0_0_1px_rgba(255,215,0,0.35),0_8px_24px_-8px_rgba(255,215,0,0.45)] ${className}`}
      style={{ width: size, height: size }}
    >
      <Sparkles size={Math.round(size * 0.42)} strokeWidth={2} />
    </div>
  );
}
