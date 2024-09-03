import {
  FaInstagram,
  FaDribbble,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";

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
      { label: "About us", key: "item-1-1" },
      { label: "Our Services", key: "item-1-2" },
      { label: "Service and Specilaities", key: "item-1-3" },
      { label: "Our Team", key: "item-1-4" },
      { label: "Contact Us", key: "item-1-5" },
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
      <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-3 md:grid-cols-2 gap-8">
        <div className="flex flex-col items-start space-y-4">
          <div className="footer-img flex items-center">
            <img src="./logos.svg" alt="footerlogo" className="w-full h-auto bg-white" />
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
                  className={`cursor-pointer ${link.key.startsWith('header') ? 'text-2xl' : 'text-base'}`}
                >
                  {link.label}
                </li>
              ))}
            </ul>
          ))}
        </div>
        <div className="flex flex-col items-start space-y-4">
          <label className="text-lg font-semibold">Stay up to date</label>
          <input
            type="email"
            placeholder="Subscribe to our email"
            className="w-full border-none rounded-lg py-3 px-4"
          />
        </div>
      </div>
    </div>
  );
};

export default Footer;
