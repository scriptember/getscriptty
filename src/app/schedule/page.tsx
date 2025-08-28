
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Mic } from "lucide-react";
import { getSchedule } from "@/services/data-service";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default async function SchedulePage() {
  const schedule = await getSchedule();

  return (
    <div className="container mx-auto px-4 py-12 md:px-6">
      <div className="text-center mb-12">
        <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl text-primary">
          Event Schedule
        </h1>
        <p className="mt-4 text-lg text-muted-foreground md:text-xl">
          Plan your hackathon week. All times are in Africa/Lagos (UTC+1).
        </p>
      </div>

       {schedule.length === 0 ? (
        <Alert className="max-w-xl mx-auto">
            <Calendar className="h-4 w-4" />
            <AlertTitle>Schedule is Empty</AlertTitle>
            <AlertDescription>
                This page is ready. Events will appear here once they are added to the mock data store.
            </AlertDescription>
        </Alert>
      ) : (
        <div className="space-y-8">
            {schedule.map((item) => (
            <Card key={item.id} className="bg-card/50 border-border/50 transition-all hover:shadow-lg hover:border-primary/50">
                <CardHeader>
                <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                    <CardTitle className="text-xl text-foreground">{item.title}</CardTitle>
                    {item.track && <Badge variant="secondary">{item.track}</Badge>}
                </div>
                </CardHeader>
                <CardContent>
                <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 text-muted-foreground">
                    <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    <span>{item.date}</span>
                    </div>
                    <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{item.time}</span>
                    </div>
                    <div className="flex items-center gap-2">
                    <Mic className="h-4 w-4" />
                    <span>{item.speaker}</span>
                    </div>
                </div>
                </CardContent>
            </Card>
            ))}
        </div>
      )}
    </div>
  );
}
