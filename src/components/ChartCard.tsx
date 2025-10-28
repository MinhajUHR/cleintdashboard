import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  children: ReactNode;
}

export const ChartCard = ({ title, subtitle, children }: ChartCardProps) => {
  return (
    <div className="glass-card p-6 hover:border-primary/40 transition-all duration-300 hover:shadow-[0_0_30px_rgba(0,240,255,0.2)]">
      <div className="mb-6">
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        {subtitle && <p className="text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
};
