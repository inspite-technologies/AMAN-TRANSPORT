import React from 'react';
import {
    TrendingUp,
    Truck,
    ArrowRight,
    Import,
    Factory,
    DollarSign,
    Receipt,
    Wallet,
    Fuel,
    ShoppingCart,
    ArrowUp,
    User
} from 'lucide-react';
import {
    BarChart,
    Bar,
    Tooltip,
    ResponsiveContainer,
    Cell
} from 'recharts';

// Mock Data for Revenue Trend
const data = [
    { name: 'Jan', value: 4000 },
    { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 5000 },
    { name: 'Apr', value: 6500 },
    { name: 'May', value: 8000 },
    { name: 'Jun', value: 7000 },
];

export const DashboardPage: React.FC = () => {
    return (
        <div className="space-y-8">
            {/* Page Title & Status */}
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-800">Company Performance Tiles</h3>
                <span className="text-xs font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full border border-blue-100 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-pulse"></span>
                    Real-time Data Active
                </span>
            </div>

            {/* Performance Tiles Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                {/* Aman Transport Tile */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:border-blue-600 transition-all group cursor-pointer overflow-hidden">
                    <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-blue-50 text-blue-700 rounded-xl">
                                <Truck className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 flex items-center">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></span> Healthy
                            </span>
                        </div>
                        <h4 className="text-xl font-bold text-slate-800">Aman Transport</h4>
                        <p className="text-sm text-slate-500 mt-1">Fleet & Logistics Operations</p>
                        <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-sm">
                            <span className="text-slate-400">Live Loadings</span>
                            <span className="font-bold text-slate-700">1,248 Units</span>
                        </div>
                    </div>
                    <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <span className="text-xs font-bold uppercase tracking-wider">Drill-down Analytics</span>
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>

                {/* Aman Trading Tile */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:border-blue-600 transition-all group cursor-pointer overflow-hidden">
                    <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-xl">
                                <Import className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-100 flex items-center">
                                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-1.5"></span> Attention
                            </span>
                        </div>
                        <h4 className="text-xl font-bold text-slate-800">Aman Trading</h4>
                        <p className="text-sm text-slate-500 mt-1">Import & Export Division</p>
                        <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-sm">
                            <span className="text-slate-400">Open Contracts</span>
                            <span className="font-bold text-slate-700">42 Transactions</span>
                        </div>
                    </div>
                    <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <span className="text-xs font-bold uppercase tracking-wider">Drill-down Analytics</span>
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>

                {/* Aman Production Tile */}
                <div className="bg-white border border-slate-200 rounded-xl shadow-sm hover:border-blue-600 transition-all group cursor-pointer overflow-hidden">
                    <div className="p-6">
                        <div className="flex items-start justify-between mb-4">
                            <div className="p-3 bg-amber-50 text-amber-600 rounded-xl">
                                <Factory className="w-6 h-6" />
                            </div>
                            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 flex items-center">
                                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5"></span> Healthy
                            </span>
                        </div>
                        <h4 className="text-xl font-bold text-slate-800">Aman Production</h4>
                        <p className="text-sm text-slate-500 mt-1">Manufacturing & Food Production</p>
                        <div className="mt-6 pt-4 border-t border-slate-50 flex items-center justify-between text-sm">
                            <span className="text-slate-400">Daily Output</span>
                            <span className="font-bold text-slate-700">82% Cap.</span>
                        </div>
                    </div>
                    <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between group-hover:bg-blue-600 group-hover:text-white transition-colors">
                        <span className="text-xs font-bold uppercase tracking-wider">Drill-down Analytics</span>
                        <ArrowRight className="w-4 h-4" />
                    </div>
                </div>
            </div>

            <div className="mb-6">
                <h3 className="text-lg font-bold text-slate-800">Financial & Operations Summary</h3>
            </div>

            {/* Financial Summary Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Revenue */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm relative overflow-hidden">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Revenue</span>
                        <DollarSign className="text-blue-600 w-5 h-5" />
                    </div>
                    <div className="flex items-end justify-between">
                        <div>
                            <h5 className="text-2xl font-extrabold text-slate-900">$2,450,000</h5>
                            <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center">
                                <TrendingUp className="w-3 h-3 mr-1" /> +12.5% vs last month
                            </p>
                        </div>
                    </div>
                </div>

                {/* Expenses */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Expenses</span>
                        <Receipt className="text-rose-500 w-5 h-5" />
                    </div>
                    <div className="flex items-end justify-between">
                        <div>
                            <h5 className="text-2xl font-extrabold text-slate-900">$1,820,000</h5>
                            <p className="text-xs text-rose-600 font-semibold mt-1 flex items-center">
                                <TrendingUp className="w-3 h-3 mr-1" /> +4.2% higher costs
                            </p>
                        </div>
                    </div>
                </div>

                {/* Net Profit */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm ring-2 ring-blue-600 ring-opacity-10">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Net Profit</span>
                        <Wallet className="text-emerald-500 w-5 h-5" />
                    </div>
                    <div className="flex items-end justify-between">
                        <div>
                            <h5 className="text-2xl font-extrabold text-slate-900">$630,000</h5>
                            <p className="text-xs text-emerald-600 font-semibold mt-1 flex items-center">
                                <ArrowUp className="w-3 h-3 mr-1" /> 24% margin achieved
                            </p>
                        </div>
                    </div>
                </div>

                {/* Fleet Cost */}
                <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Fleet Op. Cost</span>
                        <Fuel className="text-amber-500 w-5 h-5" />
                    </div>
                    <div className="flex items-end justify-between">
                        <div>
                            <h5 className="text-2xl font-extrabold text-slate-900">$412,000</h5>
                            <p className="text-xs text-slate-500 font-semibold mt-1">
                                $2.4 / mile avg across fleet
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Section: Charts & Transactions */}
            <div className="mt-10 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Chart Section */}
                <div className="lg:col-span-2 bg-white border border-slate-200 rounded-xl overflow-hidden">
                    <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/50">
                        <h4 className="font-bold text-slate-800">Monthly Revenue Trend</h4>
                        <button className="text-xs font-bold text-blue-600 hover:underline">View Full Report</button>
                    </div>
                    <div className="p-6 h-64 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0' }}
                                    cursor={{ fill: '#f1f5f9' }}
                                />
                                <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                                    {data.map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={`rgba(30, 64, 175, ${0.4 + (index * 0.1)})`} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Transactions List */}
                <div className="bg-white border border-slate-200 rounded-xl">
                    <div className="p-5 border-b border-slate-200 bg-slate-50/50">
                        <h4 className="font-bold text-slate-800">Recent Transactions</h4>
                    </div>
                    <div className="divide-y divide-slate-100">
                        <div className="p-4 flex items-center space-x-4">
                            <div className="w-10 h-10 rounded bg-slate-100 flex items-center justify-center">
                                <ShoppingCart className="w-5 h-5 text-slate-500" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-slate-800">Purchase Order #991</p>
                                <p className="text-xs text-slate-500">Aman Trading • 2h ago</p>
                            </div>
                            <span className="font-bold text-sm text-slate-800">-$12.4k</span>
                        </div>
                        <div className="p-4 flex items-center space-x-4">
                            <div className="w-10 h-10 rounded bg-emerald-100 flex items-center justify-center">
                                <Wallet className="w-5 h-5 text-emerald-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-slate-800">Inbound Payment</p>
                                <p className="text-xs text-slate-500">Global Logistics • 4h ago</p>
                            </div>
                            <span className="font-bold text-sm text-emerald-600">+$245k</span>
                        </div>
                        <div className="p-4 flex items-center space-x-4">
                            <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center">
                                <User className="w-5 h-5 text-blue-600" />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-bold text-slate-800">Payroll Disbursed</p>
                                <p className="text-xs text-slate-500">Human Resources • Yesterday</p>
                            </div>
                            <span className="font-bold text-sm text-slate-800">-$88.2k</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="h-10 bg-white border-t border-slate-200 flex items-center justify-between px-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-auto">
                <div className="flex items-center space-x-4">
                    <span>Aman Unified Enterprise v2024.1.0</span>
                    <span className="flex items-center text-emerald-600">
                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mr-1.5 animate-pulse"></span> Systems Operational
                    </span>
                </div>
                <div>
                    <span>Last Synced: {new Date().toLocaleDateString()}</span>
                </div>
            </footer>
        </div>
    );
};
