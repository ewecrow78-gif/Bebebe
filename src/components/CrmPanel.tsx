import React, { useState } from 'react';
import { Lead } from '../types';
import { X, Calendar, ClipboardList, Trash2, Filter, PlusCircle } from 'lucide-react';

interface CrmPanelProps {
  leads: Lead[];
  onUpdateStatus: (id: string, status: Lead['status']) => void;
  onUpdateNotes: (id: string, notes: string) => void;
  onDeleteLead: (id: string) => void;
  onAddMockLead: () => void;
  onClearAllLeads: () => void;
  onClose: () => void;
}

export default function CrmPanel({
  leads,
  onUpdateStatus,
  onUpdateNotes,
  onDeleteLead,
  onAddMockLead,
  onClearAllLeads,
  onClose
}: CrmPanelProps) {
  const [filterType, setFilterType] = useState<'all' | 'callback' | 'quiz' | 'calculator'>('all');
  const [filterStatus, setFilterStatus] = useState<'all' | Lead['status']>('all');

  const filteredLeads = leads.filter((lead) => {
    const matchesType = filterType === 'all' || lead.type === filterType;
    const matchesStatus = filterStatus === 'all' || lead.status === filterStatus;
    return matchesType && matchesStatus;
  });

  // Calculate CRM Stats
  const totalCount = leads.length;
  const newCount = leads.filter((l) => l.status === 'new').length;
  const inWorkCount = leads.filter((l) => l.status === 'contacted' || l.status === 'negotiation').length;
  const closedCount = leads.filter((l) => l.status === 'closed_won').length;

  const getStatusBadgeClass = (status: Lead['status']) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20 rounded-none';
      case 'contacted':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20 rounded-none';
      case 'negotiation':
        return 'bg-gold-500/10 text-gold-400 border-gold-500/20 rounded-none';
      case 'closed_won':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20 rounded-none';
      case 'closed_lost':
        return 'bg-red-500/10 text-red-400 border-red-500/20 rounded-none';
      default:
        return 'bg-dark-900 text-white/50 border-white/5 rounded-none';
    }
  };

  const getStatusLabel = (status: Lead['status']) => {
    switch (status) {
      case 'new': return 'Новая';
      case 'contacted': return 'Связались';
      case 'negotiation': return 'В работе';
      case 'closed_won': return 'Успешно 🎉';
      case 'closed_lost': return 'Отказ ❌';
      default: return status;
    }
  };

  const getTypeLabel = (type: Lead['type']) => {
    switch (type) {
      case 'callback': return '📞 Звонок';
      case 'quiz': return '📝 Квиз-подбор';
      case 'question': return '✉ Вопрос';
      case 'calculator': return '🧮 Калькулятор';
      default: return type;
    }
  };

  return (
    <div className="bg-dark-800 border border-white/10 p-6 sm:p-8 rounded-none shadow-2xl animate-fadeIn">
      {/* Panel Header */}
      <div className="flex justify-between items-center border-b border-white/5 pb-5 mb-6">
        <div className="flex items-center gap-3.5">
          <div className="h-10 w-10 bg-gold-500 text-black flex items-center justify-center font-bold font-serif text-sm">
            CRM
          </div>
          <div>
            <h3 className="text-lg font-serif font-light text-white flex items-center gap-2">
              <span>Панель Заявок Риелтора</span>
              <span className="text-[9px] bg-gold-500/10 text-gold-500 border border-gold-500/20 px-2.5 py-0.5 rounded-none font-mono font-bold tracking-widest">ADMIN MODE</span>
            </h3>
            <p className="text-xs text-white/50 font-light mt-0.5">
              Эксклюзивный административный режим. Управляйте заявками, оставленными на сайте в реальном времени!
            </p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="p-2 rounded-none hover:bg-dark-900 text-white/50 hover:text-white transition-colors cursor-pointer"
          title="Закрыть панель CRM"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* CRM Statistics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-dark-950 p-4 border border-white/5 text-center">
          <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest font-mono">Всего заявок</p>
          <p className="text-2xl font-serif text-white mt-1.5">{totalCount}</p>
        </div>
        <div className="bg-dark-950 p-4 border border-white/5 text-center">
          <p className="text-[9px] text-blue-400 font-bold uppercase tracking-widest font-mono">Новые</p>
          <p className="text-2xl font-serif text-blue-400 mt-1.5">{newCount}</p>
        </div>
        <div className="bg-dark-950 p-4 border border-white/5 text-center">
          <p className="text-[9px] text-gold-500 font-bold uppercase tracking-widest font-mono">В работе</p>
          <p className="text-2xl font-serif text-gold-500 mt-1.5">{inWorkCount}</p>
        </div>
        <div className="bg-dark-950 p-4 border border-white/5 text-center">
          <p className="text-[9px] text-emerald-400 font-bold uppercase tracking-widest font-mono">Успешные</p>
          <p className="text-2xl font-serif text-emerald-400 mt-1.5">{closedCount}</p>
        </div>
      </div>

      {/* Filter and Control toolbar */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center bg-dark-950 p-4 border border-white/5 mb-6">
        
        {/* Filters */}
        <div className="flex flex-wrap gap-2.5 items-center">
          <span className="text-[9px] font-bold text-white/40 uppercase tracking-widest font-mono flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-gold-500" />
            <span>Фильтр:</span>
          </span>

          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value as any)}
            className="bg-dark-900 border border-white/10 text-xs font-mono text-white/80 py-1.5 px-3 focus:outline-none focus:border-gold-500"
          >
            <option value="all">Все форматы</option>
            <option value="callback">Звонки</option>
            <option value="quiz">Квизы</option>
            <option value="calculator">Калькуляторы</option>
          </select>

          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value as any)}
            className="bg-dark-900 border border-white/10 text-xs font-mono text-white/80 py-1.5 px-3 focus:outline-none focus:border-gold-500"
          >
            <option value="all">Все статусы</option>
            <option value="new">Новые</option>
            <option value="contacted">Связались</option>
            <option value="negotiation">В работе</option>
            <option value="closed_won">Успешная сделка</option>
            <option value="closed_lost">Отказ</option>
          </select>
        </div>

        {/* Action utility buttons */}
        <div className="flex gap-2.5 justify-end">
          <button
            onClick={onAddMockLead}
            className="bg-gold-500 hover:bg-gold-400 text-black px-4 py-2 font-bold uppercase tracking-wider text-[10px] font-mono flex items-center gap-1.5 cursor-pointer transition-all rounded-none"
            id="add-mock-lead-btn"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Демо-заявка</span>
          </button>
          <button
            onClick={onClearAllLeads}
            className="border border-white/10 hover:bg-dark-900 text-white/70 px-4 py-2 font-bold uppercase tracking-wider text-[10px] font-mono flex items-center gap-1.5 cursor-pointer transition-all rounded-none"
            id="clear-leads-btn"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Очистить</span>
          </button>
        </div>
      </div>

      {/* Leads List */}
      {filteredLeads.length === 0 ? (
        <div className="bg-dark-950 border border-white/5 p-12 text-center text-white/50 shadow-inner">
          <ClipboardList className="w-10 h-10 text-gold-500/20 mx-auto mb-3" />
          <p className="font-serif text-white font-light text-base">База заявок пуста</p>
          <p className="text-xs mt-2 font-light leading-relaxed max-w-md mx-auto">Оставьте проверочную заявку на обратный звонок или пройдите квиз-подбор выше — они мгновенно появятся в этой панели!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredLeads.map((lead) => (
            <div
              key={lead.id}
              className="bg-dark-950 border border-white/5 p-5 sm:p-6 shadow-xl space-y-4 transition-all hover:border-white/10"
              id={`crm-lead-${lead.id}`}
            >
              {/* Lead main meta bar */}
              <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-3 border-b border-white/5">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="text-sm font-serif font-light text-white">
                    {lead.name}
                  </span>
                  <span className="text-[10px] font-mono bg-dark-900 px-2 py-0.5 text-white/40 border border-white/5">
                    ID: {lead.id.slice(-6).toUpperCase()}
                  </span>
                  <span className="text-[10px] px-2.5 py-0.5 bg-gold-500/5 text-gold-500 border border-gold-500/10 font-mono tracking-wider uppercase">
                    {getTypeLabel(lead.type)}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-white/40 font-mono">
                  <Calendar className="w-3.5 h-3.5 text-gold-500/40" />
                  <span>{new Date(lead.createdAt).toLocaleString('ru-RU')}</span>
                </div>
              </div>

              {/* Lead content details */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
                {/* Contact phone */}
                <div className="md:col-span-3 space-y-1">
                  <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest font-mono">КОНТАКТНЫЕ ДАННЫЕ:</p>
                  <a
                    href={`tel:${lead.phone}`}
                    className="text-xs font-bold font-mono text-gold-500 flex items-center gap-1.5 hover:text-gold-400"
                  >
                    <span>{lead.phone}</span>
                  </a>
                  {lead.email && <p className="text-xs text-white/50 font-mono">{lead.email}</p>}
                </div>

                {/* Substantive query description or quiz result */}
                <div className="md:col-span-6 space-y-1 bg-dark-900 p-4 border border-white/5">
                  <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest font-mono mb-2">ПОДРОБНОСТИ ЗАЯВКИ:</p>
                  
                  {lead.type === 'quiz' && lead.quizResult && (
                    <div className="text-xs space-y-1.5 font-sans text-white/85 font-light">
                      <p>🎯 <strong className="text-gold-500 font-mono text-[9px] uppercase tracking-wider mr-1">Цель:</strong> {lead.quizResult.goal}</p>
                      <p>🏢 <strong className="text-gold-500 font-mono text-[9px] uppercase tracking-wider mr-1">Объект:</strong> {lead.quizResult.propertyType}</p>
                      <p>📍 <strong className="text-gold-500 font-mono text-[9px] uppercase tracking-wider mr-1">Район:</strong> {lead.quizResult.district}</p>
                      <p>💰 <strong className="text-gold-500 font-mono text-[9px] uppercase tracking-wider mr-1">Бюджет:</strong> {lead.quizResult.budget}</p>
                    </div>
                  )}

                  {lead.type === 'calculator' && lead.calcResult && (
                    <div className="text-xs space-y-1.5 font-sans text-white/85 font-light">
                      <p>🏦 <strong className="text-gold-500 font-mono text-[9px] uppercase tracking-wider mr-1">Оценка:</strong> {lead.calcResult.propertyValue.toLocaleString('ru-RU')} ₽</p>
                      <p>💳 <strong className="text-gold-500 font-mono text-[9px] uppercase tracking-wider mr-1">Платеж/Комиссия:</strong> {lead.calcResult.monthlyPayment.toLocaleString('ru-RU')} ₽</p>
                      {lead.calcResult.term > 0 && <p>⏳ <strong className="text-gold-500 font-mono text-[9px] uppercase tracking-wider mr-1">Срок:</strong> {lead.calcResult.term} лет</p>}
                    </div>
                  )}

                  {(lead.type === 'callback' || lead.type === 'question') && lead.notes && (
                    <p className="text-xs text-white/80 leading-relaxed italic font-light">
                      "{lead.notes}"
                    </p>
                  )}
                </div>

                {/* Status selector */}
                <div className="md:col-span-3 space-y-2">
                  <p className="text-[9px] text-white/40 font-bold uppercase tracking-widest font-mono">СТАТУС ЗАЯВКИ:</p>
                  <select
                    value={lead.status}
                    onChange={(e) => onUpdateStatus(lead.id, e.target.value as Lead['status'])}
                    className={`w-full text-xs font-semibold px-2.5 py-1.5 border focus:outline-none focus:border-gold-500 ${getStatusBadgeClass(
                      lead.status
                    )}`}
                  >
                    <option value="new">Новая</option>
                    <option value="contacted">Связались</option>
                    <option value="negotiation">В работе</option>
                    <option value="closed_won">Закрыта (Успех)</option>
                    <option value="closed_lost">Отказ</option>
                  </select>
                </div>
              </div>

              {/* Private realtor comments box */}
              <div className="flex gap-3.5 items-center pt-2.5 border-t border-white/5">
                <span className="text-[9px] text-white/40 font-bold uppercase tracking-widest font-mono shrink-0">ЗАМЕТКИ ЕЛЕНЫ:</span>
                <input
                  type="text"
                  placeholder="Добавить внутренний рабочий комментарий риелтора..."
                  value={lead.notes && lead.type !== 'callback' && lead.type !== 'question' ? lead.notes : ''}
                  onChange={(e) => onUpdateNotes(lead.id, e.target.value)}
                  className="flex-1 bg-dark-900 border border-white/10 px-3 py-1.5 text-xs text-white/80 focus:outline-none focus:border-gold-500 font-light"
                />
                <button
                  onClick={() => onDeleteLead(lead.id)}
                  className="p-1.5 text-white/40 hover:text-red-500 transition-colors shrink-0 cursor-pointer"
                  title="Удалить лид"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}
