import React from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Shield, Eye, Lock, Network } from 'lucide-react';

export const LandingPage: React.FC<{ onStart: () => void }> = ({ onStart }) => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Logística 4.0 em Tempo Real
              </div>
              <h1 className="text-5xl lg:text-7xl font-extrabold text-navy leading-[1.1] tracking-tight">
                Gestão Portuária <span className="text-primary">Inteligente</span> e Conectada
              </h1>
              <p className="text-lg text-slate-600 max-w-xl leading-relaxed">
                Otimize sua cadeia de suprimentos marítima com tecnologia de ponta, visibilidade em tempo real e segurança blockchain de ponta a ponta.
              </p>
              <div className="flex flex-wrap gap-4">
                <button 
                  onClick={onStart}
                  className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/20 hover:scale-[1.02] transition-transform flex items-center gap-2"
                >
                  Começar Agora <ArrowRight className="w-5 h-5" />
                </button>
                <button className="px-8 py-4 bg-white text-navy font-bold rounded-xl border border-slate-200 hover:bg-slate-50 transition-colors">
                  Ver Demonstração
                </button>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-sky-400 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
              <div className="relative bg-white border border-slate-200 rounded-2xl shadow-2xl overflow-hidden">
                <img 
                  className="w-full h-full object-cover" 
                  src="https://picsum.photos/seed/marinelogic/800/600" 
                  alt="MarineLogic Dashboard Preview"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white" id="blockchain">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="grid grid-cols-2 gap-6">
              {[
                { icon: Shield, title: 'Imutabilidade', desc: 'Registros permanentes impossíveis de alterar.', color: 'text-primary', bg: 'bg-primary/5' },
                { icon: Eye, title: 'Transparência', desc: 'Rastreio visível para todos autorizados.', color: 'text-sky-500', bg: 'bg-sky-50' },
                { icon: Lock, title: 'Segurança', desc: 'Criptografia de nível militar protegendo dados.', color: 'text-sky-500', bg: 'bg-sky-50' },
                { icon: Network, title: 'Consenso', desc: 'Validação multi-ponto de transações.', color: 'text-primary', bg: 'bg-primary/5' },
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className={`p-8 rounded-2xl ${feature.bg} border border-slate-100 space-y-4`}
                >
                  <feature.icon className={`${feature.color} w-10 h-10`} />
                  <h4 className="font-bold text-navy">{feature.title}</h4>
                  <p className="text-sm text-slate-500">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
            
            <div className="space-y-6">
              <h2 className="text-4xl font-bold text-navy leading-tight">Módulo Blockchain: Confiança Digital Sem Limites</h2>
              <p className="text-lg text-slate-600">
                Nosso sistema de Rastreio de Contentores via Blockchain elimina fraudes e discrepâncias na documentação. Cada movimentação é um bloco único e seguro na sua cadeia logística.
              </p>
              <ul className="space-y-4">
                {['Smart Contracts para liberação automática.', 'Rastreabilidade auditável em tempo real.', 'Integração direta com portos internacionais.'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-semibold">
                    <div className="bg-primary/10 p-1 rounded-full">
                      <ArrowRight className="text-primary w-4 h-4" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
