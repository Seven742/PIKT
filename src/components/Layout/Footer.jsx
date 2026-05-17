import React from 'react'
import { FaFacebookF, FaYoutube, FaTelegramPlane, FaTiktok } from "react-icons/fa";
import { MdNavigateNext } from "react-icons/md";
import { FaArrowUp } from "react-icons/fa6";
import Logo from "../../assets/Logo.png"

const Footer = () => {
    return (
        <>
            <footer className='lg:flex bg-primary px-4 xl:px-40 py-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
                <div className='flex flex-col gap-3 flex-1'>
                    <div className='flex items-center gap-2 shrink-0'>
                        <img className='h-8 w-8' src={Logo} alt="" />
                        <p className="font-playfair font-bold text-white text-xl">
                            PIKT
                        </p>
                    </div>
                    <p className='text-gray-300 '>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus harum ipsa pariatur, eaque, ipsam quos recusandae  </p>
                    <div className='flex items-center gap-3 py-3 cursor-pointer'>
                        <div className='bg-white p-3 hover:bg-blue-800 hover:text-white text-primary transition-all duration-200 rounded-full'>
                            <FaFacebookF className='text-lg  duration-200' />
                        </div>
                        <div className='bg-white p-3 hover:bg-blue-800 hover:text-white text-primary transition-all duration-200 rounded-full'>
                            <FaYoutube className='text-lg  duration-200' />
                        </div>
                        <div className='bg-white p-3 hover:bg-blue-800 hover:text-white text-primary transition-all duration-200 rounded-full'>
                            <FaTelegramPlane className='text-lg  duration-200' />
                        </div>
                        <div className='bg-white p-3 hover:bg-blue-800 hover:text-white text-primary transition-all duration-200 rounded-full'>
                            <FaTiktok className='text-lg  duration-200' />
                        </div>
                    </div>
                </div>
                <div className='text-white flex-1'>
                    <h1 className='text-xl'>Quick Links:</h1>
                    <ul className='mt-5 flex flex-col gap-2'>
                        <li className='flex items-center gap-3 group hover:text-gray-300'>
                            <MdNavigateNext className='text-lg transition-transform duration-200 mt-1 group-hover:translate-x-1' />
                            <a href="">History</a>
                        </li>
                        <li className='flex items-center gap-3 group hover:text-gray-300'>
                            <MdNavigateNext className='text-lg transition-transform duration-200 mt-1 group-hover:translate-x-1' />
                            <a href="">Vision - Massion - Value</a>
                        </li>
                        <li className='flex items-center gap-3 group hover:text-gray-300'>
                            <MdNavigateNext className='text-lg transition-transform duration-200 mt-1 group-hover:translate-x-1' />
                            <a href="">FAQs</a>
                        </li>
                        <li className='flex items-center gap-3 group hover:text-gray-300'>
                            <MdNavigateNext className='text-lg transition-transform duration-200 mt-1 group-hover:translate-x-1' />
                            <a href="">career Opportunities</a>
                        </li>
                        <li className='flex items-center gap-3 group hover:text-gray-300'>
                            <MdNavigateNext className='text-lg transition-transform duration-200 mt-1 group-hover:translate-x-1' />
                            <a href="">Current Weather at PIKT</a>
                        </li>
                    </ul>
                </div>
                <div className='text-white flex-1'>
                    <h1 className='text-xl'>Our Services:</h1>
                    <ul className='mt-5 flex flex-col gap-2'>
                        <li className='flex items-center gap-3 group hover:text-gray-300'>
                            <MdNavigateNext className='text-lg transition-transform duration-200 mt-1 group-hover:translate-x-1' />
                            <a href="">Web Development</a>
                        </li>
                        <li className='flex items-center gap-3 group hover:text-gray-300'>
                            <MdNavigateNext className='text-lg transition-transform duration-200 mt-1 group-hover:translate-x-1' />
                            <a href="">UI/UX Design</a>
                        </li>
                        <li className='flex items-center gap-3 group hover:text-gray-300'>
                            <MdNavigateNext className='text-lg transition-transform duration-200 mt-1 group-hover:translate-x-1' />
                            <a href="">Management</a>
                        </li>
                        <li className='flex items-center gap-3 group hover:text-gray-300'>
                            <MdNavigateNext className='text-lg transition-transform duration-200 mt-1 group-hover:translate-x-1' />
                            <a href="">Digital Marketing</a>
                        </li>
                        <li className='flex items-center gap-3 group hover:text-gray-300'>
                            <MdNavigateNext className='text-lg transition-transform duration-200 mt-1 group-hover:translate-x-1' />
                            <a href="">Blog News</a>
                        </li>
                    </ul>
                </div>
                <div className='text-white flex-1 '>
                    <h1 className='text-xl'>Explore:</h1>
                    <ul className='mt-5 flex flex-col gap-2'>
                        <li className='flex items-center gap-3 group hover:text-gray-300'>
                            <MdNavigateNext className='text-lg transition-transform duration-200 mt-1 group-hover:translate-x-1' />
                            <a href="">Student Lift</a>
                        </li>
                        <li className='flex items-center gap-3 group hover:text-gray-300'>
                            <MdNavigateNext className='text-lg transition-transform duration-200 mt-1 group-hover:translate-x-1' />
                            <a href="">News & Events</a>
                        </li>
                        <li className='flex items-center gap-3 group hover:text-gray-300'>
                            <MdNavigateNext className='text-lg transition-transform duration-200 mt-1 group-hover:translate-x-1' />
                            <a href="">Tuition Fee</a>
                        </li>
                        <li className='flex items-center gap-3 group hover:text-gray-300'>
                            <MdNavigateNext className='text-lg transition-transform duration-200 mt-1 group-hover:translate-x-1' />
                            <a href="">Scholarships</a>
                        </li>
                        <li className='flex items-center gap-3 group hover:text-gray-300'>
                            <MdNavigateNext className='text-lg transition-transform duration-200 mt-1 group-hover:translate-x-1' />
                            <a href="">Contact Us</a>
                        </li>
                    </ul>
                </div>
            </footer>
            <div className='flex px-4 sm:px-10 xl:px-40 items-center justify-between py-2'>
                <p className='font-medium whitespace-nowrap text-xs sm:text-sm text-blue-900'>
                    Copyright© 2026 PIKT || All Rights Reserved
                </p>
                <div>
                    <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className='bg-primary group p-2 sm:p-3 rounded-full text-white'>
                        <FaArrowUp className='text-sm group-hover:translate-y-1 transition-all duration-110' />
                    </button>
                </div>
            </div>
        </>
    )
}

export default Footer
