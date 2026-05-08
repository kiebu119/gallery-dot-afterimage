/* ============================================
   GALLERY DOT — AFTER IMAGE
   script.js v2 — with animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== NAV SCROLL ===== */
  const nav = document.getElementById('nav');
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  });

  /* ===== MOBILE MENU ===== */
  const menuBtn = document.getElementById('menuBtn');
  const mobMenu = document.getElementById('mobMenu');
  const mobClose = document.getElementById('mobClose');

  if (menuBtn && mobMenu) {
    menuBtn.addEventListener('click', () => {
      mobMenu.classList.add('on');
      document.body.style.overflow = 'hidden';
    });
  }

  function closeMenu() {
    if (mobMenu) {
      mobMenu.classList.remove('on');
      document.body.style.overflow = '';
    }
  }

  if (mobClose) mobClose.addEventListener('click', closeMenu);
  document.querySelectorAll('.mob-menu a').forEach(a => {
    a.addEventListener('click', closeMenu);
  });

  /* ===== SCROLL ANIMATION SYSTEM ===== */
  const animSelectors = '.fi-anim, .fi-left, .fi-right, .fi-blur, .fi-scale, .fi-line, .fi-line-v, .img-reveal, .cq-line';
  const animEls = document.querySelectorAll(animSelectors);

  if (animEls.length) {
    const animObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.dataset.delay ? parseInt(el.dataset.delay) * 100 : 0;
          setTimeout(() => el.classList.add('v'), delay);
          animObs.unobserve(el);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });

    animEls.forEach(el => animObs.observe(el));
  }

  /* ===== CONCEPT QUOTE — line-by-line stagger ===== */
  const cqLines = document.querySelectorAll('.cq-line');
  if (cqLines.length) {
    const cqObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const parent = entry.target.closest('.cq');
          if (parent) {
            const lines = parent.querySelectorAll('.cq-line');
            lines.forEach((line, i) => {
              setTimeout(() => line.classList.add('v'), i * 200);
            });
          }
          cqObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    if (cqLines[0]) cqObs.observe(cqLines[0]);
  }

  /* ===== TIMELINE ANIMATION ===== */
  const timeline = document.querySelector('.tl');
  if (timeline) {
    const tlObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          timeline.classList.add('animated');
          const items = timeline.querySelectorAll('.tl-i');
          items.forEach((item, i) => {
            setTimeout(() => item.classList.add('v'), 300 + i * 150);
          });
          tlObs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    tlObs.observe(timeline);
  }

  /* ===== PARALLAX — Hero background ===== */
  const heroImg = document.querySelector('.hero-img');
  if (heroImg) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrolled = window.scrollY;
          const heroH = window.innerHeight;
          if (scrolled < heroH * 1.5) {
            heroImg.style.transform = `translateY(${scrolled * 0.3}px) scale(1.08)`;
          }
          ticking = false;
        });
        ticking = true;
      }
    });
  }

  /* ===== PARALLAX — Concept image ===== */
  const cImg = document.querySelector('.c-img img');
  if (cImg) {
    let cTicking = false;
    window.addEventListener('scroll', () => {
      if (!cTicking) {
        requestAnimationFrame(() => {
          const rect = cImg.getBoundingClientRect();
          const vh = window.innerHeight;
          if (rect.top < vh && rect.bottom > 0) {
            const progress = (vh - rect.top) / (vh + rect.height);
            cImg.style.transform = `translateY(${(progress - 0.5) * 30}px)`;
          }
          cTicking = false;
        });
        cTicking = true;
      }
    });
  }

  /* ===== DATE SELECT ===== */
  const dateSelect = document.getElementById('fDate');
  if (dateSelect) {
    const start = new Date(2026, 0, 10);
    const weekdays = ['日','月','火','水','木','金','土'];
    for (let i = 0; i <= 16; i++) {
      const d = new Date(start);
      d.setDate(start.getDate() + i);
      if (d.getDay() === 2) continue;
      const opt = document.createElement('option');
      opt.value = `2026-01-${String(d.getDate()).padStart(2,'0')}`;
      opt.textContent = `1月${d.getDate()}日（${weekdays[d.getDay()]}）`;
      dateSelect.appendChild(opt);
    }
  }

  /* ===== STOCK TABS ===== */
  const stkTabs = document.querySelectorAll('.stk-tab');
  const stkWeeks = document.querySelectorAll('.stk-week');
  stkTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      stkTabs.forEach(t => t.classList.remove('on'));
      stkWeeks.forEach(w => w.classList.remove('on'));
      tab.classList.add('on');
      if (stkWeeks[index]) stkWeeks[index].classList.add('on');
    });
  });

  /* ===== FAQ ACCORDION ===== */
  document.querySelectorAll('.fq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.fq-i');
      const wasOpen = item.classList.contains('on');
      document.querySelectorAll('.fq-i').forEach(i => i.classList.remove('on'));
      if (!wasOpen) item.classList.add('on');
    });
  });

  /* ===== PHONE AUTO-FORMAT (ハイフン自動挿入) ===== */
  const phoneInput = document.getElementById('fPhone');
  if (phoneInput) {
    phoneInput.addEventListener('input', (e) => {
      // エラークリア
      phoneInput.classList.remove('err');
      const fe = phoneInput.closest('.fg')?.querySelector('.fe');
      if (fe) fe.classList.remove('show');

      // 数字だけ取り出す
      let digits = phoneInput.value.replace(/\D/g, '');

      // 最大11桁に制限
      if (digits.length > 11) digits = digits.slice(0, 11);

      // ハイフン自動挿入
      let formatted = '';
      if (digits.length <= 3) {
        formatted = digits;
      } else if (digits.length <= 7) {
        formatted = digits.slice(0, 3) + '-' + digits.slice(3);
      } else {
        formatted = digits.slice(0, 3) + '-' + digits.slice(3, 7) + '-' + digits.slice(7);
      }

      phoneInput.value = formatted;
    });

    // inputType=tel でスマホに数字キーボードを出す（HTMLにも設定済み）
    phoneInput.setAttribute('inputmode', 'tel');
  }

  /* ===== FORM VALIDATION ===== */
  const form = document.getElementById('rForm');
  if (form) {
    form.querySelectorAll('.fi, .fs').forEach(el => {
      el.addEventListener('input', () => {
        el.classList.remove('err');
        const fe = el.closest('.fg')?.querySelector('.fe');
        if (fe) fe.classList.remove('show');
      });
      el.addEventListener('change', () => {
        el.classList.remove('err');
        const fe = el.closest('.fg')?.querySelector('.fe');
        if (fe) fe.classList.remove('show');
      });
    });

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      form.querySelectorAll('.fi, .fs').forEach(el => el.classList.remove('err'));
      form.querySelectorAll('.fe').forEach(el => el.classList.remove('show'));
      let valid = true;

      const name = document.getElementById('fName');
      if (!name.value.trim()) { name.classList.add('err'); document.getElementById('eName').classList.add('show'); valid = false; }

      const email = document.getElementById('fEmail');
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) { email.classList.add('err'); document.getElementById('eEmail').classList.add('show'); valid = false; }

      const phone = document.getElementById('fPhone');
      const phoneDigits = phone.value.replace(/\D/g, '');
      if (!phone.value.trim() || phoneDigits.length < 10 || phoneDigits.length > 11) { phone.classList.add('err'); document.getElementById('ePhone').classList.add('show'); valid = false; }

      const date = document.getElementById('fDate');
      if (!date.value) { date.classList.add('err'); document.getElementById('eDate').classList.add('show'); valid = false; }

      const time = document.getElementById('fTime');
      if (!time.value) { time.classList.add('err'); document.getElementById('eTime').classList.add('show'); valid = false; }

      const terms = document.getElementById('fTerms');
      if (!terms.checked) { document.getElementById('eTerms').classList.add('show'); valid = false; }

      if (valid) {
        // ======================================
        // TODO: 下記URLをGASデプロイURLに差し替え
        // ======================================
        const GAS_URL = 'https://script.google.com/macros/s/AKfycbydfyzN6vT2Tcxssiitel91atz9M7HKb747tFgb1s0RVBm7ec3hSWVqkii4kU-xI0ww6A/exec';
        const submitBtn = document.getElementById('subBtn');
        const originalText = submitBtn.textContent;

        // 送信中UI
        submitBtn.disabled = true;
        submitBtn.textContent = '送信中...';

        // 送信データ
        const formData = {
          name:      name.value.trim(),
          email:     email.value.trim(),
          phone:     phone.value.trim(),
          date:      date.value,
          time:      time.value,
          guests:    document.getElementById('fGuest').value,
          talkEvent: document.getElementById('fTalk').checked,
          lineConsent: document.getElementById('fLine').checked,
        };

        // GASに送信
        fetch(GAS_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        })
        .then(() => {
          // no-corsの場合レスポンスは読めないので、クライアント側で予約番号を生成
          const id = 'GD-2026-' + String(Math.floor(Math.random() * 9000) + 1000);
          document.getElementById('resId').textContent = id;
          document.getElementById('modal').classList.add('on');
          document.body.style.overflow = 'hidden';
          form.reset();
        })
        .catch((err) => {
          console.error('送信エラー:', err);
          alert('送信に失敗しました。もう一度お試しください。');
        })
        .finally(() => {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        });
      }
    });
  }

  /* ===== MODAL CLOSE ===== */
  const modalClose = document.getElementById('modalClose');
  if (modalClose) {
    modalClose.addEventListener('click', () => {
      document.getElementById('modal').classList.remove('on');
      document.body.style.overflow = '';
    });
  }

  /* ===== SMOOTH SCROLL ===== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior:'smooth', block:'start' });
      }
    });
  });

});