import { Card, CardContent } from "./ui/card";
import { LucideIcon } from "lucide-react";

interface SensorCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  status?: string;
  iconColor?: string;
}

export function SensorCard({ title, value, icon: Icon, status, iconColor = "text-blue-500" }: SensorCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-gray-500">{title}</p>
            <p className="text-3xl">{value}</p>
            {status && (
              <span className="inline-block px-2 py-1 text-xs bg-gray-100 rounded-md">
                {status}
              </span>
            )}
          </div>
          <div className={`p-3 rounded-full bg-opacity-10 ${iconColor}`}>
            <Icon className={`w-8 h-8 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
