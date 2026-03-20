"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";

/* ─── Tema com localStorage ──────────────────────────── */
function buildTokens(dark: boolean) {
  return {
    dark,
    bg:        dark ? "#0f0f10" : "#f5f5f7",
    sidebar:   dark ? "#18181b" : "#ffffff",
    card:      dark ? "#1c1c1f" : "#ffffff",
    border:    dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)",
    input:     dark ? "#232326" : "#f2f2f4",
    inputBord: dark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.1)",
    text:      dark ? "#f4f4f5" : "#111111",
    muted:     dark ? "#71717a" : "#6b7280",
    subtle:    dark ? "#3f3f46" : "#e4e4e7",
    accent:    "#f97316",
    accentBg:  dark ? "rgba(249,115,22,0.12)" : "rgba(249,115,22,0.09)",
    accentBrd: dark ? "rgba(249,115,22,0.25)" : "rgba(249,115,22,0.2)",
    navActive: dark ? "rgba(249,115,22,0.14)" : "rgba(249,115,22,0.1)",
    shadow:    dark ? "0 1px 3px rgba(0,0,0,0.5)"  : "0 1px 3px rgba(0,0,0,0.08)",
    shadowLg:  dark ? "0 8px 32px rgba(0,0,0,0.5)" : "0 8px 32px rgba(0,0,0,0.1)",
    green:     "#22c55e",
    greenBg:   dark ? "rgba(34,197,94,0.12)" : "rgba(34,197,94,0.09)",
    greenBrd:  "rgba(34,197,94,0.2)",
    red:       "#ef4444",
    redBg:     dark ? "rgba(239,68,68,0.12)"  : "rgba(239,68,68,0.07)",
    redBrd:    "rgba(239,68,68,0.2)",
    amber:     "#f59e0b",
    amberBg:   dark ? "rgba(245,158,11,0.12)" : "rgba(245,158,11,0.08)",
    amberBrd:  "rgba(245,158,11,0.2)",
  };
}

type Tokens = ReturnType<typeof buildTokens>;

function useTheme() {
  const [dark, setDarkState] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("reminder-theme");
    if (stored !== null) setDarkState(stored === "dark");
  }, []);

  function setDark(v: boolean | ((p: boolean) => boolean)) {
    setDarkState(prev => {
      const next = typeof v === "function" ? v(prev) : v;
      localStorage.setItem("reminder-theme", next ? "dark" : "light");
      return next;
    });
  }

  return { dark, setDark, t: buildTokens(dark) };
}

/* ─── Ícones ─────────────────────────────────────────── */
const Icon = {
  plus:    () => <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  trash:   () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg>,
  refresh: () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M1 4v6h6"/><path d="M3.51 15a9 9 0 1 0 .49-3"/></svg>,
  wifi:    () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.8" viewBox="0 0 24 24"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20" strokeLinecap="round" strokeWidth="2.5"/></svg>,
  phone:   () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18" strokeLinecap="round" strokeWidth="2.5"/></svg>,
  x:       () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  check:   () => <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  wa: (size = 16) => <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.17 12.17 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z"/></svg>,
};

