import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { User, Shield, Settings, History, Lock, UserPlus, Edit2, Trash2, CheckCircle2, X, Save } from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  initial: string;
}

export const Admin: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([
    { id: '1', name: 'Capt. Horatio Nelson', email: 'nelson@marinelogic.com', role: 'Admin', status: 'Ativo', initial: 'CN' },
    { id: '2', name: 'Sarah Jenkins', email: 'jenkins@marinelogic.com', role: 'Operador', status: 'Ativo', initial: 'SJ' },
    { id: '3', name: 'Mark Thorne', email: 'thorne@marinelogic.com', role: 'Visualizador', status: 'Inativo', initial: 'MT' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserData | null>(null);
  const [formData, setFormData] = useState<Omit<UserData, 'id' | 'initial'>>({
    name: '',
    email: '',
    role: 'Operador',
    status: 'Ativo',
  });

  const openModal = (user?: UserData) => {
    if (user) {
      setEditingUser(user);
      setFormData({
        name: user.name,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    } else {
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        role: 'Operador',
        status: 'Ativo',
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingUser(null);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    const initial = formData.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...formData, initial } : u));
    } else {
      const newUser: UserData = {
        id: Date.now().toString(),
        ...formData,
        initial,
      };
      setUsers([...users, newUser]);
    }
    closeModal();
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Tem certeza que deseja excluir este usuário?')) {
      setUsers(users.filter(u => u.id !== id));
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)]">
      {/* Sidebar */}
      <aside className="w-full lg:w-64 border-r border-slate-200 bg-white p-4 space-y-8">
        <div className="space-y-1">
          {[
            { label: 'Gestão de Usuários', icon: User, active: true },
            { label: 'Papéis & Permissões', icon: Shield },
            { label: 'Configurações Sistema', icon: Settings },
            { label: 'Logs de Auditoria', icon: History },
            { label: 'Segurança Blockchain', icon: Lock },
          ].map((item, i) => (
            <button 
              key={i}
              className={`w-full flex items-center gap-3 px-3 py-2 text-sm font-semibold rounded-lg transition-colors ${
                item.active ? 'bg-primary/10 text-primary' : 'text-slate-600 hover:bg-slate-50'
              }`}
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>
        
        <div className="pt-8 border-t border-slate-100">
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">Ambiente</p>
          <div className="mt-4 flex items-center gap-3 px-3">
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
            <span className="text-sm font-medium">Produção Node v2.4</span>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 bg-[#f6f6f8]">
        <div className="max-w-6xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-navy">Gestão de Usuários</h1>
              <p className="text-slate-500">Gerencie o acesso à plataforma e atribua credenciais logísticas.</p>
            </div>
            <button 
              onClick={() => openModal()}
              className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90"
            >
              <UserPlus className="w-4 h-4" /> Adicionar Usuário
            </button>
          </div>

          {/* User Table */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <table className="w-full text-left text-sm">
              <thead className="bg-slate-50 text-slate-600">
                <tr>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">Perfil Usuário</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">Papel Acesso</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px]">Status</th>
                  <th className="px-6 py-4 font-semibold uppercase tracking-wider text-[10px] text-right">Ações</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {users.map((user) => (
                  <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-xs">{user.initial}</div>
                        <div>
                          <p className="font-semibold text-navy">{user.name}</p>
                          <p className="text-xs text-slate-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center rounded-md px-2 py-1 text-[10px] font-bold ring-1 ring-inset ${
                        user.role === 'Admin' ? 'bg-purple-50 text-purple-700 ring-purple-600/10' :
                        user.role === 'Operador' ? 'bg-blue-50 text-blue-700 ring-blue-600/10' :
                        'bg-slate-50 text-slate-700 ring-slate-600/10'
                      }`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1.5 ${user.status === 'Ativo' ? 'text-green-600' : 'text-slate-400'}`}>
                        <div className={`h-1.5 w-1.5 rounded-full ${user.status === 'Ativo' ? 'bg-green-600' : 'bg-slate-400'}`}></div>
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-2">
                        <button 
                          onClick={() => openModal(user)}
                          className="p-1 text-slate-400 hover:text-primary"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleDelete(user.id)}
                          className="p-1 text-slate-400 hover:text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Site Functions Control */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-navy">Controle de Funções</h3>
              <div className="space-y-4">
                {[
                  { label: 'Otimização de Rota AI', desc: 'Habilitar analytics preditivo para combustível.', active: true },
                  { label: 'Feed Blockchain Live', desc: 'Exibir atualizações de smart contracts.', active: true },
                  { label: 'Acesso API Externa', desc: 'Permitir integração logística de terceiros.', active: false },
                ].map((toggle, i) => (
                  <div key={i} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold">{toggle.label}</p>
                      <p className="text-xs text-slate-500">{toggle.desc}</p>
                    </div>
                    <button className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${toggle.active ? 'bg-primary' : 'bg-slate-200'}`}>
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${toggle.active ? 'translate-x-6' : 'translate-x-1'}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Role Access Control */}
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-6">
              <h3 className="text-lg font-bold text-navy">Controle de Acesso por Papel</h3>
              <div className="space-y-3">
                {[
                  { label: 'Dashboard Analytics', roles: ['Admin', 'Op'] },
                  { label: 'Execução Smart Contract', roles: ['Admin'] },
                  { label: 'Visualização Mapa Frota', roles: ['Admin', 'Op', 'View'] },
                  { label: 'Faturamento & Invoicing', roles: ['Admin'] },
                ].map((role, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                    <span className="text-sm font-medium">{role.label}</span>
                    <div className="flex gap-1.5">
                      {role.roles.map((r, ri) => (
                        <span key={ri} className="text-[9px] font-bold uppercase text-primary bg-primary/10 px-1.5 py-0.5 rounded">
                          {r}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* User Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/40 backdrop-blur-sm">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="bg-white rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
            >
              <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                <h3 className="text-lg font-bold text-navy">
                  {editingUser ? 'Editar Usuário' : 'Adicionar Novo Usuário'}
                </h3>
                <button onClick={closeModal} className="p-1 hover:bg-slate-200 rounded-full transition-colors">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              <form onSubmit={handleSave} className="p-6 space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">Nome Completo</label>
                  <input 
                    required
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="Ex: João Silva"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-500 uppercase">E-mail Corporativo</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                    placeholder="joao@marinelogic.com"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Papel</label>
                    <select 
                      value={formData.role}
                      onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                    >
                      <option value="Admin">Admin</option>
                      <option value="Operador">Operador</option>
                      <option value="Visualizador">Visualizador</option>
                    </select>
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase">Status</label>
                    <select 
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-2 rounded-lg border border-slate-200 focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white"
                    >
                      <option value="Ativo">Ativo</option>
                      <option value="Inativo">Inativo</option>
                    </select>
                  </div>
                </div>
                <div className="pt-4 flex gap-3">
                  <button 
                    type="button"
                    onClick={closeModal}
                    className="flex-1 px-4 py-2.5 rounded-lg border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-all"
                  >
                    Cancelar
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-primary font-bold text-white shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all"
                  >
                    <Save className="w-4 h-4" /> Salvar
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

