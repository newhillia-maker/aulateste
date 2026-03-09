import React from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, UserPlus, ArrowRight } from 'lucide-react';

export const Login: React.FC<{ onLogin: () => void }> = ({ onLogin }) => {
  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center p-6 bg-slate-50">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-4xl w-full bg-white rounded-3xl border border-slate-200 shadow-2xl overflow-hidden flex flex-col md:flex-row"
      >
        {/* CTA Info Side */}
        <div className="md:w-1/2 bg-primary p-12 text-white flex flex-col justify-center relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h3 className="text-3xl font-bold">Pronto para digitalizar seu porto?</h3>
            <p className="text-primary-100 opacity-90 leading-relaxed">
              Junte-se a centenas de operadores marítimos que já utilizam a MarineLogic para reduzir custos e aumentar a eficiência.
            </p>
            <div className="pt-4 flex items-center gap-4">
              <div className="flex -space-x-2">
                {['JD', 'AM', 'RK'].map((init, i) => (
                  <div key={i} className="w-10 h-10 rounded-full border-2 border-primary bg-white/20 flex items-center justify-center text-xs font-bold">
                    {init}
                  </div>
                ))}
              </div>
              <span className="text-xs font-medium">+500 empresas parceiras</span>
            </div>
          </div>
          <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        {/* Form Side */}
        <div className="md:w-1/2 p-12">
          <div className="space-y-8">
            <div>
              <h4 className="text-2xl font-bold text-navy">Acesse sua Conta</h4>
              <p className="text-sm text-slate-500 mt-1">Bem-vindo de volta ao centro de operações.</p>
            </div>
            <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onLogin(); }}>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">E-mail Corporativo</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input 
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                    placeholder="exemplo@empresa.com" 
                    type="email"
                    required
                  />
                </div>
              </div>
              <div className="space-y-1">
                <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Senha</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <input 
                    className="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" 
                    placeholder="••••••••" 
                    type="password"
                    required
                  />
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input className="rounded border-slate-300 text-primary focus:ring-primary" type="checkbox" />
                  <span className="text-slate-600">Lembrar de mim</span>
                </label>
                <a className="text-primary font-bold hover:underline" href="#">Esqueceu a senha?</a>
              </div>
              <button 
                type="submit"
                className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all flex items-center justify-center gap-2"
              >
                Entrar no Sistema <ArrowRight className="w-4 h-4" />
              </button>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-100"></div></div>
              <div className="relative flex justify-center text-xs uppercase"><span className="bg-white px-2 text-slate-400 font-medium">Ou</span></div>
            </div>
            <button className="w-full py-4 bg-white border border-slate-200 text-navy font-bold rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
              <UserPlus className="w-4 h-4" /> Solicitar Nova Conta
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
