import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from "recharts";
import { 
  Thermometer,
  Gauge,
  Fuel,
  Zap,
  Activity,
  Settings,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  BarChart3,
  Clock,
  LogOut,
  User
} from "lucide-react";

interface OperatorDashboardProps {
  user: any;
  onLogout: () => void;
}

export function OperatorDashboard({ user, onLogout }: OperatorDashboardProps) {
  const [systemStatus, setSystemStatus] = useState({
    temperature: 650,
    pressure: 2.4,
    efficiency: 96.8,
    energyOutput: 1850,
    wasteInput: 45.2,
    isRunning: true
  });

  // Real-time data simulation
  useEffect(() => {
    const interval = setInterval(() => {
      if (systemStatus.isRunning) {
        setSystemStatus(prev => ({
          ...prev,
          temperature: prev.temperature + (Math.random() - 0.5) * 10,
          pressure: Math.max(0, prev.pressure + (Math.random() - 0.5) * 0.2),
          efficiency: Math.min(100, Math.max(80, prev.efficiency + (Math.random() - 0.5) * 2)),
          energyOutput: prev.energyOutput + Math.random() * 10
        }));
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [systemStatus.isRunning]);

  // Production data for charts
  const productionData = [
    { time: "06:00", solar: 12.5, gasoline: 8.3, biochar: 4.2 },
    { time: "08:00", solar: 15.8, gasoline: 10.2, biochar: 5.1 },
    { time: "10:00", solar: 18.2, gasoline: 11.8, biochar: 5.8 },
    { time: "12:00", solar: 22.1, gasoline: 14.5, biochar: 7.2 },
    { time: "14:00", solar: 19.5, gasoline: 12.9, biochar: 6.4 },
    { time: "16:00", solar: 16.3, gasoline: 10.7, biochar: 5.3 },
    { time: "18:00", solar: 13.7, gasoline: 9.1, biochar: 4.5 }
  ];

  const wasteTypeData = [
    { name: "Plastik PET", value: 45, amount: 156.8, color: "#8884d8" },
    { name: "Plastik HDPE", value: 55, amount: 189.2, color: "#82ca9d" }
  ];

  const efficiencyData = [
    { hour: "00", efficiency: 92, target: 95 },
    { hour: "04", efficiency: 89, target: 95 },
    { hour: "08", efficiency: 96, target: 95 },
    { hour: "12", efficiency: 98, target: 95 },
    { hour: "16", efficiency: 94, target: 95 },
    { hour: "20", efficiency: 91, target: 95 }
  ];

  const alerts = [
    { 
      type: "warning", 
      message: "Suhu reactor mendekati batas maksimal (680°C)", 
      time: "2 menit lalu",
      priority: "high"
    },
    { 
      type: "info", 
      message: "Batch processing #127 dimulai", 
      time: "15 menit lalu",
      priority: "medium"
    },
    { 
      type: "success", 
      message: "Target tingkat konversi harian tercapai (96.8%)", 
      time: "1 jam lalu",
      priority: "low"
    }
  ];

  // Today's waste deposits data
  const todayDeposits = [
    {
      id: "DEP001",
      userName: "Ahmad Rizki",
      time: "08:30",
      wasteType: "Plastik PET",
      weight: 3.2,
      points: 640,
      status: "Processed"
    },
    {
      id: "DEP002", 
      userName: "Sari Dewi",
      time: "09:15",
      wasteType: "Plastik HDPE",
      weight: 2.8,
      points: 504,
      status: "Processing"
    },
    {
      id: "DEP003",
      userName: "Budi Santoso", 
      time: "10:45",
      wasteType: "Plastik PET",
      weight: 4.1,
      points: 820,
      status: "Processed"
    },
    {
      id: "DEP004",
      userName: "Rina Wati",
      time: "11:20",
      wasteType: "Plastik HDPE", 
      weight: 1.9,
      points: 342,
      status: "Processing"
    },
    {
      id: "DEP005",
      userName: "Joko Widodo",
      time: "13:10",
      wasteType: "Plastik PET",
      weight: 5.5,
      points: 1100,
      status: "Processed"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center h-auto sm:h-16 py-4 sm:py-0 gap-4 sm:gap-0">
            <div>
              <h1 className="text-xl font-bold text-primary">TRASH TO TECH</h1>
              <p className="text-sm text-muted-foreground">Operator Monitoring Panel</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <Badge 
                variant={systemStatus.isRunning ? "default" : "secondary"}
                className="inline-flex items-center gap-1"
              >
                <Activity size={12} />
                {systemStatus.isRunning ? "ONLINE" : "OFFLINE"}
              </Badge>
              <div className="text-left sm:text-right">
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted-foreground">{user.facility}</p>
              </div>
              <Button variant="outline" onClick={onLogout} className="w-full sm:w-auto">
                <LogOut size={16} className="mr-2" />
                Keluar
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Real-time Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Suhu Reaktor</CardTitle>
              <Thermometer className="h-4 w-4 text-orange-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{Math.round(systemStatus.temperature)}°C</div>
              <Progress 
                value={Math.min((systemStatus.temperature / 900) * 100, 100)} 
                className="mt-2" 
              />
              <p className="text-xs text-muted-foreground mt-1">
                Target: 600-700°C
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tekanan Gas</CardTitle>
              <Gauge className="h-4 w-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStatus.pressure.toFixed(1)} bar</div>
              <Progress value={(systemStatus.pressure / 5) * 100} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                Normal: 2.0-3.0 bar
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tingkat Konversi</CardTitle>
              <TrendingUp className="h-4 w-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStatus.efficiency.toFixed(1)}%</div>
              <Progress value={systemStatus.efficiency} className="mt-2" />
              <p className="text-xs text-green-600 mt-1">
                +2.1% dari target
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Input Sampah</CardTitle>
              <BarChart3 className="h-4 w-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{systemStatus.wasteInput} kg</div>
              <Progress value={75} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-1">
                Kapasitas harian
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Production Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Produksi Bahan Bakar Real-time</CardTitle>
              <CardDescription>Output solar, bensin, dan biochar per jam</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={productionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="solar" stackId="1" stroke="#8884d8" fill="#8884d8" name="Solar (L)" />
                  <Area type="monotone" dataKey="gasoline" stackId="1" stroke="#82ca9d" fill="#82ca9d" name="Bensin (L)" />
                  <Area type="monotone" dataKey="biochar" stackId="1" stroke="#ffc658" fill="#ffc658" name="Biochar (kg)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Waste Composition */}
          <Card>
            <CardHeader>
              <CardTitle>Komposisi Plastik Hari Ini</CardTitle>
              <CardDescription>Total: {wasteTypeData.reduce((sum, item) => sum + item.amount, 0).toFixed(1)} kg</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={wasteTypeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="amount"
                  >
                    {wasteTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: any) => [`${value} kg`, 'Jumlah']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {wasteTypeData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">{item.amount} kg</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Today's Deposits and System Status */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Today's Deposits */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Laporan Penyetoran Hari Ini</CardTitle>
              <CardDescription>Daftar masyarakat yang menyetor sampah plastik hari ini</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="hidden sm:grid grid-cols-4 gap-4 text-sm font-medium text-muted-foreground border-b pb-2">
                  <span>Nama / Waktu</span>
                  <span>Jenis Plastik</span>
                  <span>Berat</span>
                  <span>Status</span>
                </div>
                
                <div className="max-h-80 overflow-y-auto space-y-3">
                  {todayDeposits.map((deposit) => (
                    <div key={deposit.id} className="sm:grid sm:grid-cols-4 gap-4 items-center py-3 border-b border-border/50">
                      {/* Mobile layout */}
                      <div className="flex flex-col sm:hidden space-y-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">{deposit.userName}</p>
                            <p className="text-xs text-muted-foreground">{deposit.time} WIB</p>
                          </div>
                          <Badge 
                            variant={deposit.status === 'Processed' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {deposit.status === 'Processed' ? 'Selesai' : 'Proses'}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <Badge variant="outline" className="text-xs">
                            {deposit.wasteType}
                          </Badge>
                          <div className="text-right">
                            <p className="font-medium">{deposit.weight} kg</p>
                            <p className="text-xs text-green-600">{deposit.points} poin</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Desktop layout */}
                      <div className="hidden sm:contents">
                        <div>
                          <p className="font-medium">{deposit.userName}</p>
                          <p className="text-xs text-muted-foreground">{deposit.time} WIB</p>
                        </div>
                        <div>
                          <Badge variant="outline" className="text-xs">
                            {deposit.wasteType}
                          </Badge>
                        </div>
                        <div>
                          <p className="font-medium">{deposit.weight} kg</p>
                          <p className="text-xs text-green-600">{deposit.points} poin</p>
                        </div>
                        <div>
                          <Badge 
                            variant={deposit.status === 'Processed' ? 'default' : 'secondary'}
                            className="text-xs"
                          >
                            {deposit.status === 'Processed' ? 'Selesai' : 'Proses'}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="pt-4 border-t bg-muted/50 rounded-lg p-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Penyetor</p>
                      <p className="font-bold text-lg">{todayDeposits.length}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Berat</p>
                      <p className="font-bold text-lg">{todayDeposits.reduce((sum, d) => sum + d.weight, 0).toFixed(1)} kg</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">Total Poin</p>
                      <p className="font-bold text-lg">{todayDeposits.reduce((sum, d) => sum + d.points, 0).toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Monitoring Status */}
          <Card>
            <CardHeader>
              <CardTitle>Status Monitoring</CardTitle>
              <CardDescription>Pemantauan suhu reaktor dan tekanan gas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Thermometer className="text-orange-600" size={16} />
                    <span className="font-medium text-orange-800">Sensor Suhu</span>
                  </div>
                  <p className="text-2xl font-bold text-orange-600">{Math.round(systemStatus.temperature)}°C</p>
                  <p className="text-xs text-orange-700">Range normal: 600-700°C</p>
                </div>

                <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Gauge className="text-blue-600" size={16} />
                    <span className="font-medium text-blue-800">Sensor Gas</span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600">{systemStatus.pressure.toFixed(1)} bar</p>
                  <p className="text-xs text-blue-700">Tekanan gas optimal</p>
                </div>
              </div>

              {alerts.slice(0, 2).map((alert, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  {alert.type === "warning" && (
                    <AlertTriangle className="text-yellow-500 mt-0.5 flex-shrink-0" size={16} />
                  )}
                  {alert.type === "info" && (
                    <Activity className="text-blue-500 mt-0.5 flex-shrink-0" size={16} />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
              
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="text-green-600" size={16} />
                  <span className="font-medium text-green-800">Sistem Normal</span>
                </div>
                <p className="text-sm text-green-700">
                  Sensor terhubung dan data real-time
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Efficiency Trend */}
        <div className="grid grid-cols-1 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Tren Tingkat Konversi vs Target</CardTitle>
              <CardDescription>Perbandingan tingkat konversi aktual dengan target (95%)</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <LineChart data={efficiencyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis domain={[80, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="efficiency" stroke="#8884d8" strokeWidth={2} name="Tingkat Konversi Aktual" />
                  <Line type="monotone" dataKey="target" stroke="#82ca9d" strokeDasharray="5 5" name="Target" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}