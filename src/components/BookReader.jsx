import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import * as pdfjsLib from "pdfjs-dist";
import pdfWorker from "pdfjs-dist/build/pdf.worker.mjs?url";
import {
  FiArrowLeft,
  FiBookOpen,
  FiChevronLeft,
  FiChevronRight,
  FiLock,
  FiMaximize2,
  FiMinimize2,
  FiMinus,
  FiPlus,
} from "react-icons/fi";
import { books } from "../data/booksData";
import { useAuth } from "../context/AuthContext";
import { useLibrary } from "../context/LibraryContext";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export default function BookReader() {
  const { id } = useParams();
  const navigate = useNavigate();
  const readerRef = useRef(null);
  const pageShellRef = useRef(null);
  const canvasScrollerRef = useRef(null);
  const canvasRef = useRef(null);
  const renderTaskRef = useRef(null);
  const cacheRef = useRef(new Map());
  const documentRef = useRef(null);

  const { isLoggedIn, isSubscribed, openAuthModal, openSubGate } = useAuth();
  const { startReading, updateProgress, getProgress } = useLibrary();
  const book = useMemo(
    () => Object.values(books).find((item) => String(item?.id) === String(id)),
    [id],
  );
  const savedProgress = getProgress(book?.id);
  const fallbackPages = Math.max(1, book?.readerPages || book?.pages || 1);
  const initialPage = useMemo(
    () => clamp(Math.max(1, Math.round((savedProgress / 100) * fallbackPages)), 1, fallbackPages),
    [savedProgress, fallbackPages],
  );

  const [pdfDoc, setPdfDoc] = useState(null);
  const [totalPages, setTotalPages] = useState(fallbackPages);
  const [page, setPage] = useState(initialPage);
  const [direction, setDirection] = useState("next");
  const [isTurning, setIsTurning] = useState(false);
  const [flipSnapshot, setFlipSnapshot] = useState("");
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoadingPage, setIsLoadingPage] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [stageSize, setStageSize] = useState({ width: 760, height: 980 });
  const [zoom, setZoom] = useState(1);

  const canRead = isLoggedIn && isSubscribed;
  const progress = Math.round((page / totalPages) * 100);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (!book || !canRead) return;
    startReading(book);
  }, [book, canRead, startReading]);

  useEffect(() => {
    if (!book || !canRead) return;
    updateProgress(book.id, progress);
  }, [book, canRead, progress, updateProgress]);

  useEffect(() => {
    if (!canRead || !book?.pdf) return undefined;
    let cancelled = false;
    const resetFrame = window.requestAnimationFrame(() => {
      if (cancelled) return;
      setLoadError("");
      setIsLoadingPage(true);
    });
    cacheRef.current.clear();

    pdfjsLib.getDocument({ url: book.pdf }).promise
      .then((doc) => {
        if (cancelled) {
          doc.destroy();
          return;
        }
        documentRef.current = doc;
        setPdfDoc(doc);
        setTotalPages(doc.numPages);
        setPage((current) => clamp(current, 1, doc.numPages));
      })
      .catch(() => {
        if (!cancelled) setLoadError("This book could not be opened. Please try again.");
      });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(resetFrame);
      renderTaskRef.current?.cancel?.();
      documentRef.current?.destroy?.();
      documentRef.current = null;
      setPdfDoc(null);
    };
  }, [book?.pdf, canRead]);

  useEffect(() => {
    if (!pageShellRef.current) return undefined;
    const observer = new ResizeObserver(([entry]) => {
      const rect = entry.contentRect;
      const nextSize = {
        width: Math.max(320, Math.floor(rect.width)),
        height: Math.max(420, Math.floor(rect.height)),
      };
      setStageSize((current) => {
        if (current.width === nextSize.width && current.height === nextSize.height) {
          return current;
        }
        return nextSize;
      });
    });
    observer.observe(pageShellRef.current);
    return () => observer.disconnect();
  }, []);

  const renderPage = useCallback(async (targetPage, { preload = false } = {}) => {
    if (!pdfDoc || !canvasRef.current) return;
    const isCompact = stageSize.width < 640;
    const cacheKey = `${targetPage}:${stageSize.width}x${stageSize.height}:${zoom.toFixed(2)}:${isCompact ? "mobile" : "desktop"}`;
    const cached = cacheRef.current.get(cacheKey);
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d", { alpha: false });

    if (cached) {
      if (!preload && cached.bitmap) {
        canvas.width = cached.width;
        canvas.height = cached.height;
        canvas.style.width = `${cached.cssWidth}px`;
        canvas.style.height = `${cached.cssHeight}px`;
        context.drawImage(cached.bitmap, 0, 0);
        setIsLoadingPage(false);
        canvasScrollerRef.current?.scrollTo({ top: 0, left: 0 });
      }
      return;
    }

    if (!preload) {
      setIsLoadingPage(true);
      renderTaskRef.current?.cancel?.();
    }

    const pdfPage = await pdfDoc.getPage(targetPage);
    const baseViewport = pdfPage.getViewport({ scale: 1 });
    const maxWidth = stageSize.width - (isCompact ? 12 : 28);
    const maxHeight = stageSize.height - (isCompact ? 12 : 28);
    const widthFitScale = maxWidth / baseViewport.width;
    const fitScale = isCompact
      ? widthFitScale * zoom
      : Math.min(widthFitScale, maxHeight / baseViewport.height) * zoom;
    const outputScale = Math.min(window.devicePixelRatio || 1, 2);
    const viewport = pdfPage.getViewport({ scale: fitScale * outputScale });
    const cssWidth = Math.floor(viewport.width / outputScale);
    const cssHeight = Math.floor(viewport.height / outputScale);

    const renderCanvas = preload ? document.createElement("canvas") : canvas;
    renderCanvas.width = Math.floor(viewport.width);
    renderCanvas.height = Math.floor(viewport.height);

    if (!preload) {
      canvas.style.width = `${cssWidth}px`;
      canvas.style.height = `${cssHeight}px`;
    }

    const renderContext = renderCanvas.getContext("2d", { alpha: false });
    const renderTask = pdfPage.render({ canvasContext: renderContext, viewport });
    if (!preload) renderTaskRef.current = renderTask;
    await renderTask.promise;

    const bitmap = await createImageBitmap(renderCanvas);
    cacheRef.current.set(cacheKey, {
      bitmap,
      width: renderCanvas.width,
      height: renderCanvas.height,
      cssWidth,
      cssHeight,
    });

    if (!preload) {
      context.drawImage(bitmap, 0, 0);
      setIsLoadingPage(false);
      canvasScrollerRef.current?.scrollTo({ top: 0, left: 0 });
    }
  }, [pdfDoc, stageSize.height, stageSize.width, zoom]);

  const changeZoom = useCallback((step) => {
    setZoom((current) => Number(clamp(current + step, 0.5, 2.4).toFixed(2)));
  }, []);

  useEffect(() => {
    if (!pdfDoc || !canRead) return;
    const renderFrame = window.requestAnimationFrame(() => {
      renderPage(page).catch((error) => {
        if (error?.name !== "RenderingCancelledException") {
          setLoadError("This page could not be rendered. Please try again.");
          setIsLoadingPage(false);
        }
      });
    });
    return () => window.cancelAnimationFrame(renderFrame);
  }, [canRead, page, pdfDoc, renderPage]);

  useEffect(() => {
    if (!pdfDoc || !canRead) return;
    [page + 1, page - 1].forEach((candidate) => {
      if (candidate >= 1 && candidate <= totalPages) {
        renderPage(candidate, { preload: true }).catch(() => {});
      }
    });
  }, [canRead, page, pdfDoc, renderPage, totalPages]);

  const beginPageTurn = useCallback((nextDirection) => {
    const canvas = canvasRef.current;
    if (canvas?.width && canvas?.height) {
      setFlipSnapshot(canvas.toDataURL("image/jpeg", 0.86));
    }
    setDirection(nextDirection);
    setIsTurning(true);
    window.setTimeout(() => {
      setIsTurning(false);
      setFlipSnapshot("");
    }, 720);
  }, []);

  const turnPage = useCallback((step) => {
    setPage((current) => {
      const nextPage = clamp(current + step, 1, totalPages);
      if (nextPage === current) return current;
      beginPageTurn(step > 0 ? "next" : "prev");
      return nextPage;
    });
  }, [beginPageTurn, totalPages]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      const key = typeof event.key === "string" ? event.key.toLowerCase() : "";
      if ((event.ctrlKey || event.metaKey) && (key === "s" || key === "p")) {
        event.preventDefault();
      }
      if (!canRead) return;
      if (event.key === "ArrowRight") turnPage(1);
      if (event.key === "ArrowLeft") turnPage(-1);
      if ((event.ctrlKey || event.metaKey) && (key === "+" || key === "=")) {
        event.preventDefault();
        changeZoom(0.15);
      }
      if ((event.ctrlKey || event.metaKey) && key === "-") {
        event.preventDefault();
        changeZoom(-0.15);
      }
      if (event.key === "Escape" && document.fullscreenElement) {
        document.exitFullscreen();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [canRead, changeZoom, turnPage]);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, []);

  const toggleFullscreen = async () => {
    if (!readerRef.current) return;
    if (document.fullscreenElement) {
      await document.exitFullscreen();
    } else {
      await readerRef.current.requestFullscreen();
    }
  };

  if (!book) {
    return (
      <main className="reader-page reader-empty">
        <h1>Book not found</h1>
        <button className="reader-gold-btn" onClick={() => navigate("/")}>Back to Books</button>
      </main>
    );
  }

  if (!canRead) {
    return (
      <main className="reader-page reader-gate">
        <div className="reader-gate-card">
          <FiLock size={34} />
          <h1>{isLoggedIn ? "Subscription required" : "Sign in to read"}</h1>
          <p>
            This reader is available only for subscribed users. The book opens inside the app without download controls.
          </p>
          <button className="reader-gold-btn" onClick={isLoggedIn ? openSubGate : openAuthModal}>
            {isLoggedIn ? "View Plans" : "Sign In"}
          </button>
        </div>
      </main>
    );
  }

  return (
    <main
      ref={readerRef}
      className={`reader-page ${isFullscreen ? "reader-fullscreen" : ""}`}
      onContextMenu={(event) => event.preventDefault()}
    >
      <header className="reader-topbar">
        <button className="reader-icon-btn" onClick={() => navigate(`/book/${book.id}`)} aria-label="Back to book details">
          <FiArrowLeft />
        </button>
        <div className="reader-book-heading">
          <span><FiBookOpen /> Reading now</span>
          <h1>{book.title}</h1>
        </div>
        <button className="reader-icon-btn" onClick={toggleFullscreen} aria-label="Toggle fullscreen">
          {isFullscreen ? <FiMinimize2 /> : <FiMaximize2 />}
        </button>
      </header>

      <section className="reader-stage">
        <button
          className="reader-side-btn reader-prev"
          onClick={() => turnPage(-1)}
          disabled={page === 1}
          aria-label="Previous page"
        >
          <FiChevronLeft />
        </button>

        <div
          ref={pageShellRef}
          className={`reader-book ${zoom > 1.01 ? "reader-zoomed" : ""} ${isTurning ? `is-turning turn-${direction}` : ""}`}
        >
          <div ref={canvasScrollerRef} className="reader-canvas-wrap">
            <canvas ref={canvasRef} />
            {flipSnapshot && (
              <div className="reader-flip-layer" aria-hidden="true">
                <img src={flipSnapshot} alt="" />
              </div>
            )}
            {isLoadingPage && <div className="reader-page-loader">Loading page...</div>}
            {loadError && <div className="reader-page-loader reader-page-error">{loadError}</div>}
          </div>
        </div>

        <button
          className="reader-side-btn reader-next"
          onClick={() => turnPage(1)}
          disabled={page === totalPages}
          aria-label="Next page"
        >
          <FiChevronRight />
        </button>
      </section>

      <footer className="reader-controls">
        <button onClick={() => turnPage(-1)} disabled={page === 1}>
          <FiChevronLeft /> Previous
        </button>
        <div className="reader-progress">
          <div>
            <span>Page {page} of {totalPages}</span>
            <strong>{progress}%</strong>
          </div>
          <input
            type="range"
            min="1"
            max={totalPages}
            value={page}
            onChange={(event) => {
              const nextPage = Number(event.target.value);
              beginPageTurn(nextPage > page ? "next" : "prev");
              setPage(nextPage);
            }}
            aria-label="Reader page"
          />
        </div>
        <div className="reader-zoom-controls" aria-label="Zoom controls">
          <button type="button" onClick={() => changeZoom(-0.15)} disabled={zoom <= 0.5} aria-label="Zoom out">
            <FiMinus />
          </button>
          <span>{Math.round(zoom * 100)}%</span>
          <button type="button" onClick={() => changeZoom(0.15)} disabled={zoom >= 2.4} aria-label="Zoom in">
            <FiPlus />
          </button>
        </div>
        <button onClick={() => turnPage(1)} disabled={page === totalPages}>
          Next <FiChevronRight />
        </button>
      </footer>
    </main>
  );
}
