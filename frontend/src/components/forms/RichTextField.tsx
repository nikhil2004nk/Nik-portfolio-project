import * as React from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

interface RichTextFieldProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  error?: string;
  registration?: UseFormRegisterReturn;
}

export function RichTextField({ label, error, registration, ...props }: RichTextFieldProps) {
  return (
    <div className="space-y-2">
      <label className="block text-xs font-mono text-muted uppercase tracking-wider">
        {label} (Markdown/HTML supported)
      </label>
      <div className="border border-hairline rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-signal focus-within:border-signal transition-all duration-150">
        <div className="bg-panel border-b border-hairline p-2 flex gap-2">
          {/* Mock toolbar since tiptap was skipped */}
          <span className="text-xs font-mono text-muted p-1">B</span>
          <span className="text-xs font-mono text-muted p-1">I</span>
          <span className="text-xs font-mono text-muted p-1">Link</span>
        </div>
        <textarea
          {...registration}
          {...props}
          className={`w-full bg-ink px-4 py-3 text-primary focus:outline-none min-h-[200px] ${
            error ? 'bg-alert/5' : ''
          } ${props.className || ''}`}
        />
      </div>
      {error && <p className="text-xs text-alert font-mono">{error}</p>}
    </div>
  );
}
