import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Flame, Zap, Droplets, Wind, ArrowRight } from "lucide-react";

export function PyrolysisSection() {
  const processes = [
    {
      icon: <Flame className="text-orange-500" size={32} />,
      title: "Pemanasan Terkontrol",
      description: "Sampah dipanaskan pada suhu 300-900°C tanpa oksigen untuk mencegah pembakaran"
    },
    {
      icon: <Wind className="text-blue-500" size={32} />,
      title: "Dekomposisi Termal",
      description: "Molekul organik terurai menjadi gas sintetis, minyak pirolisis, dan char"
    },
    {
      icon: <Droplets className="text-green-500" size={32} />,
      title: "Kondensasi",
      description: "Gas yang dihasilkan dikondensasi menjadi minyak pirolisis yang dapat digunakan"
    },
    {
      icon: <Zap className="text-yellow-500" size={32} />,
      title: "Energi Bersih",
      description: "Hasil akhir berupa bahan bakar alternatif dan energi terbarukan"
    }
  ];

  const benefits = [
    "Mengurangi volume sampah hingga 90%",
    "Menghasilkan energi terbarukan",
    "Zero waste to landfill",
    "Mengurangi emisi gas rumah kaca",
    "Menghasilkan produk bernilai ekonomi",
    "Proses ramah lingkungan"
  ];

  return (
    <section id="about" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4">
            Teknologi Pirolisis
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-6">
            Revolusi Pengolahan Sampah dengan Pirolisis
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Pirolisis adalah proses dekomposisi termal sampah organik pada suhu tinggi tanpa oksigen, 
            mengubah limbah menjadi energi bersih dan produk bernilai ekonomi.
          </p>
        </div>

        {/* Process Flow */}
        <div className="mb-16">
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-8 sm:mb-12">Proses Pirolisis</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {processes.map((process, index) => (
              <div key={index} className="relative">
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardHeader className="text-center">
                    <div className="mx-auto mb-4">
                      {process.icon}
                    </div>
                    <CardTitle className="text-lg">{process.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-center">
                      {process.description}
                    </CardDescription>
                  </CardContent>
                </Card>
                
                {/* Arrow between cards */}
                {index < processes.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                    <ArrowRight className="text-muted-foreground" size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl font-bold text-foreground">
              Mengapa Memilih Pirolisis?
            </h3>
            
            <p className="text-muted-foreground">
              Teknologi pirolisis menawarkan solusi berkelanjutan untuk pengelolaan sampah 
              dengan mengkonversi limbah organik menjadi produk bernilai tinggi seperti bio-oil, 
              gas sintetis, dan biochar.
            </p>

            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Keunggulan Utama:</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0"></div>
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-muted p-6 rounded-lg">
              <h4 className="font-semibold mb-2 text-foreground">Fakta Menarik</h4>
              <p className="text-sm text-muted-foreground">
                Teknologi pirolisis dapat mengolah berbagai jenis sampah organik termasuk 
                plastik, biomassa, dan limbah organik lainnya dengan efisiensi konversi 
                energi hingga 85%.
              </p>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1718386046338-6259e822aa4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcHlyb2x5c2lzJTIwcGxhbnR8ZW58MXx8fHwxNzU3NTY4NTMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Industrial Pyrolysis Plant"
                className="w-full h-[400px] object-cover"
              />
            </div>
            
            {/* Temperature indicator */}
            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg p-3 border">
              <div className="flex items-center gap-2">
                <Flame className="text-orange-500" size={20} />
                <div>
                  <p className="text-xs text-muted-foreground">Suhu Operasi</p>
                  <p className="font-bold">300-900°C</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}