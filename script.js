/* ==========================================================================
   TeacherSho (تیچرشو) Premium Brand Script
   Pure jQuery Implementation with Enforced Vazirmatn Font Behavior
   ========================================================================== */

$(document).ready(function () {

  /* ------------------------------------------------------------------------
     1. Sticky Navbar & Scroll Spy
     ------------------------------------------------------------------------ */
  $(window).on('scroll', function () {
    const scrollPos = $(this).scrollTop();

    if (scrollPos > 30) {
      $('#main-header').addClass('scrolled');
    } else {
      $('#main-header').removeClass('scrolled');
    }

    // Toggle Back to Top Button
    if (scrollPos > 250) {
      $('#back-to-top').addClass('show');
    } else {
      $('#back-to-top').removeClass('show');
    }

    // ScrollSpy active link update
    $('section[id]').each(function () {
      const targetTop = $(this).offset().top - 120;
      const targetBottom = targetTop + $(this).outerHeight();
      const id = $(this).attr('id');

      if (scrollPos >= targetTop && scrollPos < targetBottom) {
        $('.nav-item, .saasable-nav-link, .saasable-mobile-link').removeClass('active');
        $(`.nav-item[href="#${id}"], .saasable-nav-link[href="#${id}"], .saasable-mobile-link[href="#${id}"]`).addClass('active');
      }
    });
  });

  // SaasAble Dropdown & Mobile Menu Interactions
  $('.saasable-dropdown-trigger').on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    const $parent = $(this).closest('.saasable-has-dropdown');
    $('.saasable-has-dropdown').not($parent).removeClass('open');
    $parent.toggleClass('open');
  });

  // Mobile Menu Toggle
  $('#saasable-mobile-btn').on('click', function (e) {
    e.stopPropagation();
    $(this).toggleClass('open');
    $('#saasable-mobile-menu').toggleClass('show');
  });

  // Close menus on outside click or navigation
  $(document).on('click', function (e) {
    if (!$(e.target).closest('.saasable-nav-box, #saasable-mobile-menu').length) {
      $('#saasable-mobile-menu').removeClass('show');
      $('#saasable-mobile-btn').removeClass('open');
    }
  });

  $('.saasable-mobile-link').on('click', function () {
    $('#saasable-mobile-menu').removeClass('show');
    $('#saasable-mobile-btn').removeClass('open');
  });

  // Docs Modal Handlers
  $('.open-docs-trigger').on('click', function (e) {
    e.preventDefault();
    $('#docs-modal-overlay').fadeIn(200);
  });

  $('#close-docs-modal-btn, .close-docs-trigger').on('click', function () {
    $('#docs-modal-overlay').fadeOut(180);
  });

  $('#docs-modal-overlay').on('click', function (e) {
    if ($(e.target).is('#docs-modal-overlay')) {
      $(this).fadeOut(180);
    }
  });

  // Back to Top Click
  $('#back-to-top').on('click', function (e) {
    e.preventDefault();
    $('html, body').stop().animate({
      scrollTop: 0
    }, 600);
  });

  // Smooth Scrolling
  $('a[href^="#"]').on('click', function (e) {
    const href = $(this).attr('href');
    if (href && href !== '#') {
      const target = $(href);
      if (target.length) {
        e.preventDefault();
        $('html, body').stop().animate({
          scrollTop: target.offset().top - 80
        }, 500);
      }
    }
  });

  /* ------------------------------------------------------------------------
     2. Hero Section: Live Dynamic Stock Chart Motion Engine (Invest Section)
     Continuously animates and recalculates chart wave curve, live price,
     and indicator dot matching the user's screenshot
     ------------------------------------------------------------------------ */
  const $pocketChart = $('#pocket-motion-chart');
  if ($pocketChart.length) {
    let basePoints = [
      { x: 10, y: 35 },
      { x: 25, y: 55 },
      { x: 40, y: 40 },
      { x: 55, y: 75 },
      { x: 75, y: 65 },
      { x: 95, y: 105 },
      { x: 115, y: 125 },
      { x: 135, y: 110 },
      { x: 155, y: 145 },
      { x: 175, y: 120 },
      { x: 195, y: 85 },
      { x: 215, y: 115 },
      { x: 235, y: 95 },
      { x: 255, y: 125 },
      { x: 275, y: 110 },
      { x: 295, y: 135 },
      { x: 315, y: 115 },
      { x: 330, y: 85 }
    ];

    let chartPhase = 0;
    let basePrice = 19.45;

    function renderDynamicChart() {
      chartPhase += 0.05;

      // Generate smooth natural undulating wave coordinates
      const dynamicCoords = basePoints.map((pt, idx) => {
        // Apply harmonious sine waves to simulate live school metrics motion
        const wave1 = Math.sin(chartPhase + idx * 0.45) * 6;
        const wave2 = Math.cos(chartPhase * 0.7 + idx * 0.3) * 4;
        const yVal = Math.max(15, Math.min(160, pt.y + wave1 + wave2));
        return { x: pt.x, y: yVal };
      });

      // Construct SVG curve path
      let lineD = `M ${dynamicCoords[0].x},${dynamicCoords[0].y.toFixed(1)}`;
      for (let i = 1; i < dynamicCoords.length; i++) {
        const prev = dynamicCoords[i - 1];
        const curr = dynamicCoords[i];
        const cp1x = (prev.x + curr.x) / 2;
        const cp1y = prev.y;
        const cp2x = (prev.x + curr.x) / 2;
        const cp2y = curr.y;
        lineD += ` C ${cp1x.toFixed(1)},${cp1y.toFixed(1)} ${cp2x.toFixed(1)},${cp2y.toFixed(1)} ${curr.x},${curr.y.toFixed(1)}`;
      }

      const lastPt = dynamicCoords[dynamicCoords.length - 1];
      const areaD = `${lineD} L ${lastPt.x},180 L ${dynamicCoords[0].x},180 Z`;

      $('#pocket-line-path').attr('d', lineD);
      $('#pocket-area-path').attr('d', areaD);
      $('#pocket-live-dot').attr('cx', lastPt.x).attr('cy', lastPt.y.toFixed(1));

      // Fluctuating subtle academic score updates
      if (Math.floor(chartPhase * 10) % 15 === 0) {
        const delta = (Math.sin(chartPhase) * 0.12).toFixed(2);
        const currentP = (basePrice + parseFloat(delta)).toFixed(2);
        $('#live-stock-price').text(toPersianDigits(currentP));
        
        const pct = (1.85 + parseFloat(delta) * 0.15).toFixed(2);
        $('#live-stock-badge').text(`▲ +${toPersianDigits(pct)} رشد`);
      }

      requestAnimationFrame(renderDynamicChart);
    }

    requestAnimationFrame(renderDynamicChart);

    // Timeframe selector interaction
    $('.tf-tab').on('click', function () {
      $('.tf-tab').removeClass('active');
      $(this).addClass('active');

      // Slightly perturb points for chosen timeframe
      basePoints.forEach(pt => {
        pt.y = 20 + Math.random() * 120;
      });
    });
  }

  /* ------------------------------------------------------------------------
     3. Command Center Dashboard Motion Engine (Screenshot 1)
     Smooth continuous undulating wave chart + subtle dynamic updates
     ------------------------------------------------------------------------ */
  const $dashWaveLine = $('#dash-wave-line');
  const $dashWaveArea = $('#dash-wave-area');

  if ($dashWaveLine.length && $dashWaveArea.length) {
    let dashPhase = 0;

    function animateDashWave() {
      dashPhase += 0.035;

      // Control points for smooth undulating wave
      const cp1y = 40 + Math.sin(dashPhase) * 12;
      const cp2y = 100 + Math.cos(dashPhase * 0.8) * 14;
      const mid1y = 65 + Math.sin(dashPhase * 1.1) * 8;
      const cp3y = 20 + Math.cos(dashPhase * 0.9) * 10;
      const cp4y = 75 + Math.sin(dashPhase * 0.7) * 12;
      const endy = 52 + Math.cos(dashPhase) * 6;

      const pathLine = `M0,85 C60,${cp1y.toFixed(1)} 120,${cp2y.toFixed(1)} 180,${mid1y.toFixed(1)} C240,${cp3y.toFixed(1)} 300,${cp4y.toFixed(1)} 360,55 C380,48 400,${endy.toFixed(1)} 400,${endy.toFixed(1)}`;
      const pathArea = `${pathLine} L400,130 L0,130 Z`;

      $dashWaveLine.attr('d', pathLine);
      $dashWaveArea.attr('d', pathArea);

      requestAnimationFrame(animateDashWave);
    }

    requestAnimationFrame(animateDashWave);
  }

  /* ------------------------------------------------------------------------
     3.1 Ecosystem Cards Scroll Motion Graphic (Screenshot 2)
     Cards animate into view from different off-screen positions as user scrolls
     ------------------------------------------------------------------------ */
  const $animCards = $('[data-scroll-anim]');
  
  // Helper to convert Western digits to Persian numerals
  function toPersianDigits(num) {
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return num.toString().replace(/\d/g, x => farsiDigits[x]);
  }

  if ('IntersectionObserver' in window) {
    const cardObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const $target = $(entry.target);
          $target.addClass('in-view');
          
          // Animate numeric counters in Persian digits
          if ($target.hasClass('eco-stats-strip') || $target.find('[data-counter]').length > 0) {
            $target.find('[data-counter]').each(function () {
              const $counter = $(this);
              const targetVal = parseInt($counter.attr('data-counter'), 10);
              $({ countNum: 0 }).animate({ countNum: targetVal }, {
                duration: 1300,
                easing: 'swing',
                step: function () {
                  $counter.text(toPersianDigits(Math.floor(this.countNum)));
                },
                complete: function () {
                  $counter.text(toPersianDigits(targetVal));
                }
              });
            });
          }

          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    $animCards.each(function () {
      cardObserver.observe(this);
    });
  } else {
    // Fallback if IntersectionObserver is unavailable
    $animCards.addClass('in-view');
  }

  /* ------------------------------------------------------------------------
     4. Smart Weekly Schedule Filter
     ------------------------------------------------------------------------ */
  $('.sched-filter-btn').on('click', function () {
    $('.sched-filter-btn').removeClass('badge-dark').addClass('badge-blue');
    $(this).removeClass('badge-blue').addClass('badge-dark');

    $('.sched-td').css('opacity', '0.4');
    setTimeout(() => {
      $('.sched-td').css('opacity', '1');
    }, 180);
  });

  /* ------------------------------------------------------------------------
     5. Smart Assignment Workflow Showcase Controller (چرخه هوشمند تکالیف)
     ------------------------------------------------------------------------ */
  const assignmentWorkflowSteps = {
    1: {
      badge: 'گام ۱ از ۴ • ماژول اختصاصی دبیران',
      heading: 'تعریف آسان، پیوست فایل و تعیین هوشمند موعد تحویل',
      desc: 'معلم درس بدون فوت وقت، مبحث درسی را انتخاب کرده و با پیوست فایل صورت تمرین یا صوت راهنما، تکلیف را برای پایه‌ها و گروه‌های کلاسی دلخواه با موعد تحویل معین منتشر می‌کند.',
      checklist: [
        'انتخاب پایه، رشته و کلاس‌های هدف',
        'پیوست انواع فایل PDF، تصویر و صوت راهنما',
        'تعیین مهلت مجاز تحویل با تایمر هوشمند',
        'ثبت مستقیم در تقویم آموزشی و برنامه هفتگی'
      ],
      actor: 'معلم درس',
      auto: 'ثبت در تقویم کلاسی',
      windowTitle: 'پرتال معلم • ثبت تکلیف جدید',
      mockupHtml: `
        <div class="mockup-task-form">
          <div class="m-form-header">
            <div class="m-form-title-wrap">
              <span class="m-form-badge">درس ریاضی و حسابان</span>
              <h4 class="m-form-title">تمرین کلاسی مبحث مشتق و دیفرانسیل</h4>
            </div>
            <span class="m-form-status-pill">پیش‌نویس آماده انتشار</span>
          </div>
          <div class="m-form-row">
            <div class="m-input-box">
              <span class="m-input-lbl">پایه و کلاس هدف</span>
              <div class="m-input-val">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>
                <span>پایه دوازدهم ریاضی (کلاس ۱۰۱ و ۱۰۲)</span>
              </div>
            </div>
            <div class="m-input-box">
              <span class="m-input-lbl">موعد تحویل هوشمند</span>
              <div class="m-input-val text-blue">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                <span>شنبه ۲۵ بهمن • ساعت ۲۰:۰۰</span>
              </div>
            </div>
          </div>
          <div class="m-attach-card">
            <div class="m-attach-icon red-pdf">PDF</div>
            <div class="m-attach-info">
              <span class="m-attach-name">کاربرگ_تمرین_هفته_چهارم.pdf</span>
              <span class="m-attach-meta">۲.۴ مگابایت • ۴ صفحه سوال تشریحی</span>
            </div>
            <span class="m-attach-check">پیوست شد ✓</span>
          </div>
          <div class="m-form-footer">
            <div class="m-auto-hint">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              <span>تنظیم خودکار یادآوری ۲۴ ساعت قبل از موعد</span>
            </div>
            <button class="m-publish-btn" type="button">انتشار آنی در پرتال</button>
          </div>
        </div>
      `
    },
    2: {
      badge: 'گام ۲ از ۴ • اتوماسیون پیامکی و کارتابل',
      heading: 'اطلاع‌رسانی آنی پیامکی به اولیاء و دریافت در پرتال دانش‌آموز',
      desc: 'بلافاصله پس از انتشار تکلیف، پیامک اطلاع‌رسانی با لینک مستقیم به اولیاء ارسال شده و نوتیفیکیشن با شمارش معکوس تحویل در پنل اختصاصی دانش‌آموز فعال می‌گردد.',
      checklist: [
        'ارسال پیامک لینک مستقیم بدون نیاز به نصب اپلیکیشن',
        'نوتیفیکیشن لحظه‌ای در پرتال و پنل دانش‌آموزی',
        'تایمر هوشمند معکوس تا انقضای زمان تحویل',
        'گزارش‌گیری از پیامک‌های تحویل‌شده به خانواده‌ها'
      ],
      actor: 'سامانه پیامک & پرتال',
      auto: 'ارسال خودکار SMS به اولیاء',
      windowTitle: 'اعلان هوشمند • پیامک و پرتال دانش‌آموز',
      mockupHtml: `
        <div class="mockup-notify-view">
          <div class="m-sms-bubble">
            <div class="m-sms-header">
              <div class="m-sms-brand">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#026aa7" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                <span>سامانه پیام کوتاه تیچرشو</span>
              </div>
              <span class="m-sms-time">هم‌اکنون</span>
            </div>
            <p class="m-sms-body">
              ولی محترم دانش‌آموز علی احمدی؛<br>
              تکلیف جدید <strong>«حسابان ۲ - تمرین مشتق»</strong> در پرتال ثبت گردید.<br>
              مهلت تحویل: شنبه ساعت ۲۰:۰۰<br>
              مشاهده و ارسال: medryar.ir/hw/482
            </p>
            <div class="m-sms-tag">ارسال موفق به ۲۸ نفر اولیاء و دانش‌آموزان</div>
          </div>
          <div class="m-portal-card">
            <div class="m-portal-icon-box">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2.2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            </div>
            <div class="m-portal-text">
              <span class="m-portal-title">نوتیفیکیشن پرتال دانش‌آموزی</span>
              <span class="m-portal-sub">تکلیف جدید فعال شد • ۱ روز و ۴ ساعت تا پایان مهلت</span>
            </div>
            <span class="m-portal-btn">مشاهده</span>
          </div>
        </div>
      `
    },
    3: {
      badge: 'گام ۳ از ۴ • استودیو تصحیح دیجیتال',
      heading: 'آپلود تصویر برگه و تصحیح برخط با قلم نوری و صوت',
      desc: 'دانش‌آموز با دوربین موبایل از پاسخ‌نامه عکس گرفته و آپلود می‌کند. معلم بدون نیاز به پرینت، با قلم نوری خط‌به‌خط برگه را تصحیح کرده و بازخورد صوتی ثبت می‌نماید.',
      checklist: [
        'آپلود آسان عکس‌های چندصفحه‌ای با بهینه‌سازی حجم',
        'ابزار قلم نوری، هایلایتر و نشانه‌گذاری روی فایل برگه',
        'قابلیت ضبط ویس توضیحی معلم برای هر تمرین',
        'مشاهده آنی برگه تصحیح شده توسط دانش‌آموز'
      ],
      actor: 'دانش‌آموز & معلم درس',
      auto: 'ذخیره امن فایل برگه تصحیح‌شده',
      windowTitle: 'میزکار معلم • تصحیح برگه با قلم نوری',
      mockupHtml: `
        <div class="mockup-grading-studio">
          <div class="m-grading-top">
            <div class="m-student-chip">
              <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop" class="m-chip-avatar" alt="Avatar"/>
              <div>
                <div class="m-chip-name">علی احمدی (دوازدهم ریاضی)</div>
                <div class="m-chip-sub">زمان تحویل: جمعه ساعت ۱۸:۳۲ (به‌موقع)</div>
              </div>
            </div>
            <div class="m-score-tag">
              <span class="m-score-label">نمره ثبت‌شده</span>
              <strong class="m-score-val">۱۹.۵ / ۲۰</strong>
            </div>
          </div>
          <div class="m-grading-canvas">
            <div class="m-canvas-paper">
              <div class="m-handwriting-sample">
                <span class="hw-line">f'(x) = lim [ (x+h)^2 - x^2 ] / h = 2x</span>
                <span class="hw-line">lim [ sin(2x) / x ] as x->0 = 2</span>
              </div>
              <div class="m-pen-correction">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                <span class="m-pen-text">استدلال حد و مشتق دقیق است. آفرین!</span>
              </div>
            </div>
            <div class="m-pen-toolbar">
              <button class="m-tool-btn active-pen" title="قلم قرمز"><span class="pen-dot red"></span> قلم</button>
              <button class="m-tool-btn" title="هایلایتر"><span class="pen-dot yellow"></span> هایلایت</button>
              <button class="m-tool-btn voice-btn" title="یادداشت صوتی">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>
                <span>صوت (۰:۴۲)</span>
              </button>
            </div>
          </div>
        </div>
      `
    },
    4: {
      badge: 'گام ۴ از ۴ • آنالیز آماری و کارنامه',
      heading: 'درج خودکار در دفتر کلاسی و تحلیل هوشمند رشد تحصیلی',
      desc: 'نمره مستمر بلافاصله در دفتر کلاسی درج شده، کارنامه تحلیلی صادر می‌شود و هوش مصنوعی نقاط ضعف و قوت دانش‌آموز را در مقایسه با میانگین کلاس استخراج می‌کند.',
      checklist: [
        'ثبت آنی و بدون خطا در دفتر کلاسی مستمر',
        'محاسبه خودکار معدل و رتبه کلاسی دانش‌آموز',
        'ارسال پیامک کارنامه مقایسه‌ای برای اولیاء',
        'نمودار تحلیل هوشمند مباحث پرچالش برای معلم'
      ],
      actor: 'سیستم تیچرشو & هوش مصنوعی',
      auto: 'محاسبه معدل و صدور گزارش رشد',
      windowTitle: 'داشبورد نمرات • تحلیل رشد و عملکرد',
      mockupHtml: `
        <div class="mockup-analytics-view">
          <div class="m-analytics-head">
            <div class="m-gradebook-badge">دفتر نمرات هوشمند مستمر</div>
            <div class="m-class-avg">میانگین کلاس: ۱۸.۲ (رتبه ۴ از ۳۰)</div>
          </div>
          <div class="m-stats-mini-grid">
            <div class="m-stat-box">
              <span class="m-stat-box-lbl">نمره نهایی</span>
              <strong class="m-stat-box-val text-blue">۱۹.۵</strong>
              <span class="m-stat-box-sub">ثبت آنی در کارنامه</span>
            </div>
            <div class="m-stat-box">
              <span class="m-stat-box-lbl">تسلط مبحثی</span>
              <strong class="m-stat-box-val text-emerald">۹۶٪</strong>
              <span class="m-stat-box-sub">مفهوم مشتق کامل</span>
            </div>
            <div class="m-stat-box">
              <span class="m-stat-box-lbl">روند پیشرفت</span>
              <strong class="m-stat-box-val text-purple">+۱۵٪</strong>
              <span class="m-stat-box-sub">رشد نسبت به ماه قبل</span>
            </div>
          </div>
          <div class="m-ai-insight-box">
            <div class="m-ai-sparkle">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
            </div>
            <div class="m-ai-text">
              <strong>تحلیل هوشمند سیستم:</strong> دانش‌آموز در درک مفاهیم مشتق پیشرفت محسوسی داشته است. نمره به صورت پیامک خودکار برای اولیاء ارسال شد.
            </div>
          </div>
        </div>
      `
    }
  };

  function switchAssignmentWorkflowStep(stepNum) {
    const data = assignmentWorkflowSteps[stepNum];
    if (!data) return;

    // Update active states
    $('.assign-top-tab').removeClass('active').attr('aria-selected', 'false');
    $(`.assign-top-tab[data-assign-step="${stepNum}"]`).addClass('active').attr('aria-selected', 'true');

    $('.assign-milestone-card').removeClass('active');
    $(`.assign-milestone-card[data-assign-step="${stepNum}"]`).addClass('active');

    // Smooth transition
    $('.assign-feature-content, .assign-window-body').css('opacity', '0.2');

    setTimeout(() => {
      $('#assign-step-badge').text(data.badge);
      $('#assign-step-heading').text(data.heading);
      $('#assign-step-desc').text(data.desc);
      $('#assign-step-actor').text(data.actor);
      $('#assign-step-auto').text(data.auto);
      $('#assign-window-title').text(data.windowTitle);

      $('#assign-check-1').text(data.checklist[0]);
      $('#assign-check-2').text(data.checklist[1]);
      $('#assign-check-3').text(data.checklist[2]);
      $('#assign-check-4').text(data.checklist[3]);

      $('#assign-window-canvas').html(data.mockupHtml);

      $('.assign-feature-content, .assign-window-body').css('opacity', '1');
    }, 120);
  }

  // Click on top tab
  $('.assign-top-tab').on('click', function () {
    const step = parseInt($(this).data('assign-step'), 10);
    switchAssignmentWorkflowStep(step);
  });

  // Click on bottom milestone card
  $('.assign-milestone-card').on('click', function () {
    const step = parseInt($(this).data('assign-step'), 10);
    switchAssignmentWorkflowStep(step);
  });

  /* ------------------------------------------------------------------------
     6. Analytics Chart Interactive Tooltips & Filters
     ------------------------------------------------------------------------ */
  $('.chart-node-group, .radar-point, .m-bar-fill').on('mouseenter', function (e) {
    const valText = $(this).attr('data-val') || $(this).attr('data-skill') || $(this).find('.m-bar-val').text();
    const $tooltip = $('#chart-tooltip');

    if (!valText) return;

    $tooltip.text(valText).show();

    const rect = this.getBoundingClientRect();
    const parentRect = $('#analytics-trend-chart').parent()[0].getBoundingClientRect();

    const x = rect.left - parentRect.left + (rect.width / 2);
    const y = rect.top - parentRect.top;

    $tooltip.css({
      top: `${y - 38}px`,
      left: `${x - 45}px`
    });
  });

  $('.chart-node-group, .radar-point, .m-bar-fill').on('mouseleave', function () {
    $('#chart-tooltip').hide();
  });

  // Analytics Chart Filter Switcher
  $('.chart-filter-btn').on('click', function () {
    $('.chart-filter-btn').removeClass('active');
    $(this).addClass('active');

    const filter = $(this).data('chart-filter');

    if (filter === 'all') {
      $('.chart-block-trend, .chart-block-subjects, .chart-block-radar, .chart-block-simulator').fadeIn(250);
    } else if (filter === 'trend') {
      $('.chart-block-trend').fadeIn(250);
      $('.chart-block-subjects, .chart-block-radar, .chart-block-simulator').hide();
    } else if (filter === 'radar') {
      $('.chart-block-radar').fadeIn(250);
      $('.chart-block-trend, .chart-block-subjects, .chart-block-simulator').hide();
    } else if (filter === 'subjects') {
      $('.chart-block-subjects').fadeIn(250);
      $('.chart-block-trend, .chart-block-radar, .chart-block-simulator').hide();
    } else if (filter === 'simulator') {
      $('.chart-block-simulator').fadeIn(250);
      $('.chart-block-trend, .chart-block-subjects, .chart-block-radar').hide();
    }
  });

  /* ------------------------------------------------------------------------
     7. Teacher VS Student Workspaces Switcher
     ------------------------------------------------------------------------ */
  $('.ws-tab-btn').on('click', function () {
    $('.ws-tab-btn').removeClass('active badge-dark').addClass('badge-blue');
    $(this).removeClass('badge-blue').addClass('active badge-dark');

    const wsType = $(this).data('ws');

    if (wsType === 'teacher') {
      $('#teacher-ws-panel').fadeIn(200);
      $('#student-ws-panel').hide();
    } else {
      $('#teacher-ws-panel').hide();
      $('#student-ws-panel').fadeIn(200);
    }
  });

  // Student Sub-Navigation Tabs Switcher
  $('.student-subnav-btn').on('click', function () {
    $('.student-subnav-btn').removeClass('active');
    $(this).addClass('active');

    const tabKey = $(this).data('student-tab');
    $('.student-tab-pane').hide();
    $(`#st-tab-${tabKey}`).fadeIn(250);
  });

  /* ------------------------------------------------------------------------
     8. Video Testimonials Reels & Interactive Cards
     ------------------------------------------------------------------------ */
  $('.video-reel-card').on('click', function () {
    $('.video-reel-card').removeClass('active');
    $(this).addClass('active');

    // Visual feedback pulse on the reel play button
    const $playRipple = $(this).find('.reel-play-ripple');
    $playRipple.css({ transform: 'scale(1.8)', opacity: 0.9 });
    setTimeout(() => {
      $playRipple.css({ transform: '', opacity: '' });
    }, 450);
  });

  // Marquee pause on touch for mobile devices
  const $marqueeTrack = $('.testimonials-marquee-track');
  $marqueeTrack.on('touchstart', function() {
    $(this).css('animation-play-state', 'paused');
  }).on('touchend', function() {
    $(this).css('animation-play-state', 'running');
  });

  /* ------------------------------------------------------------------------
     9. Motion Graphic FAQ Interactive Showcase (NO ACCORDION)
     ------------------------------------------------------------------------ */
  const faqData = {
    1: {
      cat: 'زیرساخت ابری PWA',
      num: 'سوال شماره ۱ از ۴',
      q: 'آیا استفاده از تیچرشو نیاز به نصب نرم‌افزار یا تجهیزات سخت‌افزاری خاصی دارد؟',
      a: 'خیر! تیچرشو یک سامانه ۱۰۰٪ ابری (Web-Based) و مبتنی بر فناوری PWA است. کلیه مدیران، معلمان، اولیاء و دانش‌آموزان می‌توانند بدون نیاز به نصب هیچ‌گونه فایل یا اپلیکیشن، تنها از طریق مرورگر تمام دستگاه‌ها (موبایل، تبلت، لپ‌تاپ) با بالاترین سرعت وارد پرتال خود شوند.',
      hl1Title: 'پشتیبانی از تمام سیستم‌عامل‌ها',
      hl1Sub: 'اجرا روی اندروید، iOS، Windows و macOS',
      hl2Title: 'به‌روزرسانی خودکار و رایگان',
      hl2Sub: 'دسترسی همیشگی به آخرین آپدیت‌های امنیتی',
      icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
      progress: '25%',
      status: 'پاسخ‌دهنده خودکار فعال • سرعت تحلیل: ۰.۰۵s'
    },
    2: {
      cat: 'سیستم پیامک هوشمند شهریه',
      num: 'سوال شماره ۲ از ۴',
      q: 'ارسال پیامک یادآوری شهریه و اقساط چگونه عمل می‌کند؟',
      a: 'سیستم به صورت کاملاً هوشمند و خودکار، سررسید اقساط شهریه را پایش کرده و ۳ روز قبل از موعد، پیامکی اختصاصی حاوی لینک پرداخت مستقیم بانکی به شماره همراه سرپرست دانش‌آموز ارسال می‌کند. وضعیت پرداخت نیز بلافاصله در پنل حسابداری ثبت می‌شود.',
      hl1Title: 'درگاه پرداخت مستقیم شتابی',
      hl1Sub: 'واریز لحظه‌ای به حساب صندوق مدرسه',
      hl2Title: 'گزارش‌گیری عدم پرداخت',
      hl2Sub: 'ارسال مجدد پیگیری برای اقساط معوقه',
      icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
      progress: '50%',
      status: 'سامانه SMS بانکی وصل است • تایید شتاب'
    },
    3: {
      cat: 'مدیریت کاربران و سطوح دسترسی',
      num: 'سوال شماره ۳ از ۴',
      q: 'آیا امکان تعریف سطوح دسترسی متفاوت برای کادر اجرایی مدرسه وجود دارد؟',
      a: 'بله! مدیر ارشد مدرسه می‌تواند به تعداد نامحدود برای معاونین، ناظمین، معلمان، حسابداران و مشاورین تحصیلی نقش‌های کاربری سفارشی تعریف کند. هر فرد تنها به بخش‌های مجاز (مانند ثبت حضور غیاب، ورود نمرات یا مشاهده پرداختی‌ها) دسترسی خواهد داشت.',
      hl1Title: 'تفکیک کامل پرتال‌ها',
      hl1Sub: 'دسترسی مجزا برای معلم، ولی و ناظم',
      hl2Title: 'لاگ فعالیت‌های کاربران',
      hl2Sub: 'ثبت دقیق زمان تغییرات نمرات و داده‌ها',
      icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
      progress: '75%',
      status: 'سیستم مجوز ماتریسی ACL فعال است'
    },
    4: {
      cat: 'امنیت داده‌ها & بک‌آپ‌گیری',
      num: 'سوال شماره ۴ از ۴',
      q: 'امنیت اطلاعات تحصیلی و پشتیبان‌گیری از داده‌ها به چه صورت تضمین می‌شود؟',
      a: 'تمامی داده‌های مجتمع شما روی سرورهای ابری اختصاصی با پروتکل رمزنگاری SSL 256-bit نگهداری می‌شوند. سیستم به صورت روزانه خودکار از کلیه نمرات، پرونده‌ها و تراکنش‌ها پشتیبان گرفته و در سه داتاسنتر مجزا ذخیره می‌کند.',
      hl1Title: 'رمزنگاری SSL 256-bit',
      hl1Sub: 'بالاترین استانداردهای امنیتی بانکی',
      hl2Title: 'پشتیبان‌گیری ساعتی و روزانه',
      hl2Sub: 'بازیابی سریع فایل‌ها در صورت بروز مشکل',
      icon: '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
      progress: '100%',
      status: 'حفاظت ابری فعال • وضعیت سرورها: سبز 99.9%'
    }
  };

  let activeFaqId = 1;
  const totalFaqs = 4;

  function switchFaq(id) {
    activeFaqId = id;
    const item = faqData[id];
    if (!item) return;

    $('.faq-nav-btn').removeClass('active');
    $(`.faq-nav-btn[data-faq-id="${id}"]`).addClass('active');

    $('#faq-question-text, #faq-answer-text').css('opacity', '0.2');

    setTimeout(() => {
      $('#faq-cat-badge').text(item.cat);
      $('#faq-q-num').text(item.num);
      $('#faq-question-text').text(item.q);
      $('#faq-answer-text').text(item.a);
      $('#faq-hl1-title').text(item.hl1Title);
      $('#faq-hl1-sub').text(item.hl1Sub);
      $('#faq-hl2-title').text(item.hl2Title);
      $('#faq-hl2-sub').text(item.hl2Sub);
      $('#faq-active-icon').html(item.icon);
      $('#faq-progress-fill').css('width', item.progress);
      $('#faq-status-text').text(item.status);

      $('#faq-question-text, #faq-answer-text').css('opacity', '1');
    }, 150);
  }

  $('.faq-nav-btn').on('click', function () {
    const id = parseInt($(this).data('faq-id'), 10);
    switchFaq(id);
  });

  $('#faq-next-btn').on('click', function () {
    const nextId = activeFaqId >= totalFaqs ? 1 : activeFaqId + 1;
    switchFaq(nextId);
  });

  $('#faq-prev-btn').on('click', function () {
    const prevId = activeFaqId <= 1 ? totalFaqs : activeFaqId - 1;
    switchFaq(prevId);
  });

  /* ------------------------------------------------------------------------
     10. Interactive Login & 2FA Modal Controls
     ------------------------------------------------------------------------ */
  let is2FAStep = false;

  function openModal() {
    $('#login-modal-overlay').css('display', 'flex').hide().fadeIn(200);
    $('#modal-2fa-box').hide();
    is2FAStep = false;
  }

  function closeModal() {
    $('#login-modal-overlay').fadeOut(200);
  }

  $('.open-login-trigger').on('click', function (e) {
    e.preventDefault();
    openModal();
  });

  $('#close-modal-btn, #login-modal-overlay').on('click', function (e) {
    if (e.target === this) {
      closeModal();
    }
  });

  $('.modal-role-btn').on('click', function () {
    $('.modal-role-btn').removeClass('active').css({ background: 'var(--c-slate-100)', color: 'var(--c-slate-700)' });
    $(this).addClass('active').css({ background: 'var(--c-slate-900)', color: '#ffffff' });
  });

  $('#modal-login-form').on('submit', function (e) {
    e.preventDefault();

    const username = $('#login-username').val().trim();
    const password = $('#login-password').val().trim();

    if (!is2FAStep) {
      if (!username || !password) {
        alert('لطفاً شماره تلفن / نام کاربری و رمز عبور را وارد کنید.');
        return;
      }

      $('#modal-2fa-box').slideDown(200);
      $('#login-submit-btn span').text('تأیید کد ۲FA و ورود');
      is2FAStep = true;
    } else {
      const code = $('#login-2fa-code').val().trim();
      if (!code || code.length < 6) {
        alert('لطفاً کد ۶ رقمی Google Authenticator را وارد نمایید.');
        return;
      }

      alert('ورود با موفقیت انجام شد. خوش آمدید به سامانه تیچرشو!');
      closeModal();
    }
  });

  /* ------------------------------------------------------------------------
     11. Interactive Motion Architecture Diagram Controller
     ------------------------------------------------------------------------ */
  const diagramData = {
    finance: {
      status: 'سیستم فعال: درگاه پرداخت شتاب & SMS آنلاین',
      speed: '۰.۱۲ ثانیه',
      node1: 'صدور فاکتور',
      node2: 'قسط‌بندی اتوماتیک',
      node3: 'درگاه پرداخت & SMS',
      img: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=700&auto=format&fit=crop',
      badgeCat: 'حسابداری و مالیات',
      badgeMetric: '۹۹.۸٪ دقت حسابرسی',
      capTitle: 'امساک دیجیتال و تسویه شتاب',
      capSub: 'بدون خطای انسانی با تاییدیه بانک مرکزی',
      title: 'مدیریت هوشمند شهریه، اقساط و وصول خودکار',
      desc: 'سامانه حسابداری تیچرشو با صدور خودکار فاکتورهای الکترونیکی، اتصال مستقیم به درگاه‌های پرداخت شتاب و زمان‌بندی پیامکی، روند تسویه بدهی‌ها را ۳ برابر سریع‌تر می‌کند.',
      check1T: 'قسط‌بندی اتوماتیک با فرمول سفارشی',
      check1S: 'تعیین تعداد اقساط بر اساس توان مالی ولی و ثبت در پرونده دیجیتال',
      check2T: 'ارسال پیامک یادآوری هوشمند (SMS)',
      check2S: 'ارسال لینک پرداخت اختصاصی ۳ روز قبل از سررسید بدون بلک‌لیست',
      check3T: 'تسویه آنی و صدور فیش دیجیتال',
      check3S: 'ثبت سند حسابداری بلافاصله پس از پرداخت و به‌روزرسانی پرتال ولی'
    },
    exam: {
      status: 'سیستم فعال: موتور تصحیح آنلاین هوش مصنوعی',
      speed: '۰.۰۴ ثانیه',
      node1: 'طراحی تست AI',
      node2: 'برگزاری آنلاین',
      node3: 'تصحیح آنی & کلید',
      img: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=700&auto=format&fit=crop',
      badgeCat: 'آزمون‌ساز پیشرفته',
      badgeMetric: 'صفر ثانیه تاخیر تصحیح',
      capTitle: 'تصحیح خودکار با پردازش تصویر',
      capSub: 'تشخیص هوشمند پاسخ‌نامه‌های تشریحی و تستی',
      title: 'آزمون‌ساز آنلاین تستی و تشریحی همراه با هوش مصنوعی',
      desc: 'بانک سوالات هوشمند همراه با زمان‌بندی صادرکننده آزمون، قرنطینه آنلاین و ارائه پاسخ‌نامه تحلیل و آنالیز نقطه‌ای ضعف دانش‌آموزان.',
      check1T: 'بانک جامع سوالات کنکوری و تشریحی',
      check1S: 'دسته‌بندی مبحثی سوالات بر اساس فصول کتاب‌های درسی رسمی',
      check2T: 'قرنطینه دیجیتال و ضد تقلب',
      check2S: 'چیدمان تصادفی گزینه‌ها و سوالات برای هر دانش‌آموز به صورت مجزا',
      check3T: 'ارائه پاسخ‌نامه کلیدی و تشریحی آنی',
      check3S: 'نمایش بلافاصله تحلیل درصد و رتبه در کلاس پس از فشردن دکمه پایان'
    },
    report: {
      status: 'سیستم فعال: استعلام اصالت QR کد مرکز داده',
      speed: '۰.۰۱ ثانیه',
      node1: 'تجزیه نمرات',
      node2: 'رسم رادار پیشرفت',
      node3: 'ثبت QR اصالت',
      img: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=700&auto=format&fit=crop',
      badgeCat: 'کارنامه تحلیلی',
      badgeMetric: '۱۰۰٪ اصالت دیجیتال',
      capTitle: 'مهر امنیتی و QR کد اختصاصی',
      capSub: 'غیرقابل جعل و قابل استعلام در سراسر کشور',
      title: 'کارنامه تحلیلی PDF با QR کد استعلام اصالت',
      desc: 'صدور کارنامه ماهانه و ترمی همراه با نمودارهای پیشرفت مقایسه‌ای نسبت به میانگین پایه، رتبه‌بندی تحلیلی و هشدار افت تحصیلی.',
      check1T: 'نمودار راداری رشد درایوهای یادگیری',
      check1S: 'مقایسه عملکرد دانش‌آموز در دروس اختصاصی با میانگین کل مدرسه',
      check2T: 'صدور نسخه PDF با فرمت استاندارد آموزش و پرورش',
      check2S: 'امکان چاپ مستقیم با سربرگ اختصاصی و امضای دیجیتال مدیر',
      check3T: 'کد QR هوشمند استعلام فوری',
      check3S: 'اسکن سریع با موبایل برای مشاهده نسخه معتبر کارنامه در سرور'
    },
    sms: {
      status: 'سیستم فعال: خطوط خدماتی بدون بلک‌لیست',
      speed: '۰.۰۸ ثانیه',
      node1: 'ثبت غیبت/نمره',
      node2: 'موتور پردازش SMS',
      node3: 'تحویل فوری به اولیاء',
      img: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=700&auto=format&fit=crop',
      badgeCat: 'سامانه پیامکی',
      badgeMetric: '۱۰۰٪ تحویل حتی بلک‌لیست',
      capTitle: 'ارتباط مستقیم و لحظه‌ای با والدین',
      capSub: 'اطلاع‌رسانی تاخیر، غیبت و نمرات در همان دقیقه',
      title: 'سامانه پیامک اولیاء و اعلانات فوری مدرسه',
      desc: 'اطلاع‌رسانی هوشمند و بدون تاخیر غیبت‌ها، تاخیر ورود، نمرات مستمر کلاسی و اطلاعیه‌های مهم مدیر مدرسه از طریق پیامک خدماتی ویژه.',
      check1T: 'ارسال اتوماتیک پیامک غیبت در زنگ اول',
      check1S: 'ارسال SMS به محض ثبت غیبت توسط معلم در پرتال',
      check2T: 'پیامک نمرات کلاسی و انضباطی',
      check2S: 'والدین در همان لحظه از وضعیت درسی فرزندشان مطلع می‌شوند',
      check3T: 'خط خدماتی اختصاصی مدرسه',
      check3S: 'عبور از بلک‌لیست و تبلیغات بدون مسدودی شماره اولیاء'
    }
  };

  $('.diag-nav-btn').on('click', function () {
    $('.diag-nav-btn').removeClass('active');
    $(this).addClass('active');

    const key = $(this).data('diag-target');
    const data = diagramData[key];
    if (!data) return;

    $('.diag-inspector-box, .diag-nodes-container').css('opacity', '0.4');

    setTimeout(() => {
      $('#diag-status-lbl').text(data.status);
      $('#diag-speed-val').text(data.speed);

      $('#node1-title').text(data.node1);
      $('#node2-title').text(data.node2);
      $('#node3-title').text(data.node3);

      $('#diag-feature-img').attr('src', data.img);
      $('#diag-badge-category').text(data.badgeCat);
      $('#diag-badge-metric').text(data.badgeMetric);

      $('#diag-img-caption-title').text(data.capTitle);
      $('#diag-img-caption-sub').text(data.capSub);

      $('#diag-main-title').text(data.title);
      $('#diag-main-desc').text(data.desc);

      $('#check1-title').text(data.check1T);
      $('#check1-sub').text(data.check1S);

      $('#check2-title').text(data.check2T);
      $('#check2-sub').text(data.check2S);

      $('#check3-title').text(data.check3T);
      $('#check3-sub').text(data.check3S);

      $('.diag-inspector-box, .diag-nodes-container').css('opacity', '1');
    }, 180);
  });

  // Pulse Simulation Trigger in Diagram
  $('#btn-simulate-flow').on('click', function () {
    const $btn = $(this);
    $btn.css({ transform: 'scale(0.95)', background: '#2563eb', color: '#ffffff' });
    $('.laser-stream-line').css('stroke-width', '5');
    $('.laser-bullet').css('r', '7');
    $('.node-icon-wrapper').css('transform', 'scale(1.15)').css('box-shadow', '0 0 30px #38bdf8');

    setTimeout(() => {
      $btn.css({ transform: 'scale(1)', background: '', color: '' });
      $('.laser-stream-line').css('stroke-width', '2.5');
      $('.laser-bullet').css('r', '4.5');
      $('.node-icon-wrapper').css('transform', '').css('box-shadow', '');
    }, 900);
  });

  // Flow node click action
  $('.diag-flow-node').on('click', function () {
    const nodeName = $(this).find('.node-name').text();
    $('.diag-flow-node .node-icon-wrapper').removeClass('node-core-glow');
    $(this).find('.node-icon-wrapper').addClass('node-core-glow');
    $('#diag-status-lbl').text(`گره فعال: ${nodeName} • تبادل دیتا برقرار است`);
  });

  /* ------------------------------------------------------------------------
     12. Intersection Observer for Scroll Motion Graphics & Video Effects
     ------------------------------------------------------------------------ */
  if ('IntersectionObserver' in window) {
    const motionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          
          // If entering testimonials section, start a subtle preview pulse
          if ($(entry.target).hasClass('cinematic-player-stage')) {
            $('#video-scrubber-fill').css('animation', 'reelSimulateProgress 14s linear infinite');
          }
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.scroll-motion-target').forEach((el) => {
      motionObserver.observe(el);
    });
  } else {
    $('.scroll-motion-target').addClass('is-visible');
  }

  /* ------------------------------------------------------------------------
     13. School Panels Showcase Tabs & 3-Stacked Cards Animation
     ------------------------------------------------------------------------ */
  const schoolPanelsConfig = {
    admin: {
      tag: "مدیریت مدرسه",
      heading: "مدیریت هوشمند و یکپارچه مدرسه",
      desc: "همه ابزارهای موردنیاز مدیر برای نظارت بر عملکرد مدرسه، دانش‌آموزان و کادر آموزشی",
      checklist: [
        "مدیریت دانش‌آموزان و کلاس‌ها",
        "نظارت بر عملکرد آموزشی",
        "مدیریت کادر و کارکنان مدرسه",
        "گزارش‌ها و آمارهای مدیریتی"
      ],
      images: [
        "/assets/Imgs/img-001/Screenshot 2026-09-15 215025.png",
        "/assets/Imgs/img-001/Screenshot 2026-09-15 215040.png",
        "/assets/Imgs/img-001/Screenshot 2026-09-15 215128.png"
      ],
      titles: [
        "میز کار اصلی مدیریت",
        "داشبورد نظارت و فرآیندها",
        "گزارش‌ها و آمارهای مدیریتی"
      ]
    },
    teacher: {
      tag: "مدیریت کلاس",
      heading: "ابزارهای هوشمند برای تدریس بهتر",
      desc: "همه امکانات موردنیاز معلم برای مدیریت کلاس، ارزیابی دانش‌آموزان و پیگیری روند یادگیری",
      checklist: [
        "مدیریت کلاس و دانش‌آموزان",
        "ثبت حضور و غیاب",
        "ارزیابی و ثبت نمرات",
        "گزارش عملکرد و پیشرفت تحصیلی"
      ],
      images: [
        "/assets/Imgs/img-002/Screenshot 2026-09-15 214859.png",
        "/assets/Imgs/img-002/Screenshot 2026-09-15 214917.png",
        "/assets/Imgs/img-002/Screenshot 2026-09-15 214944.png"
      ],
      titles: [
        "میز کار معلم و کلاس‌ها",
        "ثبت نمرات و ارزیابی مستمر",
        "دفتر حضور و غیاب هوشمند"
      ]
    },
    student: {
      tag: "یادگیری و پیشرفت",
      heading: "همه‌چیز برای یک مسیر یادگیری بهتر",
      desc: "دسترسی آسان به برنامه درسی، تکالیف، نمرات و وضعیت تحصیلی در یک داشبورد",
      checklist: [
        "مشاهده برنامه کلاسی",
        "مدیریت تکالیف و فعالیت‌ها",
        "مشاهده نمرات و کارنامه",
        "پیگیری پیشرفت تحصیلی"
      ],
      images: [
        "/assets/Imgs/img-003/Screenshot 2026-09-15 214944.png",
        "/assets/Imgs/img-003/Screenshot 2026-09-15 215000.png",
        "/assets/Imgs/img-003/Screenshot 2026-09-15 215222.png"
      ],
      titles: [
        "داشبورد یادگیری دانش‌آموز",
        "برنامه کلاسی و تکالیف هفتگی",
        "کارنامه و نمودار پیشرفت تحصیلی"
      ]
    },
    tools: {
      tag: "ابزارهای اختصاصی",
      heading: "ابزارهای کاربردی متناسب با نیاز شما",
      desc: "امکانات اختصاصی برای ساده‌تر شدن مدیریت، آموزش و ارتباط در سامانه مدرسه",
      checklist: [
        "ابزارهای مدیریت و برنامه‌ریزی",
        "امکانات اختصاصی آموزشی",
        "ارتباط و اطلاع‌رسانی سریع",
        "گزارش‌ها و ابزارهای کاربردی"
      ],
      images: [
        "/assets/Imgs/img-004/Screenshot 2026-09-15 214234.png",
        "/assets/Imgs/img-004/Screenshot 2026-09-15 214313.png",
        "/assets/Imgs/img-004/Screenshot 2026-09-15 214424.png"
      ],
      titles: [
        "ابزارهای اختصاصی سامانه",
        "مرکز ارتباط و اطلاع‌رسانی سریع",
        "تنظیمات پیشرفته و ماژول‌ها"
      ]
    }
  };

  function animateStackedCards(cfg) {
    const $card3 = $('#stacked-card-3');
    const $card2 = $('#stacked-card-2');
    const $card1 = $('#stacked-card-1');

    // Put cards into is-entering position (shifted bottom-right +85px with opacity 0)
    $card3.addClass('is-entering');
    $card2.addClass('is-entering');
    $card1.addClass('is-entering');

    // Update images and window titles
    setTimeout(function () {
      $('#stacked-img-3').attr('src', cfg.images[2]);
      $('#stacked-title-3').text(cfg.titles[2]);

      $('#stacked-img-2').attr('src', cfg.images[1]);
      $('#stacked-title-2').text(cfg.titles[1]);

      $('#stacked-img-1').attr('src', cfg.images[0]);
      $('#stacked-title-1').text(cfg.titles[0]);

      // Sequential entrance from bottom-right (deepest card first, then middle, then front)
      setTimeout(function () {
        $card3.removeClass('is-entering');
      }, 50);

      setTimeout(function () {
        $card2.removeClass('is-entering');
      }, 190);

      setTimeout(function () {
        $card1.removeClass('is-entering');
      }, 330);
    }, 70);
  }

  $('.mui-top-tab').on('click', function () {
    const tabKey = $(this).data('mui-tab');
    if ($(this).hasClass('active')) return;

    $('.mui-top-tab').removeClass('active').attr('aria-selected', 'false');
    $(this).addClass('active').attr('aria-selected', 'true');

    const cfg = schoolPanelsConfig[tabKey];
    if (cfg) {
      const $content = $('.mui-feature-content');
      $content.css({ opacity: 0.5, transition: 'opacity 0.2s ease' });

      setTimeout(function () {
        $('#mui-dynamic-tag').text(cfg.tag);
        $('#mui-dynamic-heading').text(cfg.heading);
        $('#mui-dynamic-desc').text(cfg.desc);

        const itemsHtml = cfg.checklist.map(item => `
          <div class="mui-check-item">
            <svg class="mui-check-badge-icon" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#2563eb" stroke-width="1.8">
              <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76z"/>
              <path d="m9 12 2 2 4-4"/>
            </svg>
            <span>${item}</span>
          </div>
        `).join('');
        $('#mui-dynamic-checklist').html(itemsHtml);
        $content.css({ opacity: 1 });
      }, 150);

      // Trigger bottom-right sequential card entrance
      animateStackedCards(cfg);
    }
  });

});
