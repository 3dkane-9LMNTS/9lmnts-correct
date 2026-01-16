import { useState } from 'react';
import { Menu, X } from 'lucide-react';
const logoImage = '/images/logo.png';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'Services', id: 'services' },
    { name: 'AI Services 🤖', id: 'ai-services', highlight: true },
    { name: 'Portfolio', id: 'portfolio' },
    { name: 'Pricing', id: 'pricing' },
    { name: 'About', id: 'about' },
  ];

  return (
    <nav className="relative z-50 bg-[#1A1A1A]/95 backdrop-blur-sm border-b border-[#FF7A00]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center group"
          >
            <img 
              src={logoImage} 
              alt="9LMNTS Studio" 
              className="h-10 w-auto group-hover:opacity-90 transition-opacity"
            />
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`transition-colors ${
                  currentPage === link.id
                    ? 'text-[#FF7A00]'
                    : 'text-white hover:text-[#FF7A00]'
                }`}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => onNavigate('start-project')}
              className="px-6 py-2 bg-[#FF7A00] text-[#1A1A1A] rounded hover:bg-[#FF7A00]/90 transition-colors"
            >
              Start Project
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1A1A1A] border-t border-[#FF7A00]/20">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-2 rounded transition-colors ${
                  currentPage === link.id
                    ? 'text-[#FF7A00] bg-[#222222]'
                    : 'text-white hover:bg-[#222222]'
                }`}
              >
                {link.name}
              </button>
            ))}
            <button
              onClick={() => {
                onNavigate('start-project');
                setMobileMenuOpen(false);
              }}
              className="w-full mt-2 px-6 py-2 bg-[#FF7A00] text-[#1A1A1A] rounded hover:bg-[#FF7A00]/90 transition-colors"
            >
              Start Project
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}