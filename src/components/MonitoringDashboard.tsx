import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
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
  Cell
} from "recharts";
import { 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  CheckCircle, 
  Thermometer,
  Zap,
  Droplets,
  Wind
} from "lucide-react";

export function MonitoringDashboard() {
  // Mock data for charts
  const dailyProcessing = [
    { day: "Sen", amount: 1200, efficiency: 94 },
    { day: "Sel", amount: 1400, efficiency: 96 },
    { day: "Rab", amount: 1100, efficiency: 92 },
    { day: "Kam", amount: 1600, efficiency: 98 },
    { day: "Jum", amount: 1300, efficiency: 95 },
    { day: "Sab", amount: 900, efficiency: 91 },
    { day: "Min", amount: 800, efficiency: 89 }
  ];

  const energyData = [
    { time: "00:00", input: 400, output: 380 },
    { time: "04:00", input: 300, output: 285 },
    { time: "08:00", input: 600, output: 570 },
    { time: "12:00", input: 800, output: 760 },
    { time: "16:00", input: 700, output: 665 },
    { time: "20:00", input: 500, output: 475 }
  ];

  const wasteComposition = [
    { name: "Plastik", value: 35, color: "#8884d8" },
    { name: "Biomassa", value: 30, color: "#82ca9d" },
    { name: "Kertas", value: 20, color: "#ffc658" },
    { name: "Organik", value: 15, color: "#ff7300" }
  ];

  const currentStatus = {
    temperature: 650,
    pressure: 2.4,
    efficiency: 96.8,
    energyOutput: 1850
  };

  const alerts = [
    { type: "warning", message: "Suhu reactor mendekati batas maksimal", time: "2 menit lalu" },
    { type: "info", message: "Proses pirolisis batch #124 selesai", time: "15 menit lalu" },
    { type: "success", message: "Efisiensi energi mencapai target harian", time: "1 jam lalu" }
  ];

  return (
    <section id="monitoring" className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 inline-flex items-center gap-2">
            <Activity size={16} />
            Real-time Monitoring
          </Badge>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Dashboard Monitoring Pirolisis
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Pantau proses pirolisis secara real-time dengan dashboard yang komprehensif 
            dan sistem alert otomatis untuk memastikan operasi yang optimal.
          </p>
        </div>

        {/* Real-time Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Suhu Reactor</CardTitle>
              <Thermometer className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentStatus.temperature}°C</div>
              <p className="text-xs text-muted-foreground">
                Optimal range: 600-700°C
              </p>
              <Progress value={Math.min((currentStatus.temperature / 900) * 100, 100)} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Tekanan</CardTitle>
              <Droplets className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentStatus.pressure} bar</div>
              <p className="text-xs text-muted-foreground">
                Target: 2.0-3.0 bar
              </p>
              <Progress value={(currentStatus.pressure / 5) * 100} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Efisiensi</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentStatus.efficiency}%</div>
              <p className="text-xs text-green-600">
                +2.1% dari kemarin
              </p>
              <Progress value={currentStatus.efficiency} className="mt-2" />
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Output Energi</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{currentStatus.energyOutput}</div>
              <p className="text-xs text-muted-foreground">
                kWh hari ini
              </p>
              <Progress value={75} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Daily Processing Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Pengolahan Sampah Harian</CardTitle>
              <CardDescription>Volume dan efisiensi 7 hari terakhir</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyProcessing}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="amount" fill="#8884d8" name="Jumlah (kg)" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Energy Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Konsumsi vs Output Energi</CardTitle>
              <CardDescription>Perbandingan energi dalam 24 jam</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="time" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="input" stroke="#8884d8" name="Input (kWh)" />
                  <Line type="monotone" dataKey="output" stroke="#82ca9d" name="Output (kWh)" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Waste Composition */}
          <Card>
            <CardHeader>
              <CardTitle>Komposisi Sampah</CardTitle>
              <CardDescription>Distribusi jenis sampah hari ini</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={wasteComposition}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {wasteComposition.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 space-y-2">
                {wasteComposition.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span>{item.name}</span>
                    </div>
                    <span className="font-medium">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <AlertTriangle size={20} />
                Alert & Notifikasi
              </CardTitle>
              <CardDescription>Pemantauan sistem dan notifikasi real-time</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {alerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border rounded-lg">
                  {alert.type === "warning" && (
                    <AlertTriangle className="text-yellow-500 mt-0.5 flex-shrink-0" size={16} />
                  )}
                  {alert.type === "success" && (
                    <CheckCircle className="text-green-500 mt-0.5 flex-shrink-0" size={16} />
                  )}
                  {alert.type === "info" && (
                    <Activity className="text-blue-500 mt-0.5 flex-shrink-0" size={16} />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">{alert.time}</p>
                  </div>
                </div>
              ))}
              
              <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="text-green-600" size={16} />
                  <span className="font-medium text-green-800">Status Sistem: Normal</span>
                </div>
                <p className="text-sm text-green-700">
                  Semua parameter dalam batas normal. Proses pirolisis berjalan optimal.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}