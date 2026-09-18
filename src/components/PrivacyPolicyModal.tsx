import React from 'react';
import { X, ShieldCheck, Lock, Cookie, Eye, CheckCircle2 } from 'lucide-react';

interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      id="privacy-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="privacy-modal-content"
        className="relative w-full max-w-3xl max-h-[85vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl text-slate-800 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                سياسة الخصوصية وملفات تعريف الارتباط (Privacy & Cookies Policy)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                متوافقة تماماً مع معايير Google AdSense واللائحة العامة لحماية البيانات (GDPR)
              </p>
            </div>
          </div>

          <button
            id="btn-close-privacy"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            aria-label="إغلاق نافذة الخصوصية"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="py-6 space-y-6 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
          {/* Section 1 */}
          <section className="space-y-2">
            <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-indigo-500" />
              <span>1. التزامنا بحماية خصوصيتك</span>
            </h4>
            <p>
              تعتبر خصوصية زوار ومستخدمي &quot;منصة الزخرفة الذكية وعصا الرموز التعبيرية&quot; ذات أهمية بالغة بالنسبة لنا. نحن لا نطلب أي معلومات
              شخصية حساسة (مثل كلمات المرور، أرقام بطاقات الائتمان، أو أرقام الهواتف) لاستخدام الأدوات الأساسية من زخرفة النصوص أو نسخ الرموز التعبيرية.
              تتم معالجة كافة عمليات الزخرفة وتحويل النصوص محلياً داخل متصفح جهازك بسرعة فائقة دون إرسال نصوصك إلى خوادم خارجية.
            </p>
          </section>

          {/* Section 2: AdSense & Cookies */}
          <section className="space-y-2 bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
            <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Cookie className="w-4 h-4 text-amber-500" />
              <span>2. ملفات تعريف الارتباط وإعلانات Google AdSense</span>
            </h4>
            <p>
              قد تستعين منصتنا بشركات إعلانية من جهات خارجية (مثل Google وشركائها) لعرض الإعلانات عند زيارتك للموقع.
              تستخدم هذه الشركات ملفات تعريف الارتباط (Cookies) لخدمة الإعلانات استناداً إلى زياراتك السابقة لهذا الموقع أو لمواقع أخرى على الويب:
            </p>
            <ul className="list-disc list-inside space-y-1 pr-2 text-xs sm:text-sm">
              <li>
                <strong>ملف تعريف ارتباط DoubleClick DART:</strong> تستخدم Google ملف تعريف الارتباط DART لتمكينها وشركائها من عرض إعلانات مخصصة لك بناءً على سجل تصفحك.
              </li>
              <li>
                <strong>إلغاء الاشتراك:</strong> يمكنك إلغاء الاشتراك في استخدام ملف تعريف ارتباط DART للإعلانات المستندة إلى الاهتمامات عبر زيارة إعدادات إعلانات Google الرسمية على:
                <span className="text-indigo-600 dark:text-indigo-400 font-mono text-xs block mt-0.5">https://www.google.com/settings/ads</span>
              </li>
              <li>
                نحن نحترم إشارات عدم التتبع ونتيح لك التحكم الكامل في قبول أو رفض ملفات الارتباط عبر إعدادات متصفحك.
              </li>
            </ul>
          </section>

          {/* Section 3: LocalStorage & Offline Storage */}
          <section className="space-y-2">
            <h4 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Eye className="w-4 h-4 text-emerald-500" />
              <span>3. التخزين المحلي (LocalStorage) والعمل دون اتصال</span>
            </h4>
            <p>
              تستخدم المنصة تقنية التخزين المحلي (LocalStorage) الآمنة لتخزين تفضيلاتك الشخصية فقط، بما في ذلك:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>المظهر المفضل (الوضع الليلي أو النهاري)</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>سجل المنسوخ مؤخراً لسهولة إعادة الاستخدام</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>الزخارف المحفوظة في المفضلة الخاصة بك</span>
              </div>
              <div className="flex items-center gap-2 p-2 rounded-lg bg-slate-100 dark:bg-slate-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>تقييماتك وتعليقاتك الصادرة من جهازك</span>
              </div>
            </div>
            <p className="text-xs text-slate-500">
              يمكنك مسح هذه البيانات في أي وقت بمسح بيانات التصفح أو عبر زر مسح السجل داخل المنصة.
            </p>
          </section>

          {/* Section 4: Copyright and Founder */}
          <section className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <h4 className="text-base font-bold text-slate-900 dark:text-white">
              4. حقوق الملكية الفكرية والاتصال
            </h4>
            <p>
              كافة الحقوق والبرمجيات الخاصة بهذه المنصة محفوظة باسم المؤسس:
              <strong className="text-slate-900 dark:text-white font-bold mr-1">
                Taha Setri - © 2026 جميع الحقوق محفوظة.
              </strong>
            </p>
            <p className="text-xs text-slate-500">
              لأي استفسارات قانونية أو تقنية تتعلق بسياسة الخصوصية، يرجى التواصل معنا عبر نموذج الدعم التقني في المنصة.
            </p>
          </section>
        </div>

        {/* Footer Action */}
        <div className="flex items-center justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            id="btn-confirm-privacy"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xs transition-colors cursor-pointer"
          >
            فهمت وموافق على الشروط
          </button>
        </div>
      </div>
    </div>
  );
};
