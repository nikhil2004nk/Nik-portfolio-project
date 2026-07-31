'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { skillService } from '../../../features/skill/services/skill.service';
import { Skill } from '../../../types/skill';
import { DataTable } from '../../../components/tables/DataTable';

export default function SkillsAdminPage() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

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

  const handleAdd = () => {
    // TODO: Open modal
    console.log('Add Skill');
  };

  const handleEdit = (skill: Skill) => {
    // TODO: Open modal
    console.log('Edit Skill', skill);
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
          { header: 'Category', accessor: (row) => row.category?.name || 'Uncategorized' },
          { header: 'Order', accessor: 'order' },
        ]}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
