'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { adminApi } from '../../../lib/admin-api';
import { Button } from '../../../components/ui/Button';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export default function AdminSkills() {
  const [items, setItems] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    category: 'FRONTEND',
  });

  const categories = ['FRONTEND', 'BACKEND', 'DATABASE', 'AI', 'DEVOPS', 'TOOLS'];

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const data = await adminApi.getSkills();
      setItems(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenModal = (item?: any) => {
    if (item) {
      setEditingId(item.id);
      setFormData({ name: item.name, category: item.category });
    } else {
      setEditingId(null);
      setFormData({ name: '', category: 'FRONTEND' });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) await adminApi.updateSkill(editingId, formData);
      else await adminApi.createSkill(formData);
      setIsModalOpen(false);
      fetchItems();
    } catch (error) {
      console.error('Error saving skill:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Delete this skill?')) {
      try {
        await adminApi.deleteSkill(id);
        fetchItems();
      } catch (error) {
        console.error('Error deleting skill:', error);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold">Skills</h1>
        <Button variant="primary" className="flex items-center gap-2" onClick={() => handleOpenModal()}>
          <Plus className="w-4 h-4" /> Add Skill
        </Button>
      </div>

      <div className="bg-panel border border-hairline rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-hairline bg-ink">
              <th className="p-4 font-mono text-sm text-muted uppercase">Name</th>
              <th className="p-4 font-mono text-sm text-muted uppercase">Category</th>
              <th className="p-4 font-mono text-sm text-muted uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="border-b border-hairline last:border-0 hover:bg-ink/50 transition-colors">
                <td className="p-4 font-medium">{item.name}</td>
                <td className="p-4">{item.category}</td>
                <td className="p-4 flex justify-end gap-2">
                  <button onClick={() => handleOpenModal(item)} className="p-2 text-muted hover:text-signal transition-colors"><Edit2 className="w-4 h-4" /></button>
                  <button onClick={() => handleDelete(item.id)} className="p-2 text-muted hover:text-alert transition-colors"><Trash2 className="w-4 h-4" /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-ink/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-panel w-full max-w-md rounded-lg border border-hairline p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">{editingId ? 'Edit Skill' : 'Add Skill'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-muted"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-muted mb-2 uppercase">Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-ink border border-hairline rounded px-3 py-2" />
              </div>
              <div>
                <label className="block text-xs text-muted mb-2 uppercase">Category</label>
                <select required value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full bg-ink border border-hairline rounded px-3 py-2">
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>Cancel</Button>
                <Button type="submit" variant="primary">{editingId ? 'Update' : 'Create'}</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
