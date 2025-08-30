import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { Episode } from "@/types/episode";

type Props = {
  episode: Episode;
};

export function EpisodeCard({ episode }: Props) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{episode.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <p><strong>Air_Date:</strong> {episode.air_date}</p>
        <p><strong>Episode:</strong> {episode.episode}</p>
        <p className="text-xs text-gray-500">
          Created: {new Date(episode.created).toLocaleDateString()}
        </p>
      </CardContent>
    </Card>
  );
}