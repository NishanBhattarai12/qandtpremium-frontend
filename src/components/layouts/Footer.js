import {
  FaInstagram,
  FaDribbble,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import Link from "next/link";

const Footer = () => {
  const socialLinks = [
    { label: "YouTube", icon: FaYoutube },
    { label: "Instagram", icon: FaInstagram },
    { label: "Twitter", icon: FaXTwitter },
    { label: "Dribbble", icon: FaDribbble },
  ];

  const links = [
    [
      { label: "Company", key: "header-1" },
      { label: "Home", link: '/', key: "item-1-0" },
      { label: "About us", link: '/about-us', key: "item-1-1" },
      { label: "Service and Specilaities", link: '/service-specialities', key: "item-1-2" },
      { label: "Our Team", link: '/our-team', key: "item-1-3" },
      { label: "Contact Us", link: '/contact-us', key: "item-1-4" },
    ],
    [
      { label: "Support", key: "header-2" },
      { label: "Help center", key: "item-2-1" },
      { label: "Terms of service", key: "item-2-2" },
      { label: "Legal", key: "item-2-3" },
      { label: "Privacy policy", key: "item-2-4" },
      { label: "Status", key: "item-2-5" },
    ],
  ];

  return (
    <div className="bg-[#64AE33] text-white py-16">
      <div className="max-w-7xl mx-auto px-4 grid md:grid-cols-2 gap-8">
        <div className="flex flex-col items-start space-y-4">
          <div className="footer-img flex items-center">
            <img src="./logos.svg" alt="footerlogo" className="w-96 h-auto bg-white" />
          </div>
          <div className="infos text-white text-sm">
            <span>Copyright © 2024 Q and T premium</span>
            <span>All rights reserved</span>
          </div>
          <div className="footer-icons flex space-x-3">
            {socialLinks.map((socialLink, index) => {
              const Icon = socialLink.icon;
              return (
                <Icon
                  key={`social-${index}`}
                  className="w-12 h-12 p-2 rounded-full bg-green-700 hover:bg-white hover:text-green-700 cursor-pointer"
                />
              );
            })}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-8">
          {links.map((col, index) => (
            <ul key={`col-${index}`} className="space-y-2">
              {col.map((link) => (
                <li
                  key={link.key}
                  className={`cursor-pointer ${link.key.startsWith('header') ? 'text-2xl' : 'text-base transition-all hover:text-gray-200'}`}
                >
                  {link.link ? (
                    <Link href={link.link}>{link.label}</Link>
                  ) : (
                    <span>{link.label}</span>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Footer;
