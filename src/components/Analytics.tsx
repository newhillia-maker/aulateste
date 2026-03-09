import React, { useState } from 'react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  PieChart, 
  Pie, 
  Cell,
  BarChart,
  Bar
} from 'recharts';
import { TrendingUp, TrendingDown, Package, Clock, ShieldCheck, Leaf, AlertTriangle, Zap, Calendar } from 'lucide-react';

const monthlyData = [
  { name: 'Sem 1', planned: 40, actual: 32, volume: 2400 },
  { name: 'Sem 2', planned: 30, actual: 24, volume: 1800 },
  { name: 'Sem 3', planned: 50, actual: 40, volume: 3200 },
  { name: 'Sem 4', planned: 35, actual: 28, volume: 2100 },
  { name: 'Sem 5', planned: 45, actual: 36, volume: 2900 },
];

const quarterlyData = [
  { name: 'Jan', planned: 120, actual: 110, volume: 8500 },
  { name: 'Fev', planned: 140, actual: 145, volume: 9200 },
  { name: 'Mar', planned: 130, actual: 120, volume: 8800 },
];

const yearlyData = [
  { name: 'Q1', planned: 390, actual: 375, volume: 26500 },
  { name: 'Q2', planned: 420, actual: 410, volume: 28200 },
  { name: 'Q3', planned: 450, actual: 465, volume: 31000 },
  { name: 'Q4', planned: 480, actual: 470, volume: 29500 },
];

const pieData = [
  { name: 'Combustível', value: 45, color: '#1754cf' },
  { name: 'Taxas Portuárias', value: 25, color: '#3b82f6' },
  { name: 'Documentação', value: 20, color: '#818cf8' },
  { name: 'Seguro', value: 10, color: '#cbd5e1' },
];

