import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Calculators from './components/Calculators';
import OmskMapGuide from './components/OmskMapGuide';
import PropertiesList from './components/PropertiesList';
import Testimonials from './components/Testimonials';
import ContactForm from './components/ContactForm';
import Quiz from './components/Quiz';
import CrmPanel from './components/CrmPanel';
import { Lead } from './types';
import { REALTOR_INFO } from './data';
import { ShieldCheck, MessageSquare, Phone, MapPin } from 'lucide-react';

const LOCAL_STORAGE_KEY = 'omsk_realtor_leads_db_v1';

const INITIAL_DEMO_LEADS: Lead[] = [
  {
    id: 'demo-lead-1',
    name: 'Константин Смирнов',
    phone: '+7 (904) 585-44-32',
    email: 'k.smirnov@gmail.com',
    type: 'quiz',
    status: 'new',
    createdAt: new Date(Date.now() - 3600000 * 2).toISOString(), // 2 hours ago
    notes: 'Подобрать евро-двушку с предчистовой отделкой',
    quizResult: {
      goal: 'Купить жилье для себя',
      propertyType: 'Новостройка (Бесплатный подбор, 0% комиссии)',
      district: 'Кировский округ (Левый Берег - современный, семейный)',
      budget: 'От 4 000 000 до 7 000 000 ₽'
    }
  },
  {
    id: 'demo-lead-2',
    name: 'Мария Кузнецова',
    phone: '+7 (913) 611-22-99',
    type: 'callback',
    status: 'negotiation',
    createdAt: new Date(Date.now() - 3600000 * 24).toISOString(), // 1 day ago
    notes: 'Интересуется продажей квартиры в Нефтяниках (пр. Мира). Требуется бесплатная рыночная оценка.',
  }
];

