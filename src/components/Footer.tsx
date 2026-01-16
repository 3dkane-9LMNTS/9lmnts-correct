import { Instagram, Twitter, Linkedin, Mail, Shield } from 'lucide-react';
import logoImage from 'figma:asset/7fa6b449af0658006c308e262ec964e0117dac44.png';

interface FooterProps {
  onNavigate: (page: string, plan?: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-[#0D0D0D] border-t border-[#FF7A00]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="col-span-1">
            <img 
              src={logoImage} 
              alt="9LMNTS Studio" 
              className="h-12 w-auto mb-4"
            />
            <p className="text-gray-400 text-sm">
              Where Digital Design Enters the <span className="font-graffiti text-[#FF7A00]">CYBER CYPHER</span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><button onClick={() => onNavigate('home')} className="hover:text-[#FF7A00] transition-colors">Home</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-[#FF7A00] transition-colors">Services</button></li>
              <li><button onClick={() => onNavigate('pricing')} className="hover:text-[#FF7A00] transition-colors">Pricing</button></li>
              <li><button onClick={() => onNavigate('about')} className="hover:text-[#FF7A00] transition-colors">About</button></li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><button onClick={() => onNavigate('services')} className="hover:text-[#FF7A00] transition-colors">Web Design</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-[#FF7A00] transition-colors">Brand Identity</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-[#FF7A00] transition-colors">UI/UX Design</button></li>
              <li><button onClick={() => onNavigate('services')} className="hover:text-[#FF7A00] transition-colors">App Development</button></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white mb-4">Connect</h4>
            <div className="flex space-x-4 mb-4">
              <a href="#" className="text-gray-400 hover:text-[#FF7A00] transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FF7A00] transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FF7A00] transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-[#FF7A00] transition-colors">
                <Mail size={20} />
              </a>
            </div>
            <p className="text-gray-400 text-sm">
              contact@9lmnts.studio
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-[#FF7A00]/20 flex justify-between items-center">
          <p className="text-gray-400 text-sm">© 2024 9LMNTS Studio. All rights reserved.</p>
          <button 
            onClick={() => onNavigate('admin')}
            className="flex items-center gap-2 text-gray-500 hover:text-[#00D4FF] transition-colors text-sm"
          >
            <Shield size={16} />
            Admin Access
          </button>
        </div>
      </div>
    </footer>
  );
}