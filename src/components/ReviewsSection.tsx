import React, { useState } from 'react';
import { Star, MessageSquare, CheckCircle, Send, User } from 'lucide-react';
import { UserReview } from '../types';

interface ReviewsSectionProps {
  onNotify: (message: string, type?: 'success' | 'info') => void;
  reviews: UserReview[];
  onAddReview: (newReview: Omit<UserReview, 'id' | 'date'>) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  onNotify,
  reviews,
  onAddReview,
}) => {
  const [name, setName] = useState('');
  const [rating, setRating] = useState<number>(5);
  const [comment, setComment] = useState('');
  const [hoverRating, setHoverRating] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      onNotify('يرجى كتابة الاسم والتعليق قبل الإرسال', 'info');
      return;
    }

    onAddReview({
      author: name.trim(),
      rating,
      comment: comment.trim(),
      badge: 'زائر موثوق',
    });

    setName('');
    setComment('');
    setRating(5);
    onNotify('شكراً لتقييمك! تم نشر رأيك بنجاح 🌟', 'success');
  };

  const averageRating = reviews.length
    ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
    : '5.0';

  return (
    <section id="section-reviews" className="py-8 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-700 dark:bg-amber-950/60 dark:border-amber-800 dark:text-amber-300 text-xs font-bold mb-3">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            <span>نظام تقييمات الزوار والمشتركين</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            آراء المستخدمين وتقييمات المجتمع
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            شاركنا تجربتك في زخرفة الأسماء واقتناء الرموز التعبيرية لمساعدتنا على مواصلة التحديثات الدورية.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column: Stats & Add Review Form */}
          <div className="space-y-6">
            {/* Rating Summary Card */}
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 text-center shadow-xs">
              <div className="text-5xl font-black text-slate-900 dark:text-white mb-2">
                {averageRating}
              </div>
              <div className="flex items-center justify-center gap-1 mb-2 text-amber-400">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="w-5 h-5 fill-amber-400" />
                ))}
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                متوسط التقييم بناءً على {reviews.length + 1240} تقييم نشط
              </p>
              <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-700 flex items-center justify-around text-xs text-slate-600 dark:text-slate-300">
                <div>
                  <span className="block font-bold text-slate-900 dark:text-white text-sm">99.4%</span>
                  <span>نسبة الرضا</span>
                </div>
                <div className="h-6 w-px bg-slate-200 dark:bg-slate-700"></div>
                <div>
                  <span className="block font-bold text-slate-900 dark:text-white text-sm">لحظي</span>
                  <span>سرعة الاستجابة</span>
                </div>
              </div>
            </div>

            {/* Submission Form */}
            <form
              id="form-add-review"
              onSubmit={handleSubmit}
              className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-xs"
            >
              <h3 className="font-bold text-base text-slate-800 dark:text-slate-100 mb-4 flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-indigo-500" />
                <span>أضف تقييمك وانطباعك:</span>
              </h3>

              {/* Star selector */}
              <div className="mb-4">
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">
                  حدد عدد النجوم:
                </label>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map((s) => (
                    <button
                      type="button"
                      key={s}
                      id={`star-select-${s}`}
                      onClick={() => setRating(s)}
                      onMouseEnter={() => setHoverRating(s)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1 text-slate-300 transition-transform hover:scale-125 cursor-pointer"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          s <= (hoverRating || rating)
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-slate-300 dark:text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="text-xs font-bold text-slate-700 dark:text-slate-300 mr-2">
                    {rating} من 5 نجوم
                  </span>
                </div>
              </div>

              {/* Name field */}
              <div className="mb-3">
                <label htmlFor="review-author" className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  الاسم أو اللقب:
                </label>
                <input
                  id="review-author"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="مثال: يوسف، سارة، المحارب..."
                  required
                  className="w-full text-sm py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              {/* Comment field */}
              <div className="mb-4">
                <label htmlFor="review-comment" className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1">
                  رأيك في المنصة وملاحظاتك:
                </label>
                <textarea
                  id="review-comment"
                  rows={3}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="اكتب انطباعك أو اقتراحك لزخارف جديدة..."
                  required
                  className="w-full text-sm py-2 px-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <button
                type="submit"
                id="btn-submit-review"
                className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-xs transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>نشر التقييم الآن</span>
              </button>
            </form>
          </div>

          {/* Right Column: List of reviews */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h3 className="font-bold text-base text-slate-800 dark:text-slate-100">
                أحدث التعليقات والتقييمات ({reviews.length})
              </h3>
              <span className="text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1 font-medium">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>تقييمات معتمدة ومحدثة لحظياً</span>
              </span>
            </div>

            <div className="space-y-3">
              {reviews.map((rev) => (
                <div
                  key={rev.id}
                  id={`review-card-${rev.id}`}
                  className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 shadow-2xs"
                >
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 flex items-center justify-center font-bold text-xs">
                        <User className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>{rev.author}</span>
                          {rev.badge && (
                            <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-sm bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                              {rev.badge}
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400">{rev.date}</span>
                      </div>
                    </div>

                    <div className="flex items-center text-amber-400">
                      {Array.from({ length: rev.rating }).map((_, idx) => (
                        <Star key={idx} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                    {rev.comment}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
