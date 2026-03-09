import React from 'react';
import { 
  LayoutDashboard, 
  Map as MapIcon, 
  BarChart3, 
  Settings, 
  LogOut, 
  Search, 
  Bell,
  Anchor,
  ShieldCheck,
  Activity
} from 'lucide-react';
import { cn } from '../lib/utils';

interface NavbarProps {
  currentView: string;
  onViewChange: (view: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onViewChange }) => {
  const navItems = [
    { id: 'landing', label: 'Início', icon: Anchor },
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'map', label: 'Mapa Live', icon: MapIcon },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'admin', label: 'Admin', icon: Settings },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => onViewChange('landing')}>
            <Anchor className="text-primary w-8 h-8" />
            <span className="text-xl font-bold tracking-tight text-navy">MarineLogic</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onViewChange(item.id)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 text-sm font-medium transition-colors rounded-lg",
                  currentView === item.id 
                    ? "text-primary bg-primary/5" 
                    : "text-slate-600 hover:text-primary hover:bg-slate-50"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center bg-slate-100 rounded-lg px-3 py-1.5 border border-slate-200">
              <Search className="text-slate-400 w-4 h-4" />
              <input 
                type="text" 
                placeholder="Buscar container..." 
                className="bg-transparent border-none focus:ring-0 text-sm w-32 lg:w-48 ml-2"
              />
            </div>
            <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-lg relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="h-8 w-px bg-slate-200 mx-1 hidden sm:block"></div>
            <button 
              onClick={() => onViewChange('login')}
              className="bg-primary hover:bg-primary/90 text-white px-5 py-2 rounded-lg text-sm font-semibold shadow-lg shadow-primary/20 transition-all"
            >
              Entrar
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
