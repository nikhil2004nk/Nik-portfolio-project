'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { skillService } from '../../../features/skill/services/skill.service';
import { Skill, SkillLevel, SkillCategory } from '../../../types/skill';
import { DataTable } from '../../../components/tables/DataTable';
import { Button } from '../../../components/ui/Button';

const SKILL_LEVELS: SkillLevel[] = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'];
const SKILL_CATEGORIES: SkillCategory[] = ['FRONTEND', 'BACKEND', 'DATABASE', 'DEVOPS', 'CLOUD', 'TOOL', 'AI', 'OTHER'];

const defaultFormData = {
  name: '',
  level: 'INTERMEDIATE' as SkillLevel,
  category: '' as string,
  icon: '',
  yearsOfExperience: '',
  order: '0',
};

export default function SkillsAdminPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(defaultFormData);
  const [saving, setSaving] = useState(false);

  const loadSkills = async () => {
    try {
      setLoading(true);
      const data = await skillService.getAll();
      setSkills(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadSkills();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setFormData(defaultFormData);
    setShowModal(true);
  };

  const openEditModal = (skill: Skill) => {
    setEditingId(skill.id);
    setFormData({
      name: skill.name,
      level: skill.level,
      category: skill.category || '',
      icon: skill.icon || '',
      yearsOfExperience: skill.yearsOfExperience != null ? String(skill.yearsOfExperience) : '',
      order: String(skill.order ?? 0),
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      const payload: any = {
        name: formData.name,
        level: formData.level,
        category: formData.category || undefined,
        icon: formData.icon || undefined,
        yearsOfExperience: formData.yearsOfExperience ? parseFloat(formData.yearsOfExperience) : undefined,
        order: parseInt(formData.order) || 0,
      };
      if (editingId) {
        await skillService.update(editingId, payload);
      } else {
        await skillService.create(payload);
      }
      setShowModal(false);
      loadSkills();
    } catch (error) {
      console.error(error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (skill: Skill) => {
    if (confirm(`Are you sure you want to delete ${skill.name}?`)) {
      try {
        await skillService.delete(skill.id);
        loadSkills();
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div>
      <DataTable<Skill>
        title="Manage Skills"
        data={skills}
        loading={loading}
        columns={[
          { header: 'Name', accessor: 'name' },
          { header: 'Level', accessor: 'level' },
          { header: 'Category', accessor: (row) => row.category || '—' },
          { header: 'Order', accessor: 'order' },
        ]}
        onAdd={openAddModal}
        onEdit={openEditModal}
        onDelete={handleDelete}
      />

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
          <div className="bg-ink border border-hairline rounded-xl p-6 shadow-2xl max-w-lg w-full animate-in fade-in zoom-in duration-200">
            <h3 className="text-lg font-display text-signal mb-6">
              {editingId ? 'Edit Skill' : 'Add Skill'}
            </h3>
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-xs text-muted mb-2 uppercase font-mono">Name *</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-panel border border-hairline rounded px-3 py-2 text-primary focus:border-signal outline-none"
                  placeholder="e.g. React, TypeScript, Docker"
                />
              </div>

              {/* Level & Category */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-muted mb-2 uppercase font-mono">Level *</label>
                  <select
                    value={formData.level}
                    onChange={(e) => setFormData({ ...formData, level: e.target.value as SkillLevel })}
                    className="w-full bg-panel border border-hairline rounded px-3 py-2 text-primary focus:border-signal outline-none"
                  >
                    {SKILL_LEVELS.map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-muted mb-2 uppercase font-mono">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-panel border border-hairline rounded px-3 py-2 text-primary focus:border-signal outline-none"
                  >
                    <option value="">— None —</option>
                    {SKILL_CATEGORIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Icon & Years */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-muted mb-2 uppercase font-mono">Icon (URL or class)</label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    className="w-full bg-panel border border-hairline rounded px-3 py-2 text-primary focus:border-signal outline-none"
                    placeholder="e.g. https://..."
                  />
                </div>
                <div>
                  <label className="block text-xs text-muted mb-2 uppercase font-mono">Years of Exp.</label>
                  <input
                    type="number"
                    step="0.5"
                    value={formData.yearsOfExperience}
                    onChange={(e) => setFormData({ ...formData, yearsOfExperience: e.target.value })}
                    className="w-full bg-panel border border-hairline rounded px-3 py-2 text-primary focus:border-signal outline-none"
                    placeholder="e.g. 3.5"
                  />
                </div>
              </div>

              {/* Order */}
              <div className="w-1/2">
                <label className="block text-xs text-muted mb-2 uppercase font-mono">Sort Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: e.target.value })}
                  className="w-full bg-panel border border-hairline rounded px-3 py-2 text-primary focus:border-signal outline-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-hairline">
              <Button type="button" variant="outline" size="sm" onClick={() => setShowModal(false)}>Cancel</Button>
              <Button type="button" size="sm" onClick={handleSave} disabled={saving || !formData.name}>
                {saving ? 'Saving...' : editingId ? 'Update Skill' : 'Create Skill'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
