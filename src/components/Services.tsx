import React, { useState } from 'react';
import { SERVICES } from '../data';
import { Search, Home, Percent, Shield, ChevronDown, ChevronUp, Check, ArrowRight } from 'lucide-react';

interface ServicesProps {
  onSelectService: (serviceName: string) => void;
}

const IconMap: Record<string, React.ComponentType<any>> = {
  Search: Search,
  Home: Home,
  Percent: Percent,
  Shield: Shield
};

export default function Services({ onSelectService }: ServicesProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    if (expandedId === id) {
      setExpandedId(null);
    } else {
      setExpandedId(id);
    }
  };

  return (
    <section className="py-24 bg-dark-800 border-b border-white/5" id="services">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-500 font-mono mb-3">
            ЧЕМ Я МОГУ ПОМОЧЬ
          </h2>
          <p className="text-3xl sm:text-4xl font-serif font-light text-white tracking-wide">
            Профессиональные риелторские услуги в Омске
          </p>
          <div className="h-[1px] w-20 bg-gold-500 mx-auto mt-5"></div>
          <p className="text-white/60 mt-5 text-sm sm:text-base leading-relaxed">
            Весь комплекс операций с жилой и коммерческой недвижимостью. Прозрачные цены, официальный договор и полная ответственность за результат.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES.map((service) => {
            const IconComponent = IconMap[service.icon] || Home;
            const isExpanded = expandedId === service.id;

            return (
              <div
                key={service.id}
                className={`bg-dark-700 border transition-all duration-300 flex flex-col ${
                  isExpanded
                    ? 'border-gold-500 shadow-[0_0_25px_rgba(197,160,89,0.15)]'
                    : 'border-white/5 shadow-xl hover:border-white/15'
                }`}
                id={`service-card-${service.id}`}
              >
                <div className="p-6 sm:p-8 flex-1">
                  {/* Icon and Price */}
                  <div className="flex justify-between items-start gap-4 mb-6">
                    <div className="p-3.5 bg-dark-800 border border-white/10 text-gold-500">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] text-white/40 tracking-wider uppercase font-mono">СТОИМОСТЬ</p>
                      <p className="text-base sm:text-lg font-bold text-gold-500 font-serif mt-1">{service.price}</p>
                    </div>
                  </div>

                  {/* Text */}
                  <h3 className="text-lg sm:text-xl font-serif text-white mb-3">
                    {service.title}
                  </h3>
                  <p className="text-white/60 text-sm mb-6 leading-relaxed font-light">
                    {service.description}
                  </p>

                  {/* Expanded Checklist */}
                  {isExpanded && (
                    <div className="space-y-4 pt-5 border-t border-white/5 animate-slideDown">
                      <p className="text-[9px] font-bold uppercase tracking-widest text-white/50 font-mono">
                        ЧТО ВХОДИТ В СТОИМОСТЬ:
                      </p>
                      <ul className="space-y-3">
                        {service.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-white/80 font-light">
                            <span className="flex h-5 w-5 items-center justify-center bg-gold-500/10 text-gold-500 shrink-0 mt-0.5 border border-gold-500/20">
                              <Check className="w-3.5 h-3.5" />
                            </span>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                {/* Footer Controls */}
                <div className="px-6 py-4 bg-dark-900 border-t border-white/5 flex items-center justify-between gap-4">
                  <button
                    onClick={() => toggleExpand(service.id)}
                    className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-white/50 hover:text-gold-500 transition-colors font-mono cursor-pointer"
                    id={`service-toggle-${service.id}`}
                  >
                    <span>{isExpanded ? 'Скрыть детали' : 'Что входит в услугу'}</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4 text-gold-500" /> : <ChevronDown className="w-4 h-4 text-gold-500" />}
                  </button>

                  <button
                    onClick={() => onSelectService(service.title)}
                    className="flex items-center gap-1 text-[10px] font-bold tracking-widest uppercase text-gold-500 hover:text-gold-400 font-mono cursor-pointer"
                    id={`service-order-${service.id}`}
                  >
                    <span>Оставить заявку</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout */}
        <div className="mt-16 bg-dark-950 border border-white/5 p-8 sm:p-12 text-white relative overflow-hidden">
          {/* Subtle gold blur gradient */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-gold-500/10 rounded-full blur-[100px] pointer-events-none"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left space-y-3.5 max-w-2xl">
              <span className="text-gold-500 font-mono text-[9px] font-bold tracking-[0.2em] uppercase">
                АКЦИЯ МЕСЯЦА В ОМСКЕ
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif font-light tracking-wide leading-tight">
                Покупка новостройки в Омске — абсолютно <span className="text-gold-500 font-normal">БЕСПЛАТНО</span>
              </h3>
              <p className="text-white/60 text-xs sm:text-sm leading-relaxed font-light">
                Мою работу полностью оплачивают застройщики-партнёры. Для вас цена квартиры остаётся прежней, плюс вы получаете скидки на ипотечную ставку и полное юридическое сопровождение с моей стороны.
              </p>
            </div>
            
            <button
              onClick={() => onSelectService('Новостройки (Бесплатный подбор)')}
              className="bg-gold-500 text-black hover:bg-gold-400 font-bold px-7 py-4 text-xs uppercase tracking-widest transition-all shrink-0 cursor-pointer shadow-lg"
              id="services-promo-btn"
            >
              Подобрать новостройку
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}
