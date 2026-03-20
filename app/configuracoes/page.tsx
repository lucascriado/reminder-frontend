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
    cardHov:   dark ? "#242428" : "#f9f9fb",
    border:    dark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.08)",
    input:     dark ? "#232326" : "#f2f2f4",
    inputBord: dark ? "rgba(255,255,255,0.09)" : "rgba(0,0,0,0.1)",
    inputFoc:  dark ? "rgba(249,115,22,0.5)"   : "rgba(249,115,22,0.4)",
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
  camera: () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg>,
  check:  () => <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  wa:     () => <svg width="16" height="16" viewBox="0 0 24 24" fill="#25D366"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>,
};

/* ─── Input ──────────────────────────────────────────── */
function Input({ label, value, onChange, t, type = "text", disabled }: {
  label: string; value: string; onChange: (v: string) => void;
  t: Tokens; type?: string; disabled?: boolean;
}) {
  const [focused, setFocused] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 12, fontWeight: 500, color: t.muted, letterSpacing: "0.02em" }}>{label}</label>
      <input
        type={type} value={value} onChange={e => onChange(e.target.value)}
        disabled={disabled}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          background: t.input, border: `1px solid ${focused ? t.inputFoc : t.inputBord}`,
          borderRadius: 10, padding: "10px 14px", fontSize: 14, color: t.text,
          outline: "none", transition: "border-color .15s",
          boxShadow: focused ? `0 0 0 3px ${t.inputFoc}30` : "none",
          opacity: disabled ? 0.5 : 1, cursor: disabled ? "not-allowed" : "text",
          fontFamily: "'DM Sans', sans-serif", width: "100%",
        }}
      />
    </div>
  );
}

/* ─── Toggle ─────────────────────────────────────────── */
function Toggle({ on, onToggle, t }: { on: boolean; onToggle: () => void; t: Tokens }) {
  return (
    <button onClick={onToggle} style={{ width: 44, height: 24, borderRadius: 99, border: "none", cursor: "pointer", position: "relative", transition: "background .2s", background: on ? t.accent : t.subtle, flexShrink: 0 }}>
      <div style={{ position: "absolute", top: 3, left: on ? 23 : 3, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left .2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
    </button>
  );
}

/* ─── Seção ──────────────────────────────────────────── */
function Section({ title, desc, children, t }: { title: string; desc: string; children: React.ReactNode; t: Tokens }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 32, padding: "28px 0", borderBottom: `1px solid ${t.border}` }}>
      <div>
        <p style={{ fontSize: 14, fontWeight: 600, color: t.text, marginBottom: 4 }}>{title}</p>
        <p style={{ fontSize: 12.5, color: t.muted, lineHeight: 1.6 }}>{desc}</p>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>{children}</div>
    </div>
  );
}

const TABS = ["Conta", "Notificações", "Integrações", "Planos"];

const INITIAL = {
  firstName: "Alex", lastName: "Rivera",
  email: "alex.rivera@reminder.app", phone: "+55 (11) 91234-5678",
  business: "Rivera Hair Studio", timezone: "GMT-3 (Brasília)",
  city: "São Paulo, SP", whatsapp: "+55 (11) 91234-5678",
  notifBooking: true, notifReminder: true, notifCancel: true, notifWeekly: false,
};

