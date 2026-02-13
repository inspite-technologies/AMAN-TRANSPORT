export interface Transaction {
    id: string;
    ref: string;
    type: string;
    subtitle: string;
    revenue: number;
    cost: number;
    profit: number;
    efficiency: number;
    icon: string;
    period: string;
}

// Mock Data
const MOCK_TRANSACTIONS = [
    { id: 'TX1', ref: 'V-4492 (Long Haul)', type: 'Vehicle', subtitle: 'Vehicle Profitability', revenue: 4200, cost: 2100, profit: 2100, efficiency: 50.0, icon: 'Truck', period: 'Real-Time: Today' },
    { id: 'TX2', ref: 'SHP-99201-EX', type: 'Shipment', subtitle: 'Shipment Profitability', revenue: 12850, cost: 8400, profit: 4450, efficiency: 34.6, icon: 'Package', period: 'Real-Time: Today' },
    { id: 'TX3', ref: 'BATCH-F012', type: 'Production', subtitle: 'Production Lot Profit', revenue: 8200, cost: 6100, profit: 2100, efficiency: 25.6, icon: 'Factory', period: 'MTD: July 2023' },
    { id: 'TX4', ref: 'V-5501 (Local)', type: 'Vehicle', subtitle: 'Vehicle Profitability', revenue: 1850, cost: 1600, profit: 250, efficiency: 13.5, icon: 'Truck', period: 'Real-Time: Today' },
    { id: 'TX5', ref: 'SHP-99205-IM', type: 'Shipment', subtitle: 'Import Ops', revenue: 15400, cost: 11200, profit: 4200, efficiency: 27.2, icon: 'Package', period: 'Q3 Fiscal View' }
];

export const financeService = {
    getTransactions: async (): Promise<any[]> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(MOCK_TRANSACTIONS);
            }, 800); // Simulate network delay
        });
    },

    getKPIs: async () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    revenue: 4821450.00,
                    revenueGrowth: 14.2,
                    expenses: 3124610.00,
                    expensesGrowth: 3.1,
                    profit: 1696840.00,
                    profitGrowth: 22.4,
                    outstanding: 892100.00,
                    dso: 28
                });
            }, 600);
        });
    },

    exportReport: async (format: string, period: string): Promise<string> => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(`Export successful: Finance_Report_${period.replace(/\s/g, '_')}.${format.toLowerCase()}`);
            }, 1500);
        });
    }
};
