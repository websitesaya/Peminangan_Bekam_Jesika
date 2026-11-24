/* ================= NAMA TAMU DARI URL ================= */
(function setGuestName(){
  const params = new URLSearchParams(window.location.search);
  const to = params.get('to');
  if(to){
    document.getElementById('guest-name').textContent = to.replace(/\+/g,' ');
  }
})();

/* ================= EFEK KUPU-KUPU TERBANG ================= */
(function initButterflies(){
  const container = document.getElementById('butterfly-container');
  if(!container) return;

  const palettes = [
    { a:'#fbd3d3', b:'#e8a0a8', c:'#c27d86', d:'#fff0ee' },
    { a:'#f6c1b8', b:'#d98e98', c:'#b76e79', d:'#ffe6e0' },
    { a:'#ffd9df', b:'#ef9fb5', c:'#c9808f', d:'#fff5f3' }
  ];

  function buildSVG(id, p){
    return `
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="grad-${id}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${p.a}"/>
            <stop offset="45%" stop-color="${p.b}"/>
            <stop offset="100%" stop-color="${p.c}"/>
          </linearGradient>
        </defs>
        <g class="wing-l">
          <path d="M50 46 C34 18 8 14 4 30 C1 44 18 54 50 52 Z" fill="url(#grad-${id})"/>
          <path d="M50 54 C36 66 16 74 10 64 C6 56 20 50 50 50 Z" fill="${p.d}" opacity=".9"/>
          <circle cx="16" cy="30" r="2.6" fill="#fff" opacity=".55"/>
          <circle cx="20" cy="58" r="2" fill="#fff" opacity=".45"/>
        </g>
        <g class="wing-r">
          <path d="M50 46 C66 18 92 14 96 30 C99 44 82 54 50 52 Z" fill="url(#grad-${id})"/>
          <path d="M50 54 C64 66 84 74 90 64 C94 56 80 50 50 50 Z" fill="${p.d}" opacity=".9"/>
          <circle cx="84" cy="30" r="2.6" fill="#fff" opacity=".55"/>
          <circle cx="80" cy="58" r="2" fill="#fff" opacity=".45"/>
        </g>
        <ellipse cx="50" cy="50" rx="2.6" ry="16" fill="#3a2418"/>
        <path d="M50 38 C47 32 43 28 39 26 M50 38 C53 32 57 28 61 26" stroke="#3a2418" stroke-width="1.4" fill="none" stroke-linecap="round"/>
      </svg>`;
  }

  const jumlah = window.innerWidth < 500 ? 6 : 10;
  for(let i = 0; i < jumlah; i++){
    const wrap = document.createElement('div');
    wrap.className = 'butterfly';

    const size = (Math.random() * 26 + 30).toFixed(0);
    const left = (Math.random() * 92 + 2).toFixed(1);
    const riseDuration = (Math.random() * 10 + 14).toFixed(1);
    const riseDelay = (Math.random() * riseDuration).toFixed(1);
    const swayDuration = (Math.random() * 2 + 2.2).toFixed(2);
    const swayAmount = (Math.random() * 26 + 18).toFixed(0);
    const flapDuration = (Math.random() * .18 + .18).toFixed(2);
    const opacity = (Math.random() * 0.35 + 0.65).toFixed(2);

    wrap.style.setProperty('--bsize', size + 'px');
    wrap.style.setProperty('--bleft', left + '%');
    wrap.style.setProperty('--sway', swayAmount + 'px');
    wrap.style.opacity = opacity;
    wrap.style.animationDuration = riseDuration + 's';
    wrap.style.animationDelay = '-' + riseDelay + 's';

    const sway = document.createElement('div');
    sway.className = 'bf-sway';
    sway.style.animationDuration = swayDuration + 's';
    sway.style.animationDelay = '-' + (Math.random() * swayDuration).toFixed(2) + 's';
    sway.innerHTML = buildSVG(i, palettes[i % palettes.length]);

    wrap.appendChild(sway);
    container.appendChild(wrap);

    const wingL = sway.querySelector('.wing-l');
    const wingR = sway.querySelector('.wing-r');
    if(wingL) wingL.style.animationDuration = flapDuration + 's';
    if(wingR) wingR.style.animationDuration = flapDuration + 's';
  }
})();

/* ================= KELOPAK & BUNGA JATUH ================= */
(function initPetals(){
  const container = document.getElementById('petal-container');
  if(!container) return;
  const items = ['✿', '❀', '❁', '♡'];
  const jumlah = window.innerWidth < 500 ? 26 : 48;
  for(let i = 0; i < jumlah; i++){
    const el = document.createElement('div');
    el.className = 'petal';
    el.textContent = items[Math.floor(Math.random() * items.length)];
    const duration = (Math.random() * 10 + 9).toFixed(1);
    el.style.left = (Math.random() * 100) + '%';
    el.style.fontSize = (Math.random() * 12 + 8).toFixed(1) + 'px';
    el.style.opacity = (Math.random() * 0.5 + 0.4).toFixed(2);
    el.style.animationDuration = duration + 's';
    el.style.animationDelay = '-' + (Math.random() * duration).toFixed(1) + 's';
    el.style.setProperty('--drift', (Math.random() * 90 - 45).toFixed(0) + 'px');
    container.appendChild(el);
  }
})();

/* ================= TIRAI / OPENING ================= */
const openingScreen = document.getElementById('opening-screen');
const btnOpen = document.getElementById('btn-open');
const invitation = document.getElementById('invitation');
const music = document.getElementById('bg-music');
const musicToggle = document.getElementById('music-toggle');

