
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, BarChart, ShieldAlert } from "lucide-react";

export default function AdminDashboard() {
    return (
        <Card className="bg-card/50 border-destructive/50">
            <CardHeader>
                 <div className="flex justify-between items-start">
                    <div>
                        <CardTitle className="text-2xl text-destructive flex items-center gap-2"><ShieldAlert />Admin Zone</CardTitle>
                        <CardDescription>Manage hackathon participants, projects, and settings.</CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                             <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                             <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">1,234</div>
                            <p className="text-xs text-muted-foreground">+50 since last week</p>
                        </CardContent>
                    </Card>
                     <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                             <CardTitle className="text-sm font-medium">Submissions</CardTitle>
                             <BarChart className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">152</div>
                            <p className="text-xs text-muted-foreground">23 challenges completed</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                             <CardTitle className="text-sm font-medium">Pending Approvals</CardTitle>
                             <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">5</div>
                            <p className="text-xs text-muted-foreground">mentor applications</p>
                        </CardContent>
                    </Card>
                </div>
                 <div className="flex gap-4">
                     <Button variant="destructive">Manage Users</Button>
                     <Button variant="destructive" disabled>Export Data</Button>
                 </div>
            </CardContent>
        </Card>
    );
}
