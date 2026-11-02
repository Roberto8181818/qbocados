import type { ReactElement } from "react";
import type { IllustrationKind } from "../data/products";

interface ProductIllustrationProps {
  kind: IllustrationKind;
  className?: string;
  /** Desactívalo cuando la ilustración se coloca sobre una bandeja propia. */
  plate?: boolean;
}

function Empanada(): ReactElement {
  return (
    <>
      <g transform="rotate(11 142 86)">
        <path d="M94 102 A46 40 0 0 1 186 102 Z" fill="#c98a4b" />
        <path
          d="M103 95 A37 31 0 0 1 177 95"
          fill="none"
          stroke="#f0d6a5"
          strokeWidth="4"
          strokeDasharray="0.1 7"
          strokeLinecap="round"
        />
        <path d="M94 102 H186" stroke="#9c612c" strokeWidth="4" strokeLinecap="round" />
      </g>
      <g transform="rotate(-7 100 92)">
        <path d="M40 108 A58 50 0 0 1 156 108 Z" fill="#d99a57" />
        <path
          d="M52 100 A46 39 0 0 1 144 100"
          fill="none"
          stroke="#f4dca9"
          strokeWidth="5"
          strokeDasharray="0.1 8"
          strokeLinecap="round"
        />
        <path d="M40 108 H156" stroke="#a86a33" strokeWidth="5" strokeLinecap="round" />
        <path
          d="M78 60 q10 -8 20 0"
          fill="none"
          stroke="#b97635"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.5"
        />
      </g>
      <circle cx="122" cy="42" r="3" fill="#b08a4f" opacity="0.55" />
      <circle cx="160" cy="58" r="2" fill="#b08a4f" opacity="0.4" />
    </>
  );
}

function CheeseSticks(): ReactElement {
  return (
    <>
      <g transform="rotate(17 118 76)">
        <rect x="62" y="42" width="118" height="26" rx="13" fill="#d9a63a" />
        <rect
          x="62"
          y="42"
          width="118"
          height="26"
          rx="13"
          fill="none"
          stroke="#b9812a"
          strokeWidth="2"
        />
        <path
          d="M78 55 h10 M98 55 h14 M124 55 h8"
          stroke="#f5d88f"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.8"
        />
      </g>
      <g transform="rotate(-11 108 96)">
        <rect x="38" y="70" width="144" height="34" rx="17" fill="#e8b854" />
        <rect
          x="38"
          y="70"
          width="144"
          height="34"
          rx="17"
          fill="none"
          stroke="#bd8a2d"
          strokeWidth="2"
        />
        <path
          d="M172 88 q18 2 20 15 q-12 4 -22 -5 Z"
          fill="#f6db8c"
        />
        <path
          d="M56 82 q10 -5 20 0 M88 95 q10 5 20 0 M120 80 q10 -5 20 0 M148 94 q8 4 16 0"
          fill="none"
          stroke="#f8e4ad"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
    </>
  );
}

function CheeseBocadillo(): ReactElement {
  return (
    <>
      <g transform="rotate(15 112 78)">
        <rect x="58" y="44" width="124" height="28" rx="14" fill="#d9a63a" />
        <rect x="102" y="44" width="28" height="28" rx="8" fill="#a8322a" />
        <path
          d="M72 58 h14 M138 58 h16"
          stroke="#f5d88f"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.8"
        />
      </g>
      <g transform="rotate(-8 110 96)">
        <rect x="40" y="72" width="142" height="34" rx="17" fill="#e8b854" />
        <rect x="88" y="72" width="34" height="34" rx="9" fill="#a8322a" />
        <path
          d="M54 88 h16 M128 90 h16 M154 84 h10"
          stroke="#f8e4ad"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <rect
          x="40"
          y="72"
          width="142"
          height="34"
          rx="17"
          fill="none"
          stroke="#bd8a2d"
          strokeWidth="2"
        />
      </g>
      <circle cx="170" cy="58" r="3" fill="#a8322a" opacity="0.45" />
    </>
  );
}

