import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Alert, AlertDescription } from "./ui/alert";
import { Separator } from "./ui/separator";
import { 
  Camera, 
  MapPin, 
  Weight, 
  CheckCircle, 
  AlertTriangle,
  Scan,
  Navigation,
  Clock,
  X,
  RefreshCw,
  Coins,
  Leaf,
  Recycle
} from "lucide-react";

interface WasteScanningModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (data: any) => void;
  userLocation: string;
}

export function WasteScanningModal({ isOpen, onClose, onConfirm }: WasteScanningModalProps) {
  const [currentStep, setCurrentStep] = useState<'location' | 'scan' | 'weight' | 'confirm'>('location');
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [actualWeight, setActualWeight] = useState<string>("");
  const [isLocationValid, setIsLocationValid] = useState(false);
  const [currentLocation, setCurrentLocation] = useState<string>("");
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);

  // Lokasi yang diizinkan untuk penyetoran
  const authorizedLocations = [
    {
      id: "rt05-menteng",
      name: "RT 05/RW 03 Menteng",
      address: "Jl. Menteng Dalam No. 15, Jakarta Pusat",
      coordinates: { lat: -6.1944, lng: 106.8308 },
      schedule: "Senin-Sabtu: 08:00-16:00"
    },
    {
      id: "rt02-kebayoran", 
      name: "RT 02/RW 01 Kebayoran",
      address: "Jl. Kebayoran Baru No. 28, Jakarta Selatan",
      coordinates: { lat: -6.2297, lng: 106.7983 },
      schedule: "Senin-Jumat: 09:00-17:00"
    },
    {
      id: "rt07-cakung",
      name: "RT 07/RW 05 Cakung", 
      address: "Jl. Cakung Barat No. 42, Jakarta Timur",
      coordinates: { lat: -6.1656, lng: 106.9647 },
      schedule: "Senin-Sabtu: 07:30-15:30"
    }
  ];

  const wasteCategories = {
    "Plastik PET": { pointsPerKg: 200, color: "blue" },
    "Plastik HDPE": { pointsPerKg: 180, color: "blue" },
    "Kertas": { pointsPerKg: 180, color: "green" },
    "Kardus": { pointsPerKg: 170, color: "green" },
    "Organik": { pointsPerKg: 120, color: "orange" },
    "Biomassa": { pointsPerKg: 150, color: "purple" }
  };

  // Simulasi deteksi lokasi GPS
  const checkLocation = () => {
    setIsLoadingLocation(true);
    
    setTimeout(() => {
      // Simulasi hasil GPS - biasanya akan menggunakan navigator.geolocation
      const mockLocation = authorizedLocations[0]; // Simulasi lokasi valid
      setCurrentLocation(mockLocation.name);
      setIsLocationValid(true);
      setIsLoadingLocation(false);
    }, 2000);
  };

  // Proses scanning sampah
  const handleScanWaste = () => {
    setIsScanning(true);
    setCurrentStep('scan');
    
    // Simulasi proses scanning dengan AI - berbagai jenis sampah
    setTimeout(() => {
      const wasteTypes = [
        {
          type: "Plastik PET",
          confidence: 94.2,
          estimated_weight: 0.6,
          detected_items: [
            "Botol plastik 500ml - 2 unit",
            "Botol plastik 1L - 1 unit", 
            "Tutup botol plastik - 3 unit"
          ],
          prediction: {
            solar_output: 0.18,
            gasoline_output: 0.12,
            biochar: 0.08,
            efficiency: 89.2
          }
        },
        {
          type: "Plastik HDPE",
          confidence: 91.8,
          estimated_weight: 0.4,
          detected_items: [
            "Botol deterjen 1L - 1 unit",
            "Tutup botol HDPE - 2 unit",
            "Kantong plastik tebal - 3 unit"
          ],
          prediction: {
            solar_output: 0.15,
            gasoline_output: 0.10,
            biochar: 0.06,
            efficiency: 87.5
          }
        },
        {
          type: "Kertas",
          confidence: 88.5,
          estimated_weight: 0.8,
          detected_items: [
            "Kertas HVS A4 - 15 lembar",
            "Kertas koran - 5 lembar",
            "Kertas majalah - 8 lembar"
          ],
          prediction: {
            solar_output: 0.22,
            gasoline_output: 0.14,
            biochar: 0.12,
            efficiency: 85.3
          }
        },
        {
          type: "Kardus",
          confidence: 92.1,
          estimated_weight: 1.2,
          detected_items: [
            "Kardus kemasan sedang - 2 unit",
            "Kardus kemasan kecil - 3 unit",
            "Potongan kardus - 5 unit"
          ],
          prediction: {
            solar_output: 0.32,
            gasoline_output: 0.20,
            biochar: 0.18,
            efficiency: 83.7
          }
        },
        {
          type: "Organik",
          confidence: 86.9,
          estimated_weight: 1.5,
          detected_items: [
            "Sisa sayuran - 400g",
            "Kulit buah - 300g",
            "Daun kering - 200g",
            "Sisa makanan - 600g"
          ],
          prediction: {
            solar_output: 0.28,
            gasoline_output: 0.18,
            biochar: 0.25,
            efficiency: 78.2
          }
        },
        {
          type: "Biomassa",
          confidence: 89.7,
          estimated_weight: 2.1,
          detected_items: [
            "Ranting kayu kering - 800g",
            "Daun gugur - 600g",
            "Serbuk gergaji - 400g",
            "Kulit kayu - 300g"
          ],
          prediction: {
            solar_output: 0.45,
            gasoline_output: 0.28,
            biochar: 0.35,
            efficiency: 82.1
          }
        }
      ];
      
      // Pilih jenis sampah secara acak untuk simulasi
      const randomWaste = wasteTypes[Math.floor(Math.random() * wasteTypes.length)];
      
      const mockScanResult = {
        classification: {
          type: randomWaste.type,
          confidence: randomWaste.confidence,
          recyclable: true,
          estimated_weight: randomWaste.estimated_weight,
          detected_items: randomWaste.detected_items
        },
        prediction: randomWaste.prediction,
        environmental_impact: {
          co2_saved: randomWaste.estimated_weight * 0.6, // kg CO2 per kg sampah
          energy_generated: randomWaste.estimated_weight * 2.8 // kWh per kg sampah
        }
      };
      
      setScanResult(mockScanResult);
      setIsScanning(false);
      setCurrentStep('weight');
    }, 4000);
  };

  // Hitung total poin berdasarkan berat aktual
  const calculatePoints = () => {
    if (!scanResult || !actualWeight) return 0;
    const category = wasteCategories[scanResult.classification.type as keyof typeof wasteCategories];
    return Math.floor(parseFloat(actualWeight) * category.pointsPerKg);
  };

  // Validasi dan konfirmasi
  const handleConfirm = () => {
    if (!actualWeight || parseFloat(actualWeight) <= 0) {
      alert("Mohon masukkan berat sampah yang valid");
      return;
    }

    const depositData = {
      location: currentLocation,
      scanResult,
      actualWeight: parseFloat(actualWeight),
      totalPoints: calculatePoints(),
      timestamp: new Date().toISOString(),
      status: 'pending'
    };

    onConfirm(depositData);
    onClose();
    
    // Reset state
    setCurrentStep('location');
    setScanResult(null);
    setActualWeight("");
    setIsLocationValid(false);
  };

  const resetProcess = () => {
    setCurrentStep('location');
    setScanResult(null);
    setActualWeight("");
    setIsLocationValid(false);
    setCurrentLocation("");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b p-6 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold">Setor Sampah</h2>
            <p className="text-sm text-muted-foreground">
              Proses penyetoran sampah dengan validasi lokasi
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X size={20} />
          </Button>
        </div>

        <div className="p-6 space-y-6">
          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {[
              { key: 'location', label: 'Lokasi', icon: MapPin },
              { key: 'scan', label: 'Scan', icon: Camera },
              { key: 'weight', label: 'Berat', icon: Weight },
              { key: 'confirm', label: 'Konfirmasi', icon: CheckCircle }
            ].map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.key;
              const isCompleted = ['location', 'scan', 'weight', 'confirm'].indexOf(currentStep) > 
                                 ['location', 'scan', 'weight', 'confirm'].indexOf(step.key);
              
              return (
                <div key={step.key} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    isCompleted ? 'bg-green-500 text-white' :
                    isActive ? 'bg-primary text-primary-foreground' :
                    'bg-muted text-muted-foreground'
                  }`}>
                    <Icon size={16} />
                  </div>
                  <span className={`ml-2 text-sm ${
                    isActive ? 'font-medium' : 'text-muted-foreground'
                  }`}>
                    {step.label}
                  </span>
                  {index < 3 && (
                    <div className={`w-8 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-500' : 'bg-muted'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>

          <Separator />

          {/* Step 1: Location Validation */}
          {currentStep === 'location' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MapPin size={20} />
                  Validasi Lokasi Penyetoran
                </CardTitle>
                <CardDescription>
                  Pastikan Anda berada di lokasi penyetoran yang resmi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert>
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    Penyetoran sampah hanya dapat dilakukan di lokasi yang telah ditentukan
                  </AlertDescription>
                </Alert>

                <div className="space-y-3">
                  <Label>Lokasi yang Diizinkan:</Label>
                  {authorizedLocations.map((location) => (
                    <div key={location.id} className="p-3 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{location.name}</p>
                          <p className="text-sm text-muted-foreground">{location.address}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            <Clock size={12} className="inline mr-1" />
                            {location.schedule}
                          </p>
                        </div>
                        <Badge variant="secondary">Aktif</Badge>
                      </div>
                    </div>
                  ))}
                </div>

                {currentLocation && (
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                    <div className="flex items-center gap-2 text-green-800">
                      <CheckCircle size={16} />
                      <span className="font-medium">Lokasi Valid</span>
                    </div>
                    <p className="text-sm text-green-700 mt-1">
                      Anda berada di: {currentLocation}
                    </p>
                  </div>
                )}

                <div className="flex gap-3">
                  <Button 
                    onClick={checkLocation}
                    disabled={isLoadingLocation}
                    className="flex-1"
                  >
                    {isLoadingLocation ? (
                      <>
                        <RefreshCw className="mr-2 animate-spin" size={16} />
                        Mendeteksi Lokasi...
                      </>
                    ) : (
                      <>
                        <Navigation className="mr-2" size={16} />
                        Cek Lokasi GPS
                      </>
                    )}
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentStep('scan')}
                    disabled={!isLocationValid}
                  >
                    Lanjutkan
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 2: Waste Scanning */}
          {currentStep === 'scan' && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera size={20} />
                  Scan Sampah dengan AI
                </CardTitle>
                <CardDescription>
                  Gunakan AI untuk mengidentifikasi jenis dan kuantitas sampah
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {!scanResult && !isScanning && (
                  <div className="text-center py-8">
                    <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Scan className="text-primary" size={48} />
                    </div>
                    <h3 className="font-semibold mb-2">Siap untuk Scanning</h3>
                    <p className="text-muted-foreground mb-3">
                      AI dapat mendeteksi 6 jenis sampah dengan akurasi tinggi
                    </p>
                    <div className="grid grid-cols-3 gap-2 mb-4 text-xs">
                      <div className="bg-blue-50 border border-blue-200 p-2 rounded text-center text-blue-700">♻️ Plastik</div>
                      <div className="bg-green-50 border border-green-200 p-2 rounded text-center text-green-700">📄 Kertas</div>
                      <div className="bg-orange-50 border border-orange-200 p-2 rounded text-center text-orange-700">🍃 Organik</div>
                    </div>
                    <Button onClick={handleScanWaste} className="inline-flex items-center gap-2">
                      <Camera size={20} />
                      Mulai Scan AI
                    </Button>
                  </div>
                )}

                {isScanning && (
                  <div className="text-center py-8 space-y-4">
                    <div className="w-24 h-24 bg-blue-100 rounded-full flex items-center justify-center mx-auto animate-pulse">
                      <Camera className="text-blue-600" size={48} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">AI Sedang Menganalisis...</h3>
                      <p className="text-muted-foreground">
                        AI mengidentifikasi jenis dan menghitung jumlah sampah
                      </p>
                    </div>
                    <Progress value={67} className="w-full max-w-sm mx-auto" />
                    <p className="text-xs text-muted-foreground">
                      Memproses gambar dan klasifikasi objek...
                    </p>
                  </div>
                )}

                {scanResult && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-green-600">
                      <CheckCircle size={20} />
                      <span className="font-semibold">Scanning Berhasil!</span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Hasil Klasifikasi</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Jenis:</span>
                            <Badge 
                              variant="secondary"
                              className={`${
                                scanResult.classification.type.includes('Plastik') ? 'bg-blue-100 text-blue-800' :
                                scanResult.classification.type === 'Kertas' || scanResult.classification.type === 'Kardus' ? 'bg-green-100 text-green-800' :
                                scanResult.classification.type === 'Organik' ? 'bg-orange-100 text-orange-800' :
                                scanResult.classification.type === 'Biomassa' ? 'bg-purple-100 text-purple-800' :
                                ''
                              }`}
                            >
                              {scanResult.classification.type}
                            </Badge>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Akurasi:</span>
                            <span className="text-sm font-medium">{scanResult.classification.confidence}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Estimasi Berat:</span>
                            <span className="text-sm font-medium">{scanResult.classification.estimated_weight} kg</span>
                          </div>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-base">Prediksi Hasil</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-sm">Bio-Solar:</span>
                            <span className="text-sm font-medium">{scanResult.prediction.solar_output} L</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Bio-Bensin:</span>
                            <span className="text-sm font-medium">{scanResult.prediction.gasoline_output} L</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-sm">Biochar:</span>
                            <span className="text-sm font-medium">{scanResult.prediction.biochar} kg</span>
                          </div>
                        </CardContent>
                      </Card>
                    </div>

                    <Card>
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base">Item yang Terdeteksi</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-1">
                          {scanResult.classification.detected_items.map((item: string, index: number) => (
                            <li key={index} className="text-sm flex items-center gap-2">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                              {item}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    <div className="flex gap-2">
                      <Button 
                        onClick={() => setCurrentStep('weight')}
                        className="flex-1"
                      >
                        Lanjut ke Penimbangan
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setScanResult(null);
                          setIsScanning(false);
                        }}
                      >
                        Scan Ulang
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* Step 3: Weight Input */}
          {currentStep === 'weight' && scanResult && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Weight size={20} />
                  Input Berat Sampah
                </CardTitle>
                <CardDescription>
                  Masukkan berat aktual hasil penimbangan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Scan className="text-blue-600" size={16} />
                    <span className="font-medium text-blue-800">Hasil Scanning:</span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Jenis: {scanResult.classification.type} • 
                    Estimasi AI: {scanResult.classification.estimated_weight} kg
                  </p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="weight">Berat Aktual (kg) *</Label>
                  <Input
                    id="weight"
                    type="number"
                    step="0.1"
                    min="0.1"
                    max="50"
                    placeholder="Contoh: 1.2"
                    value={actualWeight}
                    onChange={(e) => setActualWeight(e.target.value)}
                    className="text-lg"
                  />
                  <p className="text-xs text-muted-foreground">
                    Minimum 0.1 kg • Maksimum 50 kg per transaksi
                  </p>
                </div>

                {actualWeight && parseFloat(actualWeight) > 0 && (
                  <div className="bg-green-50 border border-green-200 p-4 rounded-lg space-y-2">
                    <div className="flex items-center gap-2">
                      <Coins className="text-green-600" size={16} />
                      <span className="font-medium text-green-800">Perhitungan Poin:</span>
                    </div>
                    <div className="space-y-1 text-sm text-green-700">
                      <div className="flex justify-between">
                        <span>Berat:</span>
                        <span>{actualWeight} kg</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rate {scanResult.classification.type}:</span>
                        <span>{wasteCategories[scanResult.classification.type as keyof typeof wasteCategories]?.pointsPerKg} poin/kg</span>
                      </div>
                      <Separator />
                      <div className="flex justify-between font-medium">
                        <span>Total Poin:</span>
                        <span>{calculatePoints()} poin</span>
                      </div>
                    </div>
                  </div>
                )}

                <Alert>
                  <Leaf className="h-4 w-4" />
                  <AlertDescription>
                    Pastikan penimbangan akurat untuk perhitungan poin yang tepat
                  </AlertDescription>
                </Alert>

                <div className="flex gap-2">
                  <Button 
                    onClick={() => setCurrentStep('confirm')}
                    disabled={!actualWeight || parseFloat(actualWeight) <= 0}
                    className="flex-1"
                  >
                    Lanjut ke Konfirmasi
                  </Button>
                  <Button 
                    variant="outline"
                    onClick={() => setCurrentStep('scan')}
                  >
                    Kembali
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 'confirm' && scanResult && actualWeight && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle size={20} />
                  Konfirmasi Penyetoran
                </CardTitle>
                <CardDescription>
                  Periksa kembali detail penyetoran sebelum dikonfirmasi
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h4 className="font-medium">Detail Lokasi</h4>
                    <div className="text-sm space-y-1">
                      <p><span className="text-muted-foreground">Lokasi:</span> {currentLocation}</p>
                      <p><span className="text-muted-foreground">Waktu:</span> {new Date().toLocaleString('id-ID')}</p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h4 className="font-medium">Detail Sampah</h4>
                    <div className="text-sm space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Jenis:</span> 
                        <Badge 
                          className={`${
                            scanResult.classification.type.includes('Plastik') ? 'bg-blue-100 text-blue-800' :
                            scanResult.classification.type === 'Kertas' || scanResult.classification.type === 'Kardus' ? 'bg-green-100 text-green-800' :
                            scanResult.classification.type === 'Organik' ? 'bg-orange-100 text-orange-800' :
                            scanResult.classification.type === 'Biomassa' ? 'bg-purple-100 text-purple-800' :
                            ''
                          }`}
                        >
                          {scanResult.classification.type.includes('Plastik') ? '♻️' : 
                           scanResult.classification.type === 'Kertas' || scanResult.classification.type === 'Kardus' ? '📄' :
                           scanResult.classification.type === 'Organik' ? '🍃' :
                           scanResult.classification.type === 'Biomassa' ? '🌿' : ''}
                          {' ' + scanResult.classification.type}
                        </Badge>
                      </div>
                      <p><span className="text-muted-foreground">Berat:</span> {actualWeight} kg</p>
                      <p><span className="text-muted-foreground">Akurasi AI:</span> {scanResult.classification.confidence.toFixed(1)}%</p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <h4 className="font-medium text-yellow-800 mb-2">Perkiraan Hasil Produksi</h4>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div className="text-center">
                      <p className="font-medium">{((parseFloat(actualWeight) / scanResult.classification.estimated_weight) * scanResult.prediction.solar_output).toFixed(2)} L</p>
                      <p className="text-yellow-700">Bio-Solar</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{((parseFloat(actualWeight) / scanResult.classification.estimated_weight) * scanResult.prediction.gasoline_output).toFixed(2)} L</p>
                      <p className="text-yellow-700">Bio-Bensin</p>
                    </div>
                    <div className="text-center">
                      <p className="font-medium">{((parseFloat(actualWeight) / scanResult.classification.estimated_weight) * scanResult.prediction.biochar).toFixed(2)} kg</p>
                      <p className="text-yellow-700">Biochar</p>
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Coins className="text-green-600" size={20} />
                    <span className="font-bold text-xl text-green-800">{calculatePoints()} Poin</span>
                  </div>
                  <p className="text-sm text-green-700">
                    Setara dengan Rp {(calculatePoints() * 10).toLocaleString()}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button onClick={handleConfirm} className="flex-1">
                    <CheckCircle className="mr-2" size={16} />
                    Konfirmasi Setor
                  </Button>
                  <Button variant="outline" onClick={resetProcess}>
                    Batal
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}