/* ─── QR Code SVG ────────────────────────────────────── */
function QRCode({ size = 180 }: { size?: number }) {
  const S = 25;
  const cell = size / S;

  function finder(ox: number, oy: number): [number, number][] {
    const r: [number, number][] = [];
    for (let i = 0; i < 7; i++) {
      r.push([ox, oy + i], [ox + 6, oy + i]);
      if (i > 0 && i < 6) r.push([ox + i, oy], [ox + i, oy + 6]);
    }
    for (let row = 0; row < 3; row++) for (let col = 0; col < 3; col++) r.push([ox + 2 + col, oy + 2 + row]);
    return r;
  }

  const timing: [number, number][] = [];
  for (let i = 8; i <= S - 9; i++) {
    if (i % 2 === 0) timing.push([i, 6], [6, i]);
  }

  function align(cx: number, cy: number): [number, number][] {
    const r: [number, number][] = [];
    for (let row = -2; row <= 2; row++) for (let col = -2; col <= 2; col++) {
      if (Math.abs(row) === 2 || Math.abs(col) === 2 || (row === 0 && col === 0)) r.push([cx + col, cy + row]);
    }
    return r;
  }

  const data: [number, number][] = [
    [9,0],[11,0],[13,0],[15,0],[17,0],[19,0],[21,0],[23,0],
    [8,1],[10,1],[14,1],[16,1],[20,1],[22,1],[24,1],
    [9,2],[12,2],[15,2],[18,2],[21,2],[24,2],
    [8,3],[11,3],[13,3],[16,3],[19,3],[22,3],
    [10,4],[14,4],[17,4],[20,4],[23,4],
    [9,5],[12,5],[16,5],[19,5],[22,5],
    [8,7],[10,7],[13,7],[15,7],[18,7],[21,7],[23,7],
    [9,8],[11,8],[14,8],[17,8],[20,8],[24,8],
    [8,9],[12,9],[15,9],[18,9],[22,9],
    [10,10],[13,10],[16,10],[19,10],[23,10],
    [9,11],[11,11],[14,11],[17,11],[21,11],[24,11],
    [8,12],[12,12],[15,12],[18,12],[22,12],
    [0,8],[1,8],[2,8],[3,8],[4,8],[5,8],[6,8],
    [8,13],[10,13],[13,13],[16,13],[20,13],[23,13],
    [9,14],[12,14],[15,14],[19,14],[22,14],[24,14],
    [8,15],[11,15],[14,15],[17,15],[21,15],
    [10,16],[13,16],[16,16],[20,16],[23,16],
    [9,17],[12,17],[15,17],[18,17],[22,17],[24,17],
    [8,18],[11,18],[14,18],[17,18],[21,18],
    [10,19],[13,19],[16,19],[20,19],[23,19],
    [9,20],[12,20],[15,20],[19,20],[22,20],[24,20],
    [8,21],[11,21],[14,21],[17,21],[21,21],
    [10,22],[13,22],[16,22],[20,22],[23,22],
    [9,23],[12,23],[15,23],[19,23],[22,23],[24,23],
    [8,24],[11,24],[14,24],[17,24],[20,24],[23,24],
  ];

  const all: [number, number][] = [...finder(0,0),...finder(S-7,0),...finder(0,S-7),...timing,...align(S-7,S-7),...data];
  const seen = new Set<string>();
  const unique = all.filter(([x, y]) => {
    const k = `${x},${y}`;
    if (seen.has(k) || x < 0 || x >= S || y < 0 || y >= S) return false;
    seen.add(k); return true;
  });
  const pad = cell * 0.8;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ display: "block" }}>
      <rect width={size} height={size} fill="white" rx="6"/>
      {unique.map(([cx, cy], i) => (
        <rect key={i} x={cx * cell + pad/2} y={cy * cell + pad/2} width={cell - pad} height={cell - pad} rx={(cell-pad)*0.25} fill="#111827"/>
      ))}
    </svg>
  );
}

/* ─── Modal QR ───────────────────────────────────────── */
type QRStep = "scan" | "waiting" | "success";

