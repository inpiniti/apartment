import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import './App.css';

// 키패드 레이아웃
const PIN_KEYS = [
  ["1","2","3"],
  ["4","5","6"],
  ["7","8","9"],
  ["","0","del"],
];
const CORRECT_PIN = "1357";

function PinLock({ onUnlock }) {
  const meta = window.COMPLEX_META || {};
  const [digits, setDigits] = useState([]);
  const [shake, setShake] = useState(false);

  const handleKey = useCallback((key) => {
    if (key === "del") {
      setDigits(d => d.slice(0, -1));
      return;
    }
    if (digits.length >= 4) return;
    const next = [...digits, key];
    setDigits(next);

    if (next.length === 4) {
      const entered = next.join("");
      if (entered === CORRECT_PIN) {
        // 짧은 지연 후 언락 — 마지막 점 채워지는 애니메이션 보일 시간
        setTimeout(() => {
          sessionStorage.setItem("auth", "1");
          onUnlock();
        }, 300);
      } else {
        // 틀릸 경우: 흔들림 후 재입력
        setShake(true);
        setTimeout(() => {
          setShake(false);
          setDigits([]);
        }, 600);
      }
    }
  }, [digits, onUnlock]);

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 999,
      background: "#faf9f6",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      gap: 0,
      padding: "env(safe-area-inset-top) 0 env(safe-area-inset-bottom) 0",
    }}>
      {/* 상단: 로고 + 타이틀 */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 14, marginBottom: 44 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 16,
          background: "linear-gradient(135deg, oklch(0.32 0.06 35) 0%, oklch(0.22 0.04 30) 100%)",
          color: "#fff", fontSize: 22, fontWeight: 800,
          display: "flex", alignItems: "center", justifyContent: "center",
          letterSpacing: -0.5,
          boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
        }}>파</div>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 17, fontWeight: 800, color: "#1a1a1a", letterSpacing: -0.4 }}>
            {meta.name || "검단 파라곤"}
          </div>
          <div style={{ fontSize: 12.5, color: "#8a857d", marginTop: 3 }}>
            계약자 라운지
          </div>
        </div>
      </div>

      {/* PIN 도트 */}
      <div className={shake ? "pin-dots pin-shake" : "pin-dots"} style={{
        display: "flex", gap: 18, marginBottom: 40,
      }}>
        {[0,1,2,3].map(i => (
          <div key={i} style={{
            width: 12, height: 12, borderRadius: 999,
            background: i < digits.length
              ? "oklch(0.32 0.06 35)"
              : "rgba(0,0,0,0.12)",
            transition: "background 0.15s ease, transform 0.15s ease",
            transform: i < digits.length ? "scale(1.15)" : "scale(1)",
          }} />
        ))}
      </div>

      {/* 숫자 패드 */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {PIN_KEYS.map((row, ri) => (
          <div key={ri} style={{ display: "flex", gap: 20, justifyContent: "center" }}>
            {row.map((key, ki) => {
              if (key === "") return <div key={ki} style={{ width: 72, height: 72 }} />;
              return (
                <button
                  key={ki}
                  onClick={() => handleKey(key)}
                  className="pin-btn"
                  style={{
                    width: 72, height: 72, borderRadius: 999,
                    border: "none", cursor: "pointer",
                    background: key === "del" ? "transparent" : "#fff",
                    boxShadow: key === "del" ? "none" : "0 1px 0 rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.05)",
                    display: "flex", flexDirection: "column",
                    alignItems: "center", justifyContent: "center",
                    gap: 1,
                    transition: "transform 0.1s ease, box-shadow 0.1s ease",
                  }}
                >
                  {key === "del" ? (
                    <svg width="22" height="16" viewBox="0 0 24 18" fill="none">
                      <path d="M9 3H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H9l-7-6 7-6z" stroke="#8a857d" strokeWidth="1.8" strokeLinejoin="round"/>
                      <path d="M14 7l-4 4M10 7l4 4" stroke="#8a857d" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                  ) : (
                    <span style={{ fontSize: 26, fontWeight: 600, color: "#1a1a1a", lineHeight: 1 }}>{key}</span>
                  )}
                </button>
              );
            })}
          </div>
        ))}
      </div>

      {/* 하단 안내 */}
      <div style={{ marginTop: 36, fontSize: 12, color: "#a8a39a" }}>4자리 비번을 입력하세요</div>
    </div>
  );
}

