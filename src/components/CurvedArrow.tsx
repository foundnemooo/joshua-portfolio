export function CurvedArrow({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 160 140"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M20 10 C 60 30, 90 50, 70 75 C 55 95, 30 85, 50 65 C 75 40, 110 70, 130 105" />
      <path d="M118 95 L132 108 L118 118" />
    </svg>
  );
}
