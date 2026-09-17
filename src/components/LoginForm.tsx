import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import {
  Lock,
  Phone,
  Eye,
  EyeOff,
  ShieldCheck,
  ArrowLeft,
  Smartphone,
  AlertCircle,
  Clock,
  Sparkles,
  CheckSquare,
  Square,
  KeyRound
} from 'lucide-react';
import { UserRole, AuthMode, LoginFormData } from '../types';
import { CaptchaCanvas } from './CaptchaCanvas';
import { TwoFactorModal } from './TwoFactorModal';

interface LoginFormProps {
  activeRole: UserRole;
  onRoleChange: (role: UserRole) => void;
  onForgotClick: () => void;
  onSubmitSuccess: (data: LoginFormData) => void;
  onRequestOtp: (phone: string) => void;
  autoFilledOtp?: string;
}

export const LoginForm: React.FC<LoginFormProps> = ({
  activeRole,
  onRoleChange,
  onForgotClick,
  onSubmitSuccess,
  onRequestOtp,
  autoFilledOtp,
}) => {
  const [authMode, setAuthMode] = useState<AuthMode>('password');
  // Initial empty values for phone and password
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  // OTP state
  const [otpCode, setOtpCode] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [timerSeconds, setTimerSeconds] = useState(120);

  // Captcha state
  const [captchaCode, setCaptchaCode] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [isCaptchaValid, setIsCaptchaValid] = useState(false);

  // 2FA Google Authenticator State (Default enabled so 2FA modal opens upon primary auth)
  const [isTwoFactorEnabled, setIsTwoFactorEnabled] = useState(true);
  const [is2FAModalOpen, setIs2FAModalOpen] = useState(false);

  // UI States
  const [errorAlert, setErrorAlert] = useState('');
  const [loading, setLoading] = useState(false);

  // Sync auto filled OTP from SMS simulator
  useEffect(() => {
    if (autoFilledOtp) {
      setOtpCode(autoFilledOtp);
      setAuthMode('otp');
      setOtpSent(true);
    }
  }, [autoFilledOtp]);

  // Timer interval for OTP resend
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (otpSent && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [otpSent, timerSeconds]);

  // Live CAPTCHA validation check
  useEffect(() => {
    if (captchaInput && captchaInput === captchaCode) {
      setIsCaptchaValid(true);
      setErrorAlert('');
    } else {
      setIsCaptchaValid(false);
    }
  }, [captchaInput, captchaCode]);

  const handleRequestSmsCode = () => {
    setErrorAlert('');
    if (!username || username.length < 10) {
      setErrorAlert('لطفاً شماره تلفن معتبر وارد کنید (مثال: 09123456789)');
      return;
    }

    setOtpSent(true);
    setTimerSeconds(120);
    onRequestOtp(username);
  };

  const handleSubmitPrimaryForm = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorAlert('');

    // Validation
    if (!username.trim()) {
      setErrorAlert('لطفاً شماره تلفن یا کد ملی را وارد نمایید.');
      return;
    }

    if (authMode === 'password' && !password.trim()) {
      setErrorAlert('لطفاً رمز عبور خود را وارد نمایید.');
      return;
    }

    if (authMode === 'otp' && (!otpCode.trim() || otpCode.length < 4)) {
      setErrorAlert('لطفاً کد ۵ رقمی تایید را وارد کنید.');
      return;
    }

    if (captchaInput !== captchaCode) {
      setErrorAlert('کد امنیتی تصویر وارد شده اشتباه است.');
      return;
    }

    // Primary Credentials Passed -> Animate Button
    setLoading(true);
    
    // jQuery smooth pulse effect on form container
    $('#login-card-container').addClass('scale-[0.99] transition-transform duration-200');

    setTimeout(() => {
      $('#login-card-container').removeClass('scale-[0.99]');
      setLoading(false);

      // Check if 2FA is enabled for this user account
      if (isTwoFactorEnabled) {
        setIs2FAModalOpen(true);
      } else {
        // Direct login without 2FA
        onSubmitSuccess({
          role: activeRole,
          authMode,
          username,
          password,
          otpCode,
          captchaInput,
          rememberMe: false,
        });
      }
    }, 600);
  };

  const handle2FAVerified = () => {
    setIs2FAModalOpen(false);
    onSubmitSuccess({
      role: activeRole,
      authMode,
      username,
      password,
      otpCode,
      captchaInput,
      rememberMe: false,
    });
  };

  return (
    <>
      <div
        id="login-card-container"
        className="bg-white/95 backdrop-blur-xl rounded-3xl p-5 sm:p-6 shadow-2xl border border-slate-200/90 relative overflow-hidden max-w-lg w-full mx-auto"
      >
        
        {/* Top Accent Bar */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-slate-900" />

        {/* Header */}
        <div className="mb-3.5 text-center">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-100 text-slate-800 text-xs font-bold mb-1.5 border border-slate-200">
            <Sparkles className="w-3.5 h-3.5 text-blue-600" />
            <span>ورود به حساب کاربری تیچرشو</span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
            خوش آمدید
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            جهت دسترسی به سامانه، اطلاعات حساب خود را وارد کنید
          </p>
        </div>

        {/* Role Tabs */}
        <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 rounded-2xl mb-3.5 border border-slate-200/80 text-xs font-bold">
          <button
            type="button"
            onClick={() => onRoleChange('teacher')}
            className={`py-2 px-1 rounded-xl transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer ${
              activeRole === 'teacher'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>دبیر / معلم</span>
          </button>
          <button
            type="button"
            onClick={() => onRoleChange('student')}
            className={`py-2 px-1 rounded-xl transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer ${
              activeRole === 'student'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>دانش‌آموز</span>
          </button>
          <button
            type="button"
            onClick={() => onRoleChange('manager')}
            className={`py-2 px-1 rounded-xl transition-all duration-200 flex items-center justify-center gap-1 cursor-pointer ${
              activeRole === 'manager'
                ? 'bg-slate-900 text-white shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <span>مدیر مدرسه</span>
          </button>
        </div>

        {/* Auth Mode Toggle Pill (Password vs. SMS OTP) */}
        <div className="flex items-center justify-between gap-2 p-1 bg-brand-input border border-brand-input rounded-2xl mb-3.5">
          <button
            type="button"
            onClick={() => {
              setAuthMode('password');
              setErrorAlert('');
            }}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
              authMode === 'password'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>ورود با رمز عبور</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setAuthMode('otp');
              setErrorAlert('');
            }}
            className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer ${
              authMode === 'otp'
                ? 'bg-white text-slate-900 shadow-xs border border-slate-200/80'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Smartphone className="w-3.5 h-3.5" />
            <span>ورود با پیامک</span>
          </button>
        </div>

        {/* Inline Error Alert */}
        {errorAlert && (
          <div className="mb-3.5 p-2.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium flex items-center gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{errorAlert}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmitPrimaryForm} className="space-y-3">
          
          {/* Username / Mobile input */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              شماره تلفن یا کد ملی
            </label>
            <div className="relative">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="شماره تلفن"
                className="w-full pl-10 pr-4 py-2.5 bg-brand-input border border-brand-input rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800/20 focus:bg-white transition-all dir-ltr placeholder:font-['Vazirmatn'] placeholder:text-xs sm:placeholder:text-sm placeholder:text-slate-400"
              />
              <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            </div>
          </div>

          {/* PASSWORD MODE: Password Input */}
          {authMode === 'password' && (
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-bold text-slate-700">
                  رمز عبور
                </label>
                <button
                  type="button"
                  onClick={onForgotClick}
                  className="text-xs font-bold text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
                >
                  رمز عبور را فراموش کرده‌اید؟
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="رمز عبور"
                  className="w-full pl-10 pr-4 py-2.5 bg-brand-input border border-brand-input rounded-2xl text-slate-900 text-sm focus:outline-none focus:ring-2 focus:ring-slate-800/20 focus:bg-white transition-all placeholder:font-['Vazirmatn'] placeholder:text-xs sm:placeholder:text-sm placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3.5 top-3 text-slate-400 hover:text-slate-700 focus:outline-none cursor-pointer"
                  title={showPassword ? 'مخفی کردن رمز' : 'نمایش رمز'}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
          )}

          {/* OTP MODE: SMS Code Input & Request Button */}
          {authMode === 'otp' && (
            <div className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <label className="block text-xs font-bold text-slate-700">
                  کد تایید پیامکی
                </label>

                <button
                  type="button"
                  disabled={otpSent && timerSeconds > 0}
                  onClick={handleRequestSmsCode}
                  className={`text-xs font-bold px-3 py-1 rounded-xl transition-all flex items-center gap-1 cursor-pointer ${
                    otpSent && timerSeconds > 0
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-slate-900 text-white hover:bg-slate-800 shadow-xs active:scale-95'
                  }`}
                >
                  {otpSent && timerSeconds > 0 ? (
                    <>
                      <Clock className="w-3 h-3 text-slate-400 animate-spin" />
                      <span>ارسال مجدد ({timerSeconds}s)</span>
                    </>
                  ) : (
                    <span>دریافت کد پیامکی</span>
                  )}
                </button>
              </div>

              <div className="relative">
                <input
                  type="text"
                  maxLength={5}
                  value={otpCode}
                  onChange={(e) => setOtpCode(e.target.value)}
                  placeholder="کد ۵ رقمی تایید"
                  className="w-full px-4 py-2.5 bg-brand-input border border-brand-input rounded-2xl text-slate-900 text-center font-mono tracking-widest text-lg font-bold focus:outline-none focus:ring-2 focus:ring-slate-800/20 focus:bg-white transition-all placeholder:text-xs placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-400 placeholder:font-['Vazirmatn']"
                />
              </div>
            </div>
          )}

          {/* CUSTOM CAPTCHA CANVAS SECTION (No English Text) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              کد امنیتی تصویر
            </label>
            <div className="flex items-center gap-2.5">
              <input
                type="text"
                value={captchaInput}
                onChange={(e) => setCaptchaInput(e.target.value)}
                placeholder="کد امنیتی"
                className={`flex-1 px-3.5 py-2 bg-brand-input border rounded-2xl text-slate-900 text-xs sm:text-sm text-center font-mono tracking-wider font-bold focus:outline-none focus:bg-white transition-all placeholder:font-['Vazirmatn'] placeholder:text-xs placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-400 ${
                  isCaptchaValid
                    ? 'border-emerald-400 ring-2 ring-emerald-500/20'
                    : 'border-brand-input focus:ring-2 focus:ring-slate-800/20'
                }`}
              />
              <CaptchaCanvas
                onCodeChange={setCaptchaCode}
                isValidated={isCaptchaValid}
              />
            </div>
          </div>

          {/* 2FA Status Toggle Pill (Clean & Integrated) */}
          <div className="flex items-center justify-between pt-1 pb-0.5 border-t border-slate-100/80 text-xs">
            <button
              type="button"
              onClick={() => setIsTwoFactorEnabled(!isTwoFactorEnabled)}
              className="flex items-center gap-1.5 text-slate-600 hover:text-slate-900 font-medium transition-colors cursor-pointer select-none"
            >
              <div className={`w-3.5 h-3.5 rounded border flex items-center justify-center transition-colors ${
                isTwoFactorEnabled ? 'bg-slate-900 border-slate-900 text-white' : 'border-slate-300 bg-white'
              }`}>
                {isTwoFactorEnabled && <CheckSquare className="w-3.5 h-3.5 text-white" />}
              </div>
              <span>ورود دو مرحله‌ای Google Authenticator</span>
            </button>

            <span className="text-[11px] text-emerald-700 font-semibold flex items-center gap-1 shrink-0">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              ورود امن
            </span>
          </div>

          {/* Primary Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-3 bg-brand-navy hover:bg-slate-900 text-white font-bold text-sm rounded-2xl transition-all duration-200 shadow-lg shadow-slate-900/15 flex items-center justify-center gap-2 active:scale-[0.98] disabled:opacity-80 cursor-pointer"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <span>ورود به سامانه</span>
                <ArrowLeft className="w-4 h-4" />
              </>
            )}
          </button>

        </form>

      </div>

      {/* 2FA Google Authenticator Verification Modal */}
      <TwoFactorModal
        isOpen={is2FAModalOpen}
        onClose={() => setIs2FAModalOpen(false)}
        onVerifySuccess={handle2FAVerified}
      />
    </>
  );
};
