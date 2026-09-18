import React from 'react';
import {
  ShieldCheck,
  Headphones,
  Gauge,
  Heart,
  Globe,
  Share2,
  ExternalLink,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';

interface FooterProps {
  onOpenPrivacy: () => void;
  onOpenPerformance: () => void;
  onOpenSupport: () => void;
  onShareApp: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenPrivacy,
  onOpenPerformance,
  onOpenSupport,
  onShareApp,
}) => {
  return (
    <footer
      id="main-app-footer"
      className="bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-300 pt-12 pb-8 transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1: Brand & Founder */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white text-lg">
                ✨
              </div>
              <span className="font-extrabold text-base text-slate-900 dark:text-white">
                منصة الزخرفة الذكية
              </span>
            </div>
            <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
              أداة تفاعلية سريعة لزخرفة النصوص العربية والإنجليزية باحترافية، وتوفير لوحة رموز تعبيرية (Emojis) للنسخ الفوري
              واستخدامها في وسائل التواصل الاجتماعي والألعاب.
            </p>

            <div className="pt-2 text-xs">
              <span className="text-slate-400 block mb-1">المؤسس والمطور:</span>
              <strong className="text-slate-800 dark:text-slate-200 text-sm font-black">
                Taha Setri
              </strong>
            </div>
          </div>

          {/* Column 2: Quick Links & Tools */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              أقسام المنصة الأساسية
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a
                  href="#section-decorator"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors inline-block"
                >
                  محرك زخرفة النصوص والأسماء
                </a>
              </li>
              <li>
                <a
                  href="#section-emojis"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors inline-block"
                >
                  لوحة الرموز التعبيرية (Emojis)
                </a>
              </li>
              <li>
                <a
                  href="#section-combos"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors inline-block"
                >
                  توليفات بايو إنستغرام وتيك توك
                </a>
              </li>
              <li>
                <a
                  href="#section-reviews"
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors inline-block"
                >
                  نظام التقييمات والتعليقات
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Privacy, Performance & Support */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              السياسات والدعم التقني
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  id="footer-btn-privacy"
                  onClick={onOpenPrivacy}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5 cursor-pointer text-right"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                  <span>سياسة الخصوصية وملفات الكوكيز (AdSense & GDPR)</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-btn-performance"
                  onClick={onOpenPerformance}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5 cursor-pointer text-right"
                >
                  <Gauge className="w-3.5 h-3.5 text-purple-500" />
                  <span>لوحة تحكم الأداء والتقارير الدورية</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-btn-support"
                  onClick={onOpenSupport}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5 cursor-pointer text-right"
                >
                  <Headphones className="w-3.5 h-3.5 text-emerald-500" />
                  <span>الدعم الفني والتقني المستمر</span>
                </button>
              </li>
              <li>
                <button
                  id="footer-btn-share"
                  onClick={onShareApp}
                  className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors flex items-center gap-1.5 cursor-pointer text-right"
                >
                  <Share2 className="w-3.5 h-3.5 text-amber-500" />
                  <span>مشاركة المنصة مع الأصدقاء</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Network Link to Previous Platform */}
          <div className="space-y-3">
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">
              شبكة المنصات الشقيقة
            </h4>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-[11px] text-slate-500 dark:text-slate-400 block">
                تصفح منصتنا السابقة لتعلم اللغة الإنجليزية الذكية:
              </span>

              <a
                id="footer-link-previous-platform"
                href="https://smart-english-platform-the-private-orcin.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 transition-colors"
              >
                <span>Smart English Platform</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <div className="flex items-center gap-1 text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold pt-1">
                <CheckCircle2 className="w-3 h-3" />
                <span>منصة معتمدة ونشطة</span>
              </div>
            </div>
          </div>
        </div>

        {/* Explicit Mandatory Copyright Line */}
        <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <div id="footer-copyright-statement" className="font-bold text-slate-800 dark:text-slate-200 text-sm">
            Taha Setri - © 2026 جميع الحقوق محفوظة.
          </div>

          <div className="flex items-center gap-3 text-[11px]">
            <span>تصميم خفيف وفائق السرعة (SPA)</span>
            <span>•</span>
            <span>معتمد لمتطلبات Google AdSense</span>
            <span>•</span>
            <span>يعمل دون اتصال بالإنترنت</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
