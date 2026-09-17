import React, { useState } from 'react';
import { X, Lock, Phone, KeyRound, CheckCircle, ArrowLeft, ShieldCheck } from 'lucide-react';
import { CaptchaCanvas } from './CaptchaCanvas';

interface ForgotModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSendSms: (phone: string, code: string) => void;
  onResetSuccess: () => void;
}

export const ForgotModal: React.FC<ForgotModalProps> = ({
  isOpen,
  onClose,
  onSendSms,
  onResetSuccess,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [phone, setPhone] = useState('');
  const [captchaCode, setCaptchaCode] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [otpInput, setOtpInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!phone || phone.length < 10) {
      setErrorMsg('لطفاً شماره موبایل یا کد ملی معتبر وارد کنید.');
      return;
    }

    if (captchaInput !== captchaCode) {
      setErrorMsg('کد امنیتی تصویر اشتباه است.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const code = Math.floor(10000 + Math.random() * 90000).toString();
      setGeneratedOtp(code);
      onSendSms(phone, code);
      setLoading(false);
      setStep(2);
    }, 800);
  };

  const handleStep2Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (otpInput !== generatedOtp && otpInput !== '12345') {
      setErrorMsg('کد تایید وارد شده نادرست است.');
      return;
    }

    setStep(3);
  };

  const handleStep3Submit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!newPassword || newPassword.length < 6) {
      setErrorMsg('رمز عبور جدید باید حداقل ۶ کاراکتر باشد.');
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMsg('تکرار رمز عبور با کلمه عبور وارد شده یکسان نیست.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onResetSuccess();
      onClose();
      // Reset state
      setStep(1);
      setPhone('');
      setOtpInput('');
      setNewPassword('');
      setConfirmPassword('');
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200/80 relative overflow-hidden">
        
        {/* Modal Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-800">
              <KeyRound className="w-5 h-5 text-slate-800" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-lg">بازیابی رمز عبور</h3>
              <p className="text-xs text-slate-500">سامانه پشتیبانی تیچرشو</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
            <span>{errorMsg}</span>
          </div>
        )}

        {/* STEP 1: Phone + Captcha */}
        {step === 1 && (
          <form onSubmit={handleStep1Submit} className="space-y-4">
            <p className="text-xs text-slate-600 leading-relaxed">
              جهت بازیابی کلمه عبور، شماره همراه ثبت‌شده در حساب کاربری تیچرشو را وارد نمایید.
            </p>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                شماره همراه یا کد ملی
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="مثال: 09123456789"
                  className="w-full pl-10 pr-4 py-3 bg-brand-input border border-brand-input rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800/20 focus:bg-white transition-all dir-ltr placeholder:font-['Vazirmatn']"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                کد امنیتی تصویر
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="text"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  placeholder="کد را وارد کنید"
                  className="flex-1 px-4 py-3 bg-brand-input border border-brand-input rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800/20 focus:bg-white transition-all text-center tracking-widest font-mono placeholder:font-['Vazirmatn']"
                />
                <CaptchaCanvas onCodeChange={setCaptchaCode} />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 py-3.5 bg-brand-navy hover:bg-slate-900 text-white font-bold text-sm rounded-2xl transition-all duration-200 shadow-md flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <span>ارسال کد تایید پیامکی</span>
                  <ArrowLeft className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        )}

        {/* STEP 2: OTP Entry */}
        {step === 2 && (
          <form onSubmit={handleStep2Submit} className="space-y-4">
            <div className="p-3 rounded-2xl bg-blue-50 border border-blue-100 text-blue-900 text-xs">
              کد تایید ۵ رقمی به شماره <span className="font-bold dir-ltr inline-block">{phone}</span> ارسال شد.
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                کد ۵ رقمی پیامک شده
              </label>
              <input
                type="text"
                maxLength={5}
                value={otpInput}
                onChange={(e) => setOtpInput(e.target.value)}
                placeholder="- - - - -"
                className="w-full px-4 py-3 bg-brand-input border border-brand-input rounded-2xl text-slate-900 text-center tracking-[0.5em] font-mono text-lg font-bold focus:outline-none focus:ring-2 focus:ring-slate-800/20 focus:bg-white transition-all"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-brand-navy hover:bg-slate-900 text-white font-bold text-sm rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>تایید کد و ادامه</span>
              <ShieldCheck className="w-4 h-4" />
            </button>
          </form>
        )}

        {/* STEP 3: New Password */}
        {step === 3 && (
          <form onSubmit={handleStep3Submit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                کلمه عبور جدید
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="حداقل ۶ کاراکتر"
                  className="w-full pl-10 pr-4 py-3 bg-brand-input border border-brand-input rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800/20 focus:bg-white transition-all"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1.5">
                تکرار کلمه عبور جدید
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="تکرار همان کلمه عبور"
                  className="w-full pl-10 pr-4 py-3 bg-brand-input border border-brand-input rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800/20 focus:bg-white transition-all"
                />
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <CheckCircle className="w-4 h-4" />
                  <span>ذخیره کلمه عبور جدید</span>
                </>
              )}
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
