import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Link from "next/link";

const Footer = () => {
  const contactLinks = [
    { label: "Telephone", link: 'tel:+61756612616', icon: FaPhone },
    { label: "Email", link: 'mailto:admin@qtpremium.com.au', icon: FaEnvelope },
    { label: "Address", link: '#', icon: FaMapMarkerAlt },
  ];

  const links = [
    [
      { label: "Company", key: "header-1" },
      { label: "Home", link: '/', key: "item-1-0" },
      { label: "About us", link: '/about-us', key: "item-1-1" },
      { label: "Services", link: '/service-specialities', key: "item-1-2" },
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
            <img src="./logos.svg" alt="footerlogo" className="w-80 h-auto bg-white" />
          </div>
          <div className="infos text-white text-sm">
            <span>Copyright © 2024 Q and T premium</span>
            <span>All rights reserved</span>
          </div>
          <div className="footer-icons flex space-x-3">
            {contactLinks.map((socialLink, index) => {
              const Icon = socialLink.icon;
              return (
                <Link href={socialLink.link} key={`contact-${index}`} passHref>
                  <Icon className="w-6 h-6 hover:text-gray-200 transition-all rounded-full cursor-pointer" />
                </Link>
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
