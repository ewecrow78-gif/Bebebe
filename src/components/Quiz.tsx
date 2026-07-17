import React, { useState } from 'react';
import { CheckCircle, ArrowRight, ArrowLeft, Send, Sparkles, ClipboardCheck, X } from 'lucide-react';

interface QuizProps {
  onClose: () => void;
  onQuizSubmit: (quizData: {
    name: string;
    phone: string;
    email?: string;
    goal: string;
    propertyType: string;
    district: string;
    budget: string;
  }) => void;
}

export default function Quiz({ onClose, onQuizSubmit }: QuizProps) {
  const [step, setStep] = useState(1);
  const totalSteps = 5;

  // Answers State
  const [goal, setGoal] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [district, setDistrict] = useState('');
  const [budget, setBudget] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [preferredContact, setPreferredContact] = useState('Telegram');

  const [isFinished, setIsFinished] = useState(false);

  // Steps definitions
  const stepsData = {
    1: {
      question: 'Какова ваша основная цель?',
      description: 'Это поможет понять, какие инструменты рынка задействовать.',
      options: [
        'Купить жилье для себя',
        'Выгодно продать имеющееся жилье',
        'Инвестировать в недвижимость Омска (под аренду/перепродажу)',
        'Обменять старую квартиру на новую (альтернативная сделка)',
        'Просто проконсультироваться по ипотеке/ценам'
      ],
      setter: setGoal,
      value: goal
    },
    2: {
      question: 'Какой тип недвижимости вас интересует?',
      description: 'В Омске доступны отличные условия как по новостройкам, так и по вторичке.',
      options: [
        'Новостройка (Бесплатный подбор, 0% комиссии)',
        'Вторичное жилье (Квартира с историей)',
        'Частный дом / Коттедж / Дача',
        'Земельный участок под ИЖС',
        'Коммерческая недвижимость / Офис'
      ],
      setter: setPropertyType,
      value: propertyType
    },
    3: {
      question: 'В каком округе Омска рассматриваете объект?',
      description: 'Каждый район имеет свою специфику цен и благоустройства.',
      options: [
        'Кировский округ (Левый Берег - современный, семейный)',
        'Центральный округ (ЦАО - исторический центр, набережная)',
        'Советский округ (САО / Нефтяники - развитый, студенческий)',
        'Октябрьский округ (Парк 30-летия ВЛКСМ, Чкаловский)',
        'Ленинский округ (ЛАО / ЖД Вокзал, Московка)',
        'Рассматриваю все варианты в Омске / Не определился'
      ],
      setter: setDistrict,
      value: district
    },
    4: {
      question: 'На какой бюджет вы ориентируетесь?',
      description: 'Я подберу лучшие предложения, включая скрытые и закрытые базы продаж.',
      options: [
        'До 4 000 000 ₽',
        'От 4 000 000 до 7 000 000 ₽',
        'От 7 000 000 до 12 000 000 ₽',
        'Более 12 000 000 ₽',
        'Нужен точный расчет ипотеки, наличных нет'
      ],
      setter: setBudget,
      value: budget
    }
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleOptionClick = (val: string, setter: (v: string) => void) => {
    setter(val);
    // Auto proceed to next step for selection questions to reduce friction!
    setTimeout(() => {
      handleNext();
    }, 200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone) return;

    onQuizSubmit({
      name,
      phone,
      email,
      goal,
      propertyType,
      district,
      budget
    });

    setIsFinished(true);
  };

  const progressPercent = Math.round((step / totalSteps) * 100);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-dark-950/80 backdrop-blur-md flex items-center justify-center p-4">
      <div 
        className="bg-dark-800 w-full max-w-2xl shadow-2xl border border-white/10 rounded-none overflow-hidden relative"
        id="quiz-modal-container"
      >
        
        {/* Header decoration */}
        <div className="bg-dark-950 text-white p-6 flex justify-between items-center border-b border-white/5">
          <div className="flex items-center gap-2.5">
            <ClipboardCheck className="w-5 h-5 text-gold-500" />
            <div>
              <h3 className="font-serif font-light text-base tracking-wide text-white">
                Индивидуальный подбор квартиры
              </h3>
              <p className="text-[9px] text-white/40 font-mono tracking-widest mt-0.5">
                {isFinished ? 'ТЕСТ ЗАВЕРШЕН' : `ШАГ ${step} ИЗ ${totalSteps}`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-none hover:bg-dark-900 text-white/50 hover:text-white transition-colors cursor-pointer"
            id="close-quiz-btn"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        {!isFinished && (
          <div className="w-full h-[3px] bg-dark-900 relative">
            <div
              className="absolute left-0 top-0 h-full bg-gold-500 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        )}

        {/* Main Body */}
        <div className="p-6 sm:p-8">
          {isFinished ? (
            /* Success State */
            <div className="text-center py-6 space-y-6" id="quiz-success-view">
              <div className="mx-auto flex h-14 w-14 items-center justify-center bg-gold-500/10 border border-gold-500/25 text-gold-500">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-serif font-light text-white">
                  Отлично, {name}! Тест пройден.
                </h3>
                <p className="text-white/60 max-w-md mx-auto text-xs sm:text-sm font-light leading-relaxed">
                  Елена Васильева уже анализирует ваши ответы и формирует персональную подборку квартир со скрытого междилерского риелторского рынка Омска.
                </p>
              </div>

              {/* Summary representation */}
              <div className="bg-dark-900 p-5 border border-white/5 text-left max-w-md mx-auto text-xs space-y-2.5">
                <p className="font-bold text-white uppercase font-mono tracking-wider border-b border-white/5 pb-2">ВАШИ ПРЕДПОЧТЕНИЯ:</p>
                <p className="text-white/70 font-light"><strong className="text-gold-500 font-mono uppercase text-[10px]">Цель:</strong> {goal}</p>
                <p className="text-white/70 font-light"><strong className="text-gold-500 font-mono uppercase text-[10px]">Тип:</strong> {propertyType}</p>
                <p className="text-white/70 font-light"><strong className="text-gold-500 font-mono uppercase text-[10px]">Округ:</strong> {district}</p>
                <p className="text-white/70 font-light"><strong className="text-gold-500 font-mono uppercase text-[10px]">Бюджет:</strong> {budget}</p>
              </div>

              <div className="p-4 bg-gold-500/5 border border-gold-500/20 text-gold-300 text-xs max-w-md mx-auto flex items-center gap-3 font-light leading-relaxed">
                <Sparkles className="w-5 h-5 text-gold-500 shrink-0" />
                <span>Елена свяжется с вами в течение <strong>15 минут</strong> через <strong>{preferredContact}</strong>. Ожидайте персональный расчет!</span>
              </div>

              <button
                onClick={onClose}
                className="bg-gold-500 hover:bg-gold-400 text-black font-bold px-6 py-3.5 text-xs uppercase tracking-widest cursor-pointer transition-colors rounded-none"
                id="finish-quiz-close-btn"
              >
                Вернуться на сайт
              </button>
            </div>
          ) : step === totalSteps ? (
            /* Final Step: Contact Form */
            <form onSubmit={handleSubmit} className="space-y-6" id="quiz-final-form">
              <div className="space-y-2 text-center md:text-left">
                <h4 className="text-xl font-serif font-light text-white">
                  Куда отправить подборку квартир?
                </h4>
                <p className="text-xs text-white/50 font-light">
                  Остался последний шаг. По указанным контактам Елена пришлет каталог и расчет ипотеки. Никакого спама, только ценная аналитика.
                </p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-[9px] font-mono font-bold uppercase text-white/40 tracking-wider mb-2">Ваше имя *</label>
                  <input
                    type="text"
                    required
                    placeholder="Евгений"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-dark-900 border border-white/10 rounded-none px-4 py-3 text-xs text-white focus:outline-none focus:border-gold-500 font-light"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-mono font-bold uppercase text-white/40 tracking-wider mb-2">Номер телефона для связи *</label>
                  <input
                    type="tel"
                    required
                    placeholder="+7 (913) 000-00-00"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-dark-900 border border-white/10 rounded-none px-4 py-3 text-xs text-white focus:outline-none focus:border-gold-500 font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[9px] font-mono font-bold uppercase text-white/40 tracking-wider mb-2">Email (необязательно)</label>
                  <input
                    type="email"
                    placeholder="example@mail.ru"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-dark-900 border border-white/10 rounded-none px-4 py-3 text-xs text-white focus:outline-none focus:border-gold-500 font-mono"
                  />
                </div>

                {/* Preferred Messenger */}
                <div className="space-y-2.5">
                  <label className="block text-[9px] font-mono font-bold uppercase text-white/40 tracking-wider">Где вам удобнее пообщаться?</label>
                  <div className="grid grid-cols-3 gap-2.5">
                    {['WhatsApp', 'Telegram', 'Звонок'].map((med) => (
                      <button
                        key={med}
                        type="button"
                        onClick={() => setPreferredContact(med)}
                        className={`text-[10px] tracking-wider uppercase py-2.5 border font-mono transition-all cursor-pointer rounded-none ${
                          preferredContact === med
                            ? 'bg-gold-500 text-black font-bold border-gold-500'
                            : 'bg-dark-900 text-white/60 border-white/5 hover:bg-dark-750'
                        }`}
                      >
                        {med}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Buttons */}
              <div className="flex justify-between items-center pt-6 border-t border-white/5">
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-widest text-white/40 hover:text-white transition-colors cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 text-gold-500" />
                  <span>Назад</span>
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-1.5 bg-gold-500 hover:bg-gold-400 text-black font-bold px-6 py-3.5 text-xs uppercase tracking-widest transition-all cursor-pointer rounded-none"
                  id="submit-quiz-btn"
                >
                  <span>Получить каталог</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          ) : (
            /* Multi-step options selector */
            <div className="space-y-6">
              <div className="space-y-1.5 text-center md:text-left">
                <h4 className="text-xl font-serif font-light text-white">
                  {stepsData[step as keyof typeof stepsData].question}
                </h4>
                <p className="text-xs text-white/50 font-light">
                  {stepsData[step as keyof typeof stepsData].description}
                </p>
              </div>

              {/* Options Grid */}
              <div className="space-y-2.5">
                {stepsData[step as keyof typeof stepsData].options.map((opt) => {
                  const isSelected = stepsData[step as keyof typeof stepsData].value === opt;
                  return (
                    <button
                      key={opt}
                      onClick={() => handleOptionClick(opt, stepsData[step as keyof typeof stepsData].setter)}
                      className={`w-full text-left p-4 border font-light text-xs sm:text-sm transition-all flex items-center justify-between cursor-pointer rounded-none ${
                        isSelected
                          ? 'bg-gold-500/10 text-gold-400 border-gold-500/40 font-semibold'
                          : 'bg-dark-900 text-white/75 border-white/5 hover:bg-dark-750 hover:border-white/10'
                      }`}
                    >
                      <span>{opt}</span>
                      {isSelected && (
                        <span className="h-4 w-4 bg-gold-500 text-black flex items-center justify-center font-bold text-[10px]">
                          ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Bottom Buttons */}
              <div className="flex justify-between items-center pt-6 border-t border-white/5">
                <button
                  type="button"
                  disabled={step === 1}
                  onClick={handleBack}
                  className={`flex items-center gap-1.5 text-[9px] font-mono font-bold uppercase tracking-widest transition-colors cursor-pointer ${
                    step === 1 ? 'text-white/10 pointer-events-none' : 'text-white/40 hover:text-white'
                  }`}
                >
                  <ArrowLeft className="w-4 h-4 text-gold-500" />
                  <span>Назад</span>
                </button>

                <button
                  type="button"
                  disabled={!stepsData[step as keyof typeof stepsData].value}
                  onClick={handleNext}
                  className={`flex items-center gap-1.5 font-bold px-5 py-3 text-xs uppercase tracking-widest transition-all cursor-pointer rounded-none ${
                    stepsData[step as keyof typeof stepsData].value
                      ? 'bg-gold-500 hover:bg-gold-400 text-black'
                      : 'bg-dark-900 text-white/20 border border-white/5 pointer-events-none font-mono text-[9px]'
                  }`}
                >
                  <span>Далее</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
