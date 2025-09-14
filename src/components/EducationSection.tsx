import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  CheckCircle, 
  XCircle, 
  Lightbulb, 
  Leaf, 
  Recycle,
  Zap,
  DollarSign,
  Users
} from "lucide-react";

export function EducationSection() {
  const acceptedWaste = [
    {
      category: "Plastik PET",
      items: ["Botol air mineral", "Botol minuman ringan", "Kemasan makanan PET", "Wadah makanan transparan"],
      points: "200 poin/kg",
      color: "blue"
    },
    {
      category: "Plastik HDPE",
      items: ["Botol detergen", "Gallon air", "Kantong belanja tebal", "Wadah shampo"],
      points: "180 poin/kg",
      color: "green"
    }
  ];

  const notAcceptedWaste = [
    "Kertas dan kardus (tidak cocok untuk pirolisis bahan bakar)",
    "Sampah organik dan biomassa (tidak menghasilkan bahan bakar berkualitas)",
    "Plastik selain PET dan HDPE (tidak optimal untuk pirolisis)",
    "Baterai dan elektronik",
    "Kaca dan keramik", 
    "Logam berat",
    "Limbah medis",
    "Bahan kimia berbahaya",
    "Asbes dan material berbahaya lainnya"
  ];

  const benefits = [
    {
      icon: <DollarSign className="text-green-500" size={32} />,
      title: "Penghasilan Tambahan",
      description: "Dapatkan poin dari setiap kg plastik yang Anda setor dan tukar dengan saldo e-wallet"
    },
    {
      icon: <Leaf className="text-green-500" size={32} />,
      title: "Ramah Lingkungan",
      description: "Berkontribusi mengurangi sampah plastik di TPA dan menghasilkan energi bersih"
    },
    {
      icon: <Zap className="text-yellow-500" size={32} />,
      title: "Energi Terbarukan",
      description: "Plastik Anda diubah menjadi solar dan bensin melalui teknologi pirolisis"
    }
  ];

  const howItWorks = [
    {
      step: "1",
      title: "Kumpulkan Plastik",
      description: "Pisahkan plastik PET dan HDPE sesuai kategori yang diterima sistem"
    },
    {
      step: "2", 
      title: "Datang ke Titik Setor",
      description: "Bawa plastik ke pusat penyetoran di wilayah Kendari dan Sulawesi Tenggara"
    },
    {
      step: "3",
      title: "Scan & Timbang",
      description: "Gunakan aplikasi untuk scan jenis plastik dan lakukan penimbangan"
    },
    {
      step: "4",
      title: "Dapatkan Poin",
      description: "Terima poin secara otomatis berdasarkan jenis dan berat plastik"
    },
    {
      step: "5",
      title: "Tukar Reward",
      description: "Tukar poin dengan saldo e-wallet seperti GoPay, DANA, OVO"
    }
  ];

  return (
    <section id="education" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        
        {/* Apa itu TRS TO TECH */}
        <div className="text-center space-y-6">
          <Badge variant="secondary" className="inline-flex items-center gap-2">
            <Lightbulb size={16} />
            Tentang TRS TO TECH
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Mengubah Plastik Menjadi Berkah
          </h2>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            TRS TO TECH adalah platform revolusioner yang mengubah cara kita memandang sampah plastik. 
            Melalui teknologi pirolisis canggih yang didukung kecerdasan buatan, kami mengkonversi 
            plastik PET dan HDPE menjadi bahan bakar berkualitas tinggi seperti solar dan bensin. 
            Setiap kilogram plastik yang Anda setor tidak hanya membantu lingkungan, 
            tetapi juga memberikan reward berupa poin yang bisa ditukar dengan uang elektronik.
          </p>
        </div>

        {/* Cara Kerja Platform */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Bagaimana Cara Kerjanya?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Proses sederhana dalam 5 langkah untuk mengubah plastik menjadi berkah
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {howItWorks.map((item, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-xl font-bold mx-auto">
                  {item.step}
                </div>
                <h4 className="font-semibold text-foreground">{item.title}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-6 h-0.5 bg-border transform translate-x-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Manfaat untuk Anda */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Manfaat untuk Anda
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Dapatkan keuntungan berlipat dari setiap plastik yang Anda setor
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto mb-4">
                    {benefit.icon}
                  </div>
                  <CardTitle className="text-lg">{benefit.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{benefit.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Jenis Sampah yang Diterima */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              Plastik Apa Saja yang Bisa Disetor?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Khusus plastik PET dan HDPE yang optimal untuk proses pirolisis menghasilkan bahan bakar berkualitas
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Accepted Waste */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-green-600 flex items-center gap-2">
                <CheckCircle size={24} />
                Plastik yang Diterima untuk Pirolisis
              </h4>
              
              <div className="grid gap-4">
                {acceptedWaste.map((waste, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <CardTitle className="text-lg">{waste.category}</CardTitle>
                        <Badge 
                          variant="secondary" 
                          className={`bg-${waste.color}-100 text-${waste.color}-800`}
                        >
                          {waste.points}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-1">
                        {waste.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="text-sm text-muted-foreground flex items-center gap-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0"></div>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Not Accepted Waste */}
            <div className="space-y-6">
              <h4 className="text-xl font-semibold text-red-600 flex items-center gap-2">
                <XCircle size={24} />
                Sampah yang Tidak Diterima
              </h4>
              
              <Card className="border-red-200">
                <CardHeader>
                  <CardTitle className="text-lg text-red-800">Tidak Cocok untuk Pirolisis Bahan Bakar</CardTitle>
                  <CardDescription>
                    Sampah berikut tidak dapat diproses karena tidak menghasilkan bahan bakar berkualitas atau alasan keselamatan
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {notAcceptedWaste.map((item, index) => (
                      <li key={index} className="text-sm flex items-center gap-2">
                        <XCircle size={16} className="text-red-500 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Important Notice - Full Width */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 lg:p-8 mx-auto max-w-6xl">
          <h5 className="font-semibold text-yellow-800 mb-4 text-lg">⚠️ Penting untuk Diingat</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h6 className="font-medium text-yellow-800 mb-2">Persiapan Plastik:</h6>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Pastikan plastik dalam kondisi bersih dan kering</li>
                <li>• Cuci dan keringkan plastik setelah scanning untuk hasil optimal</li>
                <li>• Buang label dan tutup dari bahan berbeda</li>
                <li>• Pisahkan plastik sesuai kategori (PET/HDPE)</li>
              </ul>
            </div>
            <div>
              <h6 className="font-medium text-yellow-800 mb-2">Ketentuan Penyetoran:</h6>
              <ul className="text-sm text-yellow-700 space-y-1">
                <li>• Berat minimum per kategori: 0.5 kg</li>
                <li>• Berat maksimum per transaksi: 50 kg</li>
                <li>• Hindari kotoran dan bahan asing lainnya</li>
                <li>• Plastik yang kotor akan mempengaruhi kualitas hasil pirolisis</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Teknologi Pirolisis Explained */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <Badge variant="secondary">Teknologi Canggih</Badge>
            <h3 className="text-2xl md:text-3xl font-bold text-foreground">
              Teknologi Pirolisis: Masa Depan Pengelolaan Plastik
            </h3>
            <p className="text-muted-foreground">
              Pirolisis adalah proses dekomposisi termal plastik pada suhu tinggi (400-700°C) 
              tanpa kehadiran oksigen. Teknologi ini mengubah plastik PET dan HDPE menjadi tiga produk bernilai:
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="text-blue-600" size={16} />
                </div>
                <div>
                  <h4 className="font-semibold">Bio-Oil (Solar)</h4>
                  <p className="text-sm text-muted-foreground">
                    Cairan yang dapat langsung digunakan sebagai bahan bakar atau diolah menjadi solar berkualitas tinggi
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Zap className="text-green-600" size={16} />
                </div>
                <div>
                  <h4 className="font-semibold">Syngas (Bensin)</h4>
                  <p className="text-sm text-muted-foreground">
                    Gas sintetis yang dapat dikonversi menjadi bensin atau digunakan langsung sebagai energi
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Leaf className="text-orange-600" size={16} />
                </div>
                <div>
                  <h4 className="font-semibold">Biochar (Briket)</h4>
                  <p className="text-sm text-muted-foreground">
                    Arang berkualitas tinggi yang diolah menjadi briket untuk kebutuhan rumah tangga dan industri
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1718386046338-6259e822aa4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmR1c3RyaWFsJTIwcHlyb2x5c2lzJTIwcGxhbnR8ZW58MXx8fHwxNzU3NTY4NTMzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="Teknologi Pirolisis"
              className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg"
            />
            
            {/* Stats overlay */}
            <div className="absolute -bottom-6 -left-6 bg-white rounded-xl shadow-lg p-4 border">
              <div className="text-center">
                <p className="text-2xl font-bold text-green-600">85%</p>
                <p className="text-xs text-muted-foreground">Efisiensi Konversi</p>
              </div>
            </div>
            
            <div className="absolute -top-6 -right-6 bg-white rounded-xl shadow-lg p-4 border">
              <div className="text-center">
                <p className="text-2xl font-bold text-blue-600">0%</p>
                <p className="text-xs text-muted-foreground">Emisi Berbahaya</p>
              </div>
            </div>
          </div>
        </div>

        {/* Environmental Impact */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-8">
          <div className="text-center space-y-6">
            <Badge variant="secondary" className="bg-green-100 text-green-800">
              Dampak Lingkungan
            </Badge>
            <h3 className="text-2xl md:text-3xl font-bold text-green-800">
              Kontribusi Anda untuk Bumi
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">90%</div>
                <p className="text-green-700">Pengurangan Volume Plastik</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">75%</div>
                <p className="text-green-700">Penurunan Emisi CO₂</p>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
                <p className="text-green-700">Zero Plastic Waste to Landfill</p>
              </div>
            </div>
            
            <p className="text-green-700 max-w-2xl mx-auto">
              Setiap 10 kg plastik yang Anda setor setara dengan menanam 1 pohon 
              dan menghemat 15 liter bahan bakar fosil!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}