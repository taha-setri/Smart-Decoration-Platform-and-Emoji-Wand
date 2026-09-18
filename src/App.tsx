import React, { useState, useEffect, useCallback } from 'react';
import { NetworkBar } from './components/NetworkBar';
import { TextDecoratorSection } from './components/TextDecoratorSection';
import { EmojiBoardSection } from './components/EmojiBoardSection';
import { ReviewsSection } from './components/ReviewsSection';
import { Footer } from './components/Footer';
import { PrivacyPolicyModal } from './components/PrivacyPolicyModal';
import { PerformanceDashboardModal } from './components/PerformanceDashboardModal';
import { SupportModal } from './components/SupportModal';
import { SmartNotifications, NotificationItem } from './components/SmartNotifications';
import { INITIAL_REVIEWS } from './data/seedReviews';
import { UserReview } from './types';
import {
  Sparkles,
  Zap,
  ShieldCheck,
  Flame,
  Smartphone,
  Copy,
  WifiOff,
  Bookmark,
  ExternalLink,
  ChevronLeft,
} from 'lucide-react';

export default function App() {
  // Theme state
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('zakhrafa_dark_mode');
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Online status state
  const [isOnline, setIsOnline] = useState<boolean>(typeof navigator !== 'undefined' ? navigator.onLine : true);

  // App metrics & user data
  const [copyCount, setCopyCount] = useState<number>(() => {
    return parseInt(localStorage.getItem('zakhrafa_copy_count') || '142', 10);
  });

  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('zakhrafa_favorites');
      return saved ? JSON.parse(saved) : ['亗『الزخرفة الذكية』亗', '꧁ ༺نجم التألق༻ ꧂'];
    } catch {
      return [];
    }
  });

  const [recentCopies, setRecentCopies] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('zakhrafa_recents');
      return saved ? JSON.parse(saved) : ['✨', '🔥', '👑', '亗', '💖', 'ʕ•ᴥ•ʔ'];
    } catch {
      return ['✨', '🔥', '👑'];
    }
  });

  const [reviews, setReviews] = useState<UserReview[]>(() => {
    try {
      const saved = localStorage.getItem('zakhrafa_reviews');
      return saved ? JSON.parse(saved) : INITIAL_REVIEWS;
    } catch {
      return INITIAL_REVIEWS;
    }
  });

  // Notifications state
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Modals state
  const [isPrivacyOpen, setIsPrivacyOpen] = useState<boolean>(false);
  const [isPerformanceOpen, setIsPerformanceOpen] = useState<boolean>(false);
  const [isSupportOpen, setIsSupportOpen] = useState<boolean>(false);

  // Sync dark mode class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('zakhrafa_dark_mode', darkMode.toString());
  }, [darkMode]);

  // Online / Offline event listeners
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      pushNotification('تمت استعادة الاتصال بالإنترنت بنجاح 🌐', 'success');
    };
    const handleOffline = () => {
      setIsOnline(false);
      pushNotification('أنت الآن تعمل في وضع دون اتصال (Offline) بكفاءة تامة ⚡', 'info');
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Sync state to localStorage
  useEffect(() => {
    localStorage.setItem('zakhrafa_copy_count', copyCount.toString());
  }, [copyCount]);

  useEffect(() => {
    localStorage.setItem('zakhrafa_favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('zakhrafa_recents', JSON.stringify(recentCopies));
  }, [recentCopies]);

  useEffect(() => {
    localStorage.setItem('zakhrafa_reviews', JSON.stringify(reviews));
  }, [reviews]);

  // Notification dispatcher
  const pushNotification = useCallback((message: string, type: 'success' | 'info' = 'info') => {
    const id = Date.now().toString() + Math.random().toString().slice(2, 6);
    setNotifications((prev) => [...prev.slice(-3), { id, message, type, timestamp: Date.now() }]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 3800);
  }, []);

  const dismissNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const handleIncrementCopyCount = () => {
    setCopyCount((prev) => prev + 1);
  };

  const handleToggleFavorite = (item: string) => {
    if (favorites.includes(item)) {
      setFavorites((prev) => prev.filter((f) => f !== item));
      pushNotification('تمت إزالة العنصر من المفضلة', 'info');
    } else {
      setFavorites((prev) => [item, ...prev]);
      pushNotification('تمت إضافة العنصر إلى المفضلة ⭐', 'success');
    }
  };

  const handleAddRecentCopy = (item: string) => {
    setRecentCopies((prev) => {
      const filtered = prev.filter((i) => i !== item);
      return [item, ...filtered].slice(0, 20);
    });
  };

  const handleClearRecentCopies = () => {
    setRecentCopies([]);
    pushNotification('تم مسح سجل المنسوخ مؤخراً', 'info');
  };

  const handleAddReview = (newReview: Omit<UserReview, 'id' | 'date'>) => {
    const fullReview: UserReview = {
      ...newReview,
      id: 'rev-' + Date.now(),
      date: 'الآن',
    };
    setReviews((prev) => [fullReview, ...prev]);
  };

  const handleShareApp = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'منصة الزخرفة الذكية وعصا الرموز التعبيرية',
          text: 'أفضل أداة تفاعلية لزخرفة النصوص العربية والإنجليزية وتوليد الرموز التعبيرية للنسخ الفوري!',
          url: window.location.href,
        });
      } catch {
        // User cancelled share
      }
    } else {
      await navigator.clipboard.writeText(window.location.href);
      pushNotification('تم نسخ رابط المنصة للمشاركة مع أصدقائك! 🔗', 'success');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {/* 1. Sticky Network Bar with Welcome message and link to previous platform */}
      <NetworkBar
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode(!darkMode)}
        isOnline={isOnline}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
      />

      {/* Offline Alert Strip (Only visible if offline) */}
      {!isOnline && (
        <div
          id="offline-banner"
          className="bg-amber-600 text-white text-xs py-2 px-4 text-center font-bold flex items-center justify-center gap-2 shadow-xs"
        >
          <WifiOff className="w-4 h-4" />
          <span>أنت تتصفح حالياً دون اتصال بالإنترنت. كافة أدوات الزخرفة والنسخ تعمل محلياً بنسبة 100%!</span>
        </div>
      )}

      {/* Hero Welcome Banner with Quick Feature Badges */}
      <section className="bg-gradient-to-b from-indigo-50/70 via-white to-slate-50 dark:from-indigo-950/20 dark:via-slate-900 dark:to-slate-950 border-b border-slate-200 dark:border-slate-800/80 py-10 sm:py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            {/* Right side (Text & Callouts in RTL) */}
            <div className="max-w-2xl text-right">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300 text-xs font-bold mb-4 shadow-2xs">
                <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                <span>إصدار 2026 المتطور – زخرفة فورية وعصا الرموز التعبيرية</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 dark:text-white leading-[1.25] tracking-tight">
                منصة الزخرفة الذكية وعصا الرموز التعبيرية
              </h1>

              <p className="mt-4 text-base sm:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                أداة تفاعلية سريعة لزخرفة النصوص العربية والإنجليزية باحترافية، وتوفير لوحة رموز تعبيرية (Emojis)
                للنسخ الفوري واستخدامها في وسائل التواصل الاجتماعي، بايو إنستغرام، تيك توك، وأسماء ألعاب ببجي وفري فاير.
              </p>

              {/* Quick Feature Badges */}
              <div className="mt-6 flex flex-wrap items-center gap-3 text-xs font-bold text-slate-700 dark:text-slate-300">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
                  <Zap className="w-3.5 h-3.5 text-amber-500" />
                  <span>نسخ فوري بنقرة واحدة</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
                  <Smartphone className="w-3.5 h-3.5 text-indigo-500" />
                  <span>متوافق كلياً مع الهواتف الذكية</span>
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-2xs">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>خصوصية تامة بدون خوادم خارجية</span>
                </span>
              </div>
            </div>

            {/* Left side: Action Box linking to Previous Platform & App Stats */}
            <div className="w-full lg:w-80 shrink-0 bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-md">
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-100 dark:border-slate-700">
                <span className="text-xs font-bold text-slate-500 dark:text-slate-400">حالة المنصة المباشرة</span>
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  <span>نشط 24/7</span>
                </span>
              </div>

              <div className="py-4 space-y-3 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">إجمالي عمليات النسخ:</span>
                  <strong className="text-sm font-black text-indigo-600 dark:text-indigo-400">
                    {copyCount.toLocaleString()}
                  </strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">العناصر بالمفضلة:</span>
                  <strong className="text-sm font-black text-amber-600 dark:text-amber-400">
                    {favorites.length}
                  </strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-600 dark:text-slate-400">سرعة الاستجابة:</span>
                  <strong className="text-sm font-black text-emerald-600 dark:text-emerald-400">
                    لحظية (0.01s)
                  </strong>
                </div>
              </div>

              {/* Direct callout to Previous Platform */}
              <a
                id="hero-btn-previous-platform"
                href="https://smart-english-platform-the-private-orcin.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white text-xs font-bold shadow-xs transition-all"
              >
                <span>زيارة Smart English Platform</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Saved Favorites Quick Bar (if any) */}
      {favorites.length > 0 && (
        <section id="favorites-bar" className="bg-amber-50/60 dark:bg-amber-950/20 border-b border-amber-200/60 dark:border-amber-900/40 py-3">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-900 dark:text-amber-300">
              <Bookmark className="w-4 h-4 text-amber-500 fill-amber-400" />
              <span>نصوصك المفضلة المحفوظة ({favorites.length}):</span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1">
              {favorites.map((fav, fIdx) => (
                <button
                  key={fIdx}
                  id={`fav-pill-${fIdx}`}
                  onClick={async () => {
                    await navigator.clipboard.writeText(fav);
                    handleIncrementCopyCount();
                    handleAddRecentCopy(fav);
                    pushNotification('تم نسخ النص المفضل بنجاح! 🌟', 'success');
                  }}
                  className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white dark:bg-slate-800 text-xs font-medium text-slate-800 dark:text-slate-100 border border-amber-200 dark:border-amber-800 hover:border-amber-400 transition-colors shadow-2xs cursor-pointer whitespace-nowrap"
                  title="انقر لنسخ هذا النص المفضل"
                >
                  <Copy className="w-3 h-3 text-amber-500" />
                  <span>{fav}</span>
                </button>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Core Component 1: Text Decorator */}
        <TextDecoratorSection
          onNotify={pushNotification}
          onIncrementCopyCount={handleIncrementCopyCount}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />

        {/* Core Component 2: Emoji Board */}
        <EmojiBoardSection
          onNotify={pushNotification}
          onIncrementCopyCount={handleIncrementCopyCount}
          recentCopies={recentCopies}
          onAddRecentCopy={handleAddRecentCopy}
          onClearRecentCopies={handleClearRecentCopies}
        />

        {/* Core Component 3: Reviews & Ratings Section */}
        <ReviewsSection
          onNotify={pushNotification}
          reviews={reviews}
          onAddReview={handleAddReview}
        />
      </main>

      {/* Footer with mandatory copyright and policies */}
      <Footer
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        onOpenPerformance={() => setIsPerformanceOpen(true)}
        onOpenSupport={() => setIsSupportOpen(true)}
        onShareApp={handleShareApp}
      />

      {/* Smart Notifications Floating Toast */}
      <SmartNotifications
        notifications={notifications}
        onDismiss={dismissNotification}
      />

      {/* Modals */}
      <PrivacyPolicyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      <PerformanceDashboardModal
        isOpen={isPerformanceOpen}
        onClose={() => setIsPerformanceOpen(false)}
        copyCount={copyCount}
        favoritesCount={favorites.length}
        recentCount={recentCopies.length}
        isOnline={isOnline}
        onNotify={pushNotification}
      />

      <SupportModal
        isOpen={isSupportOpen}
        onClose={() => setIsSupportOpen(false)}
        onNotify={pushNotification}
      />
    </div>
  );
}
