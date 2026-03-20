"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

/* ─── Tipos ──────────────────────────────────────────── */
export interface Tokens {
  dark: boolean;
  sidebar: string;
  border: string;
  input: string;
  text: string;
  muted: string;
  subtle: string;
  accent: string;
  accentBg: string;
  accentBrd: string;
  navActive: string;
  shadow: string;
  green: string;
  greenBg: string;
}

interface SidebarProps {
  t: Tokens;
  onThemeToggle: () => void;
}

/* ─── Ícones de navegação ────────────────────────────── */
function AgendamentosIcon() {
  return (
    <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function ClientesIcon() {
  return (
    <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function RelatoriosIcon() {
  return (
    <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
      <path d="M18 20V10M12 20V4M6 20v-6" strokeLinecap="round" />
    </svg>
  );
}

function DispositivosIcon() {
  return (
    <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
      <rect x="5" y="2" width="14" height="20" rx="2" />
      <line x1="12" y1="18" x2="12" y2="18" strokeLinecap="round" strokeWidth="2.5" />
    </svg>
  );
}

function ConfiguracoesIcon() {
  return (
    <svg width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
    </svg>
  );
}

function SolIcon() {
  return (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" /><line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" /><line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" /><line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" /><line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function LuaIcon() {
  return (
    <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  );
}

function SairIcon() {
  return (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.7" viewBox="0 0 24 24">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" y1="12" x2="9" y2="12" />
    </svg>
  );
}

function WaIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.17 12.17 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
    </svg>
  );
}

/* ─── Itens de navegação ─────────────────────────────── */
const NAV_PRINCIPAL = [
  { label: "Agendamentos", href: "/agendamentos", icon: AgendamentosIcon, badge: 12 },
  { label: "Clientes",     href: "/clientes",     icon: ClientesIcon,     badge: null },
  { label: "Relatórios",   href: "/relatorios",   icon: RelatoriosIcon,   badge: null },
];

const NAV_GERENCIAR = [
  { label: "Dispositivos",  href: "/dispositivos",   icon: DispositivosIcon  },
  { label: "Configurações", href: "/configuracoes",  icon: ConfiguracoesIcon },
];

/* ─── Toggle ─────────────────────────────────────────── */
function Toggle({ on, onToggle, t }: { on: boolean; onToggle: () => void; t: Tokens }) {
  return (
    <button
      onClick={onToggle}
      style={{ width: 40, height: 22, borderRadius: 99, border: "none", cursor: "pointer", position: "relative", transition: "background .2s", background: on ? t.accent : t.subtle, flexShrink: 0 }}
    >
      <div style={{ position: "absolute", top: 3, left: on ? 21 : 3, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "left .2s", boxShadow: "0 1px 3px rgba(0,0,0,0.25)" }} />
    </button>
  );
}

/* ─── Link de navegação ──────────────────────────────── */
function NavLink({ href, label, icon: Icone, badge, t }: {
  href: string; label: string; icon: () => React.ReactElement;
  badge?: number | null; t: Tokens;
}) {
  const pathname = usePathname();
  const ativo = pathname === href || pathname.startsWith(href + "/");

  return (
    <Link
      href={href}
      style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 10, textDecoration: "none", background: ativo ? t.navActive : "transparent", color: ativo ? t.accent : t.muted, fontWeight: ativo ? 600 : 400, fontSize: 13.5, transition: "all .15s" }}
    >
      <Icone />
      <span style={{ flex: 1 }}>{label}</span>
      {badge != null && (
        <span style={{ fontSize: 10, fontWeight: 700, color: "white", background: t.accent, borderRadius: 99, padding: "1px 7px", lineHeight: 1.6 }}>
          {badge}
        </span>
      )}
    </Link>
  );
}

/* ─── Label de seção ─────────────────────────────────── */
function LabelSecao({ label, t }: { label: string; t: Tokens }) {
  return (
    <p style={{ fontSize: 10.5, fontWeight: 600, color: t.muted, letterSpacing: "0.07em", textTransform: "uppercase", padding: "0 12px", marginBottom: 2 }}>
      {label}
    </p>
  );
}

/* ─── Sidebar ────────────────────────────────────────── */
export default function Sidebar({ t, onThemeToggle }: SidebarProps) {
  const [recolhida, setRecolhida] = useState(false);

  return (
    <>
      <style>{`
        .sidebar-link:hover { background: ${t.navActive} !important; color: ${t.accent} !important; }
        .sidebar-btn:hover  { background: ${t.input} !important; }
        @keyframes waPulse  { 0%,100%{opacity:1} 50%{opacity:.4} }
      `}</style>

      <aside style={{ width: recolhida ? 64 : 220, flexShrink: 0, background: t.sidebar, borderRight: `1px solid ${t.border}`, display: "flex", flexDirection: "column", height: "100vh", position: "sticky", top: 0, overflowY: "auto", overflowX: "hidden", transition: "width .25s ease, background .25s", boxShadow: t.shadow }}>

        {/* Logo + botão recolher */}
        <div style={{ padding: recolhida ? "20px 0" : "20px 16px 16px", borderBottom: `1px solid ${t.border}`, display: "flex", alignItems: "center", justifyContent: recolhida ? "center" : "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
            <div style={{ width: 28, height: 28, borderRadius: 8, background: t.accentBg, border: `1px solid ${t.accentBrd}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" stroke={t.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" stroke={t.accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            {!recolhida && <span style={{ fontWeight: 700, fontSize: 14.5, color: t.text, letterSpacing: "-0.02em" }}>reminder</span>}
          </div>

          {!recolhida && (
            <button onClick={() => setRecolhida(true)} className="sidebar-btn" style={{ background: "transparent", border: "none", cursor: "pointer", color: t.muted, borderRadius: 7, padding: 4, display: "flex", alignItems: "center", justifyContent: "center", transition: "background .15s" }}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}

          {recolhida && (
            <button onClick={() => setRecolhida(false)} className="sidebar-btn" style={{ position: "absolute", bottom: 70, left: "50%", transform: "translateX(-50%)", background: t.input, border: `1px solid ${t.border}`, cursor: "pointer", color: t.muted, borderRadius: 7, padding: "4px 6px", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .15s" }}>
              <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          )}
        </div>

        {/* Usuário */}
        {!recolhida ? (
          <div style={{ margin: "12px 10px 8px", padding: "10px 12px", background: t.input, border: `1px solid ${t.border}`, borderRadius: 12, display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#f97316,#ea580c)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 12, flexShrink: 0, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
              AR
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 12.5, fontWeight: 600, color: t.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Alex Rivera</p>
              <p style={{ fontSize: 10.5, color: t.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Rivera Hair Studio</p>
            </div>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#22c55e", flexShrink: 0 }} />
          </div>
        ) : (
          <div style={{ display: "flex", justifyContent: "center", padding: "10px 0" }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg,#f97316,#ea580c)", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: 700, fontSize: 12, fontFamily: "'Plus Jakarta Sans', sans-serif", position: "relative" }}>
              AR
              <div style={{ position: "absolute", bottom: 0, right: 0, width: 8, height: 8, borderRadius: "50%", background: "#22c55e", border: `1.5px solid ${t.sidebar}` }} />
            </div>
          </div>
        )}

        {/* Status WhatsApp */}
        {!recolhida && (
          <div style={{ margin: "0 10px 10px", padding: "8px 12px", background: t.greenBg, border: `1px solid rgba(34,197,94,0.2)`, borderRadius: 10, display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ color: "#22c55e" }}><WaIcon /></span>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontSize: 11, fontWeight: 600, color: "#22c55e", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>WhatsApp conectado</p>
              <p style={{ fontSize: 10, color: t.muted }}>+55 (11) 91234-5678</p>
            </div>
            <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", flexShrink: 0, animation: "waPulse 2s ease-in-out infinite" }} />
          </div>
        )}

        {/* Navegação */}
        <nav style={{ flex: 1, padding: recolhida ? "6px 8px" : "6px 10px", display: "flex", flexDirection: "column", gap: 1 }}>
          {!recolhida && <LabelSecao label="Principal" t={t} />}

          {NAV_PRINCIPAL.map(({ label, href, icon: NavIcone, badge }) =>
            recolhida ? (
              <Link key={href} href={href} title={label} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "9px 0", borderRadius: 10, textDecoration: "none", color: t.muted, transition: "all .15s", position: "relative" }}>
                <NavIcone />
                {badge != null && <span style={{ position: "absolute", top: 4, right: 4, width: 8, height: 8, borderRadius: "50%", background: t.accent, border: `1.5px solid ${t.sidebar}` }} />}
              </Link>
            ) : (
              <NavLink key={href} href={href} label={label} icon={NavIcone} badge={badge} t={t} />
            )
          )}

          <div style={{ margin: "12px 0 4px", borderTop: `1px solid ${t.border}` }} />
          {!recolhida && <LabelSecao label="Gerenciar" t={t} />}

          {NAV_GERENCIAR.map(({ label, href, icon: NavIcone }) =>
            recolhida ? (
              <Link key={href} href={href} title={label} style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "9px 0", borderRadius: 10, textDecoration: "none", color: t.muted, transition: "all .15s" }}>
                <NavIcone />
              </Link>
            ) : (
              <NavLink key={href} href={href} label={label} icon={NavIcone} t={t} />
            )
          )}
        </nav>

        {/* Rodapé: tema + sair */}
        <div style={{ padding: recolhida ? "12px 8px" : "12px 10px", borderTop: `1px solid ${t.border}`, display: "flex", flexDirection: "column", gap: 4 }}>
          {!recolhida ? (
            <>
              <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 10, background: t.input, border: `1px solid ${t.border}` }}>
                <span style={{ color: t.muted, display: "flex" }}>{t.dark ? <LuaIcon /> : <SolIcon />}</span>
                <span style={{ fontSize: 13, color: t.muted, flex: 1 }}>{t.dark ? "Modo escuro" : "Modo claro"}</span>
                <Toggle on={t.dark} onToggle={onThemeToggle} t={t} />
              </div>
              <button className="sidebar-btn" style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", borderRadius: 10, border: "none", background: "transparent", color: t.muted, fontSize: 13.5, cursor: "pointer", fontFamily: "'DM Sans', sans-serif", transition: "background .15s" }}>
                <SairIcon /> Sair
              </button>
            </>
          ) : (
            <>
              <button onClick={onThemeToggle} className="sidebar-btn" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 0", borderRadius: 10, border: "none", background: "transparent", color: t.muted, cursor: "pointer", transition: "background .15s" }}>
                {t.dark ? <LuaIcon /> : <SolIcon />}
              </button>
              <button className="sidebar-btn" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "8px 0", borderRadius: 10, border: "none", background: "transparent", color: t.muted, cursor: "pointer", transition: "background .15s" }}>
                <SairIcon />
              </button>
            </>
          )}
        </div>
      </aside>
    </>
  );
}