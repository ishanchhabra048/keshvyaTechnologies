import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FolderKanban, CheckCircle, FileText, Inbox, ArrowRight, Plus } from 'lucide-react';
import Card from '../../components/ui/Card.jsx';
import Button from '../../components/ui/Button.jsx';
import Badge from '../../components/ui/Badge.jsx';
import Skeleton from '../../components/ui/Skeleton.jsx';
import Seo from '../../components/ui/Seo.jsx';
import api from '../../lib/api.js';
import { formatDate } from '../../lib/utils.js';

export default function Dashboard() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['admin', 'stats'],
    queryFn: async () => {
      const res = await api.get('/admin/stats');
      return res.data.data;
    },
  });

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-32 rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-96 rounded-2xl" />
      </div>
    );
  }

  const statCards = [
    {
      label: 'Total Projects',
      value: stats?.projectsTotal ?? 0,
      icon: FolderKanban,
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      to: '/admin/projects',
    },
    {
      label: 'Published Live',
      value: stats?.published ?? 0,
      icon: CheckCircle,
      color: 'text-success',
      bgColor: 'bg-success/10',
      to: '/admin/projects?status=published',
    },
    {
      label: 'Draft Projects',
      value: stats?.drafts ?? 0,
      icon: FileText,
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      to: '/admin/projects?status=draft',
    },
    {
      label: 'New Inquiries',
      value: stats?.inquiriesNew ?? 0,
      icon: Inbox,
      color: 'text-accent-2',
      bgColor: 'bg-accent-2/10',
      to: '/admin/inquiries?status=new',
    },
  ];

  return (
    <>
      <Seo title="Admin Dashboard" noindex={true} />

      <div className="space-y-8">
        {/* Stat Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {statCards.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <Link key={i} to={stat.to} className="block group">
                <Card className="p-6 transition-transform group-hover:-translate-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono uppercase text-fg-3">{stat.label}</span>
                    <div className={`p-2 rounded-xl ${stat.bgColor} ${stat.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>
                  <div className="mt-4 text-3xl sm:text-4xl font-extrabold font-display text-fg">
                    {stat.value}
                  </div>
                </Card>
              </Link>
            );
          })}
        </div>

        {/* Recent Inquiries Panel */}
        <Card className="p-6 sm:p-8">
          <div className="flex items-center justify-between pb-6 border-b border-border-subtle">
            <div>
              <h3 className="text-lg font-bold text-fg tracking-tight">Recent Inquiries</h3>
              <p className="text-xs text-fg-3 mt-0.5">Latest prospective client leads</p>
            </div>
            <Link
              to="/admin/inquiries"
              className="text-xs font-semibold text-accent hover:underline inline-flex items-center gap-1"
            >
              <span>View all inquiries</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="divide-y divide-border-subtle">
            {stats?.latestInquiries?.length > 0 ? (
              stats.latestInquiries.map((inq) => (
                <div
                  key={inq._id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface-hover/30 -mx-6 px-6 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-accent/15 text-accent font-bold flex items-center justify-center text-xs shrink-0">
                      {inq.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-semibold text-fg">{inq.name}</h4>
                      <p className="text-xs text-fg-3">
                        {inq.email} &bull; <span className="text-fg-2">{inq.projectType}</span>
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 self-end sm:self-center">
                    <Badge
                      tone={
                        inq.status === 'new'
                          ? 'accent'
                          : inq.status === 'replied'
                          ? 'success'
                          : 'neutral'
                      }
                      className="capitalize"
                    >
                      {inq.status}
                    </Badge>
                    <span className="text-xs font-mono text-fg-3">
                      {formatDate(inq.createdAt)}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="py-12 text-center text-fg-3 text-sm">
                No recent inquiries received yet.
              </div>
            )}
          </div>
        </Card>

        {/* Quick Launch Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Card className="p-6 flex items-center justify-between">
            <div>
              <h4 className="text-base font-bold text-fg">Publish New Work</h4>
              <p className="text-xs text-fg-2 mt-0.5">Add a new client case study or project</p>
            </div>
            <Button to="/admin/projects/new" variant="primary" size="sm" iconRight={Plus}>
              New Project
            </Button>
          </Card>

          <Card className="p-6 flex items-center justify-between">
            <div>
              <h4 className="text-base font-bold text-fg">Manage Existing Projects</h4>
              <p className="text-xs text-fg-2 mt-0.5">Toggle drafts, edit case studies, or update media</p>
            </div>
            <Button to="/admin/projects" variant="secondary" size="sm">
              All Projects
            </Button>
          </Card>
        </div>
      </div>
    </>
  );
}
