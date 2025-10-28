import { ClientData } from "@/hooks/useGoogleSheetData";
import { Badge } from "@/components/ui/badge";

interface ClientsTableProps {
  data: ClientData[];
  limit?: number;
}

export const ClientsTable = ({ data, limit = 5 }: ClientsTableProps) => {
  const displayData = limit ? data.slice(0, limit) : data;

  const getStatusColor = (status: string) => {
    const statusLower = status.toLowerCase();
    if (statusLower.includes('complete')) return 'bg-success/20 text-success border-success/30';
    if (statusLower.includes('pending')) return 'bg-accent/20 text-accent border-accent/30';
    if (statusLower.includes('progress')) return 'bg-primary/20 text-primary border-primary/30';
    return 'bg-destructive/20 text-destructive border-destructive/30';
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-primary/20">
            <th className="text-left py-3 px-4 text-sm font-semibold text-primary">Client</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-primary">Headshots</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-primary">Revenue</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-primary">Status</th>
            <th className="text-left py-3 px-4 text-sm font-semibold text-primary">Email</th>
          </tr>
        </thead>
        <tbody>
          {displayData.map((client, index) => (
            <tr 
              key={index} 
              className="border-b border-primary/10 hover:bg-primary/5 transition-colors"
            >
              <td className="py-3 px-4 font-medium">{client.clients}</td>
              <td className="py-3 px-4 text-muted-foreground">{client.noHeadshots}</td>
              <td className="py-3 px-4 font-semibold text-success">${client.price.toLocaleString()}</td>
              <td className="py-3 px-4">
                <Badge variant="outline" className={getStatusColor(client.status)}>
                  {client.status}
                </Badge>
              </td>
              <td className="py-3 px-4 text-muted-foreground text-sm">{client.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
