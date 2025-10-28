import { LucideIcon } from "lucide-react";
import { ReactNode } from "react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  color?: "primary" | "secondary" | "accent" | "success";
  children?: ReactNode;
}

export const StatCard = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  trendUp,
  color = "primary",
  children 
}: StatCardProps) => {
  const colorClasses = {
    primary: "text-primary border-primary/30",
    secondary: "text-secondary border-secondary/30",
    accent: "text-accent border-accent/30",
    success: "text-success border-success/30",
  };

  return (
    <div className="glass-card p-6 hover:border-primary/40 transition-all duration-300 group hover:shadow-[0_0_30px_rgba(0,240,255,0.2)]">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground mb-1">{title}</p>
          <p className="text-3xl font-bold glow-text">{value}</p>
          {trend && (
            <p className={`text-sm mt-2 ${trendUp ? 'text-success' : 'text-secondary'}`}>
              {trend}
            </p>
          )}
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]} bg-current/10 group-hover:animate-glow`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
      {children}
    </div>
  );
};
