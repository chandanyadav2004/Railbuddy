import { useState } from 'react';

export default function Navbar({ onLoginClick }) { // Added prop here
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-surface/80 border-b border-[#232f48]">
      <div className="max-w-[1280px] mx-auto flex items-center justify-between px-6 py-4 lg:px-10">
        <div className="flex items-center gap-4">
          <span className="material-symbols-outlined text-3xl text-primary">train</span>
          <h2 className="text-xl font-bold">RailBuddy</h2>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-9">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium hover:text-primary transition-colors text-slate-300">
              {link.name}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          {/* Desktop Login - Added onClick */}
          <button 
            onClick={onLoginClick} 
            className="hidden sm:block bg-primary hover:bg-primary/90 text-white px-6 py-2 rounded-xl text-sm font-bold transition-all cursor-pointer"
          >
            Login
          </button>
          
          {/* Mobile Toggle */}
          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white cursor-pointer">
            <span className="material-symbols-outlined">{isOpen ? 'close' : 'menu'}</span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isOpen && (
        <div className="md:hidden bg-surface border-b border-slate-800 p-6 flex flex-col gap-4 animate-in slide-in-from-top">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-lg font-medium text-slate-200">
              {link.name}
            </a>
          ))}
          {/* Mobile Login - Added onClick and closes menu */}
          <button 
            onClick={() => {
              setIsOpen(false);
              onLoginClick();
            }} 
            className="w-full bg-primary py-3 rounded-xl font-bold text-white cursor-pointer"
          >
            Login
          </button>
        </div>
      )}
    </header>
  );
}