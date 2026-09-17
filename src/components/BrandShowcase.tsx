import React, { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  Laptop,
  Wallet,
  Calendar,
  School,
  Users,
  GraduationCap,
  Sparkles,
  Activity,
  CheckCircle2,
  Clock,
  CreditCard,
  Layers,
  Check
} from 'lucide-react';
import { UserRole } from '../types';

interface BrandShowcaseProps {
  activeRole: UserRole;
  onSimulateSms?: () => void;
}

// Smooth Count-Up Hook for Persian Animated Numbers
const useCountUp = (endValue: number, duration: number = 1800) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTimestamp: number | null = null;
    let animationFrameId: number;

    const step = (timestamp: number) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Cubic ease-out formula
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeProgress * endValue));

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [endValue, duration]);

  return count;
};

// Convert number to Persian formatted string
const toPersianNum = (num: number): string => {
  return new Intl.NumberFormat('fa-IR').format(num);
};

export const BrandShowcase: React.FC<BrandShowcaseProps> = ({ activeRole }) => {
  // Animated Counters for Statistics
  const schoolsCount = useCountUp(850, 1600);
  const teachersCount = useCountUp(2450, 1800);
  const studentsCount = useCountUp(150000, 200000);

  const roleTitle = {
    teacher: 'سامانه هوشمند ارزیابی، کلاس آنلاین و مدیریت مدارس',
    student: 'پرتال یکپارچه آموزشی، تکالیف و کارنامه هوشمند',
    manager: 'پانل مدیریت جامع، حسابداری و برنامه‌ریزی هفتگی',
  }[activeRole];

  return (
    <div className="relative flex flex-col justify-between h-full p-1 sm:p-2 lg:p-3 overflow-hidden select-none">
      
      {/* Background Decorative Mesh & Glowing Orbs */}
      <div className="absolute top-1/4 right-10 w-80 h-80 rounded-full ambient-glow-1 blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-72 h-72 rounded-full ambient-glow-2 blur-3xl pointer-events-none -z-10" />

      {/* Main Content Container */}
      <div className="max-w-2xl mx-auto lg:mx-0 space-y-3 sm:space-y-3.5">
        
        {/* Header Title */}
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900 text-white text-[11px] font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>امکانات یکپارچه و هوشمند تیچرشو</span>
          </div>
          <h2 className="text-xl lg:text-2xl font-black text-slate-900 leading-snug tracking-tight">
            {roleTitle}
          </h2>
        </div>

        {/* 4 MODERN GRAPHICAL FEATURE CARDS (2x2 Grid with Extra Height and Breathing Room) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          
          {/* Feature 1: تحلیل هوشمند عملکرد تحصیلی */}
          <div className="group relative bg-white/90 backdrop-blur-xl p-4 sm:p-4.5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-blue-400/60 hover:-translate-y-0.5 transition-all duration-300 animate-float-slow flex flex-col justify-between min-h-[142px]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200/80 text-blue-600 flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform shrink-0">
                    <BarChart3 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                      تحلیل هوشمند عملکرد تحصیلی
                    </h3>
                    <span className="text-[10px] text-slate-500 font-medium">صدور کارنامه و پایش رشد</span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                  <TrendingUp className="w-3 h-3 text-emerald-600" />
                  +۴۲٪
                </span>
              </div>
            </div>

            {/* Interactive Graphical Mini Chart Visual */}
            <div className="mt-2 pt-2 border-t border-slate-100 flex items-end gap-1.5 h-11 px-1">
              <div className="flex-1 bg-slate-100 group-hover:bg-blue-100 rounded-t h-[45%] transition-all" title="آزمون ۱" />
              <div className="flex-1 bg-slate-200 group-hover:bg-blue-200 rounded-t h-[60%] transition-all" title="آزمون ۲" />
              <div className="flex-1 bg-blue-400 group-hover:bg-blue-500 rounded-t h-[75%] transition-all" title="آزمون ۳" />
              <div className="flex-1 bg-slate-900 rounded-t h-[95%] transition-all relative">
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 text-[8px] font-bold text-slate-700">عالی</span>
              </div>
            </div>
          </div>

          {/* Feature 2: برگزاری کلاس ها و آزمون های آنلاین */}
          <div className="group relative bg-white/90 backdrop-blur-xl p-4 sm:p-4.5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-emerald-400/60 hover:-translate-y-0.5 transition-all duration-300 animate-float-delayed flex flex-col justify-between min-h-[142px]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 border border-emerald-200/80 text-emerald-600 flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform shrink-0">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                      برگزاری کلاس ها و آزمون های آنلاین
                    </h3>
                    <span className="text-[10px] text-slate-500 font-medium">پلتفرم زنده و آزمون‌ساز</span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                  زنده
                </span>
              </div>
            </div>

            {/* Interactive Live Signal & Test Visual */}
            <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-600">
              <span className="flex items-center gap-1.5 font-medium text-slate-700">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                ارزیابی آنی ۴ گزینه‌ای
              </span>
              <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100/70 px-2 py-0.5 rounded-md">
                ۹۹.۹٪ پایداری
              </span>
            </div>
          </div>

          {/* Feature 3: حسابداری و شهریه هوشمند (Rich Graphic & Floating Animation) */}
          <div className="group relative bg-white/90 backdrop-blur-xl p-4 sm:p-4.5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-purple-400/60 hover:-translate-y-0.5 transition-all duration-300 animate-float-slow flex flex-col justify-between min-h-[142px]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 border border-purple-200/80 text-purple-600 flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform shrink-0">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                      حسابداری و شهریه هوشمند
                    </h3>
                    <span className="text-[10px] text-slate-500 font-medium">اقساط، فاکتور و پرداخت آنلاین</span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200 shrink-0">
                  <CreditCard className="w-3 h-3 text-purple-600" />
                  خودکار
                </span>
              </div>
            </div>

            {/* Graphical Micro Payment Tracker Bar */}
            <div className="mt-2 pt-2 border-t border-slate-100 space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-slate-600 font-medium">
                <span className="flex items-center gap-1">
                  <Check className="w-3 h-3 text-purple-600 stroke-[3]" />
                  تسویه اقساط هوشمند
                </span>
                <span className="font-bold text-purple-800 bg-purple-100/70 px-1.5 py-0.5 rounded text-[9px]">
                  ارسال فاکتور پیامکی
                </span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden flex p-0.5 gap-1">
                <div className="bg-purple-600 h-full w-1/3 rounded-full" title="قسط اول" />
                <div className="bg-purple-500 h-full w-1/3 rounded-full" title="قسط دوم" />
                <div className="bg-purple-200 group-hover:bg-purple-400 transition-colors h-full w-1/3 rounded-full animate-pulse" title="قسط سوم" />
              </div>
            </div>
          </div>

          {/* Feature 4: مدیریت هوشمند برنامه هفتگی (Rich Graphic & Floating Animation) */}
          <div className="group relative bg-white/90 backdrop-blur-xl p-4 sm:p-4.5 rounded-2xl border border-slate-200/90 shadow-sm hover:shadow-xl hover:border-amber-400/60 hover:-translate-y-0.5 transition-all duration-300 animate-float-delayed flex flex-col justify-between min-h-[142px]">
            <div>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-xl bg-amber-50 border border-amber-200/80 text-amber-600 flex items-center justify-center shadow-2xs group-hover:scale-110 transition-transform shrink-0">
                    <Calendar className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-900 text-xs sm:text-sm">
                      مدیریت هوشمند برنامه هفتگی
                    </h3>
                    <span className="text-[10px] text-slate-500 font-medium">زمان‌بندی کلاس و معلم</span>
                  </div>
                </div>

                <span className="inline-flex items-center gap-0.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
                  <Clock className="w-3 h-3 text-amber-600" />
                  منظم
                </span>
              </div>
            </div>

            {/* Graphical Timetable Slots Graphic */}
            <div className="mt-2 pt-2 border-t border-slate-100 space-y-1.5">
              <div className="flex items-center justify-between text-[10px] text-slate-600 font-medium">
                <span className="flex items-center gap-1">
                  <Layers className="w-3 h-3 text-amber-600" />
                  برنامه‌ریزی عدم تداخل
                </span>
                <span className="font-bold text-slate-800 bg-amber-100/70 px-1.5 py-0.5 rounded text-[9px]">
                  هماهنگی زنده
                </span>
              </div>
              <div className="grid grid-cols-4 gap-1">
                <div className="bg-slate-100 text-[9px] font-bold text-slate-600 py-1 text-center rounded border border-slate-200/60">شن</div>
                <div className="bg-slate-100 text-[9px] font-bold text-slate-600 py-1 text-center rounded border border-slate-200/60">یک</div>
                <div className="bg-amber-500 text-white text-[9px] font-black py-1 text-center rounded shadow-2xs animate-pulse">دو</div>
                <div className="bg-slate-100 text-[9px] font-bold text-slate-600 py-1 text-center rounded border border-slate-200/60">سه</div>
              </div>
            </div>
          </div>

        </div>

        {/* ANIMATED COMPACT STATISTICS SECTION (Reduced Height, Vazirmatn Font) */}
        <div className="p-2.5 sm:p-3 bg-white/95 backdrop-blur-xl rounded-2xl border border-slate-200/90 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5 text-xs font-black text-slate-900">
              <Activity className="w-3.5 h-3.5 text-blue-600" />
              <span>آمار و شاخص‌های کلیدی تیچرشو</span>
            </div>
            <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full">
              به‌روزرسانی زنده
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-center">
            
            {/* Stat 1: مدارس فعال */}
            <div className="p-2 rounded-xl bg-amber-50/70 border border-amber-100 hover:border-amber-300 hover:scale-[1.02] transition-all duration-300 group">
              <div className="w-7 h-7 mx-auto mb-1 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <School className="w-3.5 h-3.5" />
              </div>
              <div className="text-sm sm:text-base font-black text-slate-900 tracking-tight font-['Vazirmatn']">
                +{toPersianNum(schoolsCount)}
              </div>
              <div className="text-[10px] sm:text-[11px] font-bold text-slate-600 mt-0.5 font-['Vazirmatn']">
                تعداد مدارس فعال
              </div>
            </div>

            {/* Stat 2: معلمان */}
            <div className="p-2 rounded-xl bg-blue-50/70 border border-blue-100 hover:border-blue-300 hover:scale-[1.02] transition-all duration-300 group">
              <div className="w-7 h-7 mx-auto mb-1 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Users className="w-3.5 h-3.5" />
              </div>
              <div className="text-sm sm:text-base font-black text-slate-900 tracking-tight font-['Vazirmatn']">
                +{toPersianNum(teachersCount)}
              </div>
              <div className="text-[10px] sm:text-[11px] font-bold text-slate-600 mt-0.5 font-['Vazirmatn']">
                تعداد معلمان
              </div>
            </div>

            {/* Stat 3: دانش آموزان */}
            <div className="p-2 rounded-xl bg-emerald-50/70 border border-emerald-100 hover:border-emerald-300 hover:scale-[1.02] transition-all duration-300 group">
              <div className="w-7 h-7 mx-auto mb-1 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <GraduationCap className="w-3.5 h-3.5" />
              </div>
              <div className="text-sm sm:text-base font-black text-slate-900 tracking-tight font-['Vazirmatn']">
                +{toPersianNum(studentsCount)}
              </div>
              <div className="text-[10px] sm:text-[11px] font-bold text-slate-600 mt-0.5 font-['Vazirmatn']">
                تعداد دانش آموزان
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