// 검단 파라곤 계약자 라운지 — 데일리 브리핑
const Icon = {
  chev: (s = 18, c = "currentColor", dir = "left") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" style={{ transform: dir === "right" ? "scaleX(-1)" : "none" }}>
      <path d="M14 6l-7 6 7 6" stroke={c} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  cal: (s = 16, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <rect x="3.5" y="5.5" width="17" height="15" rx="2" stroke={c} strokeWidth="1.6"/>
      <path d="M3.5 10h17M8 3v4M16 3v4" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
  reply: (s = 14, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M4 6h14a3 3 0 0 1 3 3v8H8l-4 4V6z" stroke={c} strokeWidth="1.7" strokeLinejoin="round"/>
    </svg>
  ),
  pin: (s = 12, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
      <path d="M14 2l8 8-5 1-4 4-1 5-3-3-6 6 1-7 6-6 4-4 0-4z"/>
    </svg>
  ),
  spark: (s = 13, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill={c}>
      <path d="M12 2l2.5 6.5L21 11l-6.5 2.5L12 20l-2.5-6.5L3 11l6.5-2.5L12 2z"/>
    </svg>
  ),
  close: (s = 18, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path d="M6 6l12 12M18 6L6 18" stroke={c} strokeWidth="1.9" strokeLinecap="round"/>
    </svg>
  ),
  users: (s = 14, c = "currentColor") => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <circle cx="9" cy="9" r="3.5" stroke={c} strokeWidth="1.6"/>
      <path d="M3 19c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
      <path d="M16 5a3 3 0 1 1 0 6M21 19c0-3-2-5.5-5-6" stroke={c} strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  ),
};

const moodOf = (m) => ({
  "활발": "oklch(0.55 0.13 35)",
  "들뜸": "oklch(0.6 0.13 80)",
  "진지": "oklch(0.5 0.08 240)",
  "예민": "oklch(0.55 0.12 15)",
}[m] || "#666");

