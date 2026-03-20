// hooks/useTheme.ts
"use client";

import { useState, useEffect } from "react";

export function buildTokens(dark: boolean) {
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
    greenBrd:  "rgba(34,197,94,0.2)",
    red:       "#ef4444",
    redBg:     dark ? "rgba(239,68,68,0.12)"  : "rgba(239,68,68,0.07)",
    redBrd:    "rgba(239,68,68,0.2)",
    amber:     "#f59e0b",
    amberBg:   dark ? "rgba(245,158,11,0.12)" : "rgba(245,158,11,0.08)",
    amberBrd:  "rgba(245,158,11,0.2)",
  };
}

export type Tokens = ReturnType<typeof buildTokens>;

export function useTheme() {
  const [dark, setDarkState] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("reminder-theme");
    if (stored !== null) {
      setDarkState(stored === "dark");
    }
    setMounted(true);
  }, []);

  function setDark(value: boolean | ((prev: boolean) => boolean)) {
    setDarkState(prev => {
      const next = typeof value === "function" ? value(prev) : value;
      localStorage.setItem("reminder-theme", next ? "dark" : "light");
      return next;
    });
  }

  const t = buildTokens(dark);
  return { dark, setDark, t, mounted };
}