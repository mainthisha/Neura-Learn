import type { SVGProps } from "react";

export function Logo({ className, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <defs>
        <linearGradient id="nl-bg" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#2563EB" />
          <stop offset="0.55" stopColor="#4F46E5" />
          <stop offset="1" stopColor="#06B6D4" />
        </linearGradient>
        <linearGradient id="nl-stroke" x1="0" y1="0" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="1" stopColor="#E0F2FE" stopOpacity="0.9" />
        </linearGradient>
        <radialGradient id="nl-glow" cx="0.3" cy="0.25" r="0.9">
          <stop offset="0" stopColor="#ffffff" stopOpacity="0.35" />
          <stop offset="1" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Rounded gradient tile */}
      <rect x="2" y="2" width="44" height="44" rx="13" fill="url(#nl-bg)" />
      <rect x="2" y="2" width="44" height="44" rx="13" fill="url(#nl-glow)" />

      {/* Neural network / synapse mark */}
      <g stroke="url(#nl-stroke)" strokeWidth="1.6" strokeLinecap="round">
        <path d="M14 32 L22 24 L14 16" fill="none" />
        <path d="M34 32 L26 24 L34 16" fill="none" />
        <path d="M22 24 L26 24" />
        <path d="M14 32 L34 32" opacity="0.5" />
        <path d="M14 16 L34 16" opacity="0.5" />
      </g>

      {/* Nodes */}
      <g fill="#ffffff">
        <circle cx="14" cy="16" r="2.6" />
        <circle cx="14" cy="32" r="2.6" />
        <circle cx="34" cy="16" r="2.6" />
        <circle cx="34" cy="32" r="2.6" />
      </g>
      <circle cx="22" cy="24" r="2.2" fill="#ffffff" />
      <circle cx="26" cy="24" r="2.2" fill="#ffffff" />

      {/* Spark */}
      <path
        d="M37 10.5 L37.9 12.4 L39.8 13.3 L37.9 14.2 L37 16.1 L36.1 14.2 L34.2 13.3 L36.1 12.4 Z"
        fill="#ffffff"
        opacity="0.9"
      />
    </svg>
  );
}

export function Wordmark({ className }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2.5 ${className ?? ""}`}>
      <Logo className="h-9 w-9" />
      <span className="font-display text-lg font-bold tracking-tight leading-none">
        Neura<span className="text-gradient"> Learn</span>
      </span>
    </div>
  );
}
