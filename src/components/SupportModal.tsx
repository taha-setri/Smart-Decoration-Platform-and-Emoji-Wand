import React, { useState } from 'react';
import { X, Headphones, Send, CheckCircle, HelpCircle, Mail, Clock } from 'lucide-react';

interface SupportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNotify: (message: string, type?: 'success' | 'info') => void;
}

export const SupportModal: React.FC<SupportModalProps> = ({ isOpen, onClose, onNotify }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim()) {
      onNotify('يرجى ملء الاسم والرسالة للتواصل مع الدعم الفني', 'info');
      return;
    }

    setSubmitted(true);
    onNotify('تم استلام تذكرتك بنجاح! سيتم الرد عليك في أقرب وقت.', 'success');
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
      onClose();
    }, 2000);
  };

  const FAQS = [
    {
      q: 'هل تظهر الزخارف والرموز التعبيرية لدى جميع الأصدقاء في واتساب وإنستغرام؟',
      a: 'نعم تماماً، جميع الأنماط والرموز المستخدمة هي محارف يونيكود (Unicode) رسمية ومعتمدة عالمياً، وتظهر بوضوح على أنظمة أندرويد، iOS (آيفون)، وويندوز.',
    },
    {
      q: 'هل يمكن استخدام هذه الأسماء المزخرفة في ألعاب مثل ببجي وفري فاير؟',
      a: 'نعم، قسم "ألعاب وبايو" مجهز خصيصاً بمحارف وأقواس مقبولة في أسماء اللاعبين والكلانات في ألعاب PUBG Mobile و Free Fire دون مشاكل.',
    },
    {
      q: 'هل المنصة تحفظ نصوصي الخاصة في خوادمها؟',
      a: 'كلا، تلتزم منصتنا بأعلى معايير الخصوصية، حيث تتم كافة العمليات داخل متصفحك محلياً 100% دون تخزين نصوصك أو إرسالها لخوادم خارجية.',
    },
  ];

  return (
    <div
      id="support-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in"
      onClick={onClose}
    >
      <div
        id="support-modal-content"
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-2xl text-slate-800 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Headphones className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                الدعم الفني والتقني المستمر
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                فريقنا التقني متاح لمساعدتك وضمان أفضل تجربة استخدام مستمرة
              </p>
            </div>
          </div>

          <button
            id="btn-close-support"
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="py-6 space-y-6">
          {/* FAQ Section */}
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-indigo-500" />
              <span>الأسئلة الشائعة (FAQ)</span>
            </h4>
            <div className="space-y-2">
              {FAQS.map((faq, idx) => (
                <details
                  key={idx}
                  className="group rounded-xl bg-slate-50 dark:bg-slate-800/60 p-3 text-xs border border-slate-200/80 dark:border-slate-700/80"
                >
                  <summary className="font-bold text-slate-800 dark:text-slate-200 cursor-pointer list-none flex items-center justify-between">
                    <span>{faq.q}</span>
                    <span className="text-indigo-600 dark:text-indigo-400 text-sm group-open:rotate-180 transition-transform">
                      ↓
                    </span>
                  </summary>
                  <p className="mt-2 text-slate-600 dark:text-slate-300 leading-relaxed pt-2 border-t border-slate-200/50 dark:border-slate-700/50">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>

          {/* Support Ticket Form */}
          <div>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white mb-3 flex items-center gap-2">
              <Mail className="w-4 h-4 text-indigo-500" />
              <span>إرسال استفسار أو طلب إضافة زخارف جديدة</span>
            </h4>

            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-center space-y-2">
                <CheckCircle className="w-10 h-10 text-emerald-600 mx-auto" />
                <h5 className="font-bold text-emerald-900 dark:text-emerald-200">
                  تم إرسال رسالتك بنجاح!
                </h5>
                <p className="text-xs text-emerald-700 dark:text-emerald-300">
                  شكراً لتواصلك. يقوم مهندسو المنصة بمراجعة رسائل الدعم الفني بشكل مستمر.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      الاسم:
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="اسمك الكريم"
                      className="w-full text-xs py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                      البريد الإلكتروني (اختياري):
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full text-xs py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                    تفاصيل الاستفسار أو المشكلة:
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                    placeholder="اكتب هنا أي استفسار، مشكلة تواجهها في النسخ، أو اقتراح أشكال جديدة..."
                    className="w-full text-xs py-2 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-100"
                  />
                </div>

                <div className="flex items-center justify-between gap-3 pt-2">
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>متوسط زمن الرد التقني: أقل من ساعتين</span>
                  </div>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>إرسال للدعم الفني</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end pt-4 border-t border-slate-200 dark:border-slate-800">
          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 cursor-pointer"
          >
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
};
