import { Routes, Route, NavLink, Link } from 'react-router-dom';
import { BookOpen, BarChart3, ListOrdered, Settings as SettingsIcon } from 'lucide-react';
import ListView from './routes/ListView';
import BarDetail from './routes/BarDetail';
import Lists from './routes/Lists';
import ListDetail from './routes/ListDetail';
import Stats from './routes/Stats';
import Settings from './routes/Settings';

export default function App() {
  return (
    <div className="min-h-full flex flex-col">
      {/* Header */}
      <header className="border-b border-ink-600 bg-ink-900/80 backdrop-blur-sm sticky top-0 z-20 pt-safe">
        <Link to="/" aria-label="Home" className="block max-w-3xl mx-auto px-5 py-4">
          <h1 className="font-display text-2xl tracking-tight text-cream-50">
            Higher <span className="text-amber italic">Proof</span>
          </h1>
          <p className="font-sans text-[11px] tracking-widest uppercase text-cream-600 mt-0.5">
            A bar journal
          </p>
        </Link>
      </header>

      {/* Main content */}
      <main className="flex-1 pb-24">
        <div className="max-w-3xl mx-auto">
          <Routes>
            <Route path="/" element={<ListView />} />
            <Route path="/bar/:id" element={<BarDetail />} />
            <Route path="/lists" element={<Lists />} />
            <Route path="/lists/:listId" element={<ListDetail />} />
            <Route path="/stats" element={<Stats />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </div>
      </main>

      {/* Bottom nav */}
      <nav className="fixed bottom-0 left-0 right-0 border-t border-ink-600 bg-ink-900/95 backdrop-blur-sm z-20 pb-safe">
        <div className="max-w-3xl mx-auto grid grid-cols-4">
          <NavTab to="/" icon={BookOpen} label="Bars" />
          <NavTab to="/lists" icon={ListOrdered} label="Lists" />
          <NavTab to="/stats" icon={BarChart3} label="Stats" />
          <NavTab to="/settings" icon={SettingsIcon} label="Settings" />
        </div>
      </nav>
    </div>
  );
}

function NavTab({
  to,
  icon: Icon,
  label,
}: {
  to: string;
  icon: typeof BookOpen;
  label: string;
}) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        `flex flex-col items-center justify-center py-3 gap-1 transition-colors ${
          isActive ? 'text-amber' : 'text-cream-600 hover:text-cream-200'
        }`
      }
    >
      <Icon size={20} strokeWidth={1.5} />
      <span className="font-sans text-[10px] tracking-widest uppercase">{label}</span>
    </NavLink>
  );
}
