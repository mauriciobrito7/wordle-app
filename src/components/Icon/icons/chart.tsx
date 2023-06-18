import { SVGProps } from 'react';
import { JSX } from 'react/jsx-runtime';

function ChartSVG(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="40"
      height="36"
      viewBox="0 0 40 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <mask id="mask">
          <rect
            x="4.93549"
            y="6"
            width="29.6129"
            height="24"
            rx="2"
            fill="white"
          />
          <path
            d="M13.1613 15V24"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
          />
          <path
            d="M19.7419 18V24"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
          />
          <path
            d="M26.3226 12V24"
            stroke="black"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.2"
          />
        </mask>
      </defs>
      <rect
        x="4.93549"
        y="6"
        width="29.6129"
        height="24"
        rx="2"
        fill="currentColor"
        mask="url(#mask)"
      />
    </svg>
  );
}
export default ChartSVG;
