import React from 'react';
import { motion } from 'motion/react';
import { Anchor, Navigation, Wind, Waves, Verified, Download, Route, Clock, Warehouse, Ship, Truck } from 'lucide-react';

export const Tracking: React.FC = () => {
  const steps = [
    { 
      title: 'Origem: Shanghai, CN - Verificado', 
      desc: 'Container lacrado e inventário registrado na rede distribuída.', 
      time: '2023-10-01 08:00', 
      hash: '0x12a9B...8c2f', 
      status: 'Concluído', 
      icon: Warehouse,
      color: 'bg-primary'
    },
    { 
      title: 'Partida do Porto - Blockchain Validado', 
      desc: "Vessel: 'Ever Dawn'. Manifesto de carga assinado digitalmente.", 
      time: '2023-10-03 14:20', 
      hash: '0x45b2C...3e9d', 
      status: 'Concluído', 
      icon: Ship,
      color: 'bg-primary'
    },
    { 
      title: 'Trânsito em Alto Mar - Atualização IoT', 
      desc: 'Sensores IoT reportando integridade via satélite.', 
      time: '2023-10-15 10:00', 
      hash: '0x89c7F...1a0b', 
      status: 'Em Trânsito', 
      icon: Navigation,
      color: 'bg-sky-500'
    },
    { 
      title: 'Chegada: Santos, BR - Aguardando Alfândega', 
      desc: 'Liberação alfandegária automática via Smart Contract.', 
      time: '2023-10-22 09:15', 
      hash: '0x32d4E...5f21', 
      status: 'Pendente', 
      icon: Anchor,
      color: 'bg-slate-200'
    },
    { 
      title: 'Entrega Final - Smart Contract Concluído', 
      desc: 'Transferência de custódia e pagamento automático.', 
      time: 'Estimado: 2023-10-25', 
      hash: 'Aguardando...', 
      status: 'Previsto', 
      icon: Truck,
      color: 'bg-slate-100'
    },
  ];

  return (
    <div className="p-6 lg:p-10 max-w-5xl mx-auto space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">Ativo</span>
            <span className="text-slate-400 text-sm">Ref: ML-77821-X</span>
          </div>
          <h1 className="text-4xl font-black text-navy tracking-tight">Rastreio em Tempo Real via Blockchain</h1>
          <p className="text-slate-600 text-lg max-w-2xl">Visibilidade ponta a ponta e integridade de dados garantida por tecnologia de registro distribuído.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-lg font-bold text-sm shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all">
          <Download className="w-4 h-4" /> Exportar Ledger
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Status Atual', value: 'Aguardando Alfândega', sub: 'Processamento', alert: true },
          { label: 'Localização', value: 'Santos, BR', sub: 'Atualizado via Satélite' },
          { label: 'ETA Estimado', value: '25 Out 2023', sub: 'No Cronograma' },
          { label: 'Integridade', value: '100% Validado', sub: 'Hash: 0x7f82...3a1', icon: Verified },
        ].map((stat, i) => (
          <div key={i} className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
            <p className="text-slate-500 text-[10px] font-bold uppercase mb-1">{stat.label}</p>
            <div className="flex items-center gap-2">
              {stat.icon && <stat.icon className="w-5 h-5 text-green-600" />}
              <p className="text-navy text-lg font-bold">{stat.value}</p>
            </div>
            <p className={`text-xs mt-2 font-medium ${stat.alert ? 'text-yellow-600' : 'text-slate-400'}`}>{stat.sub}</p>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-10 pb-6 border-b border-slate-100">
          <Route className="text-primary w-6 h-6" />
          <h3 className="text-xl font-bold text-navy">Jornada do Container</h3>
        </div>
        
        <div className="relative">
          <div className="absolute left-6 top-4 bottom-4 w-0.5 bg-slate-100"></div>
          <div className="space-y-12">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="relative flex gap-8"
              >
                <div className={`z-10 flex size-12 items-center justify-center rounded-full ${step.color} text-white ring-8 ring-white`}>
                  <step.icon className="w-6 h-6" />
                </div>
                <div className="flex-1 pt-1">
                  <div className="flex flex-wrap items-center justify-between gap-4 mb-2">
                    <h4 className={`text-lg font-bold ${step.status === 'Previsto' ? 'text-slate-400' : 'text-navy'}`}>{step.title}</h4>
                    <span className={`text-[10px] font-bold px-3 py-1 rounded-full border ${
                      step.status === 'Concluído' ? 'bg-green-100 text-green-700 border-green-200' :
                      step.status === 'Em Trânsito' ? 'bg-sky-100 text-sky-700 border-sky-200' :
                      step.status === 'Pendente' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                      'bg-slate-50 text-slate-500 border-slate-200'
                    }`}>
                      {step.status}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm mb-3">{step.desc}</p>
                  <div className="flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-1.5 text-slate-400 text-xs">
                      <Clock className="w-3 h-3" /> {step.time}
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-50 px-2 py-1 rounded border border-slate-100">
                      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter">Hash:</span>
                      <code className="text-[10px] text-primary font-mono">{step.hash}</code>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
