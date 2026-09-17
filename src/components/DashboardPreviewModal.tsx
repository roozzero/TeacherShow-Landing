import React from 'react';
import { CheckCircle2, User, BookOpen, Layers, LogOut, Sparkles, ArrowRight } from 'lucide-react';
import { UserRole } from '../types';

interface DashboardPreviewModalProps {
  isOpen: boolean;
  username: string;
  role: UserRole;
  onLogout: () => void;
}

export const DashboardPreviewModal: React.FC<DashboardPreviewModalProps> = ({
  isOpen,
  username,
  role,
  onLogout,
}) => {
  if (!isOpen) return null;

  const roleLabels: Record<UserRole, string> = {
    teacher: 'دبیر / معلم گرامی',
    student: 'دانش‌آموز عزیز',
    manager: 'مدیریت محترم مدرسه',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-lg w-full p-8 shadow-2xl border border-slate-200 relative text-center">
        
        {/* Animated Checkmark */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-4 animate-bounce shadow-md">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-700 border border-blue-200 mb-3">
          <Sparkles className="w-3.5 h-3.5" />
          ورود موفقیت‌آمیز به سامانه
        </span>

        <h2 className="text-2xl font-black text-slate-900 mb-1">
          {roleLabels[role]} خوش آمدید!
        </h2>
        <p className="text-xs text-slate-500 mb-6">
          شناسه کاربری: <span className="font-mono text-slate-800 font-bold">{username}</span>
        </p>

        {/* Dashboard Quick Stats */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
            <BookOpen className="w-5 h-5 text-slate-700 mx-auto mb-1" />
            <span className="block text-xs text-slate-500">کلاس‌ها</span>
            <span className="font-bold text-slate-900 text-sm">۴ کلاس فعال</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
            <Layers className="w-5 h-5 text-slate-700 mx-auto mb-1" />
            <span className="block text-xs text-slate-500">کارنامه‌ها</span>
            <span className="font-bold text-slate-900 text-sm">آماده صدور</span>
          </div>
          <div className="p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
            <User className="w-5 h-5 text-slate-700 mx-auto mb-1" />
            <span className="block text-xs text-slate-500">وضعیت حساب</span>
            <span className="font-bold text-emerald-600 text-sm">تاییدشده</span>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-slate-100/80 text-right text-xs text-slate-600 mb-6 leading-relaxed">
          💡 <strong className="text-slate-800">راهنما:</strong> شما تمام مراحل احراز هویت (رمز عبور / OTP / کد تصویر امنیتی CAPTCHA) را با موفقیت انجام دادید. در نسخه عملیاتی کامل، سیستم شما را مستقیماً به داشبورد اصلی اختصاصی انتقال می‌دهد.
        </div>

        <button
          onClick={onLogout}
          className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-2xl transition-all duration-200 shadow-md flex items-center justify-center gap-2"
        >
          <LogOut className="w-4 h-4" />
          <span>خروج و تست مجدد سامانه ورود</span>
        </button>

      </div>
    </div>
  );
};
