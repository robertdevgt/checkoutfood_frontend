import { FaFacebookF, FaInstagram, FaWhatsapp, FaXTwitter } from "react-icons/fa6";

export default function SocialLinks() {
    return (
        <div className="flex items-center justify-center gap-6 py-4">
            <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-blue-600 transition"
                aria-label="Facebook"
            >
                <FaFacebookF size={20} />
            </a>
            <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-pink-500 transition"
                aria-label="Instagram"
            >
                <FaInstagram size={20} />
            </a>
            <a
                href="https://wa.me/50200000000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-green-500 transition"
                aria-label="WhatsApp"
            >
                <FaWhatsapp size={20} />
            </a>
            <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black transition"
                aria-label="X/Twitter"
            >
                <FaXTwitter size={20} />
            </a>
        </div>
    );
}
