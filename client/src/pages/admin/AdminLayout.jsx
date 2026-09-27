import { Outlet, NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import {
  LayoutDashboard,
  FolderKanban,
  Inbox,
  Globe,
  LogOut,
  User as UserIcon,
  Plus
} from 'lucide-react';
import Button from '../../components/ui/Button.jsx';
import { brand } from '../../config/site.js';

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login');
  };

  const navItems = [
    { to: '/admin', label: 'Dashboard', icon: LayoutDashboard, end: true },
    { to: '/admin/projects', label: 'Projects', icon: FolderKanban, end: false },
    { to: '/admin/inquiries', label: 'Inquiries', icon: Inbox, end: false },
  ];

  const getPageTitle = () => {
    const path = location.pathname;
    if (path === '/admin') return 'Dashboard Overview';
    if (path === '/admin/projects') return 'Project Management';
    if (path === '/admin/projects/new') return 'Create New Project';
    if (path.includes('/edit')) return 'Edit Project';
    if (path === '/admin/inquiries') return 'Inquiry Inbox';
    return 'Admin';
  };

  return (
    <div className="min-h-screen bg-[#07070B] text-fg flex flex-col md:flex-row font-sans">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-[#0D0D14] border-r border-border-subtle flex flex-col shrink-0 md:min-h-screen">
        {/* Brand Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-border-subtle">
          <Link to="/admin" className="flex items-center gap-2 font-display font-bold text-lg text-fg">
            <span>{brand.name}</span>
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span className="text-xs font-mono font-normal px-2 py-0.5 rounded bg-surface text-accent-2 ml-1">
              Admin
            </span>
          </Link>
        </div>

        {/* Navigation links */}
        <nav className="p-4 space-y-1.5 flex-grow">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-accent/15 text-accent font-semibold'
                      : 'text-fg-2 hover:bg-surface hover:text-fg'
                  }`
                }
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}

          <div className="pt-4 mt-4 border-t border-border-subtle space-y-1.5">
            <Link
              to="/admin/projects/new"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-accent-2 bg-surface hover:bg-accent-2/10 transition-colors"
            >
              <Plus className="w-4 h-4 shrink-0" />
              <span>New Project</span>
            </Link>

            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium text-fg-3 hover:text-fg hover:bg-surface transition-colors"
            >
              <Globe className="w-4 h-4 shrink-0" />
              <span>View Public Site</span>
            </a>
          </div>
        </nav>

        {/* User Footer */}
        <div className="p-4 border-t border-border-subtle bg-surface/30 flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-accent/20 text-accent flex items-center justify-center shrink-0">
              <UserIcon className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-semibold text-fg truncate">{user?.name || 'Admin'}</p>
              <p className="text-[10px] font-mono text-fg-3 truncate">{user?.email}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            title="Log out"
            className="p-2 rounded-lg text-fg-3 hover:text-danger hover:bg-surface transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 px-6 sm:px-8 border-b border-border-subtle bg-[#0D0D14]/80 backdrop-blur-md flex items-center justify-between shrink-0 sticky top-0 z-20">
          <h2 className="text-base sm:text-lg font-bold font-display text-fg">
            {getPageTitle()}
          </h2>
          <div className="flex items-center gap-3">
            <Button to="/admin/projects/new" variant="primary" size="sm" iconRight={Plus}>
              Create Project
            </Button>
          </div>
        </header>

        {/* Page Container */}
        <main className="flex-grow p-6 sm:p-8 max-w-[1200px] w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
