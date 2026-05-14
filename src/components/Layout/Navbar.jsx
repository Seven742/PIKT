import React from 'react'
import { useState } from 'react';
import { FiPhoneCall } from "react-icons/fi";
import { RiMailAiLine } from "react-icons/ri";
import { SlLocationPin } from "react-icons/sl";
import { FaFacebookF, FaYoutube, FaTelegramPlane, FaTiktok } from "react-icons/fa";
import { IoChevronDownOutline } from "react-icons/io5";
import { MdNavigateNext } from "react-icons/md";
import { RiMenu3Line } from "react-icons/ri";
import { VscChromeClose } from "react-icons/vsc";
import Logo from "../../assets/Logo.png"

const Navbar = () => {

    const [activeMenu, setActiveMenu] = useState(null);
    const [open, setOpen] = useState(false);

    const [dropdowns, setDropdowns] = useState({
        About: false,
        Academics: false,
        Admission: false,
        Tuition: false,
        Scholarship: false,
        Apply: false
    });

    const toggleDropdown = (menu) => {
        setDropdowns({
            ...dropdowns,
            [menu]: !dropdowns[menu],
        });
    };

    const toggleMenu = (menu) => {
        setActiveMenu(prev => prev === menu ? null : menu);
    };

    return (
        <div>
            <div className='hidden lg:block'>
                <div className='hidden lg:flex w-full justify-between bg-blue-900 text-white px-10 xl:px-40 py-4'>
                    <div className='flex gap-10'>
                        <div className='flex items-center gap-2'>
                            <FiPhoneCall className='text-white' />
                            <p className='whitespace-nowrap'>(+855) 012 926 232</p>
                        </div>

                        <div className='flex items-center gap-2'>
                            <RiMailAiLine className='text-white' />
                            <p >ekhieng.pikt@gmail.com</p>
                        </div>

                        <div className='flex items-center gap-2'>
                            <SlLocationPin className='text-white' />
                            <p>Achar Leak Village, Stueng Saen, Kampong Thom</p>
                        </div>
                    </div>

                    <div className='flex items-center'>

                        <div className='flex items-center'>
                            <select className='outline-none  px-1 py-1 rounded-sm bg-blue-900'>
                                <option value="en">English</option>
                                <option value="kh">Khmer</option>
                            </select>

                            <div className='w-[1px] h-7 ml-5 bg-slate-400'></div>
                        </div>

                        <div className='flex items-center gap-3 ml-5 cursor-pointer'>
                            <FaFacebookF className=' duration-200' />
                            <FaYoutube className=' duration-200' />
                            <FaTelegramPlane className=' duration-200' />
                            <FaTiktok className=' duration-200' />
                        </div>

                    </div>
                </div>
            </div>
            {/* <div>
                <h1 className='md:text-red-700 lg:text-blue-700'>Hello</h1>
            </div> */}


            {/* Main Navbar */}
            <div className="flex items-center justify-between border-b px-4 py-2 md:px-6 xl:px-40">
                {/* Logo */}
                <div className='flex items-center gap-2 shrink-0'>
                    <img className='h-16 w-16' src={Logo} alt="" />
                    <p className="font-playfair font-bold text-blue-800 text-lg">
                        Polytechnic Institute Of
                        <br />
                        Kampong Thom Province
                    </p>
                </div>

                {/* Md and Sm screen */}
                <div className='block lg:hidden '>
                    <button
                        onClick={() => setOpen(!open)}
                        className="relative w-8 h-8 flex items-center justify-center"
                    >

                        {/* Menu Icon */}
                        <RiMenu3Line className={`absolute text-3xl text-blue-900 transition-all duration-300
                          ${open ? "opacity-0 rotate-90" : "opacity-100 rotate-0"}
                        `}
                        />

                        {/* Close Icon */}
                        <VscChromeClose className={`absolute text-3xl text-blue-900 transition-all duration-300
                         ${open ? "opacity-100 rotate-0" : "opacity-0 -rotate-90"}
                       `}
                        />
                    </button>
                    <div className={`absolute bg-blue-900 text-white mt-6 w-full py-2 left-0 transition-all duration-200 ease-in-out overflow-hidden
                        ${open
                            ? "opacity-100 translate-y-0 max-h-screen"
                            : "opacity-0 -translate-y-2 max-h-0"
                        }
                         `}
                    >
                        <div>
                            <button onClick={() => toggleDropdown('About')} className={`flex font-share uppercase text-lg hover:text-gray-500 items-center gap-1 py-2
                            ${dropdowns.About ? "text-gray-400 " : ""}
                            `}>
                                <p className='pl-6 pr-1 text-lg'>About Us</p>
                                <IoChevronDownOutline />
                            </button>
                            {/* use dropdowns.About to call useState true or false */}
                            {dropdowns.About && (
                                <div className=" left-0 w-full rounded-sm bg-blue-900 text-white transition-all duration-200 cursor-pointer">
                                    <a href=""><p className="pl-9 py-2 text-md  hover:text-gray-400">History</p></a>
                                    <a href="">
                                        <p className="pl-9 py-2 text-md hover:text-gray-400">
                                            License-and-Accreditation
                                        </p>
                                    </a>
                                    <a href=""> <p className="pl-9 py-2 text-md hover:text-gray-400">
                                        Strategic-plan-2024-2029
                                    </p></a>
                                    <a href="">
                                        <p className="pl-9 py-2 text-md hover:text-gray-400">
                                            Who's Who at PIKT
                                        </p>
                                    </a>
                                    <a href="">
                                        <p className="pl-9 py-2 text-md hover:text-gray-400">
                                            Career Opportunities
                                        </p>
                                    </a>
                                    <a href="">
                                        <p className="pl-9 py-2 text-md hover:text-gray-400">
                                            FAQs
                                        </p>
                                    </a>
                                </div>
                            )}
                        </div>
                        <div>
                            <button onClick={() => toggleDropdown('Academics')} className={`flex font-share uppercase text-lg hover:text-gray-500 items-center gap-1 py-2
                            ${dropdowns.Academics ? "text-gray-400 " : ""}
                            `}>
                                <p className='pl-6 pr-1 text-lg'>Academics</p>
                                <IoChevronDownOutline />
                            </button>
                            {/* use dropdowns.About to call useState true or false */}
                            {dropdowns.Academics && (
                                <div className=" left-0 w-full rounded-sm bg-blue-900 text-white transition-all duration-200 cursor-pointer">
                                    <a href=""><p className="pl-9 py-2 text-md  hover:text-gray-400">History</p></a>
                                    <a href="">
                                        <p className="pl-9 py-2 text-md hover:text-gray-400">
                                            License-and-Accreditation
                                        </p>
                                    </a>
                                    <a href=""> <p className="pl-9 py-2 text-md hover:text-gray-400">
                                        Strategic-plan-2024-2029
                                    </p></a>
                                    <a href="">
                                        <p className="pl-9 py-2 text-md hover:text-gray-400">
                                            Who's Who at PIKT
                                        </p>
                                    </a>
                                    <a href="">
                                        <p className="pl-9 py-2 text-md hover:text-gray-400">
                                            Career Opportunities
                                        </p>
                                    </a>
                                    <a href="">
                                        <p className="pl-9 py-2 text-md hover:text-gray-400">
                                            FAQs
                                        </p>
                                    </a>
                                </div>
                            )}
                        </div>
                        <div>
                            <button onClick={() => toggleDropdown('Admission')} className={`flex font-share uppercase text-lg hover:text-gray-500 items-center gap-1 py-2
                            ${dropdowns.Admission ? "text-gray-400 " : ""}
                            `}>
                                <p className='pl-6 pr-1 text-lg'>Admission</p>
                                <IoChevronDownOutline />
                            </button>
                            {/* use dropdowns.About to call useState true or false */}
                            {dropdowns.Admission && (
                                <div className=" left-0 w-full rounded-sm bg-blue-900 text-white transition-all duration-200 cursor-pointer">
                                    <a href=""><p className="pl-9 py-2 text-md  hover:text-gray-400">History</p></a>
                                    <a href="">
                                        <p className="pl-9 py-2 text-md hover:text-gray-400">
                                            License-and-Accreditation
                                        </p>
                                    </a>
                                    <a href=""> <p className="pl-9 py-2 text-md hover:text-gray-400">
                                        Strategic-plan-2024-2029
                                    </p></a>
                                    <a href="">
                                        <p className="pl-9 py-2 text-md hover:text-gray-400">
                                            Who's Who at PIKT
                                        </p>
                                    </a>
                                    <a href="">
                                        <p className="pl-9 py-2 text-md hover:text-gray-400">
                                            Career Opportunities
                                        </p>
                                    </a>
                                    <a href="">
                                        <p className="pl-9 py-2 text-md hover:text-gray-400">
                                            FAQs
                                        </p>
                                    </a>
                                </div>
                            )}
                        </div>
                        <div>
                            <button onClick={() => toggleDropdown('Tuition')} className={`flex font-share uppercase text-lg hover:text-gray-500 items-center gap-1 py-2
                            ${dropdowns.Tuition ? "text-gray-400 " : ""}
                            `}>
                                <p className='pl-6 pr-1 text-lg'>Tuition</p>
                                <IoChevronDownOutline />
                            </button>
                            {/* use dropdowns.About to call useState true or false */}
                            {dropdowns.Tuition && (
                                <div className=" left-0 w-full rounded-sm bg-blue-900 text-white transition-all duration-200 cursor-pointer">
                                    <a href=""><p className="pl-9 py-2 text-md  hover:text-gray-400">History</p></a>
                                    <a href="">
                                        <p className="pl-9 py-2 text-md hover:text-gray-400">
                                            License-and-Accreditation
                                        </p>
                                    </a>
                                    <a href=""> <p className="pl-9 py-2 text-md hover:text-gray-400">
                                        Strategic-plan-2024-2029
                                    </p></a>
                                    <a href="">
                                        <p className="pl-9 py-2 text-md hover:text-gray-400">
                                            Who's Who at PIKT
                                        </p>
                                    </a>
                                </div>
                            )}
                        </div>
                        <div>
                            <button onClick={() => toggleDropdown('Scholarship')} className={`flex font-share uppercase text-lg hover:text-gray-500 items-center gap-1 py-2
                            ${dropdowns.Scholarship ? "text-gray-400 " : ""}
                            `}>
                                <p className='pl-6 pr-1 text-lg'>Scholarship</p>
                                <IoChevronDownOutline />
                            </button>
                            {/* use dropdowns.About to call useState true or false */}
                            {dropdowns.Scholarship && (
                                <div className=" left-0 w-full rounded-sm bg-blue-900 text-white transition-all duration-200 cursor-pointer">
                                    <a href=""><p className="pl-9 py-2 text-md  hover:text-gray-400">History</p></a>
                                    <a href="">
                                        <p className="pl-9 py-2 text-md hover:text-gray-400">
                                            License-and-Accreditation
                                        </p>
                                    </a>
                                    <a href=""> <p className="pl-9 py-2 text-md hover:text-gray-400">
                                        Strategic-plan-2024-2029
                                    </p></a>
                                    <a href="">
                                        <p className="pl-9 py-2 text-md hover:text-gray-400">
                                            Who's Who at PIKT
                                        </p>
                                    </a>
                                </div>
                            )}
                        </div>
                        <div>
                            <button onClick={() => toggleDropdown('Apply')} className={`flex font-share uppercase text-lg hover:text-gray-500 items-center gap-1 py-2
                            ${dropdowns.Apply ? "text-gray-400 " : ""}
                            `}>
                                <p className='pl-6 pr-1 text-lg'>Apply</p>
                                <IoChevronDownOutline />
                            </button>
                            {/* use dropdowns.About to call useState true or false */}
                            {dropdowns.Apply && (
                                <div className=" left-0 w-full rounded-sm bg-blue-900 text-white transition-all duration-200 cursor-pointer">
                                    <a href=""><p className="pl-9 py-2 text-md  hover:text-gray-400">History</p></a>
                                    <a href="">
                                        <p className="pl-9 py-2 text-md hover:text-gray-400">
                                            License-and-Accreditation
                                        </p>
                                    </a>
                                    <a href=""> <p className="pl-9 py-2 text-md hover:text-gray-400">
                                        Strategic-plan-2024-2029
                                    </p></a>
                                    <a href="">
                                        <p className="pl-9 py-2 text-md hover:text-gray-400">
                                            Who's Who at PIKT
                                        </p>
                                    </a>
                                </div>
                            )}
                        </div>
                    </div>

                </div>

                {/* Lg Screen */}
                <div className=' shrink-0 hidden lg:block'>
                    <ul className='flex gap-6 items-center text-blue-700 font-medium'>
                        <li className="relative">
                            <div
                                onMouseEnter={() => setActiveMenu("about")}
                                onMouseLeave={() => setActiveMenu(null)}
                            >
                                <button className="flex items-center gap-1 py-2">
                                    <p>About Us</p>
                                    <IoChevronDownOutline />
                                </button>
                                {activeMenu === "about" && (
                                    <div className="absolute top-full left-0 w-56 rounded-sm bg-blue-900 text-white cursor-pointer">
                                        <p className="px-4 py-2 hover:bg-blue-950">History</p>
                                        <p className="px-4 py-2 hover:bg-blue-950">
                                            License-and-Accreditation
                                        </p>
                                        <p className="px-4 py-2 hover:bg-blue-950">
                                            Strategic-plan-2024-2029
                                        </p>
                                        <p className="px-4 py-2 hover:bg-blue-950">
                                            Who's Who at PIKT
                                        </p>
                                        <p className="px-4 py-2 hover:bg-blue-950">
                                            Career Opportunities
                                        </p>
                                        <p className="px-4 py-2 hover:bg-blue-950">
                                            FAQs
                                        </p>
                                    </div>
                                )}
                            </div>
                        </li>
                        <li className="relative">
                            <div
                                onMouseEnter={() => setActiveMenu("academics")}
                                onMouseLeave={() => setActiveMenu(null)}
                            >
                                <button className="flex items-center gap-1 py-2">
                                    <p>Academics</p>
                                    <IoChevronDownOutline />
                                </button>
                                {activeMenu === "academics" && (
                                    <div className="absolute top-full left-0 w-56 rounded-sm bg-blue-900 text-white cursor-pointer">
                                        <p className="px-4 py-2 hover:bg-blue-950">History</p>
                                        <p className="px-4 py-2 hover:bg-blue-950">
                                            License-and-Accreditation
                                        </p>
                                        <p className="px-4 py-2 hover:bg-blue-950">
                                            Strategic-plan-2024-2029
                                        </p>
                                        <p className="px-4 py-2 hover:bg-blue-950">
                                            Who's Who at PIKT
                                        </p>
                                        <p className="px-4 py-2 hover:bg-blue-950">
                                            Career Opportunities
                                        </p>
                                        <p className="px-4 py-2 hover:bg-blue-950">
                                            FAQs
                                        </p>
                                    </div>
                                )}
                            </div>
                        </li>
                        <li className="relative">
                            <div
                                onMouseEnter={() => setActiveMenu("admission")}
                                onMouseLeave={() => setActiveMenu(null)}
                            >
                                <button className="flex items-center gap-1 py-2">
                                    <p>Admission</p>
                                    <IoChevronDownOutline />
                                </button>
                                {activeMenu === "admission" && (
                                    <div className="absolute top-full left-0 w-56 rounded-sm bg-blue-900 text-white cursor-pointer">
                                        <p className="px-4 py-2 hover:bg-blue-950">History</p>
                                        <p className="px-4 py-2 hover:bg-blue-950">
                                            License-and-Accreditation
                                        </p>
                                        <p className="px-4 py-2 hover:bg-blue-950">
                                            Strategic-plan-2024-2029
                                        </p>
                                        <p className="px-4 py-2 hover:bg-blue-950">
                                            Who's Who at PIKT
                                        </p>
                                        <p className="px-4 py-2 hover:bg-blue-950">
                                            Career Opportunities
                                        </p>
                                        <p className="px-4 py-2 hover:bg-blue-950">
                                            FAQs
                                        </p>
                                    </div>
                                )}
                            </div>
                        </li>
                        <li className="relative">
                            <div
                                onMouseEnter={() => setActiveMenu("tuition")}
                                onMouseLeave={() => setActiveMenu(null)}
                            >
                                <button className="flex items-center gap-1 py-2">
                                    <p>Tuition</p>
                                    <IoChevronDownOutline />
                                </button>
                                {activeMenu === "tuition" && (
                                    <div className="absolute top-full left-0 w-56 rounded-sm bg-blue-900 text-white cursor-pointer">
                                        <p className="px-4 py-2 hover:bg-blue-950">History</p>
                                        <p className="px-4 py-2 hover:bg-blue-950">
                                            License-and-Accreditation
                                        </p>
                                        <p className="px-4 py-2 hover:bg-blue-950">
                                            Strategic-plan-2024-2029
                                        </p>
                                        <p className="px-4 py-2 hover:bg-blue-950">
                                            Who's Who at PIKT
                                        </p>
                                        <p className="px-4 py-2 hover:bg-blue-950">
                                            Career Opportunities
                                        </p>
                                        <p className="px-4 py-2 hover:bg-blue-950">
                                            FAQs
                                        </p>
                                    </div>
                                )}
                            </div>
                        </li>
                        <li className="relative">
                            <div
                                onMouseEnter={() => setActiveMenu("scholarship")}
                                onMouseLeave={() => setActiveMenu(null)}
                            >
                                <button className="flex items-center gap-1 py-2">
                                    <p>Scholarship</p>
                                    <IoChevronDownOutline />
                                </button>
                                {activeMenu === "scholarship" && (
                                    <div className="absolute top-full left-0 w-56 rounded-sm bg-blue-900 text-white cursor-pointer">
                                        <p className="px-4 py-2 hover:bg-blue-950">History</p>
                                        <p className="px-4 py-2 hover:bg-blue-950">
                                            License-and-Accreditation
                                        </p>
                                        <p className="px-4 py-2 hover:bg-blue-950">
                                            Strategic-plan-2024-2029
                                        </p>
                                        <p className="px-4 py-2 hover:bg-blue-950">
                                            Who's Who at PIKT
                                        </p>
                                        <p className="px-4 py-2 hover:bg-blue-950">
                                            Career Opportunities
                                        </p>
                                        <p className="px-4 py-2 hover:bg-blue-950">
                                            FAQs
                                        </p>
                                    </div>
                                )}
                            </div>
                        </li>
                        <div>
                            <button className='px-4 flex items-center rounded-sm bg-red-700 hover:bg-red-800 py-2 text-white'>
                                Apply
                                <IoChevronDownOutline className='ml-2' />
                            </button>
                        </div>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Navbar