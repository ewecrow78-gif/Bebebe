import React, { useState } from 'react';
import { Menu, X, Phone, Settings } from 'lucide-react';
import { REALTOR_INFO } from '../data';

interface HeaderProps {
  onOpenCallback: () => void;
  isCrmOpen: boolean;
  setIsCrmOpen: (open: boolean) => void;
  newLeadsCount: number;
}

export default function Header({ onOpenCallback, isCrmOpen, setIsCrmOpen, newLeadsCount }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'О себе', href: '#about' },
    { label: 'Услуги', href: '#services' },
    { label: 'Калькулятор', href: '#calculators' },
    { label: 'Районы Омска', href: '#districts' },
    { label: 'Каталог', href: '#catalog' },
    { label: 'Отзывы', href: '#testimonials' },
  ];

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    setIsCrmOpen(false); // Close CRM when navigating
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-dark-900/95 backdrop-blur-md border-b border-white/5 shadow-xl transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-22">
          
          {/* Logo / Title (Sophisticated Initials style) */}
          <div 
            className="flex items-center gap-3 cursor-pointer select-none group" 
            onClick={() => {
              setIsCrmOpen(false);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            id="logo"
          >
            <div className="w-10 h-10 border-2 border-gold-500 flex items-center justify-center font-serif text-lg font-bold text-gold-500 transition-all duration-300 group-hover:bg-gold-500 group-hover:text-black">
              ЕВ
            </div>
            <div className="flex flex-col">
              <span className="text-xs tracking-[0.25em] uppercase font-light text-white group-hover:text-gold-500 transition-colors">
                {REALTOR_INFO.name}
              </span>
              <span className="text-[8px] text-white/40 tracking-[0.15em] uppercase font-mono mt-0.5">
                ★ ЭКСПЕРТ ПО НЕДВИЖИМОСТИ
              </span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8 items-center">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className={`text-[10px] tracking-widest uppercase font-medium transition-colors hover:text-gold-500 ${
                  isCrmOpen ? 'text-white/40' : 'text-white/70'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden sm:flex items-center space-x-4">
            
            {/* Lead CRM Button */}
            <button
              onClick={() => setIsCrmOpen(!isCrmOpen)}
              className={`relative flex items-center gap-2 px-3 py-2 border transition-all duration-300 font-mono text-[10px] uppercase tracking-wider ${
                isCrmOpen
                  ? 'bg-gold-500/10 text-gold-500 border-gold-500/30'
                  : 'bg-dark-800 text-white/70 border-white/5 hover:bg-dark-700 hover:text-white'
              }`}
              title="Панель заявок CRM (для демонстрации)"
              id="crm-toggle-btn"
            >
              <Settings className={`w-3.5 h-3.5 ${isCrmOpen ? 'animate-spin text-gold-500' : 'text-white/40'}`} />
              <span>CRM</span>
              {newLeadsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[9px] font-bold text-black ring-1 ring-dark-900 animate-pulse">
                  {newLeadsCount}
                </span>
              )}
            </button>

            {/* Telephone Link */}
            <a
              href={`tel:${REALTOR_INFO.phone}`}
              className="flex items-center gap-2 text-white/80 hover:text-gold-500 font-mono text-xs font-semibold tracking-wider bg-dark-800 border border-white/5 px-3 py-2 transition-all hover:bg-dark-700"
              id="header-phone-link"
            >
              <Phone className="w-3.5 h-3.5 text-gold-500" />
              <span>{REALTOR_INFO.phone}</span>
            </a>

            {/* Primary Action Button (Sophisticated Blocky Gold Button) */}
            <button
              onClick={onOpenCallback}
              className="bg-gold-500 text-black hover:bg-gold-400 px-6 py-2.5 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer shadow-lg hover:translate-y-[-1px] active:translate-y-[1px]"
              id="header-callback-btn"
            >
              Консультация
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center space-x-3 lg:hidden">
            <button
              onClick={() => setIsCrmOpen(!isCrmOpen)}
              className={`relative flex items-center p-2.5 border transition-all ${
                isCrmOpen ? 'bg-gold-500/10 text-gold-500 border-gold-500/30' : 'bg-dark-800 text-white/70 border-white/5'
              }`}
              title="Панель CRM"
            >
              <Settings className="w-4 h-4" />
              {newLeadsCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-gold-500 text-[8px] font-bold text-black ring-1 ring-dark-900">
                  {newLeadsCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 text-white/70 hover:bg-dark-800 hover:text-white border border-white/5"
              aria-label="Toggle Menu"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-white/5 bg-dark-950 shadow-2xl animate-fadeIn">
          <div className="px-4 py-6 space-y-3">
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left px-4 py-3 text-xs tracking-widest uppercase font-medium text-white/70 hover:bg-dark-800 hover:text-gold-500 transition-colors"
              >
                {item.label}
              </button>
            ))}
            <div className="pt-4 border-t border-white/5 flex flex-col space-y-3">
              <a
                href={`tel:${REALTOR_INFO.phone}`}
                className="flex items-center gap-2 justify-center px-4 py-3.5 bg-dark-800 border border-white/5 text-white font-mono text-xs font-semibold tracking-wider hover:bg-dark-700 transition-all"
              >
                <Phone className="w-4 h-4 text-gold-500" />
                <span>{REALTOR_INFO.phone}</span>
              </a>
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  onOpenCallback();
                }}
                className="w-full bg-gold-500 text-black hover:bg-gold-400 py-3.5 text-xs font-bold uppercase tracking-widest transition-all"
              >
                Оставить заявку
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
