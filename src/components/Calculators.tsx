import React, { useState, useEffect } from 'react';
import { Calculator, Percent, DollarSign, ArrowRight, Sparkles, Check } from 'lucide-react';

interface CalculatorsProps {
  onLeadSubmit: (name: string, phone: string, type: 'calculator', calcResult: { propertyValue: number; monthlyPayment: number; term: number }) => void;
}

export default function Calculators({ onLeadSubmit }: CalculatorsProps) {
  const [activeTab, setActiveTab] = useState<'mortgage' | 'seller'>('mortgage');

  // Mortgage State
  const [propertyPrice, setPropertyPrice] = useState<number>(6500000);
  const [downPayment, setDownPayment] = useState<number>(1500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(23);
  const [interestRate, setInterestRate] = useState<number>(14.5);
  const [loanTerm, setLoanTerm] = useState<number>(25);

  const [monthlyPayment, setMonthlyPayment] = useState<number>(0);
  const [totalLoan, setTotalLoan] = useState<number>(0);
  const [totalInterest, setTotalInterest] = useState<number>(0);
  const [requiredIncome, setRequiredIncome] = useState<number>(0);

  // Seller State
  const [sellerPrice, setSellerPrice] = useState<number>(5500000);
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const [submitName, setSubmitName] = useState('');
  const [submitPhone, setSubmitPhone] = useState('');

  // Sync Down Payment Percent and Mortgage Outputs
  useEffect(() => {
    const percent = Math.round((downPayment / propertyPrice) * 100) || 0;
    if (percent !== downPaymentPercent) {
      setDownPaymentPercent(percent);
    }
  }, [downPayment, propertyPrice]);

  useEffect(() => {
    const loanAmount = Math.max(0, propertyPrice - downPayment);
    setTotalLoan(loanAmount);

    if (loanAmount <= 0) {
      setMonthlyPayment(0);
      setTotalInterest(0);
      setRequiredIncome(0);
      return;
    }

    const r = interestRate / 12 / 100;
    const n = loanTerm * 12;

    if (r === 0) {
      const monthly = loanAmount / n;
      setMonthlyPayment(Math.round(monthly));
      setTotalInterest(0);
      setRequiredIncome(Math.round(monthly * 1.6));
      return;
    }

    const monthly = loanAmount * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalToRepay = monthly * n;
    const interest = totalToRepay - loanAmount;

    setMonthlyPayment(Math.round(monthly));
    setTotalInterest(Math.round(interest));
    setRequiredIncome(Math.round(monthly * 1.8));
  }, [propertyPrice, downPayment, interestRate, loanTerm]);

  const handlePriceChange = (val: number) => {
    setPropertyPrice(val);
    const newDown = Math.min(val, Math.round(val * (downPaymentPercent / 100)));
    setDownPayment(newDown);
  };

  const handleDownPaymentPercentChange = (pct: number) => {
    setDownPaymentPercent(pct);
    const newDown = Math.round(propertyPrice * (pct / 100));
    setDownPayment(newDown);
  };

  const handleSaveResult = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submitName || !submitPhone) return;

    onLeadSubmit(submitName, submitPhone, 'calculator', {
      propertyValue: propertyPrice,
      monthlyPayment: monthlyPayment,
      term: loanTerm
    });

    setIsSubmitSuccess(true);
    setSubmitName('');
    setSubmitPhone('');
    setTimeout(() => {
      setIsSubmitSuccess(false);
    }, 5000);
  };

  // Commission calculations (approx 2% for Omsk)
  const brokerCommission = Math.round(sellerPrice * 0.02);
  const averageDaysToSellWithRealtor = 21;
  const averageDaysToSellAlone = 75;

  const formatPrice = (num: number) => {
    return new Intl.NumberFormat('ru-RU', { style: 'currency', currency: 'RUB', maximumFractionDigits: 0 }).format(num);
  };

  return (
    <section className="py-24 bg-dark-900 border-b border-white/5" id="calculators">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-[10px] font-bold uppercase tracking-[0.25em] text-gold-500 font-mono mb-3">
            РАСЧЕТЫ ОНЛАЙН
          </h2>
          <p className="text-3xl sm:text-4xl font-serif font-light text-white tracking-wide">
            Интерактивные калькуляторы
          </p>
          <div className="h-[1px] w-20 bg-gold-500 mx-auto mt-5"></div>
          <p className="text-white/60 mt-5 text-sm sm:text-base leading-relaxed font-light">
            Рассчитайте условия по ипотеке или узнайте финансовую выгоду от профессиональной продажи вашей квартиры в Омске.
          </p>
        </div>

        {/* Tabs Control */}
        <div className="flex justify-center mb-16">
          <div className="bg-dark-800 p-1 border border-white/5 flex">
            <button
              onClick={() => setActiveTab('mortgage')}
              className={`flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                activeTab === 'mortgage'
                  ? 'bg-gold-500 text-black'
                  : 'text-white/60 hover:text-white'
              }`}
              id="tab-mortgage-btn"
            >
              <Percent className="w-3.5 h-3.5" />
              <span>Ипотека</span>
            </button>
            <button
              onClick={() => setActiveTab('seller')}
              className={`flex items-center gap-2 px-6 py-3 text-xs font-bold uppercase tracking-widest transition-all cursor-pointer ${
                activeTab === 'seller'
                  ? 'bg-gold-500 text-black'
                  : 'text-white/60 hover:text-white'
              }`}
              id="tab-seller-btn"
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Выгода продажи</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Mortgage Calculator */}
        {activeTab === 'mortgage' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
            
            {/* Inputs Block */}
            <div className="lg:col-span-7 bg-dark-800 border border-white/5 p-6 sm:p-8 space-y-8">
              <h3 className="text-sm font-bold tracking-widest uppercase text-white border-b border-white/5 pb-4 flex items-center gap-2 font-mono">
                <span className="p-1.5 bg-gold-500/10 text-gold-500 border border-gold-500/20"><Calculator className="w-4 h-4" /></span>
                Параметры ипотечного кредита
              </h3>

              {/* Property Price slider & input */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <label className="text-white/80 font-light">Стоимость недвижимости</label>
                  <span className="font-bold text-gold-500 font-serif text-lg">{formatPrice(propertyPrice)}</span>
                </div>
                <input
                  type="range"
                  min={1000000}
                  max={25000000}
                  step={100000}
                  value={propertyPrice}
                  onChange={(e) => handlePriceChange(Number(e.target.value))}
                  className="w-full accent-gold-500 h-[3px] bg-dark-700 rounded-none appearance-none cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-white/30 font-mono">
                  <span>1 млн ₽</span>
                  <span>10 млн ₽</span>
                  <span>25 млн ₽</span>
                </div>
              </div>

              {/* Down Payment slider & input */}
              <div className="space-y-3">
                <div className="flex justify-between items-center text-sm">
                  <label className="text-white/80 font-light">Первоначальный взнос</label>
                  <span className="font-bold text-gold-500 font-serif text-lg">
                    {formatPrice(downPayment)} ({downPaymentPercent}%)
                  </span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={propertyPrice * 0.9}
                  step={50000}
                  value={downPayment}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="w-full accent-gold-500 h-[3px] bg-dark-700 rounded-none appearance-none cursor-pointer"
                />
                {/* Fast percent choices */}
                <div className="flex gap-2 pt-1">
                  {[10, 15, 20, 30, 50].map((pct) => (
                    <button
                      key={pct}
                      type="button"
                      onClick={() => handleDownPaymentPercentChange(pct)}
                      className={`text-xs px-3 py-1 border font-mono transition-all cursor-pointer ${
                        downPaymentPercent === pct
                          ? 'bg-gold-500 text-black border-gold-500 font-bold'
                          : 'bg-dark-700 text-white/70 border-white/5 hover:bg-dark-600'
                      }`}
                    >
                      {pct}%
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Interest Rate */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <label className="text-white/80 font-light">Процентная ставка</label>
                    <span className="font-bold text-gold-500 font-serif text-lg">{interestRate}%</span>
                  </div>
                  <input
                    type="range"
                    min={4}
                    max={25}
                    step={0.1}
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="w-full accent-gold-500 h-[3px] bg-dark-700 rounded-none appearance-none cursor-pointer"
                  />
                  {/* Presets */}
                  <div className="flex flex-wrap gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setInterestRate(6.0)}
                      className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 bg-gold-500/10 text-gold-500 border border-gold-500/20 hover:bg-gold-500/20 cursor-pointer"
                      title="Семейная льготная ипотека"
                    >
                      Семейная (6%)
                    </button>
                    <button
                      type="button"
                      onClick={() => setInterestRate(14.5)}
                      className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 bg-dark-700 text-white/80 border border-white/5 hover:bg-dark-600 cursor-pointer"
                    >
                      Субсидия (14.5%)
                    </button>
                    <button
                      type="button"
                      onClick={() => setInterestRate(21.5)}
                      className="text-[9px] font-bold uppercase tracking-wider px-2 py-1 bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500/20 cursor-pointer"
                    >
                      Базовая (21.5%)
                    </button>
                  </div>
                </div>

                {/* Term */}
                <div className="space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <label className="text-white/80 font-light">Срок кредита</label>
                    <span className="font-bold text-gold-500 font-serif text-lg">{loanTerm} лет</span>
                  </div>
                  <input
                    type="range"
                    min={5}
                    max={30}
                    step={1}
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    className="w-full accent-gold-500 h-[3px] bg-dark-700 rounded-none appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-white/30 font-mono">
                    <span>5 лет</span>
                    <span>15 лет</span>
                    <span>30 лет</span>
                  </div>
                </div>
              </div>

              {/* Special Broker Partner Offer */}
              <div className="bg-gold-500/5 border border-gold-500/20 p-5 rounded-none flex items-start gap-3.5">
                <Sparkles className="w-5 h-5 text-gold-500 shrink-0 mt-0.5" />
                <div className="text-xs text-white/70 leading-relaxed font-light">
                  <p className="font-bold text-white mb-1 uppercase tracking-wider text-[10px]">Преференция от Елены Васильевой:</p>
                  Как сертифицированный партнер топ-банков в Омске (Сбербанк, ВТБ, Альфа-Банк), я снижаю ставку для своих клиентов на <span className="text-gold-500 font-semibold font-mono">до 0.6%</span>. Это экономит в среднем от 400 000 ₽ за весь период кредита!
                </div>
              </div>
            </div>

            {/* Outputs & Form Block */}
            <div className="lg:col-span-5 bg-dark-950 text-white border border-white/5 p-6 sm:p-8 flex flex-col justify-between shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/5 rounded-full blur-[80px] pointer-events-none"></div>

              <div className="space-y-7 relative z-10">
                <h3 className="text-xs font-bold uppercase tracking-[0.2em] border-b border-white/5 pb-4 text-gold-500 font-mono">
                  РЕЗУЛЬТАТЫ РАСЧЕТА
                </h3>

                {/* Main payment amount */}
                <div className="space-y-1">
                  <p className="text-[10px] text-white/40 uppercase tracking-widest font-mono">Ежемесячный платёж</p>
                  <p className="text-4xl sm:text-5xl font-bold font-serif text-white tracking-wide">
                    {formatPrice(monthlyPayment)}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-white/5">
                  <div>
                    <p className="text-[10px] text-white/40 uppercase font-mono tracking-wider">Сумма кредита</p>
                    <p className="text-base font-semibold font-serif text-white mt-1">{formatPrice(totalLoan)}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-white/40 uppercase font-mono tracking-wider">Переплата по %</p>
                    <p className="text-base font-semibold font-serif text-gold-500 mt-1">{formatPrice(totalInterest)}</p>
                  </div>
                </div>

                <div className="bg-dark-800 p-4 border border-white/5">
                  <p className="text-[10px] text-white/40 uppercase font-mono tracking-wider">Рекомендуемый доход в месяц</p>
                  <p className="text-lg font-bold font-serif text-emerald-400 mt-1">{formatPrice(requiredIncome)}</p>
                  <p className="text-[10px] text-white/30 mt-2 font-light">Одобрение банком гарантировано, если платеж не превышает 50% от совокупного дохода.</p>
                </div>

                {/* Immediate Submit flow for this calculator */}
                <form onSubmit={handleSaveResult} className="space-y-4 pt-4 border-t border-white/5">
                  <p className="text-xs text-white/60 font-light text-center">
                    Хотите точный расчет и подбор банков Омска с низкой ставкой? Оставьте телефон:
                  </p>
                  <div className="space-y-2.5">
                    <input
                      type="text"
                      placeholder="Ваше имя"
                      required
                      value={submitName}
                      onChange={(e) => setSubmitName(e.target.value)}
                      className="w-full bg-dark-800 border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-gold-500 font-light"
                    />
                    <input
                      type="tel"
                      placeholder="+7 (999) 000-00-00"
                      required
                      value={submitPhone}
                      onChange={(e) => setSubmitPhone(e.target.value)}
                      className="w-full bg-dark-800 border border-white/10 px-4 py-3 text-xs text-white focus:outline-none focus:border-gold-500 font-mono"
                    />
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-gold-500 hover:bg-gold-400 text-black font-bold py-4 text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-lg"
                  >
                    {isSubmitSuccess ? (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Заявка отправлена!</span>
                      </>
                    ) : (
                      <>
                        <span>Оформить ипотеку</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                  <p className="text-[9px] text-white/30 text-center uppercase tracking-wider font-mono">Нажимая кнопку, вы соглашаетесь на обработку данных.</p>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Seller Calculator */}
        {activeTab === 'seller' && (
          <div className="bg-dark-800 border border-white/5 p-6 sm:p-10">
            <div className="max-w-4xl mx-auto space-y-10">
              
              <div className="text-center space-y-3">
                <h3 className="text-xl sm:text-2xl font-serif font-light text-white">
                  Сколько вы сэкономите при продаже с Еленой?
                </h3>
                <p className="text-white/60 text-xs sm:text-sm font-light">
                  Многие считают, что самостоятельная продажа бесплатна. Давайте посчитаем скрытые расходы и упущенную прибыль.
                </p>
              </div>

              {/* Slider expected price */}
              <div className="bg-dark-700 p-6 border border-white/5 max-w-xl mx-auto space-y-4 shadow-xl">
                <div className="flex justify-between items-center text-sm">
                  <label className="text-white/80 font-light">Ожидаемая стоимость вашей квартиры:</label>
                  <span className="font-bold text-gold-500 font-serif text-lg">{formatPrice(sellerPrice)}</span>
                </div>
                <input
                  type="range"
                  min={1500000}
                  max={20000000}
                  step={100000}
                  value={sellerPrice}
                  onChange={(e) => setSellerPrice(Number(e.target.value))}
                  className="w-full accent-gold-500 h-[3px] bg-dark-800 rounded-none appearance-none cursor-pointer"
                />
              </div>

              {/* Comparison Matrix */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
                
                {/* Selling Alone */}
                <div className="bg-dark-950 p-6 border border-red-500/10 space-y-5">
                  <h4 className="text-red-400 font-bold tracking-wider uppercase text-[10px] flex items-center gap-2 border-b border-white/5 pb-3 font-mono">
                    <span className="w-1.5 h-1.5 bg-red-500"></span>
                    Продажа самостоятельно
                  </h4>
                  
                  <ul className="space-y-4 text-xs sm:text-sm text-white/70 font-light">
                    <li className="flex justify-between items-start gap-4">
                      <span>Скидка при торге (в среднем 3-5%):</span>
                      <strong className="text-red-400 font-mono shrink-0">{formatPrice(Math.round(sellerPrice * 0.04))}</strong>
                    </li>
                    <li className="flex justify-between items-start gap-4">
                      <span>Расходы на рекламу (Авито, Циан на 2 мес.):</span>
                      <strong className="text-red-400 font-mono shrink-0">{formatPrice(8500)}</strong>
                    </li>
                    <li className="flex justify-between items-start gap-4">
                      <span>Профессиональные фото и хоумстейджинг:</span>
                      <strong className="text-red-400 font-mono shrink-0">{formatPrice(10000)}</strong>
                    </li>
                    <li className="flex justify-between items-start gap-4">
                      <span>Составление договора и юрист:</span>
                      <strong className="text-red-400 font-mono shrink-0">{formatPrice(15000)}</strong>
                    </li>
                    <li className="flex justify-between items-start gap-4 border-t border-white/5 pt-4 font-bold text-white">
                      <span>Итого реальные затраты:</span>
                      <span className="text-red-400 font-mono text-base">{formatPrice(Math.round(sellerPrice * 0.04) + 33500)}</span>
                    </li>
                    <li className="text-[11px] text-red-400 bg-red-500/5 p-3.5 border border-red-500/10 leading-relaxed font-light">
                      ⏳ <strong>Около {averageDaysToSellAlone} дней</strong> уйдёт на звонки риелторов, пустые показы, сбор документов и юридические риски.
                    </li>
                  </ul>
                </div>

                {/* Selling with Elena */}
                <div className="bg-dark-900 p-6 border border-gold-500/20 space-y-5">
                  <h4 className="text-gold-500 font-bold tracking-wider uppercase text-[10px] flex items-center gap-2 border-b border-white/5 pb-3 font-mono">
                    <span className="w-1.5 h-1.5 bg-gold-500 animate-pulse"></span>
                    Продажа с Еленой
                  </h4>
                  
                  <ul className="space-y-4 text-xs sm:text-sm text-white/70 font-light">
                    <li className="flex justify-between items-start gap-4">
                      <span>Продажа без занижения цены:</span>
                      <strong className="text-white font-mono shrink-0">0 ₽ потерь</strong>
                    </li>
                    <li className="flex justify-between items-start gap-4">
                      <span>Реклама на всех топ-площадках:</span>
                      <strong className="text-gold-500 font-mono shrink-0">Включено</strong>
                    </li>
                    <li className="flex justify-between items-start gap-4">
                      <span>Проф. фотосессия и хоумстейджинг:</span>
                      <strong className="text-gold-500 font-mono shrink-0">Включено</strong>
                    </li>
                    <li className="flex justify-between items-start gap-4">
                      <span>Юридический аудит и расчёты:</span>
                      <strong className="text-gold-500 font-mono shrink-0">Включено</strong>
                    </li>
                    <li className="flex justify-between items-start gap-4 border-t border-white/5 pt-4 font-bold text-white">
                      <span>Комиссия риелтора (2%):</span>
                      <span className="text-gold-500 font-mono text-base">{formatPrice(brokerCommission)}</span>
                    </li>
                    <li className="text-[11px] text-gold-300 bg-gold-500/5 p-3.5 border border-gold-500/10 leading-relaxed font-light">
                      🚀 <strong>Всего {averageDaysToSellWithRealtor} дней</strong> в среднем. Показы провожу сама, предоставляю готового покупателя, защищаю ваши деньги.
                    </li>
                  </ul>
                </div>
              </div>

              {/* Call to action */}
              <div className="text-center pt-6 space-y-4">
                <p className="text-sm font-semibold tracking-wide text-white font-sans">
                  Чистая выгода в деньгах и сэкономленном времени очевидна!
                </p>
                <button
                  onClick={() => onLeadSubmit('Продавец', 'Уточнить', 'calculator', { propertyValue: sellerPrice, monthlyPayment: brokerCommission, term: 0 })}
                  className="bg-gold-500 hover:bg-gold-400 text-black font-bold px-8 py-4.5 text-xs uppercase tracking-widest transition-all inline-flex items-center gap-2 cursor-pointer shadow-lg"
                  id="seller-benefit-btn"
                >
                  <span>Заказать бесплатный аудит стоимости квартиры</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
