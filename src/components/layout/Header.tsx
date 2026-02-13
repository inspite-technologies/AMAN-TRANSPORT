import React from 'react';
// import { useAuth } from '../../context/AuthContext';
import { useCompany } from '../../context/CompanyContext';
import { Bell, Search, Menu, Building2, ChevronDown } from 'lucide-react';
// import { cn } from '../../lib/utils';

interface HeaderProps {
    toggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ toggleSidebar }) => {
    const { availableCompanies, currentCompany, setCompany } = useCompany();

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 md:px-8 z-10 sticky top-0">
            <div className="flex items-center md:space-x-6 gap-2">
                {/* Mobile Menu Trigger */}
                <button onClick={toggleSidebar} className="md:hidden p-2 rounded-md hover:bg-slate-100">
                    <Menu className="w-5 h-5 text-slate-600" />
                </button>

                {/* Company Switcher */}
                <div className="relative min-w-[200px] hidden md:block group">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <Building2 className="w-5 h-5" />
                    </div>
                    <select
                        className="block w-full pl-10 pr-10 py-2 text-sm font-semibold bg-slate-50 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 appearance-none cursor-pointer outline-none transition-all hover:bg-slate-100"
                        value={currentCompany.id}
                        onChange={(e) => setCompany(e.target.value)}
                    >
                        {availableCompanies.map(c => (
                            <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                        <ChevronDown className="w-4 h-4" />
                    </div>
                </div>

                <div className="h-8 w-px bg-slate-200 hidden md:block"></div>
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-widest hidden lg:block">Global Executive Dashboard</h2>
            </div>

            <div className="flex items-center space-x-4">
                {/* Search */}
                <div className="relative group hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <input
                        className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg text-sm focus:ring-2 focus:ring-blue-600 w-64 transition-all outline-none"
                        placeholder="Search ERP modules..."
                        type="text"
                    />
                </div>

                {/* Notifications */}
                <button className="relative p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                </button>
            </div>
        </header>
    );
};
