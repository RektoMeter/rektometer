export default function Logo({ size = 28 }) {
    return (
      <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="32" height="32" rx="8" fill="url(#grad)"/>
        <path d="M8 22 L8 10 L14 10 Q18 10 18 14 Q18 17 15 17.5 L19 22 L16 22 L12.5 17.8 L11 17.8 L11 22 Z" fill="white" opacity="0.95"/>
        <path d="M11 10.5 L11 15.5 L14 15.5 Q16.5 15.5 16.5 13 Q16.5 10.5 14 10.5 Z" fill="white" opacity="0.95"/>
        <path d="M20 18 L23 22 L26 18" stroke="#f6ad55" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="23" cy="15" r="2" fill="#f6ad55"/>
        <defs>
          <linearGradient id="grad" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#c05621"/>
            <stop offset="100%" stopColor="#7b341e"/>
          </linearGradient>
        </defs>
      </svg>
    );
  }