import React from 'react';
import {
    Settings,
    Bell,
    CheckCircle,
    Truck,
    Wrench,
    Clock,
    Fuel,
    Search,
    PlusCircle,
    ExternalLink,
    ChevronLeft,
    ChevronRight,
    ShieldCheck,
    AlertTriangle,
    Activity,
    ArrowRight,
    Loader2
} from 'lucide-react';
import { fleetService, type Vehicle } from '../../services/fleetService';

export const FleetPage: React.FC = () => {
    const [filterStatus, setFilterStatus] = React.useState('All');
    const [vehicles, setVehicles] = React.useState<Vehicle[]>([]);
    const [stats, setStats] = React.useState<any>(null);
    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const [vehicleData, statsData] = await Promise.all([
                    fleetService.getVehicles(),
                    fleetService.getStats()
                ]);
                setVehicles(vehicleData);
                setStats(statsData);
            } catch (e) {
                console.error("Failed to load fleet data", e);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    const filteredVehicles = filterStatus === 'All'
        ? vehicles
        : vehicles.filter(v => v.status === filterStatus);

    return (
        <div className="space-y-6">
            {/* Header Section */}
            <header className="bg-white border-b border-slate-200 sticky top-0 z-30 -mx-6 px-6 py-4 shadow-sm">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-8">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
                                <Settings className="text-white w-6 h-6" />
                            </div>
                            <div className="flex flex-col">
                                <h1 className="text-xl font-bold leading-none text-slate-900">Fleet<span className="text-blue-600">Master</span></h1>
                                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-[0.2em]">Enterprise ERP</span>
                            </div>
                        </div>
                        <nav className="hidden md:flex items-center gap-1">
                            <button
                                onClick={() => setFilterStatus('All')}
                                className={`px-4 py-2 rounded-lg font-semibold text-sm shadow-sm transition-all ${filterStatus === 'All' ? 'bg-blue-600 text-white' : 'text-slate-500 hover:bg-slate-100'}`}
                            >
                                Fleet Inventory
                            </button>
                            <button className="px-4 py-2 rounded-lg text-slate-500 hover:bg-slate-100 font-medium text-sm transition-colors">Operations</button>
                            <button className="px-4 py-2 rounded-lg text-slate-500 hover:bg-slate-100 font-medium text-sm transition-colors">Compliance Hub</button>
                        </nav>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="hidden lg:flex flex-col items-end border-r border-slate-200 pr-6">
                            <span className="text-[10px] text-slate-500 uppercase font-bold tracking-wider">Operational Status</span>
                            <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                                <Activity className="w-3 h-3" /> Optimal Performance
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <button className="relative p-2 text-slate-400 hover:bg-slate-100 rounded-full transition-colors">
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                            </button>
                            <div className="flex items-center gap-3 pl-2">
                                <div className="text-right hidden sm:block">
                                    <p className="text-sm font-bold leading-none text-slate-900">Alex Thompson</p>
                                    <p className="text-[10px] text-slate-500 font-medium">Senior Fleet Manager</p>
                                </div>
                                <div className="w-9 h-9 rounded-full bg-slate-200 overflow-hidden ring-2 ring-blue-600/20">
                                    <img alt="User" src="https://ui-avatars.com/api/?name=Alex+Thompson&background=random" className="w-full h-full object-cover" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <div className="grid grid-cols-12 gap-6">
                {/* Stats Section */}
                <div className="col-span-12 lg:col-span-8 bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500">Fleet Availability Dashboard</h2>
                        <span className="text-xs font-bold text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                            LIVE: {isLoading ? '...' : stats?.total} Total Units
                        </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div
                            onClick={() => setFilterStatus('Available')}
                            className={`p-4 rounded-xl border cursor-pointer group hover:shadow-md transition-all ${filterStatus === 'Available' ? 'bg-emerald-100 border-emerald-300 ring-2 ring-emerald-500/20' : 'bg-emerald-50 border-emerald-100'}`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <CheckCircle className="text-emerald-500 w-6 h-6" />
                                <span className="text-2xl font-black text-emerald-600">
                                    {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : stats?.available}
                                </span>
                            </div>
                            <p className="text-xs font-bold text-slate-600 group-hover:text-emerald-700">AVAILABLE</p>
                        </div>
                        <div
                            onClick={() => setFilterStatus('On Trip')}
                            className={`p-4 rounded-xl border cursor-pointer group hover:shadow-md transition-all ${filterStatus === 'On Trip' ? 'bg-blue-100 border-blue-300 ring-2 ring-blue-500/20' : 'bg-blue-50 border-blue-100'}`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <Truck className="text-blue-600 w-6 h-6" />
                                <span className="text-2xl font-black text-blue-700">
                                    {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : stats?.onTrip}
                                </span>
                            </div>
                            <p className="text-xs font-bold text-slate-600 group-hover:text-blue-700">ON TRIP</p>
                        </div>
                        <div
                            onClick={() => setFilterStatus('Maintenance')}
                            className={`p-4 rounded-xl border cursor-pointer group hover:shadow-md transition-all ${filterStatus === 'Maintenance' ? 'bg-amber-100 border-amber-300 ring-2 ring-amber-500/20' : 'bg-amber-50 border-amber-100'}`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <Wrench className="text-amber-500 w-6 h-6" />
                                <span className="text-2xl font-black text-amber-600">
                                    {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : stats?.maintenance}
                                </span>
                            </div>
                            <p className="text-xs font-bold text-slate-600 group-hover:text-amber-700">MAINTENANCE</p>
                        </div>
                        <div
                            onClick={() => setFilterStatus('Idle')}
                            className={`p-4 rounded-xl border cursor-pointer group hover:shadow-md transition-all ${filterStatus === 'Idle' ? 'bg-slate-200 border-slate-300 ring-2 ring-slate-500/20' : 'bg-slate-100 border-slate-200'}`}
                        >
                            <div className="flex items-center justify-between mb-2">
                                <Clock className="text-slate-400 w-6 h-6" />
                                <span className="text-2xl font-black text-slate-500">
                                    {isLoading ? <Loader2 className="w-6 h-6 animate-spin" /> : stats?.idle}
                                </span>
                            </div>
                            <p className="text-xs font-bold text-slate-600 group-hover:text-slate-700">IDLE</p>
                        </div>
                    </div>
                </div>

                {/* Fuel Management Section */}
                <div className="col-span-12 lg:col-span-4 bg-white rounded-xl border border-slate-200 p-5 shadow-sm flex flex-col justify-center">
                    <h2 className="text-sm font-bold uppercase tracking-widest text-slate-500 mb-6 flex items-center gap-2">
                        <Fuel className="text-slate-400 w-4 h-4" /> Fuel Management (MTD)
                    </h2>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-[10px] text-slate-400 font-bold uppercase">Distance Tracked</p>
                                <p className="text-xl font-black text-slate-900">42,850 <span className="text-xs font-bold text-slate-500">KM</span></p>
                            </div>
                            <div className="text-right">
                                <p className="text-[10px] text-slate-400 font-bold uppercase">Avg Efficiency</p>
                                <p className="text-xl font-black text-emerald-500">4.8 <span className="text-xs font-bold">KM/L</span></p>
                            </div>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                            <div className="bg-blue-600 h-full rounded-full" style={{ width: '72%' }}></div>
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-bold border-t border-slate-100 pt-3">
                            <span className="text-slate-500">FUEL BUDGET: $14.5k Used</span>
                            <span className="text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded">+12% vs LY</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-12 gap-6 items-start">
                {/* Vehicle Inventory Table */}
                <div className="col-span-12 lg:col-span-9 space-y-6">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                        <div className="p-4 border-b border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50">
                            <div className="flex items-center gap-2">
                                <Truck className="text-blue-600 w-5 h-5" />
                                <h2 className="text-lg font-extrabold tracking-tight text-slate-900">Vehicle Master Inventory</h2>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="relative group">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm w-4 h-4 group-focus-within:text-blue-600 transition-colors" />
                                    <input
                                        className="pl-9 pr-4 py-2 rounded-lg bg-white border border-slate-200 text-sm w-full md:w-64 focus:ring-2 focus:ring-blue-600 outline-none transition-all shadow-sm"
                                        placeholder="Search Chassis, Driver, Type..."
                                        type="text"
                                    />
                                </div>
                                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-md shadow-blue-600/20 transition-all active:scale-95">
                                    <PlusCircle className="w-4 h-4" /> Add Vehicle
                                </button>
                            </div>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border-b border-slate-200">
                                        <th className="px-6 py-4">Vehicle Identity</th>
                                        <th className="px-6 py-4">Chassis No.</th>
                                        <th className="px-6 py-4">Engine Specs</th>
                                        <th className="px-6 py-4 text-center">Capacity</th>
                                        <th className="px-6 py-4">Assigned Driver</th>
                                        <th className="px-6 py-4">Status</th>
                                        <th className="px-6 py-4 text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-100">
                                    {isLoading ? (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-8 text-center text-slate-500 font-bold">
                                                <div className="flex justify-center items-center gap-2">
                                                    <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                                                    <span>Syncing Fleet Data...</span>
                                                </div>
                                            </td>
                                        </tr>
                                    ) : filteredVehicles.length === 0 ? (
                                        <tr>
                                            <td colSpan={7} className="px-6 py-8 text-center text-slate-500 font-bold">
                                                No vehicles found with status "{filterStatus}".
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredVehicles.map(v => (
                                            <tr key={v.id} className="hover:bg-blue-50/50 transition-colors group">
                                                <td className="px-6 py-4">
                                                    <div className="font-black text-slate-900">{v.id}</div>
                                                    <div className="text-[10px] text-blue-600 font-bold uppercase">{v.type}</div>
                                                </td>
                                                <td className="px-6 py-4 text-xs font-mono text-slate-500">{v.chassis}</td>
                                                <td className="px-6 py-4">
                                                    <div className="text-xs font-semibold text-slate-700">{v.engine}</div>
                                                    <div className="text-[10px] text-slate-400">{v.hp}</div>
                                                </td>
                                                <td className="px-6 py-4 text-center">
                                                    <span className="bg-slate-100 px-2 py-1 rounded text-xs font-bold text-slate-600">{v.capacity}</span>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className={`w-8 h-8 rounded-full bg-${v.color}-100 flex items-center justify-center text-[10px] font-bold text-${v.color}-600 ring-2 ring-white`}>{v.initials}</div>
                                                        <div className="text-sm">
                                                            <p className="font-bold leading-none text-slate-900">{v.driver}</p>
                                                            <p className="text-[10px] text-slate-500">ID: {v.driverId}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase ${v.status === 'Available' ? 'bg-emerald-100 text-emerald-600' :
                                                        v.status === 'On Trip' ? 'bg-blue-50 text-blue-600' :
                                                            v.status === 'Maintenance' ? 'bg-amber-100 text-amber-600' :
                                                                'bg-slate-100 text-slate-600'
                                                        }`}>
                                                        <span className={`w-2 h-2 rounded-full ${v.status === 'Available' ? 'bg-emerald-500' :
                                                            v.status === 'On Trip' ? 'bg-blue-600' :
                                                                v.status === 'Maintenance' ? 'bg-amber-500' :
                                                                    'bg-slate-500'
                                                            }`}></span> {v.status}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-4 text-right">
                                                    <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 transition-colors group-hover:text-blue-600">
                                                        <ExternalLink className="w-4 h-4" />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                        <div className="p-4 border-t border-slate-200 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <select className="bg-slate-100 border-none rounded text-[10px] font-bold py-1 px-2 text-slate-600 focus:ring-0">
                                    <option>Show 10</option>
                                    <option>Show 25</option>
                                </select>
                                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Showing {filteredVehicles.length} Vehicles</span>
                            </div>
                            <div className="flex items-center gap-1">
                                <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-100 text-slate-500 hover:text-blue-600 transition-colors">
                                    <ChevronLeft className="w-4 h-4" />
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded bg-blue-600 text-white font-bold text-xs shadow-sm">1</button>
                                <button className="w-8 h-8 flex items-center justify-center rounded bg-slate-100 text-slate-500 hover:text-blue-600 transition-colors">
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Compliance Sidebar */}
                <aside className="col-span-12 lg:col-span-3 space-y-6">
                    <div className="bg-white rounded-xl border border-slate-200 shadow-sm flex flex-col h-full sticky top-24">
                        <div className="p-5 border-b border-slate-200 flex items-center justify-between bg-slate-50">
                            <h2 className="text-sm font-black uppercase tracking-widest flex items-center gap-2 text-slate-800">
                                <ShieldCheck className="text-amber-500 w-5 h-5" /> Compliance Tracking
                            </h2>
                            <span className="flex items-center justify-center w-6 h-6 rounded bg-red-500 text-white text-[10px] font-black shadow-sm">4</span>
                        </div>
                        <div className="p-4 space-y-4 overflow-y-auto max-h-[calc(100vh-320px)]">
                            <div className="p-4 rounded-xl bg-red-50 border-l-4 border-red-500 relative overflow-hidden group hover:shadow-sm transition-all">
                                <div className="absolute top-0 right-0 p-2 opacity-10">
                                    <AlertTriangle className="w-12 h-12" />
                                </div>
                                <div className="flex justify-between items-start mb-2 relative">
                                    <span className="text-[10px] font-black text-red-600 uppercase">Expired • RC Renewal</span>
                                    <span className="text-[10px] font-bold text-slate-500">TRK-9022</span>
                                </div>
                                <h4 className="text-sm font-extrabold text-slate-900 mb-1">Registration (RC)</h4>
                                <p className="text-[11px] text-slate-500 mb-3 leading-relaxed">Validity ended 3 days ago. Vehicle grounded immediately.</p>
                                <button className="w-full py-2 bg-red-500 hover:bg-red-600 text-white text-[10px] font-black uppercase rounded shadow-lg shadow-red-500/20 transition-all active:scale-95">Submit Renewal</button>
                            </div>

                            <div className="p-4 rounded-xl bg-amber-50 border-l-4 border-amber-500 relative group hover:shadow-sm transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] font-black text-amber-600 uppercase">Warning • 8 Days Left</span>
                                    <span className="text-[10px] font-bold text-slate-500">TRK-4410</span>
                                </div>
                                <h4 className="text-sm font-extrabold text-slate-900 mb-1">Insurance Policy</h4>
                                <p className="text-[11px] text-slate-500 leading-relaxed">Renewal due for Scania fleet. Premium quote pending approval.</p>
                                <div className="mt-3 flex items-center justify-between text-[10px] font-bold">
                                    <a className="text-blue-600 hover:underline cursor-pointer">Review Quote</a>
                                    <span className="text-amber-600 uppercase">Priority: High</span>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-amber-50 border-l-4 border-amber-500 group hover:shadow-sm transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] font-black text-amber-600 uppercase">Pending • 14 Days Left</span>
                                    <span className="text-[10px] font-bold text-slate-500">TRK-1042</span>
                                </div>
                                <h4 className="text-sm font-extrabold text-slate-900 mb-1">Fitness Certificate</h4>
                                <p className="text-[11px] text-slate-500 leading-relaxed">Scheduled for inspection at Depot B-2 on Nov 24.</p>
                            </div>

                            <div className="p-4 rounded-xl bg-blue-50 border-l-4 border-blue-600 group hover:shadow-sm transition-all">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-[10px] font-black text-blue-600 uppercase">Upcoming • National Permit</span>
                                    <span className="text-[10px] font-bold text-slate-500">6 Units</span>
                                </div>
                                <h4 className="text-sm font-extrabold text-slate-900 mb-1">Inter-state Permits</h4>
                                <p className="text-[11px] text-slate-500 leading-relaxed">Auto-renewal system active for 6 vehicles in Q4.</p>
                            </div>
                        </div>
                        <div className="p-4 bg-slate-50 border-t border-slate-200">
                            <button className="w-full group flex items-center justify-center gap-2 text-[10px] font-black uppercase text-slate-500 hover:text-blue-600 transition-all tracking-[0.1em]">
                                Full Compliance Report <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </button>
                        </div>
                    </div>
                </aside>
            </div>

            {/* Footer */}
            <footer className="bg-white border-t border-slate-200 py-4 px-6 text-[10px] font-bold text-slate-500 uppercase flex justify-between items-center tracking-widest rounded-xl shadow-sm">
                <div className="flex items-center gap-8">
                    <span className="flex items-center gap-2"><span className="w-2 h-2 bg-emerald-500 rounded-full"></span> {vehicles.filter(v => v.status === 'Available' || v.status === 'On Trip').length}/{vehicles.length} Operational</span>
                    <span className="flex items-center gap-2"><span className="w-2 h-2 bg-amber-500 rounded-full"></span> {vehicles.filter(v => v.status === 'Maintenance').length} Maintenance</span>
                    <span className="flex items-center gap-2"><span className="w-2 h-2 bg-red-500 rounded-full"></span> {vehicles.filter(v => v.status === 'Idle').length} Grounded</span>
                </div>
                <div className="flex items-center gap-4">
                    <span>System Sync: <span className="text-blue-600">Success</span></span>
                    <span className="text-slate-300">|</span>
                    <span className="flex items-center gap-1 font-black text-slate-700">Enterprise v5.2.0</span>
                </div>
            </footer>
        </div>
    );
};
