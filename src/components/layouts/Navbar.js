import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { AiOutlineMenu, AiOutlineUser } from 'react-icons/ai';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { clearTokens } from "@/store/authSlice";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();

  const dispatch = useDispatch();
  const accessToken = useSelector((state) => state.auth.accessToken);
  const refreshToken = useSelector((state) => state.auth.refreshToken);
  const user = useSelector((state) => state.auth.user);

  const [dropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = (e) => {
    e.stopPropagation();
    setDropdownVisible(!dropdownVisible);
  };

  const handleLogout = async (event) => {
    event.stopPropagation();
    
    await fetch(`${process.env.NEXT_PUBLIC_BACKEND_BASE_URL}/users/logout`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        refresh: refreshToken
      }),
    });

    dispatch(clearTokens());
    router.push('/login');
  };

  const handleNav = () => {
    setMenuOpen((prevState) => !prevState);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target) && !event.target.closest('.menu-icon')) {
      setMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLinkClick = (href) => {
    if (router.pathname !== href) {
      router.push(href);
      setMenuOpen(false);
    }
  };

  return (
    <nav className="fixed w-full h-23 shadow-xl bg-white z-50">
      <div className="flex justify-between items-center h-full w-full px-4 2xl:px-16">
        <Link href="/">
          <Image
            src="/logos.svg"
            alt="logo"
            width="200"
            height="70"
            className="cursor-pointer p-2"
            priority
          />
        </Link>
        <div className="hidden sm:flex items-center">
          <ul className="flex space-x-10">
            <li className="relative text-xl uppercase group">
              <Link href="/" className="hover:text-[#64AE33] transition-all duration-300">Home</Link>
              <div className="absolute left-0 bottom-0 w-full h-0.5 bg-[#64AE33] scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100" />
            </li>
            <li className="relative text-xl uppercase group">
              <Link href="/about-us" className="hover:text-[#64AE33] transition-all duration-300">About Us</Link>
              <div className="absolute left-0 bottom-0 w-full h-0.5 bg-[#64AE33] scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100" />
            </li>
            <li className="relative text-xl uppercase group">
              <Link href="/service-specialities" className="hover:text-[#64AE33] transition-all duration-300">Service and Specialities</Link>
              <div className="absolute left-0 bottom-0 w-full h-0.5 bg-[#64AE33] scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100" />
            </li>
            <li className="relative text-xl uppercase group">
              <Link href="/OurTeam" className="hover:text-[#64AE33] transition-all duration-300">Our Team</Link>
              <div className="absolute left-0 bottom-0 w-full h-0.5 bg-[#64AE33] scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100" />
            </li>
            <li className="relative text-xl uppercase group">
              <Link href="/contact-us" className="hover:text-[#64AE33] transition-all duration-300">Contact Us</Link>
              <div className="absolute left-0 bottom-0 w-full h-0.5 bg-[#64AE33] scale-x-0 transition-transform duration-300 ease-in-out group-hover:scale-x-100" />
            </li>
            <li style={{ marginTop: "-5px" }}>
              {user ? (
                <div className="relative inline-block text-left">
                  <div>
                    <button
                      type="button"
                      className="bg-[#64AE33] text-white py-2 px-4 rounded hover:bg-green-800 flex items-center"
                      id="menu-button"
                      aria-expanded={dropdownVisible}
                      aria-haspopup="true"
                      onClick={toggleDropdown}
                    >
                      {user.name}
                      <svg
                        className="-mr-1 h-5 w-5 text-gray-400"
                        viewBox="0 0 20 20"
                        fill="#fff"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                  {dropdownVisible && (
                    <div
                      className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      role="menu"
                      aria-orientation="vertical"
                      aria-labelledby="menu-button"
                      tabIndex="-1"
                    >
                      <div className="py-1" role="none">
                        <button
                          onClick={handleLogout}
                          className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                          role="menuitem"
                          tabIndex="-1"
                          id="menu-item-3"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link href="/login">
                  <button
                    onClick={() => handleLinkClick('/login')}
                    className="bg-[#64AE33] text-white py-2 px-4 rounded hover:bg-green-800 flex items-center"
                  >
                    Login
                    <AiOutlineUser size={20} className="ml-2" />
                  </button>
                </Link>
              )}
            </li>
          </ul>
        </div>
        <div
          onClick={handleNav}
          className="sm:hidden cursor-pointer pl-24 m-5 menu-icon"
        >
          <AiOutlineMenu size={25} />
        </div>
      </div>
      <div
        ref={menuRef}
        className={`fixed left-0 top-0 w-[70%] sm:hidden h-screen bg-[#64AE33] p-10 ease-in duration-500 ${menuOpen ? 'translate-x-0' : 'translate-x-[-100%]'}`}
      >
        <div className="flex items-center mb-8">
          <Link href="/">
            <Image
              src="/logos.svg"
              alt="logo"
              width="150"
              height="50"
              className="cursor-pointer bg-white p-2"
              priority
            />
          </Link>
        </div>
        <ul>
          <li className="py-4 text-xl text-white hover:text-gray-200 transition-transform duration-300 transform hover:scale-105">
            <Link href="/" onClick={() => setMenuOpen(false)}>Home</Link>
          </li>
          <li className="py-4 text-xl text-white hover:text-gray-200 transition-transform duration-300 transform hover:scale-105">
            <Link href="/about-us" onClick={() => setMenuOpen(false)}>About Us</Link>
          </li>
          <li className="py-4 text-xl text-white hover:text-gray-200 transition-transform duration-300 transform hover:scale-105">
            <Link href="/service-specialities" onClick={() => setMenuOpen(false)}>Service and Specialities</Link>
          </li>
          <li className="py-4 text-xl text-white hover:text-gray-200 transition-transform duration-300 transform hover:scale-105">
            <Link href="/OurTeam" onClick={() => setMenuOpen(false)}>Our Team</Link>
          </li>
          <li className="py-4 text-xl text-white hover:text-gray-200 transition-transform duration-300 transform hover:scale-105">
            <Link href="/contact-us" onClick={() => setMenuOpen(false)}>Contact Us</Link>
          </li>
          <li className="py-4 text-xl text-white hover:text-gray-200 transition-transform duration-300 transform hover:scale-105">
            <Link href="/signup" onClick={() => setMenuOpen(false)}>
              <button className="bg-white text-[#64AE33] py-2 px-4 rounded flex items-center">
                SignUp
                <AiOutlineUser size={20} className="ml-2" />
              </button>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
