'use client';

import React from 'react';
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@nextui-org/react";

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <header className="flex justify-center items-center z-10 py-10">
            <div className="flex justify-between items-center w-full pl-4">
                <Link href="/" className="flex items-center">
                    <div className="mr-5 relative">
                        <Image
                            src="/images/Logo.png"
                            alt="Logo"
                            width={48}
                            height={48}
                        />
                    </div>
                    <span className="text-2xl font-normal font-bold text-white hidden sm:block">
                        Provehance
                    </span>
                </Link>
                <div className="flex flex-col items-center sm:items-start">
                    <button className="sm:hidden" onClick={() => setIsOpen(!isOpen)}>
                        <Image
                            src="/images/icon/menu.svg"
                            alt="Menu"
                            width={25}
                            height={25}
                        />
                    </button>
                    <nav className={`${isOpen ? 'flex' : 'hidden'} sm:flex flex-row items-center`}>
                        <div className="flex flex-row items-center">
                            <Dropdown
                                showArrow
                                classNames={{
                                    base: "before:bg-default-200", // change arrow background
                                    content: "py-1 px-1 border border-default-200 bg-black bg-opacity-30",
                                }}>
                                <DropdownTrigger>
                                    <button
                                        className='text-white hover:text-tiffany_blue px-6 py-2 text-xl transition duration-300'
                                    >
                                        Products
                                    </button>
                                </DropdownTrigger>
                                <DropdownMenu aria-label="product menu" disabledKeys={["swap"]}>
                                    <DropdownItem key="proof" href="/all-proofs" className='text-white'>Proof</DropdownItem>
                                    <DropdownItem key="credit-score" href="/" className='text-white'>Credit Score</DropdownItem>
                                    <DropdownItem key="swap" href="/" className='text-white'>Swap</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </div>
                        <Link href="/proof-of-transaction" className="text-white hover:text-tiffany_blue ml-4 px-6 py-2 text-xl transition duration-300">
                            Company
                        </Link>
                        <Link href="/#contact" className="text-white hover:text-tiffany_blue ml-4 px-6 py-2 text-xl transition duration-300">
                            Contact
                        </Link>
                        <Button variant="bordered" href="/" size='lg' className={`${isOpen ? 'flex' : 'hidden'} sm:hidden items-center text-tiffany_blue text-xl border-tiffany_blue `}>
                            Enroll Now
                        </Button>
                    </nav>
                </div>

                <Dropdown
                    showArrow
                    classNames={{
                        base: "before:bg-default-200", // change arrow background
                        content: "py-1 px-1 border border-default-200 bg-black bg-opacity-30",
                    }}>
                    <DropdownTrigger>
                        <Button variant="bordered" href="/" size='lg' className={`hidden sm:block text-tiffany_blue text-xl border-tiffany_blue mr-4 `}>
                            Enroll Now
                        </Button>
                    </DropdownTrigger>
                    <DropdownMenu aria-label="Login menu">
                        <DropdownItem key="sign-in" href="/all-proofs" className='text-white'>Sign In</DropdownItem>
                        <DropdownItem key="sign-up" href="/" className='text-white'>Sign Up</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
            </div>
        </header>
    );
}


export default Header;