import React from 'react';
import { GraduationCap, HelpCircle, ArrowRightLeft, Sparkles } from 'lucide-react';

interface NavbarProps {
  onOpenHelp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenHelp }) => {
  return (
    <header className="w-full bg-white/85 backdrop-blur-md border-b border-slate-200/80 sticky top-0 z-30 px-4 lg:px-8 py-3 transition-all duration-300 shadow-xs">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        
        {/* Right Section: Brand Identity */}
        <div className="flex items-center gap-3">
          <div className="relative group cursor-pointer">
            <div className="w-10 h-10 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-900/20 group-hover:scale-105 transition-transform duration-300">
              <GraduationCap className="w-6 h-6 text-blue-300" />
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-white flex items-center justify-center">
              <span className="w-1.5 h-1.5 bg-white rounded-full animate-ping"></span>
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black tracking-tight text-slate-900">
                تیچرشو
              </h1>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                <Sparkles className="w-3 h-3 text-amber-500" />
                سامانه هوشمند ورود
              </span>
            </div>
            <p className="text-xs text-slate-500 hidden sm:block">
              درگاه یکپارچه معلمان، دانش‌آموزان و مدیریت مدارس
            </p>
          </div>
        </div>

        {/* Left Section: Actions */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Help Button */}
          <button
            onClick={onOpenHelp}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all duration-200 focus:outline-none"
            title="راهنما و پشتیبانی"
          >
            <HelpCircle className="w-4 h-4 text-slate-500" />
            <span className="hidden sm:inline">راهنما</span>
          </button>

          {/* Back to main site */}
          <a
            href="#main"
            onClick={(e) => {
              e.preventDefault();
              alert('شما در حال حاضر در صفحه اصلی سامانه ورود تیچرشو قرار دارید.');
            }}
            className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-slate-800 text-xs font-semibold transition-all duration-200 shadow-sm"
          >
            <ArrowRightLeft className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">صفحه اصلی</span>
          </a>
        </div>

      </div>
    </header>
  );
};