function DateControl({ days, idx, setIdx }) {
  const day = days[idx];
  const canPrev = idx < days.length - 1;
  const canNext = idx > 0;

  return (
    <div style={{
      display: "flex", alignItems: "center", gap: 4,
      background: "#fff",
      borderRadius: 14,
      padding: "6px 6px 6px 8px",
      boxShadow: "0 1px 2px rgba(0,0,0,0.04), 0 0 0 0.5px rgba(0,0,0,0.06)",
      flexShrink: 0, whiteSpace: "nowrap",
    }}>
      <span style={{ color: "#a8a39a", marginRight: 2 }}>{Icon.cal(15)}</span>
      <button
        onClick={() => canPrev && setIdx(idx + 1)}
        disabled={!canPrev}
        style={{
          width: 32, height: 32, borderRadius: 10, border: "none",
          background: "transparent", cursor: canPrev ? "pointer" : "not-allowed",
          color: canPrev ? "#1a1a1a" : "#d4d0c8",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >{Icon.chev(16, "currentColor", "left")}</button>
      <div style={{
        minWidth: 132, textAlign: "center",
        fontSize: 14.5, fontWeight: 700, color: "#1a1a1a",
        fontFeatureSettings: '"tnum"', letterSpacing: -0.2,
        whiteSpace: "nowrap",
      }}>
        <span>{day.date.replaceAll("-", ".")}</span>
        <span style={{ color: "#a8a39a", fontWeight: 500, marginLeft: 8 }}>{day.dow}</span>
      </div>
      <button
        onClick={() => canNext && setIdx(idx - 1)}
        disabled={!canNext}
        style={{
          width: 32, height: 32, borderRadius: 10, border: "none",
          background: "transparent", cursor: canNext ? "pointer" : "not-allowed",
          color: canNext ? "#1a1a1a" : "#d4d0c8",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >{Icon.chev(16, "currentColor", "right")}</button>
    </div>
  );
}

function DateRail({ days, idx, setIdx }) {
  return (
    <div className="date-rail">
      {days.map((d, i) => (
        <button key={d.date} onClick={() => setIdx(i)}
          style={{
            border: "none", cursor: "pointer", background: "transparent",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 5,
            padding: "4px 6px",
            flexShrink: 0,
          }}>
          <div style={{
            width: i === idx ? 24 : 6, height: 6, borderRadius: 999,
            background: i === idx ? moodOf(d.mood) : "#d4d0c8",
            transition: "all 0.25s cubic-bezier(0.32, 0.72, 0, 1)",
          }}/>
          <span style={{
            fontSize: 10.5, fontWeight: i === idx ? 700 : 500,
            color: i === idx ? "#1a1a1a" : "#a8a39a",
            fontFeatureSettings: '"tnum"',
            whiteSpace: "nowrap",
          }}>{d.date.slice(5).replace("-", "/")}</span>
        </button>
      ))}
    </div>
  );
}

function TopicCard({ topic, onOpen }) {
  const CATEGORY_STYLES = window.CATEGORY_STYLES || {};
  const cat = CATEGORY_STYLES[topic.category] || { fg: "#666", bg: "#eee" };
  return (
    <button
      onClick={onOpen}
      style={{
        textAlign: "left", border: "none", cursor: "pointer",
        background: "#fff",
        borderRadius: 18,
        padding: "18px 20px",
        boxShadow: "0 1px 0 rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03), 0 0 0 0.5px rgba(0,0,0,0.04)",
        display: "flex", flexDirection: "column", gap: 8,
        transition: "transform 0.15s, box-shadow 0.15s",
        font: "inherit",
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.06), 0 0 0 0.5px rgba(0,0,0,0.06)";
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "none";
        e.currentTarget.style.boxShadow = "0 1px 0 rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.03), 0 0 0 0.5px rgba(0,0,0,0.04)";
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{
          fontSize: 11, fontWeight: 700, letterSpacing: 0.2,
          padding: "4px 9px", borderRadius: 999,
          color: cat.fg, background: cat.bg,
          whiteSpace: "nowrap", flexShrink: 0,
        }}>{topic.category}</span>
        {topic.pinned && (
          <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 11, color: "#9a6a3a", fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0 }}>
            {Icon.pin(11, "#c08a4a")} HOT
          </span>
        )}
        <div style={{ flex: 1 }} />
        <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 12, color: "#a8a39a", fontFeatureSettings: '"tnum"', whiteSpace: "nowrap", flexShrink: 0 }}>
          {Icon.reply(13, "#c2bdb4")} {topic.replies}
        </span>
      </div>
      <div style={{ fontSize: 16.5, fontWeight: 700, color: "#1a1a1a", lineHeight: 1.35, letterSpacing: -0.2 }}>
        {topic.subject}
      </div>
      <div style={{ fontSize: 14, color: "#5a5754", lineHeight: 1.55, textWrap: "pretty" }}>
        {topic.summary}
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
        {topic.tags.map(t => (
          <span key={t} style={{
            fontSize: 11.5, color: "#7a766f", background: "#f5f3ed",
            padding: "3px 8px", borderRadius: 999,
            whiteSpace: "nowrap",
          }}>#{t}</span>
        ))}
      </div>
    </button>
  );
}

