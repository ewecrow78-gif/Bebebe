import React, { useState, useEffect } from 'react';
import { REALTOR_INFO } from '../data';
import { Send, Phone, MapPin, Clock, MessageSquare, CheckCircle } from 'lucide-react';

interface ContactFormProps {
  preFilledMessage: string;
  onFormSubmit: (name: string, phone: string, question: string) => void;
}

export default function ContactForm({ preFilledMessage, onFormSubmit }: ContactFormProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [question, setQuestion] = useState('');
  const [isSent, setIsSent] = useState(false);

  // Sync preFilledMessage if provided
  useEffect(() => {
    if (preFilledMessage) {
      setQuestion(preFilledMessage);
    }
  }, [preFilledMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    onFormSubmit(name, phone, question);
    setIsSent(true);

    setName('');
    setPhone('');
    setQuestion('');

    setTimeout(() => {
      setIsSent(false);
    }, 5000);
  };

  return (
    <section className="py-24 bg-dark-900 border-b border-white/5 relative" id="contacts">
      {/* Dynamic star pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px]"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          
          {/* Left: Contacts and Map details */}
          <div className="lg:col-span-5 space-y-8 flex flex-col justify-between">
            <div className="space-y-6">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-500 font-mono block mb-3">
                  СВЯЗАТЬСЯ СО МНОЙ
                </span>
                <h2 className="text-3xl sm:text-4xl font-serif font-light tracking-wide text-white">
                  Контакты и офис в Омске
                </h2>
                <div className="h-[1px] w-20 bg-gold-500 mt-5"></div>
              </div>

              <p className="text-white/60 text-sm sm:text-base leading-relaxed font-light">
                Я всегда рада видеть вас в своём офисе для личного обсуждения сделок. Напишите или позвоните мне — консультация по телефону бесплатна!
              </p>

              {/* Contacts info list */}
              <div className="space-y-4">
                <a
                  href={`tel:${REALTOR_INFO.phone}`}
                  className="flex items-start gap-4 p-4 rounded-none bg-dark-800 border border-white/5 hover:border-gold-500/40 hover:bg-dark-750 transition-all group"
                  id="contact-phone-box"
                >
                  <div className="p-3 bg-gold-500/10 text-gold-500 group-hover:bg-gold-500 group-hover:text-black transition-all shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] text-white/40 font-mono font-bold uppercase tracking-wider">Телефон для связи</p>
                    <p className="text-base sm:text-lg font-bold font-serif text-white mt-0.5">{REALTOR_INFO.phone}</p>
                    <p className="text-xs text-gold-500 font-light mt-0.5">Перезвоню за 5 минут</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 p-4 rounded-none bg-dark-800 border border-white/5">
                  <div className="p-3 bg-gold-500/10 text-gold-500 shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] text-white/40 font-mono font-bold uppercase tracking-wider">Адрес офиса в Омске</p>
                    <p className="text-sm font-light text-white/90 mt-1 font-serif">{REALTOR_INFO.officeAddress}</p>
                    <p className="text-[11px] text-white/30 mt-1 font-light">Остановка «Главпочтамт» или «Красный Путь»</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-none bg-dark-800 border border-white/5">
                  <div className="p-3 bg-gold-500/10 text-gold-500 shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-[9px] text-white/40 font-mono font-bold uppercase tracking-wider">Время работы</p>
                    <p className="text-sm font-light text-white/90 mt-1 font-serif">Пн – Сб: с 09:00 до 20:00</p>
                    <p className="text-[11px] text-gold-500 mt-0.5 font-light">Вс: по предварительной договоренности</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social communication buttons */}
            <div className="space-y-3 pt-6 border-t border-white/5">
              <p className="text-[9px] font-mono font-bold text-white/40 uppercase tracking-widest">
                БЫСТРАЯ СВЯЗЬ В МЕССЕНДЖЕРАХ:
              </p>
              <div className="grid grid-cols-2 gap-4">
                <a
                  href={REALTOR_INFO.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-none font-bold text-xs uppercase tracking-wider border border-green-500/20 bg-green-500/10 text-green-400 hover:bg-green-500 hover:text-black transition-all text-center cursor-pointer"
                  id="wa-link"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span>WhatsApp</span>
                </a>
                <a
                  href={REALTOR_INFO.telegram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 py-3 px-4 rounded-none font-bold text-xs uppercase tracking-wider border border-sky-500/20 bg-sky-500/10 text-sky-400 hover:bg-sky-500 hover:text-black transition-all text-center cursor-pointer"
                  id="tg-link"
                >
                  <MessageSquare className="w-4 h-4 shrink-0" />
                  <span>Telegram</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right: Interactive Contact Form */}
          <div className="lg:col-span-7 bg-dark-800 border border-white/5 p-6 sm:p-10 rounded-none flex flex-col justify-between shadow-2xl">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-xl font-serif font-light text-white">
                  Запишитесь на бесплатную консультацию
                </h3>
                <p className="text-xs text-white/50 leading-relaxed font-light">
                  Заполните форму, и я перезвоню вам лично, чтобы ответить на любые вопросы по омскому рынку жилья, помочь с ипотекой или продажей.
                </p>
              </div>

              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] font-mono font-bold text-white/40 uppercase tracking-wider mb-2">Ваше имя *</label>
                    <input
                      type="text"
                      required
                      placeholder="Сергей"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-dark-900 border border-white/10 rounded-none px-4 py-3 text-xs text-white focus:outline-none focus:border-gold-500 font-light"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] font-mono font-bold text-white/40 uppercase tracking-wider mb-2">Номер телефона *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+7 (999) 000-00-00"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-dark-900 border border-white/10 rounded-none px-4 py-3 text-xs text-white focus:outline-none focus:border-gold-500 font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[9px] font-mono font-bold text-white/40 uppercase tracking-wider mb-2">Опишите вашу задачу или вопрос</label>
                  <textarea
                    rows={4}
                    placeholder="Какая задача стоит перед вами? Например: продать квартиру на Левом берегу, одобрить семейную ипотеку..."
                    value={question}
                    onChange={(e) => setQuestion(e.target.value)}
                    className="w-full bg-dark-900 border border-white/10 rounded-none px-4 py-3 text-xs text-white focus:outline-none focus:border-gold-500 leading-relaxed font-light"
                  />
                </div>
              </div>

              {/* Status Display */}
              {isSent && (
                <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs sm:text-sm flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 shrink-0" />
                  <span className="font-light">Успешно отправлено! Елена Васильева перезвонит вам в течение 15 минут.</span>
                </div>
              )}

              {/* Action Submit */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full bg-gold-500 hover:bg-gold-400 text-black font-bold py-4 rounded-none text-xs sm:text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xl"
                  id="contact-submit-btn"
                >
                  <span>Записаться на бесплатную консультацию</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              <p className="text-[9px] text-white/30 text-center uppercase tracking-wider font-mono">
                Нажимая кнопку, вы подтверждаете согласие на обработку персональных данных.
              </p>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
}
