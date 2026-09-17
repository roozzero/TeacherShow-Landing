import React, { useState, useEffect } from 'react';
import $ from 'jquery';
import { Navbar } from './components/Navbar';
import { LoginForm } from './components/LoginForm';
import { BrandShowcase } from './components/BrandShowcase';
import { SmsSimulatorToast } from './components/SmsSimulatorToast';
import { ForgotModal } from './components/ForgotModal';
import { DashboardPreviewModal } from './components/DashboardPreviewModal';
import { UserRole, ToastMessage, LoginFormData } from './types';

export default function App() {
  const [activeRole, setActiveRole] = useState<UserRole>('teacher');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [autoFilledOtp, setAutoFilledOtp] = useState<string>('');
  
  // Modals
  const [isForgotOpen, setIsForgotOpen] = useState(false);
  const [isDashboardOpen, setIsDashboardOpen] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState<string>('09123456789');

  // Trigger toast notification
  const addToast = (type: ToastMessage['type'], title: string, message: string, code?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newToast: ToastMessage = { id, type, title, message, code };
    setToasts((prev) => [...prev, newToast]);

    // Auto dismiss after 8 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 8000);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Trigger SMS simulator
  const handleRequestOtp = (phone: string) => {
    const code = Math.floor(10000 + Math.random() * 90000).toString();
    addToast(
      'sms',
      'تیچرشو (TeacherSho)',
      `کد ورود یک‌بارمصرف شما به سامانه تیچرشو: ${code}`,
      code
    );
  };

  const handleSimulateRandomSms = () => {
    const code = Math.floor(10000 + Math.random() * 90000).toString();
    addToast(
      'sms',
      'اطلاعیه پیامکی',
      `ثبت نمره‌دهی ماهانه با موفقیت انجام شد. کد تایید: ${code}`,
      code
    );
  };

  const handleLoginSubmit = (data: LoginFormData) => {
    setLoggedInUser(data.username);
    setIsDashboardOpen(true);
    addToast('success', 'ورود موفقیت‌آمیز', 'به سامانه یکپارچه تیچرشو خوش آمدید.');
  };

  // jQuery interactive background animation effect
  useEffect(() => {
    $(document).on('mousemove', (e) => {
      const mouseX = e.clientX / window.innerWidth;
      const mouseY = e.clientY / window.innerHeight;
      
      $('.ambient-glow-1').css({
        transform: `translate(${mouseX * 20}px, ${mouseY * 20}px)`,
      });
      $('.ambient-glow-2').css({
        transform: `translate(${mouseX * -20}px, ${mouseY * -20}px)`,
      });
    });

    return () => {
      $(document).off('mousemove');
    };
  }, []);

  return (
    <div className="h-screen max-h-screen flex flex-col justify-between bg-slate-100 text-slate-800 font-sans relative overflow-hidden bg-grid-pattern selection:bg-slate-900 selection:text-white">
      
      {/* Top Floating Glass Navigation Header */}
      <Navbar
        onOpenHelp={() => {
          addToast(
            'info',
            'راهنمای سامانه',
            'جهت ورود، نام کاربری (شماره همراه یا کد ملی) و کلمه عبور خود را وارد نمایید. در صورت عدم دریافت پیامک پشتیبانی با 021-91008080 تماس بگیرید.'
          );
        }}
      />

      {/* Main Viewport Content Layout (Asymmetric Composition) */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-1 lg:py-2 flex items-center">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 w-full items-center">
          
          {/* Asymmetric Section 1: Floating Glass Login Form Panel (Wider column allocation) */}
          <div className="lg:col-span-5 xl:col-span-5 w-full flex items-center justify-center order-1 lg:order-1">
            <LoginForm
              activeRole={activeRole}
              onRoleChange={setActiveRole}
              onForgotClick={() => setIsForgotOpen(true)}
              onSubmitSuccess={handleLoginSubmit}
              onRequestOtp={handleRequestOtp}
              autoFilledOtp={autoFilledOtp}
            />
          </div>

          {/* Asymmetric Section 2: Educational Visual Brand Showcase & Interactive Widgets */}
          <div className="lg:col-span-7 xl:col-span-7 w-full order-2 lg:order-2 hidden sm:block">
            <BrandShowcase
              activeRole={activeRole}
              onSimulateSms={handleSimulateRandomSms}
            />
          </div>

        </div>
      </main>

      {/* Footer System Credits */}
      <footer className="w-full py-2.5 px-4 bg-white/75 backdrop-blur-sm border-t border-slate-200/80 text-center text-xs text-slate-500 flex items-center justify-between max-w-7xl mx-auto z-10 shrink-0">
        <div>
          کلیه حقوق این سامانه متعلق به <strong className="text-slate-800">تیچرشو (TeacherSho)</strong> می‌باشد.
        </div>
        <div className="hidden sm:flex items-center gap-4 text-slate-400">
          <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-slate-700">حریم خصوصی</a>
          <span>•</span>
          <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-slate-700">شرایط و قوانین</a>
          <span>•</span>
          <a href="#support" onClick={(e) => e.preventDefault()} className="hover:text-slate-700">پشتیبانی آنلاین</a>
        </div>
      </footer>

      {/* SMS Simulator Toast Manager */}
      <SmsSimulatorToast
        toasts={toasts}
        onDismiss={handleDismissToast}
        onAutoFillCode={(code) => setAutoFilledOtp(code)}
      />

      {/* Password Recovery Modal */}
      <ForgotModal
        isOpen={isForgotOpen}
        onClose={() => setIsForgotOpen(false)}
        onSendSms={(phone, code) => {
          addToast('sms', 'کد بازیابی رمز عبور', `کد بازیابی کلمه عبور شما: ${code}`, code);
        }}
        onResetSuccess={() => {
          addToast('success', 'تغییر رمز عبور', 'کلمه عبور شما با موفقیت تغییر یافت. اکنون می‌توانید وارد شوید.');
        }}
      />

      {/* Dashboard Preview Modal (Triggered on successful login) */}
      <DashboardPreviewModal
        isOpen={isDashboardOpen}
        username={loggedInUser}
        role={activeRole}
        onLogout={() => setIsDashboardOpen(false)}
      />

    </div>
  );
}
