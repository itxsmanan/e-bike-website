/**
 * LibraryPage.jsx
 * ──────────────────────────────────────────────────────────────
 * The user's personal library — accessible at /library.
 * Requires: isLoggedIn && isSubscribed (enforced in-page with a gate card)
 *
 * Three tabs:
 *   1. Currently Reading — progress bars + Continue Reading
 *   2. Saved / Bookmarks — grid of saved books
 *   3. Finished          — completed books with re-read option
 * ──────────────────────────────────────────────────────────────
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiBookOpen, FiBookmark, FiCheckCircle, FiTrash2,
  FiRefreshCw, FiArrowRight, FiBook, FiLock,
} from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import { useLibrary } from '../context/LibraryContext';

// ── Helpers ───────────────────────────────────────────────────────────────────

function timeAgo(ts) {
  if (!ts) return '';
  const diff = Date.now() - ts;
  const mins  = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days  = Math.floor(diff / 86400000);
  if (mins < 1)  return 'just now';
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

// ── Tab pill ──────────────────────────────────────────────────────────────────

function TabPill({ id, label, icon: Icon, count, active, onClick }) {
  return (
    <button
      id={id}
      type="button"
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 whitespace-nowrap"
      style={{
        background: active
          ? 'linear-gradient(135deg, rgba(201,169,98,0.2), rgba(201,169,98,0.08))'
          : 'var(--navy)',
        border: active
          ? '1px solid rgba(201,169,98,0.35)'
          : '1px solid var(--border)',
        color: active ? 'var(--gold)' : 'var(--text-dim)',
      }}
    >
      <Icon size={15} />
      {label}
      {count > 0 && (
        <span
          className="ml-0.5 min-w-[20px] h-5 flex items-center justify-center rounded-full text-xs font-bold px-1.5"
          style={{
            background: active ? 'var(--gold)' : 'rgba(201,169,98,0.15)',
            color: active ? '#0C1035' : 'var(--gold)',
          }}
        >
          {count}
        </span>
      )}
    </button>
  );
}

// ── Empty State ───────────────────────────────────────────────────────────────

function EmptyState({ tab }) {
  const navigate = useNavigate();
  const messages = {
    reading:  { emoji: '📖', title: 'Nothing to read yet',      sub: 'Find a book and hit "Read Now" to start your reading journey.', cta: 'Browse Books' },
    saved:    { emoji: '🔖', title: 'No saved books',           sub: 'Bookmark books you want to read later by tapping the bookmark icon.', cta: 'Explore Books' },
    finished: { emoji: '✅', title: 'No finished books yet',    sub: 'Complete a book and it will appear here. Keep reading!', cta: 'My Reading List' },
  };
  const m = messages[tab];
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div
        className="text-6xl mb-6 flex items-center justify-center w-24 h-24 rounded-2xl"
        style={{ background: 'rgba(201,169,98,0.06)', border: '1px solid rgba(201,169,98,0.12)' }}
      >
        {m.emoji}
      </div>
      <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text)' }}>{m.title}</h3>
      <p className="text-sm max-w-xs mb-6" style={{ color: 'var(--text-dim)' }}>{m.sub}</p>
      <button
        type="button"
        onClick={() => navigate('/#books')}
        className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all duration-200"
        style={{
          background: 'linear-gradient(135deg, var(--gold), var(--gold-bright))',
          color: '#0C1035',
          boxShadow: '0 4px 16px rgba(201,169,98,0.3)',
        }}
      >
        {m.cta} <FiArrowRight size={14} />
      </button>
    </div>
  );
}

// ── Reading Card ──────────────────────────────────────────────────────────────

function ReadingCard({ book, onProgress, onFinish, onRemove }) {
  const navigate = useNavigate();
  const pct = book.progress ?? 0;

  return (
    <div
      className="flex flex-col sm:flex-row gap-4 rounded-2xl p-5 transition-all duration-200"
      style={{
        background: 'var(--navy)',
        border: '1px solid var(--border)',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; }}
    >
      {/* Cover */}
      <div
        className="flex-shrink-0 flex items-center justify-center w-16 h-20 rounded-xl text-4xl"
        style={{ background: 'var(--deep)', border: '1px solid var(--border)' }}
      >
        {book.cover?.length > 5
          ? <img src={book.cover} alt={book.title} className="w-full h-full object-cover rounded-xl" />
          : <FiBook style={{ opacity: 0.5 }} />}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0">
        <p className="text-xs mb-0.5" style={{ color: 'var(--text-muted)' }}>{book.category}</p>
        <h3 className="font-bold truncate mb-0.5" style={{ color: 'var(--text)', fontSize: '0.95rem' }}>{book.title}</h3>
        <p className="text-xs mb-3" style={{ color: 'var(--text-dim)' }}>by {book.author}</p>

        {/* Progress bar */}
        <div className="mb-3">
          <div className="flex justify-between text-xs mb-1" style={{ color: 'var(--text-muted)' }}>
            <span>Progress</span>
            <span style={{ color: 'var(--gold)' }}>{pct}%</span>
          </div>
          <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(201,169,98,0.1)' }}>
            <div
              className="h-full rounded-full"
              style={{ width: `${pct}%`, background: 'linear-gradient(90deg, var(--gold-dim), var(--gold-bright))', transition: 'width 0.5s ease' }}
            />
          </div>
          <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>
            {book.pages ? `~${Math.round(book.pages * pct / 100)} of ${book.pages} pages` : ''}
            {book.lastReadAt && ` · last read ${timeAgo(book.lastReadAt)}`}
          </p>
        </div>

        {/* Simulate progress buttons */}
        <div className="flex flex-wrap gap-2">
          <button
            id={`continue-reading-${book.id}`}
            type="button"
            onClick={() => navigate(`/book/${book.id}`)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
            style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-bright))', color: '#0C1035' }}
          >
            <FiBookOpen size={12} /> Continue Reading
          </button>
          {/* Mock progress incrementor for demo */}
          <button
            id={`progress-${book.id}`}
            type="button"
            onClick={() => onProgress(book.id, Math.min(100, pct + 10))}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
            style={{ background: 'rgba(201,169,98,0.08)', color: 'var(--text-dim)', border: '1px solid rgba(201,169,98,0.15)' }}
            title="Simulate +10% progress"
          >
            +10% Progress
          </button>
          <button
            id={`finish-${book.id}`}
            type="button"
            onClick={() => onFinish(book.id)}
            className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200"
            style={{ background: 'rgba(34,197,94,0.08)', color: '#22c55e', border: '1px solid rgba(34,197,94,0.2)' }}
          >
            <FiCheckCircle size={12} className="inline mr-1" />Mark Finished
          </button>
          <button
            type="button"
            onClick={() => onRemove(book.id)}
            className="px-3 py-1.5 rounded-lg text-xs transition-all duration-200"
            style={{ color: 'var(--text-muted)' }}
            title="Remove from reading list"
          >
            <FiTrash2 size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Saved Card ────────────────────────────────────────────────────────────────

