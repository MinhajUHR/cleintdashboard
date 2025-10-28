import { useQuery } from "@tanstack/react-query";

export interface ClientData {
  clients: string;
  noHeadshots: number;
  price: number;
  status: string;
  email: string;
}

const parseCSV = (csv: string): ClientData[] => {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(',').map(h => h.trim());
  
  return lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    return {
      clients: values[0] || '',
      noHeadshots: parseInt(values[1]) || 0,
      price: parseFloat(values[2]) || 0,
      status: values[3] || '',
      email: values[4] || '',
    };
  }).filter(row => row.clients); // Filter out empty rows
};

export const useGoogleSheetData = () => {
  return useQuery({
    queryKey: ['googleSheetData'],
    queryFn: async () => {
      const response = await fetch('https://docs.google.com/spreadsheets/d/1Mj-hM6lvlqhnsWY5e-Ot29d7F3jAU4ks1yfh1-KxLqU/export?format=csv');
      const csv = await response.text();
      return parseCSV(csv);
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0, // Always fetch fresh data
  });
};
