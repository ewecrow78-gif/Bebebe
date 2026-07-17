import React, { useState } from 'react';
import { PROPERTIES } from '../data';
import { Property, District } from '../types';
import { MapPin, SlidersHorizontal, ArrowUpDown, ChevronRight } from 'lucide-react';

interface PropertiesListProps {
  onSelectProperty: (propertyTitle: string) => void;
}

export default function PropertiesList({ onSelectProperty }: PropertiesListProps) {
  const [districtFilter, setDistrictFilter] = useState<District | 'Все'>('Все');
  const [typeFilter, setTypeFilter] = useState<Property['type'] | 'Все'>('Все');
  const [sortBy, setSortBy] = useState<'default' | 'price-asc' | 'price-desc'>('default');

  // Filter listings
  const filteredProperties = PROPERTIES.filter((p) => {
    const matchesDistrict = districtFilter === 'Все' || p.district === districtFilter;
    const matchesType = typeFilter === 'Все' || p.type === typeFilter;
    return matchesDistrict && matchesType;
  });

  // Sort listings
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    return 0; // default (order in array)
  });

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <section className="py-24 bg-dark-900 border-b border-white/5" id="catalog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-500 font-mono mb-3">
            ГОРЯЧИЕ ПРЕДЛОЖЕНИЯ
          </h2>
          <p className="text-3xl sm:text-4xl font-serif font-light text-white tracking-wide">
            Каталог проверенных объектов
          </p>
          <div className="h-[1px] w-20 bg-gold-500 mx-auto mt-5"></div>
          <p className="text-white/60 mt-5 text-sm sm:text-base leading-relaxed font-light">
            Актуальные квартиры и дома в Омске, юридическая чистота которых полностью проверена мной лично. Доступны для быстрого просмотра сегодня.
          </p>
        </div>

        {/* Controls Panel */}
        <div className="bg-dark-800 border border-white/5 p-6 sm:p-8 rounded-none shadow-2xl mb-12 space-y-5">
          <div className="flex items-center gap-2.5 pb-4 border-b border-white/5">
            <SlidersHorizontal className="w-4 h-4 text-gold-500" />
            <h3 className="text-xs font-bold uppercase tracking-widest text-white font-mono">
              Фильтры и сортировка
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            {/* District Filter */}
            <div className="md:col-span-5 space-y-2.5">
              <label className="text-[9px] font-bold uppercase text-white/40 tracking-wider font-mono">Округ Омска</label>
              <div className="flex flex-wrap gap-1.5">
                {['Все', 'ЦАО', 'КАО', 'САО', 'ОАО', 'ЛАО'].map((dist) => (
                  <button
                    key={dist}
                    onClick={() => setDistrictFilter(dist as any)}
                    className={`text-[10px] tracking-wider uppercase px-3 py-1.5 border transition-all font-mono cursor-pointer ${
                      districtFilter === dist
                        ? 'bg-gold-500 text-black font-bold border-gold-500'
                        : 'bg-dark-900 text-white/60 border-white/5 hover:bg-dark-750'
                    }`}
                  >
                    {dist === 'Все' ? 'Все округа' : dist}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div className="md:col-span-4 space-y-2.5">
              <label className="text-[9px] font-bold uppercase text-white/40 tracking-wider font-mono">Тип объекта</label>
              <div className="flex flex-wrap gap-1.5">
                {['Все', 'квартира', 'дом'].map((type) => (
                  <button
                    key={type}
                    onClick={() => setTypeFilter(type as any)}
                    className={`text-[10px] tracking-wider uppercase px-3 py-1.5 border transition-all font-mono cursor-pointer ${
                      typeFilter === type
                        ? 'bg-gold-500 text-black font-bold border-gold-500'
                        : 'bg-dark-900 text-white/60 border-white/5 hover:bg-dark-750'
                    }`}
                  >
                    {type === 'Все' ? 'Все типы' : type === 'квартира' ? 'Квартиры' : 'Дома'}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort Dropdown */}
            <div className="md:col-span-3 space-y-2.5">
              <label className="text-[9px] font-bold uppercase text-white/40 tracking-wider font-mono flex items-center gap-1.5">
                <ArrowUpDown className="w-3.5 h-3.5 text-gold-500" />
                <span>Сортировка цен</span>
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full bg-dark-900 border border-white/10 text-xs py-2.5 px-3 text-white/80 focus:outline-none focus:border-gold-500 rounded-none font-mono"
              >
                <option value="default">По умолчанию</option>
                <option value="price-asc">Сначала дешевле</option>
                <option value="price-desc">Сначала дороже</option>
              </select>
            </div>
          </div>
        </div>

        {/* Listings Grid */}
        {sortedProperties.length === 0 ? (
          <div className="bg-dark-800 border border-white/5 p-12 text-center max-w-lg mx-auto shadow-2xl">
            <p className="text-base font-bold text-white uppercase tracking-wider">Объекты не найдены</p>
            <p className="text-white/50 text-xs mt-3 leading-relaxed font-light">Попробуйте сбросить фильтры или напишите мне напрямую — я подберу квартиру по закрытой междилерской базе риелторов Омска.</p>
            <button
              onClick={() => {
                setDistrictFilter('Все');
                setTypeFilter('Все');
              }}
              className="mt-6 bg-gold-500 hover:bg-gold-400 text-black text-xs font-bold uppercase tracking-widest px-5 py-3 cursor-pointer transition-colors"
            >
              Сбросить фильтры
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedProperties.map((prop) => (
              <div
                key={prop.id}
                className="bg-dark-700 border border-white/5 overflow-hidden shadow-2xl hover:border-white/15 transition-all duration-300 flex flex-col group"
                id={`property-card-${prop.id}`}
              >
                {/* Photo & Badge */}
                <div className="relative aspect-[4/3] overflow-hidden bg-dark-950 shrink-0">
                  <img
                    src={prop.image}
                    alt={prop.title}
                    className="w-full h-full object-cover object-center filter grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-750"
                    referrerPolicy="no-referrer"
                    id={`property-img-${prop.id}`}
                  />
                  {/* District badge */}
                  <div className="absolute top-3 left-3 bg-dark-950/90 text-gold-500 px-3 py-1 text-[9px] font-bold font-mono tracking-wider border border-white/5">
                    📍 {prop.district} • Омск
                  </div>
                  {/* Property type badge */}
                  <div className="absolute top-3 right-3 bg-gold-500 text-black px-3 py-1 text-[9px] font-bold uppercase tracking-widest font-mono">
                    {prop.type}
                  </div>
                </div>

                {/* Info body */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2.5">
                    <p className="text-xl font-bold text-gold-500 font-serif">
                      {formatPrice(prop.price)}
                    </p>
                    <h3 className="text-base font-serif text-white leading-snug group-hover:text-gold-400 transition-colors">
                      {prop.title}
                    </h3>
                    <p className="text-xs text-white/40 flex items-center gap-1.5 font-light">
                      <MapPin className="w-3.5 h-3.5 text-white/30 shrink-0" />
                      <span className="truncate">{prop.address}</span>
                    </p>
                  </div>

                  {/* Tech specs bar */}
                  <div className="grid grid-cols-3 gap-2 bg-dark-800 border border-white/5 p-3 text-center text-xs">
                    <div>
                      <p className="text-[9px] uppercase font-mono text-white/40 tracking-wider">КОМНАТ</p>
                      <p className="font-bold text-white mt-0.5 font-serif">{prop.rooms}</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase font-mono text-white/40 tracking-wider">ПЛОЩАДЬ</p>
                      <p className="font-bold text-white mt-0.5 font-serif">{prop.area} м²</p>
                    </div>
                    <div>
                      <p className="text-[9px] uppercase font-mono text-white/40 tracking-wider">ЭТАЖ</p>
                      <p className="font-bold text-white mt-0.5 font-serif">{prop.floor}</p>
                    </div>
                  </div>

                  {/* Highlights checklist */}
                  <div className="flex flex-wrap gap-1.5">
                    {prop.features.slice(0, 3).map((feat, idx) => (
                      <span
                        key={idx}
                        className="text-[9px] uppercase tracking-wider font-mono px-2 py-1 bg-gold-500/5 text-gold-500 border border-gold-500/10"
                      >
                        ✔ {feat}
                      </span>
                    ))}
                  </div>

                  <p className="text-white/50 text-xs line-clamp-2 leading-relaxed font-light">
                    {prop.description}
                  </p>

                  {/* Action button */}
                  <button
                    onClick={() => onSelectProperty(prop.title)}
                    className="w-full bg-dark-950 hover:bg-gold-500 text-white hover:text-black border border-white/5 font-bold py-3 text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-1 cursor-pointer"
                    id={`property-view-btn-${prop.id}`}
                  >
                    <span>Записаться на показ</span>
                    <ChevronRight className="w-4 h-4 text-gold-500 group-hover:text-black" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
