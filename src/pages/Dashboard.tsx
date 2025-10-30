import { useTranslation } from "react-i18next";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { stats, recentCustomers } from "@/mock/stats";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const revenueData = [
  { month: "Jan", revenue: 4000, customers: 24 },
  { month: "Feb", revenue: 3000, customers: 18 },
  { month: "Mar", revenue: 5000, customers: 29 },
  { month: "Apr", revenue: 4500, customers: 25 },
  { month: "May", revenue: 6000, customers: 32 },
  { month: "Jun", revenue: 5500, customers: 30 },
];

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <div className="p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* İstatistik Kartları */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const titleKeys = [
            "dashboard.totalCustomers",
            "dashboard.totalRevenue",
            "dashboard.activeProjects",
            "dashboard.growthRate"
          ];
          return (
            <Card key={index} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {t(titleKeys[index])}
                </CardTitle>
                <div className={`p-3 rounded-xl ${stat.bgColor} transition-transform hover:scale-110`}>
                  <Icon className={`h-5 w-5 ${stat.color}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                  <span className="text-green-500 font-semibold">{stat.change}</span> 
                  {t("dashboard.comparedToLastMonth")}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Revenue Overview</CardTitle>
            <CardDescription>Monthly revenue for the last 6 months</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Area 
                  type="monotone" 
                  dataKey="revenue" 
                  stroke="hsl(var(--primary))" 
                  fillOpacity={1} 
                  fill="url(#colorRevenue)" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <CardTitle>Customer Growth</CardTitle>
            <CardDescription>New customers per month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis dataKey="month" className="text-xs" />
                <YAxis className="text-xs" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'hsl(var(--card))', 
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="customers" 
                  fill="hsl(var(--primary))" 
                  radius={[8, 8, 0, 0]}
                  className="hover:opacity-80"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Son Eklenen Müşteriler */}
      <Card className="hover:shadow-lg transition-shadow">
        <CardHeader>
          <CardTitle>{t("dashboard.recentCustomers")}</CardTitle>
          <CardDescription>
            {t("dashboard.recentCustomersDescription")}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentCustomers.map((customer, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-xl border border-border hover:bg-accent/50 hover:shadow-md transition-all duration-200 hover:scale-[1.02]"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-purple-600 flex items-center justify-center shadow-md">
                    <span className="text-sm font-bold text-white">
                      {customer.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold">{customer.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {customer.email}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <span
                    className={`inline-block px-3 py-1 text-xs font-medium rounded-full ${
                      customer.status === "Aktif" || customer.status === "Active"
                        ? "bg-green-500/20 text-green-600 dark:text-green-400"
                        : "bg-yellow-500/20 text-yellow-600 dark:text-yellow-400"
                    }`}
                  >
                    {customer.status === "Aktif" ? t("common.active") : 
                     customer.status === "Active" ? t("common.active") : 
                     t("dashboard.pending")}
                  </span>
                  <p className="text-xs text-muted-foreground mt-2">
                    {customer.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

