/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { MapLive } from './components/MapLive';
import { Analytics } from './components/Analytics';
import { Admin } from './components/Admin';
import { Tracking } from './components/Tracking';
import { Login } from './components/Login';

export default function App() {
  const [currentView, setCurrentView] = useState('landing');

  const renderView = () => {
    switch (currentView) {
      case 'landing':
        return <LandingPage onStart={() => setCurrentView('dashboard')} />;
      case 'dashboard':
        return <Dashboard />;
      case 'map':
        return <MapLive />;
      case 'analytics':
        return <Analytics />;
      case 'admin':
        return <Admin />;
      case 'tracking':
        return <Tracking />;
      case 'login':
        return <Login onLogin={() => setCurrentView('dashboard')} />;
      default:
        return <LandingPage onStart={() => setCurrentView('dashboard')} />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f6f6f8]">
      <Navbar currentView={currentView} onViewChange={setCurrentView} />
      <main className="flex-1">
        {renderView()}
      </main>
      
      {/* Footer - Only show on landing */}
      {currentView === 'landing' && (
        <footer className="bg-navy text-white py-12 border-t border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              <div className="col-span-2 md:col-span-1 space-y-4">
                <div className="flex items-center gap-2">
                  <div className="bg-primary p-1.5 rounded-lg">
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.826a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path></svg>
                  </div>
                  <span className="text-xl font-bold tracking-tight">MarineLogic</span>
                </div>
                <p className="text-slate-400 text-sm">Liderando a revolução digital na logística portuária global.</p>
              </div>
              <div>
                <h5 className="font-bold mb-4 text-sm uppercase tracking-wider">Plataforma</h5>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><button onClick={() => setCurrentView('dashboard')} className="hover:text-primary transition-colors">Dashboard</button></li>
                  <li><button onClick={() => setCurrentView('map')} className="hover:text-primary transition-colors">Mapa Live</button></li>
                  <li><button onClick={() => setCurrentView('analytics')} className="hover:text-primary transition-colors">Analytics</button></li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold mb-4 text-sm uppercase tracking-wider">Empresa</h5>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><a href="#" className="hover:text-primary transition-colors">Sobre Nós</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Carreiras</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Contato</a></li>
                </ul>
              </div>
              <div>
                <h5 className="font-bold mb-4 text-sm uppercase tracking-wider">Legal</h5>
                <ul className="space-y-2 text-sm text-slate-400">
                  <li><a href="#" className="hover:text-primary transition-colors">Privacidade</a></li>
                  <li><a href="#" className="hover:text-primary transition-colors">Termos de Uso</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 pt-8 border-t border-white/5 text-center text-slate-500 text-xs">
              © 2023 MarineLogic Technologies Inc. Todos os direitos reservados.
            </div>
          </div>
        </footer>
      )}
    </div>
  );
}

