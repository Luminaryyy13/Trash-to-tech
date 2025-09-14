import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Brain, Zap, Gauge, TrendingUp, Calculator } from "lucide-react";

export function AIPredictionSection() {
  const [wasteType, setWasteType] = useState("");
  const [wasteAmount, setWasteAmount] = useState("");
  const [temperature, setTemperature] = useState("");
  const [prediction, setPrediction] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handlePredict = async () => {
    setIsLoading(true);
    
    // Simulate AI prediction with mock data
    setTimeout(() => {
      const mockPrediction = {
        efficiency: Math.floor(Math.random() * 15) + 85, // 85-100%
        energyOutput: Math.floor(Math.random() * 500) + 1500, // 1500-2000 kWh
        byProducts: {
          bioOil: Math.floor(Math.random() * 20) + 40, // 40-60%
          synGas: Math.floor(Math.random() * 15) + 25, // 25-40%
          bioChar: Math.floor(Math.random() * 10) + 15, // 15-25%
        },
        environmentalImpact: {
          co2Reduction: Math.floor(Math.random() * 500) + 1000, // 1000-1500 kg
          wasteReduction: Math.floor(Math.random() * 10) + 85, // 85-95%
        },
        processTime: Math.floor(Math.random() * 4) + 6, // 6-10 hours
        cost: Math.floor(Math.random() * 200) + 800, // $800-1000
      };
      
      setPrediction(mockPrediction);
      setIsLoading(false);
    }, 2000);
  };

  return (
    <section id="prediction" className="py-20 bg-gradient-to-br from-secondary/10 to-accent/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 inline-flex items-center gap-2">
            <Brain size={16} />
            Kecerdasan Buatan
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Prediksi AI untuk Pirolisis
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Gunakan kecerdasan buatan kami untuk memprediksi hasil pirolisis, efisiensi energi, 
            dan dampak lingkungan berdasarkan jenis dan jumlah sampah yang akan diolah.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Input Form */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calculator size={24} />
                  Input Parameter Prediksi
                </CardTitle>
                <CardDescription>
                  Masukkan data sampah untuk mendapatkan prediksi hasil pirolisis
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="wasteType">Jenis Sampah</Label>
                  <Select value={wasteType} onValueChange={setWasteType}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih jenis sampah" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="plastic">Plastik</SelectItem>
                      <SelectItem value="biomass">Biomassa</SelectItem>
                      <SelectItem value="paper">Kertas</SelectItem>
                      <SelectItem value="mixed">Campuran</SelectItem>
                      <SelectItem value="organic">Organik</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="wasteAmount">Jumlah Sampah (kg)</Label>
                  <Input
                    id="wasteAmount"
                    type="number"
                    placeholder="Masukkan jumlah sampah"
                    value={wasteAmount}
                    onChange={(e) => setWasteAmount(e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="temperature">Suhu Pirolisis (°C)</Label>
                  <Select value={temperature} onValueChange={setTemperature}>
                    <SelectTrigger>
                      <SelectValue placeholder="Pilih suhu operasi" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="300">300°C - Rendah</SelectItem>
                      <SelectItem value="500">500°C - Sedang</SelectItem>
                      <SelectItem value="700">700°C - Tinggi</SelectItem>
                      <SelectItem value="900">900°C - Sangat Tinggi</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handlePredict}
                  disabled={!wasteType || !wasteAmount || !temperature || isLoading}
                  className="w-full"
                >
                  {isLoading ? "Menganalisis..." : "Prediksi dengan AI"}
                </Button>
              </CardContent>
            </Card>

            {/* AI Features */}
            <Card>
              <CardHeader>
                <CardTitle>Fitur AI Kami</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Brain className="text-primary mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold">Machine Learning</h4>
                    <p className="text-sm text-muted-foreground">
                      Model terlatih dengan ribuan data historis pirolisis
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <TrendingUp className="text-primary mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold">Optimasi Real-time</h4>
                    <p className="text-sm text-muted-foreground">
                      Penyesuaian parameter otomatis untuk efisiensi maksimal
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Gauge className="text-primary mt-1 flex-shrink-0" size={20} />
                  <div>
                    <h4 className="font-semibold">Akurasi Tinggi</h4>
                    <p className="text-sm text-muted-foreground">
                      Prediksi dengan tingkat akurasi hingga 98.7%
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {prediction ? (
              <>
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Zap size={24} />
                      Hasil Prediksi AI
                    </CardTitle>
                    <CardDescription>
                      Prediksi berdasarkan parameter yang dimasukkan
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-4 bg-green-50 rounded-lg border">
                        <p className="text-2xl font-bold text-green-600">{prediction.efficiency}%</p>
                        <p className="text-sm text-muted-foreground">Efisiensi</p>
                      </div>
                      <div className="text-center p-4 bg-blue-50 rounded-lg border">
                        <p className="text-2xl font-bold text-blue-600">{prediction.energyOutput}</p>
                        <p className="text-sm text-muted-foreground">kWh Output</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h4 className="font-semibold">Hasil Produk:</h4>
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Bio-Oil</span>
                            <span>{prediction.byProducts.bioOil}%</span>
                          </div>
                          <Progress value={prediction.byProducts.bioOil} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Syngas</span>
                            <span>{prediction.byProducts.synGas}%</span>
                          </div>
                          <Progress value={prediction.byProducts.synGas} className="h-2" />
                        </div>
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Biochar</span>
                            <span>{prediction.byProducts.bioChar}%</span>
                          </div>
                          <Progress value={prediction.byProducts.bioChar} className="h-2" />
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Reduksi CO₂</p>
                        <p className="font-semibold">{prediction.environmentalImpact.co2Reduction} kg</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Waktu Proses</p>
                        <p className="font-semibold">{prediction.processTime} jam</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <CardContent className="text-center py-12">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1743796055664-3473eedab36e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcnRpZmljaWFsJTIwaW50ZWxsaWdlbmNlJTIwZGF0YSUyMGFuYWx5dGljc3xlbnwxfHx8fDE3NTc1MjA1MTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="AI Analytics"
                    className="w-48 h-32 object-cover rounded-lg mx-auto mb-4"
                  />
                  <h3 className="text-lg font-semibold mb-2">Siap untuk Prediksi</h3>
                  <p className="text-muted-foreground">
                    Masukkan parameter sampah untuk mendapatkan prediksi AI yang akurat
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}