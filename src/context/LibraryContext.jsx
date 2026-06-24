/**
 * LibraryContext.jsx
 * ──────────────────────────────────────────────────────────────
 * Manages the authenticated user's personal library:
 *   - savedBooks    → bookmarked / want-to-read
 *   - readingBooks  → currently reading (with progress %)
 *   - finishedBooks → completed books
 *
 * Data is persisted to localStorage keyed per user email so each
 * user gets their own library on the same device.
 *
 * SWAP-OUT GUIDE (when backend is ready):
 *   • Replace loadLibrary() with an API GET  /library
 *   • Replace saveLibrary() with an API PUT  /library (debounced)
 *   • All action signatures remain identical — no consumer changes needed.
 * ──────────────────────────────────────────────────────────────
 */

import {
  createContext, useContext, useState, useEffect, useCallback,
} from 'react';
import { useAuth } from './AuthContext';

// ── Helpers ───────────────────────────────────────────────────────────────────

const storageKey = (email) => `kitabon_library_${email ?? 'guest'}`;

const emptyLibrary = () => ({ reading: [], saved: [], finished: [] });

function loadLibrary(email) {
  try {
    const raw = localStorage.getItem(storageKey(email));
    return raw ? JSON.parse(raw) : emptyLibrary();
  } catch {
    return emptyLibrary();
  }
}

function saveLibrary(email, data) {
  try {
    localStorage.setItem(storageKey(email), JSON.stringify(data));
  } catch { /* quota exceeded — silently skip */ }
}

/** Strip a book object down to what we store (avoid huge payloads). */
function bookSnapshot(book) {
  return {
    id:       book.id,
    title:    book.title,
    author:   book.author,
    cover:    book.cover,
    category: book.category,
    pages:    book.pages ?? 0,
    language: book.language ?? 'English',
  };
}

// ── Context ───────────────────────────────────────────────────────────────────

const LibraryContext = createContext(null);

// ── Provider ──────────────────────────────────────────────────────────────────

export function LibraryProvider({ children }) {
  const { user, isLoggedIn, isSubscribed } = useAuth();
  const [library, setLibrary] = useState(emptyLibrary);

  // ── Load / clear on auth change ─────────────────────────────────────────────
  useEffect(() => {
    if (isLoggedIn && user?.email) {
      setLibrary(loadLibrary(user.email));
    } else {
      setLibrary(emptyLibrary());
    }
  }, [isLoggedIn, user?.email]);

  // ── Persist whenever library changes ────────────────────────────────────────
  useEffect(() => {
    if (isLoggedIn && user?.email) {
      saveLibrary(user.email, library);
    }
  }, [library, isLoggedIn, user?.email]);

  // ── Internal updater ────────────────────────────────────────────────────────
  const update = useCallback((fn) => setLibrary((prev) => {
    const next = fn({ ...prev, reading: [...prev.reading], saved: [...prev.saved], finished: [...prev.finished] });
    return next;
  }), []);

  // ── Actions ──────────────────────────────────────────────────────────────────

  /** Save (bookmark) a book. No-op if already saved. */
  const saveBook = useCallback((book) => {
    update((lib) => {
      if (lib.saved.some((b) => b.id === book.id)) return lib;
      lib.saved.unshift({ ...bookSnapshot(book), savedAt: Date.now() });
      return lib;
    });
  }, [update]);

  /** Remove a book from saved. */
  const unsaveBook = useCallback((bookId) => {
    update((lib) => {
      lib.saved = lib.saved.filter((b) => b.id !== bookId);
      return lib;
    });
  }, [update]);

  /**
   * Start reading a book.
   * If already in reading list, just returns (no duplicate).
   * If it was in finished, moves it back to reading at 0%.
   */
  const startReading = useCallback((book) => {
    update((lib) => {
      // Already reading? no-op
      if (lib.reading.some((b) => b.id === book.id)) return lib;
      // Remove from finished if re-reading
      lib.finished = lib.finished.filter((b) => b.id !== book.id);
      lib.reading.unshift({
        ...bookSnapshot(book),
        progress:  0,
        startedAt: Date.now(),
        lastReadAt: Date.now(),
      });
      return lib;
    });
  }, [update]);

  /** Update reading progress (0–100). Auto-moves to finished at 100. */
  const updateProgress = useCallback((bookId, percent) => {
    const clamped = Math.min(100, Math.max(0, Math.round(percent)));
    update((lib) => {
      const idx = lib.reading.findIndex((b) => b.id === bookId);
      if (idx === -1) return lib;
      if (clamped >= 100) {
        const book = { ...lib.reading[idx], finishedAt: Date.now() };
        lib.reading.splice(idx, 1);
        if (!lib.finished.some((b) => b.id === bookId)) lib.finished.unshift(book);
      } else {
        lib.reading[idx] = { ...lib.reading[idx], progress: clamped, lastReadAt: Date.now() };
      }
      return lib;
    });
  }, [update]);

  /** Manually mark a book as finished. */
  const markFinished = useCallback((bookId) => {
    updateProgress(bookId, 100);
  }, [updateProgress]);

  /** Remove a book from the reading list entirely. */
  const removeFromReading = useCallback((bookId) => {
    update((lib) => {
      lib.reading = lib.reading.filter((b) => b.id !== bookId);
      return lib;
    });
  }, [update]);

  /** Remove a book from finished. */
  const removeFromFinished = useCallback((bookId) => {
    update((lib) => {
      lib.finished = lib.finished.filter((b) => b.id !== bookId);
      return lib;
    });
  }, [update]);

  // ── Selectors ────────────────────────────────────────────────────────────────

  const isSaved    = useCallback((id) => library.saved.some((b) => b.id === id),    [library.saved]);
  const isReading  = useCallback((id) => library.reading.some((b) => b.id === id),  [library.reading]);
  const isFinished = useCallback((id) => library.finished.some((b) => b.id === id), [library.finished]);

  const getProgress = useCallback(
    (id) => library.reading.find((b) => b.id === id)?.progress ?? 0,
    [library.reading],
  );

  // ── Context value ─────────────────────────────────────────────────────────────

  const value = {
    // Raw lists
    savedBooks:    library.saved,
    readingBooks:  library.reading,
    finishedBooks: library.finished,
    // Stats
    totalBooks: library.saved.length + library.reading.length + library.finished.length,
    readingCount: library.reading.length,
    // Actions
    saveBook,
    unsaveBook,
    startReading,
    updateProgress,
    markFinished,
    removeFromReading,
    removeFromFinished,
    // Selectors
    isSaved,
    isReading,
    isFinished,
    getProgress,
    // Guard: is the library feature unlocked?
    libraryUnlocked: isLoggedIn && isSubscribed,
  };

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useLibrary() {
  const ctx = useContext(LibraryContext);
  if (!ctx) throw new Error('useLibrary must be used inside <LibraryProvider>');
  return ctx;
}