export default function App() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCrmOpen, setIsCrmOpen] = useState(false);
  const [preFilledMessage, setPreFilledMessage] = useState('');

  // Read leads from local storage on load
  useEffect(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (stored) {
      try {
        setLeads(JSON.parse(stored));
      } catch (err) {
        console.error('Failed to parse leads, resetting with demo data', err);
        setLeads(INITIAL_DEMO_LEADS);
      }
    } else {
      setLeads(INITIAL_DEMO_LEADS);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(INITIAL_DEMO_LEADS));
    }
  }, []);

  // Save leads helper
  const saveLeads = (updated: Lead[]) => {
    setLeads(updated);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  };

  // Add lead action
  const handleAddNewLead = (newLead: Omit<Lead, 'id' | 'createdAt' | 'status'>) => {
    const lead: Lead = {
      ...newLead,
      id: `lead-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      status: 'new',
      createdAt: new Date().toISOString()
    };
    const updated = [lead, ...leads];
    saveLeads(updated);
  };

  // Callback direct form submission
  const handleFormConsultationSubmit = (name: string, phone: string, message: string) => {
    handleAddNewLead({
      name,
      phone,
      type: message.includes('показ') ? 'callback' : 'question',
      notes: message
    });
  };

  // Calculator form submission
  const handleCalculatorLeadSubmit = (
    name: string,
    phone: string,
    type: 'calculator',
    calcResult: { propertyValue: number; monthlyPayment: number; term: number }
  ) => {
    handleAddNewLead({
      name,
      phone,
      type,
      notes: `Быстрый расчет с калькулятора. Цена недвижимости: ${calcResult.propertyValue.toLocaleString('ru-RU')} ₽. Ежемесячный платеж/комиссия: ${calcResult.monthlyPayment.toLocaleString('ru-RU')} ₽.`,
      calcResult
    });
  };

  // Quiz wizard submission
  const handleQuizWizardSubmit = (quizData: {
    name: string;
    phone: string;
    email?: string;
    goal: string;
    propertyType: string;
    district: string;
    budget: string;
  }) => {
    handleAddNewLead({
      name: quizData.name,
      phone: quizData.phone,
      email: quizData.email,
      type: 'quiz',
      notes: `Клиент прошел квиз. Предпочитает ${quizData.district}, цель: ${quizData.goal}`,
      quizResult: {
        goal: quizData.goal,
        propertyType: quizData.propertyType,
        district: quizData.district,
        budget: quizData.budget
      }
    });
  };

  // CRM operations
  const handleUpdateStatus = (id: string, status: Lead['status']) => {
    const updated = leads.map((l) => (l.id === id ? { ...l, status } : l));
    saveLeads(updated);
  };

  const handleUpdateNotes = (id: string, notes: string) => {
    const updated = leads.map((l) => (l.id === id ? { ...l, notes } : l));
    saveLeads(updated);
  };

  const handleDeleteLead = (id: string) => {
    const updated = leads.filter((l) => l.id !== id);
    saveLeads(updated);
  };

  const handleClearAllLeads = () => {
    if (window.confirm('Вы действительно хотите удалить все заявки из CRM?')) {
      saveLeads([]);
    }
  };

  const handleAddMockLead = () => {
    const names = ['Алексей Власов', 'Екатерина Петрова', 'Владимир Зуев', 'Наталья Соколова'];
    const phones = ['+7 (913) 484-90-21', '+7 (950) 782-12-54', '+7 (904) 580-00-99', '+7 (913) 630-15-15'];
    const goals = ['Купить квартиру', 'Продать квартиру', 'Консультация по ипотеке'];
    const districts = ['Кировский (Левый берег)', 'Центральный', 'Советский (Нефтяники)'];

    const randomName = names[Math.floor(Math.random() * names.length)];
    const randomPhone = phones[Math.floor(Math.random() * phones.length)];
    const randomGoal = goals[Math.floor(Math.random() * goals.length)];
    const randomDistrict = districts[Math.floor(Math.random() * districts.length)];

    const mock: Lead = {
      id: `lead-mock-${Date.now()}`,
      name: randomName,
      phone: randomPhone,
      type: 'quiz',
      status: 'new',
      createdAt: new Date().toISOString(),
      notes: `Демонстрационный лид с квиза. Цель: ${randomGoal}`,
      quizResult: {
        goal: randomGoal,
        propertyType: 'Вторичное жилье',
        district: randomDistrict,
        budget: 'От 4 000 000 до 7 000 000 ₽'
      }
    };

    saveLeads([mock, ...leads]);
  };

  // Interactive triggers from listings or services
  const handleSelectServiceFromCard = (serviceName: string) => {
    setPreFilledMessage(`Здравствуйте! Интересует услуга: "${serviceName}". Хочу проконсультироваться.`);
    const contactSection = document.getElementById('contacts');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectPropertyViewing = (propertyTitle: string) => {
    setPreFilledMessage(`Здравствуйте! Хочу записаться на показ объекта: "${propertyTitle}".`);
    const contactSection = document.getElementById('contacts');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Get count of "new" status leads
  const newLeadsCount = leads.filter((l) => l.status === 'new').length;

  return (
    <div className="min-h-screen bg-dark-900 flex flex-col text-white/80 font-sans antialiased">
      
      {/* Dynamic Header */}
      <Header
        onOpenCallback={() => {
          setPreFilledMessage('Здравствуйте! Нужна консультация риелтора.');
          const contactSection = document.getElementById('contacts');
          if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
        }}
        isCrmOpen={isCrmOpen}
        setIsCrmOpen={setIsCrmOpen}
        newLeadsCount={newLeadsCount}
      />

      {/* Main Content Layout */}
      <main className="flex-1">
        
        {/* Dynamic CRM Drawer */}
        {isCrmOpen && (
          <div className="bg-dark-850 border-b border-white/5">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <CrmPanel
                leads={leads}
                onUpdateStatus={handleUpdateStatus}
                onUpdateNotes={handleUpdateNotes}
                onDeleteLead={handleDeleteLead}
                onAddMockLead={handleAddMockLead}
                onClearAllLeads={handleClearAllLeads}
                onClose={() => setIsCrmOpen(false)}
              />
            </div>
          </div>
        )}

        {/* Hero Banner Section */}
        <Hero
          onOpenCallback={() => {
            setPreFilledMessage('Здравствуйте! Запишите меня на консультацию.');
            const contactSection = document.getElementById('contacts');
            if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

        {/* Services Showcase */}
        <Services onSelectService={handleSelectServiceFromCard} />

        {/* Calculators Panel */}
        <Calculators onLeadSubmit={handleCalculatorLeadSubmit} />

        {/* Interactive Omsk Districts Map & Market Analysis */}
        <OmskMapGuide />

        {/* Catalog of Properties in Omsk */}
        <PropertiesList onSelectProperty={handleSelectPropertyViewing} />

        {/* Real Client Testimonials */}
        <Testimonials />

        {/* Contact Form and office location */}
        <ContactForm
          preFilledMessage={preFilledMessage}
          onFormSubmit={handleFormConsultationSubmit}
        />
      </main>

      {/* FOOTER */}
      <footer className="bg-dark-950 text-white py-16 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            
            {/* Branding Column */}
            <div className="md:col-span-5 space-y-4">
              <span className="text-xl font-serif font-light tracking-wide text-white block">
                {REALTOR_INFO.name}
              </span>
              <p className="text-white/50 text-xs sm:text-sm max-w-sm leading-relaxed font-light">
                Индивидуальный подход к сделкам любой сложности в Омске и Омской области. Член Гильдии Риелторов. Гарантия юридической безопасности и прозрачности расчетов.
              </p>
              <div className="flex gap-3 text-[10px] text-gold-500 font-mono tracking-wider uppercase">
                <span className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 shrink-0" /> Страхование сделок</span>
                <span>•</span>
                <span>Лицензия №55-08-412</span>
              </div>
            </div>

            {/* Quick Contacts Column */}
            <div className="md:col-span-4 space-y-3.5 text-sm">
              <h4 className="text-[9px] font-bold text-white/40 uppercase tracking-widest font-mono mb-2">
                Контакты для связи
              </h4>
              <p className="flex items-center gap-2.5 text-white/90">
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <a href={`tel:${REALTOR_INFO.phone}`} className="font-mono hover:text-gold-400">{REALTOR_INFO.phone}</a>
              </p>
              <p className="flex items-center gap-2.5 text-white/70">
                <MapPin className="w-4 h-4 text-gold-500 shrink-0" />
                <span className="text-xs sm:text-sm font-light font-serif">{REALTOR_INFO.officeAddress}</span>
              </p>
              <div className="pt-2 flex gap-2">
                <a
                  href={REALTOR_INFO.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] bg-dark-900 border border-white/10 hover:border-gold-500/30 hover:text-gold-500 px-3.5 py-2 flex items-center gap-1.5 transition-all font-mono uppercase tracking-wider rounded-none cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>TG</span>
                </a>
                <a
                  href={REALTOR_INFO.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[10px] bg-dark-900 border border-white/10 hover:border-gold-500/30 hover:text-gold-500 px-3.5 py-2 flex items-center gap-1.5 transition-all font-mono uppercase tracking-wider rounded-none cursor-pointer"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>WA</span>
                </a>
              </div>
            </div>

            {/* Disclaimer and links */}
            <div className="md:col-span-3 space-y-3 text-[10px] text-white/30 leading-relaxed font-light">
              <h4 className="text-[9px] font-bold text-white/40 uppercase tracking-widest font-mono mb-2">
                Информация
              </h4>
              <p>
                Любая информация, представленная на данном сайте, носит справочно-информационный характер и не является публичной офертой, определяемой положениями статьи 437 ГК РФ.
              </p>
              <p>
                Ипотека предоставляется банками-партнерами (ПАО Сбербанк, Банк ВТБ (ПАО), АО "Альфа-Банк" и др.). Условия кредитования определяются банками индивидуально.
              </p>
            </div>
          </div>

          <div className="mt-12 pt-8 border-t border-white/5 text-center text-[10px] text-white/30 flex flex-col sm:flex-row justify-between items-center gap-4">
            <p>© {new Date().getFullYear()} {REALTOR_INFO.name}. Все права защищены.</p>
            <div className="flex gap-4 font-light">
              <span className="hover:text-gold-400 cursor-pointer">Политика конфиденциальности</span>
              <span>•</span>
              <span className="hover:text-gold-400 cursor-pointer">Согласие на обработку данных</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Interactive Selection Quiz wizard */}
      {isQuizOpen && (
        <Quiz
          onClose={() => setIsQuizOpen(false)}
          onQuizSubmit={handleQuizWizardSubmit}
        />
      )}
    </div>
  );
}