function TopicDetail({ topic, day, onClose }) {
  const CATEGORY_STYLES = window.CATEGORY_STYLES || {};
  const cat = CATEGORY_STYLES[topic.category] || { fg: "#666", bg: "#eee" };
  useEffect(() => {
    const onKey = e => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const comments = topic.comments || [];

  return (
    <div onClick={onClose} style={{
      position: "fixed", inset: 0, zIndex: 100,
      background: "rgba(20, 18, 14, 0.45)",
      backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)",
      display: "flex", alignItems: "flex-end", justifyContent: "center",
      animation: "fadeIn 0.2s ease",
      padding: 16,
    }}>
      <div onClick={e => e.stopPropagation()} className="td-sheet" style={{
        background: "#faf9f6",
        borderRadius: 24,
        width: "100%",
        maxWidth: 720,
        maxHeight: "calc(100vh - 32px - env(safe-area-inset-bottom))",
        overflow: "hidden",
        display: "flex", flexDirection: "column",
        boxShadow: "0 20px 60px rgba(0,0,0,0.18)",
        animation: "slideUp 0.28s cubic-bezier(0.32, 0.72, 0, 1)",
      }}>
        <div style={{
          display: "flex", alignItems: "center", padding: "14px 14px 14px 22px",
          borderBottom: "0.5px solid rgba(0,0,0,0.06)",
        }}>
          <span style={{ fontSize: 12, color: "#8a857d", fontFeatureSettings: '"tnum"' }}>
            {day.date.replaceAll("-", ".")} · {day.dow}
          </span>
          <div style={{ flex: 1 }}/>
          <button onClick={onClose} style={{
            width: 34, height: 34, borderRadius: 999, border: "none", cursor: "pointer",
            background: "#f0ede5", color: "#5a5754",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>{Icon.close(16)}</button>
        </div>

        <div style={{ overflow: "auto", flex: 1 }}>
          <div style={{ padding: "20px 24px 8px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <span style={{
                fontSize: 11, fontWeight: 700, padding: "4px 9px", borderRadius: 999,
                color: cat.fg, background: cat.bg,
                whiteSpace: "nowrap", flexShrink: 0,
              }}>{topic.category}</span>
              {topic.pinned && (
                <span style={{ display: "inline-flex", alignItems: "center", gap: 3, fontSize: 11, color: "#9a6a3a", fontWeight: 700, whiteSpace: "nowrap", flexShrink: 0 }}>
                  {Icon.pin(11, "#c08a4a")} HOT
                </span>
              )}
              <span style={{ fontSize: 12, color: "#a8a39a", marginLeft: "auto", whiteSpace: "nowrap" }}>댓글 {topic.replies}</span>
            </div>
            <h2 style={{
              fontSize: 22, fontWeight: 800, color: "#1a1a1a",
              lineHeight: 1.3, letterSpacing: -0.5, margin: "0 0 16px",
              textWrap: "balance",
            }}>{topic.subject}</h2>

            <div style={{
              background: "linear-gradient(135deg, oklch(0.97 0.02 35), oklch(0.98 0.015 60))",
              border: "0.5px solid oklch(0.85 0.04 35)",
              borderRadius: 16, padding: "14px 16px", marginBottom: 16,
            }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 6, marginBottom: 8,
                fontSize: 11, fontWeight: 700, color: "oklch(0.45 0.13 35)", letterSpacing: 0.6,
              }}>
                {Icon.spark(13, "oklch(0.55 0.13 35)")} 데일리 요약
              </div>
              <div style={{ fontSize: 14.5, color: "#3d3a36", lineHeight: 1.65, textWrap: "pretty" }}>
                {topic.detail}
              </div>
            </div>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {topic.tags.map(t => (
                <span key={t} style={{
                  fontSize: 12, color: "#5a5754", background: "#fff",
                  padding: "5px 10px", borderRadius: 999,
                  border: "0.5px solid rgba(0,0,0,0.06)",
                  whiteSpace: "nowrap",
                }}>#{t}</span>
              ))}
            </div>
          </div>

          <div style={{ background: "#fff", padding: "20px 24px", marginTop: 16 }}>
            <div style={{ fontSize: 13.5, fontWeight: 700, color: "#1a1a1a", marginBottom: 14, letterSpacing: -0.2 }}>
              라운지 반응 <span style={{ color: "#a8a39a", fontWeight: 500 }}>· {topic.replies}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              {comments.map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 12 }}>
                  <div style={{
                    width: 34, height: 34, borderRadius: 999, flexShrink: 0,
                    background: ["oklch(0.85 0.06 35)","oklch(0.85 0.06 145)","oklch(0.85 0.04 240)"][i],
                    color: "#fff", fontSize: 13, fontWeight: 700,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>{c.initial}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "baseline", marginBottom: 3 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: "#1a1a1a" }}>{c.name}</span>
                      <span style={{ fontSize: 11, color: "#a8a39a" }}>{c.time}</span>
                    </div>
                    <div style={{ fontSize: 13.5, color: "#3d3a36", lineHeight: 1.55 }}>{c.text}</div>
                  </div>
                </div>
              ))}
            </div>
            <div style={{
              marginTop: 18, padding: "10px 14px", borderRadius: 999,
              background: "#f1efe9", fontSize: 13, color: "#a8a39a",
            }}>댓글을 남겨보세요…</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  // 세션 단위 인증 체크
  const [authed, setAuthed] = useState(() => sessionStorage.getItem("auth") === "1");

  if (!authed) {
    return <PinLock onUnlock={() => setAuthed(true)} />;
  }

  return <AuthedApp />;
}