function QRModal({ onClose, onConnected, t }: { onClose: () => void; onConnected: (n: string) => void; t: Tokens }) {
  const [step, setStep] = useState<QRStep>("scan");
  const [seconds, setSeconds] = useState(60);
  const [phoneNum, setPhoneNum] = useState("");

  useEffect(() => {
    if (step !== "scan") return;
    if (seconds === 0) { setSeconds(60); return; }
    const timer = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(timer);
  }, [step, seconds]);

  function handleSimulate() {
    setStep("waiting");
    setTimeout(() => {
      setPhoneNum("+55 (11) " + Math.floor(90000 + Math.random() * 9999) + "-" + Math.floor(1000 + Math.random() * 9000));
      setStep("success");
    }, 2200);
  }

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 16px" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }} onClick={step !== "waiting" ? onClose : undefined} />
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 440, background: t.card, border: `1px solid ${t.border}`, borderRadius: 24, overflow: "hidden", boxShadow: t.shadowLg, animation: "modalIn .25s ease both" }}>

        <div style={{ padding: "20px 24px 18px", borderBottom: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(37,211,102,0.12)", border: "1px solid rgba(37,211,102,0.22)", display: "flex", alignItems: "center", justifyContent: "center", color: "#25D366" }}>
              {Icon.wa(15)}
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: t.text, lineHeight: 1 }}>Conectar WhatsApp</p>
              <p style={{ fontSize: 11.5, color: t.muted, marginTop: 2 }}>Escaneie com seu celular</p>
            </div>
          </div>
          {step !== "waiting" && (
            <button onClick={onClose} style={{ background: t.input, border: `1px solid ${t.border}`, borderRadius: 8, padding: "5px 8px", cursor: "pointer", color: t.muted, display: "flex" }}>
              <Icon.x />
            </button>
          )}
        </div>

        <div style={{ padding: "28px 24px 24px", display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
          {step === "scan" && (
            <>
              <div style={{ width: "100%", display: "flex", gap: 8 }}>
                {[
                  { n: "1", label: "Abra o WhatsApp no celular" },
                  { n: "2", label: "Vá em Dispositivos conectados" },
                  { n: "3", label: "Toque em Conectar e escaneie" },
                ].map(s => (
                  <div key={s.n} style={{ flex: 1, background: t.input, border: `1px solid ${t.border}`, borderRadius: 10, padding: "8px 10px" }}>
                    <span style={{ fontSize: 10, fontWeight: 700, color: t.accent, display: "block", marginBottom: 3 }}>Passo {s.n}</span>
                    <span style={{ fontSize: 11, color: t.muted, lineHeight: 1.4 }}>{s.label}</span>
                  </div>
                ))}
              </div>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 12, width: "100%" }}>
                <div style={{ padding: 16, background: "white", borderRadius: 20, boxShadow: "0 8px 32px rgba(0,0,0,0.18)", border: "1px solid rgba(0,0,0,0.06)" }}>
                  <QRCode size={180} />
                </div>
                <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 6 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 11, color: t.muted }}>QR code expira em</span>
                    <span style={{ fontSize: 11, fontWeight: 700, color: seconds < 15 ? t.red : t.accent }}>{seconds}s</span>
                  </div>
                  <div style={{ height: 4, borderRadius: 99, background: t.input, overflow: "hidden" }}>
                    <div style={{ height: "100%", borderRadius: 99, background: seconds < 15 ? t.red : t.accent, width: `${(seconds / 60) * 100}%`, transition: "width 1s linear, background .3s" }} />
                  </div>
                </div>
              </div>

              <p style={{ fontSize: 12, color: t.muted, textAlign: "center", maxWidth: 300, lineHeight: 1.6 }}>
                Aponte a câmera para o QR code. A conexão acontece automaticamente.
              </p>

              <button onClick={handleSimulate} style={{ width: "100%", padding: "11px 0", borderRadius: 12, border: "none", background: "#25D366", color: "white", fontWeight: 600, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 16px rgba(37,211,102,0.3)" }}>
                <span style={{ display: "flex" }}>{Icon.wa(16)}</span>
                Simular escaneamento (mock)
              </button>
            </>
          )}

          {step === "waiting" && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, padding: "16px 0" }}>
              <div style={{ position: "relative", width: 80, height: 80 }}>
                <svg width="80" height="80" style={{ animation: "spin 1.4s linear infinite" }}>
                  <circle cx="40" cy="40" r="34" fill="none" stroke={t.border} strokeWidth="5"/>
                  <circle cx="40" cy="40" r="34" fill="none" stroke="#25D366" strokeWidth="5" strokeDasharray="60 154" strokeLinecap="round" transform="rotate(-90 40 40)"/>
                </svg>
                <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", color: "#25D366" }}>
                  {Icon.wa(24)}
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: 15, fontWeight: 600, color: t.text, marginBottom: 6 }}>Conectando dispositivo…</p>
                <p style={{ fontSize: 12.5, color: t.muted, lineHeight: 1.6 }}>O WhatsApp está sincronizando.<br/>Só um momento.</p>
              </div>
            </div>
          )}

          {step === "success" && (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20, padding: "12px 0" }}>
              <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)", display: "flex", alignItems: "center", justifyContent: "center", color: t.green }}>
                <Icon.check />
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: 16, fontWeight: 700, color: t.text, marginBottom: 6 }}>Dispositivo conectado!</p>
                <p style={{ fontSize: 13, color: t.muted, lineHeight: 1.6 }}>
                  <span style={{ color: t.green, fontWeight: 600 }}>{phoneNum}</span>
                  <br/>está vinculado e recebendo mensagens.
                </p>
              </div>
              <div style={{ width: "100%", background: t.input, border: `1px solid ${t.border}`, borderRadius: 12, padding: "12px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: t.green, animation: "pulse 2s ease-in-out infinite", flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 12, fontWeight: 600, color: t.text }}>Pronto para receber agendamentos</p>
                  <p style={{ fontSize: 11, color: t.muted, marginTop: 1 }}>Bot ativo neste número</p>
                </div>
                <span style={{ color: "#25D366", display: "flex" }}>{Icon.wa(18)}</span>
              </div>
              <button onClick={() => { onConnected(phoneNum); onClose(); }} style={{ width: "100%", padding: "11px 0", borderRadius: 12, border: "none", background: t.accent, color: "white", fontWeight: 600, fontSize: 14, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 4px 16px rgba(249,115,22,0.3)" }}>
                Concluir
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ─── Card de dispositivo ────────────────────────────── */
type DeviceStatus = "active" | "idle" | "disconnected";

interface Device {
  id: string; name: string; number: string; status: DeviceStatus;
  lastSeen: string; bookingsToday: number; messagesTotal: number;
  connectedSince: string; browser: string;
}

const STATUS_MAP = {
  active:       { label: "Ativo",        dot: "#22c55e", bg: "rgba(34,197,94,0.1)",  brd: "rgba(34,197,94,0.22)"  },
  idle:         { label: "Ocioso",       dot: "#f59e0b", bg: "rgba(245,158,11,0.1)", brd: "rgba(245,158,11,0.22)" },
  disconnected: { label: "Desconectado", dot: "#ef4444", bg: "rgba(239,68,68,0.1)",  brd: "rgba(239,68,68,0.22)"  },
};

function DeviceCard({ device, t, onDisconnect, onReconnect }: { device: Device; t: Tokens; onDisconnect: (id: string) => void; onReconnect: () => void }) {
  const [confirmando, setConfirmando] = useState(false);
  const s = STATUS_MAP[device.status];

  return (
    <div style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 18, padding: "20px 22px", boxShadow: t.shadow }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 18 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,#075E54,#128C7E)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", flexShrink: 0, boxShadow: "0 4px 12px rgba(7,94,84,0.35)" }}>
            {Icon.wa(22)}
          </div>
          <div>
            <p style={{ fontSize: 15, fontWeight: 700, color: t.text, letterSpacing: "-0.01em" }}>{device.name}</p>
            <p style={{ fontSize: 12.5, color: t.muted, marginTop: 2 }}>{device.number}</p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 5, padding: "4px 10px", background: s.bg, border: `1px solid ${s.brd}`, borderRadius: 99 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot, animation: device.status === "active" ? "pulse 2s ease-in-out infinite" : "none" }} />
            <span style={{ fontSize: 11.5, fontWeight: 600, color: s.dot }}>{s.label}</span>
          </div>

          {device.status === "disconnected" ? (
            <button onClick={onReconnect} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 9, border: `1px solid ${t.border}`, background: t.input, color: t.muted, fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
              <Icon.refresh /> Reconectar
            </button>
          ) : !confirmando ? (
            <button onClick={() => setConfirmando(true)} style={{ display: "flex", alignItems: "center", gap: 5, padding: "5px 12px", borderRadius: 9, border: `1px solid ${t.border}`, background: t.input, color: t.muted, fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
              <Icon.trash /> Desconectar
            </button>
          ) : (
            <div style={{ display: "flex", gap: 6 }}>
              <button onClick={() => setConfirmando(false)} style={{ padding: "5px 10px", borderRadius: 9, border: `1px solid ${t.border}`, background: t.input, color: t.muted, fontSize: 12, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Cancelar</button>
              <button onClick={() => { onDisconnect(device.id); setConfirmando(false); }} style={{ padding: "5px 10px", borderRadius: 9, border: "1px solid rgba(239,68,68,0.3)", background: "rgba(239,68,68,0.1)", color: "#ef4444", fontSize: 12, cursor: "pointer", fontWeight: 600, fontFamily: "'DM Sans', sans-serif" }}>Confirmar</button>
            </div>
          )}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 16 }}>
        {[
          { label: "Agendamentos hoje", value: device.bookingsToday.toString() },
          { label: "Mensagens totais",  value: device.messagesTotal.toLocaleString("pt-BR") },
          { label: "Conectado desde",  value: device.connectedSince },
        ].map(stat => (
          <div key={stat.label} style={{ background: t.input, border: `1px solid ${t.border}`, borderRadius: 10, padding: "10px 12px" }}>
            <p style={{ fontSize: 10.5, color: t.muted, marginBottom: 4 }}>{stat.label}</p>
            <p style={{ fontSize: 14.5, fontWeight: 700, color: t.text, letterSpacing: "-0.02em", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{stat.value}</p>
          </div>
        ))}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 14, borderTop: `1px solid ${t.border}` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ color: t.muted, display: "flex" }}><Icon.wifi /></span>
          <span style={{ fontSize: 12, color: t.muted }}>{device.browser}</span>
        </div>
        <span style={{ fontSize: 12, color: t.muted }}>Visto por último: {device.lastSeen}</span>
      </div>
    </div>
  );
}

/* ─── Dados iniciais ─────────────────────────────────── */
const DISPOSITIVOS_INICIAIS: Device[] = [
  { id: "d1", name: "Linha principal",    number: "+55 (11) 91234-5678", status: "active",       lastSeen: "agora mesmo", bookingsToday: 8, messagesTotal: 1247, connectedSince: "Mar 2025", browser: "WhatsApp Web · Chrome" },
  { id: "d2", name: "Linha reserva",      number: "+55 (11) 99876-5432", status: "idle",         lastSeen: "há 2 horas",  bookingsToday: 0, messagesTotal: 342,  connectedSince: "Nov 2024", browser: "WhatsApp Web · Safari" },
  { id: "d3", name: "Dispositivo antigo", number: "+55 (11) 94444-0012", status: "disconnected", lastSeen: "há 3 dias",   bookingsToday: 0, messagesTotal: 89,   connectedSince: "Out 2024", browser: "WhatsApp Web · Firefox" },
];

/* ─── Página principal ───────────────────────────────── */
export default function DevicesPage() {
  const { dark, setDark, t } = useTheme();
  const [devices, setDevices] = useState<Device[]>(DISPOSITIVOS_INICIAIS);
  const [showQR, setShowQR] = useState(false);

  function handleDisconnect(id: string) {
    setDevices(ds => ds.map(d => d.id === id ? { ...d, status: "disconnected" as DeviceStatus, lastSeen: "agora mesmo" } : d));
  }

  function handleConnected(number: string) {
    setDevices(ds => [...ds, {
      id: `d${Date.now()}`, name: "Novo dispositivo", number,
      status: "active", lastSeen: "agora mesmo", bookingsToday: 0, messagesTotal: 0,
      connectedSince: new Date().toLocaleDateString("pt-BR", { month: "short", year: "numeric" }),
      browser: "WhatsApp Web · Chrome",
    }]);
  }

  const ativos = devices.filter(d => d.status === "active").length;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'DM Sans',sans-serif;overflow-x:hidden}
        @keyframes fadeUp  {from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin    {to{transform:rotate(360deg)}}
        @keyframes pulse   {0%,100%{opacity:1}50%{opacity:.4}}
        @keyframes modalIn {from{opacity:0;transform:scale(.96) translateY(8px)}to{opacity:1;transform:scale(1) translateY(0)}}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-thumb{background:rgba(120,120,120,0.2);border-radius:99px}
      `}</style>

      {showQR && <QRModal t={t} onClose={() => setShowQR(false)} onConnected={handleConnected} />}

      <div style={{ display: "flex", minHeight: "100vh", background: t.bg, color: t.text, transition: "background .25s" }}>

        {/* ── Sidebar compartilhada ── */}
        <Sidebar t={{ ...t, dark }} onThemeToggle={() => setDark(d => !d)} />

        <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          <header style={{ padding: "20px 36px", borderBottom: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", background: t.sidebar, position: "sticky", top: 0, zIndex: 10, boxShadow: t.shadow, transition: "background .25s" }}>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: t.text, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.03em" }}>Dispositivos</h1>
              <p style={{ fontSize: 13, color: t.muted, marginTop: 2 }}>{ativos} de {devices.length} dispositivos ativos</p>
            </div>
            <button onClick={() => setShowQR(true)} style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 18px", borderRadius: 12, border: "none", background: t.accent, color: "white", fontSize: 13.5, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", boxShadow: "0 2px 12px rgba(249,115,22,0.35)" }}>
              <Icon.plus /> Conectar dispositivo
            </button>
          </header>

          <div style={{ flex: 1, overflowY: "auto", padding: "28px 36px 48px" }}>
            {/* Resumo */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 14, marginBottom: 28, animation: "fadeUp .35s ease both" }}>
              {[
                { label: "Dispositivos ativos",  value: devices.filter(d => d.status === "active").length },
                { label: "Agendamentos hoje",     value: devices.reduce((a, d) => a + d.bookingsToday, 0) },
                { label: "Mensagens processadas", value: devices.reduce((a, d) => a + d.messagesTotal, 0).toLocaleString("pt-BR") },
              ].map(s => (
                <div key={s.label} style={{ background: t.card, border: `1px solid ${t.border}`, borderRadius: 16, padding: "18px 20px", boxShadow: t.shadow }}>
                  <p style={{ fontSize: 11, color: t.muted, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 10 }}>{s.label}</p>
                  <p style={{ fontSize: 28, fontWeight: 800, color: t.text, letterSpacing: "-0.03em", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{s.value}</p>
                </div>
              ))}
            </div>

            {/* Lista de dispositivos */}
            <div style={{ display: "flex", flexDirection: "column", gap: 14, animation: "fadeUp .4s ease both .05s" }}>
              {devices.map(device => (
                <DeviceCard key={device.id} device={device} t={t}
                  onDisconnect={handleDisconnect}
                  onReconnect={() => setShowQR(true)}
                />
              ))}
            </div>

            {/* Estado vazio */}
            {devices.length === 0 && (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 16, padding: "60px 0" }}>
                <div style={{ width: 64, height: 64, borderRadius: 18, background: t.input, border: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: t.muted }}>
                  <Icon.phone />
                </div>
                <p style={{ fontSize: 15, fontWeight: 600, color: t.text }}>Nenhum dispositivo conectado</p>
                <p style={{ fontSize: 13, color: t.muted }}>Conecte um número do WhatsApp para começar a receber agendamentos.</p>
                <button onClick={() => setShowQR(true)} style={{ padding: "10px 22px", borderRadius: 12, border: "none", background: t.accent, color: "white", fontSize: 13.5, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                  Conectar primeiro dispositivo
                </button>
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}