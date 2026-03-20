"use client";

import { useState, useEffect } from "react";

/* ── Hook mobile com hidratação segura ────────────────── */
function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);
  return mobile;
}

/* ── Ícones ──────────────────────────────────────────── */
function GoogleIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 48 48">
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.9 29.5 5 24 5 13 5 4 14 4 25s9 20 20 20 20-9 20-20c0-1.3-.1-2.6-.4-4z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.5 16 19 12 24 12c3.1 0 5.9 1.2 8 3.1l5.7-5.7C34.5 6.9 29.5 5 24 5 16.3 5 9.7 9 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 45c5.4 0 10.3-1.8 14.1-4.9l-6.5-5.5C29.5 36.6 26.9 37.5 24 37.5c-5.3 0-9.7-3.4-11.3-8.1l-6.5 5C9.7 41.1 16.3 45 24 45z" />
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.1-2.2 3.9-3.9 5.2l6.5 5.5C37.6 40.2 44 35 44 25c0-1.3-.1-2.6-.4-4z" />
    </svg>
  );
}

function WaIcon({ size = 14, color = "white" }: { size?: number; color?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

/* ── Modal de login Google ────────────────────────────── */
function GoogleModal({ onClose }: { onClose: () => void }) {
  const [step, setStep] = useState<"idle" | "loading" | "done">("idle");
  const handle = () => {
    setStep("loading");
    setTimeout(() => setStep("done"), 1600);
    setTimeout(() => onClose(), 2900);
  };
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 16px" }}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.25)", backdropFilter: "blur(4px)" }} onClick={onClose} />
      <div style={{ position: "relative", zIndex: 1, width: "100%", maxWidth: 380, background: "#fff", border: "1px solid #e5e7eb", borderRadius: 20, padding: 28, boxShadow: "0 24px 48px rgba(0,0,0,0.12)" }}>
        <button onClick={onClose} style={{ position: "absolute", top: 14, right: 14, width: 28, height: 28, borderRadius: "50%", border: "none", background: "#f9fafb", cursor: "pointer", color: "#9ca3af", fontSize: 13 }}>✕</button>
        {step === "done" ? (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "20px 0", gap: 12 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: "#f0fdf4", border: "1px solid #bbf7d0", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="20" height="20" fill="none" stroke="#22c55e" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </div>
            <p style={{ fontWeight: 600, color: "#111", fontSize: 14 }}>Acesso confirmado!</p>
            <p style={{ color: "#9ca3af", fontSize: 12 }}>Redirecionando para o painel...</p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                <div style={{ width: 28, height: 28, borderRadius: 8, background: "#fff7ed", border: "1px solid #fed7aa", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
                <span style={{ fontWeight: 700, color: "#111", fontSize: 14 }}>reminder</span>
              </div>
              <h2 style={{ fontSize: 18, fontWeight: 600, color: "#111", marginBottom: 6 }}>Entre na sua conta</h2>
              <p style={{ fontSize: 13, color: "#9ca3af", lineHeight: 1.6 }}>Gerencie agendamentos e seu Google Agenda em um só lugar.</p>
            </div>
            <button onClick={handle} disabled={step === "loading"} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, border: "1px solid #e5e7eb", borderRadius: 12, padding: "11px 16px", fontSize: 14, fontWeight: 500, color: "#374151", background: "#fff", cursor: "pointer" }}>
              {step === "loading" ? (
                <span style={{ display: "flex", alignItems: "center", gap: 8, color: "#6b7280" }}>
                  <svg style={{ animation: "spin 1s linear infinite", width: 16, height: 16 }} fill="none" viewBox="0 0 24 24"><circle style={{ opacity: .25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path style={{ opacity: .75 }} fill="currentColor" d="M4 12a8 8 0 018-8v8z"/></svg>
                  Entrando...
                </span>
              ) : <><GoogleIcon size={17} /> Continuar com Google</>}
            </button>
            <p style={{ fontSize: 11, color: "#d1d5db", textAlign: "center", marginTop: 14 }}>Integração em desenvolvimento</p>
          </>
        )}
      </div>
    </div>
  );
}

/* ── Serviços ────────────────────────────────────────── */
const SERVICES = [
  { label: "Corte",    icon: "✂", color: "#f97316", bg: "#fff7ed", confirm: { day: "Quinta", time: "15:00" },
    msgs: [{ from: "user", text: "Quinta às 15h, marque um corte de cabelo por favor" }, { from: "bot", text: "Pronto! Corte de cabelo agendado para quinta às 15:00, até lá!" }] },
  { label: "Massagem", icon: "◈", color: "#8b5cf6", bg: "#f5f3ff", confirm: { day: "Segunda", time: "10:00" },
    msgs: [{ from: "user", text: "Segunda às 10h, massagem completa" }, { from: "bot", text: "Agendado! Massagem de 60 min na segunda às 10:00." }] },
  { label: "Consulta", icon: "◎", color: "#3b82f6", bg: "#eff6ff", confirm: { day: "Sexta", time: "14:00" },
    msgs: [{ from: "user", text: "Sexta às 14h, consulta" }, { from: "bot", text: "Certo! Consulta na sexta às 14:00. Um lembrete será enviado 1h antes." }] },
  { label: "Unhas",    icon: "✦", color: "#ec4899", bg: "#fdf2f8", confirm: { day: "Quarta", time: "11:30" },
    msgs: [{ from: "user", text: "Quarta às 11h30, cuidado com unhas" }, { from: "bot", text: "Perfeito! Agendado para quarta às 11:30." }] },
];

/* ── Telefone WhatsApp ───────────────────────────────── */
function WhatsAppPhone() {
  const [active, setActive] = useState(0);
  useEffect(() => {}, [active]);
  const svc = SERVICES[active];

  return (
    <div style={{ filter: "drop-shadow(0 20px 40px rgba(37,211,102,0.14)) drop-shadow(0 4px 16px rgba(0,0,0,0.14))", position: "relative" }}>
      <div style={{ position: "absolute", inset: -16, borderRadius: 44, background: "radial-gradient(ellipse at 50% 65%, rgba(37,211,102,0.09) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={{ position: "relative", width: 230, borderRadius: 24, overflow: "hidden", border: "1.5px solid rgba(255,255,255,0.15)", boxShadow: "0 0 0 4px #1c1c1e", background: "#1c1c1e" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 14px 4px", background: "#075E54" }}>
          <span style={{ color: "white", fontSize: 9, fontWeight: 600 }}>9:41</span>
          <div style={{ display: "flex", gap: 2, alignItems: "flex-end" }}>
            {[3,5,7,9].map((h,i) => <div key={i} style={{ width: 2, height: h, background: "white", borderRadius: 1, opacity: i < 2 ? 0.45 : 0.9 }} />)}
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "9px 12px", background: "linear-gradient(180deg,#075E54,#076b60)", borderBottom: "1px solid rgba(255,255,255,0.07)" }}>
          <svg width="6" height="10" viewBox="0 0 6 10" fill="none"><path d="M5 1L1 5l4 4" stroke="rgba(255,255,255,0.6)" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <div style={{ position: "relative" }}>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: "linear-gradient(135deg,#25D366,#128C7E)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <WaIcon size={14} color="white" />
            </div>
            <div style={{ position: "absolute", bottom: 0, right: 0, width: 7, height: 7, borderRadius: "50%", background: "#4ade80", border: "1.5px solid #075E54" }} />
          </div>
          <div style={{ flex: 1 }}>
            <p style={{ color: "white", fontSize: 11, fontWeight: 600, lineHeight: 1 }}>Reminder Bot</p>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 9, marginTop: 2 }}>online</p>
          </div>
        </div>
        <div style={{ display: "flex", background: "#ebebeb", padding: "5px 6px", gap: 4 }}>
          {SERVICES.map((s, i) => (
            <button key={i} onClick={() => setActive(i)} style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 3, padding: "4px 0", borderRadius: 20, border: "none", cursor: "pointer", fontSize: 9, fontWeight: 600, transition: "all .15s", background: active === i ? s.bg : "transparent", color: active === i ? s.color : "#999", boxShadow: active === i ? `0 0 0 1px ${s.color}35` : "none" }}>
              <span style={{ fontSize: 10 }}>{s.icon}</span>{s.label}
            </button>
          ))}
        </div>
        <div style={{ background: "#E5DDD5", backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23c8beb4' fill-opacity='0.2'%3E%3Ccircle cx='20' cy='20' r='1'/%3E%3C/g%3E%3C/svg%3E")`, padding: "10px 10px 8px", display: "flex", flexDirection: "column", gap: 6, minHeight: 160 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 4 }}>
            <span style={{ fontSize: 8, background: "rgba(255,255,255,0.6)", color: "#888", padding: "2px 10px", borderRadius: 99 }}>HOJE</span>
          </div>
          {svc.msgs.map((m, i) => (
            <div key={`${active}-${i}`} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start", opacity: 0, animation: `msgIn .28s ease ${i * 0.13}s both` }}>
              <div style={{ maxWidth: "80%", padding: "7px 9px", borderRadius: m.from === "bot" ? "2px 9px 9px 9px" : "9px 2px 9px 9px", background: m.from === "bot" ? "#fff" : "#DCF8C6", boxShadow: "0 1px 2px rgba(0,0,0,0.1)" }}>
                <p style={{ fontSize: 10.5, color: "#111", lineHeight: 1.5 }}>{m.text}</p>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 3, marginTop: 2 }}>
                  <span style={{ fontSize: 8, color: "#aaa" }}>14:03</span>
                  {m.from === "user" && <svg width="12" height="8" viewBox="0 0 16 10" fill="none"><path d="M1 5l3 3 5-6M6 5l3 3 5-6" stroke="#53bdeb" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                </div>
              </div>
            </div>
          ))}
          <div style={{ display: "flex", justifyContent: "center", marginTop: 4, opacity: 0, animation: `msgIn .3s ease ${svc.msgs.length * 0.13 + 0.1}s both` }}>
            <div style={{ background: svc.bg, border: `1px solid ${svc.color}30`, borderRadius: 99, padding: "4px 12px", display: "flex", alignItems: "center", gap: 5 }}>
              <svg width="10" height="10" fill="none" stroke={svc.color} strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span style={{ fontSize: 9, fontWeight: 600, color: svc.color }}>Confirmado · {svc.confirm.day} {svc.confirm.time}</span>
            </div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 10px", background: "#f7f7f7", borderTop: "1px solid #e8e8e8" }}>
          <div style={{ flex: 1, background: "#fff", border: "1px solid #ebebeb", borderRadius: 99, padding: "6px 12px", fontSize: 9.5, color: "#ccc" }}>Mensagem</div>
          <div style={{ width: 26, height: 26, borderRadius: "50%", background: "linear-gradient(135deg,#25D366,#128C7E)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="11" height="11" fill="white" viewBox="0 0 24 24"><path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Mini card ───────────────────────────────────────── */
function MiniCard({ style, children }: { style?: React.CSSProperties; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", border: "1px solid #f0f0f0", borderRadius: 16, padding: "12px 14px", boxShadow: "0 2px 12px rgba(0,0,0,0.06)", flexShrink: 0, ...style }}>
      {children}
    </div>
  );
}

/* ── Visual hero ─────────────────────────────────────── */
function HeroVisual() {
  return (
    <div style={{ position: "relative", width: "100%", maxWidth: 560, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "center", padding: "36px 0" }}>
        <WhatsAppPhone />
      </div>
      <MiniCard style={{ position: "absolute", top: 0, left: 0, width: 148, animation: "floatB 5s ease-in-out infinite .3s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
          <div style={{ width: 24, height: 24, borderRadius: 7, background: "#f0fdf4", border: "1px solid #bbf7d0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="11" height="11" fill="none" stroke="#22c55e" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </div>
          <span style={{ fontSize: 10.5, fontWeight: 600, color: "#1f2937" }}>Agendamento confirmado</span>
        </div>
        <p style={{ fontSize: 9.5, color: "#9ca3af", marginBottom: 1 }}>Quinta, 15:00</p>
        <p style={{ fontSize: 9.5, color: "#9ca3af" }}>Corte · 45 min</p>
      </MiniCard>
      <MiniCard style={{ position: "absolute", top: 0, right: 0, width: 148, animation: "floatC 4.5s ease-in-out infinite .7s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
          <div style={{ width: 24, height: 24, borderRadius: 7, background: "#eff6ff", border: "1px solid #bfdbfe", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="11" height="11" fill="none" stroke="#3b82f6" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
          </div>
          <span style={{ fontSize: 10.5, fontWeight: 600, color: "#1f2937" }}>Google Agenda</span>
        </div>
        <p style={{ fontSize: 9.5, color: "#9ca3af", marginBottom: 6 }}>Sincronizado automaticamente</p>
        <div style={{ height: 3, borderRadius: 99, background: "#dbeafe", overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: 99, background: "linear-gradient(90deg,#60a5fa,#3b82f6)", animation: "syncBar 2.8s ease-in-out infinite" }} />
        </div>
      </MiniCard>
      <MiniCard style={{ position: "absolute", bottom: 0, left: 0, width: 144, animation: "floatA 5.5s ease-in-out infinite 1.2s" }}>
        <p style={{ fontSize: 9, fontWeight: 600, color: "#6b7280", marginBottom: 7, letterSpacing: "0.04em", textTransform: "uppercase" }}>Horários disponíveis</p>
        {[{ t: "9:00", taken: true }, { t: "11:30", taken: true }, { t: "15:00", taken: false }, { t: "17:30", taken: false }].map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: s.taken ? "#e5e7eb" : "#4ade80", flexShrink: 0 }} />
            <span style={{ fontSize: 10, color: s.taken ? "#d1d5db" : "#111827", fontWeight: s.taken ? 400 : 500, textDecoration: s.taken ? "line-through" : "none" }}>{s.t}</span>
          </div>
        ))}
      </MiniCard>
      <MiniCard style={{ position: "absolute", bottom: 0, right: 0, width: 130, animation: "floatB 4.8s ease-in-out infinite 1.5s" }}>
        <p style={{ fontSize: 9, color: "#9ca3af", marginBottom: 4, fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase" }}>Taxa de falta</p>
        <p style={{ fontSize: 28, fontWeight: 800, color: "#111827", lineHeight: 1, letterSpacing: "-0.03em", marginBottom: 4 }}>3,2%</p>
        <div style={{ display: "flex", alignItems: "center", gap: 3 }}>
          <svg width="10" height="10" fill="none" stroke="#22c55e" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M18 15l-6-6-6 6" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span style={{ fontSize: 9.5, color: "#22c55e", fontWeight: 600 }}>-68% vs antes</span>
        </div>
      </MiniCard>
      <MiniCard style={{ position: "absolute", top: "42%", right: -8, width: 126, animation: "floatC 6s ease-in-out infinite 2s" }}>
        <p style={{ fontSize: 9, color: "#9ca3af", fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", marginBottom: 4 }}>Este mês</p>
        <p style={{ fontSize: 22, fontWeight: 800, color: "#111", lineHeight: 1, letterSpacing: "-0.03em", marginBottom: 3 }}>248</p>
        <p style={{ fontSize: 9.5, color: "#6b7280" }}>lembretes enviados</p>
      </MiniCard>
      <MiniCard style={{ position: "absolute", top: "42%", left: -8, width: 132, animation: "floatA 5s ease-in-out infinite .9s" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
          <div style={{ width: 22, height: 22, borderRadius: 6, background: "#fdf4ff", border: "1px solid #e9d5ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="10" height="10" fill="none" stroke="#a855f7" strokeWidth="2" viewBox="0 0 24 24"><path d="M1 4v6h6M23 20v-6h-6"/><path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15"/></svg>
          </div>
          <span style={{ fontSize: 10, fontWeight: 600, color: "#1f2937" }}>Remarcado</span>
        </div>
        <p style={{ fontSize: 9.5, color: "#9ca3af" }}>Movido para Sex 16h</p>
        <p style={{ fontSize: 9, color: "#a855f7", fontWeight: 500, marginTop: 2 }}>Atualizado automaticamente</p>
      </MiniCard>
    </div>
  );
}

/* ── Página principal ────────────────────────────────── */
export default function Page() {
  const [modal, setModal] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const mobile = useIsMobile();

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const px = mobile ? "20px" : "48px";
  const sectionPy = mobile ? "44px" : "56px";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        html{scroll-behavior:smooth}
        body{background:#fafafa;color:#111;font-family:'DM Sans',sans-serif;overflow-x:hidden}
        @keyframes fadeUp  {from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        @keyframes floatA  {0%,100%{transform:translateY(0)}50%{transform:translateY(-8px)}}
        @keyframes floatB  {0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
        @keyframes floatC  {0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}
        @keyframes syncBar {0%{width:0%}70%{width:100%}100%{width:100%}}
        @keyframes spin    {to{transform:rotate(360deg)}}
        @keyframes msgIn   {from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        .a1{animation:fadeUp .6s ease both .05s}
        .a2{animation:fadeUp .6s ease both .15s}
        .a3{animation:fadeUp .6s ease both .25s}
        .a4{animation:fadeUp .6s ease both .35s}
        .hero-bg{background:radial-gradient(ellipse 90% 60% at 50% -5%,#ffe8d6 0%,#fef3e8 42%,#fafafa 72%)}
        .cta-dark{background:#111;color:white;border:none;cursor:pointer;transition:background .2s,transform .15s,box-shadow .2s;box-shadow:0 1px 3px rgba(0,0,0,0.15)}
        .cta-dark:hover{background:#222;box-shadow:0 4px 14px rgba(0,0,0,0.2);transform:translateY(-1px)}
        .cta-dark:active{transform:scale(.97)}
        .cta-ghost{background:transparent;cursor:pointer;border:1px solid #e5e7eb;color:#555;transition:border-color .2s,background .2s,transform .15s}
        .cta-ghost:hover{border-color:#d1d5db;background:#f9f9f9;transform:translateY(-1px)}
        .cta-ghost:active{transform:scale(.97)}
        .nav-link{color:#6b7280;font-size:.875rem;cursor:pointer;transition:color .15s;font-family:'DM Sans',sans-serif}
        .nav-link:hover{color:#111}
        .hl{font-family:'Plus Jakarta Sans',sans-serif;font-weight:800;letter-spacing:-0.03em;color:#0f0f0f}
        .step-card{background:white;border:1px solid #f3f4f6;border-radius:16px;padding:20px;transition:box-shadow .2s,transform .2s}
        .step-card:hover{box-shadow:0 8px 24px rgba(0,0,0,0.07);transform:translateY(-3px)}
      `}</style>

      {modal && <GoogleModal onClose={() => setModal(false)} />}

      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50, transition: "all .3s", background: scrolled || mobileMenu ? "rgba(250,250,250,0.96)" : "transparent", backdropFilter: scrolled || mobileMenu ? "blur(14px)" : "none", borderBottom: scrolled || mobileMenu ? "1px solid #f0f0f0" : "1px solid transparent" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: `14px ${px}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 26, height: 26, borderRadius: 8, background: "#fff7ed", border: "1px solid #fed7aa", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span style={{ fontWeight: 700, fontSize: 14, color: "#111", letterSpacing: "-0.01em" }}>reminder</span>
          </div>
          {!mobile && (
            <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
              {["Produto","Preços","Como funciona","Entrar"].map(l => (
                <span key={l} className="nav-link" onClick={l === "Entrar" ? () => setModal(true) : undefined}>{l}</span>
              ))}
            </div>
          )}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {!mobile && (
              <button onClick={() => setModal(true)} className="cta-dark" style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, fontWeight: 500, padding: "8px 16px", borderRadius: 12 }}>
                Cadastrar
              </button>
            )}
            {mobile && (
              <button onClick={() => setMobileMenu(m => !m)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4, color: "#374151" }}>
                {mobileMenu
                  ? <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M18 6L6 18M6 6l12 12" strokeLinecap="round"/></svg>
                  : <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round"/></svg>}
              </button>
            )}
          </div>
        </div>
        {mobile && mobileMenu && (
          <div style={{ padding: "8px 20px 20px", display: "flex", flexDirection: "column", gap: 4 }}>
            {["Produto","Preços","Como funciona"].map(l => (
              <span key={l} style={{ fontSize: 15, color: "#374151", padding: "10px 0", borderBottom: "1px solid #f3f4f6", cursor: "pointer" }} onClick={() => setMobileMenu(false)}>{l}</span>
            ))}
            <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
              <button onClick={() => { setModal(true); setMobileMenu(false); }} className="cta-dark" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, fontSize: 14, fontWeight: 500, padding: "12px 20px", borderRadius: 12 }}>
                <GoogleIcon size={15} /> Cadastrar com Google
              </button>
              <span style={{ fontSize: 13, color: "#9ca3af", textAlign: "center", cursor: "pointer" }} onClick={() => { setModal(true); setMobileMenu(false); }}>Entrar</span>
            </div>
          </div>
        )}
      </nav>

      {/* Hero */}
      <section className="hero-bg" style={{ padding: mobile ? "90px 20px 32px" : "100px 48px 40px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: mobile ? "column" : "row", alignItems: "center", gap: mobile ? 32 : 48, textAlign: mobile ? "center" : "left" }}>
          <div style={{ width: mobile ? "100%" : "40%", flexShrink: 0 }}>
            <div className="a1" style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(249,115,22,0.08)", border: "1px solid rgba(249,115,22,0.18)", borderRadius: 99, padding: "5px 12px", marginBottom: 18 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f97316", display: "inline-block" }} />
              <span style={{ fontSize: 11, fontWeight: 500, color: "#ea580c" }}>Agendamento automático via WhatsApp</span>
            </div>
            <h1 className="a2 hl" style={{ fontSize: mobile ? "2.2rem" : "clamp(2.2rem, 3.8vw, 3.2rem)", lineHeight: 1.07, marginBottom: 16 }}>
              Sua agenda<br />automatizada.
            </h1>
            <p className="a3" style={{ fontSize: 14, color: "#6b7280", lineHeight: 1.7, marginBottom: 24, maxWidth: mobile ? "100%" : 360, margin: mobile ? "0 auto 24px" : "0 0 24px" }}>
              Ofereça um número de WhatsApp aos seus clientes. Eles agendam, confirmam e remarcam sozinhos — tudo vai direto para o seu Google Agenda.
            </p>
            <div className="a4" style={{ display: "flex", gap: 10, marginBottom: 14, justifyContent: mobile ? "center" : "flex-start", flexWrap: "wrap" }}>
              <button onClick={() => setModal(true)} className="cta-dark" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 500, padding: "10px 20px", borderRadius: 12 }}>
                <GoogleIcon size={15} /> Começar grátis
              </button>
              <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="cta-ghost" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 500, padding: "10px 20px", borderRadius: 12, textDecoration: "none" }}>
                <WaIcon size={14} color="#25D366" /> Solicitar demo
              </a>
            </div>
            <p className="a4" style={{ fontSize: 11, color: "#d1d5db", display: "flex", alignItems: "center", gap: 5, justifyContent: mobile ? "center" : "flex-start" }}>
              <svg width="10" height="10" fill="none" stroke="#d1d5db" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Gratuito para começar, sem cartão de crédito
            </p>
          </div>
          <div style={{ flex: 1, minWidth: 0, width: mobile ? "100%" : undefined }}>
            <HeroVisual />
          </div>
        </div>
      </section>

      {/* Parceiros */}
      <div style={{ borderTop: "1px solid #f3f4f6", borderBottom: "1px solid #f3f4f6", padding: `16px ${px}` }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: 10, color: "#d1d5db", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 12 }}>Usado por pequenos negócios</p>
          <div style={{ display: "flex", justifyContent: "center", gap: mobile ? 18 : 36, flexWrap: "wrap" }}>
            {["Barbearias","Clínicas","Professores","Salões","Coaches","Terapeutas"].map(b => (
              <span key={b} style={{ fontSize: 13, color: "#d1d5db", fontWeight: 500 }}>{b}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Como funciona */}
      <section style={{ padding: `${sectionPy} ${px}`, background: "#f9fafb", borderTop: "1px solid #f3f4f6", borderBottom: "1px solid #f3f4f6" }}>
        <div style={{ maxWidth: 720, margin: "0 auto", textAlign: "center", marginBottom: 32 }}>
          <p style={{ fontSize: 11, color: "#f97316", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 10 }}>Como funciona</p>
          <h2 className="hl" style={{ fontSize: mobile ? "1.6rem" : "clamp(1.6rem, 2.8vw, 2.2rem)" }}>Pronto em três passos simples</h2>
        </div>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "grid", gridTemplateColumns: mobile ? "1fr" : "repeat(3,1fr)", gap: 12 }}>
          {[
            { n:"1", t:"Conecte seu número", d:"Configure um número de WhatsApp dedicado ao seu negócio. Leva menos de dois minutos." },
            { n:"2", t:"Clientes agendam no chat", d:"O bot recebe os clientes, mostra os horários disponíveis e confirma o agendamento automaticamente." },
            { n:"3", t:"Confira sua agenda", d:"Cada agendamento sincroniza com o Google Agenda com nome, horário e contato do cliente." },
          ].map(s => (
            <div key={s.n} className="step-card">
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#fff7ed", border: "1px solid #fed7aa", display: "flex", alignItems: "center", justifyContent: "center", color: "#f97316", fontSize: 11, fontWeight: 700, marginBottom: 14 }}>{s.n}</div>
              <h3 style={{ fontSize: 13, fontWeight: 600, color: "#111", marginBottom: 6 }}>{s.t}</h3>
              <p style={{ fontSize: 12.5, color: "#9ca3af", lineHeight: 1.6 }}>{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: `${sectionPy} ${px}`, textAlign: "center", borderTop: "1px solid rgba(249,115,22,0.08)" }}>
        <div style={{ maxWidth: 460, margin: "0 auto" }}>
          <h2 className="hl" style={{ fontSize: mobile ? "1.6rem" : "clamp(1.6rem, 2.8vw, 2rem)", marginBottom: 14 }}>
            Pare de perder clientes<br />por falta de resposta.
          </h2>
          <p style={{ fontSize: 13.5, color: "#9ca3af", lineHeight: 1.7, marginBottom: 28 }}>
            O reminder cuida dos agendamentos o dia todo. Você só aparece na hora do atendimento.
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setModal(true)} className="cta-dark" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 500, padding: "10px 22px", borderRadius: 12 }}>
              <GoogleIcon size={15} /> Começar grátis
            </button>
            <a href="https://wa.me/5511999999999" target="_blank" rel="noopener noreferrer" className="cta-ghost" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, fontWeight: 500, padding: "10px 22px", borderRadius: 12, textDecoration: "none" }}>
              <WaIcon size={14} color="#25D366" /> Ver demo ao vivo
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ borderTop: "1px solid #f3f4f6", padding: `16px ${px}`, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M13.73 21a2 2 0 0 1-3.46 0" stroke="#f97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          <span style={{ fontSize: 12, fontWeight: 600, color: "#9ca3af" }}>reminder</span>
        </div>
        <p style={{ fontSize: 11, color: "#d1d5db" }}>{new Date().getFullYear()} reminder</p>
        <div style={{ display: "flex", gap: 20 }}>
          {["Privacidade","Termos","Suporte"].map(l => (
            <span key={l} style={{ fontSize: 11, color: "#d1d5db", cursor: "pointer" }}>{l}</span>
          ))}
        </div>
      </footer>
    </>
  );
}