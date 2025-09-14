import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { WasteScanningModal } from "./WasteScanningModal";
import { toast } from "sonner@2.0.3";
import { 
  Camera, 
  Coins, 
  Wallet, 
  MapPin, 
  Recycle, 
  Fuel,
  TrendingUp,
  History,
  Gift,
  Scan,
  CheckCircle,
  AlertCircle,
  LogOut,
  Plus
} from "lucide-react";

interface CitizenDashboardProps {
  user: any;
  onLogout: () => void;
}

export function CitizenDashboard({ user, onLogout }: CitizenDashboardProps) {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<any>(null);
  const [selectedReward, setSelectedReward] = useState<string>("");
  const [showScanModal, setShowScanModal] = useState(false);
  const [recentDepositsState, setRecentDepositsState] = useState([
    { date: "2024-01-10", type: "Plastik PET", weight: 2.5, points: 500, status: "processed" },
    { date: "2024-01-08", type: "Plastik HDPE", weight: 1.8, points: 324, status: "processed" },
    { date: "2024-01-06", type: "Plastik PET", weight: 2.1, points: 420, status: "processed" },
    { date: "2024-01-05", type: "Plastik HDPE", weight: 1.2, points: 216, status: "processed" },
    { date: "2024-01-03", type: "Plastik PET", weight: 1.5, points: 300, status: "processing" },
    { date: "2024-01-01", type: "Plastik HDPE", weight: 0.8, points: 144, status: "processed" }
  ]);



  const rewardOptions = [
    { id: "gopay", name: "GoPay", rate: "100 poin = Rp 1.000", icon: "💳" },
    { id: "dana", name: "DANA", rate: "100 poin = Rp 1.000", icon: "💰" },
    { id: "ovo", name: "OVO", rate: "100 poin = Rp 1.000", icon: "🔵" },
    { id: "shopeepay", name: "ShopeePay", rate: "100 poin = Rp 1.000", icon: "🧡" }
  ];

  const handleScanWaste = () => {
    setIsScanning(true);
    
    // Simulasi proses scan dengan AI - hanya plastik PET dan HDPE
    setTimeout(() => {
      const wasteTypes = [
        { type: "Plastik PET", weight: 0.8, rate: 200 },
        { type: "Plastik HDPE", weight: 0.6, rate: 180 }
      ];
      
      const randomWaste = wasteTypes[Math.floor(Math.random() * wasteTypes.length)];
      
      const mockScanResult = {
        classification: {
          type: randomWaste.type,
          confidence: 85 + Math.random() * 10, // 85-95%
          recyclable: true,
          estimated_weight: randomWaste.weight
        },
        prediction: {
          solar_output: randomWaste.weight * 0.3, // liter
          gasoline_output: randomWaste.weight * 0.18, // liter
          biochar: randomWaste.weight * 0.12, // kg
          efficiency: 75 + Math.random() * 15 // 75-90%
        },
        points_estimate: Math.floor(randomWaste.weight * randomWaste.rate),
        environmental_impact: {
          co2_saved: randomWaste.weight * 0.8, // kg CO2
          energy_generated: randomWaste.weight * 2.5 // kWh
        }
      };
      
      setScanResult(mockScanResult);
      setIsScanning(false);
    }, 3000);
  };

  const handleRedeemPoints = (rewardId: string) => {
    alert(`Berhasil menukar 1000 poin dengan ${rewardOptions.find(r => r.id === rewardId)?.name} senilai Rp 10.000`);
  };

  const handleConfirmDeposit = (depositData: any) => {
    // Tambahkan setoran baru ke riwayat
    const newDeposit = {
      date: new Date().toISOString().split('T')[0],
      type: depositData.scanResult.classification.type,
      weight: depositData.actualWeight,
      points: depositData.totalPoints,
      status: "processing"
    };

    setRecentDepositsState(prev => [newDeposit, ...prev]);
    
    // Tampilkan notifikasi sukses
    toast.success(`Penyetoran berhasil! Anda mendapat ${depositData.totalPoints} poin`, {
      description: `${depositData.actualWeight} kg ${depositData.scanResult.classification.type} telah disetor di ${depositData.location}`,
      duration: 5000,
    });

    // Update user points (simulasi)
    user.points += depositData.totalPoints;
    user.totalWaste += depositData.actualWeight;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div>
              <h1 className="text-xl font-bold text-primary">TRASH TO TECH</h1>
              <p className="text-sm text-muted-foreground">Dashboard Masyarakat</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.location}</p>
              </div>
              <Button variant="outline" onClick={onLogout}>
                <LogOut size={16} className="mr-2" />
                Keluar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Poin</CardTitle>
              <Coins className="h-4 w-4 text-yellow-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.points.toLocaleString()}</div>
              <p className="text-xs text-muted-foreground">
                ≈ Rp {(user.points * 10).toLocaleString()}
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sampah Disetor</CardTitle>
              <Recycle className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{user.totalWaste} kg</div>
              <p className="text-xs text-green-600">
                +0.8 kg minggu ini
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Solar Dihasilkan</CardTitle>
              <Fuel className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.2 L</div>
              <p className="text-xs text-muted-foreground">
                Dari sampah Anda
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Bensin Dihasilkan</CardTitle>
              <Fuel className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.8 L</div>
              <p className="text-xs text-muted-foreground">
                Dari sampah Anda
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Setor Sampah */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Camera size={24} />
                  Setor Sampah dengan Validasi AI
                </CardTitle>
                <CardDescription>
                  Proses penyetoran lengkap dengan validasi lokasi, scanning AI, dan penimbangan akurat
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8">
                  <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Plus className="text-primary" size={48} />
                  </div>
                  <h3 className="font-semibold mb-2">Mulai Penyetoran Sampah</h3>
                  <p className="text-muted-foreground mb-4">
                    Sistem akan memvalidasi lokasi, scan sampah dengan AI, 
                    dan menghitung poin berdasarkan berat aktual
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6 text-sm">
                    <div className="flex items-center gap-2 justify-center">
                      <MapPin className="text-blue-500 flex-shrink-0" size={16} />
                      <span>Validasi Lokasi</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      <Camera className="text-green-500 flex-shrink-0" size={16} />
                      <span>AI Scanning</span>
                    </div>
                    <div className="flex items-center gap-2 justify-center">
                      <Coins className="text-yellow-500 flex-shrink-0" size={16} />
                      <span>Kalkulasi Poin</span>
                    </div>
                  </div>

                  <Button 
                    onClick={() => setShowScanModal(true)} 
                    className="inline-flex items-center gap-2"
                    size="lg"
                  >
                    <Camera size={20} />
                    Mulai Setor Sampah
                  </Button>
                </div>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">ℹ️ Jenis Plastik yang Didukung</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-blue-700 mb-3">
                    <div>• Plastik PET (200 poin/kg)</div>
                    <div>• Plastik HDPE (180 poin/kg)</div>
                  </div>
                  <ul className="text-sm text-blue-700 space-y-1">
                    <li>• Pastikan Anda berada di lokasi penyetoran Kendari/Sulawesi Tenggara</li>
                    <li>• Pisahkan plastik sesuai kategori untuk akurasi AI</li>
                    <li>• Minimum setoran 0.5 kg per jenis plastik (khusus pirolisis)</li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Recent Deposits */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History size={20} />
                  Riwayat Setoran
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentDepositsState.map((deposit, index) => (
                    <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 border rounded-lg gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                          <Recycle className="text-primary" size={20} />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium">{deposit.type}</p>
                          <p className="text-sm text-muted-foreground">
                            {deposit.date} • {deposit.weight} kg
                          </p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right flex-shrink-0">
                        <p className="font-semibold text-green-600">+{deposit.points} poin</p>
                        <Badge 
                          variant={deposit.status === 'processed' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {deposit.status === 'processed' ? 'Selesai' : 'Proses'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tukar Poin */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Gift size={20} />
                  Tukar Poin
                </CardTitle>
                <CardDescription>
                  Tukar poin Anda dengan saldo e-wallet
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <Coins className="text-yellow-600 mx-auto mb-2" size={32} />
                  <p className="font-bold text-2xl text-yellow-800">{user.points}</p>
                  <p className="text-sm text-yellow-700">Poin Tersedia</p>
                </div>

                <div className="space-y-3">
                  <h4 className="font-semibold">Pilih E-Wallet</h4>
                  {rewardOptions.map((reward) => (
                    <div 
                      key={reward.id}
                      className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                        selectedReward === reward.id 
                          ? 'border-primary bg-primary/5' 
                          : 'border-border hover:border-primary/50'
                      }`}
                      onClick={() => setSelectedReward(reward.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="text-xl">{reward.icon}</span>
                          <div>
                            <p className="font-medium">{reward.name}</p>
                            <p className="text-xs text-muted-foreground">{reward.rate}</p>
                          </div>
                        </div>
                        {selectedReward === reward.id && (
                          <CheckCircle className="text-primary" size={16} />
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span>Poin yang ditukar:</span>
                    <span className="font-medium">1.000 poin</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Nilai tukar:</span>
                    <span className="font-medium">Rp 10.000</span>
                  </div>
                  
                  <Button 
                    className="w-full"
                    disabled={!selectedReward || user.points < 1000}
                    onClick={() => selectedReward && handleRedeemPoints(selectedReward)}
                  >
                    <Wallet className="mr-2" size={16} />
                    Tukar Sekarang
                  </Button>
                  
                  {user.points < 1000 && (
                    <p className="text-xs text-muted-foreground text-center">
                      Minimal 1.000 poin untuk penukaran
                    </p>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Impact Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp size={20} />
                  Dampak Lingkungan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">CO₂ yang dikurangi</span>
                    <span className="font-semibold">15.8 kg</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Energi terbarukan</span>
                    <span className="font-semibold">42.5 kWh</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Sampah didaur ulang</span>
                    <span className="font-semibold">12.5 kg</span>
                  </div>
                </div>

                <div className="bg-green-50 p-3 rounded-lg border border-green-200">
                  <p className="text-sm text-green-800 text-center">
                    🌱 Kontribusi Anda setara dengan menanam <strong>2 pohon</strong> setiap bulan!
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Waste Scanning Modal */}
        <WasteScanningModal
          isOpen={showScanModal}
          onClose={() => setShowScanModal(false)}
          onConfirm={handleConfirmDeposit}
          userLocation={user.location}
        />
      </div>
    </div>
  );
}