function Salchurrollo(): ReactElement {
  return (
    <>
      <g transform="rotate(-7 110 92)">
        <ellipse cx="54" cy="96" rx="14" ry="10" fill="#a84732" />
        <ellipse cx="166" cy="96" rx="14" ry="10" fill="#a84732" />
        <path
          d="M48 96 q0 -34 62 -34 q62 0 62 34 q0 34 -62 34 q-62 0 -62 -34 Z"
          fill="#d99a57"
        />
        <path
          d="M58 82 q26 -16 52 0 q26 16 52 0"
          fill="none"
          stroke="#a86a33"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M58 100 q26 -16 52 0 q26 16 52 0"
          fill="none"
          stroke="#a86a33"
          strokeWidth="4"
          strokeLinecap="round"
        />
        <path
          d="M72 94 q20 10 40 0 q18 -9 34 0"
          fill="none"
          stroke="#f4dca9"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.65"
        />
        <circle cx="86" cy="66" r="2.4" fill="#fbf0d4" />
        <circle cx="112" cy="62" r="2.4" fill="#fbf0d4" />
        <circle cx="138" cy="68" r="2.4" fill="#fbf0d4" />
      </g>
    </>
  );
}

function Wings(): ReactElement {
  return (
    <>
      <g transform="rotate(-16 82 88)">
        <path
          d="M40 102 c-9 -17 -1 -36 18 -44 c17 -8 34 -1 40 14 c5 12 0 25 -11 33 c-11 8 -32 10 -47 -3 Z"
          fill="#a84732"
        />
        <path
          d="M55 71 q19 -11 35 2"
          fill="none"
          stroke="#d97950"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M70 105 q8 10 8 19"
          stroke="#f3e3c5"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <circle cx="82" cy="118" r="6.5" fill="#f3e3c5" />
      </g>
      <g transform="rotate(14 148 88)">
        <path
          d="M116 98 c-8 -15 0 -32 16 -39 c15 -7 30 0 35 13 c5 11 0 23 -9 30 c-10 7 -29 9 -42 -4 Z"
          fill="#b5523b"
        />
        <path
          d="M130 69 q17 -9 31 2"
          fill="none"
          stroke="#e08a5e"
          strokeWidth="3.5"
          strokeLinecap="round"
        />
        <path
          d="M143 102 q7 9 7 17"
          stroke="#f3e3c5"
          strokeWidth="7"
          strokeLinecap="round"
        />
        <circle cx="153" cy="114" r="6" fill="#f3e3c5" />
      </g>
      <path
        d="M100 116 q12 8 24 0"
        fill="none"
        stroke="#b08a4f"
        strokeWidth="3"
        strokeLinecap="round"
        opacity="0.5"
      />
    </>
  );
}

function Croquettes(): ReactElement {
  return (
    <>
      <g transform="rotate(9 152 108)">
        <rect x="126" y="86" width="62" height="28" rx="14" fill="#c9904c" />
        <ellipse cx="128" cy="100" rx="9" ry="14" fill="#f6e2b3" />
        <ellipse cx="128" cy="100" rx="5" ry="9" fill="#e8cfa0" />
      </g>
      <g transform="rotate(-9 108 94)">
        <rect x="42" y="76" width="136" height="36" rx="18" fill="#d9a35b" />
        <rect
          x="42"
          y="76"
          width="136"
          height="36"
          rx="18"
          fill="none"
          stroke="#b9812a"
          strokeWidth="2"
        />
        <path
          d="M58 88 q8 -4 16 0 M84 100 q8 4 16 0 M112 86 q8 -4 16 0 M138 98 q8 4 16 0"
          fill="none"
          stroke="#f0c98e"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M156 80 q5 -8 11 -3 M62 74 q-2 -8 5 -9"
          fill="none"
          stroke="#6f7d52"
          strokeWidth="3"
          strokeLinecap="round"
        />
      </g>
    </>
  );
}

const artByKind: Record<IllustrationKind, () => ReactElement> = {
  empanada: Empanada,
  cheese: CheeseSticks,
  "cheese-bocadillo": CheeseBocadillo,
  roll: Salchurrollo,
  wings: Wings,
  croquette: Croquettes,
};

export default function ProductIllustration({
  kind,
  className,
  plate = true,
}: ProductIllustrationProps) {
  const Art = artByKind[kind];

  return (
    <svg
      viewBox="0 0 220 150"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {plate ? (
        <g>
          <ellipse cx="110" cy="130" rx="82" ry="12" fill="#ddd4bf" opacity="0.65" />
          <ellipse cx="110" cy="124" rx="72" ry="9" fill="#c9bfa6" opacity="0.38" />
        </g>
      ) : null}
      <Art />
    </svg>
  );
}
