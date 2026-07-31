'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { adminApi } from '../../../lib/admin-api';
import { Button } from '../../../components/ui/Button';
import { Plus, Edit2, Trash2, X } from 'lucide-react';

export default function AdminProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    liveUrl: '',
    githubUrl: '',
    featured: false,
    order: 0
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const data = await adminApi.getProjects();
      setProjects(data);
    } catch (e) {
      console.error(e);
    }
  };

  const handleOpenModal = (project?: any) => {
    if (project) {
      setEditingId(project.id);
      setFormData({
        name: project.name,
        description: project.description,
        liveUrl: project.liveUrl || '',
        githubUrl: project.githubUrl || '',
        featured: project.featured,
        order: project.order
      });
    } else {
      setEditingId(null);
      setFormData({
        name: '', description: '', liveUrl: '', githubUrl: '', featured: false, order: 0
      });
    }
    setIsModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await adminApi.updateProject(editingId, formData);
      } else {
        await adminApi.createProject(formData);
      }
      setIsModalOpen(false);
      fetchProjects();
    } catch (error) {
      console.error('Error saving project:', error);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this project?')) {
      try {
        await adminApi.deleteProject(id);
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-display font-bold">Projects</h1>
        <Button variant="primary" className="flex items-center gap-2" onClick={() => handleOpenModal()}>
          <Plus className="w-4 h-4" /> Add Project
        </Button>
      </div>

      <div className="bg-panel border border-hairline rounded-lg overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-hairline bg-ink">
              <th className="p-4 font-mono text-sm text-muted uppercase">Name</th>
              <th className="p-4 font-mono text-sm text-muted uppercase">Featured</th>
              <th className="p-4 font-mono text-sm text-muted uppercase">Order</th>
              <th className="p-4 font-mono text-sm text-muted uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id} className="border-b border-hairline last:border-0 hover:bg-ink/50 transition-colors">
                <td className="p-4 font-medium">{project.name}</td>
                <td className="p-4">{project.featured ? 'Yes' : 'No'}</td>
                <td className="p-4">{project.order}</td>
                <td className="p-4 flex justify-end gap-2">
                  <button onClick={() => handleOpenModal(project)} className="p-2 text-muted hover:text-signal transition-colors">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(project.id)} className="p-2 text-muted hover:text-alert transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </td>
              </tr>
            ))}
            {projects.length === 0 && (
              <tr>
                <td colSpan={4} className="p-8 text-center text-muted">No projects found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-ink/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-panel w-full max-w-2xl rounded-lg border border-hairline shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b border-hairline">
              <h2 className="text-xl font-bold">{editingId ? 'Edit Project' : 'Add Project'}</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-muted hover:text-primary">
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
              <div>
                <label className="block text-xs font-mono text-muted mb-2 uppercase">Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-ink border border-hairline rounded px-3 py-2 text-primary" />
              </div>
              <div>
                <label className="block text-xs font-mono text-muted mb-2 uppercase">Description</label>
                <textarea required rows={3} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-ink border border-hairline rounded px-3 py-2 text-primary" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono text-muted mb-2 uppercase">Live URL</label>
                  <input type="url" value={formData.liveUrl} onChange={e => setFormData({...formData, liveUrl: e.target.value})} className="w-full bg-ink border border-hairline rounded px-3 py-2 text-primary" />
                </div>
                <div>
                  <label className="block text-xs font-mono text-muted mb-2 uppercase">GitHub URL</label>
                  <input type="url" value={formData.githubUrl} onChange={e => setFormData({...formData, githubUrl: e.target.value})} className="w-full bg-ink border border-hairline rounded px-3 py-2 text-primary" />
                </div>
              </div>
              <div className="flex items-center gap-4 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="accent-signal" />
                  <span className="text-sm">Featured</span>
                </label>
                <div>
                  <label className="flex items-center gap-2 text-sm">
                    Order: <input type="number" value={formData.order} onChange={e => setFormData({...formData, order: parseInt(e.target.value)})} className="bg-ink border border-hairline rounded px-2 py-1 w-16" />
                  </label>
                </div>
              </div>
              <div className="pt-6 border-t border-hairline flex justify-end gap-3">
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