function SavedCard({ book, onRemove, onStartReading }) {
  const navigate = useNavigate();
  return (
    <div
      className="flex flex-col rounded-2xl overflow-hidden transition-all duration-200"
      style={{
        background: 'var(--navy)',
        border: '1px solid var(--border)',
      }}
      onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--gold)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
      onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.transform = 'translateY(0)'; }}
    >
      {/* Cover */}
      <div
        className="flex items-center justify-center h-32 text-5xl cursor-pointer"
        style={{ background: 'var(--deep)' }}
        onClick={() => navigate(`/book/${book.id}`)}
      >
        {book.cover?.length > 5
          ? <img src={book.cover} alt={book.title} className="w-full h-full object-cover" />
          : <FiBook style={{ opacity: 0.5 }} />}
      </div>
      <div className="p-4 flex flex-col gap-2 flex-1">
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{book.category}</p>
        <h3 className="font-bold text-sm leading-tight" style={{ color: 'var(--text)' }}>{book.title}</h3>
        <p className="text-xs" style={{ color: 'var(--text-dim)' }}>by {book.author}</p>
        <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Saved {timeAgo(book.savedAt)}</p>
        <div className="flex gap-2 mt-auto pt-2">
          <button
            id={`read-saved-${book.id}`}
            type="button"
            onClick={() => { onStartReading(book); navigate('/library'); }}
            className="flex-1 text-xs py-2 rounded-lg font-semibold transition-all duration-200"
            style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-bright))', color: '#0C1035' }}
          >
            Read Now
          </button>
          <button
            type="button"
            onClick={() => onRemove(book.id)}
            className="w-8 h-8 flex items-center justify-center rounded-lg transition-all duration-200"
            style={{ background: 'rgba(224,85,103,0.08)', color: '#E05567', border: '1px solid rgba(224,85,103,0.2)' }}
            title="Remove bookmark"
          >
            <FiTrash2 size={13} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Finished Card ─────────────────────────────────────────────────────────────

