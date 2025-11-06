import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { DoorOpen, DoorClosed, Power, PowerOff } from "lucide-react";
import { Alert, AlertDescription } from "./ui/alert";
import { Info } from "lucide-react";

interface ControlPanelProps {
  onOpenRoof: () => void;
  onCloseRoof: () => void;
  onPumpOn: () => void;
  onPumpOff: () => void;
}

export function ControlPanel({ onOpenRoof, onCloseRoof, onPumpOn, onPumpOff }: ControlPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Kontrol Manual</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <p className="text-sm">Kontrol Kaca/Atap</p>
          <div className="grid grid-cols-2 gap-3">
            <Button onClick={onOpenRoof} className="w-full">
              <DoorOpen className="w-4 h-4 mr-2" />
              Buka Kaca
            </Button>
            <Button onClick={onCloseRoof} variant="outline" className="w-full">
              <DoorClosed className="w-4 h-4 mr-2" />
              Tutup Kaca
            </Button>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm">Kontrol Pompa Air</p>
          <div className="grid grid-cols-2 gap-3">
            <Button onClick={onPumpOn} className="w-full bg-green-600 hover:bg-green-700">
              <Power className="w-4 h-4 mr-2" />
              Hidupkan Pompa
            </Button>
            <Button onClick={onPumpOff} variant="outline" className="w-full">
              <PowerOff className="w-4 h-4 mr-2" />
              Matikan Pompa
            </Button>
          </div>
        </div>

        <Alert>
          <Info className="h-4 w-4" />
          <AlertDescription>
            Catatan: Kontrol manual akan meng-override sistem otomatis untuk sementara.
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
