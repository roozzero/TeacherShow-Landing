import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Lock, AlertCircle, ArrowLeft, X, Smartphone, CheckCircle2 } from 'lucide-react';

interface TwoFactorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVerifySuccess: () => void;
}

export const TwoFactorModal: React.FC<TwoFactorModalProps> = ({
  isOpen,
  onClose,
  onVerifySuccess,
}) => {
  const [code, setCode] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setCode('');
      setErrorMsg('');
      setLoading(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const cleanCode = code.trim();

    if (!cleanCode) {
      setErrorMsg('لطفاً کد ۶ رقمی تأیید را وارد نمایید.');
      return;
    }

    if (cleanCode.length !== 6 || !/^\d+$/.test(cleanCode)) {
      setErrorMsg('کد تأیید باید یک عدد ۶ رقمی باشد.');
      return;
    }

    setLoading(true);

    // Simulate 2FA code verification against Google Authenticator secret
    setTimeout(() => {
      // Demo code: 123456 or any 6-digit code except test fail codes like '000000'
      if (cleanCode === '000000') {
        setErrorMsg('کد ۶ رقمی وارد شده نامعتبر یا منقضی شده است.');
        setLoading(false);
      } else {
        setLoading(false);
        onVerifySuccess();
      }
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-950/60 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in select-none">
      
      {/* Modal Card Container */}
      <div className="bg-white/95 backdrop-blur-xl rounded-3xl p-6 sm:p-7 shadow-2xl border border-slate-200/90 relative max-w-md w-full mx-auto overflow-hidden animate-scale-up">
        
        {/* Top Decorative Accent Line */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-slate-900" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-slate-400 hover:text-slate-700 bg-slate-100 hover:bg-slate-200 p-1.5 rounded-full transition-colors cursor-pointer"
          title="انصراف"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header Icon & Title */}
        <div className="text-center mb-5 pt-1">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center mx-auto mb-3 shadow-md border border-slate-800">
            <ShieldCheck className="w-6 h-6 text-emerald-400" />
          </div>

          <h3 className="text-lg sm:text-xl font-black text-slate-900 tracking-tight">
            تأیید هویت دو مرحله‌ای
          </h3>
          <p className="text-xs text-slate-500 mt-1 leading-relaxed px-2">
            کد ۶ رقمی زمان‌دار تولیدشده توسط برنامه <strong className="text-slate-700 font-bold">Google Authenticator</strong> را وارد کنید.
          </p>
        </div>

        {/* Inline Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-2.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="space-y-4">
          
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1.5 text-center">
              کد ۶ رقمی تأیید
            </label>

            <div className="relative">
              <input
                ref={inputRef}
                type="text"
                maxLength={6}
                value={code}
                onChange={(e) => {
                  setCode(e.target.value);
                  if (errorMsg) setErrorMsg('');
                }}
                placeholder="۱۲۳۴۵۶"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 text-center font-mono tracking-[0.4em] text-xl font-bold focus:outline-none focus:ring-2 focus:ring-slate-800/20 focus:bg-white transition-all dir-ltr placeholder:tracking-normal placeholder:font-['Vazirmatn'] placeholder:text-sm placeholder:font-normal placeholder:text-slate-400"
              />
            </div>

            {/* Helper Demo Hint Badge */}
            <div className="mt-2.5 flex items-center justify-between text-[11px] text-slate-500 bg-slate-100/80 px-3 py-1.5 rounded-xl border border-slate-200/60">
              <span className="flex items-center gap-1 text-slate-600 font-medium">
                <Smartphone className="w-3.5 h-3.5 text-slate-500" />
                کد آزمایشی:
              </span>
              <span className="font-mono font-bold text-slate-900 tracking-wider">
                123456
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="pt-1 space-y-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm rounded-2xl transition-all duration-200 shadow-lg shadow-slate-900/15 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-80 cursor-pointer"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>تأیید و ورود</span>
                  <ArrowLeft className="w-4 h-4" />
                </>
              )}
            </button>

            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition-colors cursor-pointer"
            >
              انصراف
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
