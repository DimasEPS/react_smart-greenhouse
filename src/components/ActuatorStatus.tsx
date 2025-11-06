import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { DoorOpen, Droplets } from "lucide-react";

interface ActuatorStatusProps {
  roofStatus: "OPEN" | "CLOSED";
  pumpStatus: "ON" | "OFF";
}

export function ActuatorStatus({ roofStatus, pumpStatus }: ActuatorStatusProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Status Aktuator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <DoorOpen className="w-5 h-5 text-blue-600" />
            <span>Status Kaca/Atap</span>
          </div>
          <Badge variant={roofStatus === "OPEN" ? "default" : "secondary"}>
            {roofStatus} {roofStatus === "OPEN" ? "✅" : "🔒"}
          </Badge>
        </div>
        
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <Droplets className="w-5 h-5 text-blue-600" />
            <span>Status Pompa Air</span>
          </div>
          <Badge variant={pumpStatus === "ON" ? "default" : "secondary"}>
            {pumpStatus} {pumpStatus === "ON" ? "🔛" : "📴"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
