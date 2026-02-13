import React, { useState } from 'react';
import {
    PlusCircle,
    Filter,
    RefreshCw,
    MapPin,
    Box,
    Truck,
    Clock,
    AlertTriangle,
    CheckCircle,
    Search,
    X,
    Anchor,
    Plus,
    AlertOctagon,
    Gavel,
    FileText,
    Loader2
} from 'lucide-react';
import { containerService, type ContainerJob } from '../../services/containerService';

export const ContainerPage: React.FC = () => {
    const [selectedJob, setSelectedJob] = useState<ContainerJob | null>(null);
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [jobs, setJobs] = useState<ContainerJob[]>([]);
    const [stats, setStats] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);

    React.useEffect(() => {
        const loadData = async () => {
            setIsLoading(true);
            try {
                const [jobsData, statsData] = await Promise.all([
                    containerService.getJobs(),
                    containerService.getStats()
                ]);
                setJobs(jobsData);
                setStats(statsData);
            } catch (error) {
                console.error("Failed to load container data", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadData();
    }, []);

    const handleJobClick = (job: any) => {
        setSelectedJob(job);
        setIsDrawerOpen(true);
    };

    const handleCreateJob = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        // Extract form data (mock implementation as form is not fully controlled here for brevity in this step)
        // In a real scenario, use state for form inputs.
        const formData = { customer: 'New Client', origin: 'Port' };
        try {
            const newJob = await containerService.createJob(formData);
            setJobs(prev => [newJob, ...prev]);
            setIsDrawerOpen(false);
        } catch (error) {
            console.error("Failed to create job", error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] -m-6 bg-slate-50 dark:bg-slate-900 font-sans overflow-hidden">
            {/* Module Header */}
            <header className="h-16 border-b border-blue-600/10 bg-white/50 backdrop-blur-md flex items-center justify-between px-6 z-40 shrink-0">
                <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20">
                        <Box className="text-white w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Container Operations</h1>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-blue-600 font-bold italic">SRS Section 6 Compliant</p>
                    </div>
                </div>
                <div className="flex items-center gap-6">
                    <button
                        onClick={handleCreateJob}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-600/20"
                    >
                        <PlusCircle className="w-4 h-4" />
                        Create Job
                    </button>
                    <div className="h-8 w-[1px] bg-slate-200 dark:bg-slate-700"></div>
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-semibold text-slate-900 dark:text-white">Robert Chen</span>
                            <span className="text-[10px] uppercase tracking-wider text-slate-400">Control Officer</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-blue-600/20">
                            <img alt="Profile" className="w-full h-full object-cover" src="https://ui-avatars.com/api/?name=Robert+Chen&background=random" />
                        </div>
                    </div>
                </div>
            </header>

            {/* Stats Row */}
            <div className="grid grid-cols-4 gap-4 p-4 bg-slate-900/5 border-b border-blue-600/5 shrink-0">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-blue-600/10 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Containers</p>
                            <h3 className="text-2xl font-black mt-1 text-slate-900 dark:text-white">
                                {isLoading ? <Loader2 className="w-6 h-6 animate-spin text-blue-600" /> : stats?.active}
                            </h3>
                        </div>
                        <div className="p-2 bg-blue-600/10 text-blue-600 rounded-lg">
                            <Box className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="mt-2 flex items-center gap-1">
                        <span className="text-[10px] text-emerald-500 font-bold">+12%</span>
                        <span className="text-[10px] text-slate-500">vs yesterday</span>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-blue-600/10 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Waiting at Port</p>
                            <h3 className="text-2xl font-black mt-1 text-slate-900 dark:text-white">
                                {isLoading ? <Loader2 className="w-6 h-6 animate-spin text-amber-500" /> : stats?.waiting}
                            </h3>
                        </div>
                        <div className="p-2 bg-amber-500/10 text-amber-500 rounded-lg">
                            <Anchor className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="mt-2 flex items-center gap-1">
                        <span className="text-[10px] text-amber-500 font-bold">High Traffic</span>
                        <span className="text-[10px] text-slate-500">Avg: 2.4h</span>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-blue-600/10 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Delivered Today</p>
                            <h3 className="text-2xl font-black mt-1 text-emerald-500">
                                {isLoading ? <Loader2 className="w-6 h-6 animate-spin text-emerald-500" /> : stats?.delivered}
                            </h3>
                        </div>
                        <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg">
                            <CheckCircle className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="mt-2 flex items-center gap-1">
                        <span className="text-[10px] text-emerald-500 font-bold">94% Target</span>
                        <span className="text-[10px] text-slate-500">of daily quota</span>
                    </div>
                </div>
                <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-blue-600/10 shadow-sm">
                    <div className="flex justify-between items-start">
                        <div>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Delayed Trips</p>
                            <h3 className="text-2xl font-black mt-1 text-rose-500">
                                {isLoading ? <Loader2 className="w-6 h-6 animate-spin text-rose-500" /> : stats?.delayed}
                            </h3>
                        </div>
                        <div className="p-2 bg-rose-500/10 text-rose-500 rounded-lg">
                            <AlertTriangle className="w-6 h-6" />
                        </div>
                    </div>
                    <div className="mt-2 flex items-center gap-1">
                        <span className="text-[10px] text-rose-500 font-bold">Action Req.</span>
                        <span className="text-[10px] text-slate-500">Critical Status</span>
                    </div>
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 flex overflow-hidden relative">
                {/* Left Listing Column */}
                <section className="w-1/3 min-w-[350px] max-w-[450px] flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
                    <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-800/50">
                        <h2 className="font-bold text-sm flex items-center gap-2 text-slate-800 dark:text-white">
                            <Box className="text-blue-600 w-5 h-5" />
                            Container Lifecycle
                        </h2>
                        <div className="flex gap-1">
                            <button className="p-1 hover:bg-blue-50 rounded text-slate-500"><Filter className="w-4 h-4" /></button>
                            <button className="p-1 hover:bg-blue-50 rounded text-slate-500"><RefreshCw className="w-4 h-4" /></button>
                        </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-3 space-y-3 bg-slate-50 dark:bg-slate-900/20">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-10 text-slate-400 gap-3">
                                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                                <span className="text-xs font-bold">Loading Operations...</span>
                            </div>
                        ) : jobs.length === 0 ? (
                            <div className="text-center py-10 text-slate-400 text-xs font-bold">
                                No active jobs found.
                            </div>
                        ) : (
                            jobs.map((job) => (
                                <div
                                    key={job.id}
                                    onClick={() => handleJobClick(job)}
                                    className={`p-4 bg-white dark:bg-slate-800 border rounded-xl hover:border-blue-400 transition-all cursor-pointer shadow-sm group ${selectedJob?.id === job.id ? 'border-blue-600 ring-1 ring-blue-600' : 'border-slate-200 dark:border-slate-700'
                                        } ${job.statusColor === 'blue' ? 'border-l-4 border-l-blue-600' :
                                            job.statusColor === 'rose' ? 'border-l-4 border-l-rose-500' :
                                                job.statusColor === 'emerald' ? 'border-l-4 border-l-emerald-500' : ''
                                        }`}
                                >
                                    <div className="flex justify-between items-start mb-3">
                                        <div>
                                            <span className={`text-[10px] font-bold block mb-1 ${job.statusColor === 'blue' ? 'text-blue-600' :
                                                job.statusColor === 'rose' ? 'text-rose-500' :
                                                    'text-slate-400'
                                                }`}>ID: {job.id}</span>
                                            <h4 className="text-sm font-bold text-slate-900 dark:text-white">{job.client}</h4>
                                        </div>
                                        <span className={`px-2 py-1 rounded text-[9px] font-bold uppercase tracking-wider border ${job.statusColor === 'blue' ? 'bg-blue-50 text-blue-600 border-blue-100' :
                                            job.statusColor === 'rose' ? 'bg-rose-50 text-rose-500 border-rose-100' :
                                                job.statusColor === 'emerald' ? 'bg-emerald-50 text-emerald-600 border-emerald-100' :
                                                    'bg-slate-100 text-slate-500 border-slate-200'
                                            }`}>{job.status}</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-[11px] mb-3">
                                        <div className="flex items-center gap-2 text-slate-500">
                                            <MapPin className="w-3 h-3" />
                                            <span className="truncate">{job.location}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-slate-500">
                                            <Box className="w-3 h-3" />
                                            <span>{job.type}</span>
                                        </div>
                                    </div>
                                    {job.issue && (
                                        <p className="text-[11px] text-rose-500 font-medium mb-3 bg-rose-50 p-2 rounded border border-rose-100 flex items-center gap-2">
                                            <AlertTriangle className="w-3 h-3" /> {job.issue}
                                        </p>
                                    )}
                                    <div className="pt-3 border-t border-slate-100 dark:border-slate-700 flex justify-between items-center">
                                        <span className="text-[10px] font-bold text-blue-600">Next: {job.nextStep}</span>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </section>

                {/* Center Map Area */}
                <section className="flex-1 relative bg-slate-100 dark:bg-slate-900 overflow-hidden">
                    {/* Map Placeholder Image */}
                    <div className="absolute inset-0 opacity-80 mix-blend-multiply">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg"
                            className="w-full h-full object-cover grayscale opacity-20"
                            alt="Map Background"
                        />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-300 font-bold text-6xl opacity-10 uppercase tracking-widest pointer-events-none">
                            Live Map View
                        </div>
                    </div>

                    {/* Map Overlays */}
                    <div className="absolute top-6 left-6 flex flex-col gap-2 z-10">
                        <div className="bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-lg border border-blue-600/10 flex flex-col gap-1">
                            <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-slate-600"><PlusCircle className="w-4 h-4" /></button>
                            <div className="h-[1px] bg-slate-200 mx-1"></div>
                            <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-slate-600"><X className="w-4 h-4 rotate-45" /></button>
                        </div>
                        <div className="bg-white/90 backdrop-blur-md p-2 rounded-xl shadow-lg border border-blue-600/10">
                            <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors text-blue-600"><MapPin className="w-4 h-4" /></button>
                        </div>
                    </div>

                    <div className="absolute top-6 right-6 w-72 bg-white/90 backdrop-blur-md p-4 rounded-xl border border-blue-600/10 shadow-xl z-10">
                        <div className="relative mb-4">
                            <input className="w-full bg-slate-50 border-none rounded-lg py-2 pl-9 text-xs focus:ring-1 focus:ring-blue-600 shadow-inner" placeholder="Search vehicle or zone..." type="text" />
                            <Search className="absolute left-2 top-2 text-slate-400 w-4 h-4" />
                        </div>
                        <div className="space-y-2">
                            <div className="flex justify-between items-center text-[10px] font-bold p-2 bg-slate-50 rounded border border-slate-100">
                                <span className="text-slate-500">Total Tracked</span>
                                <span className="text-blue-600">156 Units</span>
                            </div>
                            <div className="flex justify-between items-center text-[10px] font-bold p-2 bg-slate-50 rounded border border-slate-100">
                                <span className="text-slate-500">Geo-Fence Alerts</span>
                                <span className="text-rose-500">03 Active</span>
                            </div>
                        </div>
                    </div>

                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-slate-900/80 backdrop-blur-md px-6 py-3 rounded-full border border-white/10 flex gap-6 shadow-2xl z-10">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">In Route</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-amber-500"></div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Stationary</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-rose-500"></div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Delayed</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-300">Delivered</span>
                        </div>
                    </div>
                </section>

                {/* Right Drawer (Dynamic) */}
                <div
                    className={`absolute right-0 top-0 h-full w-[400px] bg-white dark:bg-slate-900 shadow-2xl border-l border-blue-600/20 z-50 flex flex-col transition-transform duration-300 ease-in-out ${isDrawerOpen ? 'translate-x-0' : 'translate-x-full'}`}
                >
                    <div className="p-6 border-b border-blue-600/10 flex justify-between items-center bg-blue-50/50">
                        <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                            {selectedJob ? 'Job Details' : 'New Container Job'}
                        </h2>
                        <button onClick={() => setIsDrawerOpen(false)} className="text-slate-400 hover:text-rose-500 transition-colors">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="p-6 space-y-6 flex-1 overflow-y-auto">
                        {selectedJob ? (
                            /* Job Details View */
                            <div className="space-y-6">
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                                    <div className="flex justify-between items-center mb-2">
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Job Status</span>
                                        <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${selectedJob.statusColor === 'blue' ? 'bg-blue-100 text-blue-600' :
                                            selectedJob.statusColor === 'rose' ? 'bg-rose-100 text-rose-600' :
                                                selectedJob.statusColor === 'emerald' ? 'bg-emerald-100 text-emerald-600' :
                                                    'bg-slate-200 text-slate-600'
                                            }`}>{selectedJob.status}</span>
                                    </div>
                                    <h3 className="text-xl font-black text-slate-900 mb-1">{selectedJob.client}</h3>
                                    <p className="text-xs font-bold text-slate-500">{selectedJob.id}</p>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">Assigned Driver</p>
                                        <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                            <Truck className="w-4 h-4 text-blue-600" /> {selectedJob.driver}
                                        </p>
                                    </div>
                                    <div className="p-3 bg-white border border-slate-100 rounded-lg shadow-sm">
                                        <p className="text-[10px] text-slate-400 font-bold uppercase mb-1">ETA</p>
                                        <p className="text-sm font-bold text-slate-900 flex items-center gap-2">
                                            <Clock className="w-4 h-4 text-blue-600" /> {selectedJob.eta}
                                        </p>
                                    </div>
                                </div>

                                <div>
                                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">Activity Timeline</h4>
                                    <div className="space-y-6 relative border-l-2 border-slate-100 ml-2 pl-6">
                                        {selectedJob.timeline.map((event: any, index: number) => (
                                            <div key={index} className="relative">
                                                <div className={`absolute -left-[31px] w-4 h-4 rounded-full border-2 border-white shadow-sm ${event.done ? 'bg-blue-600' : 'bg-slate-300'
                                                    }`}></div>
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <p className={`text-sm font-bold ${event.done ? 'text-slate-900' : 'text-slate-400'}`}>{event.status}</p>
                                                        <p className="text-[10px] text-slate-500">{event.date}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="pt-4 flex gap-3">
                                    <button className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg shadow-lg shadow-blue-600/20 text-xs transition-all flex items-center justify-center gap-2">
                                        <FileText className="w-4 h-4" /> View Documents
                                    </button>
                                    <button className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold rounded-lg text-xs transition-all">
                                        Update Status
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* New Job Form */
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 block">Origin Port</label>
                                    <select className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-blue-600 outline-none">
                                        <option>Jebel Ali Terminal 1</option>
                                        <option>Rotterdam Gateway</option>
                                        <option>Shanghai North</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 block">Customer Entity</label>
                                    <select className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-blue-600 outline-none">
                                        <option>Global Trading Corp</option>
                                        <option>Oceanic Imports Ltd.</option>
                                        <option>Swift Manufacturing</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] mb-2 block">Cargo Category</label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button className="p-4 rounded-xl border border-blue-600 bg-blue-50 text-blue-600 flex flex-col items-center gap-2 transition-all">
                                            <Box className="w-6 h-6" />
                                            <span className="text-[10px] font-bold">Refrigerated</span>
                                        </button>
                                        <button className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-slate-50 flex flex-col items-center gap-2 transition-all text-slate-600">
                                            <AlertTriangle className="w-6 h-6" />
                                            <span className="text-[10px] font-bold">Hazmat</span>
                                        </button>
                                        <button className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-slate-50 flex flex-col items-center gap-2 transition-all text-slate-600">
                                            <Box className="w-6 h-6" />
                                            <span className="text-[10px] font-bold">General</span>
                                        </button>
                                        <button className="p-4 rounded-xl border border-slate-200 hover:border-blue-400 hover:bg-slate-50 flex flex-col items-center gap-2 transition-all text-slate-600">
                                            <AlertOctagon className="w-6 h-6" />
                                            <span className="text-[10px] font-bold">High Value</span>
                                        </button>
                                    </div>
                                </div>
                                <div className="pt-6 border-t border-slate-100 mt-6">
                                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-xl shadow-blue-600/20 transition-all flex items-center justify-center gap-2">
                                        <CheckCircle className="w-5 h-5" />
                                        Initialize SRS-Compliance Check
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="h-8 bg-slate-900 border-t border-blue-600/10 px-6 flex items-center justify-between text-[10px] font-bold tracking-widest text-slate-500 uppercase shrink-0">
                <div className="flex gap-6">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]"></span>
                        <span className="text-slate-400">Live Data Sync</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <Gavel className="w-3 h-3 opacity-50" />
                        <span className="text-slate-400">Compliance: ISO-9001:2024 Verified</span>
                    </div>
                </div>
                <div className="text-slate-600">
                    Enterprise Operations Suite v6.1.4 | Node: L-DX-09
                </div>
            </footer>
        </div>
    );
};
