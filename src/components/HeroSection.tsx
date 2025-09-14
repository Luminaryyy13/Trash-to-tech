import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowRight, Recycle, Cpu, BarChart3 } from "lucide-react";

export function HeroSection() {
  return (
    <section id="home" className="bg-gradient-to-br from-primary/5 to-secondary/10 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge variant="secondary" className="inline-flex items-center gap-2">
              <Cpu size={16} />
              Teknologi AI Terdepan
            </Badge>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              TRASH TO TECH
              <span className="block text-primary">Solusi Cerdas</span>
              <span className="block">Pengolahan Sampah</span>
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-xl">
              Ubah plastik PET & HDPE menjadi solar dan bensin melalui teknologi pirolisis pintar. 
              Dapatkan poin dari setiap setoran plastik dan tukar dengan e-wallet!
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <div className="flex items-center gap-2">
                <Recycle className="text-primary flex-shrink-0" size={20} />
                <span className="text-sm sm:text-base">Sampah → Solar & Bensin</span>
              </div>
              <div className="flex items-center gap-2">
                <Cpu className="text-primary flex-shrink-0" size={20} />
                <span className="text-sm sm:text-base">Scan AI + Reward Poin</span>
              </div>
              <div className="flex items-center gap-2">
                <BarChart3 className="text-primary flex-shrink-0" size={20} />
                <span className="text-sm sm:text-base">Tukar Poin → E-Wallet</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="inline-flex items-center gap-2">
                Mulai Sekarang
                <ArrowRight size={20} />
              </Button>
              <Button variant="outline" size="lg">
                Pelajari Lebih Lanjut
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1719399924262-ebb6f2a8de80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjB3YXN0ZSUyMG1hbmFnZW1lbnQlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1NzU2ODUzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="TRASH TO TECH Waste Management Technology"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>
            
            {/* Floating stats */}
            <div className="absolute -bottom-4 -left-4 lg:-bottom-6 lg:-left-6 bg-white rounded-xl shadow-lg p-3 lg:p-4 border">
              <div className="flex items-center gap-2 lg:gap-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Recycle className="text-green-600" size={20} />
                </div>
                <div>
                  <p className="text-xs lg:text-sm text-muted-foreground">Plastik Terkonversi</p>
                  <p className="font-bold text-sm lg:text-base">94.8%</p>
                </div>
              </div>
            </div>

            <div className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6 bg-white rounded-xl shadow-lg p-3 lg:p-4 border">
              <div className="flex items-center gap-2 lg:gap-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <BarChart3 className="text-blue-600" size={20} />
                </div>
                <div>
                  <p className="text-xs lg:text-sm text-muted-foreground">Akurasi AI Deteksi</p>
                  <p className="font-bold text-sm lg:text-base">97.3%</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}