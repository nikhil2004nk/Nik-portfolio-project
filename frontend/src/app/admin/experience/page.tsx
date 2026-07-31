'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { experienceService } from '../../../features/experience/services/experience.service';
import { Experience } from '../../../types/experience';
import { DataTable } from '../../../components/tables/DataTable';

export default function ExperienceAdminPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);

  const loadExperiences = async () => {
    try {
      setLoading(true);
      const data = await experienceService.getAll();
      setExperiences(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExperiences();
  }, []);

  const handleAdd = () => {
    console.log('Add Experience');
  };

  const handleEdit = (exp: Experience) => {
    console.log('Edit Experience', exp);
  };

  const handleDelete = async (exp: Experience) => {
    if (confirm(`Are you sure you want to delete experience at ${exp.company}?`)) {
      try {
        await experienceService.delete(exp.id);
        loadExperiences();
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div>
      <DataTable<Experience>
        title="Manage Experience"
        data={experiences}
        loading={loading}
        columns={[
          { header: 'Role', accessor: 'role' },
          { header: 'Company', accessor: 'company' },
          { header: 'Duration', accessor: (row) => `${new Date(row.startDate).getFullYear()} - ${row.current ? 'Present' : (row.endDate ? new Date(row.endDate).getFullYear() : '')}` },
        ]}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
