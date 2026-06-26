/* ============================================
   Coachin Landing Page — Script
   Trilingual i18n, Carousel, Scroll Animations
   ============================================ */

// ── Translations ──
const translations = {
  en: {
    heroTitle: 'Your Gym. <span class="highlight">Fully Managed.</span> One Tap Away.',
    heroSubtitle: 'Coachin helps gym coaches manage subscribers, track attendance via NFC cards, handle payments, and monitor cardio performance — all from one sleek app.',
    featuresBadge: 'FEATURES',
    featuresTitle: 'Everything You Need to <span class="highlight">Run Your Gym</span>',
    feature1Title: 'NFC Check-ins',
    feature1Desc: 'Tap NFC cards or scan QR passes for instant athlete check-ins at the door.',
    feature2Title: 'Subscriber Management',
    feature2Desc: 'Track members, manage payments, session packs, and subscription renewals.',
    feature3Title: 'Cardio Tracking',
    feature3Desc: 'Heart rate zones, VO2 max estimation, Cooper test, and HIIT interval timer.',
    feature4Title: 'Premium Analytics',
    feature4Desc: 'Dashboard metrics, attendance heatmaps, earnings overview, and more.',
    screenshotsBadge: 'PREVIEW',
    screenshotsTitle: 'See <span class="highlight">Coachin</span> in Action',
    screenshotLabel: 'Screenshot',
    ctaTitle: 'Ready to <span class="highlight">Transform</span> Your Gym?',
    ctaSubtitle: 'Download Coachin now and start managing your gym like a pro.',
    footerCopy: '© 2026 Coachin by <a href="https://raystate.com" target="_blank">Raystate</a>. All rights reserved.',
  },
  fr: {
    heroTitle: 'Votre Salle. <span class="highlight">Entièrement Gérée.</span> En un Seul Geste.',
    heroSubtitle: 'Coachin aide les coachs de gym à gérer les abonnés, suivre la présence par carte NFC, gérer les paiements et surveiller les performances cardio — le tout depuis une seule application.',
    featuresBadge: 'FONCTIONNALITÉS',
    featuresTitle: 'Tout Ce Dont Vous Avez Besoin pour <span class="highlight">Gérer Votre Salle</span>',
    feature1Title: 'Check-in NFC',
    feature1Desc: 'Scannez les cartes NFC ou les passes QR pour un check-in instantané.',
    feature2Title: 'Gestion des Abonnés',
    feature2Desc: 'Suivez les membres, gérez les paiements, les forfaits et les renouvellements.',
    feature3Title: 'Suivi Cardio',
    feature3Desc: 'Zones de fréquence cardiaque, estimation VO2 max, test de Cooper et minuteur HIIT.',
    feature4Title: 'Analytique Premium',
    feature4Desc: 'Tableau de bord, carte thermique de présence, aperçu des revenus et plus.',
    screenshotsBadge: 'APERÇU',
    screenshotsTitle: 'Découvrez <span class="highlight">Coachin</span> en Action',
    screenshotLabel: 'Capture d\'écran',
    ctaTitle: 'Prêt à <span class="highlight">Transformer</span> Votre Salle ?',
    ctaSubtitle: 'Téléchargez Coachin maintenant et gérez votre salle comme un pro.',
    footerCopy: '© 2026 Coachin par <a href="https://raystate.com" target="_blank">Raystate</a>. Tous droits réservés.',
  },
  ar: {
    heroTitle: 'قاعتك الرياضية. <span class="highlight">مُدارة بالكامل.</span> بلمسة واحدة.',
    heroSubtitle: 'كوتشين يساعد مدربي الصالات الرياضية في إدارة المشتركين، تتبع الحضور عبر بطاقات NFC، التعامل مع المدفوعات ومراقبة أداء القلب — كل ذلك من تطبيق واحد أنيق.',
    featuresBadge: 'المميزات',
    featuresTitle: 'كل ما تحتاجه <span class="highlight">لإدارة قاعتك</span>',
    feature1Title: 'تسجيل حضور NFC',
    feature1Desc: 'امسح بطاقات NFC أو بطاقات QR لتسجيل حضور فوري للرياضيين.',
    feature2Title: 'إدارة المشتركين',
    feature2Desc: 'تتبع الأعضاء، إدارة المدفوعات، الحزم والاشتراكات.',
    feature3Title: 'تتبع القلب',
    feature3Desc: 'مناطق معدل ضربات القلب، تقدير VO2 max، اختبار كوبر ومؤقت HIIT.',
    feature4Title: 'تحليلات متقدمة',
    feature4Desc: 'لوحة التحكم، خريطة الحضور الحرارية، نظرة عامة على الإيرادات والمزيد.',
    screenshotsBadge: 'معاينة',
    screenshotsTitle: 'شاهد <span class="highlight">كوتشين</span> أثناء العمل',
    screenshotLabel: 'لقطة شاشة',
    ctaTitle: 'مستعد <span class="highlight">لتحويل</span> قاعتك الرياضية؟',
    ctaSubtitle: 'حمّل كوتشين الآن وابدأ بإدارة قاعتك كالمحترفين.',
    footerCopy: '© 2026 كوتشين من <a href="https://raystate.com" target="_blank">رايستيت</a>. جميع الحقوق محفوظة.',
  },
};

// ── Language Switching ──
let currentLang = localStorage.getItem('coachin-lang') || detectBrowserLang();

function detectBrowserLang() {
  const nav = navigator.language || navigator.userLanguage || 'en';
  if (nav.startsWith('ar')) return 'ar';
  if (nav.startsWith('fr')) return 'fr';
  return 'en';
}

function setLang(lang) {
  currentLang = lang;
  localStorage.setItem('coachin-lang', lang);

  // Update dir for RTL
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.lang = lang;

  // Update active button
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  // Apply translations
  const t = translations[lang];
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    if (t[key]) el.innerHTML = t[key];
  });
}

// ── Scroll Header Effect ──
function initHeaderScroll() {
  const header = document.querySelector('.header');
  if (!header) return;
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

// ── Scroll Animations (Intersection Observer) ──
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

// ── Screenshots Carousel ──
function initCarousel() {
  const track = document.querySelector('.screenshots-track');
  const dots = document.querySelectorAll('.dot');
  if (!track || dots.length === 0) return;

  const items = track.querySelectorAll('.screenshot-item');

  function updateDots() {
    const scrollLeft = track.scrollLeft;
    const itemWidth = items[0]?.offsetWidth + 24 || 284;
    const activeIndex = Math.round(scrollLeft / itemWidth);

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === activeIndex);
    });
  }

  track.addEventListener('scroll', updateDots, { passive: true });

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      const itemWidth = items[0]?.offsetWidth + 24 || 284;
      track.scrollTo({ left: i * itemWidth, behavior: 'smooth' });
    });
  });

  updateDots();
}

// ── Init ──
document.addEventListener('DOMContentLoaded', () => {
  // Language buttons
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });

  // Set initial language
  setLang(currentLang);

  // Init modules
  initHeaderScroll();
  initScrollAnimations();
  initCarousel();
});
