import React, { useState, useMemo } from 'react';
import {
  Copy,
  Check,
  Share2,
  Sparkles,
  Trash2,
  Shuffle,
  Clipboard,
  Bookmark,
  BookmarkCheck,
  Search,
  Wand2,
} from 'lucide-react';
import { DECORATION_OPTIONS, PRESET_BRACKETS, RANDOM_SAMPLES } from '../data/decorations';

interface TextDecoratorSectionProps {
  onNotify: (message: string, type?: 'success' | 'info') => void;
  onIncrementCopyCount: () => void;
  favorites: string[];
  onToggleFavorite: (text: string) => void;
}

export const TextDecoratorSection: React.FC<TextDecoratorSectionProps> = ({
  onNotify,
  onIncrementCopyCount,
  favorites,
  onToggleFavorite,
}) => {
  const [inputText, setInputText] = useState<string>('الزخرفة الذكية');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchFilter, setSearchFilter] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Quick stats
  const charCount = inputText.length;
  const wordCount = inputText.trim() ? inputText.trim().split(/\s+/).length : 0;

  // Filtered decoration styles
  const filteredStyles = useMemo(() => {
    return DECORATION_OPTIONS.filter((option) => {
      const matchCategory = selectedCategory === 'all' || option.category === selectedCategory;
      const matchSearch =
        !searchFilter ||
        option.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        option.tags.some((t) => t.toLowerCase().includes(searchFilter.toLowerCase()));
      return matchCategory && matchSearch;
    });
  }, [selectedCategory, searchFilter]);

  // Copy handler with feedback
  const handleCopy = async (id: string, textToCopy: string) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedId(id);
      onIncrementCopyCount();
      onNotify(`تم نسخ النص المزخرف بنجاح! 📋`, 'success');
      setTimeout(() => {
        setCopiedId((prev) => (prev === id ? null : prev));
      }, 2000);
    } catch {
      onNotify('حدث خطأ أثناء النسخ إلى الحافظة', 'info');
    }
  };

  // Share handler
  const handleShare = async (textToShare: string) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'نص مزخرف من منصة الزخرفة الذكية',
          text: textToShare,
        });
        onNotify('تم فتح نافذة المشاركة بنجاح', 'info');
      } catch {
        // user cancelled share
      }
    } else {
      handleCopy('share', textToShare);
      onNotify('تم نسخ النص لمشاركته في وسائل التواصل!', 'success');
    }
  };

  // Random sample
  const handleRandomSample = () => {
    const random = RANDOM_SAMPLES[Math.floor(Math.random() * RANDOM_SAMPLES.length)];
    setInputText(random);
    onNotify(`تم اختيار عينة تجريبية: "${random}"`, 'info');
  };

  // Paste from clipboard
  const handlePaste = async () => {
    try {
      const clipText = await navigator.clipboard.readText();
      if (clipText) {
        setInputText(clipText);
        onNotify('تم لصق النص من الحافظة', 'success');
      }
    } catch {
      onNotify('يرجى السماح بالوصول للحافظة أو اللصق يدوياً', 'info');
    }
  };

  // Wrap input with preset brackets
  const handleApplyBracket = (prefix: string, suffix: string) => {
    if (!inputText.trim()) {
      setInputText(`${prefix}نصك هنا${suffix}`);
    } else {
      setInputText(`${prefix}${inputText.trim()}${suffix}`);
    }
    onNotify('تم تطبيق الإطار على النص', 'info');
  };

  return (
    <section id="section-decorator" className="py-8 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 dark:bg-indigo-950/60 dark:border-indigo-800 dark:text-indigo-300 text-xs font-bold mb-3">
            <Wand2 className="w-3.5 h-3.5" />
            <span>محرك الزخرفة التفاعلي الفوري</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            زخرفة النصوص والأسماء باحترافية
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            اكتب أي نص أو اسم، وشاهد تشكيلات الزخرفة العربية العثمانية، أنماط الخط الإنجليزي الفاخرة، ورموز الألعاب
            (ببجي وفري فاير) تتولد فورياً مع إمكانية النسخ بنقرة واحدة.
          </p>
        </div>

        {/* Input Box Card */}
        <div
          id="decorator-input-container"
          className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-6 border border-slate-200 dark:border-slate-700 shadow-sm mb-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
            <label htmlFor="user-text-input" className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-100 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-500" />
              <span>أدخل النص المراد زخرفته:</span>
            </label>

            {/* Quick Input Toolbar */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <button
                id="btn-sample-text"
                onClick={handleRandomSample}
                className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                title="نص عشوائي للتجربة"
              >
                <Shuffle className="w-3.5 h-3.5" />
                <span>عينة عشوائية</span>
              </button>

              <button
                id="btn-paste-clipboard"
                onClick={handlePaste}
                className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 transition-colors cursor-pointer"
                title="لصق من الحافظة"
              >
                <Clipboard className="w-3.5 h-3.5" />
                <span>لصق</span>
              </button>

              {inputText && (
                <button
                  id="btn-clear-input"
                  onClick={() => setInputText('')}
                  className="inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 dark:bg-rose-950/40 dark:hover:bg-rose-900/60 text-rose-600 dark:text-rose-300 transition-colors cursor-pointer"
                  title="مسح النص بالكامل"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>تفريغ</span>
                </button>
              )}
            </div>
          </div>

          {/* Text Area */}
          <div className="relative">
            <textarea
              id="user-text-input"
              rows={3}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="اكتب هنا مثلاً: الزخرفة الذكية، اسمك، أو أي نص تريد تزيينه..."
              className="w-full rounded-xl border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900/80 p-4 text-base sm:text-lg font-medium text-slate-900 dark:text-slate-100 focus:border-indigo-500 focus:bg-white dark:focus:bg-slate-900 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20 transition-all resize-y"
            />
          </div>

          {/* Stats Bar and Quick Wrap Badges */}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-4">
              <span>الحروف: <strong className="text-slate-800 dark:text-slate-200">{charCount}</strong></span>
              <span>الكلمات: <strong className="text-slate-800 dark:text-slate-200">{wordCount}</strong></span>
              <span>الأنماط المتاحة: <strong className="text-indigo-600 dark:text-indigo-400">{DECORATION_OPTIONS.length} نمط</strong></span>
            </div>

            {/* Quick Brackets Applicator */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="font-semibold text-slate-700 dark:text-slate-300">أقواس سريعة:</span>
              {PRESET_BRACKETS.slice(0, 5).map((bracket, idx) => (
                <button
                  key={idx}
                  id={`btn-bracket-${idx}`}
                  onClick={() => handleApplyBracket(bracket.prefix, bracket.suffix)}
                  className="px-2 py-1 rounded-md bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-slate-700 dark:hover:bg-indigo-900/40 text-slate-700 dark:text-slate-200 font-mono transition-colors text-xs cursor-pointer"
                  title={bracket.label}
                >
                  {bracket.prefix}...{bracket.suffix}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filter and Categories Tabs */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {[
              { id: 'all', label: 'الكل' },
              { id: 'arabic', label: 'عربي وإسلامي' },
              { id: 'gaming', label: 'ألعاب وبايو' },
              { id: 'english', label: 'إنجليزي فاخر' },
              { id: 'frames', label: 'إطارات وأقواس' },
            ].map((cat) => (
              <button
                key={cat.id}
                id={`tab-cat-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search bar inside decorations */}
          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              placeholder="ابحث عن نمط زخرفة..."
              className="w-full pr-9 pl-3 py-1.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        {/* Results Grid */}
        <div id="decorations-results-grid" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredStyles.map((style) => {
            const transformed = inputText.trim() ? style.transform(inputText) : style.transform('الزخرفة الذكية');
            const isCopied = copiedId === style.id;
            const isFav = favorites.includes(transformed);

            return (
              <div
                key={style.id}
                id={`card-style-${style.id}`}
                className="group relative bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                {/* Header: Name and Tags */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-700 dark:text-slate-200">{style.name}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    {style.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 text-slate-500 dark:text-slate-300"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Transformed Result Area */}
                <div
                  dir="auto"
                  className="my-2 p-3.5 rounded-lg bg-slate-50 dark:bg-slate-900/70 border border-slate-100 dark:border-slate-800/80 text-base sm:text-lg font-medium text-slate-900 dark:text-slate-50 break-words select-all min-h-[56px] flex items-center leading-relaxed"
                >
                  {transformed}
                </div>

                {/* Bottom Actions: Copy, Share, Favorite */}
                <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/60 mt-1">
                  <div className="flex items-center gap-1">
                    {/* Favorite button */}
                    <button
                      id={`btn-fav-${style.id}`}
                      onClick={() => onToggleFavorite(transformed)}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        isFav
                          ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/40'
                          : 'text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                      title={isFav ? 'إزالة من المفضلة' : 'حفظ في المفضلة'}
                    >
                      {isFav ? <BookmarkCheck className="w-4 h-4" /> : <Bookmark className="w-4 h-4" />}
                    </button>

                    {/* Share button */}
                    <button
                      id={`btn-share-${style.id}`}
                      onClick={() => handleShare(transformed)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                      title="مشاركة سريعة"
                    >
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Primary One-Click Copy Button */}
                  <button
                    id={`btn-copy-${style.id}`}
                    onClick={() => handleCopy(style.id, transformed)}
                    className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all duration-150 cursor-pointer ${
                      isCopied
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs hover:shadow-sm'
                    }`}
                  >
                    {isCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                        <span>تم النسخ!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>نسخ بنقرة واحدة</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {filteredStyles.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              لم يتم العثور على أنماط مطابقة لبحثك. حاول استخدام كلمات أخرى.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
