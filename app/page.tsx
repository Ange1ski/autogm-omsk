"use client";

import Image from "next/image";
import {
  ArrowDownRight,
  ArrowRight,
  BatteryCharging,
  Braces,
  CarFront,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleGauge,
  Clock3,
  Cog,
  Droplets,
  Gauge,
  MapPin,
  Menu,
  MessageCircle,
  Paintbrush,
  Phone,
  Quote,
  Route,
  Settings2,
  ShieldCheck,
  Sparkles,
  Star,
  Wrench,
  X,
} from "lucide-react";
import { FormEvent, useMemo, useState } from "react";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const phoneDisplay = "+7 (968) 107-83-53";
const phoneHref = "tel:+79681078353";

const serviceCards = [
  { icon: CircleGauge, title: "Диагностика", text: "Компьютерная проверка и поиск причины неисправности.", number: "01" },
  { icon: Cog, title: "Ремонт двигателя", text: "ГРМ, прокладки, охлаждение и капитальный ремонт.", number: "02" },
  { icon: Settings2, title: "Ходовая часть", text: "Подвеска, рулевое управление, стойки и подшипники.", number: "03" },
  { icon: Gauge, title: "Тормозная система", text: "Колодки, диски, суппорты и тормозные магистрали.", number: "04" },
  { icon: BatteryCharging, title: "Автоэлектрика", text: "Стартеры, генераторы, датчики и проводка.", number: "05" },
  { icon: Droplets, title: "Техническое обслуживание", text: "Масло, фильтры, жидкости, свечи и плановое ТО.", number: "06" },
  { icon: Paintbrush, title: "Кузовной ремонт", text: "Сварка, покраска, полировка, вмятины и бамперы.", number: "07" },
  { icon: Sparkles, title: "Климат и кондиционер", text: "Диагностика, обслуживание и заправка системы.", number: "08" },
];

const priceGroups = {
  "ТО": [
    ["Компьютерная диагностика", 600],
    ["Замена масла в двигателе", 500],
    ["Замена свечей зажигания", 300],
    ["Замена охлаждающей жидкости", 800],
  ],
  "Двигатель": [
    ["Диагностика двигателя", 600],
    ["Замена ремня ГРМ", 3000],
    ["Замена прокладки ГБЦ", 6500],
    ["Капитальный ремонт ДВС", 18000],
  ],
  "Ходовая": [
    ["Диагностика ходовой", 500],
    ["Замена передней стойки", 800],
    ["Замена ступичного подшипника", 1000],
    ["Замена шаровой опоры", 600],
  ],
  "Тормоза": [
    ["Замена передних колодок", 500],
    ["Замена тормозных дисков", 600],
    ["Замена тормозной жидкости", 600],
    ["Замена суппорта", 600],
  ],
  "Электрика": [
    ["Диагностика электрики", 600],
    ["Ремонт стартера", 800],
    ["Ремонт генератора", 800],
    ["Замена датчика", 300],
  ],
  "Кузов": [
    ["Локальная полировка", 400],
    ["Ремонт пластикового бампера", 2500],
    ["Сварочные работы", 1500],
    ["Замена порога", 12000],
  ],
} as const;

type Category = keyof typeof priceGroups;

const carModels = {
  Chevrolet: ["Cruze", "Lacetti", "Aveo", "Cobalt", "Captiva", "Niva"],
  Daewoo: ["Nexia", "Matiz", "Gentra", "Lanos", "Espero"],
  Ravon: ["R2", "R3 Nexia", "R4", "Gentra"],
  Kia: ["Rio", "Ceed", "Cerato", "Sportage", "Soul"],
  Hyundai: ["Solaris", "Elantra", "Creta", "Tucson", "Santa Fe"],
  Renault: ["Logan", "Sandero", "Duster", "Kaptur", "Fluence"],
  Lada: ["Granta", "Vesta", "Largus", "Niva", "XRAY"],
  "Другая марка": ["Другая модель"],
} as const;

type Brand = keyof typeof carModels;
type OpenCarSelect = "brand" | "model" | null;

const reviews = [
  {
    name: "Елена",
    meta: "Chevrolet · Яндекс Карты",
    text: "Обслуживаюсь больше года. Мастера помогают определить причину поломки и хорошо делают ремонт.",
  },
  {
    name: "Леонид",
    meta: "Ремонт ГРМ и ходовой",
    text: "После диагностики заменили ремень ГРМ, проверили ходовую и помогли с запчастями. Всё сделали оперативно.",
  },
  {
    name: "Максим",
    meta: "Chevrolet Lacetti · 2ГИС",
    text: "Сразу назвали стоимость работы, не навязывали покупку запчастей и сделали ремонт заметно дешевле крупных СТО.",
  },
];

