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
  
  // Helper function to parse CSV line respecting quoted values
  const parseCSVLine = (line: string): string[] => {
    const result: string[] = [];
    let current = '';
    let inQuotes = false;
    
    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      
      if (char === '"') {
        inQuotes = !inQuotes;
      } else if (char === ',' && !inQuotes) {
        result.push(current.trim());
        current = '';
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  };
  
  return lines.slice(1).map(line => {
    const values = parseCSVLine(line);
    
    // Clean price value: remove $ and commas, then parse
    const priceStr = values[2] || '0';
    const cleanPrice = priceStr.replace(/[$,]/g, '');
    
    return {
      clients: values[0] || '',
      noHeadshots: parseInt(values[1]) || 0,
      price: parseFloat(cleanPrice) || 0,
      status: values[3] || '',
      email: values[4] || '',
    };
  }).filter(row => row.clients); // Filter out empty rows
};

export const useGoogleSheetData = () => {
  return useQuery({
    queryKey: ['googleSheetData'],
    queryFn: async () => {
      const response = await fetch('https://docs.google.com/spreadsheets/d/1Mj-hM6lvlqhnsWY5e-Ot29d7F3jAU4ks1yfh1-KxLqU/export?format=csv', {
        cache: 'no-store',
      });
      const csv = await response.text();
      return parseCSV(csv);
    },
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    staleTime: 0,
    gcTime: 0,
  });
};
