import * as React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface TextAreaFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  registration?: UseFormRegisterReturn;
}

export function TextAreaField({ label, error, registration, ...props }: TextAreaFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-mono text-muted uppercase tracking-wider">
        {label}
      </label>
      <textarea
        {...registration}
        {...props}
        className={`w-full bg-ink border rounded-md px-4 py-3 text-primary focus:outline-none focus:ring-2 focus:ring-signal focus:border-signal transition-all duration-150 min-h-[120px] ${
          error ? 'border-alert/50 focus:ring-alert' : 'border-hairline'
        } ${props.className || ''}`}
      />
      {error && <p className="text-xs text-alert font-mono">{error}</p>}
    </div>
  );
}