function Logo({ light = false }: { light?: boolean }) {
  return (
    <a href="#top" aria-label="АвтоGM — на главную" className="focus-ring inline-flex items-center gap-3 rounded-sm">
      <span className={`grid size-10 place-items-center border ${light ? "border-white/25" : "border-black/20"}`}>
        <Wrench className="size-5 text-[var(--orange)]" aria-hidden="true" />
      </span>
      <span className={`font-display text-xl tracking-tight ${light ? "text-white" : "text-[var(--ink)]"}`}>
        АВТО<span className="text-[var(--orange)]">GM</span>
      </span>
    </a>
  );
}

function SectionTitle({ eyebrow, title, text, light = false }: { eyebrow: string; title: string; text?: string; light?: boolean }) {
  return (
    <div className="max-w-3xl">
      <div className={`mb-5 flex items-center gap-3 text-xs font-bold uppercase tracking-[0.22em] ${light ? "text-white/55" : "text-black/45"}`}>
        <span className="h-px w-9 bg-[var(--orange)]" /> {eyebrow}
      </div>
      <h2 className={`font-display text-[clamp(2rem,5vw,4.25rem)] leading-[0.98] tracking-[-0.035em] ${light ? "text-white" : "text-[var(--ink)]"}`}>
        {title}
      </h2>
      {text && <p className={`mt-6 max-w-2xl text-base leading-7 md:text-lg ${light ? "text-white/62" : "text-black/60"}`}>{text}</p>}
    </div>
  );
}

