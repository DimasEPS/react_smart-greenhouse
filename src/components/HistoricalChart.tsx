import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

interface ChartDataPoint {
  time: string;
  suhu: number;
  kelembabanUdara: number;
  kelembabanTanah: number;
}

interface HistoricalChartProps {
  data: ChartDataPoint[];
}

export function HistoricalChart({ data }: HistoricalChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Grafik Historis (24 Jam Terakhir)</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="suhu" 
              stroke="#ef4444" 
              name="Suhu (°C)"
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="kelembabanUdara" 
              stroke="#3b82f6" 
              name="Kelembaban Udara (%)"
              strokeWidth={2}
            />
            <Line 
              type="monotone" 
              dataKey="kelembabanTanah" 
              stroke="#22c55e" 
              name="Kelembaban Tanah (%)"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
