import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Location } from "@/types/location";

type Props = {
  location: Location;
};

export function LocationCard({ location }: Props) {
  return (
    <Card className="w-full">
      <CardHeader> 
        <CardTitle className="mt-2">{location.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>Type: {location.type}</p>
        <p>Dimension: {location.dimension}</p>
        <p>Residents: {location.residents.length}</p>
        <p className="text-xs text-gray-500">
          Created: {new Date(location.created).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}
