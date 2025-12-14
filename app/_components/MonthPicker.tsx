"use client";

import { useState, useEffect } from "react";

interface MonthPickerProps {
  label?: string;
  selectedMonth: string; // YYYY-MM
  minMonth?: string; // YYYY-MM
  onChange: (month: string) => void;
}

const MonthPicker = ({ label, selectedMonth, minMonth, onChange }: MonthPickerProps) => {
  const [viewYear, setViewYear] = useState(new Date().getFullYear());
  
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  useEffect(() => {
    if (selectedMonth) {
        const year = parseInt(selectedMonth.split('-')[0]);
        if (!isNaN(year)) setViewYear(year);
    } else if (minMonth) {
        const year = parseInt(minMonth.split('-')[0]);
        if (!isNaN(year)) setViewYear(year);
    }
  }, [selectedMonth, minMonth]);

  return (
    <div>
        {label && (
            <label className="block text-sm font-medium text-slate-700 mb-2">
                {label}
            </label>
        )}
        <div className="border border-slate-200 rounded-xl p-4 bg-white">
            <div className="flex items-center justify-between mb-4">
            <button 
                onClick={() => setViewYear(viewYear - 1)}
                disabled={minMonth ? viewYear < new Date(minMonth).getFullYear() : false}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600 disabled:opacity-30 disabled:hover:bg-transparent"
                type="button"
            >
                ←
            </button>
            <div className="font-bold text-slate-800 text-lg">
                {viewYear}
            </div>
            <button 
                onClick={() => setViewYear(viewYear + 1)}
                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-600"
                type="button"
            >
                →
            </button>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
            {monthNames.map((mName, index) => {
                const monthNum = index + 1;
                const monthStr = `${viewYear}-${String(monthNum).padStart(2, '0')}`;
                
                const isSelected = selectedMonth === monthStr;
                // Disable if minMonth provided and monthStr < minMonth
                // Simple string comparison works for YYYY-MM logic
                const isDisabled = minMonth ? monthStr < minMonth : false;
                
                return (
                    <button
                    key={monthStr}
                    onClick={() => onChange(monthStr)}
                    disabled={isDisabled}
                    type="button"
                    className={`
                        py-2 rounded-lg text-sm font-medium transition-all duration-200
                        ${isSelected 
                        ? 'bg-gradient-to-r from-[#4a90e2] to-[#50e3c2] text-white shadow-md transform scale-105' 
                        : isDisabled
                            ? 'bg-slate-50 text-slate-300 cursor-not-allowed'
                            : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-100 hover:border-slate-200'
                        }
                    `}
                    >
                    {mName}
                    </button>
                );
            })}
            </div>
        </div>
    </div>
  );
};

export default MonthPicker;