function CarSelect<T extends string>({
  id,
  label,
  value,
  options,
  open,
  onToggle,
  onClose,
  onChange,
}: {
  id: string;
  label: string;
  value: T;
  options: readonly T[];
  open: boolean;
  onToggle: () => void;
  onClose: () => void;
  onChange: (value: T) => void;
}) {
  return (
    <div className="relative" onClick={(event) => event.stopPropagation()} onKeyDown={(event) => event.key === "Escape" && onClose()}>
      <p id={`${id}-label`} className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.16em] text-white/42">
        {label}
      </p>
      <button
        type="button"
        aria-labelledby={`${id}-label ${id}-value`}
        aria-controls={`${id}-options`}
        aria-expanded={open}
        aria-haspopup="listbox"
        onClick={onToggle}
        className={`focus-ring flex min-h-16 w-full cursor-pointer items-center justify-between gap-4 border px-5 text-left transition duration-200 ${open ? "border-[var(--orange)] bg-white/[.08]" : "border-white/15 bg-white/[.035] hover:border-white/35 hover:bg-white/[.06]"}`}
      >
        <span id={`${id}-value`} className="text-base font-extrabold text-white sm:text-lg">{value}</span>
        <span className={`grid size-9 shrink-0 place-items-center border transition duration-200 ${open ? "rotate-180 border-[var(--orange)] bg-[var(--orange)]" : "border-white/15 bg-white/[.04]"}`}>
          <ChevronDown className="size-4" aria-hidden="true" />
        </span>
      </button>
      {open && (
        <div id={`${id}-options`} role="listbox" aria-labelledby={`${id}-label`} className="absolute inset-x-0 top-[calc(100%+8px)] z-30 max-h-64 overflow-y-auto border border-white/15 bg-[#24272b] p-2 shadow-2xl shadow-black/40">
          {options.map((option) => {
            const active = option === value;
            return (
              <button
                key={option}
                type="button"
                role="option"
                aria-selected={active}
                onClick={() => onChange(option)}
                className={`focus-ring flex min-h-12 w-full cursor-pointer items-center justify-between px-3 text-left text-sm font-bold transition ${active ? "bg-[var(--orange)] text-white" : "text-white/72 hover:bg-white/[.07] hover:text-white"}`}
              >
                {option}
                {active && <Check className="size-4" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [category, setCategory] = useState<Category>("Двигатель");
  const [selected, setSelected] = useState<string[]>(["Диагностика двигателя"]);
  const [brand, setBrand] = useState<Brand>("Chevrolet");
  const [model, setModel] = useState<string>("Cruze");
  const [openCarSelect, setOpenCarSelect] = useState<OpenCarSelect>(null);
  const [sent, setSent] = useState(false);

  const total = useMemo(
    () => Object.values(priceGroups).flat().reduce((sum, [name, price]) => selected.includes(name) ? sum + price : sum, 0),
    [selected],
  );

  function selectCategory(next: Category) {
    setCategory(next);
    setSelected([]);
  }

  function toggleService(name: string) {
    setSelected((current) => current.includes(name) ? current.filter((item) => item !== name) : [...current, name]);
  }

  function changeBrand(nextBrand: Brand) {
    setBrand(nextBrand);
    setModel(carModels[nextBrand][0]);
    setOpenCarSelect(null);
  }

  function submitLead(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <main id="top" className="overflow-hidden" onClick={() => setOpenCarSelect(null)}>
      <a href="#content" className="focus-ring fixed left-3 top-3 z-60 -translate-y-24 bg-white px-4 py-3 font-bold transition focus:translate-y-0">
        Перейти к содержанию
      </a>

      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#17191c]/92 text-white backdrop-blur-md">
        <div className="section-shell flex h-[76px] items-center justify-between">
          <Logo light />
          <nav aria-label="Основная навигация" className="hidden items-center gap-7 text-sm font-semibold lg:flex">
            {[["Услуги", "#services"], ["Цены", "#calculator"], ["О сервисе", "#about"], ["Отзывы", "#reviews"], ["Контакты", "#contacts"]].map(([label, href]) => (
              <a key={href} href={href} className="focus-ring rounded-sm text-white/65 transition hover:text-white">{label}</a>
            ))}
          </nav>
          <div className="hidden items-center gap-5 md:flex">
            <div className="text-right">
              <a href={phoneHref} className="focus-ring rounded-sm text-sm font-extrabold transition hover:text-[var(--orange)]">{phoneDisplay}</a>
              <p className="mt-0.5 text-[11px] text-white/45">Сегодня 09:00–19:00</p>
            </div>
            <a href="#lead" className="focus-ring clip-corner bg-[var(--orange)] px-5 py-3 text-sm font-extrabold transition hover:bg-[var(--orange-deep)]">Записаться</a>
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="focus-ring grid size-12 place-items-center border border-white/15 md:hidden" aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"} aria-expanded={mobileOpen}>
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
        {mobileOpen && (
          <nav aria-label="Мобильная навигация" className="border-t border-white/10 bg-[#17191c] px-4 py-5 md:hidden">
            {[['Услуги', '#services'], ['Цены', '#calculator'], ['О сервисе', '#about'], ['Отзывы', '#reviews'], ['Контакты', '#contacts']].map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMobileOpen(false)} className="flex min-h-12 items-center justify-between border-b border-white/10 text-base font-bold">
                {label}<ChevronRight className="size-4 text-[var(--orange)]" />
              </a>
            ))}
            <a href={phoneHref} className="mt-5 flex min-h-12 items-center gap-3 font-extrabold text-[var(--orange)]"><Phone className="size-5" />{phoneDisplay}</a>
          </nav>
        )}
      </header>

      <section id="content" className="relative min-h-[790px] bg-[#17191c] pt-[76px] text-white lg:min-h-[850px]">
        <Image src={`${basePath}/maps/photo-02.webp`} alt="Ремонтный бокс АвтоGM с автомобилями на подъёмниках" fill preload sizes="100vw" className="object-cover object-center opacity-55 lg:opacity-68" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,#17191c_0%,rgba(23,25,28,.96)_31%,rgba(23,25,28,.55)_58%,rgba(23,25,28,.12)_100%)]" />
        <div className="metal-grid absolute inset-0 opacity-20" />
        <div className="section-shell relative z-10 flex min-h-[714px] items-center py-16 lg:min-h-[774px]">
          <div className="max-w-[790px]">
            <div className="mb-8 flex flex-wrap items-center gap-3 text-xs font-bold uppercase tracking-[0.18em] text-white/60">
              <span className="h-px w-10 bg-[var(--orange)]" /> Автосервис в Омске
              <span className="hidden text-white/20 sm:inline">/</span>
              <span className="text-white/90">Нефтезаводская, 38Е/1</span>
            </div>
            <h1 className="font-display max-w-[840px] text-[clamp(2.75rem,7vw,6.35rem)] leading-[0.9] tracking-[-0.05em]">
              <span className="block">РЕМОНТ</span>
              <span className="block">АВТОМОБИЛЕЙ</span>
              <span className="block text-[var(--orange)]">В ОМСКЕ</span>
            </h1>
            <p className="mt-7 max-w-2xl text-base leading-7 text-white/68 md:text-xl md:leading-8">
              Диагностика, техническое обслуживание и ремонт легковых автомобилей. Специализируемся на Chevrolet, Daewoo и Ravon.
            </p>
            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a href="#calculator" className="focus-ring clip-corner inline-flex min-h-14 items-center justify-center gap-3 bg-[var(--orange)] px-7 font-extrabold transition hover:bg-[var(--orange-deep)]">
                Узнать стоимость <ArrowRight className="size-5" />
              </a>
              <a href={phoneHref} className="focus-ring inline-flex min-h-14 items-center justify-center gap-3 border border-white/25 bg-black/15 px-7 font-extrabold transition hover:border-white/60 hover:bg-white/5">
                <Phone className="size-5 text-[var(--orange)]" /> Позвонить мастеру
              </a>
            </div>
          </div>
        </div>
        <div className="relative z-20 border-t border-white/12 bg-black/35 backdrop-blur-md md:absolute md:inset-x-0 md:bottom-0">
          <div className="section-shell grid grid-cols-2 divide-x divide-white/10 lg:grid-cols-4">
            {[
              [CircleGauge, "Диагностика", "Находим причину"],
              [CarFront, "Разные марки", "Легковые авто"],
              [Braces, "Запчасти", "Поможем подобрать"],
              [Star, "4,7 в 2ГИС", "62 оценки"],
            ].map(([Icon, title, sub]) => {
              const Comp = Icon as typeof CircleGauge;
              return <div key={String(title)} className="flex min-h-24 items-center gap-3 px-3 py-4 sm:px-6"><Comp className="size-6 shrink-0 text-[var(--orange)]" /><div><p className="text-sm font-extrabold sm:text-base">{String(title)}</p><p className="mt-1 text-[11px] text-white/45 sm:text-xs">{String(sub)}</p></div></div>;
            })}
          </div>
        </div>
      </section>

      <section id="services" className="scroll-mt-20 bg-[var(--paper)] py-24 md:py-32">
        <div className="section-shell">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionTitle eyebrow="Услуги" title="С ЧЕМ МОЖЕМ ПОМОЧЬ" text="От планового обслуживания до сложного ремонта. Выберите направление или просто опишите проблему мастеру." />
            <a href="#lead" className="focus-ring inline-flex min-h-12 items-center gap-2 self-start border-b-2 border-[var(--orange)] font-extrabold">Не нашли нужную работу? <ArrowDownRight className="size-5" /></a>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden border border-black/15 bg-black/15 sm:grid-cols-2 lg:grid-cols-4">
            {serviceCards.map(({ icon: Icon, title, text, number }) => (
              <article key={title} className="group relative min-h-[285px] bg-[var(--paper)] p-7 transition duration-200 hover:bg-white">
                <div className="flex items-start justify-between">
                  <div className="grid size-12 place-items-center border border-black/15 transition group-hover:border-[var(--orange)] group-hover:bg-[var(--orange)] group-hover:text-white"><Icon className="size-6" /></div>
                  <span className="font-display text-xs text-black/25">/{number}</span>
                </div>
                <h3 className="mt-12 text-xl font-extrabold leading-tight">{title}</h3>
                <p className="mt-4 text-sm leading-6 text-black/55">{text}</p>
                <ArrowRight className="absolute bottom-7 right-7 size-5 text-black/25 transition group-hover:translate-x-1 group-hover:text-[var(--orange)]" />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="scroll-mt-20 bg-[#17191c] py-24 text-white md:py-32">
        <div className="section-shell grid gap-14 lg:grid-cols-[1fr_1.05fr] lg:items-center">
          <div>
            <SectionTitle light eyebrow="Специализация" title="ЗНАЕМ ЭТИ МАШИНЫ ИЗНУТРИ" text="Название АвтоGM — не случайность. В отзывах клиенты особенно отмечают опыт мастеров с автомобилями концерна GM." />
            <div className="mt-10 grid grid-cols-3 gap-px bg-white/10">
              {["CHEVROLET", "DAEWOO", "RAVON"].map((brand) => <div key={brand} className="grid min-h-24 place-items-center bg-[#17191c] px-3 text-center font-display text-sm sm:text-lg">{brand}</div>)}
            </div>
            <p className="mt-5 text-sm leading-6 text-white/48">Также обслуживаем Kia, Hyundai, Renault, отечественные, китайские, японские и европейские автомобили.</p>
          </div>
          <div className="grid gap-px bg-white/10 sm:grid-cols-2">
            {[
              ["01", "Диагностика по факту", "Ищем причину неисправности, а не меняем детали наугад."],
              ["02", "Понятное объяснение", "Мастер расскажет, что не работает и какие действия нужны."],
              ["03", "Работы разной сложности", "Двигатель, ходовая, электрика, охлаждение и кузов."],
              ["04", "Запчасти рядом", "Помогаем подобрать необходимые детали и расходники."],
            ].map(([num, title, text]) => (
              <div key={num} className="min-h-[230px] bg-[#1d2023] p-7"><span className="font-display text-sm text-[var(--orange)]">/{num}</span><h3 className="mt-12 text-xl font-extrabold">{title}</h3><p className="mt-4 text-sm leading-6 text-white/50">{text}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section id="calculator" className="scroll-mt-20 bg-[#e9e5dc] py-24 md:py-32">
        <div className="section-shell">
          <SectionTitle eyebrow="Ориентиры по цене" title="ПРИМЕРНАЯ СТОИМОСТЬ РЕМОНТА" text="Выберите автомобиль и необходимые работы. Покажем ориентир — окончательную стоимость мастер назовёт после уточнения задачи." />
          <div className="relative mt-14 grid border border-black/10 bg-[#17191c] text-white shadow-[0_30px_70px_rgba(23,25,28,.12)] lg:grid-cols-[1.45fr_.75fr]">
            <div className="metal-grid pointer-events-none absolute inset-0 opacity-35" />
            <div className="relative p-5 sm:p-8 lg:p-10">
              <div className="flex items-center gap-3">
                <span className="font-display text-sm text-[var(--orange)]">01</span>
                <span className="h-px flex-1 bg-white/10" />
                <h3 className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/58">Выберите автомобиль</h3>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <CarSelect
                  id="car-brand"
                  label="Марка автомобиля"
                  value={brand}
                  options={Object.keys(carModels) as Brand[]}
                  open={openCarSelect === "brand"}
                  onToggle={() => setOpenCarSelect((current) => current === "brand" ? null : "brand")}
                  onClose={() => setOpenCarSelect(null)}
                  onChange={changeBrand}
                />
                <CarSelect
                  id="car-model"
                  label="Модель"
                  value={model}
                  options={carModels[brand] as readonly string[]}
                  open={openCarSelect === "model"}
                  onToggle={() => setOpenCarSelect((current) => current === "model" ? null : "model")}
                  onClose={() => setOpenCarSelect(null)}
                  onChange={(nextModel) => { setModel(nextModel); setOpenCarSelect(null); }}
                />
              </div>
              <fieldset className="mt-10">
                <legend className="flex w-full items-center gap-3">
                  <span className="font-display text-sm text-[var(--orange)]">02</span>
                  <span className="h-px flex-1 bg-white/10" />
                  <span className="text-xs font-extrabold uppercase tracking-[0.18em] text-white/58">Выберите работы</span>
                </legend>
                <div className="mt-3 flex flex-wrap gap-2">
                  {(Object.keys(priceGroups) as Category[]).map((item) => <button key={item} type="button" onClick={() => selectCategory(item)} className={`focus-ring min-h-11 cursor-pointer border px-4 text-sm font-bold transition ${category === item ? "border-[var(--orange)] bg-[var(--orange)] text-white" : "border-white/15 bg-white/[.025] text-white/60 hover:border-white/40 hover:text-white"}`} aria-pressed={category === item}>{item}</button>)}
                </div>
              </fieldset>
              <fieldset className="mt-6">
                <legend className="sr-only">Выберите услуги</legend>
                <div className="divide-y divide-white/10 border-y border-white/10">
                  {priceGroups[category].map(([name, price]) => {
                    const active = selected.includes(name);
                    return <button key={name} type="button" onClick={() => toggleService(name)} className={`focus-ring flex min-h-16 w-full cursor-pointer items-center gap-3 px-2 py-3 text-left transition ${active ? "bg-white/[.055]" : "hover:bg-white/[.035]"}`} aria-pressed={active}><span className={`grid size-6 shrink-0 place-items-center border transition ${active ? "border-[var(--orange)] bg-[var(--orange)] text-white" : "border-white/25"}`}>{active && <Check className="size-4" />}</span><span className={`flex-1 text-sm font-bold sm:text-base ${active ? "text-white" : "text-white/68"}`}>{name}</span><span className={`tabular-nums text-sm font-extrabold ${active ? "text-[var(--orange)]" : "text-white/70"}`}>от {price.toLocaleString("ru-RU")} ₽</span></button>;
                  })}
                </div>
              </fieldset>
            </div>
            <aside className="relative z-10 flex flex-col justify-between border-t border-black/10 bg-[var(--paper)] p-7 text-[var(--ink)] sm:p-10 lg:border-l lg:border-t-0">
              <div>
                <div className="flex items-center justify-between gap-4">
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-black/45">Ваш расчёт</p>
                  <span className="grid size-10 place-items-center border border-black/12"><CarFront className="size-5 text-[var(--orange)]" /></span>
                </div>
                <div className="mt-7 border-y border-black/10 py-5">
                  <p className="text-xs font-bold uppercase tracking-[0.12em] text-black/40">Автомобиль</p>
                  <p className="mt-2 text-lg font-extrabold">{brand} {model !== "Другая модель" ? model : ""}</p>
                  <div className="mt-5 flex items-end justify-between gap-4">
                    <p className="text-sm text-black/48">Выбрано работ</p>
                    <p className="font-display text-3xl">{selected.length}</p>
                  </div>
                </div>
                <p className="mt-8 text-sm text-black/48">Ориентировочная стоимость работ</p>
                <p className="mt-2 font-display text-[clamp(2.6rem,5vw,4.4rem)] leading-none text-[var(--orange)]">{total ? `от ${total.toLocaleString("ru-RU")} ₽` : "—"}</p>
                <p className="mt-5 text-xs leading-5 text-black/46">Запчасти рассчитываются отдельно. Цена зависит от модели и состояния автомобиля.</p>
              </div>
              <a href="#lead" className="focus-ring clip-corner mt-10 inline-flex min-h-14 items-center justify-between bg-[var(--orange)] px-6 font-extrabold text-white transition hover:bg-[var(--orange-deep)]">Уточнить стоимость <ArrowRight className="size-5" /></a>
            </aside>
          </div>
          <p className="mt-4 text-xs leading-5 text-black/45">Расчёт носит предварительный характер. Точную стоимость мастер назовёт после осмотра и диагностики автомобиля.</p>
        </div>
      </section>

      <section className="bg-[var(--paper)] py-24 md:py-32">
        <div className="section-shell">
          <SectionTitle eyebrow="Как всё проходит" title="ОТ ПРОБЛЕМЫ ДО ГОТОВОГО АВТО" />
          <div className="mt-14 grid gap-px bg-black/15 lg:grid-cols-4">
            {[
              [MessageCircle, "Расскажите о проблеме", "Позвоните или оставьте заявку на сайте."],
              [CircleGauge, "Приезжайте на диагностику", "Проверим автомобиль и определим причину."],
              [ShieldCheck, "Обсудим работы", "Объясним варианты и сориентируем по стоимости."],
              [CarFront, "Заберите автомобиль", "Свяжемся с вами, когда машина будет готова."],
            ].map(([Icon, title, text], index) => {
              const Comp = Icon as typeof Wrench;
              return <article key={String(title)} className="relative min-h-[270px] bg-[var(--paper)] p-7"><span className="font-display text-xs text-black/25">0{index + 1}</span><Comp className="mt-10 size-8 text-[var(--orange)]" /><h3 className="mt-6 text-xl font-extrabold">{String(title)}</h3><p className="mt-4 text-sm leading-6 text-black/52">{String(text)}</p>{index < 3 && <ArrowRight className="absolute -right-3 top-12 z-10 hidden size-6 bg-[var(--orange)] p-1 text-white lg:block" />}</article>;
            })}
          </div>
        </div>
      </section>

      <section id="works" className="bg-[#e9e5dc] py-24 md:py-32">
        <div className="section-shell">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionTitle eyebrow="Сервис изнутри" title="РАБОТАЕМ С АВТОМОБИЛЯМИ КАЖДЫЙ ДЕНЬ" text="Ремонтные боксы АвтоGM, автомобили клиентов и понятный ориентир для въезда на территорию." />
            <a target="_blank" rel="noreferrer" href="https://yandex.ru/maps/org/avtogm/89880416839/gallery/" className="focus-ring inline-flex min-h-12 items-center gap-2 self-start border-b-2 border-[var(--orange)] font-extrabold">Все фото в Яндекс Картах <ArrowDownRight className="size-5" /></a>
          </div>
          <div className="mt-14 grid auto-rows-[260px] gap-3 md:grid-cols-2 lg:grid-cols-4">
            {[
              [`${basePath}/maps/photo-07.webp`, "Ремонтная зона АвтоGM", "lg:col-span-2 lg:row-span-2"],
              [`${basePath}/maps/photo-05.webp`, "Автомобиль в ремонтном боксе", ""],
              [`${basePath}/maps/photo-01.webp`, "Въезд и ориентир к автосервису", ""],
              [`${basePath}/maps/photo-02.webp`, "Автомобили на подъёмниках", "lg:col-span-2"],
            ].map(([src, alt, size]) => (
              <figure key={src} className={`group relative overflow-hidden bg-[#24272a] ${size}`}>
                <Image src={src} alt={alt} fill sizes="(max-width: 768px) 100vw, 50vw" className="object-cover transition duration-300 group-hover:scale-[1.02]" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <figcaption className="absolute bottom-0 left-0 right-0 flex items-end justify-between gap-4 p-5 text-sm font-extrabold text-white"><span>{alt}</span><span className="text-[10px] uppercase tracking-[.14em] text-white/45">АвтоGM · Омск</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="reviews" className="scroll-mt-20 bg-[#17191c] py-24 text-white md:py-32">
        <div className="section-shell">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <SectionTitle light eyebrow="Отзывы" title="ГОВОРЯТ ВОДИТЕЛИ" text="Живые отзывы с конкретными историями ремонта — вместо общих обещаний о качестве." />
            <div className="flex gap-3"><a target="_blank" rel="noreferrer" href="https://yandex.ru/maps/org/avtogm/89880416839/reviews/" className="focus-ring min-h-12 border border-white/15 px-5 py-3 text-sm font-bold transition hover:border-white/50">Яндекс Карты</a><a target="_blank" rel="noreferrer" href="https://2gis.ru/omsk/firm/282003258789374/tab/reviews" className="focus-ring min-h-12 border border-white/15 px-5 py-3 text-sm font-bold transition hover:border-white/50">2ГИС</a></div>
          </div>
          <div className="mt-14 grid gap-px bg-white/10 lg:grid-cols-3">
            {reviews.map((review) => <article key={review.name} className="relative flex min-h-[310px] flex-col bg-[#1d2023] p-7"><Quote className="size-8 text-[var(--orange)]" /><p className="mt-8 flex-1 text-base leading-7 text-white/75">«{review.text}»</p><div className="mt-8 border-t border-white/10 pt-5"><p className="font-extrabold">{review.name}</p><p className="mt-1 text-xs text-white/40">{review.meta}</p></div></article>)}
          </div>
        </div>
      </section>

      <section id="lead" className="scroll-mt-20 bg-[var(--orange)] py-24 md:py-28">
        <div className="section-shell grid gap-12 lg:grid-cols-[.9fr_1.1fr] lg:items-start">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.2em] text-black/50">Консультация мастера</p>
            <h2 className="font-display mt-5 text-[clamp(2.5rem,5.7vw,5rem)] leading-[0.94] tracking-[-0.045em] text-white">ЧТО СЛУЧИЛОСЬ С АВТОМОБИЛЕМ?</h2>
            <p className="mt-6 max-w-xl text-base leading-7 text-black/65">Оставьте контакты и кратко опишите проблему. Мастер уточнит детали и подскажет, что делать дальше.</p>
            <a href={phoneHref} className="focus-ring mt-9 inline-flex items-center gap-3 border-b-2 border-black/30 pb-2 text-xl font-extrabold"><Phone className="size-6" /> {phoneDisplay}</a>
          </div>
          <form onSubmit={submitLead} className="bg-[#17191c] p-6 text-white sm:p-9" aria-live="polite">
            {sent ? (
              <div className="flex min-h-[320px] flex-col items-center justify-center text-center"><CheckCircle2 className="size-14 text-[var(--orange)]" /><h3 className="font-display mt-6 text-2xl">ЗАЯВКА ПРИНЯТА</h3><p className="mt-3 max-w-sm text-sm leading-6 text-white/55">Спасибо! Мастер свяжется с вами, уточнит детали и подскажет дальнейшие действия.</p><button type="button" onClick={() => setSent(false)} className="focus-ring mt-7 min-h-12 border border-white/20 px-5 font-bold">Отправить ещё одну</button></div>
            ) : (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  <label className="text-sm font-bold">Ваше имя<input required autoComplete="name" className="focus-ring mt-2 min-h-12 w-full border border-white/15 bg-white/[.04] px-4 font-medium text-white placeholder:text-white/25" placeholder="Алексей" /></label>
                  <label className="text-sm font-bold">Телефон<input required type="tel" autoComplete="tel" className="focus-ring mt-2 min-h-12 w-full border border-white/15 bg-white/[.04] px-4 font-medium text-white placeholder:text-white/25" placeholder="+7 900 000-00-00" /></label>
                </div>
                <label className="mt-5 block text-sm font-bold">Марка и модель<input className="focus-ring mt-2 min-h-12 w-full border border-white/15 bg-white/[.04] px-4 font-medium text-white placeholder:text-white/25" placeholder="Chevrolet Cruze" /></label>
                <label className="mt-5 block text-sm font-bold">Кратко опишите проблему<textarea rows={4} className="focus-ring mt-2 w-full resize-none border border-white/15 bg-white/[.04] p-4 font-medium text-white placeholder:text-white/25" placeholder="Появился стук в передней подвеске…" /></label>
                <button className="focus-ring clip-corner mt-6 inline-flex min-h-14 w-full cursor-pointer items-center justify-between bg-[var(--orange)] px-6 font-extrabold transition hover:bg-[var(--orange-deep)]">Получить консультацию <ArrowRight className="size-5" /></button>
                <p className="mt-4 text-xs leading-5 text-white/35">Нажимая кнопку, вы соглашаетесь на обработку персональных данных.</p>
              </>
            )}
          </form>
        </div>
      </section>

      <section id="contacts" className="scroll-mt-20 bg-[var(--paper)] py-24 md:py-32">
        <div className="section-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <SectionTitle eyebrow="Контакты" title="ЖДЁМ В АВТОGM" />
            <div className="mt-10 space-y-7">
              <div className="flex gap-4"><MapPin className="mt-1 size-6 shrink-0 text-[var(--orange)]" /><div><p className="font-extrabold">Нефтезаводская улица, 38Е, корпус 1</p><p className="mt-1 text-sm text-black/48">Советский округ, Омск</p></div></div>
              <div className="flex gap-4"><Clock3 className="mt-1 size-6 shrink-0 text-[var(--orange)]" /><div><p className="font-extrabold">09:00–19:00</p><p className="mt-1 text-sm text-black/48">Актуальный график лучше уточнить перед визитом</p></div></div>
              <div className="flex gap-4"><Phone className="mt-1 size-6 shrink-0 text-[var(--orange)]" /><div><a href={phoneHref} className="focus-ring rounded-sm font-extrabold">{phoneDisplay}</a><p className="mt-1 text-sm text-black/48">Позвоните мастеру</p></div></div>
            </div>
          </div>
          <div className="noise relative min-h-[430px] overflow-hidden bg-[#222529] text-white">
            <div className="metal-grid absolute inset-0 opacity-50" />
            <div className="absolute inset-x-[12%] top-1/2 h-px -rotate-6 bg-white/10" />
            <div className="absolute left-[58%] top-[15%] h-[70%] w-px rotate-12 bg-white/10" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center"><span className="mx-auto grid size-16 place-items-center bg-[var(--orange)]"><MapPin className="size-7" /></span><p className="mt-4 font-display text-xl">АВТОGM</p><p className="mt-1 text-xs text-white/45">Нефтезаводская, 38Е/1</p></div>
            <a target="_blank" rel="noreferrer" href="https://yandex.ru/maps/org/avtogm/89880416839/" className="focus-ring absolute bottom-6 left-6 right-6 flex min-h-14 items-center justify-between bg-white px-6 font-extrabold text-[var(--ink)] transition hover:bg-[var(--paper)]">Построить маршрут <Route className="size-5 text-[var(--orange)]" /></a>
          </div>
        </div>
      </section>

      <footer className="bg-[#111315] py-12 text-white">
        <div className="section-shell flex flex-col justify-between gap-8 border-b border-white/10 pb-10 md:flex-row md:items-center">
          <Logo light />
          <p className="max-w-md text-sm leading-6 text-white/42">Диагностика, обслуживание и ремонт автомобилей в Омске.</p>
          <a href={phoneHref} className="focus-ring self-start rounded-sm text-lg font-extrabold text-[var(--orange)] md:self-auto">{phoneDisplay}</a>
        </div>
        <div className="section-shell flex flex-col justify-between gap-3 pt-6 text-xs text-white/28 sm:flex-row"><p>© {new Date().getFullYear()} АвтоGM. Все права защищены.</p><p>Цены на сайте не являются публичной офертой.</p></div>
      </footer>
    </main>
  );
}
