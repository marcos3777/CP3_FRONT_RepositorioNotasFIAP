'use client';

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { MdMenu, MdClose } from "react-icons/md";
import logofiap from "@/public/fiap.png";

export default function Menu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    
    const handleReload = () => {
        window.location.href = "/";
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <nav className="flex justify-between items-center w-full">
            <div onClick={handleReload} className="cursor-pointer">
                <Image src={logofiap} alt="Logo da Fiap" className="imgfiap" />
            </div>
            
            {/* Mobile menu button */}
            <div className="md:hidden">
                <button onClick={toggleMenu} className="text-white p-2">
                    {isMenuOpen ? <MdClose size={24} /> : <MdMenu size={24} />}
                </button>
            </div>
            
            {/* Desktop menu */}
            <ul className="hidden md:flex space-x-8">
                <li><Link href="/" className="text-white hover:text-red-500 transition-colors">Home</Link></li>
                <li><Link href="/cadastrar" className="text-white hover:text-red-500 transition-colors">Cadastrar</Link></li>
            </ul>
            
            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="absolute top-20 left-0 right-0 bg-gray-900 border-b border-gray-800 shadow-lg z-50 md:hidden">
                    <ul className="flex flex-col p-4">
                        <li className="py-2"><Link href="/" className="text-white hover:text-red-500 transition-colors">Home</Link></li>
                        <li className="py-2"><Link href="/cadastrar" className="text-white hover:text-red-500 transition-colors">Cadastrar</Link></li>
                    </ul>
                </div>
            )}
        </nav>
    );
}