function FinishedCard({ book, onReRead, onRemove }) {
  const navigate = useNavigate();
  return (
    <div
      className="flex gap-4 rounded-2xl p-4 transition-all duration-200"
      style={{ background: 'var(--navy)', border: '1px solid var(--border)' }}
    >
      {/* Cover */}
      <div
        className="flex-shrink-0 flex items-center justify-center w-14 h-18 rounded-xl text-3xl cursor-pointer"
        style={{ background: 'var(--deep)', border: '1px solid var(--border)', minHeight: '4.5rem' }}
        onClick={() => navigate(`/book/${book.id}`)}
      >
        {book.cover?.length > 5
          ? <img src={book.cover} alt={book.title} className="w-full h-full object-cover rounded-xl" />
          : <FiBook style={{ opacity: 0.5 }} />}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <FiCheckCircle size={13} style={{ color: '#22c55e', flexShrink: 0 }} />
          <p className="text-xs font-semibold" style={{ color: '#22c55e' }}>Completed</p>
        </div>
        <h3 className="font-bold text-sm truncate mb-0.5" style={{ color: 'var(--text)' }}>{book.title}</h3>
        <p className="text-xs mb-1" style={{ color: 'var(--text-dim)' }}>by {book.author}</p>
        <p className="text-xs mb-3" style={{ color: 'var(--text-muted)' }}>Finished {timeAgo(book.finishedAt)}</p>
        <div className="flex gap-2">
          <button
            id={`reread-${book.id}`}
            type="button"
            onClick={() => onReRead(book)}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200"
            style={{ background: 'rgba(201,169,98,0.1)', color: 'var(--gold)', border: '1px solid rgba(201,169,98,0.2)' }}
          >
            <FiRefreshCw size={11} /> Read Again
          </button>
          <button
            type="button"
            onClick={() => onRemove(book.id)}
            className="w-7 h-7 flex items-center justify-center rounded-lg transition-all duration-200"
            style={{ color: 'var(--text-muted)' }}
            title="Remove"
          >
            <FiTrash2 size={12} />
          </button>
        </div>
      </div>
    </div>
  );
}

// ── LibraryPage (main export) ─────────────────────────────────────────────────

