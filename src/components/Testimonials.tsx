import React from 'react';
import { TESTIMONIALS } from '../data';
import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  return (
    <section className="py-24 bg-dark-800 border-b border-white/5" id="testimonials">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-500 font-mono mb-3">
            ИСТОРИИ УСПЕХА
          </h2>
          <p className="text-3xl sm:text-4xl font-serif font-light text-white tracking-wide">
            Отзывы моих клиентов в Омске
          </p>
          <div className="h-[1px] w-20 bg-gold-500 mx-auto mt-5"></div>
          <p className="text-white/60 mt-5 text-sm sm:text-base leading-relaxed font-light">
            Искренние отзывы от реальных людей, которым я помогла безопасно решить жилищный вопрос. Счастливые лица клиентов — моя главная награда!
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {TESTIMONIALS.map((review) => (
            <div
              key={review.id}
              className="bg-dark-700 border border-white/5 p-6 sm:p-8 flex flex-col justify-between relative shadow-2xl transition-all hover:border-white/10"
              id={`review-card-${review.id}`}
            >
              <Quote className="absolute top-6 right-6 w-10 h-10 text-gold-500/5 pointer-events-none" />

              <div className="space-y-4">
                {/* Rating */}
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-gold-500 text-gold-500" />
                  ))}
                </div>

                {/* Text (Elegant serif italic quote) */}
                <p className="text-white/85 text-sm sm:text-base leading-relaxed italic font-serif font-light">
                  "{review.text}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-6 mt-6 border-t border-white/5 flex items-center gap-3.5">
                {/* Avatar Initial circle */}
                <div className="h-10 w-10 bg-gold-500 text-black font-serif font-bold flex items-center justify-center text-sm shrink-0">
                  {review.name.charAt(0)}
                </div>

                <div className="overflow-hidden">
                  <p className="font-serif text-white text-sm sm:text-base truncate">{review.name}</p>
                  <p className="text-xs text-white/40 font-light mt-0.5">{review.role}</p>
                  
                  {/* Deal Type tag */}
                  <div className="inline-flex items-center gap-1.5 text-[9px] bg-gold-500/5 text-gold-500 border border-gold-500/10 font-mono tracking-wide px-2 py-0.5 rounded-none mt-2.5">
                    🤝 {review.dealType}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Review Badges */}
        <div className="mt-16 bg-dark-950 border border-white/5 p-8 flex flex-wrap items-center justify-around gap-8 text-center shadow-xl">
          <div className="space-y-1">
            <p className="text-3xl font-serif font-bold text-gold-500">5.0</p>
            <div className="flex gap-1 justify-center my-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-gold-500 text-gold-500" />
              ))}
            </div>
            <p className="text-[9px] text-white/40 uppercase font-mono tracking-widest">Оценка на Яндекс Картах</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-3xl font-serif font-bold text-gold-500">150+</p>
            <p className="text-gold-500 text-xs font-semibold font-mono tracking-wider">Отзывов на Авито</p>
            <p className="text-[9px] text-white/40 uppercase font-mono tracking-widest">Статус "Надёжный риелтор"</p>
          </div>
          
          <div className="space-y-1">
            <p className="text-3xl font-serif font-bold text-gold-500">4.9</p>
            <div className="flex gap-1 justify-center my-1.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3 h-3 fill-gold-500 text-gold-500" />
              ))}
            </div>
            <p className="text-[9px] text-white/40 uppercase font-mono tracking-widest">Рейтинг на Сбер Домклик</p>
          </div>
        </div>

      </div>
    </section>
  );
}