btnOpen.addEventListener('click', () => {
  openingScreen.classList.add('curtain-active');
  void openingScreen.offsetWidth;
  requestAnimationFrame(() => {
    requestAnimationFrame(() => openingScreen.classList.add('open'));
  });

  music.play().catch(()=>{});
  musicToggle.classList.add('spin');

  setTimeout(() => {
    openingScreen.classList.add('hidden');
    document.body.classList.remove('lock');
    invitation.classList.add('show');
    window.scrollTo(0, 0);
    startCountdown();
  }, 1500);
});

musicToggle.addEventListener('click', () => {
  if(music.paused){
    music.play().catch(()=>{});
    musicToggle.classList.add('spin');
  }else{
    music.pause();
    musicToggle.classList.remove('spin');
  }
});

/* ================= COUNTDOWN ================= */
// Sabtu, 28 November 2026 pukul 17.00 (lokasi Kupang, NTT = WITA / UTC+8)
const ACARA_DATE = new Date("2026-11-28T17:00:00+08:00").getTime();
let cdTimer = null;

function startCountdown(){
  updateCountdown();
  if(!cdTimer) cdTimer = setInterval(updateCountdown, 1000);
}
function updateCountdown(){
  const diff = ACARA_DATE - Date.now();
  const box = document.getElementById('countdown');
  if(diff <= 0){
    box.innerHTML = '<div style="min-width:auto;padding:12px 22px"><span style="font-size:20px">Acara sedang / telah berlangsung 💞</span></div>';
    clearInterval(cdTimer);
    return;
  }
  const hari  = Math.floor(diff / 86400000);
  const jam   = Math.floor((diff / 3600000) % 24);
  const menit = Math.floor((diff / 60000) % 60);
  const detik = Math.floor((diff / 1000) % 60);
  document.getElementById('cd-hari').textContent  = String(hari).padStart(2,'0');
  document.getElementById('cd-jam').textContent   = String(jam).padStart(2,'0');
  document.getElementById('cd-menit').textContent = String(menit).padStart(2,'0');
  document.getElementById('cd-detik').textContent = String(detik).padStart(2,'0');
}

/* ================= TAMBAH KE KALENDER (.ics) ================= */
document.getElementById('btn-cal').addEventListener('click', () => {
  const ics = [
    'BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Undangan Peminangan//ID','BEGIN:VEVENT',
    'UID:peminangan-bekam-jesika-20261128@undangan',
    'DTSTAMP:20261101T000000Z',
    'DTSTART:20261128T090000Z',   // 17.00 WITA = 09.00 UTC
    'DTEND:20261128T130000Z',
    'SUMMARY:Peminangan Bekam Poko & Jesika Tongge',
    'LOCATION:Kediaman Bpk. Nikodemus Sau Samping\\, DIT POLAIR Bolok',
    'DESCRIPTION:Undangan acara peminangan Bekam Poko & Jesika Tongge.',
    'END:VEVENT','END:VCALENDAR'
  ].join('\r\n');
  const blob = new Blob([ics], {type:'text/calendar;charset=utf-8'});
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = 'Peminangan-Bekam-Jesika.ics';
  document.body.appendChild(a); a.click(); a.remove();
});

/* ================= ANIMASI MUNCUL SAAT SCROLL ================= */
(function initScrollReveal(){
  if(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  if(!('IntersectionObserver' in window)) return;

  // [selector, jenis animasi, jeda antar elemen, jeda awal]
  const rules = [
    ['#hero .rings','zoom',0],
    ['#hero .hero-eyebrow','up',0,0.1],
    ['#hero .hero-names > span','up',0.2,0.2],
    ['#hero .chibi-stage','zoom',0,0.5],
    ['#hero .countdown > div','zoom',0.1,0.8],
    ['#hero .scroll-hint','fade',0,1.4],
    ['.section-title','up',0],
    ['.section-heading','up',0.1],
    ['.divider','zoom',0.2],
    ['.lead','up',0.2],
    ['.couple-card','alt',0],
    ['.couple-amp','zoom',0],
    ['.date-card','flip',0],
    ['.event-card','up',0.2],
    ['.map-frame','zoom',0.1],
    ['.btn-map','up',0.2],
    ['.fam','alt',0.12],
    ['footer .script','zoom',0],
    ['footer .ornament-line','fade',0.1],
    ['footer small','up',0.15],
    ['.footer-logo','zoom',0.1],
    ['.credit','up',0.1]
  ];

  const io = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if(!en.isIntersecting) return;
      const el = en.target;
      io.unobserve(el);
      el.classList.add('in');
      const total = (parseFloat(el.style.getPropertyValue('--d')) || 0) * 1000 + 1100;
      setTimeout(() => el.classList.remove('reveal','in','r-up','r-left','r-right','r-zoom','r-flip','r-fade'), total);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  rules.forEach(([sel, type, step, base]) => {
    document.querySelectorAll(sel).forEach((el, i) => {
      const t = (type === 'alt') ? (i % 2 === 0 ? 'left' : 'right') : type;
      el.classList.add('reveal', 'r-' + t);
      const delay = (base || 0) + (step || 0) * (type === 'alt' && sel === '.fam' ? 0 : i);
      el.style.setProperty('--d', delay.toFixed(2) + 's');
      io.observe(el);
    });
  });
})();
