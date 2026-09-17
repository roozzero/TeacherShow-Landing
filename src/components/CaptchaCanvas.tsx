import React, { useEffect, useRef, useState, useCallback } from 'react';
import $ from 'jquery';
import { RefreshCw, CheckCircle2 } from 'lucide-react';

interface CaptchaCanvasProps {
  onCodeChange: (code: string) => void;
  isValidated?: boolean;
}

export const CaptchaCanvas: React.FC<CaptchaCanvasProps> = ({ onCodeChange, isValidated }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [currentCode, setCurrentCode] = useState<string>('');

  const generateCaptchaCode = useCallback(() => {
    // Generate a 5-digit random numeric captcha for clarity and Iranian UX standard
    const digits = '0123456789';
    let code = '';
    for (let i = 0; i < 5; i++) {
      code += digits.charAt(Math.floor(Math.random() * digits.length));
    }
    return code;
  }, []);

  const drawCaptcha = useCallback((code: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    canvas.width = 130;
    canvas.height = 42;

    // Background gradient using brand colors (slate & ice blue)
    const bgGradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    bgGradient.addColorStop(0, '#eef4fc');
    bgGradient.addColorStop(1, '#e2e8f0');
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw background distortion noise lines
    for (let i = 0; i < 6; i++) {
      ctx.beginPath();
      ctx.strokeStyle = i % 2 === 0 ? '#94a3b8' : '#cbd5e1';
      ctx.lineWidth = Math.random() * 1.5 + 0.8;
      ctx.moveTo(Math.random() * canvas.width, Math.random() * canvas.height);
      ctx.bezierCurveTo(
        Math.random() * canvas.width, Math.random() * canvas.height,
        Math.random() * canvas.width, Math.random() * canvas.height,
        Math.random() * canvas.width, Math.random() * canvas.height
      );
      ctx.stroke();
    }

    // Draw random noise dots
    for (let i = 0; i < 35; i++) {
      ctx.fillStyle = '#64748b';
      ctx.beginPath();
      ctx.arc(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 1.2,
        0,
        2 * Math.PI
      );
      ctx.fill();
    }

    // Draw individual characters with rotation and distortion
    ctx.font = 'bold 22px Vazirmatn, sans-serif';
    ctx.textBaseline = 'middle';

    const charWidth = canvas.width / (code.length + 0.8);
    for (let i = 0; i < code.length; i++) {
      ctx.save();
      const x = (i + 0.5) * charWidth + 8;
      const y = canvas.height / 2 + (Math.random() * 4 - 2);
      const angle = (Math.random() * 0.4 - 0.2); // Random rotation between -12 deg and +12 deg

      ctx.translate(x, y);
      ctx.rotate(angle);

      // Character color using slate navy
      ctx.fillStyle = i % 2 === 0 ? '#1e293b' : '#334155';
      ctx.shadowColor = 'rgba(0, 0, 0, 0.15)';
      ctx.shadowBlur = 2;
      ctx.shadowOffsetX = 1;
      ctx.shadowOffsetY = 1;

      ctx.fillText(code[i], 0, 0);
      ctx.restore();
    }
  }, []);

  const refreshCaptcha = useCallback(() => {
    // jQuery rotation effect on the refresh icon wrapper
    if (containerRef.current) {
      const $btn = $(containerRef.current).find('.refresh-btn');
      $btn.addClass('rotate-180 transition-transform duration-300');
      setTimeout(() => $btn.removeClass('rotate-180'), 300);
    }

    const newCode = generateCaptchaCode();
    setCurrentCode(newCode);
    onCodeChange(newCode);
    drawCaptcha(newCode);
  }, [drawCaptcha, generateCaptchaCode, onCodeChange]);

  useEffect(() => {
    refreshCaptcha();
  }, []);

  return (
    <div ref={containerRef} className="flex items-center gap-2 select-none">
      <div className="relative overflow-hidden rounded-xl border border-slate-300/80 bg-slate-100 p-1 shadow-inner flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="rounded-lg cursor-pointer"
          onClick={refreshCaptcha}
          title="جهت تغییر کد تصویر کلیک کنید"
        />
        {isValidated && (
          <div className="absolute inset-0 bg-emerald-500/10 backdrop-blur-[1px] flex items-center justify-center rounded-lg">
            <CheckCircle2 className="w-6 h-6 text-emerald-600 animate-bounce" />
          </div>
        )}
      </div>

      <button
        type="button"
        onClick={refreshCaptcha}
        className="refresh-btn p-2.5 rounded-xl bg-slate-200/80 hover:bg-slate-300/80 text-slate-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-slate-800/30 active:scale-95"
        title="دریافت کد تصویر جدید"
        aria-label="کد تصویر جدید"
      >
        <RefreshCw className="w-4 h-4" />
      </button>
    </div>
  );
};
