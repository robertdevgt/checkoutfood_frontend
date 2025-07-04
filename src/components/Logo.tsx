import { Link } from "react-router-dom";

export default function Logo() {
    return (
        <Link to={'/'}>
            <svg width="240" height="120" viewBox="0 0 240 120" xmlns="http://www.w3.org/2000/svg" fill="none">
                <rect width="240" height="120" rx="20" fill="" />

                <g transform="translate(20, 30)">
                    <path d="M10 10h90l-10 35H30L10 10z" fill="#007BFF" />
                    <circle cx="35" cy="55" r="6" fill="#007BFF" />
                    <circle cx="80" cy="55" r="6" fill="#007BFF" />
                    <path d="M50 0a22 22 0 0 1 22 14H28A22 22 0 0 1 50 0z" fill="#007BFF" />
                    <line x1="50" y1="-4" x2="50" y2="4" stroke="#007BFF" strokeWidth={2} strokeLinecap="round" />
                </g>

                <text x="130" y="60" fontFamily="Arial, sans-serif" fontSize={22} fill="#1A1A1A" fontWeight="bold">
                    Checkout
                </text>
                <text x="130" y="90" fontFamily="Arial, sans-serif" fontSize={26} fill="#007BFF" fontWeight="bold">
                    FOOD
                </text>
            </svg>
        </Link>
    );
}