export default function LibraryPage() {
  const { isLoggedIn, isSubscribed, openAuthModal, openSubGate, user } = useAuth();
  const {
    readingBooks, savedBooks, finishedBooks, readingCount, totalBooks,
    updateProgress, markFinished, removeFromReading, unsaveBook, startReading, removeFromFinished,
  } = useLibrary();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('reading');

  // ── Gate: not logged in ───────────────────────────────────────────────────────
  if (!isLoggedIn) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 pt-24">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 text-4xl"
          style={{ background: 'rgba(201,169,98,0.08)', border: '1px solid rgba(201,169,98,0.15)' }}>
          <FiLock size={32} style={{ color: 'var(--gold)' }} />
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>Sign in to access your library</h1>
        <p className="text-sm mb-6 max-w-sm" style={{ color: 'var(--text-dim)' }}>
          Your personal reading list, bookmarks and progress are stored in your account.
        </p>
        <button
          type="button"
          onClick={openAuthModal}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm"
          style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-bright))', color: '#0C1035', boxShadow: '0 6px 20px rgba(201,169,98,0.35)' }}
        >
          Sign In <FiArrowRight size={15} />
        </button>
      </div>
    );
  }

  // ── Gate: logged in but no subscription ──────────────────────────────────────
  if (!isSubscribed) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center px-4 pt-24">
        <div className="w-20 h-20 rounded-2xl flex items-center justify-center mb-6 text-4xl"
          style={{ background: 'rgba(201,169,98,0.08)', border: '1px solid rgba(201,169,98,0.15)' }}>
          <FiBook size={32} style={{ color: 'var(--gold)' }} />
        </div>
        <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text)' }}>Subscribe to unlock your library</h1>
        <p className="text-sm mb-6 max-w-sm" style={{ color: 'var(--text-dim)' }}>
          Hi {user?.name?.split(' ')[0]}! Get a subscription to start reading, saving books, and tracking your progress.
        </p>
        <button
          type="button"
          onClick={openSubGate}
          className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm"
          style={{ background: 'linear-gradient(135deg, var(--gold), var(--gold-bright))', color: '#0C1035', boxShadow: '0 6px 20px rgba(201,169,98,0.35)' }}
        >
          View Plans <FiArrowRight size={15} />
        </button>
      </div>
    );
  }

  // ── Full library view ─────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen pt-24 pb-16 px-4" style={{ maxWidth: '900px', margin: '0 auto' }}>

      {/* Page header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-1">
          <div className="flex items-center justify-center w-10 h-10 rounded-xl"
            style={{ background: 'rgba(201,169,98,0.12)', border: '1px solid rgba(201,169,98,0.2)' }}>
            <FiBook size={18} style={{ color: 'var(--gold)' }} />
          </div>
          <div>
            <h1 className="text-2xl font-bold" style={{ color: 'var(--text)', fontFamily: "'Playfair Display', serif" }}>
              My Library
            </h1>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              {totalBooks} book{totalBooks !== 1 ? 's' : ''} · {user?.name}
            </p>
          </div>
        </div>

        {/* Stats row */}
        <div className="flex gap-3 mt-5 flex-wrap">
          {[
            { label: 'Reading',  value: readingBooks.length,  color: 'var(--gold)' },
            { label: 'Saved',    value: savedBooks.length,    color: 'var(--accent)' },
            { label: 'Finished', value: finishedBooks.length, color: '#22c55e' },
          ].map(({ label, value, color }) => (
            <div key={label}
              className="flex-1 min-w-[80px] rounded-xl px-4 py-3 text-center"
              style={{ background: 'var(--navy)', border: '1px solid var(--border)' }}>
              <div className="text-2xl font-black" style={{ color }}>{value}</div>
              <div className="text-xs" style={{ color: 'var(--text-muted)' }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-6 overflow-x-auto pb-1">
        <TabPill id="tab-reading"  label="Currently Reading" icon={FiBookOpen}    count={readingBooks.length}  active={activeTab === 'reading'}  onClick={() => setActiveTab('reading')} />
        <TabPill id="tab-saved"    label="Saved"             icon={FiBookmark}    count={savedBooks.length}    active={activeTab === 'saved'}    onClick={() => setActiveTab('saved')} />
        <TabPill id="tab-finished" label="Finished"          icon={FiCheckCircle} count={finishedBooks.length} active={activeTab === 'finished'} onClick={() => setActiveTab('finished')} />
      </div>

      {/* Tab content */}
      <div style={{ animation: 'libFadeIn 0.2s ease both' }} key={activeTab}>

        {/* ── Reading tab ── */}
        {activeTab === 'reading' && (
          readingBooks.length === 0
            ? <EmptyState tab="reading" />
            : <div className="flex flex-col gap-4">
                {readingBooks.map((book) => (
                  <ReadingCard
                    key={book.id}
                    book={book}
                    onProgress={updateProgress}
                    onFinish={markFinished}
                    onRemove={removeFromReading}
                  />
                ))}
              </div>
        )}

        {/* ── Saved tab ── */}
        {activeTab === 'saved' && (
          savedBooks.length === 0
            ? <EmptyState tab="saved" />
            : <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {savedBooks.map((book) => (
                  <SavedCard
                    key={book.id}
                    book={book}
                    onRemove={unsaveBook}
                    onStartReading={startReading}
                  />
                ))}
              </div>
        )}

        {/* ── Finished tab ── */}
        {activeTab === 'finished' && (
          finishedBooks.length === 0
            ? <EmptyState tab="finished" />
            : <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {finishedBooks.map((book) => (
                  <FinishedCard
                    key={book.id}
                    book={book}
                    onReRead={(b) => { startReading(b); setActiveTab('reading'); }}
                    onRemove={removeFromFinished}
                  />
                ))}
              </div>
        )}
      </div>

      <style>{`
        @keyframes libFadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
