import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ArrowLeft, Recycle, User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";

interface RegistrationPageProps {
  onBackToLogin: () => void;
  onRegister: (userData: any) => void;
}

export function RegistrationPage({ onBackToLogin, onRegister }: RegistrationPageProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nama lengkap wajib diisi";
    }

    if (!formData.username.trim()) {
      newErrors.username = "Username wajib diisi";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username minimal 3 karakter";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email wajib diisi";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Format email tidak valid";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Nomor HP wajib diisi";
    } else if (!/^08\d{8,11}$/.test(formData.phone)) {
      newErrors.phone = "Format nomor HP tidak valid (contoh: 081234567890)";
    }

    if (!formData.password) {
      newErrors.password = "Password wajib diisi";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password minimal 6 karakter";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Konfirmasi password tidak sesuai";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      // Create user data for registration
      const userData = {
        id: `citizen_${Date.now()}`,
        name: formData.fullName,
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        points: 0,
        totalWaste: 0,
        location: "Belum diatur",
        registeredAt: new Date().toISOString()
      };
      
      onRegister(userData);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: "" }));
    }
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
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">
              Bergabung dengan
              <span className="block text-primary">Komunitas Peduli Lingkungan</span>
            </h1>
            <p className="text-lg text-muted-foreground">
              Daftarkan diri Anda sekarang dan mulai berkontribusi mengubah sampah plastik 
              menjadi energi bersih sambil mendapat reward yang menguntungkan.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <div className="flex items-center gap-3 mb-2">
                <User className="text-green-600" size={24} />
                <h3 className="font-semibold text-green-800">Keuntungan Member</h3>
              </div>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Poin 200 per kg plastik PET</li>
                <li>• Poin 180 per kg plastik HDPE</li>
                <li>• Tukar poin ke e-wallet gratis</li>
                <li>• Tracking kontribusi lingkungan</li>
              </ul>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-center gap-3 mb-2">
                <Recycle className="text-blue-600" size={24} />
                <h3 className="font-semibold text-blue-800">Akses Teknologi</h3>
              </div>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• AI scanner plastik otomatis</li>
                <li>• Prediksi hasil bahan bakar</li>
                <li>• Dashboard monitoring real-time</li>
                <li>• Histori transaksi lengkap</li>
              </ul>
            </div>
          </div>

          <div className="hidden lg:block">
            <ImageWithFallback
              src="https://images.unsplash.com/photo-1719399924262-ebb6f2a8de80?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZWN5Y2xpbmclMjB3YXN0ZSUyMG1hbmFnZW1lbnQlMjB0ZWNobm9sb2d5fGVufDF8fHx8MTc1NzU2ODUzMXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
              alt="TRASH TO TECH Registration"
              className="w-full h-48 object-cover rounded-xl"
            />
          </div>
        </div>

        {/* Right side - Registration Form */}
        <div className="w-full max-w-md mx-auto">
          <Card>
            <CardHeader className="text-center">
              <div className="flex items-center gap-2 mb-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={onBackToLogin}
                  className="mr-auto"
                >
                  <ArrowLeft size={16} className="mr-1" />
                  Kembali
                </Button>
              </div>
              <CardTitle>Daftar Akun Baru</CardTitle>
              <CardDescription>
                Isi data diri Anda untuk bergabung dengan TRASH TO TECH
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full Name */}
                <div className="space-y-2">
                  <Label htmlFor="fullName">Nama Lengkap *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="fullName"
                      type="text"
                      placeholder="Masukkan nama lengkap"
                      className="pl-10"
                      value={formData.fullName}
                      onChange={(e) => handleInputChange('fullName', e.target.value)}
                    />
                  </div>
                  {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
                </div>

                {/* Username */}
                <div className="space-y-2">
                  <Label htmlFor="username">Username *</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="username"
                      type="text"
                      placeholder="Pilih username unik"
                      className="pl-10"
                      value={formData.username}
                      onChange={(e) => handleInputChange('username', e.target.value)}
                    />
                  </div>
                  {errors.username && <p className="text-sm text-destructive">{errors.username}</p>}
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="nama@email.com"
                      className="pl-10"
                      value={formData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                    />
                  </div>
                  {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-2">
                  <Label htmlFor="phone">Nomor HP *</Label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="081234567890"
                      className="pl-10"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                  {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
                </div>

                {/* Password */}
                <div className="space-y-2">
                  <Label htmlFor="password">Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Minimal 6 karakter"
                      className="pl-10 pr-10"
                      value={formData.password}
                      onChange={(e) => handleInputChange('password', e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-8 w-8 p-0"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                  {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Konfirmasi Password *</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Ulangi password"
                      className="pl-10 pr-10"
                      value={formData.confirmPassword}
                      onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1 h-8 w-8 p-0"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </Button>
                  </div>
                  {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
                </div>

                <Button type="submit" className="w-full">
                  Daftar Sekarang
                </Button>

                <div className="text-center text-sm text-muted-foreground">
                  Dengan mendaftar, Anda menyetujui{" "}
                  <a href="#" className="text-primary hover:underline">
                    Syarat & Ketentuan
                  </a>{" "}
                  dan{" "}
                  <a href="#" className="text-primary hover:underline">
                    Kebijakan Privasi
                  </a>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}