import React from 'react';
import { REALTOR_INFO } from '../data';
import { ClipboardCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

interface HeroProps {
  onOpenCallback: () => void;
  onOpenQuiz: () => void;
}

export default function Hero({ onOpenCallback, onOpenQuiz }: HeroProps) {
  return (
    <section className="relative overflow-hidden bg-dark-900 text-white py-16 lg:py-28 border-b border-white/5" id="hero">
      {/* Subtle architectural background pattern */}
      <div className="absolute inset-0 z-0 opacity-[0.03] bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px]"></div>
      <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-gold-500/10 rounded-full blur-[140px] opacity-40 pointer-events-none z-0"></div>
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] bg-gold-500/5 rounded-full blur-[140px] opacity-20 pointer-events-none z-0"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Text Content (Left Side) */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-4">
              <p className="text-gold-500 font-serif italic text-xl sm:text-2xl tracking-wide">
                Елена Васильева • {REALTOR_INFO.experience}
              </p>
              
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light leading-[1.15] text-white">
                Профессиональный <br/> подход к вашему <br/> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gold-400 font-normal">
                  будущему дому
                </span>
              </h1>
            </div>

            <p className="text-white/60 max-w-xl leading-relaxed text-sm sm:text-base font-light">
              Приветствую! Я помогаю омичам безопасно приобретать новостройки без комиссии, выгодно продавать вторичное жильё по лучшей цене и одобрять сложную ипотеку. Полное сопровождение сделок с абсолютной юридической чистотой.
            </p>

            {/* Premium Mini-Bullet Points */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg text-left text-xs sm:text-sm text-white/70">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span>Новостройки Омска — <strong className="text-white font-medium">0% комиссии</strong></span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span>Юридическое заключение безопасности</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span>Скидки до <strong className="text-white font-medium">0.6%</strong> на ставку ипотеки</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                <span>Профессиональный хоумстейджинг</span>
              </div>
            </div>

            {/* Actions (Blocky Premium Buttons) */}
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={onOpenQuiz}
                className="flex items-center justify-center gap-2 bg-gold-500 text-black hover:bg-gold-400 font-bold px-8 py-4 text-xs uppercase tracking-widest transition-all shadow-xl hover:translate-y-[-1px] active:translate-y-[1px]"
                id="hero-quiz-btn"
              >
                <ClipboardCheck className="w-4 h-4" />
                <span>Подобрать квартиру</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              
              <button
                onClick={onOpenCallback}
                className="flex items-center justify-center gap-2 bg-dark-800 hover:bg-dark-700 text-white border border-white/10 px-8 py-4 text-xs font-bold uppercase tracking-widest transition-all"
                id="hero-consultation-btn"
              >
                <span>Консультация</span>
              </button>
            </div>
          </div>

          {/* Visual Showcase & Stats (Right Side) */}
          <div className="lg:col-span-5 w-full space-y-6">
            
            {/* Visual Avatar Frame */}
            <div className="relative w-full h-[320px] sm:h-[400px] bg-dark-800 border border-white/5 p-4 sm:p-6">
              {/* Premium double frame design */}
              <div className="absolute inset-0 border border-white/10 m-3 pointer-events-none"></div>
              <div className="absolute inset-0 border border-gold-500/20 m-6 pointer-events-none"></div>
              
              <div className="w-full h-full relative overflow-hidden group">
                <img
                  src={REALTOR_INFO.photo}
                  alt={REALTOR_INFO.name}
                  className="w-full h-full object-cover object-top filter grayscale contrast-125 brightness-90 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                  referrerPolicy="no-referrer"
                  id="realtor-hero-avatar"
                />
                
                {/* Subtle overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-85"></div>
                
                {/* Floating identity banner */}
                <div className="absolute bottom-4 left-4 right-4 bg-dark-950/90 border border-white/5 backdrop-blur-md p-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-xs font-bold tracking-widest uppercase text-white font-sans">
                      {REALTOR_INFO.name}
                    </h3>
                    <p className="text-[9px] text-white/50 tracking-wider uppercase font-mono mt-0.5">
                      Риелтор высшей категории
                    </p>
                  </div>
                  <div className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse" title="Сейчас на связи"></div>
                </div>
              </div>
            </div>

            {/* Core Stats in Blocky Style */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-dark-700 p-5 border-l-4 border-gold-500 border-y border-r border-white/5 shadow-lg">
                <span className="text-3xl sm:text-4xl font-serif text-gold-500 font-bold block mb-1">
                  550+
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/40 font-mono block">
                  Успешных сделок
                </span>
              </div>
              
              <div className="bg-dark-700 p-5 border-l-4 border-gold-500 border-y border-r border-white/5 shadow-lg">
                <span className="text-3xl sm:text-4xl font-serif text-gold-500 font-bold block mb-1">
                  11 лет
                </span>
                <span className="text-[9px] sm:text-[10px] uppercase tracking-widest text-white/40 font-mono block">
                  Опыта в Омске
                </span>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
