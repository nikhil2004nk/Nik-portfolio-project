'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { adminApi } from '../../../lib/admin-api';
import { Trash2 } from 'lucide-react';

export default function AdminMessages() {
  const [items, setItems] = useState<any[]>([]);

  useEffect(() => { fetchItems(); }, []);

  const fetchItems = async () => {
    try { setItems(await adminApi.getMessages()); } catch (e) { console.error(e); }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete message?')) {
      try { await adminApi.deleteMessage(id); fetchItems(); } catch (error) {}
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold">Messages</h1>
      </div>

      <div className="bg-panel border border-hairline rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-hairline bg-ink">
              <th className="p-4 font-mono text-sm text-muted uppercase">Date</th>
              <th className="p-4 font-mono text-sm text-muted uppercase">Name</th>
              <th className="p-4 font-mono text-sm text-muted uppercase">Email / Phone</th>
              <th className="p-4 font-mono text-sm text-muted uppercase">Message</th>
              <th className="p-4 font-mono text-sm text-muted uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-hairline hover:bg-ink/50 align-top">
                <td className="p-4 whitespace-nowrap text-sm text-muted">{new Date(item.createdAt).toLocaleString()}</td>
                <td className="p-4 font-medium">{item.name}</td>
                <td className="p-4">
                  <a href={`mailto:${item.email}`} className="text-signal hover:underline">{item.email}</a>
                  {item.phone && <div className="text-sm text-muted mt-1">{item.phone}</div>}
                </td>
                <td className="p-4 max-w-md"><p className="text-sm">{item.message}</p></td>
                <td className="p-4 flex justify-end">
                  <button onClick={() => handleDelete(item.id)} className="p-2 text-muted hover:text-alert"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
            {items.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-muted">No messages found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
