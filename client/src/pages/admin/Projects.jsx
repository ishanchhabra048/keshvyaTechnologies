import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Star,
  CheckCircle2,
  XCircle,
  Eye,
  AlertTriangle
} from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Modal from '../../components/ui/Modal.jsx';
import Skeleton from '../../components/ui/Skeleton.jsx';
import Seo from '../../components/ui/Seo.jsx';
import api from '../../lib/api.js';
import { cdn, formatDate } from '../../lib/utils.js';

export default function Projects() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteTarget, setDeleteTarget] = useState(null);

  // Fetch admin projects
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['admin', 'projects', { status: statusFilter, q: searchTerm }],
    queryFn: async () => {
      const params = {};
      if (statusFilter !== 'all') params.status = statusFilter;
      if (searchTerm.trim()) params.q = searchTerm.trim();
      const res = await api.get('/admin/projects', { params });
      return res.data;
    },
  });

  const projects = data?.data || [];

  // Toggle status mutation
  const toggleStatusMutation = useMutation({
    mutationFn: async ({ id, newStatus }) => {
      const res = await api.patch(`/admin/projects/${id}/status`, { status: newStatus });
      return res.data;
    },
    onSuccess: (_, variables) => {
      toast.success(
        variables.newStatus === 'published'
          ? 'Project published live!'
          : 'Project changed to draft'
      );
      queryClient.invalidateQueries({ queryKey: ['admin', 'projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to update project status');
    },
  });

  // Delete project mutation
  const deleteProjectMutation = useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/admin/projects/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Project deleted successfully');
      setDeleteTarget(null);
      queryClient.invalidateQueries({ queryKey: ['admin', 'projects'] });
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to delete project');
    },
  });

  return (
    <>
      <Seo title="Manage Projects" noindex={true} />

      <div className="space-y-6">
        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-fg-3" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search projects..."
                className="w-full bg-surface border border-border-subtle rounded-xl pl-9 pr-4 py-2 text-sm text-fg outline-none focus:border-accent transition-colors"
              />
            </div>

            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-surface border border-border-subtle rounded-xl px-3 py-2 text-sm text-fg outline-none focus:border-accent cursor-pointer"
            >
              <option value="all">All Status</option>
              <option value="published">Published</option>
              <option value="draft">Drafts</option>
            </select>
          </div>

          <Button to="/admin/projects/new" variant="primary" size="md" iconRight={Plus}>
            New Project
          </Button>
        </div>

        {/* Table / List */}
        <Card className="p-0 overflow-hidden border border-border-subtle">
          {isLoading ? (
            <div className="p-6 space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full rounded-xl" />
              ))}
            </div>
          ) : isError ? (
            <div className="p-12 text-center text-danger">
              <p>Failed to load projects: {error?.message}</p>
            </div>
          ) : projects.length === 0 ? (
            <div className="p-12 text-center text-fg-3">
              <p className="text-base font-semibold text-fg">No projects found</p>
              <p className="text-xs mt-1">Try modifying your search or add a new project.</p>
              <div className="mt-6">
                <Button to="/admin/projects/new" variant="primary" size="sm">
                  Create First Project
                </Button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-border-subtle bg-surface-hover/50 text-xs font-mono uppercase text-fg-3">
                    <th className="p-4 pl-6">Project</th>
                    <th className="p-4">Category</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Featured</th>
                    <th className="p-4">Updated</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle text-sm">
                  {projects.map((proj) => (
                    <tr key={proj._id} className="hover:bg-surface-hover/30 transition-colors">
                      {/* Project info */}
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-9 rounded-lg overflow-hidden bg-surface-hover shrink-0">
                            <img
                              src={cdn(proj.coverImage?.url, 100) || '/placeholders/project-1.svg'}
                              alt={proj.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div>
                            <p className="font-semibold text-fg">{proj.title}</p>
                            <p className="text-xs font-mono text-fg-3">/{proj.slug}</p>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="p-4">
                        <Badge tone="neutral" className="capitalize text-xs">
                          {proj.category?.replace('-', ' ')}
                        </Badge>
                      </td>

                      {/* Status Toggle */}
                      <td className="p-4">
                        <button
                          onClick={() =>
                            toggleStatusMutation.mutate({
                              id: proj._id,
                              newStatus: proj.status === 'published' ? 'draft' : 'published',
                            })
                          }
                          disabled={toggleStatusMutation.isPending}
                          className="inline-flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
                        >
                          <Badge tone={proj.status === 'published' ? 'success' : 'warning'}>
                            {proj.status === 'published' ? (
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                            ) : (
                              <XCircle className="w-3 h-3 mr-1" />
                            )}
                            {proj.status}
                          </Badge>
                        </button>
                      </td>

                      {/* Featured */}
                      <td className="p-4">
                        {proj.featured ? (
                          <span className="text-amber-400 inline-flex items-center gap-1 text-xs font-semibold">
                            <Star className="w-4 h-4 fill-current" />
                            Yes
                          </span>
                        ) : (
                          <span className="text-fg-3 text-xs">No</span>
                        )}
                      </td>

                      {/* Date */}
                      <td className="p-4 text-xs font-mono text-fg-3">
                        {formatDate(proj.updatedAt || proj.createdAt)}
                      </td>

                      {/* Actions */}
                      <td className="p-4 pr-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          {proj.status === 'published' && (
                            <Link
                              to={`/projects/${proj.slug}`}
                              target="_blank"
                              title="View live case study"
                              className="p-2 rounded-lg text-fg-3 hover:text-accent hover:bg-surface transition-colors"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                          )}
                          <Link
                            to={`/admin/projects/${proj._id}/edit`}
                            title="Edit project"
                            className="p-2 rounded-lg text-fg-3 hover:text-fg hover:bg-surface transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </Link>
                          <button
                            onClick={() => setDeleteTarget(proj)}
                            title="Delete project"
                            className="p-2 rounded-lg text-fg-3 hover:text-danger hover:bg-surface transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <Modal
          open={true}
          onClose={() => setDeleteTarget(null)}
          title="Delete Project"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-danger/10 text-danger border border-danger/20 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-bold">Are you sure you want to delete this project?</p>
                <p className="mt-1 text-danger/90">
                  &ldquo;{deleteTarget.title}&rdquo; will be permanently deleted along with its associated media. This action cannot be undone.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-subtle">
              <Button
                variant="ghost"
                size="md"
                onClick={() => setDeleteTarget(null)}
                disabled={deleteProjectMutation.isPending}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                className="bg-danger hover:bg-danger/90"
                loading={deleteProjectMutation.isPending}
                onClick={() => deleteProjectMutation.mutate(deleteTarget._id)}
              >
                Delete Project
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
