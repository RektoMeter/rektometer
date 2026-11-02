export default function Logo({ size = 28 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect width="32" height="32" rx="7" fill="#f6ad55"/>
      <path d="M8 22 L8 10 L14 10 Q18 10 18 14 Q18 17 15 17.5 L19 22 L16 22 L12.5 17.8 L11 17.8 L11 22 Z" fill="#1f1408"/>
      <path d="M11 12.5 L11 15.5 L14 15.5 Q15.5 15.5 15.5 14 Q15.5 12.5 14 12.5 Z" fill="#f6ad55"/>
      <path d="M20 18 L23 22 L26 18" stroke="#1f1408" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}
