import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Ship, Anchor, MapPin, Search, Filter, Layers, Activity, ShieldCheck, Info, Navigation } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup, useMap, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default icon issue in Leaflet with React
// @ts-ignore
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Blinking Marker Component
const BlinkingMarker = ({ position, name, type, speed, status, colorClass }: any) => {
  const customIcon = L.divIcon({
    className: 'custom-div-icon',
    html: `
      <div class="relative flex items-center justify-center">
        <div class="absolute -inset-3 ${colorClass.replace('text-', 'bg-')}/30 rounded-full animate-ping"></div>
        <div class="relative z-10 ${colorClass}">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
        </div>
      </div>
    `,
    iconSize: [30, 30],
    iconAnchor: [15, 15],
  });

  return (
    <Marker position={position} icon={customIcon}>
      <Popup className="custom-popup">
        <div className="p-2 min-w-[180px]">
          <div className="flex justify-between items-start mb-2">
            <h4 className="text-sm font-bold text-navy">{name}</h4>
            <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${
              status === 'Em Trânsito' ? 'bg-blue-100 text-blue-700' :
              status === 'Aproximando' ? 'bg-orange-100 text-orange-700' :
              'bg-emerald-100 text-emerald-700'
            }`}>
              {status}
            </span>
          </div>
          <p className="text-[10px] text-slate-500 font-medium mb-2">{type}</p>
          <div className="grid grid-cols-2 gap-2 border-t border-slate-100 pt-2">
            <div className="space-y-0.5">
              <p className="text-[9px] text-slate-400 font-bold uppercase">Velocidade</p>
              <p className="text-[10px] font-mono font-bold text-slate-700">{speed}</p>
            </div>
            <div className="space-y-0.5">
              <p className="text-[9px] text-slate-400 font-bold uppercase">Rumo</p>
              <p className="text-[10px] font-mono font-bold text-slate-700">142° SE</p>
            </div>
          </div>
          <button className="w-full mt-3 py-1.5 bg-primary text-white text-[10px] font-bold rounded-lg hover:bg-primary/90 transition-colors flex items-center justify-center gap-1">
            <Info className="w-3 h-3" /> Detalhes Completos
          </button>
        </div>
      </Popup>
    </Marker>
  );
};

export const MapLive: React.FC = () => {
  const [selectedVessel, setSelectedVessel] = useState<string | null>(null);
  const [systemStatus, setSystemStatus] = useState({ satellites: 14, latency: 24 });

  const vessels = [
    { id: '1', name: 'Ever Laurel', type: 'Container Ship', lat: 23.4, lng: 120.1, speed: '18.4 kn', status: 'Em Trânsito', color: 'text-primary' },
    { id: '2', name: 'Maersk Voyager', type: 'Cargo Vessel', lat: -12.1, lng: -38.5, speed: '14.2 kn', status: 'Aproximando', color: 'text-sky-500' },
    { id: '3', name: 'MSC Isabella', type: 'Ultra Large Container', lat: 51.5, lng: 3.4, speed: '0.5 kn', status: 'Ancorado', color: 'text-emerald-500' },
    { id: '4', name: 'CMA CGM Antoine', type: 'Container Ship', lat: 35.2, lng: 139.7, speed: '21.0 kn', status: 'Em Trânsito', color: 'text-primary' },
    { id: '5', name: 'HMM Algeciras', type: 'Mega Vessel', lat: 1.3, lng: 103.8, speed: '12.5 kn', status: 'Aproximando', color: 'text-sky-500' },
  ];

  const chainFeed = [
    { time: '12:45', event: 'Smart Contract Validado', ref: 'SC-9921', status: 'Success' },
    { time: '12:42', event: 'Novo Bloco Minerado', ref: 'BLK-772', status: 'Success' },
    { time: '12:38', event: 'Lacre IoT Verificado', ref: 'IOT-441', status: 'Success' },
    { time: '12:30', event: 'Transferência Custódia', ref: 'TX-102', status: 'Success' },
  ];

  // Simulate live updates
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStatus(prev => ({
        satellites: Math.random() > 0.9 ? (prev.satellites === 14 ? 13 : 14) : prev.satellites,
        latency: Math.floor(Math.random() * 10) + 20
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">
      {/* Left Panel: Search & Filters */}
      <aside className="w-full lg:w-80 bg-white border-r border-slate-200 flex flex-col z-10">
        <div className="p-6 border-b border-slate-100 space-y-4">
          <h2 className="text-xl font-bold text-navy">Monitoramento Live</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Buscar navio ou porto..." 
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-primary/20 outline-none"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100">
              <Filter className="w-3 h-3" /> Filtros
            </button>
            <button className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-100">
              <Layers className="w-3 h-3" /> Camadas
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <p className="px-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">Navios em Destaque</p>
          {vessels.map((vessel, i) => (
            <motion.div 
              key={vessel.id}
              whileHover={{ x: 4 }}
              onClick={() => setSelectedVessel(vessel.id)}
              className={`p-4 rounded-xl border transition-all cursor-pointer group ${
                selectedVessel === vessel.id 
                  ? 'border-primary bg-primary/5 shadow-md' 
                  : 'border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-md'
              }`}
            >
              <div className="flex justify-between items-start mb-2">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg bg-white shadow-sm ${vessel.color}`}>
                    <Ship className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-navy group-hover:text-primary transition-colors">{vessel.name}</h4>
                    <p className="text-[10px] text-slate-500 font-medium">{vessel.type}</p>
                  </div>
                </div>
                <span className={`text-[9px] font-black px-1.5 py-0.5 rounded uppercase ${
                  vessel.status === 'Em Trânsito' ? 'bg-blue-100 text-blue-700' :
                  vessel.status === 'Aproximando' ? 'bg-orange-100 text-orange-700' :
                  'bg-emerald-100 text-emerald-700'
                }`}>
                  {vessel.status}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="space-y-0.5">
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Posição</p>
                  <p className="text-[10px] font-mono font-bold text-slate-700">{vessel.lat.toFixed(1)}°, {vessel.lng.toFixed(1)}°</p>
                </div>
                <div className="space-y-0.5">
                  <p className="text-[9px] text-slate-400 font-bold uppercase">Velocidade</p>
                  <p className="text-[10px] font-mono font-bold text-slate-700">{vessel.speed}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </aside>

      {/* Center: Map View */}
      <main className="flex-1 relative bg-slate-100 overflow-hidden">
        <MapContainer 
          center={[20, 0]} 
          zoom={2.5} 
          className="w-full h-full z-0"
          zoomControl={false}
          scrollWheelZoom={true}
        >
          <ZoomControl position="bottomleft" />
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          />
          
          {vessels.map((vessel) => (
            <BlinkingMarker 
              key={vessel.id}
              position={[vessel.lat, vessel.lng]}
              name={vessel.name}
              type={vessel.type}
              speed={vessel.speed}
              status={vessel.status}
              colorClass={vessel.color}
            />
          ))}
        </MapContainer>
        
        {/* Overlay UI */}
        <div className="absolute top-8 right-8 bg-white/90 backdrop-blur p-4 rounded-xl border border-slate-200 shadow-xl max-w-xs z-[1000]">
          <div className="flex items-center gap-2 mb-3">
            <Activity className="text-primary w-4 h-4 animate-pulse" />
            <h5 className="text-xs font-bold text-navy uppercase tracking-wider">Status do Sistema</h5>
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-500">Satélites Ativos</span>
              <span className="font-bold text-emerald-600">{systemStatus.satellites}/14</span>
            </div>
            <div className="flex justify-between text-[10px]">
              <span className="text-slate-500">Latência Rede</span>
              <span className="font-bold text-navy">{systemStatus.latency}ms</span>
            </div>
          </div>
        </div>

        {/* Legend */}
        <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur p-3 rounded-lg border border-slate-200 shadow-lg z-[1000] flex gap-4">
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-primary"></div>
            <span className="text-[9px] font-bold text-slate-600 uppercase">Em Trânsito</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-sky-500"></div>
            <span className="text-[9px] font-bold text-slate-600 uppercase">Aproximando</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="size-2 rounded-full bg-emerald-500"></div>
            <span className="text-[9px] font-bold text-slate-600 uppercase">Ancorado</span>
          </div>
        </div>
      </main>

      {/* Right Panel: Live Chain Feed */}
      <aside className="w-full lg:w-72 bg-navy text-white flex flex-col z-10">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2 mb-1">
            <ShieldCheck className="text-sky-400 w-4 h-4" />
            <h3 className="text-sm font-bold uppercase tracking-widest">Live Chain Feed</h3>
          </div>
          <p className="text-[10px] text-slate-400">Validação em tempo real</p>
        </div>
        
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {chainFeed.map((item, i) => (
            <div key={i} className="relative pl-6 border-l border-white/10">
              <div className="absolute -left-1.5 top-0 size-3 rounded-full bg-sky-500 shadow-[0_0_10px_rgba(56,189,248,0.5)]"></div>
              <p className="text-[10px] font-mono text-slate-400 mb-1">{item.time}</p>
              <h5 className="text-xs font-bold mb-0.5">{item.event}</h5>
              <p className="text-[10px] text-sky-400 font-mono">{item.ref}</p>
            </div>
          ))}
        </div>

        <div className="p-6 bg-white/5 border-t border-white/10">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-bold text-slate-400 uppercase">Hash da Rede</span>
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse"></span>
          </div>
          <code className="text-[10px] text-slate-300 break-all font-mono block p-3 bg-black/20 rounded-lg">
            0x7f82a9b1c3d4e5f60718293a4b5c6d7e8f90a1b2
          </code>
        </div>
      </aside>

      <style>{`
        .custom-popup .leaflet-popup-content-wrapper {
          border-radius: 12px;
          padding: 0;
          overflow: hidden;
          box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
        }
        .custom-popup .leaflet-popup-content {
          margin: 0;
        }
        .leaflet-container {
          background: #f1f5f9;
        }
      `}</style>
    </div>
  );
};
