import Logo from "./Logo";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  return (
    <div className="w-full p-10 shadow border border-gray-200 text-white  flex justify-between">
      <Logo />
      <SocialLinks />
    </div>
  )
}
