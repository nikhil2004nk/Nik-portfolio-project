'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { educationService } from '../../../features/education/services/education.service';
import { Education } from '../../../types/experience';
import { DataTable } from '../../../components/tables/DataTable';

export default function EducationAdminPage() {
  const [education, setEducation] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);

  const loadEducation = async () => {
    try {
      setLoading(true);
      const data = await educationService.getAll();
      setEducation(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadEducation();
  }, []);

  const handleAdd = () => {
    console.log('Add Education');
  };

  const handleEdit = (edu: Education) => {
    console.log('Edit Education', edu);
  };

  const handleDelete = async (edu: Education) => {
    if (confirm(`Are you sure you want to delete ${edu.degree} at ${edu.institution}?`)) {
      try {
        await educationService.delete(edu.id);
        loadEducation();
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div>
      <DataTable<Education>
        title="Manage Education"
        data={education}
        loading={loading}
        columns={[
          { header: 'Degree', accessor: 'degree' },
          { header: 'Institution', accessor: 'institution' },
          { header: 'Duration', accessor: (row) => `${new Date(row.startDate).getFullYear()} - ${row.endDate ? new Date(row.endDate).getFullYear() : 'Present'}` },
        ]}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
