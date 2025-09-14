import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { 
  Smartphone, 
  MapPin, 
  Clock, 
  Users,
  ArrowRight,
  CheckCircle
} from "lucide-react";

interface CTASectionProps {
  onGetStarted: () => void;
}

export function CTASection({ onGetStarted }: CTASectionProps) {
  const locations = [
    "Jakarta Pusat - RT 05/RW 03 Menteng",
    "Jakarta Selatan - RT 02/RW 01 Kebayoran", 
    "Jakarta Timur - RT 07/RW 05 Cakung",
    "Jakarta Barat - RT 04/RW 02 Grogol",
    "Jakarta Utara - RT 03/RW 04 Kelapa Gading"
  ];

  const features = [
    "Scan sampah dengan AI YOLO v8",
    "Prediksi hasil bahan bakar real-time", 
    "Sistem poin dan reward otomatis",
    "Integrasi e-wallet (GoPay, DANA, OVO)",
    "Tracking dampak lingkungan personal",
    "Komunitas peduli lingkungan"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 to-secondary/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main CTA */}
        <div className="text-center space-y-8 mb-16">
          <Badge variant="secondary" className="inline-flex items-center gap-2">
            <Smartphone size={16} />
            Mulai Sekarang
          </Badge>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Siap Mengubah Sampah Menjadi
            <span className="block text-primary">Penghasilan Tambahan?</span>
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Bergabunglah dengan ribuan masyarakat Indonesia yang sudah merasakan manfaat 
            platform TRS TO TECH. Mulai dari 1 kg sampah, Anda sudah bisa berkontribusi 
            untuk lingkungan dan mendapatkan reward!
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={onGetStarted}
              className="inline-flex items-center gap-2 text-lg px-8 py-4"
            >
              Mulai Setor Sampah
              <ArrowRight size={20} />
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="text-lg px-8 py-4"
            >
              Download Panduan
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          
          {/* App Features */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                <Smartphone className="text-blue-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold">Fitur Aplikasi Canggih</h3>
              <ul className="space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Locations */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <MapPin className="text-green-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold">Lokasi Penyetoran</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Temukan titik setor terdekat di area Anda:
              </p>
              <ul className="space-y-2">
                {locations.map((location, index) => (
                  <li key={index} className="flex items-start gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0 mt-2"></div>
                    <span>{location}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground">
                *Lokasi baru akan terus ditambahkan
              </p>
            </CardContent>
          </Card>

          {/* Operating Hours */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="p-6 space-y-4">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mb-4">
                <Clock className="text-orange-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold">Jam Operasional</h3>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm">Senin - Jumat</span>
                  <span className="text-sm font-medium">08:00 - 17:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Sabtu</span>
                  <span className="text-sm font-medium">08:00 - 15:00</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Minggu</span>
                  <span className="text-sm font-medium">10:00 - 14:00</span>
                </div>
              </div>

              <div className="bg-blue-50 p-3 rounded-lg border border-blue-200 mt-4">
                <h4 className="font-semibold text-blue-800 text-sm mb-1">📱 Layanan 24/7</h4>
                <p className="text-xs text-blue-700">
                  Aplikasi dan customer support tersedia 24 jam untuk membantu Anda
                </p>
              </div>
            </CardContent>
          </Card>
        </div>



        {/* Final CTA */}
        <div className="text-center mt-16 space-y-6">
          <h3 className="text-2xl font-bold text-foreground">
            Tunggu Apa Lagi? Mari Mulai Berkontribusi!
          </h3>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Setiap langkah kecil Anda membuat perbedaan besar untuk masa depan bumi. 
            Bergabunglah hari ini dan rasakan dampak positifnya.
          </p>
          <Button 
            size="lg" 
            onClick={onGetStarted}
            className="inline-flex items-center gap-2 text-lg px-12 py-4"
          >
            Daftar Sekarang - GRATIS
            <ArrowRight size={20} />
          </Button>
          <p className="text-xs text-muted-foreground">
            Tanpa biaya pendaftaran • Tanpa biaya bulanan • Mulai dari 1 kg sampah
          </p>
        </div>
      </div>
    </section>
  );
}