import React, { createContext, useContext, useState } from 'react';
import type { Company, Branch } from '../types';

// Mock Data
export const MOCK_COMPANIES: Company[] = [
    {
        id: 'c1',
        name: 'Aman Transport',
        segments: ['TRANSPORT', 'FLEET_MAINTENANCE'],
        branches: [
            { id: 'b1', name: 'Dubai HQ', location: 'Dubai', country: 'UAE' },
            { id: 'b2', name: 'Abu Dhabi Branch', location: 'Abu Dhabi', country: 'UAE' },
        ],
    },
    {
        id: 'c2',
        name: 'Aman Trading (Import/Export)',
        segments: ['IMPORT', 'EXPORT'],
        branches: [
            { id: 'b3', name: 'Jebel Ali Office', location: 'Dubai', country: 'UAE' },
        ],
    },
    {
        id: 'c3',
        name: 'Aman Food Stuff',
        segments: ['FOOD_PRODUCTION'],
        branches: [
            { id: 'b4', name: 'Ajman Factory', location: 'Ajman', country: 'UAE' },
        ],
    },
];

interface CompanyContextType {
    currentCompany: Company;
    currentBranch: Branch;
    setCompany: (companyId: string) => void;
    setBranch: (branchId: string) => void;
    availableCompanies: Company[];
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export const CompanyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [currentCompany, setCurrentCompany] = useState<Company>(MOCK_COMPANIES[0]);
    const [currentBranch, setCurrentBranch] = useState<Branch>(MOCK_COMPANIES[0].branches[0]);

    const setCompany = (companyId: string) => {
        const company = MOCK_COMPANIES.find((c) => c.id === companyId);
        if (company) {
            setCurrentCompany(company);
            // Default to first branch when switching company
            if (company.branches.length > 0) {
                setCurrentBranch(company.branches[0]);
            }
        }
    };

    const setBranch = (branchId: string) => {
        const branch = currentCompany.branches.find((b) => b.id === branchId);
        if (branch) {
            setCurrentBranch(branch);
        }
    };

    return (
        <CompanyContext.Provider value={{
            currentCompany,
            currentBranch,
            setCompany,
            setBranch,
            availableCompanies: MOCK_COMPANIES
        }}>
            {children}
        </CompanyContext.Provider>
    );
};

export const useCompany = () => {
    const context = useContext(CompanyContext);
    if (context === undefined) {
        throw new Error('useCompany must be used within a CompanyProvider');
    }
    return context;
};
