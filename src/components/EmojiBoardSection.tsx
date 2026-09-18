import React, { useState, useMemo } from 'react';
import {
  Smile,
  Search,
  Copy,
  Check,
  History,
  Trash2,
  Sparkles,
  Layers,
  Heart,
  Gamepad2,
  Flame,
} from 'lucide-react';
import { EMOJI_CATEGORIES, KAOMOJI_LIST, EMOJI_COMBOS } from '../data/emojis';
import { EmojiItem } from '../types';

interface EmojiBoardSectionProps {
  onNotify: (message: string, type?: 'success' | 'info') => void;
  onIncrementCopyCount: () => void;
  recentCopies: string[];
  onAddRecentCopy: (item: string) => void;
  onClearRecentCopies: () => void;
}

export const EmojiBoardSection: React.FC<EmojiBoardSectionProps> = ({
  onNotify,
  onIncrementCopyCount,
  recentCopies,
  onAddRecentCopy,
  onClearRecentCopies,
}) => {
  const [activeTab, setActiveTab] = useState<string>('smileys');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedChar, setCopiedChar] = useState<string | null>(null);

  // Custom Emoji Mixer Bar state
  const [mixerText, setMixerText] = useState<string>('');
  const [mixerCopied, setMixerCopied] = useState<boolean>(false);

  // Filtered emojis across all categories when searching, or current tab
  const displayedEmojis = useMemo(() => {
    if (!searchQuery.trim()) {
      const group = EMOJI_CATEGORIES.find((g) => g.id === activeTab);
      return group ? group.emojis : [];
    }

    const q = searchQuery.toLowerCase().trim();
    const matches: EmojiItem[] = [];
    EMOJI_CATEGORIES.forEach((cat) => {
      cat.emojis.forEach((item) => {
        if (
          item.name.toLowerCase().includes(q) ||
          item.char.includes(q) ||
          item.keywords.some((k) => k.toLowerCase().includes(q))
        ) {
          matches.push(item);
        }
      });
    });
    return matches;
  }, [activeTab, searchQuery]);

  // Handle single emoji click / copy
  const handleEmojiClick = async (char: string, name: string) => {
    try {
      await navigator.clipboard.writeText(char);
      setCopiedChar(char);
      onIncrementCopyCount();
      onAddRecentCopy(char);
      onNotify(`تم نسخ ${char} (${name}) بنجاح!`, 'success');
      setTimeout(() => {
        setCopiedChar((prev) => (prev === char ? null : prev));
      }, 1500);
    } catch {
      onNotify('تعذر النسخ إلى الحافظة', 'info');
    }
  };

  // Add to mixer
  const handleAppendToMixer = (char: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMixerText((prev) => prev + char);
    onNotify(`أُضيف ${char} إلى شريط التوليف`, 'info');
  };

  // Copy mixer text
  const handleCopyMixer = async () => {
    if (!mixerText) return;
    try {
      await navigator.clipboard.writeText(mixerText);
      setMixerCopied(true);
      onIncrementCopyCount();
      onAddRecentCopy(mixerText);
      onNotify('تم نسخ التوليفة المخصصة بنجاح! 💫', 'success');
      setTimeout(() => setMixerCopied(false), 2000);
    } catch {
      onNotify('تعذر النسخ', 'info');
    }
  };

  return (
    <section id="section-emojis" className="py-8 scroll-mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Heading */}
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 border border-pink-200 text-pink-700 dark:bg-pink-950/60 dark:border-pink-800 dark:text-pink-300 text-xs font-bold mb-3">
            <Smile className="w-3.5 h-3.5" />
            <span>لوحة الرموز التعبيرية الشاملة والمصنفة</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 dark:text-white tracking-tight">
            لوحة الرموز التعبيرية (Emojis) والرموز النادرة
          </h2>
          <p className="mt-2 text-sm sm:text-base text-slate-600 dark:text-slate-300">
            تصفح آلاف الإيموجيات، رموز الألعاب والبايو، كاو-موجي اليابانية، وتوليفات الحسابات المنسقة. انسخ أي رمز بنقرة واحدة
            لاستخدامه في واتساب، تيك توك، إنستغرام، أو فيسبوك.
          </p>
        </div>

        {/* Emoji Mixer / Basket Toolbar */}
        <div
          id="emoji-mixer-container"
          className="bg-white dark:bg-slate-800 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-700 shadow-xs mb-6"
        >
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <div className="flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-100">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>شريط توليف الرموز التعبيرية المتعددة:</span>
              <span className="text-[11px] font-normal text-slate-500 dark:text-slate-400">
                (اجمع عدة رموز معاً ثم انسخها دفعة واحدة)
              </span>
            </div>

            <div className="flex items-center gap-2">
              {mixerText && (
                <button
                  id="btn-clear-mixer"
                  onClick={() => setMixerText('')}
                  className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-md text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>مسح</span>
                </button>
              )}

              <button
                id="btn-copy-mixer"
                onClick={handleCopyMixer}
                disabled={!mixerText}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  !mixerText
                    ? 'bg-slate-100 dark:bg-slate-700 text-slate-400 cursor-not-allowed'
                    : mixerCopied
                    ? 'bg-emerald-600 text-white'
                    : 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                }`}
              >
                {mixerCopied ? (
                  <>
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                    <span>تم النسخ!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>نسخ التوليفة ({mixerText.length})</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="relative">
            <input
              type="text"
              id="input-mixer"
              value={mixerText}
              onChange={(e) => setMixerText(e.target.value)}
              placeholder="انقر على أي رمز لإضافته هنا، أو اكتب نصك الخاص..."
              className="w-full text-lg sm:text-xl py-2.5 px-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/60 text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        {/* Recently Copied Strip */}
        {recentCopies.length > 0 && (
          <div
            id="recent-copies-container"
            className="mb-6 p-3.5 rounded-xl bg-slate-100/70 dark:bg-slate-800/70 border border-slate-200 dark:border-slate-700 flex items-center justify-between gap-3 flex-wrap"
          >
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300">
              <History className="w-3.5 h-3.5 text-indigo-500" />
              <span>آخر ما تم نسخه:</span>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap flex-1">
              {recentCopies.slice(0, 14).map((item, idx) => (
                <button
                  key={idx}
                  id={`recent-copy-${idx}`}
                  onClick={() => handleEmojiClick(item, 'عنصر سابق')}
                  className="px-2 py-1 rounded-lg bg-white dark:bg-slate-700 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-600 text-sm hover:scale-110 hover:border-indigo-400 transition-all cursor-pointer shadow-2xs"
                  title="انقر لإعادة النسخ"
                >
                  {item}
                </button>
              ))}
            </div>

            <button
              id="btn-clear-recent"
              onClick={onClearRecentCopies}
              className="text-slate-400 hover:text-rose-500 text-xs transition-colors p-1"
              title="مسح السجل"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Categories Bar & Search */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 mb-6">
          {/* Main Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {EMOJI_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                id={`tab-emoji-${cat.id}`}
                onClick={() => {
                  setActiveTab(cat.id);
                  setSearchQuery('');
                }}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTab === cat.id && !searchQuery
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
                }`}
              >
                <span>{cat.icon}</span>
                <span>{cat.name}</span>
              </button>
            ))}

            {/* Kaomoji Tab */}
            <button
              id="tab-kaomoji"
              onClick={() => {
                setActiveTab('kaomoji');
                setSearchQuery('');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'kaomoji' && !searchQuery
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <span>ʕ•ᴥ•ʔ</span>
              <span>وجوه يابانية</span>
            </button>

            {/* Combos Tab */}
            <button
              id="tab-combos"
              onClick={() => {
                setActiveTab('combos');
                setSearchQuery('');
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all cursor-pointer ${
                activeTab === 'combos' && !searchQuery
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>توليفات البايو</span>
            </button>
          </div>

          {/* Emoji Search Box */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن إيموجي (قلب، ضحك، نار، تاج)..."
              className="w-full pr-9 pl-3 py-1.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 focus:outline-hidden focus:ring-2 focus:ring-indigo-500/20"
            />
          </div>
        </div>

        {/* Main Grid View */}
        {activeTab === 'kaomoji' && !searchQuery ? (
          /* Kaomoji Grid */
          <div id="kaomoji-grid" className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {KAOMOJI_LIST.map((km) => {
              const isCopied = copiedChar === km.code;
              return (
                <button
                  key={km.id}
                  id={`btn-kaomoji-${km.id}`}
                  onClick={() => handleEmojiClick(km.code, km.title)}
                  className="group relative p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md transition-all flex flex-col items-center justify-center gap-1.5 cursor-pointer"
                >
                  <span className="font-mono text-base sm:text-lg text-slate-800 dark:text-slate-100 group-hover:scale-105 transition-transform">
                    {km.code}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
                    {km.title}
                  </span>
                  {isCopied && (
                    <span className="absolute inset-0 bg-emerald-600/90 text-white rounded-xl flex items-center justify-center text-xs font-bold backdrop-blur-xs animate-in fade-in">
                      تم النسخ!
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        ) : activeTab === 'combos' && !searchQuery ? (
          /* Combos Grid */
          <div id="combos-grid" className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {EMOJI_COMBOS.map((combo) => {
              const isCopied = copiedChar === combo.combo;
              return (
                <div
                  key={combo.id}
                  id={`card-combo-${combo.id}`}
                  className="bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-200 dark:border-slate-700 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all flex flex-col justify-between gap-3 shadow-xs"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-sm text-slate-800 dark:text-slate-100">{combo.title}</span>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300">
                      #{combo.category}
                    </span>
                  </div>

                  <div className="p-3 bg-slate-50 dark:bg-slate-900/70 rounded-lg text-2xl tracking-widest text-center">
                    {combo.combo}
                  </div>

                  <p className="text-xs text-slate-500 dark:text-slate-400">{combo.meaning}</p>

                  <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100 dark:border-slate-700/70">
                    <button
                      onClick={(e) => handleAppendToMixer(combo.combo, e)}
                      className="text-xs text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                    >
                      + إضافة للتوليفة
                    </button>

                    <button
                      id={`btn-copy-combo-${combo.id}`}
                      onClick={() => handleEmojiClick(combo.combo, combo.title)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                        isCopied
                          ? 'bg-emerald-600 text-white'
                          : 'bg-indigo-600 hover:bg-indigo-700 text-white'
                      }`}
                    >
                      {isCopied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{isCopied ? 'تم النسخ!' : 'نسخ التوليفة'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Standard Emoji Icons Grid */
          <div
            id="emojis-items-grid"
            className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-2.5 sm:gap-3"
          >
            {displayedEmojis.map((emoji) => {
              const isCopied = copiedChar === emoji.char;
              return (
                <button
                  key={emoji.id}
                  id={`btn-emoji-${emoji.id}`}
                  onClick={() => handleEmojiClick(emoji.char, emoji.name)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    handleAppendToMixer(emoji.char, e);
                  }}
                  className="group relative min-h-[52px] sm:min-h-[58px] p-2 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-md transition-all flex flex-col items-center justify-center gap-1 cursor-pointer"
                  title={`${emoji.name} (انقر للنسخ، أو انقر بزر الفأرة الأيمن للإضافة للتوليفة)`}
                >
                  <span className="text-2xl sm:text-3xl select-none group-hover:scale-125 transition-transform duration-150">
                    {emoji.char}
                  </span>
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 truncate max-w-full font-medium">
                    {emoji.name.split(' ')[0]}
                  </span>

                  {isCopied && (
                    <span className="absolute inset-0 bg-emerald-600/95 text-white rounded-xl flex items-center justify-center text-[11px] font-bold shadow-xs animate-in zoom-in-75">
                      ✓ تم!
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        )}

        {displayedEmojis.length === 0 && searchQuery && (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
            <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
              لم نعثر على أي رمز تعبيري يطابق &quot;{searchQuery}&quot;. جرب البحث بكلمة أخرى مثل &quot;قلب&quot; أو &quot;نار&quot;.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
