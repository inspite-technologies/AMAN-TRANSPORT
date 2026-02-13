import React, { useState } from 'react';
import {
    TrendingUp,
    DollarSign,
    Wallet,
    Clock,
    Download,
    Activity,
    Package,
    Truck,
    Factory,
    ChevronRight,
    CheckCircle2,
    HelpCircle,
    Bell,
    Loader2
} from 'lucide-react';
import { financeService } from '../../services/financeService';

export const FinancePage: React.FC = () => {
    const [activeTab, setActiveTab] = useState('consolidated');
    const [selectedPeriod, setSelectedPeriod] = useState('Real-Time: Today');
    const [transactions, setTransactions] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [kpis, setKpis] = useState<any>(null);

    // Icon Mapping
    const iconMap: any = {
        Truck: Truck,
        Package: Package,
        Factory: Factory
    };

    React.useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const [txData, kpiData] = await Promise.all([
                    financeService.getTransactions(),
                    financeService.getKPIs()
                ]);
                setTransactions(txData);
                setKpis(kpiData);
            } catch (error) {
                console.error("Failed to load finance data", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, [selectedPeriod]);

    const filteredTransactions = selectedPeriod === 'FY 2023 Cumulative'
        ? transactions
        : transactions.filter(t => t.period === selectedPeriod || selectedPeriod.includes('Today') && t.period === 'Real-Time: Today');

    const handleExport = async (format: string) => {
        const message = await financeService.exportReport(format, selectedPeriod);
        alert(message);
    };

    return (
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-slate-900 font-sans">
            {/* Header */}
            <header className="h-20 border-b border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 sticky top-0 z-40 px-10 flex items-center justify-between shadow-sm">
                <div>
                    <h1 className="text-2xl font-extrabold tracking-tight text-slate-900 dark:text-white">Finance Control Center & Profit Engine</h1>
                    <div className="flex items-center gap-3 mt-1">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            Live Financial Sync
                        </span>
                        <span className="text-xs text-slate-400 font-medium tracking-wide">SRS Section 8 Compliant • Unified Enterprise ERP</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-slate-100 dark:bg-slate-700/50 rounded-lg p-1 border border-slate-300 dark:border-slate-600">
                        <button className="px-4 py-1.5 text-xs font-bold bg-white dark:bg-slate-600 shadow-sm rounded-md border border-slate-300 dark:border-slate-500 text-slate-900 dark:text-slate-100">USD</button>
                        <button className="px-4 py-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">EUR</button>
                    </div>
                    <button
                        onClick={() => handleExport('PDF')}
                        className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:shadow-lg transition-all active:scale-95 hover:bg-blue-700"
                    >
                        <Download className="w-5 h-5" />
                        Financial Reports
                    </button>
                </div>
            </header>

            <div className="p-10 space-y-10">
                {/* Navigation Tabs */}
                <section className="bg-white dark:bg-slate-800 p-2 rounded-xl border-2 border-slate-300 dark:border-slate-600 flex flex-wrap gap-2 shadow-sm">
                    {[
                        { id: 'consolidated', label: 'Consolidated View', icon: Activity },
                        { id: 'transport', label: 'Transport Unit', icon: Truck },
                        { id: 'export', label: 'Export Hub', icon: TrendingUp },
                        { id: 'import', label: 'Import Ops', icon: Package },
                        { id: 'production', label: 'Production', icon: Factory },
                    ].map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-lg text-sm font-bold transition-all border-2 ${activeTab === tab.id
                                ? 'border-blue-600 text-blue-600 bg-blue-50 dark:bg-blue-900/20 dark:text-blue-400'
                                : 'border-transparent text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700 dark:text-slate-400'
                                }`}
                        >
                            <tab.icon className="w-5 h-5" />
                            {tab.label}
                        </button>
                    ))}

                    <div className="ml-auto flex items-center pr-4">
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mr-3">Period:</span>
                        <select
                            value={selectedPeriod}
                            onChange={(e) => setSelectedPeriod(e.target.value)}
                            className="bg-slate-50 dark:bg-slate-900 border-2 border-slate-300 dark:border-slate-600 rounded-lg text-xs font-bold py-1.5 pl-3 pr-8 focus:ring-blue-600 focus:border-blue-600 outline-none text-slate-700 dark:text-slate-300"
                        >
                            <option>Real-Time: Today</option>
                            <option>MTD: July 2023</option>
                            <option>Q3 Fiscal View</option>
                            <option>FY 2023 Cumulative</option>
                        </select>
                    </div>
                </section>

                {/* Key Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {/* Revenue Card */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border-2 border-slate-300 dark:border-slate-600 shadow-sm group hover:border-blue-600 transition-colors">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-xl">
                                <TrendingUp className="w-8 h-8" />
                            </div>
                            <span className="text-xs font-black text-emerald-600 bg-emerald-100/50 dark:bg-emerald-900/30 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-800">+14.2%</span>
                        </div>
                        <p className="text-slate-400 text-xs font-extrabold uppercase tracking-widest">Total Revenue</p>
                        <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">
                            {isLoading ? <Loader2 className="w-8 h-8 animate-spin text-blue-600" /> : `$${kpis?.revenue.toLocaleString()}`}
                        </h3>
                        <div className="mt-4 h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className="bg-blue-600 h-full w-[78%]"></div>
                        </div>
                    </div>

                    {/* Expenses Card */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border-2 border-slate-300 dark:border-slate-600 shadow-sm group hover:border-red-600 transition-colors">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-red-50 dark:bg-red-900/30 text-red-600 dark:text-red-400 rounded-xl">
                                <DollarSign className="w-8 h-8" />
                            </div>
                            <span className="text-xs font-black text-red-600 bg-red-100/50 dark:bg-red-900/30 px-2 py-1 rounded border border-red-200 dark:border-red-800">+{kpis?.expensesGrowth}%</span>
                        </div>
                        <p className="text-slate-400 text-xs font-extrabold uppercase tracking-widest">Total Expenses</p>
                        <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">
                            {isLoading ? <Loader2 className="w-8 h-8 animate-spin text-red-600" /> : `$${kpis?.expenses.toLocaleString()}`}
                        </h3>
                        <div className="mt-4 h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className="bg-red-600 h-full w-[65%]"></div>
                        </div>
                    </div>

                    {/* Net Profit Card */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border-2 border-slate-300 dark:border-slate-600 shadow-sm group hover:border-emerald-600 transition-colors">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400 rounded-xl">
                                <Wallet className="w-8 h-8" />
                            </div>
                            <span className="text-xs font-black text-emerald-600 bg-emerald-100/50 dark:bg-emerald-900/30 px-2 py-1 rounded border border-emerald-200 dark:border-emerald-800">+{kpis?.profitGrowth}%</span>
                        </div>
                        <p className="text-slate-400 text-xs font-extrabold uppercase tracking-widest">Net Profit</p>
                        <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">
                            {isLoading ? <Loader2 className="w-8 h-8 animate-spin text-emerald-600" /> : `$${kpis?.profit.toLocaleString()}`}
                        </h3>
                        <div className="mt-4 h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className="bg-emerald-600 h-full w-[35%]"></div>
                        </div>
                    </div>

                    {/* Outstanding Payments Card */}
                    <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border-2 border-slate-300 dark:border-slate-600 shadow-sm group hover:border-amber-500 transition-colors">
                        <div className="flex justify-between items-start mb-6">
                            <div className="p-3 bg-amber-50 dark:bg-amber-900/30 text-amber-500 rounded-xl">
                                <Clock className="w-8 h-8" />
                            </div>
                            <span className="text-xs font-black text-amber-600 bg-amber-100/50 dark:bg-amber-900/30 px-2 py-1 rounded border border-amber-200 dark:border-amber-800">DSO: 28d</span>
                        </div>
                        <p className="text-slate-400 text-xs font-extrabold uppercase tracking-widest">Outstanding Pymts</p>
                        <h3 className="text-3xl font-black mt-1 text-slate-900 dark:text-white">$892,100.00</h3>
                        <div className="mt-4 h-1.5 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div className="bg-amber-500 h-full w-[18%]"></div>
                        </div>
                    </div>
                </div>

                {/* Main Content Split */}
                <div className="grid grid-cols-12 gap-10">
                    {/* Profit Engine Table */}
                    <div className="col-span-12 lg:col-span-7 bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-300 dark:border-slate-600 overflow-hidden shadow-lg">
                        <div className="p-6 border-b-2 border-slate-300 dark:border-slate-600 flex justify-between items-center bg-slate-50/50 dark:bg-slate-700/50">
                            <div>
                                <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                                    <Activity className="text-blue-600 w-6 h-6" />
                                    Real-time Profit Engine
                                </h2>
                                <p className="text-xs text-slate-500 font-bold uppercase tracking-wide mt-1">Granular Profit Tracking: Shipment & Vehicle Level</p>
                            </div>
                            <div className="flex gap-2">
                                <button className="bg-white dark:bg-slate-700 border-2 border-slate-300 dark:border-slate-500 px-3 py-1.5 rounded-lg text-xs font-black hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors text-slate-700 dark:text-slate-200">FILTER</button>
                                <button
                                    onClick={() => handleExport('CSV')}
                                    className="bg-slate-900 dark:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-black"
                                >
                                    EXPORT CSV
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-100 dark:bg-slate-900/50 border-b-2 border-slate-300 dark:border-slate-600">
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Entity / Ref ID</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Revenue</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Direct Cost</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Net Profit</th>
                                        <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-center">Efficiency</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y-2 divide-slate-200 dark:divide-slate-700">
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-8 text-center text-slate-500 font-bold">
                                                <div className="flex justify-center items-center gap-2">
                                                    <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                                                    <span>Syncing Financial Data...</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : filteredTransactions.length === 0 ? (
                                        <tr>
                                            <td colSpan={5} className="px-6 py-8 text-center text-slate-500 font-bold">
                                                No transactions found for the selected period.
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredTransactions.map(tx => (
                                            <tr key={tx.id} className="hover:bg-blue-50/50 dark:hover:bg-blue-900/20 transition-colors">
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 rounded bg-blue-600/10 flex items-center justify-center text-blue-600">
                                                            {React.createElement(iconMap[tx.icon] || Package, { className: "w-5 h-5" })}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-black text-slate-900 dark:text-white">{tx.ref}</p>
                                                            <p className="text-[10px] text-slate-400 font-bold uppercase">{tx.subtitle}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 text-sm font-bold text-right text-slate-900 dark:text-white">${tx.revenue.toLocaleString()}</td>
                                                <td className="px-6 py-4 text-sm font-bold text-right text-red-600">${tx.cost.toLocaleString()}</td>
                                                <td className="px-6 py-4 text-sm font-black text-right text-emerald-600">${tx.profit.toLocaleString()}</td>
                                                <td className="px-6 py-4 text-center">
                                                    <div className={`inline-flex items-center gap-1.5 px-2 py-1 rounded text-[10px] font-black border ${tx.efficiency > 30 ? 'bg-emerald-100/50 text-emerald-700 border-emerald-200' :
                                                        tx.efficiency > 15 ? 'bg-amber-100/50 text-amber-700 border-amber-200' :
                                                            'bg-red-100/50 text-red-700 border-red-200'
                                                        }`}>
                                                        {tx.efficiency}%
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Cash Flow Management */}
                    <div className="col-span-12 lg:col-span-5 bg-white dark:bg-slate-800 rounded-xl border-2 border-slate-300 dark:border-slate-600 shadow-lg flex flex-col">
                        <div className="p-6 border-b-2 border-slate-300 dark:border-slate-600 bg-slate-50/50 dark:bg-slate-700/50">
                            <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                                <Wallet className="text-amber-500 w-6 h-6" />
                                Cash Flow Management
                            </h2>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Payables vs Receivables Aging</p>
                        </div>
                        <div className="flex-1">
                            <div className="p-4 bg-slate-100 dark:bg-slate-900 flex gap-2">
                                <button className="flex-1 py-2 text-[10px] font-black rounded-lg bg-white dark:bg-slate-800 border-2 border-blue-600 text-blue-600">OPEN INVOICES (12)</button>
                                <button className="flex-1 py-2 text-[10px] font-black rounded-lg bg-white dark:bg-slate-800 border-2 border-slate-300 dark:border-slate-600 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-700">SUPPLIER DUES (08)</button>
                            </div>
                            <div className="divide-y-2 divide-slate-200 dark:divide-slate-700">
                                {/* Invoice Item 1 */}
                                <div className="p-5 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer group">
                                    <div className="flex gap-4 items-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-red-600 animate-pulse"></div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900 dark:text-white">Global Logistics Corp.</p>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase">INV-2023-8892 • <span className="text-red-500">Overdue 12d</span></p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-slate-900 dark:text-white">$24,500.00</p>
                                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors inline-block" />
                                    </div>
                                </div>
                                {/* Invoice Item 2 */}
                                <div className="p-5 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer group">
                                    <div className="flex gap-4 items-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-amber-500"></div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900 dark:text-white">Fresh Foods Manufacturing</p>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase">INV-2023-8901 • <span className="text-amber-500">Due in 2d</span></p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-slate-900 dark:text-white">$18,200.00</p>
                                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors inline-block" />
                                    </div>
                                </div>
                                {/* Invoice Item 3 */}
                                <div className="p-5 flex justify-between items-center hover:bg-slate-50 dark:hover:bg-slate-700/50 cursor-pointer group bg-slate-50/30 dark:bg-slate-800/30">
                                    <div className="flex gap-4 items-center">
                                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300"></div>
                                        <div>
                                            <p className="text-sm font-black text-slate-900 dark:text-white">Maritime Carriers Ltd.</p>
                                            <p className="text-[10px] text-slate-500 font-bold uppercase">SUP-881-A • <span className="text-slate-500 text-xs">Due in 15d</span></p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="text-sm font-black text-slate-900 dark:text-white">$42,800.00</p>
                                        <ChevronRight className="w-5 h-5 text-slate-300 group-hover:text-blue-600 transition-colors inline-block" />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            onClick={() => handleExport('PDF')}
                            className="p-4 border-t-2 border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/50 text-center text-[10px] font-black text-blue-600 uppercase tracking-widest hover:underline cursor-pointer"
                        >
                            Download Aging Report (PDF)
                        </div>
                    </div>
                </div>

                {/* Footer Status Panel */}
                <div className="bg-slate-900 text-white rounded-xl p-8 border-2 border-slate-700 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        <div className="space-y-4">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Data Integrity</p>
                            <div className="flex items-center gap-3">
                                <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                                <p className="text-sm font-medium">All ledgers reconciled for Q3-2023</p>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">System Status</p>
                            <div className="flex items-center gap-3">
                                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                                <p className="text-sm font-medium">ERP Engine: Optimal Performance</p>
                            </div>
                        </div>
                        <div className="md:col-span-2 text-right">
                            <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-4 text-left md:text-right">Finance Manager Actions</p>
                            <div className="flex flex-wrap gap-2 justify-start md:justify-end">
                                <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold border border-slate-700 transition-colors">Month-End Close</button>
                                <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 rounded-lg text-xs font-bold border border-slate-700 transition-colors">Audit Export</button>
                                <button className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-xs font-bold transition-colors">General Ledger</button>
                            </div>
                        </div>
                    </div>
                    <div className="mt-8 pt-8 border-t border-slate-800 flex justify-between items-center">
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">© 2023 Enterprise Unified Finance System • High Contrast Professional Mode</p>
                        <div className="flex gap-4">
                            <HelpCircle className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer transition-colors" />
                            <Bell className="w-5 h-5 text-slate-500 hover:text-white cursor-pointer transition-colors" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
