import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Recycle, Settings, User, Lock, Mail, Phone } from "lucide-react";

interface LoginPageProps {
  onLogin: (userType: 'citizen' | 'operator', userData: any) => void;
  onShowRegistration?: () => void;
}

export function LoginPage({ onLogin, onShowRegistration }: LoginPageProps) {
  const [citizenData, setCitizenData] = useState({
    phone: "",
    password: ""
  });

  const [operatorData, setOperatorData] = useState({
    email: "",
    password: ""
  });

  const handleCitizenLogin = () => {
    // Mock login untuk masyarakat
    const userData = {
      id: "citizen_001",
      name: "Ahmad Rizki",
      phone: citizenData.phone,
      points: 1250,
      totalWaste: 12.5,
      location: "RT 05 RW 02, Kelurahan Menteng"
    };
    onLogin('citizen', userData);
  };

  const handleOperatorLogin = () => {
    // Mock login untuk operator
    const userData = {
      id: "operator_001",
      name: "Dr. Siti Nurhaliza",
      email: operatorData.email,
      role: "Plant Operator",
      facility: "TRASH TO TECH Jakarta Pusat"
    };
    onLogin('operator', userData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 to-secondary/10 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left side - Branding */}
        <div className="space-y-6">
          <div className="space-y-4">
            <Badge variant="secondary" className="inline-flex items-center gap-2">
              <Recycle size={16} />
              TRASH TO TECH Platform
            </Badge>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground">
              Trash to Treasure
              <span className="block text-primary">Smart Solution</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Platform cerdas pengolahan sampah menjadi bahan bakar melalui teknologi pirolisis. 
              Dapatkan poin dari sampah Anda dan pantau produksi energi secara real-time.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <User className="text-green-600 flex-shrink-0" size={24} />
                <h3 className="font-semibold text-green-800">Untuk Masyarakat</h3>
              </div>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Setor sampah dan dapatkan poin</li>
                <li>• Tukar poin dengan e-wallet</li>
                <li>• Scan sampah dengan AI</li>
                <li>• Lihat prediksi bahan bakar</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3 mb-2">
                <Settings className="text-blue-600 flex-shrink-0" size={24} />
                <h3 className="font-semibold text-blue-800">Untuk Operator</h3>
              </div>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Monitor sistem pirolisis</li>
                <li>• Pantau suhu dan tekanan</li>
                <li>• Kelola frekuensi sampah</li>
                <li>• Analisis produksi harian</li>
              </ul>
            </div>
          </div>

          <div className="hidden lg:block">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1719399924262-ebb6f2a8de80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjB3YXN0ZSUyMG1hbmFnZW1lbnQlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1NzU2ODUzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="TRASH TO TECH Platform"
              className="w-full h-48 object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Right side - Login Forms */}
        <div className="w-full max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <CardTitle>Masuk ke Platform</CardTitle>
              <CardDescription>
                Pilih jenis akun sesuai dengan peran Anda
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="citizen" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="citizen" className="flex items-center gap-2">
                    <User size={16} />
                    Masyarakat
                  </TabsTrigger>
                  <TabsTrigger value="operator" className="flex items-center gap-2">
                    <Settings size={16} />
                    Operator
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="citizen" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="citizen-phone">Nomor HP</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="citizen-phone"
                        type="tel"
                        placeholder="08123456789"
                        className="pl-10"
                        value={citizenData.phone}
                        onChange={(e) => setCitizenData({...citizenData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="citizen-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="citizen-password"
                        type="password"
                        placeholder="Masukkan password"
                        className="pl-10"
                        value={citizenData.password}
                        onChange={(e) => setCitizenData({...citizenData, password: e.target.value})}
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={handleCitizenLogin}
                    className="w-full"
                    type="button"
                  >
                    Masuk sebagai Masyarakat
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    Demo: HP "081234567890", Password "demo123"
                  </div>
                </TabsContent>

                <TabsContent value="operator" className="space-y-4 mt-6">
                  <div className="space-y-2">
                    <Label htmlFor="operator-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="operator-email"
                        type="email"
                        placeholder="operator@trashtotech.com"
                        className="pl-10"
                        value={operatorData.email}
                        onChange={(e) => setOperatorData({...operatorData, email: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="operator-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="operator-password"
                        type="password"
                        placeholder="Masukkan password"
                        className="pl-10"
                        value={operatorData.password}
                        onChange={(e) => setOperatorData({...operatorData, password: e.target.value})}
                      />
                    </div>
                  </div>

                  <Button 
                    onClick={handleOperatorLogin}
                    className="w-full"
                    type="button"
                  >
                    Masuk sebagai Operator
                  </Button>

                  <div className="text-center text-sm text-muted-foreground">
                    Demo: Email "operator@demo.com", Password "operator123"
                  </div>
                </TabsContent>
              </Tabs>

              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Belum punya akun?{" "}
                  <button 
                    onClick={onShowRegistration}
                    className="text-primary hover:underline font-medium"
                  >
                    Daftar di sini
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}