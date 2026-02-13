import React, { useState } from 'react';
import {
    Factory,
    RefreshCw,
    Leaf,
    PlusSquare,
    TrendingUp,
    DollarSign,
    Activity,
    AlertTriangle,
    PlusCircle,
    Package,
    X
} from 'lucide-react';

// Types
interface Material {
    id: string;
    name: string;
    stock: number;
    unit: string;
    minStock: number;
    color: string;
}

interface Batch {
    id: string;
    product: string;
    status: 'In Progress' | 'QC Passed' | 'Shipped' | 'Failed';
    plannedKg: number;
    actualKg: number;
    efficiency: number;
    date: string;
}

export const ProductionPage: React.FC = () => {
    // --- State Management ---
    const [rawMaterials, setRawMaterials] = useState<Material[]>([
        { id: 'RM1', name: 'Sona Masuri Rice', stock: 1420, unit: 'kg', minStock: 500, color: 'bg-blue-600' },
        { id: 'RM2', name: 'Urad Dal (Split)', stock: 185, unit: 'kg', minStock: 200, color: 'bg-red-500' }
    ]);

    const [finishedGoods] = useState([
        { id: 'FG1', name: 'Classic Batter (500g)', stock: 4120, unit: 'pkts', target: 5000, color: 'bg-emerald-500' },
        { id: 'FG2', name: 'Idli Podi (250g)', stock: 890, unit: 'pkts', target: 2000, color: 'bg-emerald-500' }
    ]);

    const [activeBatch, setActiveBatch] = useState<Batch | null>({
        id: 'BT-2408-01',
        product: 'Classic Batter 500g',
        status: 'In Progress',
        plannedKg: 1000,
        actualKg: 978.2,
        efficiency: 97.8,
        date: '2024-08-01'
    });

    // Modals State
    const [isProcureModalOpen, setIsProcureModalOpen] = useState(false);
    const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);

    // Form States
    const [procureForm, setProcureForm] = useState({ materialId: 'RM1', amount: 0 });
    const [batchForm, setBatchForm] = useState({ product: 'Classic Batter 500g', plannedKg: 1000 });

    // --- Actions ---

    const handleProcurement = (e: React.FormEvent) => {
        e.preventDefault();
        setRawMaterials(prev => prev.map(m =>
            m.id === procureForm.materialId
                ? { ...m, stock: m.stock + Number(procureForm.amount) }
                : m
        ));
        setIsProcureModalOpen(false);
    };

    const handleStartBatch = (e: React.FormEvent) => {
        e.preventDefault();
        // Simple logic: Deduct raw materials roughly (65% Rice, 30% Dal for demo)
        const riceNeeded = batchForm.plannedKg * 0.65;
        const dalNeeded = batchForm.plannedKg * 0.30;

        if (rawMaterials[0].stock < riceNeeded || rawMaterials[1].stock < dalNeeded) {
            alert("Insufficient Funds! (Just kidding, Insufficient Stock)");
            return;
        }

        setRawMaterials(prev => prev.map(m => {
            if (m.id === 'RM1') return { ...m, stock: m.stock - riceNeeded };
            if (m.id === 'RM2') return { ...m, stock: m.stock - dalNeeded };
            return m;
        }));

        setActiveBatch({
            id: `BT-${Math.floor(Math.random() * 10000)}`,
            product: batchForm.product,
            status: 'In Progress',
            plannedKg: Number(batchForm.plannedKg),
            actualKg: 0,
            efficiency: 100,
            date: new Date().toISOString().split('T')[0]
        });
        setIsBatchModalOpen(false);
    };

    // Auto-Costing Logic (Derived State)
    const rawMatCost = 0.28;
    const packagingCost = 0.08;
    const utilityCost = 0.06;
    const totalCost = rawMatCost + packagingCost + utilityCost;
    const sellingPrice = 1.18;
    const profitMargin = sellingPrice - totalCost;

    return (
        <div className="flex flex-col h-[calc(100vh-4rem)] -m-6 bg-slate-50 dark:bg-slate-900 font-sans overflow-hidden relative">
            {/* Header */}
            <header className="sticky top-0 z-40 border-b border-white/5 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-6 py-3 shrink-0">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white shadow-lg shadow-blue-600/20">
                            <Factory className="w-6 h-6" />
                        </div>
                        <div>
                            <h1 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">Food Production & Yield Tracker</h1>
                            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-wider leading-none">SRS Section 9: Production Management</p>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex flex-1 overflow-hidden">
                {/* Sidebar */}
                <aside className="w-80 border-r border-white/5 bg-slate-50 dark:bg-slate-900/30 p-6 flex flex-col gap-6 shrink-0 overflow-y-auto">
                    <section>
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 flex items-center gap-2">
                                <Leaf className="w-4 h-4" /> Raw Materials
                            </h2>
                            <RefreshCw className="w-4 h-4 text-slate-400 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => setRawMaterials([...rawMaterials])} />
                        </div>
                        <div className="space-y-4">
                            {rawMaterials.map(mat => (
                                <div key={mat.id} className="bg-white dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium text-slate-500 dark:text-slate-400">{mat.name}</span>
                                        <span className={`font-bold ${mat.stock < mat.minStock ? 'text-red-500' : 'text-slate-900 dark:text-white'}`}>
                                            {mat.stock.toFixed(1)} {mat.unit}
                                        </span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div className={`h-full ${mat.stock < mat.minStock ? 'bg-red-500' : 'bg-blue-600'}`} style={{ width: `${Math.min(100, (mat.stock / 2000) * 100)}%` }}></div>
                                    </div>
                                    {mat.stock < mat.minStock && (
                                        <p className="text-[9px] text-red-500 mt-1 uppercase font-bold tracking-tighter flex items-center gap-1">
                                            <AlertTriangle className="w-3 h-3" /> Low Stock Warning
                                        </p>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="mt-6">
                        <div className="flex items-center justify-between mb-4">
                            <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-500 flex items-center gap-2">
                                <Package className="w-4 h-4" /> Finished Goods
                            </h2>
                        </div>
                        <div className="space-y-4">
                            {finishedGoods.map(good => (
                                <div key={good.id} className="bg-white dark:bg-slate-800/50 p-3 rounded-xl border border-slate-200 dark:border-white/5 shadow-sm">
                                    <div className="flex justify-between text-sm mb-1">
                                        <span className="font-medium text-slate-500 dark:text-slate-400">{good.name}</span>
                                        <span className="font-bold text-slate-900 dark:text-white">{good.stock} {good.unit}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                                        <div className={`h-full ${good.color}`} style={{ width: `${Math.min(100, (good.stock / good.target) * 100)}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <div className="mt-auto space-y-4 pt-6 border-t border-slate-200 dark:border-white/5">
                        <div className="p-4 bg-blue-50 dark:bg-blue-600/10 rounded-2xl border border-blue-100 dark:border-blue-600/20">
                            <p className="text-[10px] uppercase font-bold text-blue-600 mb-1">Stock Valuation</p>
                            <p className="text-xl font-black text-slate-900 dark:text-white">$42,850.00</p>
                        </div>
                        <button
                            onClick={() => setIsProcureModalOpen(true)}
                            className="w-full py-3 bg-blue-600 text-white text-xs font-bold rounded-xl shadow-lg shadow-blue-600/20 hover:bg-blue-700 transition-all flex items-center justify-center gap-2"
                        >
                            <PlusSquare className="w-4 h-4" /> New Procurement
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 p-8 overflow-y-auto space-y-8 bg-slate-50 dark:bg-slate-900">
                    {/* KPI Grid */}
                    <div className="grid grid-cols-4 gap-6">
                        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
                            <p className="text-xs font-semibold text-slate-500 uppercase">Avg. Yield Rate</p>
                            <div className="flex items-end justify-between mt-2">
                                <h4 className="text-3xl font-bold text-slate-900 dark:text-white">98.4%</h4>
                                <span className="text-emerald-500 text-[10px] font-bold flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" /> +1.2%
                                </span>
                            </div>
                        </div>
                        {/* More KPIs... omitting for brevity, they are static for now */}
                        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-white/5 shadow-sm">
                            <p className="text-xs font-semibold text-slate-500 uppercase">Daily Output</p>
                            <div className="flex items-end justify-between mt-2">
                                <h4 className="text-3xl font-bold text-slate-900 dark:text-white">12.5k</h4>
                                <span className="text-slate-400 text-[10px] font-bold">Units Produced</span>
                            </div>
                        </div>
                    </div>

                    {/* Active Batch & Operations */}
                    {activeBatch && (
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                            <div className="lg:col-span-2 space-y-6">
                                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/5 rounded-2xl overflow-hidden shadow-sm">
                                    <div className="p-4 border-b border-slate-200 dark:border-white/5 bg-slate-50/50 dark:bg-slate-800/30 flex justify-between items-center">
                                        <div>
                                            <h3 className="font-bold text-sm text-slate-900 dark:text-white">BATCH #{activeBatch.id}</h3>
                                            <p className="text-[10px] text-slate-500 uppercase">Product: {activeBatch.product}</p>
                                        </div>
                                        <span className="px-2 py-1 rounded bg-amber-500/10 text-amber-500 text-[10px] font-bold border border-amber-500/20 uppercase tracking-widest flex items-center gap-1">
                                            <Activity className="w-3 h-3 animate-pulse" /> {activeBatch.status}
                                        </span>
                                    </div>
                                    <div className="p-6 grid grid-cols-2 gap-8">
                                        <div className="space-y-4">
                                            <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Yield Tracking</h4>
                                            <div className="space-y-3">
                                                <div className="flex justify-between text-xs">
                                                    <span className="text-slate-500">Current Efficiency</span>
                                                    <span className="font-bold text-blue-600">{activeBatch.efficiency}%</span>
                                                </div>
                                                <div className="h-2 w-full bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                                                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${activeBatch.efficiency}%` }}></div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-2 mt-4">
                                                    <div className="p-2 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
                                                        <p className="text-[10px] text-slate-500 uppercase">Planned (Kg)</p>
                                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{activeBatch.plannedKg}</p>
                                                    </div>
                                                    <div className="p-2 bg-slate-50 dark:bg-slate-700/30 rounded-lg">
                                                        <p className="text-[10px] text-slate-500 uppercase">Actual (Kg)</p>
                                                        <p className="text-sm font-bold text-slate-900 dark:text-white">{activeBatch.actualKg}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Costing Card (Dynamic) */}
                            <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                                <h2 className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-6 flex items-center gap-2">
                                    <DollarSign className="w-4 h-4" /> Production Costing (Auto-Calc)
                                </h2>
                                <div className="grid grid-cols-4 gap-4">
                                    <div className="p-4 bg-slate-50 dark:bg-slate-700/30 rounded-xl border border-slate-100 dark:border-white/5">
                                        <p className="text-[10px] text-slate-500 uppercase font-bold mb-1">Raw Mat. Cost</p>
                                        <p className="text-xl font-black text-slate-900 dark:text-white">${rawMatCost}</p>
                                    </div>
                                    <div className="p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10">
                                        <p className="text-[10px] text-emerald-500 uppercase font-bold mb-1">Profit Margin</p>
                                        <p className="text-xl font-black text-emerald-500">${profitMargin.toFixed(2)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {!activeBatch && (
                        <div className="flex items-center justify-center h-64 bg-slate-100 dark:bg-slate-800 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700">
                            <div className="text-center">
                                <Factory className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                                <h3 className="text-lg font-bold text-slate-600 dark:text-slate-300">No Active Batch</h3>
                                <p className="text-sm text-slate-500">Start a new batch to track production.</p>
                            </div>
                        </div>
                    )}

                    <div className="flex items-center justify-between pt-6 border-t border-slate-200 dark:border-white/5">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsBatchModalOpen(true)}
                                className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 flex items-center gap-2 hover:bg-blue-700 transition-all"
                            >
                                <PlusCircle className="w-4 h-4" /> Start New Batch
                            </button>
                        </div>
                    </div>
                </main>
            </div>

            {/* --- Modals --- */}

            {isProcureModalOpen && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl w-96 shadow-2xl border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">New Procurement</h3>
                            <button onClick={() => setIsProcureModalOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
                        </div>
                        <form onSubmit={handleProcurement} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Material</label>
                                <select
                                    className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                                    value={procureForm.materialId}
                                    onChange={e => setProcureForm({ ...procureForm, materialId: e.target.value })}
                                >
                                    {rawMaterials.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Quantity ({['RM1'].includes(procureForm.materialId) ? 'kg' : 'kg'})</label>
                                <input
                                    type="number"
                                    className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
                                    value={procureForm.amount}
                                    onChange={e => setProcureForm({ ...procureForm, amount: Number(e.target.value) })}
                                    min="1"
                                />
                            </div>
                            <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
                                Add to Inventory
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {isBatchModalOpen && (
                <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white dark:bg-slate-900 p-8 rounded-2xl w-96 shadow-2xl border border-slate-200 dark:border-slate-700 animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Start Production Batch</h3>
                            <button onClick={() => setIsBatchModalOpen(false)}><X className="w-5 h-5 text-slate-400" /></button>
                        </div>
                        <form onSubmit={handleStartBatch} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Product Line</label>
                                <select
                                    className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-medium"
                                    value={batchForm.product}
                                    onChange={e => setBatchForm({ ...batchForm, product: e.target.value })}
                                >
                                    <option>Classic Batter 500g</option>
                                    <option>Idli Podi 250g</option>
                                    <option>Malabar Parotta</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Planned Output (Kg)</label>
                                <input
                                    type="number"
                                    className="w-full p-3 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 font-bold"
                                    value={batchForm.plannedKg}
                                    onChange={e => setBatchForm({ ...batchForm, plannedKg: Number(e.target.value) })}
                                    min="10"
                                />
                            </div>
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-xs text-blue-800 dark:text-blue-300">
                                <p><strong>Est. Material Usage:</strong></p>
                                <ul className="list-disc pl-4 mt-1 space-y-1">
                                    <li>Rice: {(batchForm.plannedKg * 0.65).toFixed(1)} kg</li>
                                    <li>Dal: {(batchForm.plannedKg * 0.30).toFixed(1)} kg</li>
                                </ul>
                            </div>
                            <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors">
                                Start Batch
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};
