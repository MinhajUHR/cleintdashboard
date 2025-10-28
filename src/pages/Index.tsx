import { useGoogleSheetData } from "@/hooks/useGoogleSheetData";
import { StatCard } from "@/components/StatCard";
import { ChartCard } from "@/components/ChartCard";
import { StatusChart } from "@/components/StatusChart";
import { RevenueChart } from "@/components/RevenueChart";
import { ClientsTable } from "@/components/ClientsTable";
import { DollarSign, Users, Camera, TrendingUp, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

const Index = () => {
  const { data, isLoading, isError, refetch } = useGoogleSheetData();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center cyber-grid">
        <div className="text-center">
          <RefreshCw className="w-16 h-16 animate-spin text-primary mx-auto mb-4" />
          <p className="text-xl glow-text text-primary">Loading Dashboard Data...</p>
        </div>
      </div>
    );
  }

  if (isError || !data) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center glass-card p-8">
          <p className="text-xl text-destructive mb-4">Error loading data</p>
          <Button onClick={() => refetch()} variant="outline" className="border-primary text-primary">
            Retry
          </Button>
        </div>
      </div>
    );
  }

  const totalRevenue = data.reduce((sum, item) => sum + item.price, 0);
  const totalClients = data.length;
  const totalHeadshots = data.reduce((sum, item) => sum + item.noHeadshots, 0);
  const avgRevenue = totalRevenue / totalClients;

  return (
    <div className="min-h-screen cyber-grid p-4 md:p-8">
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-2">
          <div>
            <h1 className="text-4xl md:text-5xl font-bold glow-text text-primary mb-2 animate-float">
              Client Analytics Dashboard
            </h1>
            <p className="text-muted-foreground">Real-time analysis and Client management</p>
          </div>
          <Button 
            onClick={() => refetch()} 
            variant="outline"
            className="border-primary/30 hover:border-primary text-primary hover:bg-primary/10 transition-all"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh Data
          </Button>
        </div>
        <div className="h-1 w-full bg-gradient-to-r from-primary via-secondary to-accent rounded-full animate-glow" />
      </div>

      <div className="max-w-7xl mx-auto space-y-6">
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard
            title="Total Revenue"
            value={`$${totalRevenue.toLocaleString()}`}
            icon={DollarSign}
            color="success"
            trend="+12% from last month"
            trendUp
          />
          <StatCard
            title="Total Clients"
            value={totalClients}
            icon={Users}
            color="primary"
            trend="+8 new clients"
            trendUp
          />
          <StatCard
            title="Total Headshots"
            value={totalHeadshots}
            icon={Camera}
            color="accent"
            trend={`${(totalHeadshots / totalClients).toFixed(1)} avg per client`}
          />
          <StatCard
            title="Avg Revenue"
            value={`$${avgRevenue.toFixed(0)}`}
            icon={TrendingUp}
            color="secondary"
            trend="Per client"
          />
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartCard 
            title="Top Clients by Revenue" 
            subtitle="Top 10 highest paying clients"
          >
            <RevenueChart data={data} />
          </ChartCard>
          
          <ChartCard 
            title="Project Status Distribution" 
            subtitle="Current status of all projects"
          >
            <StatusChart data={data} />
          </ChartCard>
        </div>

        {/* Recent Clients Table */}
        <ChartCard 
          title="Recent Clients" 
          subtitle="Latest client projects and details"
        >
          <ClientsTable data={data} limit={10} />
        </ChartCard>
      </div>

      {/* Background accent elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[100px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/3 w-96 h-96 bg-accent/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: '2s' }} />
      </div>
    </div>
  );
};

export default Index;
