import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

export function Footer() {
  return (
    <footer id="contact" className="bg-foreground text-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">TRASH TO TECH</h3>
            <p className="text-sm text-background/80">
              Solusi inovatif pengolahan sampah menggunakan teknologi pirolisis 
              yang didukung kecerdasan buatan untuk masa depan yang berkelanjutan.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="p-2 text-background hover:text-foreground">
                <Facebook size={18} />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 text-background hover:text-foreground">
                <Twitter size={18} />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 text-background hover:text-foreground">
                <Linkedin size={18} />
              </Button>
              <Button variant="ghost" size="sm" className="p-2 text-background hover:text-foreground">
                <Instagram size={18} />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Tautan Cepat</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="text-background/80 hover:text-background transition-colors">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#about" className="text-background/80 hover:text-background transition-colors">
                  Tentang Pirolisis
                </a>
              </li>
              <li>
                <a href="#prediction" className="text-background/80 hover:text-background transition-colors">
                  Prediksi AI
                </a>
              </li>
              <li>
                <a href="#monitoring" className="text-background/80 hover:text-background transition-colors">
                  Monitoring
                </a>
              </li>
              <li>
                <a href="#" className="text-background/80 hover:text-background transition-colors">
                  Dokumentasi
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Layanan Kami</h4>
            <ul className="space-y-2 text-sm">
              <li className="text-background/80">Konsultasi Teknologi</li>
              <li className="text-background/80">Instalasi Sistem</li>
              <li className="text-background/80">Maintenance & Support</li>
              <li className="text-background/80">Training & Pelatihan</li>
              <li className="text-background/80">
                <a href="https://wa.me/085947637653" target="_blank" rel="noopener noreferrer" className="hover:text-background transition-colors">
                  Layanan 24/7 (WhatsApp)
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Hubungi Kami</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <MapPin size={16} className="text-background/60" />
                <span className="text-background/80">
                  Jl. Haluoleo No. 123, Kendari, Sulawesi Tenggara
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-background/60" />
                <span className="text-background/80">+62 21 1234 5678</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={16} className="text-background/60" />
                <span className="text-background/80">info@trashtotech.com</span>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="font-medium">Newsletter</h5>
              <p className="text-xs text-background/80">
                Dapatkan update terbaru teknologi pirolisis
              </p>
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Email Anda"
                  className="bg-background text-foreground border-background/20"
                />
                <Button variant="secondary" size="sm">
                  Subscribe
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-background/20" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-background/80">
          <p>
            © 2024 TRASH TO TECH. Semua hak cipta dilindungi.
          </p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-background transition-colors">
              Kebijakan Privasi
            </a>
            <a href="#" className="hover:text-background transition-colors">
              Syarat & Ketentuan
            </a>
            <a href="#" className="hover:text-background transition-colors">
              Bantuan
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}