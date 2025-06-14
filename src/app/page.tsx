import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">
          Welcome to Health Agent
        </h1>
        <p className="text-muted-foreground">
          Your AI-powered health assistant
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Health Assessment</CardTitle>
            <CardDescription>
              Get a comprehensive health assessment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Start Assessment</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Medical History</CardTitle>
            <CardDescription>
              View and manage your medical history
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline">View History</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Health Goals</CardTitle>
            <CardDescription>
              Track your health and wellness goals
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline">Set Goals</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
