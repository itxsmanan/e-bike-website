/**
 * BookActionButtons.jsx
 * ──────────────────────────────────────────────────────────────
 * Smart action button group used on BookDetail and book cards.
 *
 * Logic:
 *   • Not logged in        → "Sign In to Read" → opens AuthModal
 *   • Logged in, no sub    → "Subscribe to Read" → opens SubscriptionGate
 *   • Subscribed           → "Read Now" (+ bookmark toggle)
 * ──────────────────────────────────────────────────────────────
 */

import { useState } from 'react';
import { FiBookOpen, FiBookmark, FiCheck, FiLock, FiLoader } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useLibrary } from '../../context/LibraryContext';

// ── Tiny spinner ──────────────────────────────────────────────────────────────
function Spinner() {
  return (
    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
    </svg>
  );
}

// ── BookActionButtons ─────────────────────────────────────────────────────────

/**
 * @param {object} book   - Full book object from booksData
 * @param {'detail'|'card'} variant - 'detail' = full buttons, 'card' = icon-only bookmark
 */
export default function BookActionButtons({ book, variant = 'detail' }) {
  const navigate = useNavigate();
  const { isLoggedIn, isSubscribed, openAuthModal, openSubGate } = useAuth();
  const { isSaved, isReading, isFinished, saveBook, unsaveBook, startReading, getProgress, libraryUnlocked } = useLibrary();


  const [readLoading, setReadLoading] = useState(false);
  const saved    = isSaved(book.id);
  const reading  = isReading(book.id);
  const finished = isFinished(book.id);
  const progress = getProgress(book.id);


  // ── Handle "Read Now" click ──────────────────────────────────────────────────
  const handleReadNow = async () => {
    if (!isLoggedIn) { openAuthModal(); return; }
    if (!isSubscribed) { openSubGate(); return; }

    setReadLoading(true);
    // Simulate opening the book (1s delay — swap for real reader navigation later)
    await new Promise((r) => setTimeout(r, 900));
    startReading(book);
    setReadLoading(false);
    navigate('/library');
  };

  // ── Handle bookmark toggle ───────────────────────────────────────────────────
  const handleBookmark = (e) => {
    e?.stopPropagation();
    if (!isLoggedIn) { openAuthModal(); return; }
    if (!isSubscribed) { openSubGate(); return; }
    saved ? unsaveBook(book.id) : saveBook(book);
  };

  // ─────────────────────────────────────────────────────────────────────────────
  // CARD VARIANT — icon-only bookmark button (shown on book card overlay)
  // ─────────────────────────────────────────────────────────────────────────────
  if (variant === 'card') {
    return (
      <button
        id={`bookmark-card-${book.id}`}
        type="button"
        onClick={handleBookmark}
        title={saved ? 'Remove from library' : 'Save to library'}
        aria-label={saved ? 'Remove from library' : 'Save to library'}
        className="flex items-center justify-center w-9 h-9 rounded-xl transition-all duration-200"
        style={{
          background: saved
            ? 'linear-gradient(135deg, var(--gold), var(--gold-bright))'
            : 'rgba(5,7,26,0.7)',
          border: '1px solid rgba(201,169,98,0.4)',
          backdropFilter: 'blur(8px)',
          color: saved ? '#0C1035' : 'var(--gold)',
          boxShadow: saved ? '0 2px 10px rgba(201,169,98,0.4)' : 'none',
        }}
      >
        {saved ? <FiCheck size={15} /> : <FiBookmark size={15} />}
      </button>
    );
  }

  // ─────────────────────────────────────────────────────────────────────────────
  // DETAIL VARIANT — full button row (shown on BookDetail page)
  // ─────────────────────────────────────────────────────────────────────────────

  // Label & icon for the primary read button
  let readLabel, readIcon;
  if (!isLoggedIn) {
    readLabel = 'Sign In to Read';
    readIcon  = <FiLock size={16} />;
  } else if (!isSubscribed) {
    readLabel = 'Subscribe to Read';
    readIcon  = <FiLock size={16} />;
  } else if (finished) {
    readLabel = 'Read Again';
    readIcon  = <FiBookOpen size={16} />;
  } else if (reading) {
    readLabel = 'Continue Reading';
    readIcon  = <FiBookOpen size={16} />;
  } else {
    readLabel = 'Read Now';
    readIcon  = <FiBookOpen size={16} />;
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      {/* Primary: Read Now / Subscribe / Sign In */}
      <button
        id={`read-now-btn-${book.id}`}
        type="button"
        disabled={readLoading}
        onClick={handleReadNow}
        className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 font-bold text-sm transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
        style={{
          background: libraryUnlocked
            ? 'linear-gradient(135deg, var(--gold), var(--gold-bright))'
            : 'linear-gradient(135deg, rgba(201,169,98,0.2), rgba(201,169,98,0.1))',
          color: libraryUnlocked ? '#0C1035' : 'var(--gold)',
          border: libraryUnlocked ? 'none' : '1px solid rgba(201,169,98,0.35)',
          boxShadow: libraryUnlocked && !readLoading ? '0 6px 20px rgba(201,169,98,0.35)' : 'none',
        }}
        onMouseEnter={(e) => { if (libraryUnlocked && !readLoading) e.currentTarget.style.transform = 'translateY(-1px)'; }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
      >
        {readLoading ? <><Spinner /> Opening book…</> : <>{readIcon} {readLabel}</>}
      </button>

      {/* Secondary: Bookmark (only for subscribers) */}
      {libraryUnlocked && (
        <button
          id={`bookmark-detail-${book.id}`}
          type="button"
          onClick={handleBookmark}
          className="w-full flex items-center justify-center gap-2 rounded-xl py-3 font-semibold text-sm transition-all duration-200 cursor-pointer"
          style={{
            background: saved
              ? 'rgba(201,169,98,0.12)'
              : 'var(--navy)',
            border: '1px solid var(--border)',
            color: saved ? 'var(--gold)' : 'var(--text-dim)',
          }}
          onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.color = 'var(--gold)'; }}
          onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = saved ? 'var(--gold)' : 'var(--text-dim)'; }}
        >
          {saved ? <><FiCheck size={15} /> Saved to Library</> : <><FiBookmark size={15} /> Save to Library</>}
        </button>
      )}

      {/* Reading progress bar (if currently reading) */}
      {reading && !finished && (
        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between text-xs" style={{ color: 'var(--text-muted)' }}>
            <span>Reading progress</span>
            <span style={{ color: 'var(--gold)' }}>{progress}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(201,169,98,0.12)' }}>
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{ width: `${progress}%`, background: 'linear-gradient(90deg, var(--gold-dim), var(--gold-bright))' }}
            />
          </div>
        </div>
      )}

    </div>
  );
}
