import React from 'react';
import { useCompany } from '../../context/CompanyContext';
import { Building2, Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '../../lib/utils';

export const CompanySwitcher: React.FC = () => {
    const { currentCompany, availableCompanies, setCompany } = useCompany();
    const [open, setOpen] = React.useState(false);

    // Close dropdown when clicking outside
    const dropdownRef = React.useRef<HTMLDivElement>(null);

    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                onClick={() => setOpen(!open)}
                className="flex items-center justify-between w-[200px] px-3 py-2 text-sm border rounded-md hover:bg-accent hover:text-accent-foreground border-input bg-transparent"
            >
                <div className="flex items-center gap-2 truncate">
                    <Building2 className="w-4 h-4 shrink-0 opacity-50" />
                    <span className="truncate">{currentCompany.name}</span>
                </div>
                <ChevronsUpDown className="w-4 h-4 shrink-0 opacity-50" />
            </button>

            {open && (
                <div className="absolute top-full left-0 z-50 w-[200px] mt-1 bg-popover text-popover-foreground border rounded-md shadow-md">
                    <div className="p-1">
                        {availableCompanies.map((company) => (
                            <div
                                key={company.id}
                                onClick={() => {
                                    setCompany(company.id);
                                    setOpen(false);
                                }}
                                className={cn(
                                    "relative flex items-center px-2 py-1.5 text-sm rounded-sm cursor-pointer select-none hover:bg-accent hover:text-accent-foreground",
                                    currentCompany.id === company.id && "bg-accent"
                                )}
                            >
                                <Check
                                    className={cn(
                                        "w-4 h-4 mr-2",
                                        currentCompany.id === company.id ? "opacity-100" : "opacity-0"
                                    )}
                                />
                                <span className="truncate">{company.name}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};
