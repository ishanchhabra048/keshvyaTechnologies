import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import {
  Inbox,
  Mail,
  Trash2,
  AlertTriangle
} from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Modal from '../../components/ui/Modal.jsx';
import Skeleton from '../../components/ui/Skeleton.jsx';
import Seo from '../../components/ui/Seo.jsx';
import api from '../../lib/api.js';
import { formatDate } from '../../lib/utils.js';

export default function Inquiries() {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['admin', 'inquiries', { status: statusFilter }],
    queryFn: async () => {
      const params = {};
      if (statusFilter !== 'all') params.status = statusFilter;
      const res = await api.get('/admin/inquiries', { params });
      return res.data;
    },
  });

  const inquiries = data?.data || [];

  // Status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }) => {
      const res = await api.patch(`/admin/inquiries/${id}`, { status });
      return res.data;
    },
    onSuccess: (_, variables) => {
      toast.success(`Inquiry marked as ${variables.status}`);
      if (selectedInquiry) {
        setSelectedInquiry((prev) => (prev ? { ...prev, status: variables.status } : null));
      }
      queryClient.invalidateQueries({ queryKey: ['admin', 'inquiries'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to update status');
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: async (id) => {
      const res = await api.delete(`/admin/inquiries/${id}`);
      return res.data;
    },
    onSuccess: () => {
      toast.success('Inquiry deleted successfully');
      setDeleteTarget(null);
      if (selectedInquiry?._id === deleteTarget?._id) {
        setSelectedInquiry(null);
      }
      queryClient.invalidateQueries({ queryKey: ['admin', 'inquiries'] });
      queryClient.invalidateQueries({ queryKey: ['admin', 'stats'] });
    },
    onError: (err) => {
      toast.error(err.message || 'Failed to delete inquiry');
    },
  });

  const getStatusBadgeTone = (status) => {
    switch (status) {
      case 'new':
        return 'accent';
      case 'read':
        return 'warning';
      case 'replied':
        return 'success';
      default:
        return 'neutral';
    }
  };

  return (
    <>
      <Seo title="Inquiry Inbox" noindex={true} />

      <div className="space-y-6">
        {/* Filter Bar */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {['all', 'new', 'read', 'replied', 'archived'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors ${
                  statusFilter === st
                    ? 'bg-accent/20 text-accent border border-accent/40 font-bold'
                    : 'bg-surface text-fg-3 hover:text-fg border border-border-subtle'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <span className="text-xs font-mono text-fg-3">
            {inquiries.length} {inquiries.length === 1 ? 'Inquiry' : 'Inquiries'}
          </span>
        </div>

        {/* Inquiries Table */}
        <Card className="p-0 overflow-hidden border border-border-subtle">
          {isLoading ? (
            <div className="p-6 space-y-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full rounded-xl" />
              ))}
            </div>
          ) : isError ? (
            <div className="p-12 text-center text-danger">
              <p>Failed to load inquiries: {error?.message}</p>
            </div>
          ) : inquiries.length === 0 ? (
            <div className="p-16 text-center text-fg-3">
              <div className="p-3 rounded-full bg-surface-hover w-fit mx-auto mb-3">
                <Inbox className="w-6 h-6" />
              </div>
              <p className="text-base font-semibold text-fg">No inquiries in this view</p>
              <p className="text-xs mt-1">Inbound messages from the contact form will appear here.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="border-b border-border-subtle bg-surface-hover/50 text-xs font-mono uppercase text-fg-3">
                    <th className="p-4 pl-6">Contact</th>
                    <th className="p-4">Type</th>
                    <th className="p-4">Budget</th>
                    <th className="p-4">Status</th>
                    <th className="p-4">Received</th>
                    <th className="p-4 pr-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border-subtle text-sm">
                  {inquiries.map((inq) => (
                    <tr
                      key={inq._id}
                      onClick={() => setSelectedInquiry(inq)}
                      className="hover:bg-surface-hover/40 transition-colors cursor-pointer group"
                    >
                      <td className="p-4 pl-6">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-accent/15 text-accent font-bold flex items-center justify-center text-xs shrink-0">
                            {inq.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-fg group-hover:text-accent transition-colors">
                              {inq.name}
                            </p>
                            <p className="text-xs text-fg-3">
                              {inq.email} {inq.company ? `• ${inq.company}` : ''}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="p-4 text-fg-2 text-xs font-medium">
                        {inq.projectType}
                      </td>

                      <td className="p-4 text-xs font-mono text-accent-2">
                        {inq.budget}
                      </td>

                      <td className="p-4">
                        <Badge tone={getStatusBadgeTone(inq.status)} className="capitalize text-xs">
                          {inq.status}
                        </Badge>
                      </td>

                      <td className="p-4 text-xs font-mono text-fg-3">
                        {formatDate(inq.createdAt)}
                      </td>

                      <td className="p-4 pr-6 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => setDeleteTarget(inq)}
                          className="p-2 rounded-lg text-fg-3 hover:text-danger hover:bg-surface transition-colors"
                          title="Delete inquiry"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </Card>
      </div>

      {/* Inquiry Detail Modal */}
      {selectedInquiry && (
        <Modal
          open={true}
          onClose={() => setSelectedInquiry(null)}
          title={`Inquiry from ${selectedInquiry.name}`}
        >
          <div className="space-y-6">
            {/* Meta header */}
            <div className="p-4 rounded-xl bg-surface-hover border border-border-subtle grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-mono uppercase text-fg-3">Email</span>
                <p className="text-sm font-semibold text-fg mt-0.5">{selectedInquiry.email}</p>
              </div>
              <div>
                <span className="font-mono uppercase text-fg-3">Company</span>
                <p className="text-sm font-semibold text-fg mt-0.5">{selectedInquiry.company || 'N/A'}</p>
              </div>
              <div>
                <span className="font-mono uppercase text-fg-3">Project Type</span>
                <p className="text-sm font-semibold text-accent-2 mt-0.5">{selectedInquiry.projectType}</p>
              </div>
              <div>
                <span className="font-mono uppercase text-fg-3">Budget</span>
                <p className="text-sm font-semibold text-accent mt-0.5">{selectedInquiry.budget}</p>
              </div>
            </div>

            {/* Message Body */}
            <div>
              <span className="text-xs font-mono uppercase text-fg-3 block mb-2">Message Content</span>
              <div className="p-4 rounded-xl bg-surface border border-border-subtle text-sm text-fg-2 whitespace-pre-wrap leading-relaxed">
                {selectedInquiry.message}
              </div>
            </div>

            {/* Status Selector & Actions */}
            <div className="pt-4 border-t border-border-subtle flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <span className="text-xs font-mono uppercase text-fg-3">Status:</span>
                <select
                  value={selectedInquiry.status}
                  onChange={(e) =>
                    updateStatusMutation.mutate({
                      id: selectedInquiry._id,
                      status: e.target.value,
                    })
                  }
                  className="bg-surface border border-border-subtle rounded-xl px-3 py-1.5 text-xs text-fg outline-none focus:border-accent cursor-pointer"
                >
                  <option value="new">New</option>
                  <option value="read">Read</option>
                  <option value="replied">Replied</option>
                  <option value="archived">Archived</option>
                </select>
              </div>

              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <a
                  href={`mailto:${selectedInquiry.email}?subject=${encodeURIComponent(
                    `Re: Your project inquiry - ${selectedInquiry.projectType}`
                  )}`}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-accent text-white text-xs font-bold uppercase tracking-wider hover:bg-accent/90 transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Reply via Email</span>
                </a>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {deleteTarget && (
        <Modal
          open={true}
          onClose={() => setDeleteTarget(null)}
          title="Delete Inquiry"
        >
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-danger/10 text-danger border border-danger/20 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" />
              <div className="text-sm">
                <p className="font-bold">Delete inquiry from {deleteTarget.name}?</p>
                <p className="mt-1 text-danger/90">
                  This lead will be permanently deleted from the database.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-border-subtle">
              <Button variant="ghost" size="md" onClick={() => setDeleteTarget(null)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                size="md"
                className="bg-danger hover:bg-danger/90"
                loading={deleteMutation.isPending}
                onClick={() => deleteMutation.mutate(deleteTarget._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
}
