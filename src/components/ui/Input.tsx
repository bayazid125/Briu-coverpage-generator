import React, { InputHTMLAttributes } from 'react';
import { cn } from '../../utils/cn';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, id, ...props }, ref) => {
    const inputId = id || label.replace(/\s+/g, '-').toLowerCase();
    return (
      <div className="space-y-1.5 w-full">
        <label htmlFor={inputId} className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase ml-1">
          {label}
        </label>
        <input
          id={inputId}
          ref={ref}
          className={cn(
            "w-full bg-white/50 dark:bg-black/50 border border-white/60 dark:border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all text-slate-800 dark:text-slate-200 placeholder:text-slate-400 shadow-sm",
            className
          )}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';
