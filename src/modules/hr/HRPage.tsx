import React from 'react';
import {
    Search,
    Rocket,
    TrendingUp,
    AlertTriangle,
    MapPin,
    Filter,
    UserPlus,
    Edit,
    FileText,
    CheckCircle,
    Settings,
    Download,
    Activity,
    ShieldAlert,
    Briefcase
} from 'lucide-react';
import { Card, CardContent } from '../../components/ui/card';

export const HRPage: React.FC = () => {
    return (
        <div className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-extrabold tracking-tight text-slate-900">Unified HR & Payroll Engine</h1>
                    <div className="h-6 w-[1px] bg-slate-200"></div>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-700 rounded-full">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span className="text-[11px] font-bold uppercase tracking-wider">Conglomerate View</span>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                        <input
                            className="pl-10 pr-4 py-2 bg-slate-50 border-none rounded-lg text-xs w-72 focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                            placeholder="Search employee ID, license or name..."
                            type="text"
                        />
                    </div>
                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-xs font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20">
                        <Rocket className="w-4 h-4" />
                        Calculate Monthly Payroll
                    </button>
                </div>
            </div>

            {/* Sub Navigation */}
            <div className="border-b border-slate-200 overflow-x-auto">
                <div className="flex items-center gap-8">
                    <button className="px-1 py-4 text-xs font-bold text-blue-600 border-b-2 border-blue-600 whitespace-nowrap">Employee Master</button>
                    <button className="px-1 py-4 text-xs font-bold text-slate-500 hover:text-slate-700 border-b-2 border-transparent whitespace-nowrap">Attendance & Leave (GPS)</button>
                    <button className="px-1 py-4 text-xs font-bold text-slate-500 hover:text-slate-700 border-b-2 border-transparent whitespace-nowrap">Salary Structure</button>
                    <button className="px-1 py-4 text-xs font-bold text-slate-500 hover:text-slate-700 border-b-2 border-transparent whitespace-nowrap">Compliance & Docs</button>
                    <button className="px-1 py-4 text-xs font-bold text-slate-500 hover:text-slate-700 border-b-2 border-transparent whitespace-nowrap">Reporting Analytics</button>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="border-slate-200 shadow-sm">
                    <CardContent className="p-4">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Total Payout (Est.)</p>
                        <div className="flex items-end justify-between">
                            <h3 className="text-xl font-black text-slate-900">$2,482,100</h3>
                            <span className="text-[10px] font-bold text-emerald-600 flex items-center gap-1 bg-emerald-50 px-1.5 py-0.5 rounded">
                                <TrendingUp className="w-3 h-3" /> 3.1%
                            </span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-slate-200 shadow-sm">
                    <CardContent className="p-4">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Trip Allowances</p>
                        <div className="flex items-end justify-between">
                            <h3 className="text-xl font-black text-blue-600">$184,320</h3>
                            <span className="text-[10px] font-bold text-slate-400">1,240 Trips</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-slate-200 shadow-sm">
                    <CardContent className="p-4">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Fuel Penalties</p>
                        <div className="flex items-end justify-between">
                            <h3 className="text-xl font-black text-red-500">-$12,400</h3>
                            <span className="text-[10px] font-bold text-red-600 bg-red-50 px-1.5 py-0.5 rounded">High Alert</span>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-slate-200 shadow-sm">
                    <CardContent className="p-4">
                        <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">Licensing Alerts</p>
                        <div className="flex items-end justify-between">
                            <h3 className="text-xl font-black text-amber-500">24 Expiring</h3>
                            <button className="text-[10px] font-bold text-white bg-amber-500 hover:bg-amber-600 px-2 py-0.5 rounded transition-colors">Renew All</button>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-12 gap-6">
                {/* Employee List Section */}
                <div className="col-span-12 xl:col-span-8 space-y-6">
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                        <div className="p-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
                            <div className="flex gap-4">
                                <select className="bg-white border-slate-200 text-slate-700 text-[11px] font-bold rounded-lg focus:ring-blue-600 uppercase tracking-tight py-2 pl-3 pr-8 outline-none border">
                                    <option>All Business Units</option>
                                    <option>Transport - Heavy Haulage</option>
                                    <option>Manufacturing - Hub A</option>
                                    <option>Trading - Export Dept</option>
                                </select>
                                <select className="bg-white border-slate-200 text-slate-700 text-[11px] font-bold rounded-lg focus:ring-blue-600 uppercase tracking-tight py-2 pl-3 pr-8 outline-none border">
                                    <option>Active Employees</option>
                                    <option>On Probation</option>
                                    <option>Contractors</option>
                                </select>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 transition-colors">
                                    <UserPlus className="w-4 h-4" />
                                </button>
                                <button className="p-2 bg-slate-100 text-slate-600 rounded hover:bg-slate-200 transition-colors">
                                    <Filter className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left table-fixed">
                                <thead className="bg-slate-50 text-slate-500 uppercase text-[9px] tracking-widest font-black border-b border-slate-200">
                                    <tr>
                                        <th className="px-4 py-3 w-1/3">Employee / ID</th>
                                        <th className="px-4 py-3">Dept / Role</th>
                                        <th className="px-4 py-3">License & Docs</th>
                                        <th className="px-4 py-3 text-right">Base / Gross</th>
                                        <th className="px-4 py-3 text-center">Status</th>
                                        <th className="px-4 py-3 w-12"></th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    <tr className="hover:bg-blue-50/50 transition-colors group cursor-pointer">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-blue-100 text-blue-700 flex items-center justify-center text-[10px] font-bold shrink-0">JD</div>
                                                <div className="min-w-0">
                                                    <p className="text-xs font-bold text-slate-900 truncate">Jameson D. Walker</p>
                                                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">TRN-420-HVY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <p className="text-xs font-bold text-slate-700">Transport</p>
                                            <p className="text-[10px] text-slate-500">Lead Driver (Articulated)</p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-black rounded border border-emerald-100">CLASS-A (Exp 2026)</span>
                                                <FileText className="w-3 h-3 text-slate-400" />
                                                <CheckCircle className="w-3 h-3 text-blue-600" />
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <p className="text-xs font-bold text-slate-700">$4,850.00</p>
                                            <p className="text-[9px] text-emerald-600 font-bold">+$1,200 (Inc)</p>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-50 text-emerald-600 text-[9px] font-black uppercase">On-Trip</span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <button className="text-slate-400 group-hover:text-blue-600 transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-blue-50/50 transition-colors group cursor-pointer">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-purple-100 text-purple-600 flex items-center justify-center text-[10px] font-bold shrink-0">AR</div>
                                                <div className="min-w-0">
                                                    <p className="text-xs font-bold text-slate-900 truncate">Anita Rodriguez</p>
                                                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">MFG-102-QA</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <p className="text-xs font-bold text-slate-700">Manufacturing</p>
                                            <p className="text-[10px] text-slate-500">Shift Supervisor</p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <span className="px-2 py-0.5 bg-amber-50 text-amber-600 text-[9px] font-black rounded border border-amber-100">SAFETY-L2 (EXP 14d)</span>
                                                <AlertTriangle className="w-3 h-3 text-red-500" />
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <p className="text-xs font-bold text-slate-700">$6,200.00</p>
                                            <p className="text-[9px] text-slate-500 font-bold">Regular</p>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span className="inline-block px-1.5 py-0.5 rounded bg-slate-100 text-slate-600 text-[9px] font-black uppercase">Clocked-In</span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <button className="text-slate-400 group-hover:text-blue-600 transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                    <tr className="hover:bg-blue-50/50 transition-colors group cursor-pointer">
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded bg-amber-100 text-amber-600 flex items-center justify-center text-[10px] font-bold shrink-0">MK</div>
                                                <div className="min-w-0">
                                                    <p className="text-xs font-bold text-slate-900 truncate">Mark Kasich</p>
                                                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-tighter">TRN-422-HVY</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">
                                            <p className="text-xs font-bold text-slate-700">Transport</p>
                                            <p className="text-[10px] text-slate-500">Relief Driver</p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-600 text-[9px] font-black rounded border border-emerald-100">CLASS-A (Exp 2027)</span>
                                                <CheckCircle className="w-3 h-3 text-blue-600" />
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <p className="text-xs font-bold text-slate-700">$3,900.00</p>
                                            <p className="text-[9px] text-red-500 font-bold">-$240 (Penalty)</p>
                                        </td>
                                        <td className="px-4 py-3 text-center">
                                            <span className="inline-block px-1.5 py-0.5 rounded bg-amber-50 text-amber-600 text-[9px] font-black uppercase">On-Leave</span>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <button className="text-slate-400 group-hover:text-blue-600 transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>

                        <div className="p-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase">
                            <span>Showing 15 of 2,840 records</span>
                            <div className="flex items-center gap-1">
                                <button className="w-6 h-6 flex items-center justify-center border border-slate-200 rounded hover:bg-blue-600 hover:text-white transition-colors bg-white">1</button>
                                <button className="w-6 h-6 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-100 bg-white">2</button>
                                <button className="w-6 h-6 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-100 bg-white">3</button>
                                <span className="px-2">...</span>
                                <button className="w-6 h-6 flex items-center justify-center border border-slate-200 rounded hover:bg-slate-100 bg-white">189</button>
                            </div>
                        </div>
                    </div>

                    {/* GPS Widget */}
                    <div className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-slate-800">
                                    <MapPin className="text-blue-600 w-4 h-4" />
                                    Real-time Workforce GPS Distribution
                                </h3>
                                <p className="text-xs text-slate-500 mt-1">Geofencing & biometric punch analysis across 12 transit hubs</p>
                            </div>
                            <div className="flex gap-4">
                                <div className="text-right">
                                    <p className="text-[9px] font-black text-slate-500 uppercase">Hub A Coverage</p>
                                    <p className="text-xs font-bold text-slate-900">98.4% Active</p>
                                </div>
                                <div className="text-right">
                                    <p className="text-[9px] font-black text-slate-500 uppercase">Transit Lag</p>
                                    <p className="text-xs font-bold text-amber-500">3.2% Unverified</p>
                                </div>
                            </div>
                        </div>
                        <div className="h-32 bg-slate-50 rounded-lg flex items-center justify-center border border-dashed border-slate-200 relative overflow-hidden">
                            <div className="z-10 text-center">
                                <MapPin className="text-blue-200 w-8 h-8 mx-auto mb-2" />
                                <p className="text-[10px] font-bold text-slate-400 uppercase">Interactive Hub-wise Map View Loading...</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Panel Section */}
                <div className="col-span-12 xl:col-span-4 space-y-6">
                    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm sticky top-6">
                        <div className="p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
                            <Activity className="text-blue-600 w-5 h-5" />
                            <h2 className="text-sm font-black uppercase tracking-widest text-slate-800">Transport Payroll Engine</h2>
                        </div>

                        <div className="p-5 space-y-6">
                            <div className="space-y-4">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Variable Components</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center justify-between p-3 bg-blue-50/50 rounded-lg border border-blue-100">
                                        <div>
                                            <p className="text-[10px] font-bold text-blue-600 uppercase">Trip Allowance</p>
                                            <p className="text-sm font-black text-slate-900">$220.00 <span className="text-[10px] text-slate-400 font-medium">/ Long-haul</span></p>
                                        </div>
                                        <button className="text-slate-400 hover:text-blue-600 transition-colors">
                                            <Settings className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-emerald-50/50 rounded-lg border border-emerald-100">
                                        <div>
                                            <p className="text-[10px] font-bold text-emerald-600 uppercase">KM Incentive</p>
                                            <p className="text-sm font-black text-slate-900">$0.18 <span className="text-[10px] text-slate-400 font-medium">/ Km (Tier 1)</span></p>
                                        </div>
                                        <button className="text-slate-400 hover:text-blue-600 transition-colors">
                                            <Settings className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="flex items-center justify-between p-3 bg-red-50/50 rounded-lg border border-red-100">
                                        <div>
                                            <p className="text-[10px] font-bold text-red-500 uppercase">Fuel Penalties</p>
                                            <p className="text-sm font-black text-slate-900">1.5x <span className="text-[10px] text-slate-400 font-medium">of Misuse Cost</span></p>
                                        </div>
                                        <button className="text-slate-400 hover:text-blue-600 transition-colors">
                                            <Settings className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-3 pt-4 border-t border-slate-100">
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Payroll Readiness</h4>
                                <div className="flex items-center gap-3 text-slate-700">
                                    <CheckCircle className="text-emerald-500 w-4 h-4" />
                                    <span className="text-[11px] font-bold">Labor Laws 2024 Compliance</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-700">
                                    <CheckCircle className="text-emerald-500 w-4 h-4" />
                                    <span className="text-[11px] font-bold">Union Agreements Updated</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-700">
                                    <ShieldAlert className="text-amber-500 w-4 h-4" />
                                    <span className="text-[11px] font-bold text-amber-600">12 Logbook mismatches flagged</span>
                                </div>
                            </div>

                            <div className="pt-4">
                                <button className="w-full py-3 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-black uppercase tracking-widest border border-slate-200 rounded-xl transition-all flex items-center justify-center gap-2 group">
                                    <Download className="w-4 h-4 group-hover:text-blue-600" />
                                    Generate Draft Register
                                </button>
                            </div>
                        </div>

                        <div className="bg-blue-600 p-6 text-white">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="font-black text-sm uppercase tracking-tight">Conglomerate Analytics</h3>
                                    <p className="text-[10px] opacity-80 font-bold uppercase">Efficiency Index</p>
                                </div>
                                <TrendingUp className="w-5 h-5 text-blue-200" />
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <div className="flex justify-between text-[10px] font-bold uppercase mb-1 opacity-90">
                                        <span>Manufacturing Uptime</span>
                                        <span>94%</span>
                                    </div>
                                    <div className="h-1 bg-blue-500 rounded-full overflow-hidden">
                                        <div className="h-full bg-white rounded-full w-[94%]"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between text-[10px] font-bold uppercase mb-1 opacity-90">
                                        <span>Transport Turnaround</span>
                                        <span>82%</span>
                                    </div>
                                    <div className="h-1 bg-blue-500 rounded-full overflow-hidden">
                                        <div className="h-full bg-white rounded-full w-[82%]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
