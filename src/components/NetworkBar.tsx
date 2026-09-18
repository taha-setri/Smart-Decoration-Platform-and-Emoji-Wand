import React from 'react';
import { ExternalLink, Sparkles, Moon, Sun, Wifi, WifiOff, Globe } from 'lucide-react';

interface NetworkBarProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  isOnline: boolean;
  onOpenPrivacy: () => void;
}

export const NetworkBar: React.FC<NetworkBarProps> = ({
  darkMode,
  onToggleDarkMode,
  isOnline,
  onOpenPrivacy,
}) => {
  return (
    <header
      id="main-network-bar"
      className="sticky top-0 z-50 w-full border-b backdrop-blur-md transition-colors duration-200 bg-white/95 border-slate-200 text-slate-900 dark:bg-slate-900/95 dark:border-slate-800 dark:text-slate-100 shadow-xs"
    >
      {/* Top micro announcement strip */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white text-xs py-1.5 px-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2 font-medium">
            <span className="inline-flex items-center justify-center p-0.5 bg-white/20 rounded-full">
              <Sparkles className="w-3 h-3 text-amber-200 animate-pulse" />
            </span>
            <span>مرحباً بكم في شبكة المنصات الذكية 2026 – زخرفة فورية مجانية وتوليد رموز بدقة عالية</span>
          </div>

          {/* External Platform Direct Link Required by prompt */}
          <a
            id="link-previous-platform"
            href="https://smart-english-platform-the-private-orcin.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-white text-indigo-700 hover:bg-amber-50 hover:text-indigo-900 text-xs font-bold py-1 px-3 rounded-full transition-all duration-150 shadow-xs hover:shadow-sm"
          >
            <span>المنصة السابقة: Smart English Platform</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Main navigation toolbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Logo & Title */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 to-purple-600 flex items-center justify-center text-white text-xl shadow-md shadow-indigo-500/20">
            ✨
          </div>
          <div>
            <h1 className="font-extrabold text-base sm:text-lg leading-tight tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
              <span>منصة الزخرفة الذكية</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                v2.6
              </span>
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block">
              عصا الرموز التعبيرية والزخرفة الفورية للنصوص العربية والإنجليزية
            </p>
          </div>
        </div>

        {/* Quick Anchor Links */}
        <nav className="hidden md:flex items-center gap-1 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <a
            id="nav-link-decorator"
            href="#section-decorator"
            className="px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            زخرفة النصوص
          </a>
          <a
            id="nav-link-emojis"
            href="#section-emojis"
            className="px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            لوحة الرموز (Emojis)
          </a>
          <a
            id="nav-link-combos"
            href="#section-combos"
            className="px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            توليفات البايو
          </a>
          <a
            id="nav-link-reviews"
            href="#section-reviews"
            className="px-3 py-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            التقييمات
          </a>
        </nav>

        {/* Utility Controls (Online Status, Dark Mode, Privacy) */}
        <div className="flex items-center gap-2">
          {/* Online/Offline status */}
          <div
            id="status-indicator-badge"
            title={isOnline ? 'المنصة متصلة بالإنترنت وجاهزة' : 'تعمل المنصة في وضع عدم الاتصال (Offline) بنجاح'}
            className={`hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border ${
              isOnline
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/40 dark:text-emerald-300 dark:border-emerald-800'
                : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800'
            }`}
          >
            {isOnline ? (
              <>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>متصل</span>
              </>
            ) : (
              <>
                <WifiOff className="w-3 h-3 text-amber-500" />
                <span>أوفلاين</span>
              </>
            )}
          </div>

          {/* Direct link button to the previous platform */}
          <a
            id="btn-goto-previous-platform"
            href="https://smart-english-platform-the-private-orcin.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            title="الانتقال إلى منصة Smart English Platform"
            className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
          >
            <Globe className="w-3.5 h-3.5 text-indigo-500" />
            <span className="hidden lg:inline">المنصة السابقة</span>
          </a>

          {/* Dark / Light Toggle */}
          <button
            id="btn-toggle-theme"
            onClick={onToggleDarkMode}
            aria-label="تبديل المظهر النهاري والليلي"
            className="p-2 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};