/* ─── Página principal ───────────────────────────────── */
export default function SettingsPage() {
  const { dark, setDark, t } = useTheme();
  const [tab, setTab] = useState("Conta");
  const [form, setForm] = useState(INITIAL);
  const [saved, setSaved] = useState(false);

  const set = (k: keyof typeof INITIAL) => (v: string | boolean) =>
    setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2200);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@700;800&family=DM+Sans:wght@300;400;500;600&display=swap');
        *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
        body{font-family:'DM Sans',sans-serif;overflow-x:hidden}
        @keyframes fadeUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pop{0%{transform:scale(.95);opacity:0}100%{transform:scale(1);opacity:1}}
        input::placeholder{color:#71717a}
        select{font-family:'DM Sans',sans-serif;appearance:none}
        ::-webkit-scrollbar{width:5px}
        ::-webkit-scrollbar-thumb{background:rgba(120,120,120,0.2);border-radius:99px}
      `}</style>

      <div style={{ display: "flex", minHeight: "100vh", background: t.bg, color: t.text, transition: "background .25s, color .25s" }}>

        <Sidebar t={{ ...t, dark }} onThemeToggle={() => setDark(d => !d)} />

        <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
          <header style={{ padding: "20px 36px", borderBottom: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "space-between", background: t.sidebar, transition: "background .25s", position: "sticky", top: 0, zIndex: 10, boxShadow: t.shadow }}>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: t.text, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.03em" }}>Configurações</h1>
              <p style={{ fontSize: 13, color: t.muted, marginTop: 2 }}>Gerencie sua conta e preferências</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 14px", background: t.greenBg, border: `1px solid rgba(34,197,94,0.2)`, borderRadius: 99 }}>
              <Icon.wa />
              <span style={{ fontSize: 12.5, fontWeight: 500, color: t.green }}>WhatsApp conectado</span>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: t.green, animation: "pop 1s ease infinite alternate" }} />
            </div>
          </header>

          <div style={{ flex: 1, overflowY: "auto", padding: "0 36px 48px" }}>
            {/* abas */}
            <div style={{ display: "flex", gap: 2, padding: "20px 0 0", marginBottom: 4, borderBottom: `1px solid ${t.border}` }}>
              {TABS.map(tb => (
                <button key={tb} onClick={() => setTab(tb)} style={{ padding: "9px 18px", border: "none", cursor: "pointer", background: "transparent", fontFamily: "'DM Sans', sans-serif", fontSize: 13.5, fontWeight: tab === tb ? 600 : 400, color: tab === tb ? t.accent : t.muted, borderBottom: `2px solid ${tab === tb ? t.accent : "transparent"}`, marginBottom: -1, transition: "all .15s" }}>
                  {tb}
                </button>
              ))}
            </div>

            {/* ── CONTA ── */}
            {tab === "Conta" && (
              <div style={{ animation: "fadeUp .3s ease both" }}>
                <Section title="Perfil" desc="Suas informações públicas e dados de contato." t={t}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 4 }}>
                    <div style={{ position: "relative" }}>
                      <div style={{ width: 72, height: 72, borderRadius: "50%", background: "linear-gradient(135deg,#f97316,#ea580c)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 800, fontSize: 24, fontFamily: "'Plus Jakarta Sans', sans-serif", boxShadow: t.shadowLg }}>
                        AR
                      </div>
                      <button style={{ position: "absolute", bottom: 0, right: 0, width: 26, height: 26, borderRadius: "50%", background: t.card, border: `1.5px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: t.muted, boxShadow: t.shadow }}>
                        <Icon.camera />
                      </button>
                    </div>
                    <div>
                      <p style={{ fontSize: 15, fontWeight: 600, color: t.text }}>Alex Rivera</p>
                      <p style={{ fontSize: 12.5, color: t.muted, marginTop: 2 }}>Rivera Hair Studio · São Paulo, SP</p>
                      <div style={{ display: "flex", alignItems: "center", gap: 5, marginTop: 6 }}>
                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e" }} />
                        <span style={{ fontSize: 11.5, color: t.green, fontWeight: 500 }}>Ativo · Plano gratuito</span>
                      </div>
                    </div>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <Input label="Nome" value={form.firstName} onChange={set("firstName")} t={t} />
                    <Input label="Sobrenome" value={form.lastName} onChange={set("lastName")} t={t} />
                  </div>
                  <Input label="E-mail" value={form.email} onChange={set("email")} t={t} type="email" />
                  <Input label="Telefone" value={form.phone} onChange={set("phone")} t={t} />
                </Section>

                <Section title="Negócio" desc="Informações do seu negócio exibidas para os clientes." t={t}>
                  <Input label="Nome do negócio" value={form.business} onChange={set("business")} t={t} />
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <Input label="Cidade" value={form.city} onChange={set("city")} t={t} />
                    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                      <label style={{ fontSize: 12, fontWeight: 500, color: t.muted, letterSpacing: "0.02em" }}>Fuso horário</label>
                      <select value={form.timezone} onChange={e => set("timezone")(e.target.value)} style={{ background: t.input, border: `1px solid ${t.inputBord}`, borderRadius: 10, padding: "10px 14px", fontSize: 14, color: t.text, outline: "none", cursor: "pointer" }}>
                        {["GMT-3 (Brasília)","GMT-4 (Manaus)","GMT-5 (Acre)","GMT-2 (Fernando de Noronha)"].map(tz => (
                          <option key={tz} value={tz}>{tz}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </Section>

                <Section title="Conexão WhatsApp" desc="O número que seus clientes usam para agendar." t={t}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 16px", background: t.greenBg, border: `1px solid rgba(34,197,94,0.2)`, borderRadius: 12 }}>
                    <Icon.wa />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 13, fontWeight: 600, color: t.green }}>Conectado · {form.whatsapp}</p>
                      <p style={{ fontSize: 11.5, color: t.muted, marginTop: 2 }}>Recebendo mensagens · Último ping há 2 min</p>
                    </div>
                    <button style={{ fontSize: 12, fontWeight: 500, color: t.muted, background: "transparent", border: `1px solid ${t.border}`, borderRadius: 8, padding: "5px 12px", cursor: "pointer" }}>Alterar</button>
                  </div>
                  <Input label="Número do WhatsApp" value={form.whatsapp} onChange={set("whatsapp")} t={t} disabled />
                </Section>

                <div style={{ display: "flex", justifyContent: "flex-end", paddingTop: 24, gap: 10 }}>
                  <button onClick={() => setForm(INITIAL)} style={{ padding: "10px 22px", borderRadius: 10, border: `1px solid ${t.border}`, background: "transparent", color: t.muted, fontSize: 13.5, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                    Resetar
                  </button>
                  <button onClick={handleSave} style={{ padding: "10px 24px", borderRadius: 10, border: "none", background: t.accent, color: "white", fontSize: 13.5, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 8, fontFamily: "'DM Sans', sans-serif", boxShadow: "0 2px 12px rgba(249,115,22,0.35)" }}>
                    {saved ? <><Icon.check /> Salvo!</> : "Salvar alterações"}
                  </button>
                </div>
              </div>
            )}

            {/* ── NOTIFICAÇÕES ── */}
            {tab === "Notificações" && (
              <div style={{ animation: "fadeUp .3s ease both", paddingTop: 8 }}>
                {[
                  { key: "notifBooking"  as const, label: "Novo agendamento",   desc: "Seja notificado quando um cliente agendar." },
                  { key: "notifReminder" as const, label: "Lembretes",          desc: "Receba alertas antes dos próximos atendimentos." },
                  { key: "notifCancel"   as const, label: "Cancelamentos",      desc: "Seja avisado quando um cliente cancelar ou remarcar." },
                  { key: "notifWeekly"   as const, label: "Resumo semanal",     desc: "Um resumo da sua semana toda segunda-feira." },
                ].map(({ key, label, desc }) => (
                  <div key={key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 0", borderBottom: `1px solid ${t.border}` }}>
                    <div>
                      <p style={{ fontSize: 14, fontWeight: 500, color: t.text, marginBottom: 3 }}>{label}</p>
                      <p style={{ fontSize: 12.5, color: t.muted }}>{desc}</p>
                    </div>
                    <Toggle on={form[key] as boolean} onToggle={() => set(key)(!form[key])} t={t} />
                  </div>
                ))}
              </div>
            )}

            {/* ── INTEGRAÇÕES ── */}
            {tab === "Integrações" && (
              <div style={{ animation: "fadeUp .3s ease both", paddingTop: 8 }}>
                {([
                  { name: "Google Calendar", desc: "Sincronize cada agendamento automaticamente com seu calendário.", connected: true,  iconBg: "#f0f4ff", iconBgDark: "#1a1f35",
                    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2.5" fill="#1a73e8"/><line x1="8" y1="2" x2="8" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round"/><line x1="16" y1="2" x2="16" y2="6" stroke="white" strokeWidth="2" strokeLinecap="round"/><rect x="7" y="11" width="3" height="3" rx="0.5" fill="white"/><rect x="11" y="11" width="3" height="3" rx="0.5" fill="#4285F4"/><rect x="15" y="11" width="2" height="3" rx="0.5" fill="white"/><rect x="7" y="15.5" width="3" height="3" rx="0.5" fill="#4285F4"/><rect x="11" y="15.5" width="3" height="3" rx="0.5" fill="#4285F4"/></svg> },
                  { name: "Google Meet",     desc: "Crie links do Meet automaticamente para consultas.", connected: false, iconBg: "#edfaf4", iconBgDark: "#0f2a1e",
                    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="5" fill="#00BFA5"/><rect x="4" y="7" width="11" height="10" rx="2" fill="white"/><path d="M15 10.5l4-2.5v8l-4-2.5V10.5z" fill="white"/></svg> },
                  { name: "Stripe",          desc: "Aceite pagamentos e cobranças no momento do agendamento.", connected: false, iconBg: "#f0effe", iconBgDark: "#1a1635",
                    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="5" fill="#6772E5"/><path d="M11.5 9.5c0-.8.7-1.1 1.8-1.1 1.6 0 3.3.5 4.7 1.3V6.2C16.6 5.4 15 5 13.3 5 9.8 5 7.5 6.8 7.5 9.7c0 4.5 6.2 3.8 6.2 5.7 0 .9-.8 1.2-2 1.2-1.7 0-3.6-.7-5.2-1.7v3.6c1.5.7 3.1 1 4.6 1 3.6 0 6.1-1.8 6.1-4.8-.1-4.8-6.2-4-6.2-5.9h.4z" fill="white"/></svg> },
                  { name: "Zapier",          desc: "Conecte o reminder a mais de 5.000 aplicativos via Zapier.", connected: false, iconBg: "#fff2ed", iconBgDark: "#2a1208",
                    icon: <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><rect width="24" height="24" rx="5" fill="#FF4A00"/><path d="M12 4l1.8 5.5H19l-4.6 3.3 1.8 5.5L12 15l-4.2 3.3 1.8-5.5L5 9.5h5.2L12 4z" fill="white"/></svg> },
                ] as Array<{name:string;desc:string;connected:boolean;iconBg:string;iconBgDark:string;icon:React.ReactNode}>).map(itg => (
                  <div key={itg.name} style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px 0", borderBottom: `1px solid ${t.border}` }}>
                    <div style={{ width: 46, height: 46, borderRadius: 12, background: dark ? itg.iconBgDark : itg.iconBg, border: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      {itg.icon}
                    </div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 14, fontWeight: 600, color: t.text }}>{itg.name}</p>
                      <p style={{ fontSize: 12.5, color: t.muted, marginTop: 2 }}>{itg.desc}</p>
                    </div>
                    {itg.connected ? (
                      <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "6px 12px", background: t.greenBg, border: `1px solid rgba(34,197,94,0.2)`, borderRadius: 99 }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: t.green }} />
                        <span style={{ fontSize: 12, color: t.green, fontWeight: 500 }}>Conectado</span>
                      </div>
                    ) : (
                      <button style={{ padding: "7px 16px", border: `1px solid ${t.border}`, borderRadius: 10, background: "transparent", color: t.muted, fontSize: 13, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                        Conectar
                      </button>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* ── PLANOS ── */}
            {tab === "Planos" && (
              <div style={{ animation: "fadeUp .3s ease both", paddingTop: 8 }}>
                <div style={{ padding: "20px", background: t.accentBg, border: `1px solid ${t.accentBrd}`, borderRadius: 16, marginTop: 16, marginBottom: 20 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 600, color: t.accent, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 6 }}>Plano atual</p>
                      <p style={{ fontSize: 22, fontWeight: 800, color: t.text, fontFamily: "'Plus Jakarta Sans', sans-serif", letterSpacing: "-0.02em" }}>Gratuito</p>
                      <p style={{ fontSize: 13, color: t.muted, marginTop: 4 }}>Até 30 agendamentos / mês · 1 número WhatsApp</p>
                    </div>
                    <button style={{ padding: "9px 20px", border: "none", borderRadius: 10, background: t.accent, color: "white", fontSize: 13.5, fontWeight: 600, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                      Fazer upgrade
                    </button>
                  </div>
                  <div style={{ marginTop: 16, height: 6, borderRadius: 99, background: t.border, overflow: "hidden" }}>
                    <div style={{ width: "73%", height: "100%", borderRadius: 99, background: t.accent }} />
                  </div>
                  <p style={{ fontSize: 11.5, color: t.muted, marginTop: 6 }}>22 de 30 agendamentos usados este mês</p>
                </div>

                {[
                  { plan: "Pro",      price: "R$ 49", desc: "Agendamentos ilimitados · 3 números · Relatórios", highlight: true },
                  { plan: "Business", price: "R$ 119", desc: "Tudo do Pro · Acesso em equipe · Suporte prioritário", highlight: false },
                ].map(p => (
                  <div key={p.plan} style={{ display: "flex", alignItems: "center", gap: 16, padding: "18px", border: `1px solid ${p.highlight ? t.accent : t.border}`, borderRadius: 14, marginBottom: 10, background: p.highlight ? t.accentBg : "transparent" }}>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 15, fontWeight: 700, color: t.text, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{p.plan}</p>
                      <p style={{ fontSize: 12.5, color: t.muted, marginTop: 2 }}>{p.desc}</p>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <p style={{ fontSize: 18, fontWeight: 800, color: t.text, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{p.price}<span style={{ fontSize: 12, fontWeight: 400, color: t.muted }}>/mês</span></p>
                      <button style={{ marginTop: 8, padding: "6px 14px", border: `1px solid ${p.highlight ? t.accent : t.border}`, borderRadius: 8, background: p.highlight ? t.accent : "transparent", color: p.highlight ? "white" : t.muted, fontSize: 12.5, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
                        Selecionar
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </>
  );
}