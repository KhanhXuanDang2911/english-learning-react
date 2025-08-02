import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Users,
  GraduationCap,
  FileText,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Activity,
} from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "$45,231.89",
    change: "+20.1% from last month",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Active Users",
    value: "+2350",
    change: "+180.1% from last month",
    trend: "up",
    icon: Users,
  },
  {
    title: "Course Sales",
    value: "+12,234",
    change: "+19% from last month",
    trend: "up",
    icon: GraduationCap,
  },
  {
    title: "Active Now",
    value: "+573",
    change: "+201 since last hour",
    trend: "up",
    icon: Activity,
  },
];

const recentSales = [
  {
    name: "Olivia Martin",
    email: "olivia.martin@email.com",
    amount: "+$1,999.00",
    avatar: "OM",
  },
  {
    name: "Jackson Lee",
    email: "jackson.lee@email.com",
    amount: "+$39.00",
    avatar: "JL",
  },
  {
    name: "Isabella Nguyen",
    email: "isabella.nguyen@email.com",
    amount: "+$299.00",
    avatar: "IN",
  },
  {
    name: "William Kim",
    email: "will@email.com",
    amount: "+$99.00",
    avatar: "WK",
  },
  {
    name: "Sofia Davis",
    email: "sofia.davis@email.com",
    amount: "+$39.00",
    avatar: "SD",
  },
];

export default function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Here's what's happening with your platform today.
          </p>
        </div>
        <Button className="bg-[#155e94] hover:bg-[#0b4674]">
          Download Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground flex items-center">
                {stat.trend === "up" ? (
                  <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                ) : (
                  <TrendingDown className="h-3 w-3 mr-1 text-red-500" />
                )}
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[200px] flex items-center justify-center text-muted-foreground">
              Chart placeholder - Revenue over time
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentSales.map((sale) => (
                <div key={sale.email} className="flex items-center">
                  <Avatar className="h-9 w-9">
                    <AvatarImage
                      src={`/placeholder.svg?height=36&width=36`}
                      alt="Avatar"
                    />
                    <AvatarFallback>{sale.avatar}</AvatarFallback>
                  </Avatar>
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {sale.name}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {sale.email}
                    </p>
                  </div>
                  <div className="ml-auto font-medium">{sale.amount}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              User Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">New registrations</span>
                <Badge className="bg-green-100 text-green-800">+12%</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Active sessions</span>
                <Badge className="bg-blue-100 text-blue-800">1,234</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Course completions</span>
                <Badge className="bg-purple-100 text-purple-800">89</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Course Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Total courses</span>
                <Badge variant="outline">156</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Published</span>
                <Badge className="bg-green-100 text-green-800">142</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">In review</span>
                <Badge className="bg-yellow-100 text-yellow-800">14</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Content Stats
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Blog posts</span>
                <Badge variant="outline">89</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Flashcard sets</span>
                <Badge variant="outline">234</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Dictation lessons</span>
                <Badge variant="outline">67</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
