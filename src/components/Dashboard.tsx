import React from 'react';
import { motion } from 'motion/react';
import { Warehouse, Ship, MapPin, ArrowUpRight, Clock, CheckCircle2 } from 'lucide-react';

export const Dashboard: React.FC = () => {
  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-navy">Centro de Comando Unificado</h1>
          <p className="text-slate-500">Controle total da sua operação em uma única interface moderna.</p>
        </div>
        <div className="flex gap-2">
          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">12 EM CURSO</span>
          <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs font-bold rounded-full">2 ALERTAS</span>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Warehouses Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-navy flex items-center gap-2">
              <Warehouse className="text-primary w-5 h-5" /> Armazéns
            </h3>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Status Global</span>
          </div>
          <div className="space-y-6">
            {[
              { name: 'Terminal Norte', value: 85, color: 'bg-primary' },
              { name: 'Terminal Sul', value: 42, color: 'bg-sky-500' },
            ].map((item, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className="text-sm font-semibold text-slate-700">{item.name}</span>
                  <span className="text-lg font-bold text-navy">{item.value}%</span>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${item.value}%` }}
                    transition={{ duration: 1, delay: i * 0.2 }}
                    className={`${item.color} h-full rounded-full`}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Preview Card */}
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm overflow-hidden relative">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-navy flex items-center gap-2">
              <Ship className="text-primary w-5 h-5" /> Frotas em Trânsito
            </h3>
            <button className="text-primary text-xs font-bold flex items-center gap-1">
              Ver Mapa Completo <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
          <div className="h-[200px] rounded-xl bg-slate-50 border border-slate-100 relative overflow-hidden">
            <img 
              src="https://picsum.photos/seed/map/800/400?grayscale" 
              alt="Map Preview" 
              className="w-full h-full object-cover opacity-40"
              referrerPolicy="no-referrer"
            />
            <div className="absolute top-1/4 left-1/3 text-primary">
              <MapPin className="w-8 h-8 animate-bounce" />
              <div className="bg-white px-2 py-1 rounded shadow text-[10px] font-bold absolute -top-4 left-1/2 -translate-x-1/2">Ever Laurel</div>
            </div>
            <div className="absolute bottom-1/3 right-1/4 text-sky-500">
              <MapPin className="w-8 h-8 animate-bounce" />
              <div className="bg-white px-2 py-1 rounded shadow text-[10px] font-bold absolute -top-4 left-1/2 -translate-x-1/2">Maersk Voyager</div>
            </div>
          </div>
        </div>

        {/* Cargo Table */}
        <div className="lg:col-span-3 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center">
            <h3 className="font-bold text-navy">Gerenciamento de Cargas Recentes</h3>
            <button className="text-primary text-sm font-semibold hover:underline">Ver Relatório Completo</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider">
                <tr>
                  <th className="px-6 py-4">ID Contentor</th>
                  <th className="px-6 py-4">Mercadoria</th>
                  <th className="px-6 py-4">Origem</th>
                  <th className="px-6 py-4">Destino</th>
                  <th className="px-6 py-4">Status</th>
                  <th className="px-6 py-4">Data Prevista</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {[
                  { id: 'ML-77821-X', cargo: 'Eletrônicos Premium', from: 'Shanghai, CN', to: 'Santos, BR', status: 'MAR ADENTRO', date: '24 Out, 2023', color: 'bg-blue-100 text-blue-700' },
                  { id: 'ML-44109-Z', cargo: 'Maquinário Agrícola', from: 'Rotterdam, NL', to: 'Itajaí, BR', status: 'AGUARDANDO DOCA', date: '18 Out, 2023', color: 'bg-orange-100 text-orange-700' },
                  { id: 'ML-99234-Y', cargo: 'Produtos Químicos', from: 'Singapore, SG', to: 'Paranaguá, BR', status: 'CONCLUÍDO', date: '12 Out, 2023', color: 'bg-green-100 text-green-700' },
                ].map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4 font-mono text-xs text-primary font-bold">{row.id}</td>
                    <td className="px-6 py-4 text-sm font-medium">{row.cargo}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{row.from}</td>
                    <td className="px-6 py-4 text-sm text-slate-500">{row.to}</td>
                    <td className="px-6 py-4">
                      <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${row.color}`}>{row.status}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