function AuthedApp() {
  const days = window.BRIEFING_DATA || [];
  const [idx, setIdx] = useState(0);
  const [openTopic, setOpenTopic] = useState(null);
  // 모바일 스크롤 감지 — 헤더 콘텐츠 전환용 (opacity/transform만 바꿈, position 변경 없음)
  const [scrolled, setScrolled] = useState(false);
  // DateRail 표시/숨김 — 스크롤 방향 감지
  const [railVisible, setRailVisible] = useState(true);
  // DateRail 구분선 표시용
  const [railPast, setRailPast] = useState(false);
  const sentinelRef = React.useRef(null);
  const lastScrollYRef = React.useRef(0);

  const day = days[idx];
  const meta = window.COMPLEX_META || {};
  const moodColor = moodOf(day?.mood || "진지");

  useEffect(() => {
    const isMobile = () => window.innerWidth <= 600;
    const onScroll = () => {
      if (!isMobile()) return;
      const currentY = window.scrollY;
      const delta = currentY - lastScrollYRef.current;

      // 헤더 타이틀 전환 (opacity/transform만)
      setScrolled(currentY > 60);

      // DateRail 방향별 표시/숨김
      // 상단 100px 이내에서는 항상 표시
      if (currentY < 100) {
        setRailVisible(true);
      } else if (Math.abs(delta) > 4) {
        // 위로 스크롤(delta < 0) → 표시, 아래로 스크롤 → 숨김
        setRailVisible(delta < 0);
      }

      lastScrollYRef.current = currentY;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    // IntersectionObserver로 sentinel이 뷰포트 위로 사라지면 railPast=true
    // → position 변경 없이 border/bg만 추가
    const el = sentinelRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (window.innerWidth > 600) return;
        setRailPast(!entry.isIntersecting);
      },
      { rootMargin: "-64px 0px 0px 0px", threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (!day) return <div>Loading...</div>;

  const totalReplies = day.topics.reduce((s, t) => s + t.replies, 0);

  return (
    <div style={{ minHeight: "100vh", background: "#faf9f6" }}>
      {/* ── 메인 헤더 ── */}
      <header style={{
        position: "sticky", top: 0, zIndex: 20,
        background: "rgba(250, 249, 246, 0.92)",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
        borderBottom: "0.5px solid rgba(0,0,0,0.05)",
      }}>
        <div className="container" style={{
          maxWidth: 880, margin: "0 auto",
          padding: "16px 20px 14px",
          display: "flex", alignItems: "center", gap: 16,
        }}>
          {/* 아이콘 — 항상 표시 */}
          <div style={{
            width: 38, height: 38, borderRadius: 12, flexShrink: 0,
            background: "linear-gradient(135deg, oklch(0.32 0.06 35) 0%, oklch(0.22 0.04 30) 100%)",
            color: "#fff", fontSize: 15, fontWeight: 800,
            display: "flex", alignItems: "center", justifyContent: "center",
            letterSpacing: -0.5,
          }}>파</div>

          {/* 데스크탑: 항상 단지명 표시 */}
          <div className="header-title-desktop" style={{ flex: "1 1 auto", minWidth: 0 }}>
            <div style={{ fontSize: 15.5, fontWeight: 800, color: "#1a1a1a", letterSpacing: -0.4, lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {meta.name} <span style={{ color: "#a8a39a", fontWeight: 600 }}>· 계약자 라운지</span>
            </div>
            <div style={{ fontSize: 11.5, color: "#8a857d", marginTop: 2, display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
              {Icon.users(11, "#a8a39a")} 계약자 {meta.members?.toLocaleString()}명 · 입주 {meta.moveIn}
            </div>
          </div>

          {/* 모바일: 고정 높이 래퍼 안에서 두 콘텐츠를 absolute로 겹쳐 opacity만 전환
               → position 변경 없으므로 레이아웃 리플로우/스크롤 점프 없음 */}
          <div className="header-title-mobile" style={{
            flex: "1 1 auto", minWidth: 0,
            position: "relative", height: 40, overflow: "hidden",
          }}>
            {/* 단지명 (스크롤 위) */}
            <div style={{
              position: "absolute", inset: 0,
              transition: "opacity 0.22s ease, transform 0.22s ease",
              opacity: scrolled ? 0 : 1,
              transform: scrolled ? "translateY(-6px)" : "translateY(0)",
              pointerEvents: scrolled ? "none" : "auto",
            }}>
              <div style={{ fontSize: 15.5, fontWeight: 800, color: "#1a1a1a", letterSpacing: -0.4, lineHeight: 1.2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                {meta.name} <span style={{ color: "#a8a39a", fontWeight: 600 }}>· 계약자 라운지</span>
              </div>
              <div style={{ fontSize: 11.5, color: "#8a857d", marginTop: 2, display: "flex", alignItems: "center", gap: 6, whiteSpace: "nowrap" }}>
                {Icon.users(11, "#a8a39a")} 계약자 {meta.members?.toLocaleString()}명 · 입주 {meta.moveIn}
              </div>
            </div>
            {/* 날짜 요약 (스크롤 아래) */}
            <div style={{
              position: "absolute", inset: 0,
              transition: "opacity 0.22s ease, transform 0.22s ease",
              opacity: scrolled ? 1 : 0,
              transform: scrolled ? "translateY(0)" : "translateY(8px)",
              pointerEvents: scrolled ? "auto" : "none",
            }}>
              <div style={{
                fontSize: 13, fontWeight: 700, color: "#1a1a1a",
                letterSpacing: -0.3, lineHeight: 1.25,
                whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
              }}>
                {day.headline}
              </div>
              <div style={{ fontSize: 11, color: "#8a857d", marginTop: 3, display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" }}>
                <span>{day.date.replaceAll("-", ".")} {day.dow}요일</span>
                <span style={{ color: "#d4d0c8" }}>·</span>
                <span>토픽 {day.topics.length}개</span>
                <span style={{ color: "#d4d0c8" }}>·</span>
                <span>댓글 {totalReplies}</span>
              </div>
            </div>
          </div>

          {/* 날짜 컨트롤 — 데스크탑만 */}
          <div className="header-date-control">
            <DateControl days={days} idx={idx} setIdx={setIdx} />
          </div>
        </div>
      </header>

      {/* ── 모바일 전용 DateRail sticky 바 ──
           position은 CSS에서 항상 sticky로 고정.
           JS는 border/bg 같은 시각 스타일만 바꿈 → 레이아웃 리플로우 없음 */}
      <div
        className="mobile-rail-bar"
        style={{
          /* 배경은 항상 불투명 — 스크롤 시 콘텐츠가 비쳐 보이지 않도록 */
          background: "#faf9f6",
          /* 구분선은 sticky 고정된 이후에만 표시 */
          borderBottom: railPast ? "0.5px solid rgba(0,0,0,0.10)" : "0.5px solid transparent",
          /* 스크롤 방향에 따라 슬라이드 인/아웃 */
          transform: railVisible ? "translateY(0)" : "translateY(-100%)",
          transition: "transform 0.28s cubic-bezier(0.32, 0.72, 0, 1), border-color 0.2s",
          padding: "4px 20px 6px",
        }}
      >
        {/* IntersectionObserver 감지 sentinel — 높이 0, 레이아웃 영향 없음 */}
        <div ref={sentinelRef} style={{ height: 0 }} />
        <DateRail days={days} idx={idx} setIdx={setIdx} />
      </div>

      <main className="container" style={{ maxWidth: 880, margin: "0 auto", padding: "0 20px calc(60px + env(safe-area-inset-bottom))" }}>
        <div key={day.date} style={{
          animation: "fadeSlide 0.3s cubic-bezier(0.32, 0.72, 0, 1)",
          paddingTop: 24,
        }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: 12, flexWrap: "wrap", marginBottom: 8 }}>
            <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1.5, color: moodColor, whiteSpace: "nowrap" }}>
              {day.label} · {day.mood}
            </div>
            <div style={{ flex: 1 }} />
            <div style={{ fontSize: 12, color: "#8a857d", whiteSpace: "nowrap" }}>
              토픽 {day.topics.length}개 · 댓글 {totalReplies}
            </div>
          </div>
          <h1 style={{
            fontSize: "clamp(24px, 4vw, 34px)", fontWeight: 800, color: "#1a1a1a",
            letterSpacing: -0.7, lineHeight: 1.25, margin: "0 0 6px",
            textWrap: "balance",
          }}>
            {day.headline}
          </h1>
          <div style={{ fontSize: 13.5, color: "#8a857d" }}>
            {day.date.replaceAll("-", ".")} {day.dow}요일
          </div>

          {/* 데스크탑 전용 DateRail */}
          <div className="desktop-rail">
            <DateRail days={days} idx={idx} setIdx={setIdx} />
          </div>

          <div className="topic-grid" style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 12,
            marginTop: 28,
          }}>
            {day.topics.map(t => (
              <TopicCard key={t.id} topic={t} onOpen={() => setOpenTopic(t)} />
            ))}
          </div>
        </div>
      </main>

      {openTopic && (
        <TopicDetail topic={openTopic} day={day} onClose={() => setOpenTopic(null)} />
      )}
    </div>
  );
}

export default App;


