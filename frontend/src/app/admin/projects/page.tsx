'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { projectService } from '../../../features/project-builder/services/project.service';
import { Project } from '../../../types/project';
import { DataTable } from '../../../components/tables/DataTable';

export default function ProjectsAdminPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await projectService.getAll();
      setProjects(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleAdd = () => {
    router.push('/admin/projects/new');
  };

  const handleEdit = (project: Project) => {
    router.push(`/admin/projects/${project.id}`);
  };

  const handleDelete = async (project: Project) => {
    if (confirm(`Are you sure you want to delete ${project.name}?`)) {
      try {
        await projectService.delete(project.id);
        loadProjects();
      } catch (e) {
        console.error(e);
      }
    }
  };

  return (
    <div>
      <DataTable<Project>
        title="Manage Projects"
        data={projects}
        loading={loading}
        columns={[
          { header: 'Name', accessor: 'name' },
          { header: 'Published', accessor: (row) => row.published ? 'Yes' : 'No' },
          { header: 'Order', accessor: 'order' },
        ]}
        onAdd={handleAdd}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
