import { useState, useEffect } from "react";
import { Thermometer, Droplet, Sprout, Sun, CloudRain } from "lucide-react";
import { SensorCard } from "./components/SensorCard";
import { ActuatorStatus } from "./components/ActuatorStatus";
import { ControlPanel } from "./components/ControlPanel";
import { HistoricalChart } from "./components/HistoricalChart";
import { Toaster } from "./components/ui/sonner";
import { toast } from "sonner";

// Mock data untuk simulasi data sensor real-time
function generateMockSensorData() {
  return {
    temperature: +(28 + Math.random() * 6).toFixed(1),
    humidity: +(65 + Math.random() * 20).toFixed(0),
    soilMoisture: +(30 + Math.random() * 40).toFixed(0),
    lightIntensity: +(600 + Math.random() * 300).toFixed(0),
    isRaining: Math.random() > 0.7,
  };
}

// Generate mock historical data
function generateHistoricalData() {
  const data = [];
  const now = new Date();

  for (let i = 23; i >= 0; i--) {
    const time = new Date(now.getTime() - i * 60 * 60 * 1000);
    data.push({
      time: `${time.getHours().toString().padStart(2, "0")}:00`,
      suhu: +(28 + Math.random() * 6).toFixed(1),
      kelembabanUdara: +(65 + Math.random() * 20).toFixed(0),
      kelembabanTanah: +(30 + Math.random() * 40).toFixed(0),
    });
  }

  return data;
}

export default function App() {
  const [sensorData, setSensorData] = useState(generateMockSensorData());
  const [roofStatus, setRoofStatus] = useState<"OPEN" | "CLOSED">("OPEN");
  const [pumpStatus, setPumpStatus] = useState<"ON" | "OFF">("OFF");
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [historicalData] = useState(generateHistoricalData());
  const [isOnline] = useState(true);

  // Simulasi update data sensor setiap 5 detik
  useEffect(() => {
    const interval = setInterval(() => {
      setSensorData(generateMockSensorData());
      setLastUpdate(new Date());
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getSoilMoistureStatus = (value: number) => {
    if (value < 40) return "Kering";
    if (value < 70) return "Sedang";
    return "Basah";
  };

  const getLightStatus = (value: number) => {
    if (value < 500) return "Redup";
    if (value < 800) return "Sedang";
    return "Terang";
  };

  const handleOpenRoof = () => {
    setRoofStatus("OPEN");
    toast.success("Kaca greenhouse dibuka");
  };

  const handleCloseRoof = () => {
    setRoofStatus("CLOSED");
    toast.success("Kaca greenhouse ditutup");
  };

  const handlePumpOn = () => {
    setPumpStatus("ON");
    toast.success("Pompa air dihidupkan");
  };

  const handlePumpOff = () => {
    setPumpStatus("OFF");
    toast.success("Pompa air dimatikan");
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      timeZone: "Asia/Jakarta",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h1 className="text-3xl mb-2">Greenhouse Monitoring Dashboard</h1>
          <div className="flex flex-wrap gap-4 items-center text-sm">
            <div className="flex items-center gap-2">
              <span>Status:</span>
              <span className={isOnline ? "text-green-600" : "text-red-600"}>
                {isOnline ? "Online ✅" : "Offline ❌"}
              </span>
            </div>
            <div className="text-gray-500">|</div>
            <div className="text-gray-600">
              Last Update: {formatTime(lastUpdate)} WIB
            </div>
          </div>
        </div>

        {/* Sensor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          <SensorCard
            title="Suhu"
            value={`${sensorData.temperature}°C`}
            icon={Thermometer}
            iconColor="text-red-500"
          />
          <SensorCard
            title="Kelembaban Udara"
            value={`${sensorData.humidity}%`}
            icon={Droplet}
            iconColor="text-blue-500"
          />
          <SensorCard
            title="Kelembaban Tanah"
            value={`${sensorData.soilMoisture}%`}
            icon={Sprout}
            status={getSoilMoistureStatus(sensorData.soilMoisture)}
            iconColor="text-green-600"
          />
          <SensorCard
            title="Intensitas Cahaya"
            value={sensorData.lightIntensity}
            icon={Sun}
            status={getLightStatus(sensorData.lightIntensity)}
            iconColor="text-yellow-500"
          />
          <SensorCard
            title="Status Hujan"
            value={sensorData.isRaining ? "Hujan" : "Tidak Hujan"}
            icon={CloudRain}
            iconColor={sensorData.isRaining ? "text-blue-600" : "text-gray-400"}
          />
        </div>

        {/* Status & Control Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActuatorStatus roofStatus={roofStatus} pumpStatus={pumpStatus} />
          <ControlPanel
            onOpenRoof={handleOpenRoof}
            onCloseRoof={handleCloseRoof}
            onPumpOn={handlePumpOn}
            onPumpOff={handlePumpOff}
          />
        </div>

        {/* Historical Chart */}
        <HistoricalChart data={historicalData} />
      </div>

      <Toaster />
    </div>
  );
}
