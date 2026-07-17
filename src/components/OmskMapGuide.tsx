import React, { useState } from 'react';
import { DISTRICTS_DATA } from '../data';
import { District, DistrictInfo } from '../types';
import { MapPin, TrendingUp, CheckCircle2 } from 'lucide-react';

export default function OmskMapGuide() {
  const [selectedDistrict, setSelectedDistrict] = useState<District>('КАО');

  const activeDistrictInfo = DISTRICTS_DATA.find((d) => d.id === selectedDistrict) as DistrictInfo;

  return (
    <section className="py-24 bg-dark-800 border-b border-white/5 relative" id="districts">
      {/* Delicate background stars pattern */}
      <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:20px_20px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-500 font-mono mb-3">
            ГДЕ ЖИТЬ В ОМСКЕ
          </h2>
          <p className="text-3xl sm:text-4xl font-serif font-light text-white tracking-wide">
            Интерактивный гид по районам Омска
          </p>
          <div className="h-[1px] w-20 bg-gold-500 mx-auto mt-5"></div>
          <p className="text-white/60 mt-5 text-sm sm:text-base leading-relaxed font-light">
            Рынок недвижимости Омска сильно отличается в зависимости от административного округа. Нажмите на район на интерактивной схеме или в меню ниже для аналитики цен и перспективности.
          </p>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: Interactive Map */}
          <div className="lg:col-span-6 bg-dark-700 border border-white/5 p-6 sm:p-8 rounded-none shadow-2xl flex flex-col items-center">
            <h3 className="text-[10px] font-bold uppercase tracking-wider text-gold-500/80 mb-6 flex items-center gap-2 self-start font-mono">
              <span>🗺️ ИНТЕРАКТИВНАЯ КАРТА ОКРУГОВ</span>
            </h3>

            {/* SVG Map of Omsk */}
            <div className="relative w-full max-w-[380px] aspect-square bg-dark-950 rounded-none p-4 border border-white/5 shadow-2xl overflow-hidden">
              <svg
                viewBox="0 0 400 400"
                className="w-full h-full select-none"
                id="omsk-svg-map"
              >
                {/* Background Grid Lines */}
                <path d="M 50 0 L 50 400 M 100 0 L 100 400 M 150 0 L 150 400 M 200 0 L 200 400 M 250 0 L 250 400 M 300 0 L 300 400 M 350 0 L 350 400" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="2,4" />
                <path d="M 0 50 L 400 50 M 0 100 L 400 100 M 0 150 L 400 150 M 0 200 L 400 200 M 0 250 L 400 250 M 0 300 L 400 300 M 0 350 L 400 350" fill="none" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" strokeDasharray="2,4" />

                {/* River Irtysh Flowing through Omsk */}
                <path
                  d="M 330 400 C 310 320, 270 280, 240 220 C 215 170, 160 140, 140 100 C 125 70, 110 30, 90 0"
                  fill="none"
                  stroke="rgba(197, 160, 89, 0.05)"
                  strokeWidth="24"
                  strokeLinecap="round"
                />
                <path
                  d="M 330 400 C 310 320, 270 280, 240 220 C 215 170, 160 140, 140 100 C 125 70, 110 30, 90 0"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="5"
                  strokeLinecap="round"
                  className="opacity-70"
                />
                {/* Text for Irtysh */}
                <text x="235" y="325" fill="#C5A059" fontSize="8" fontFamily="monospace" transform="rotate(-65, 235, 320)" className="opacity-40 font-bold tracking-widest">ИРТЫШ</text>

                {/* River Om */}
                <path
                  d="M 400 215 C 340 210, 280 200, 235 208"
                  fill="none"
                  stroke="rgba(197, 160, 89, 0.05)"
                  strokeWidth="14"
                  strokeLinecap="round"
                />
                <path
                  d="M 400 215 C 340 210, 280 200, 235 208"
                  fill="none"
                  stroke="#3b82f6"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  className="opacity-60"
                />
                {/* Text for Om */}
                <text x="330" y="193" fill="#C5A059" fontSize="7" fontFamily="monospace" className="opacity-40 font-bold tracking-widest">р. ОМЬ</text>

                {/* KAO - Kirovsky Okrug (Left Bank) */}
                <path
                  d="M 30 140 L 130 140 C 150 170, 195 190, 220 220 C 240 260, 270 290, 290 350 L 180 380 L 30 300 Z"
                  fill={selectedDistrict === 'КАО' ? '#C5A059' : '#1A1D21'}
                  fillOpacity={selectedDistrict === 'КАО' ? '0.2' : '0.4'}
                  stroke={selectedDistrict === 'КАО' ? '#C5A059' : 'rgba(255,255,255,0.1)'}
                  strokeWidth={selectedDistrict === 'КАО' ? '2.5' : '1'}
                  onClick={() => setSelectedDistrict('КАО')}
                  className="cursor-pointer transition-all duration-300 hover:fill-[#C5A059]/30"
                />
                <text x="95" y="250" fill={selectedDistrict === 'КАО' ? '#C5A059' : '#ffffff'} fontSize="12" fontWeight="bold" fontFamily="sans-serif" className="pointer-events-none tracking-widest">КАО</text>
                <text x="75" y="265" fill={selectedDistrict === 'КАО' ? '#ffffff' : '#ffffff/40'} fontSize="8" fontFamily="sans-serif" className="pointer-events-none opacity-50">Левый берег</text>

                {/* САО - Sovetsky Okrug (Neftyaniki) */}
                <path
                  d="M 120 20 C 130 50, 140 70, 150 95 C 175 145, 210 160, 215 160 L 260 90 L 260 20 Z"
                  fill={selectedDistrict === 'САО' ? '#C5A059' : '#1A1D21'}
                  fillOpacity={selectedDistrict === 'САО' ? '0.2' : '0.4'}
                  stroke={selectedDistrict === 'САО' ? '#C5A059' : 'rgba(255,255,255,0.1)'}
                  strokeWidth={selectedDistrict === 'САО' ? '2.5' : '1'}
                  onClick={() => setSelectedDistrict('САО')}
                  className="cursor-pointer transition-all duration-300 hover:fill-[#C5A059]/30"
                />
                <text x="180" y="70" fill={selectedDistrict === 'САО' ? '#C5A059' : '#ffffff'} fontSize="12" fontWeight="bold" fontFamily="sans-serif" className="pointer-events-none tracking-widest">САО</text>
                <text x="160" y="85" fill={selectedDistrict === 'САО' ? '#ffffff' : '#ffffff/40'} fontSize="8" fontFamily="sans-serif" className="pointer-events-none opacity-50">Нефтяники</text>

                {/* ЦАО - Central Okrug */}
                <path
                  d="M 215 160 L 260 90 L 360 120 L 330 200 L 235 208 Z"
                  fill={selectedDistrict === 'ЦАО' ? '#C5A059' : '#1A1D21'}
                  fillOpacity={selectedDistrict === 'ЦАО' ? '0.2' : '0.4'}
                  stroke={selectedDistrict === 'ЦАО' ? '#C5A059' : 'rgba(255,255,255,0.1)'}
                  strokeWidth={selectedDistrict === 'ЦАО' ? '2.5' : '1'}
                  onClick={() => setSelectedDistrict('ЦАО')}
                  className="cursor-pointer transition-all duration-300 hover:fill-[#C5A059]/30"
                />
                <text x="270" y="155" fill={selectedDistrict === 'ЦАО' ? '#C5A059' : '#ffffff'} fontSize="12" fontWeight="bold" fontFamily="sans-serif" className="pointer-events-none tracking-widest">ЦАО</text>
                <text x="260" y="170" fill={selectedDistrict === 'ЦАО' ? '#ffffff' : '#ffffff/40'} fontSize="8" fontFamily="sans-serif" className="pointer-events-none opacity-50">Центр</text>

                {/* ОАО - Oktyabrsky Okrug */}
                <path
                  d="M 235 208 L 330 200 L 380 230 L 380 300 L 275 280 Z"
                  fill={selectedDistrict === 'ОАО' ? '#C5A059' : '#1A1D21'}
                  fillOpacity={selectedDistrict === 'ОАО' ? '0.2' : '0.4'}
                  stroke={selectedDistrict === 'ОАО' ? '#C5A059' : 'rgba(255,255,255,0.1)'}
                  strokeWidth={selectedDistrict === 'ОАО' ? '2.5' : '1'}
                  onClick={() => setSelectedDistrict('ОАО')}
                  className="cursor-pointer transition-all duration-300 hover:fill-[#C5A059]/30"
                />
                <text x="310" y="245" fill={selectedDistrict === 'ОАО' ? '#C5A059' : '#ffffff'} fontSize="12" fontWeight="bold" fontFamily="sans-serif" className="pointer-events-none tracking-widest">ОАО</text>
                <text x="295" y="260" fill={selectedDistrict === 'ОАО' ? '#ffffff' : '#ffffff/40'} fontSize="8" fontFamily="sans-serif" className="pointer-events-none opacity-50">Октябрьский</text>

                {/* ЛАО - Leninsky Okrug */}
                <path
                  d="M 275 280 L 380 300 L 350 380 L 295 348 Z"
                  fill={selectedDistrict === 'ЛАО' ? '#C5A059' : '#1A1D21'}
                  fillOpacity={selectedDistrict === 'ЛАО' ? '0.2' : '0.4'}
                  stroke={selectedDistrict === 'ЛАО' ? '#C5A059' : 'rgba(255,255,255,0.1)'}
                  strokeWidth={selectedDistrict === 'ЛАО' ? '2.5' : '1'}
                  onClick={() => setSelectedDistrict('ЛАО')}
                  className="cursor-pointer transition-all duration-300 hover:fill-[#C5A059]/30"
                />
                <text x="315" y="325" fill={selectedDistrict === 'ЛАО' ? '#C5A059' : '#ffffff'} fontSize="12" fontWeight="bold" fontFamily="sans-serif" className="pointer-events-none tracking-widest">ЛАО</text>
                <text x="305" y="340" fill={selectedDistrict === 'ЛАО' ? '#ffffff' : '#ffffff/40'} fontSize="8" fontFamily="sans-serif" className="pointer-events-none opacity-50">Ленинский</text>
              </svg>

              {/* Float Legend */}
              <div className="absolute bottom-3 left-3 bg-dark-900 border border-white/5 px-2.5 py-1 text-[9px] text-white/50 font-mono tracking-wider">
                💡 ВЫБЕРИТЕ ОКРУГ
              </div>
            </div>

            {/* Quick District Selector Badges */}
            <div className="flex flex-wrap gap-2 justify-center mt-6">
              {DISTRICTS_DATA.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setSelectedDistrict(d.id)}
                  className={`text-[10px] tracking-wider uppercase px-4 py-2 font-mono transition-all cursor-pointer ${
                    selectedDistrict === d.id
                      ? 'bg-gold-500 text-black font-bold'
                      : 'bg-dark-900 hover:bg-dark-850 text-white/70 border border-white/5'
                  }`}
                  id={`badge-district-${d.id}`}
                >
                  {d.id}
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Detailed analysis of the active district */}
          <div className="lg:col-span-6 space-y-7">
            <div className="flex items-start gap-4">
              <div className="p-3.5 bg-gold-500/10 border border-gold-500/20 text-gold-500 mt-1">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[9px] font-mono font-bold tracking-[0.25em] text-gold-500 uppercase block">АНАЛИТИКА РАЙОНА</span>
                <h3 className="text-xl sm:text-2xl font-serif font-light text-white tracking-wide mt-0.5">
                  {activeDistrictInfo.fullName}
                </h3>
              </div>
            </div>

            {/* Price section */}
            <div className="bg-dark-950 border border-white/5 p-5 flex items-center justify-between gap-4">
              <div>
                <p className="text-[10px] text-white/40 uppercase font-mono tracking-wider">СРЕДНЯЯ СТОИМОСТЬ КВ. МЕТРА</p>
                <p className="text-lg sm:text-2xl font-serif text-gold-500 font-bold mt-1.5">
                  {activeDistrictInfo.averagePrice}
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center bg-gold-500/10 text-gold-500 border border-gold-500/20">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>

            {/* Description */}
            <p className="text-white/60 text-sm leading-relaxed font-light bg-dark-900/40 p-5 border border-white/5">
              {activeDistrictInfo.description}
            </p>

            {/* Advantages Checklist */}
            <div className="space-y-4">
              <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-gold-500">
                ПРЕИМУЩЕСТВА ПОКУПКИ ЗДЕСЬ:
              </p>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {activeDistrictInfo.advantages.map((adv, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-white/80 font-light">
                    <CheckCircle2 className="w-4 h-4 text-gold-500 shrink-0 mt-0.5" />
                    <span>{adv}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Popular Complexes */}
            <div className="pt-6 border-t border-white/5">
              <p className="text-[9px] font-mono font-bold uppercase tracking-widest text-white/40 mb-3">
                🔥 ПОПУЛЯРНЫЕ ЖК И МИКРОРАЙОНЫ:
              </p>
              <div className="flex flex-wrap gap-2">
                {activeDistrictInfo.popularJKs.map((jk, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3.5 py-1.5 bg-dark-900 border border-white/5 text-white/70 font-light font-sans"
                  >
                    🏢 {jk}
                  </span>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
