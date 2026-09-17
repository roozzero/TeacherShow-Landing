import React from 'react';
import { MessageSquare, X, Check, Copy } from 'lucide-react';
import { ToastMessage } from '../types';

interface SmsSimulatorToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
  onAutoFillCode?: (code: string) => void;
}

export const SmsSimulatorToast: React.FC<SmsSimulatorToastProps> = ({
  toasts,
  onDismiss,
  onAutoFillCode,
}) => {
  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 left-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-slate-700/80 transform transition-all duration-300 animate-slide-up"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 border border-blue-400/30 text-blue-400 flex items-center justify-center shrink-0">
                <MessageSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-bold tracking-wide text-blue-300 uppercase block">
                  پیامک دریافتی • {toast.title}
                </span>
                <p className="text-xs text-slate-200 mt-0.5 leading-relaxed font-medium">
                  {toast.message}
                </p>
              </div>
            </div>

            <button
              onClick={() => onDismiss(toast.id)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {toast.code && (
            <div className="mt-3 pt-3 border-t border-slate-800 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800">
                <span className="text-xs text-slate-400">کد تایید:</span>
                <span className="font-mono text-base font-bold text-amber-400 tracking-widest">
                  {toast.code}
                </span>
              </div>

              {onAutoFillCode && (
                <button
                  onClick={() => {
                    onAutoFillCode(toast.code!);
                    onDismiss(toast.id);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-all duration-200 shadow-sm active:scale-95"
                >
                  <Copy className="w-3.5 h-3.5" />
                  <span>جایگذاری خودکار</span>
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
