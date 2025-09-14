import { Button } from "./ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

interface HeaderProps {
  onLoginClick?: () => void;
}

export function Header({ onLoginClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <h1 className="text-xl sm:text-2xl font-bold text-primary">TRASH TO TECH</h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <a href="#home" className="text-foreground hover:text-primary px-3 py-2 rounded-md transition-colors">
                Beranda
              </a>
              <a href="#about" className="text-foreground hover:text-primary px-3 py-2 rounded-md transition-colors">
                Tentang Pirolisis
              </a>
              <a href="#education" className="text-foreground hover:text-primary px-3 py-2 rounded-md transition-colors">
                Edukasi
              </a>
              <a href="#products" className="text-foreground hover:text-primary px-3 py-2 rounded-md transition-colors">
                Produk
              </a>
              <a href="#monitoring" className="text-foreground hover:text-primary px-3 py-2 rounded-md transition-colors">
                Cara Kerja
              </a>
              <a href="#contact" className="text-foreground hover:text-primary px-3 py-2 rounded-md transition-colors">
                Kontak
              </a>
            </div>
          </nav>

          <div className="hidden md:block">
            <Button onClick={onLoginClick}>Masuk ke Akun</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#home" className="text-foreground hover:text-primary block px-3 py-2 rounded-md transition-colors">
                Beranda
              </a>
              <a href="#about" className="text-foreground hover:text-primary block px-3 py-2 rounded-md transition-colors">
                Tentang Pirolisis
              </a>
              <a href="#education" className="text-foreground hover:text-primary block px-3 py-2 rounded-md transition-colors">
                Edukasi
              </a>
              <a href="#products" className="text-foreground hover:text-primary block px-3 py-2 rounded-md transition-colors">
                Produk
              </a>
              <a href="#monitoring" className="text-foreground hover:text-primary block px-3 py-2 rounded-md transition-colors">
                Cara Kerja
              </a>
              <a href="#contact" className="text-foreground hover:text-primary block px-3 py-2 rounded-md transition-colors">
                Kontak
              </a>
              <Button className="w-full mt-4" onClick={onLoginClick}>Masuk ke Akun</Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}