export const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');

  const getActiveData = () => {
    switch (timeRange) {
      case 'quarterly': return quarterlyData;
      case 'yearly': return yearlyData;
      default: return monthlyData;
    }
  };

  const activeData = getActiveData();

  const kpis = {
    monthly: [
      { label: 'Volume Total (TEU)', value: '124,500', trend: '+5.2%', icon: Package, color: 'text-primary', bg: 'bg-blue-50', up: true },
      { label: 'Tempo Médio Trânsito', value: '14.2 Dias', trend: '-1.1%', icon: Clock, color: 'text-indigo-600', bg: 'bg-indigo-50', up: false },
      { label: 'Verificação Blockchain', value: '100.0%', trend: 'Estável', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50', up: true },
      { label: 'Redução Carbono', value: '12.5%', trend: '+2.4%', icon: Leaf, color: 'text-sky-600', bg: 'bg-sky-50', up: true },
    ],
    quarterly: [
      { label: 'Volume Trimestral', value: '382,100', trend: '+8.4%', icon: Package, color: 'text-primary', bg: 'bg-blue-50', up: true },
      { label: 'Eficiência de Carga', value: '94.2%', trend: '+2.5%', icon: Zap, color: 'text-indigo-600', bg: 'bg-indigo-50', up: true },
      { label: 'Smart Contracts', value: '1,240', trend: '+15%', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50', up: true },
      { label: 'Economia Escala', value: '$2.4M', trend: '+4.1%', icon: TrendingUp, color: 'text-sky-600', bg: 'bg-sky-50', up: true },
    ],
    yearly: [
      { label: 'Volume Anual', value: '1.4M', trend: '+12.1%', icon: Package, color: 'text-primary', bg: 'bg-blue-50', up: true },
      { label: 'Crescimento YoY', value: '15.4%', trend: '+3.2%', icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50', up: true },
      { label: 'Nós de Rede', value: '42', trend: '+8', icon: ShieldCheck, color: 'text-emerald-600', bg: 'bg-emerald-50', up: true },
      { label: 'Meta Sustentável', value: '85%', trend: 'On Track', icon: Leaf, color: 'text-sky-600', bg: 'bg-sky-50', up: true },
    ]
  };

  const activeKpis = kpis[timeRange];

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-primary mb-1">
            <Calendar className="w-4 h-4" />
            <span className="text-[10px] font-bold uppercase tracking-widest">Relatório de Performance</span>
          </div>
          <h1 className="text-3xl font-black text-navy tracking-tight">
            {timeRange === 'monthly' ? 'Analytics Mensal' : timeRange === 'quarterly' ? 'Dashboard Trimestral' : 'Performance Anual'}
          </h1>
          <p className="text-slate-500 font-medium">Insights logísticos em tempo real e modelagem preditiva</p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center bg-white border border-slate-200 rounded-lg p-1 shadow-sm">
            <button 
              onClick={() => setTimeRange('monthly')}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${timeRange === 'monthly' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:text-navy'}`}
            >
              Mensal
            </button>
            <button 
              onClick={() => setTimeRange('quarterly')}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${timeRange === 'quarterly' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:text-navy'}`}
            >
              Trimestral
            </button>
            <button 
              onClick={() => setTimeRange('yearly')}
              className={`px-4 py-1.5 text-xs font-bold rounded-md transition-all ${timeRange === 'yearly' ? 'bg-primary text-white shadow-md' : 'text-slate-500 hover:text-navy'}`}
            >
              Anual
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {activeKpis.map((kpi, i) => (
          <div key={i} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-4">
              <div className={`p-2 ${kpi.bg} rounded-lg`}>
                <kpi.icon className={`${kpi.color} w-5 h-5`} />
              </div>
              <span className={`text-xs font-bold flex items-center gap-1 ${kpi.up ? 'text-emerald-500' : 'text-rose-500'}`}>
                {kpi.trend}
              </span>
            </div>
            <p className="text-slate-500 text-sm font-medium mb-1">{kpi.label}</p>
            <h3 className="text-2xl font-black text-navy leading-none">{kpi.value}</h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Route Efficiency Chart */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h4 className="text-navy font-bold">Eficiência de Rota</h4>
              <p className="text-xs text-slate-500">Tempo de Trânsito Planejado vs. Real (Dias)</p>
            </div>
            <div className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-wider">
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-primary"></div>
                <span className="text-slate-400">Planejado</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-0.5 bg-primary border-t border-dashed"></div>
                <span className="text-slate-400">Real</span>
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activeData}>
                <defs>
                  <linearGradient id="colorPlanned" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1754cf" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#1754cf" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  labelStyle={{ fontWeight: 'bold', color: '#0e121b' }}
                />
                <Area type="monotone" dataKey="planned" stroke="#1754cf" fillOpacity={1} fill="url(#colorPlanned)" strokeWidth={2} />
                <Area type="monotone" dataKey="actual" stroke="#3b82f6" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Volume Distribution */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col">
          <h4 className="text-navy font-bold mb-1">Volume de Carga</h4>
          <p className="text-xs text-slate-500 mb-6">Distribuição por período (TEU)</p>
          <div className="flex-1 flex items-center justify-center min-h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={activeData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip 
                  cursor={{ fill: '#f8fafc' }}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Bar dataKey="volume" fill="#1754cf" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cost Analysis */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h4 className="text-navy font-bold">Análise de Custos</h4>
              <p className="text-xs text-slate-500">Distribuição de custos logísticos</p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="size-48 shrink-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
              {pieData.map((item, i) => (
                <div key={i} className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{item.name}</span>
                  </div>
                  <span className="text-lg font-black text-navy">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="size-8 bg-primary/10 rounded flex items-center justify-center">
                <Zap className="text-primary w-5 h-5" />
              </div>
              <h4 className="text-navy font-bold">Insights Inteligentes</h4>
            </div>
            <span className="px-2 py-1 bg-emerald-100 text-emerald-700 text-[10px] font-black uppercase rounded">AI Engine Ativo</span>
          </div>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100 flex gap-4">
              <AlertTriangle className="text-orange-500 w-6 h-6 shrink-0" />
              <div>
                <p className="text-sm font-bold text-navy mb-1">Atraso Potencial: Porto de Santos</p>
                <p className="text-xs text-slate-500 leading-relaxed">Alta congestão prevista nas próximas 48h. Aumento esperado no turnaround: +6 horas. Considere ancoragem no Setor B.</p>
              </div>
            </div>
            <div className="p-4 rounded-lg bg-blue-50 border border-blue-100 flex gap-4">
              <TrendingUp className="text-primary w-6 h-6 shrink-0" />
              <div>
                <p className="text-sm font-bold text-navy mb-1">Otimização de Rota Disponível</p>
                <p className="text-xs text-slate-500 leading-relaxed">O navio 'Oceania Express' pode economizar 4% de combustível ajustando a velocidade para 14 nós.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
