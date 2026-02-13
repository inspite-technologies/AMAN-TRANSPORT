import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { cn } from '../../lib/utils';
import {
    LayoutDashboard,
    Users,
    Truck,
    Container,
    Globe,
    Factory,
    Calculator,
    FileBarChart,
    Share2,
    X
} from 'lucide-react';
import type { Role } from '../../types';

interface NavItem {
    title: string;
    href: string;
    icon: React.ElementType;
    roles: Role[];
}

const navItems: NavItem[] = [
    {
        title: "Dashboard",
        href: "/",
        icon: LayoutDashboard,
        roles: ['SUPER_ADMIN', 'HR_MANAGER', 'OPERATIONS_MANAGER', 'DISPATCHER', 'ACCOUNTANT', 'IMPORT_EXPORT_MANAGER', 'PRODUCTION_MANAGER', 'BRANCH_MANAGER']
    },
    {
        title: "HR & Payroll",
        href: "/hr",
        icon: Users,
        roles: ['SUPER_ADMIN', 'HR_MANAGER']
    },
    {
        title: "Fleet",
        href: "/fleet",
        icon: Truck,
        roles: ['SUPER_ADMIN', 'OPERATIONS_MANAGER', 'DISPATCHER', 'BRANCH_MANAGER']
    },
    {
        title: "Containers",
        href: "/containers",
        icon: Container,
        roles: ['SUPER_ADMIN', 'OPERATIONS_MANAGER', 'DISPATCHER']
    },
    {
        title: "Import / Export",
        href: "/import-export",
        icon: Globe,
        roles: ['SUPER_ADMIN', 'IMPORT_EXPORT_MANAGER']
    },
    {
        title: "Food Production",
        href: "/production",
        icon: Factory,
        roles: ['SUPER_ADMIN', 'PRODUCTION_MANAGER']
    },
    {
        title: "Finance",
        href: "/finance",
        icon: Calculator,
        roles: ['SUPER_ADMIN', 'ACCOUNTANT']
    },
    {
        title: "Reports",
        href: "/reports",
        icon: FileBarChart,
        roles: ['SUPER_ADMIN', 'HR_MANAGER', 'OPERATIONS_MANAGER', 'ACCOUNTANT', 'BRANCH_MANAGER']
    }
];

interface SidebarProps {
    isOpen: boolean;
    toggleSidebar: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, toggleSidebar }) => {
    const { user } = useAuth();

    const filteredNavItems = navItems.filter(item =>
        user && (item.roles.includes(user.role) || user.role === 'SUPER_ADMIN')
    );

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
                    onClick={toggleSidebar}
                />
            )}

            <aside className={cn(
                "fixed inset-y-0 left-0 z-50 w-64 bg-[#0F172A] text-slate-300 flex flex-col transition-transform duration-300 ease-in-out md:translate-x-0 md:static",
                isOpen ? "translate-x-0" : "-translate-x-full"
            )}>
                {/* Logo Area */}
                <div className="p-6 flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-700 rounded flex items-center justify-center">
                        <Share2 className="text-white w-5 h-5" />
                    </div>
                    <span className="text-xl font-bold tracking-tight text-white italic">
                        AMAN <span className="text-blue-500 not-italic">ERP</span>
                    </span>
                    <button onClick={toggleSidebar} className="md:hidden ml-auto">
                        <X className="w-5 h-5 text-current" />
                    </button>
                </div>

                {/* Navigation */}
                <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
                    <p className="px-4 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4">Core Modules</p>
                    {filteredNavItems.map((item) => (
                        <NavLink
                            key={item.href}
                            to={item.href}
                            className={({ isActive }) => cn(
                                "flex items-center px-4 py-3 rounded-lg transition-all group font-medium",
                                isActive
                                    ? "bg-blue-800 text-white shadow-md relative overflow-hidden"
                                    : "hover:bg-slate-800 hover:text-white"
                            )}
                            onClick={() => { if (window.innerWidth < 768) toggleSidebar() }}
                        >
                            <item.icon className="mr-3 w-5 h-5" />
                            {item.title}
                        </NavLink>
                    ))}
                </nav>

                {/* User Profile at Bottom */}
                <div className="p-4 bg-slate-900 mt-auto border-t border-slate-800">
                    <div className="flex items-center space-x-3 p-2 rounded-lg bg-slate-800/50">
                        {user?.avatar ? (
                            <img src={user.avatar} alt="Profile" className="w-9 h-9 rounded-full object-cover border border-slate-700" />
                        ) : (
                            <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center text-white font-bold">
                                {user?.name?.charAt(0)}
                            </div>
                        )}
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-white truncate">{user?.name}</p>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">{user?.role.replace('_', ' ')}</p>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
};
