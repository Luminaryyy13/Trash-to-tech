import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { 
  Fuel, 
  Zap, 
  Leaf, 
  ShoppingCart, 
  TrendingDown,
  CheckCircle,
  Star,
  Truck,
  Clock,
  MapPin,
  Calculator
} from "lucide-react";

export function ProductsSection() {
  const [selectedProduct, setSelectedProduct] = useState<string>("solar");

  const products = [
    {
      id: "solar",
      name: "Bio-Solar TRS",
      description: "Solar berkualitas tinggi hasil pirolisis plastik PET & HDPE",
      price: 10000,
      originalPrice: 15000,
      unit: "per liter",
      availability: "Tersedia",
      stock: 2840,
      quality: "RON 48-52",
      icon: <Fuel className="text-blue-600" size={32} />,
      color: "blue",
      features: [
        "Ramah lingkungan 100%",
        "Efisiensi pembakaran tinggi",
        "Emisi CO₂ rendah",
        "Cocok untuk mesin diesel",
        "Telah teruji lab independen"
      ],
      specifications: {
        density: "0.83-0.85 kg/L",
        sulfur: "< 0.005%",
        viscosity: "2.0-4.5 cSt",
        flashPoint: "> 55°C"
      }
    },
    {
      id: "gasoline",
      name: "Bio-Bensin TRS",
      description: "Bensin sintetis dari gas hasil pirolisis plastik PET & HDPE",
      price: 12000,
      originalPrice: 16500,
      unit: "per liter",
      availability: "Tersedia",
      stock: 1650,
      quality: "RON 88-92",
      icon: <Zap className="text-orange-600" size={32} />,
      color: "orange",
      features: [
        "Oktan tinggi RON 88-92",
        "Pembakaran bersih",
        "Performa mesin optimal",
        "Cocok semua kendaraan",
        "Hemat bahan bakar"
      ],
      specifications: {
        octane: "88-92 RON",
        density: "0.72-0.78 kg/L",
        volatility: "45-70 kPa",
        ethanol: "< 10%"
      }
    },
    {
      id: "briquette",
      name: "Briket Biochar TRS",
      description: "Briket arang berkualitas dari residu pirolisis",
      price: 8000,
      originalPrice: 12000,
      unit: "per 200 gram",
      availability: "Tersedia",
      stock: 5200,
      quality: "Kalor tinggi",
      icon: <Leaf className="text-green-600" size={32} />,
      color: "green",
      features: [
        "Kalor tinggi 6500 kcal/kg",
        "Asap minimal",
        "Tahan lama membakar",
        "Cocok untuk masak & BBQ",
        "Harga sangat terjangkau"
      ],
      specifications: {
        calorific: "6000-7000 kcal/kg",
        ash: "< 8%",
        moisture: "< 10%",
        fixed_carbon: "> 70%"
      }
    }
  ];

  const currentProduct = products.find(p => p.id === selectedProduct) || products[0];
  
  const savings = Math.round(((currentProduct.originalPrice - currentProduct.price) / currentProduct.originalPrice) * 100);

  const orderSteps = [
    {
      icon: <ShoppingCart size={20} />,
      title: "Pilih Produk",
      description: "Pilih jenis dan jumlah produk yang diinginkan"
    },
    {
      icon: <Calculator size={20} />,
      title: "Hitung Total",
      description: "Sistem akan menghitung total harga otomatis"
    },
    {
      icon: <Truck size={20} />,
      title: "Pilih Pengiriman",
      description: "Ambil sendiri atau diantar ke lokasi Anda"
    },
    {
      icon: <CheckCircle size={20} />,
      title: "Konfirmasi",
      description: "Bayar dan tunggu produk siap atau dikirim"
    }
  ];

  const testimonials = [
    {
      name: "Budi Santoso",
      location: "Kendari, Sulawesi Tenggara",
      rating: 5,
      comment: "Bio-solar TRS kualitasnya bagus banget! Mesin truk saya jadi lebih halus dan hemat. Harga juga jauh lebih murah dari solar biasa."
    },
    {
      name: "Sari Dewi",
      location: "Baubau, Sulawesi Tenggara", 
      rating: 5,
      comment: "Briket biochar ini mantap buat usaha warung makan saya. Tahan lama bakarnya dan asapnya minimal. Untung jadi naik!"
    },
    {
      name: "Ahmad Rizki",
      location: "Kolaka, Sulawesi Tenggara",
      rating: 5,
      comment: "Sudah 6 bulan pakai bio-bensin TRS di motor. Tarikan lebih responsif dan konsumsi BBM lebih irit. Recommended!"
    }
  ];

  return (
    <section id="products" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-6 mb-16">
          <Badge variant="secondary" className="inline-flex items-center gap-2">
            <ShoppingCart size={16} />
            Produk TRS TO TECH
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">
            Hasil Olahan Sampah untuk Kebutuhan Anda
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Dapatkan bahan bakar dan briket berkualitas tinggi hasil teknologi pirolisis 
            dengan harga jauh lebih murah dari produk konvensional. Ramah lingkungan dan hemat biaya!
          </p>
        </div>

        {/* Product Selector */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {products.map((product) => (
            <Button
              key={product.id}
              variant={selectedProduct === product.id ? "default" : "outline"}
              onClick={() => setSelectedProduct(product.id)}
              className="flex items-center gap-2"
            >
              {product.icon}
              {product.name}
            </Button>
          ))}
        </div>

        {/* Main Product Display */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image & Info */}
          <div className="space-y-6">
            <div className="relative">
              <ImageWithFallback
                src={
                  selectedProduct === "solar" 
                    ? "https://images.unsplash.com/photo-1578662996442-48f60103fc96?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkaWVzZWwlMjBmdWVsJTIwcHVtcHxlbnwxfHx8fDE3NTc1Njg1MzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    : selectedProduct === "gasoline"
                    ? "https://images.unsplash.com/photo-1545558014-8692077e9b5c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYXNvbGluZSUyMGZ1ZWx8ZW58MXx8fHwxNzU3NTY4NTM1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    : "https://images.unsplash.com/photo-1516975080664-ed2fc6a32937?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGFyY29hbCUyMGJyaXF1ZXR0ZXxlbnwxfHx8fDE3NTc1Njg1MzZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                }
                alt={currentProduct.name}
                className="w-full h-64 md:h-80 object-cover rounded-xl"
              />
              
              {/* Availability Badge */}
              <Badge 
                className={`absolute top-4 left-4 ${
                  currentProduct.availability === "Tersedia" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-red-100 text-red-800"
                }`}
              >
                <CheckCircle size={14} className="mr-1" />
                {currentProduct.availability}
              </Badge>

              {/* Discount Badge */}
              <Badge className="absolute top-4 right-4 bg-red-100 text-red-800">
                Hemat {savings}%
              </Badge>
            </div>

            {/* Product Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                {currentProduct.icon}
                <div>
                  <h3 className="text-2xl font-bold">{currentProduct.name}</h3>
                  <p className="text-muted-foreground">{currentProduct.quality}</p>
                </div>
              </div>

              <p className="text-muted-foreground">{currentProduct.description}</p>

              {/* Price */}
              <div className="space-y-2">
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-bold text-primary">
                    Rp {currentProduct.price.toLocaleString()}
                  </span>
                  <span className="text-lg text-muted-foreground line-through">
                    Rp {currentProduct.originalPrice.toLocaleString()}
                  </span>
                  <Badge variant="destructive">{savings}% OFF</Badge>
                </div>
                <p className="text-sm text-muted-foreground">{currentProduct.unit}</p>
              </div>

              {/* Stock */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Stok tersedia:</span>
                  <span className="font-medium">{currentProduct.stock.toLocaleString()} L</span>
                </div>
                <Progress value={75} className="h-2" />
                <p className="text-xs text-muted-foreground">Stok terbatas - order sekarang!</p>
              </div>
            </div>
          </div>

          {/* Product Specifications & Features */}
          <div className="space-y-6">
            {/* Features */}
            <Card>
              <CardHeader>
                <CardTitle>Keunggulan Produk</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {currentProduct.features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <CheckCircle className="text-green-500 flex-shrink-0 mt-0.5" size={16} />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Specifications */}
            <Card>
              <CardHeader>
                <CardTitle>Spesifikasi Teknis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {Object.entries(currentProduct.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between text-sm">
                    <span className="capitalize">{key.replace('_', ' ')}:</span>
                    <span className="font-medium">{value}</span>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Order Button */}
            <div className="space-y-4">
              <Button size="lg" className="w-full">
                <ShoppingCart className="mr-2" size={20} />
                Pesan Sekarang
              </Button>
              
              <Button variant="outline" className="w-full">
                <MapPin className="mr-2" size={16} />
                Lokasi Pickup Kendari
              </Button>
            </div>

            {/* Delivery Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 mb-2 flex items-center gap-2">
                <Clock size={16} />
                Info Pengiriman
              </h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Pickup gratis di lokasi pabrik Kendari</li>
                <li>• Pengiriman same-day area Sulawesi Tenggara</li>
                <li>• Minimum order 20 liter untuk pengiriman</li>
                <li>• Garansi kualitas 100%</li>
              </ul>
            </div>
          </div>
        </div>

        {/* How to Order */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Cara Memesan Produk
            </h3>
            <p className="text-muted-foreground">
              Proses pemesanan yang mudah dan cepat
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {orderSteps.map((step, index) => (
              <div key={index} className="text-center space-y-3">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  {step.icon}
                </div>
                <h4 className="font-semibold">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Price Comparison */}
        <div className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingDown className="text-green-600" size={24} />
                Perbandingan Harga dengan Produk Konvensional
              </CardTitle>
              <CardDescription>
                Lihat penghematan yang bisa Anda dapatkan
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3">Produk</th>
                      <th className="text-center py-3">TRS TO TECH</th>
                      <th className="text-center py-3">Harga Pasar</th>
                      <th className="text-center py-3">Penghematan</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map((product, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-4">
                          <div className="flex items-center gap-3">
                            {product.icon}
                            <span className="font-medium">{product.name}</span>
                          </div>
                        </td>
                        <td className="text-center py-4">
                          <span className="font-bold text-green-600">
                            Rp {product.price.toLocaleString()}
                          </span>
                        </td>
                        <td className="text-center py-4">
                          <span className="text-muted-foreground line-through">
                            Rp {product.originalPrice.toLocaleString()}
                          </span>
                        </td>
                        <td className="text-center py-4">
                          <Badge variant="destructive">
                            {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Customer Testimonials */}
        <div>
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Testimoni Pelanggan
            </h3>
            <p className="text-muted-foreground">
              Apa kata mereka yang sudah mencoba produk TRS TO TECH
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="font-bold text-primary">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{testimonial.name}</p>
                      <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-500 fill-current" size={16} />
                    ))}
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground italic">
                    "{testimonial.comment}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 space-y-6">
          <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Wujudkan Gaya Hidup Ramah Lingkungan & Hemat
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Bergabunglah dengan ribuan pelanggan yang sudah merasakan manfaat produk berkualitas 
              dari sampah daur ulang. Hemat biaya, jaga lingkungan!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                <ShoppingCart className="mr-2" size={20} />
                Mulai Berbelanja
              </Button>
              <Button variant="outline" size="lg">
                <MapPin className="mr-2" size={20} />
                Lokasi Terdekat
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}