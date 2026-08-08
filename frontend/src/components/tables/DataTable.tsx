import * as React from 'react';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { Button } from '../ui/Button';

interface Column<T> {
  header: string;
  accessor: keyof T | ((row: T) => React.ReactNode);
}

interface DataTableProps<T> {
  title: string;
  data: T[];
  columns: Column<T>[];
  onAdd?: () => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  loading?: boolean;
}

export function DataTable<T extends { id?: string }>({
  title,
  data,
  columns,
  onAdd,
  onEdit,
  onDelete,
  loading,
}: DataTableProps<T>) {
  return (
    <div className="bg-panel border border-hairline rounded-lg overflow-hidden">
      <div className="p-6 border-b border-hairline flex justify-between items-center bg-ink/50">
        <h2 className="text-xl font-display font-bold">{title}</h2>
        {onAdd && (
          <Button onClick={onAdd} variant="primary" size="sm" className="gap-2">
            <Plus className="w-4 h-4" /> Add New
          </Button>
        )}
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-panel border-b border-hairline">
              {columns.map((col, i) => (
                <th key={i} className="px-6 py-4 text-xs font-mono text-muted uppercase tracking-wider">
                  {col.header}
                </th>
              ))}
              {(onEdit || onDelete) && (
                <th className="px-6 py-4 text-xs font-mono text-muted uppercase tracking-wider text-right">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + 1} className="p-8 text-center text-muted font-mono animate-pulse">
                  Loading data...
                </td>
              </tr>
            ) : data.length === 0 ? (
              <tr>
                <td colSpan={columns.length + 1} className="p-8 text-center text-muted font-mono">
                  No records found.
                </td>
              </tr>
            ) : (
              data.map((row, i) => (
                <tr key={row.id || i} className="border-b border-hairline hover:bg-hairline/30 transition-colors">
                  {columns.map((col, j) => (
                    <td key={j} className="px-6 py-4 text-sm">
                      {typeof col.accessor === 'function'
                        ? col.accessor(row)
                        : (row[col.accessor] as React.ReactNode)}
                    </td>
                  ))}
                  {(onEdit || onDelete) && (
                    <td className="px-6 py-4 text-right space-x-2">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="p-2 text-muted hover:text-signal transition-colors rounded hover:bg-signal/10 inline-flex"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => onDelete(row)}
                          className="p-2 text-muted hover:text-alert transition-colors rounded hover:bg-alert/10 inline-flex"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
