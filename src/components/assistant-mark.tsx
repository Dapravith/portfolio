type AssistantMarkProps = {
  className?: string;
  animate?: boolean;
};

// A speech signal with an orbiting dot, drawn specifically for this portfolio.
export function AssistantMark({ className = "h-8 w-8", animate = false }: AssistantMarkProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden="true"
      focusable="false"
      className={`${className} shrink-0 ${animate ? "assistant-mark-animated" : ""}`}
    >
      <rect x="3" y="3" width="58" height="58" rx="20" fill="#142a48" />
      <path d="M14 18.5C14 15.46 16.46 13 19.5 13H44.5C47.54 13 50 15.46 50 18.5V40.5C50 43.54 47.54 46 44.5 46H29L20 51V46H19.5C16.46 46 14 43.54 14 40.5V18.5Z" fill="#eaf5ff" />
      <path d="M20 30H24.5L27.5 23L32 37L36 27L39 31H44" stroke="#275da8" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
      <g className={animate ? "assistant-mark-satellite" : undefined}>
        <circle cx="50" cy="13" r="5.5" fill="#7ce5cf" stroke="#142a48" strokeWidth="2" />
      </g>
    </svg>
  );
}
