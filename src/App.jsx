import React, { useState, useEffect } from "react";
import photoHydroponie from "./assets/PHOTO HYDROPONI.jpeg";
import {
  Home, Layers, Sprout, Droplet, FlaskConical, Bot, Radio, AlertTriangle,
  Wheat, Package, Wallet, Wrench, BarChart3, Users, History, Settings,
  Sun, Moon, Bell, LogOut, X, Plus, Play, Square, RotateCcw, CheckCircle2,
  Wifi, Thermometer, Activity, Gauge, Eye, EyeOff, ShieldCheck, ArrowLeft,
  Menu, Power, MessageSquare, Send, Pencil, Trash2, Mic, MicOff,
} from "lucide-react";

/* ============================== THEME ============================== */
const themes = {
  light: {
    bg: "#F7FDF8", panel: "#FFFFFF", panel2: "#F0FDF4", border: "#D7ECDD",
    text: "#14291A", textMuted: "#5B7462", green: "#15803D", greenSoft: "#DCFCE7",
    blue: "#0284C7", blueSoft: "#E0F2FE", amber: "#D98A1E", amberSoft: "#FBF0DE",
    red: "#DC2626", redSoft: "#FBE7E5", sidebar: "#14291A", sidebarText: "#CFE8D6",
    greenDeep: "#166534", greenFresh: "#22C55E", greenPale: "#86EFAC",
  },
  dark: {
    bg: "#0B1710", panel: "#12201A", panel2: "#17281F", border: "#20362A",
    text: "#EAF7EE", textMuted: "#8FB39B", green: "#4ADE80", greenSoft: "#173424",
    blue: "#38BDF8", blueSoft: "#12283A", amber: "#E8A33D", amberSoft: "#3A2C15",
    red: "#F87171", redSoft: "#3A1917", sidebar: "#0A1710", sidebarText: "#A9CBB5",
    greenDeep: "#166534", greenFresh: "#4ADE80", greenPale: "#86EFAC",
  },
};

const GLOBAL_CSS = `
@keyframes hs-pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.55; } }

@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=IBM+Plex+Mono:wght@500;600&display=swap');
* { box-sizing: border-box; }
.hs-shell { display: flex; min-height: 100vh; width: 100%; }
.hs-sidebar { width: 224px; flex-shrink: 0; display: flex; flex-direction: column; padding: 18px 12px; transition: transform .25s ease; z-index: 210; }
.hs-hamburger { display: none; }
.hs-overlay { display: none; }
.hs-main { flex: 1; min-width: 0; display: flex; flex-direction: column; }
.hs-topbar { display: flex; align-items: center; gap: 12px; padding: 0 22px; flex-wrap: wrap; min-height: 58px; }
.hs-content { padding: 22px; flex: 1; }
.hs-grid-metrics { display: flex; gap: 14px; flex-wrap: wrap; }
.hs-grid-cards { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px,1fr)); gap: 14px; }
.hs-two-col { display: flex; gap: 14px; flex-wrap: wrap; }
.hs-table-wrap { overflow-x: auto; }
.hs-table-wrap table { min-width: 560px; }
.hs-modal-box { width: 100%; }
.hs-page-header { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 20px; flex-wrap: wrap; gap: 12px; }
.hs-btn-row { display: flex; gap: 8px; flex-wrap: wrap; }

@media (max-width: 900px) {
  .hs-sidebar { position: fixed; top: 0; left: 0; bottom: 0; transform: translateX(-100%); box-shadow: 10px 0 30px -10px #0006; }
  .hs-sidebar.open { transform: translateX(0); }
  .hs-hamburger { display: flex; }
  .hs-overlay.open { display: block; position: fixed; inset: 0; background: #00000080; z-index: 205; }
  .hs-content { padding: 14px; }
  .hs-topbar { padding: 0 12px; }
  .hs-page-header { align-items: flex-start; }
}
@media (max-width: 620px) {
  .hs-grid-metrics { flex-direction: column; }
  .hs-two-col { flex-direction: column; }
  .hs-topbar .hs-brand-inline { display: none; }
}
`;

/* ============================== LOGO ============================== */
function Logo({ size = 36 }) {
  const id = React.useId ? React.useId() : "logo";
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none">
      <defs>
        <radialGradient id={`sphere-${id}`} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#EAF6EE" />
          <stop offset="55%" stopColor="#7FD4A6" />
          <stop offset="100%" stopColor="#1F7A48" />
        </radialGradient>
        <linearGradient id={`ring-${id}`} x1="0" y1="0" x2="100" y2="100">
          <stop stopColor="#4FC17F" /><stop offset="1" stopColor="#5FB6E8" />
        </linearGradient>
      </defs>
      <circle cx="50" cy="50" r="36" fill="none" stroke={`url(#ring-${id})`} strokeWidth="2.2" strokeDasharray="5 6" opacity="0.75" />
      <circle cx="50" cy="50" r="29" fill="none" stroke={`url(#ring-${id})`} strokeWidth="1.4" opacity="0.4" />
      <circle cx="50" cy="50" r="22" fill={`url(#sphere-${id})`} />
      <path d="M50 38c0 0-7 8-7 13a7 7 0 0 0 14 0c0-5-7-13-7-13z" fill="#0F5A32" opacity="0.85" />
      <circle cx="50" cy="12" r="2.6" fill={`url(#ring-${id})`} />
    </svg>
  );
}

/* ============================== MOCK DATA ============================== */
const CULTURES_DEFAUT = [
  { id: "cu1", nom: "Laitue", cycle: "35 j", ph: "5,8–6,5", ec: "1,2–1,8", temp: "18–24°C", systeme: "NFT", emoji: "🥬" },
  { id: "cu2", nom: "Tomate", cycle: "80 j", ph: "5,8–6,3", ec: "2,0–2,8", temp: "20–26°C", systeme: "DWC", emoji: "🍅" },
  { id: "cu3", nom: "Concombre", cycle: "55 j", ph: "5,8–6,2", ec: "1,8–2,4", temp: "20–26°C", systeme: "DWC", emoji: "🥒" },
  { id: "cu4", nom: "Poivron", cycle: "75 j", ph: "5,8–6,3", ec: "2,0–2,6", temp: "20–26°C", systeme: "NFT", emoji: "🫑" },
  { id: "cu5", nom: "Piment", cycle: "70 j", ph: "5,8–6,3", ec: "2,0–2,6", temp: "22–28°C", systeme: "NFT", emoji: "🌶️" },
  { id: "cu6", nom: "Aubergine", cycle: "85 j", ph: "5,8–6,3", ec: "2,2–2,8", temp: "21–27°C", systeme: "DWC", emoji: "🍆" },
  { id: "cu7", nom: "Gombo", cycle: "60 j", ph: "6,0–6,5", ec: "1,6–2,2", temp: "22–28°C", systeme: "Ebb & Flow", emoji: "🌿" },
  { id: "cu8", nom: "Chou", cycle: "70 j", ph: "6,0–6,8", ec: "1,8–2,4", temp: "16–22°C", systeme: "NFT", emoji: "🥬" },
  { id: "cu9", nom: "Carotte", cycle: "75 j", ph: "5,8–6,4", ec: "1,4–2,0", temp: "16–22°C", systeme: "Substrat", emoji: "🥕" },
];

const ZONES_INIT = [
  { id: "zA", nom: "Zone A", culture: "Laitue", plants: 500, systeme: "NFT", capacite: 500, niveau: 420, ph: 6.1, ec: 1.7, temp: 23.4, debit: 8.2, pompe: true, vanneEntree: true, vanneEvac: false, etat: "ok" },
  { id: "zB", nom: "Zone B", culture: "Tomate", plants: 300, systeme: "DWC", capacite: 400, niveau: 340, ph: 6.2, ec: 2.4, temp: 24.9, debit: 6.5, pompe: true, vanneEntree: true, vanneEvac: false, etat: "ok" },
  { id: "zC", nom: "Zone C", culture: "Concombre", plants: 220, systeme: "DWC", capacite: 350, niveau: 95, ph: 6.0, ec: 2.1, temp: 24.1, debit: 5.8, pompe: false, vanneEntree: false, vanneEvac: false, etat: "critique" },
  { id: "zD", nom: "Zone D", culture: "Poivron", plants: 180, systeme: "NFT", capacite: 300, niveau: 260, ph: 6.3, ec: 2.2, temp: 23.8, debit: 6.0, pompe: true, vanneEntree: true, vanneEvac: false, etat: "ok" },
];

const seuils = { ph: [5.5, 6.6], ec: [1.0, 2.6], temp: [18, 27] };
function hors([lo, hi], v) { return v < lo || v > hi; }
function parseNum(str) {
  // Sécurité : n'accepte que des nombres, gère la virgule décimale, prend la 1ère valeur d'une plage "5,8–6,5"
  if (typeof str !== "string") return NaN;
  const m = str.replace(",", ".").match(/-?\d+(\.\d+)?/);
  return m ? parseFloat(m[0]) : NaN;
}

const CAPTEURS_INIT = [
  { id: "s1", nom: "Niveau d'eau — Zone A", type: "Niveau d'eau", zone: "Zone A", unite: "%", valeur: 84, min: 20, max: 100, connecte: true, maj: "il y a 30 s" },
  { id: "s2", nom: "pH — Zone A", type: "pH", zone: "Zone A", unite: "", valeur: 6.1, min: 5.5, max: 6.6, connecte: true, maj: "il y a 30 s" },
  { id: "s3", nom: "EC — Zone A", type: "EC", zone: "Zone A", unite: "mS/cm", valeur: 1.7, min: 1.0, max: 2.6, connecte: true, maj: "il y a 30 s" },
  { id: "s4", nom: "Température eau — Zone A", type: "Température de l'eau", zone: "Zone A", unite: "°C", valeur: 23.4, min: 18, max: 27, connecte: true, maj: "il y a 30 s" },
  { id: "s5", nom: "Débit — Zone A", type: "Débit", zone: "Zone A", unite: "L/min", valeur: 8.2, min: 2, max: 12, connecte: true, maj: "il y a 5 s" },
  { id: "s6", nom: "Température ambiante", type: "Température ambiante", zone: "Exploitation", unite: "°C", valeur: 27.8, min: 15, max: 32, connecte: true, maj: "il y a 1 min" },
  { id: "s7", nom: "Humidité", type: "Humidité", zone: "Exploitation", unite: "%", valeur: 61, min: 40, max: 80, connecte: true, maj: "il y a 1 min" },
  { id: "s8", nom: "Détecteur de fuite — Zone C", type: "Fuite", zone: "Zone C", unite: "", valeur: 0, min: 0, max: 1, connecte: false, maj: "il y a 12 min" },
];

const TYPES_CAPTEUR = ["pH", "EC", "Température de l'eau", "Niveau d'eau", "Débit", "Température ambiante", "Humidité", "Pression", "Fuite", "Oxygène dissous", "Luminosité", "CO₂", "Autre"];

const alertesData = [
  { niveau: "red", titre: "Niveau d'eau critique", zone: "Zone C", heure: "11:30", desc: "Réservoir à 27 % (95/350 L).", action: "Lancer un remplissage immédiat." },
  { niveau: "amber", titre: "EC légèrement élevé", zone: "Zone B", heure: "10:42", desc: "EC à 2,4 mS/cm, proche du seuil haut.", action: "Diluer avec de l'eau claire." },
  { niveau: "green", titre: "Remplissage terminé", zone: "Zone A", heure: "08:15", desc: "Cycle de remplissage effectué avec succès.", action: "Aucune action requise." },
];

const historiqueData = [
  { h: "10:42", zone: "Zone A", action: "Remplissage démarré — 100 L", user: "T. Diallo" },
  { h: "10:55", zone: "Zone A", action: "Remplissage terminé", user: "Système" },
  { h: "11:03", zone: "Zone A", action: "Nutriment A ajouté — 250 ml", user: "T. Diallo" },
  { h: "11:08", zone: "Zone A", action: "Pompe activée", user: "T. Diallo" },
  { h: "11:30", zone: "Zone B", action: "Alerte EC élevée", user: "Système" },
];

const NUTRIENTS_INIT = [
  { id: "a", nom: "Nutriment A", ml: 8500 },
  { id: "b", nom: "Nutriment B", ml: 7200 },
]; // liste extensible — l'utilisateur peut créer d'autres nutriments (Cal-Mag, oligo-éléments, etc.)

const SEMENCES_INIT = [
  { id: "sem1", nom: "Graines laitue", sachets: 12, min: 5 },
  { id: "sem2", nom: "Graines tomate", sachets: 3, min: 5 },
];

const stockData = {
  Nutriments: [{ n: "Nutriment A", q: 8.5, u: "L", min: 3 }, { n: "Nutriment B", q: 7.2, u: "L", min: 3 }],
  Substrats: [{ n: "Billes d'argile", q: 18, u: "kg", min: 5 }, { n: "Laine de roche", q: 2, u: "plaques", min: 4 }],
  Matériel: [{ n: "Filtres réservoir", q: 6, u: "unités", min: 2 }],
  "Produits récoltés": [{ n: "Laitue (stock frigo)", q: 24, u: "kg", min: 10 }],
};

const FINANCES_INIT = {
  depenses: [{ poste: "Semences", montant: 220000 }, { poste: "Nutriments", montant: 540000 }, { poste: "Eau", montant: 180000 }, { poste: "Électricité", montant: 410000 }, { poste: "Main-d'œuvre", montant: 1200000 }, { poste: "Maintenance", montant: 150000 }],
  revenus: [{ source: "Ventes marché", montant: 4200000 }],
};

const maintenanceData = [
  { equip: "Pompe Zone A", etat: "ok", derniere: "12/07/2026", prochaine: "12/09/2026" },
  { equip: "Doseuse Nutriment A", etat: "ok", derniere: "01/08/2026", prochaine: "01/10/2026" },
  { equip: "Filtre Zone C", etat: "attention", derniere: "20/05/2026", prochaine: "20/08/2026" },
];

const usersData = [
  { nom: "M. Camara", role: "Administrateur", acces: "Accès complet" },
  { nom: "F. Bah", role: "Gestionnaire", acces: "Cultures, zones, stocks, rapports" },
  { nom: "T. Diallo", role: "Technicien", acces: "Équipements & maintenance" },
];

const automatisationsData = [
  { id: "au1", metric: "niveau", metricLabel: "Niveau d'eau", unit: "%", operator: "<", value: 30, action: "remplir", actionLabel: "Remplir jusqu'à", actionValue: 80, actionUnit: "%", on: true },
  { id: "au2", metric: "ec", metricLabel: "EC", unit: "mS/cm", operator: "<", value: 1.2, action: "ajouter_nutriments", actionLabel: "Ajouter nutriments", actionValue: 30, actionUnit: "ml", on: true },
  { id: "au3", metric: "ec", metricLabel: "EC", unit: "mS/cm", operator: ">", value: 2.6, action: "ajouter_eau", actionLabel: "Ajouter de l'eau", actionValue: 20, actionUnit: "L", on: true },
  { id: "au4", metric: "temp", metricLabel: "Température", unit: "°C", operator: ">", value: 28, action: "alerte", actionLabel: "Déclencher une alerte", actionValue: null, actionUnit: "", on: false },
  { id: "au5", metric: "pompe", metricLabel: "Pompe", unit: "", operator: "=", value: "défaillante", action: "arret_urgence", actionLabel: "Arrêter le système + alerte", actionValue: null, actionUnit: "", on: true },
];

const METRICS = [
  { id: "niveau", label: "Niveau d'eau", unit: "%" },
  { id: "ph", label: "pH", unit: "" },
  { id: "ec", label: "EC", unit: "mS/cm" },
  { id: "temp", label: "Température", unit: "°C" },
  { id: "pompe", label: "Pompe", unit: "" },
];
const ACTIONS = [
  { id: "remplir", label: "Remplir jusqu'à", unit: "%" },
  { id: "ajouter_nutriments", label: "Ajouter nutriments", unit: "ml" },
  { id: "ajouter_eau", label: "Ajouter de l'eau", unit: "L" },
  { id: "alerte", label: "Déclencher une alerte", unit: "" },
  { id: "arret_urgence", label: "Arrêter le système + alerte", unit: "" },
];

const recettesData = [
  { culture: "Laitue", a: 250, b: 250, ph: "5,8–6,5", ec: "1,2–1,8" },
  { culture: "Tomate", a: 400, b: 350, ph: "5,8–6,3", ec: "2,0–2,8" },
  { culture: "Concombre", a: 350, b: 320, ph: "5,8–6,2", ec: "1,8–2,4" },
  { culture: "Poivron", a: 380, b: 340, ph: "5,8–6,3", ec: "2,0–2,6" },
  { culture: "Piment", a: 380, b: 340, ph: "5,8–6,3", ec: "2,0–2,6" },
  { culture: "Aubergine", a: 420, b: 380, ph: "5,8–6,3", ec: "2,2–2,8" },
  { culture: "Gombo", a: 300, b: 280, ph: "6,0–6,5", ec: "1,6–2,2" },
  { culture: "Chou", a: 320, b: 300, ph: "6,0–6,8", ec: "1,8–2,4" },
  { culture: "Carotte", a: 260, b: 260, ph: "5,8–6,4", ec: "1,4–2,0" },
]; // une recette par défaut pour chaque culture du catalogue — sert de référence pré-remplie quand on dose une zone

const NAV = [
  { id: "dashboard", label: "Dashboard", icon: Home },
  { id: "zones", label: "Zones", icon: Layers },
  { id: "cultures", label: "Cultures", icon: Sprout },
  { id: "nutriments", label: "Nutriments", icon: FlaskConical },
  { id: "automatisation", label: "Automatisation", icon: Bot },
  { id: "hydroai", label: "HydroAI", icon: MessageSquare },
  { id: "capteurs", label: "Capteurs", icon: Radio },
  { id: "alertes", label: "Alertes", icon: AlertTriangle },
  { id: "recoltes", label: "Récoltes", icon: Wheat },
  { id: "stock", label: "Stock", icon: Package },
  { id: "finances", label: "Finances", icon: Wallet },
  { id: "maintenance", label: "Maintenance", icon: Wrench },
  { id: "rapports", label: "Rapports", icon: BarChart3 },
  { id: "utilisateurs", label: "Utilisateurs", icon: Users },
  { id: "historique", label: "Historique", icon: History },
  { id: "parametres", label: "Paramètres", icon: Settings },
];

/* ============================== UI HELPERS ============================== */
function Badge({ children, tone, T }) {
  const map = { green: [T.green, T.greenSoft], amber: [T.amber, T.amberSoft], red: [T.red, T.redSoft] };
  const [c, bg] = map[tone] || map.green;
  return <span style={{ background: bg, color: c, fontSize: 11.5, fontWeight: 600, padding: "3px 9px", borderRadius: 999, display: "inline-flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: c }} />{children}</span>;
}
function Card({ T, children, style }) { return <div style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 16, padding: 18, ...style }}>{children}</div>; }
function PageHeader({ T, title, sub, action, back }) {
  return (
    <div className="hs-page-header">
      <div>
        {back && <button onClick={back} style={{ background: "none", border: "none", color: T.textMuted, fontSize: 12.5, display: "flex", alignItems: "center", gap: 5, cursor: "pointer", marginBottom: 8, padding: 0 }}><ArrowLeft size={13} /> Retour aux zones</button>}
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontSize: 21, fontWeight: 700, color: T.text }}>{title}</div>
        {sub && <div style={{ fontSize: 12.5, color: T.textMuted, marginTop: 3 }}>{sub}</div>}
      </div>
      {action}
    </div>
  );
}
function Btn({ T, children, onClick, variant = "primary", small, icon: Icon, style }) {
  const styles = {
    primary: { background: T.green, color: "#fff", border: "none" },
    outline: { background: "transparent", color: T.text, border: `1px solid ${T.border}` },
    danger: { background: T.red, color: "#fff", border: "none" },
    subtle: { background: T.panel2, color: T.text, border: `1px solid ${T.border}` },
  };
  return (
    <button onClick={onClick} style={{ ...styles[variant], borderRadius: 10, padding: small ? "7px 12px" : "10px 16px", fontSize: small ? 12.5 : 13.5, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "'Inter',sans-serif", whiteSpace: "nowrap", ...style }}>
      {Icon && <Icon size={14} />} {children}
    </button>
  );
}
function Modal({ T, title, onClose, children, width = 440 }) {
  return (
    <div style={{ position: "fixed", inset: 0, background: "#0009", backdropFilter: "blur(3px)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 300, padding: 12 }} onClick={onClose}>
      <div className="hs-modal-box" onClick={(e) => e.stopPropagation()} style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 18, padding: 20, maxWidth: width, maxHeight: "85vh", overflowY: "auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 16, color: T.text }}>{title}</div>
          <button onClick={onClose} style={{ background: T.panel2, border: "none", borderRadius: 8, padding: 6, cursor: "pointer" }}><X size={15} color={T.textMuted} /></button>
        </div>
        {children}
      </div>
    </div>
  );
}
function Field({ T, label, children }) {
  return <div style={{ marginBottom: 12 }}><label style={{ fontSize: 12, color: T.textMuted, fontWeight: 600 }}>{label}</label><div style={{ marginTop: 5 }}>{children}</div></div>;
}
function inputStyle(T) { return { width: "100%", boxSizing: "border-box", background: T.panel2, border: `1px solid ${T.border}`, borderRadius: 10, padding: "9px 12px", color: T.text, fontSize: 13.5 }; }
function Toggle({ T, on, onClick }) {
  return <button onClick={onClick} style={{ width: 40, height: 22, borderRadius: 20, background: on ? T.green : T.border, border: "none", position: "relative", cursor: "pointer", flexShrink: 0 }}><span style={{ position: "absolute", top: 2, left: on ? 20 : 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left .2s" }} /></button>;
}
function MetricCard({ T, icon: Icon, label, value, unit, tone = "green" }) {
  const c = tone === "amber" ? T.amber : tone === "blue" ? T.blue : tone === "red" ? T.red : T.green;
  return (
    <Card T={T} style={{ flex: 1, minWidth: 128 }}>
      <div style={{ width: 30, height: 30, borderRadius: 8, background: `${c}1A`, display: "flex", alignItems: "center", justifyContent: "center" }}><Icon size={15} color={c} /></div>
      <div style={{ fontSize: 11.5, color: T.textMuted, marginTop: 10 }}>{label}</div>
      <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 19, fontWeight: 600, color: T.text, marginTop: 2 }}>{value}<span style={{ fontSize: 11.5, color: T.textMuted, marginLeft: 3 }}>{unit}</span></div>
    </Card>
  );
}
function MiniChart({ data, color }) {
  const max = Math.max(...data), min = Math.min(...data);
  const pts = data.map((v, i) => `${(i / (data.length - 1)) * 100},${30 - ((v - min) / (max - min || 1)) * 26}`).join(" ");
  return <svg viewBox="0 0 100 32" style={{ width: "100%", height: 54 }} preserveAspectRatio="none"><polyline points={pts} fill="none" stroke={color} strokeWidth="1.6" vectorEffect="non-scaling-stroke" /></svg>;
}
function ReservoirGauge({ T, niveau, capacite }) {
  const pct = Math.round((niveau / capacite) * 100);
  const col = pct < 30 ? T.red : T.blue;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ position: "relative", width: 68, height: 68, flexShrink: 0 }}>
        <svg width="68" height="68" viewBox="0 0 68 68">
          <circle cx="34" cy="34" r="28" fill="none" stroke={T.border} strokeWidth="7" />
          <circle cx="34" cy="34" r="28" fill="none" stroke={col} strokeWidth="7" strokeLinecap="round" strokeDasharray={2 * Math.PI * 28} strokeDashoffset={2 * Math.PI * 28 * (1 - pct / 100)} transform="rotate(-90 34 34)" style={{ transition: "stroke-dashoffset 1s ease" }} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'IBM Plex Mono',monospace", fontWeight: 600, fontSize: 13, color: T.text }}>{pct}%</div>
      </div>
      <div>
        <div style={{ fontSize: 11, color: T.textMuted, textTransform: "uppercase", letterSpacing: 0.5 }}>Réservoir</div>
        <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 17, color: T.text }}>{niveau} L <span style={{ color: T.textMuted, fontWeight: 500, fontSize: 12.5 }}>/ {capacite} L</span></div>
      </div>
    </div>
  );
}

/* ============================== LOGIN ============================== */
function Login({ T, onLogin }) {
  const [pw, setPw] = useState(""); const [show, setShow] = useState(false);
  const [role, setRole] = useState("Administrateur");
  return (
    <div style={{
      minHeight: "100vh", position: "relative", overflow: "hidden",
      background: `
        radial-gradient(circle at 15% 15%, ${T.greenPale}33, transparent 40%),
        radial-gradient(circle at 85% 20%, ${T.blue}22, transparent 45%),
        radial-gradient(circle at 50% 90%, ${T.greenFresh}26, transparent 50%),
        linear-gradient(165deg, ${T.greenDeep}14, ${T.bg} 55%)
      `,
      display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter',sans-serif", padding: 16,
    }}>
      <style>{GLOBAL_CSS}</style>
      {/* gouttes décoratives, esprit "après la pluie" */}
      <svg style={{ position: "absolute", top: "12%", left: "10%", opacity: 0.5 }} width="14" height="20" viewBox="0 0 14 20"><path d="M7 0C7 0 0 9 0 13a7 7 0 0 0 14 0C14 9 7 0 7 0z" fill={T.blue} /></svg>
      <svg style={{ position: "absolute", top: "22%", right: "14%", opacity: 0.35 }} width="10" height="14" viewBox="0 0 14 20"><path d="M7 0C7 0 0 9 0 13a7 7 0 0 0 14 0C14 9 7 0 7 0z" fill={T.greenFresh} /></svg>
      <svg style={{ position: "absolute", bottom: "16%", left: "18%", opacity: 0.3 }} width="9" height="13" viewBox="0 0 14 20"><path d="M7 0C7 0 0 9 0 13a7 7 0 0 0 14 0C14 9 7 0 7 0z" fill={T.blue} /></svg>
      <svg style={{ position: "absolute", bottom: "22%", right: "10%", opacity: 0.4 }} width="12" height="17" viewBox="0 0 14 20"><path d="M7 0C7 0 0 9 0 13a7 7 0 0 0 14 0C14 9 7 0 7 0z" fill={T.greenPale} /></svg>

      <div style={{ background: T.panel, border: `1px solid ${T.border}`, borderRadius: 20, padding: 30, width: "100%", maxWidth: 380, position: "relative", boxShadow: `0 30px 60px -20px ${T.greenDeep}22` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
          <div style={{ width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center" }}><Logo size={40} /></div>
          <div style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 18, color: T.text }}>HydroSmart</div>
        </div>
        <Field T={T} label="Email"><input defaultValue="exploitant@hydrosmart.gn" style={inputStyle(T)} /></Field>
        <Field T={T} label="Mot de passe">
          <div style={{ position: "relative" }}>
            <input type={show ? "text" : "password"} value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••" style={{ ...inputStyle(T), paddingRight: 40 }} />
            <button onClick={() => setShow((s) => !s)} style={{ position: "absolute", right: 10, top: 9, background: "none", border: "none", cursor: "pointer" }}>{show ? <EyeOff size={16} color={T.textMuted} /> : <Eye size={16} color={T.textMuted} />}</button>
          </div>
        </Field>
        <Field T={T} label="Se connecter en tant que">
          <select value={role} onChange={(e) => setRole(e.target.value)} style={inputStyle(T)}>
            <option value="Administrateur">Administrateur (accès complet)</option>
            <option value="Utilisateur">Utilisateur (gestion de la plantation)</option>
          </select>
        </Field>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, marginBottom: 18 }}>
          <label style={{ display: "flex", alignItems: "center", gap: 6, color: T.textMuted }}><input type="checkbox" defaultChecked /> Se souvenir de moi</label>
          <span style={{ color: T.blue, cursor: "pointer" }}>Mot de passe oublié ?</span>
        </div>
        <Btn T={T} onClick={() => onLogin(role)} style={{ width: "100%", justifyContent: "center" }}>Se connecter</Btn>
        <div style={{ marginTop: 14, fontSize: 11, color: T.textMuted, display: "flex", alignItems: "center", gap: 5 }}><ShieldCheck size={13} /> Connexion sécurisée · démo prototype — le choix du rôle ici est temporaire, en attendant une vraie authentification</div>
      </div>
    </div>
  );
}

/* ============================== DASHBOARD ============================== */
function Dashboard({ T, zones, onOpenZone }) {
  const alertesZones = zones.filter((z) => z.etat !== "ok").length;
  const totalNiveau = zones.reduce((a, z) => a + z.niveau, 0);
  const totalCap = zones.reduce((a, z) => a + z.capacite, 0);
  return (
    <div style={{
      position: "relative", margin: "-22px", padding: 22, borderRadius: 0,
      backgroundImage: `linear-gradient(180deg, ${T.bg}B3 0%, ${T.bg}33 20%, ${T.bg}22 50%, ${T.bg}CC 100%), url(${photoHydroponie})`,
      backgroundSize: "cover", backgroundPosition: "center 35%", backgroundRepeat: "no-repeat",
    }}>
      <svg style={{ position: "absolute", top: 10, right: 18, opacity: 0.5, pointerEvents: "none" }} width="120" height="120" viewBox="0 0 100 100">
        <circle cx="50" cy="50" r="34" fill="none" stroke={T.greenFresh} strokeWidth="1" strokeDasharray="3 5" opacity="0.6" />
        <circle cx="50" cy="50" r="24" fill="none" stroke={T.blue} strokeWidth="1" opacity="0.4" />
      </svg>
      <PageHeader T={T} title="Tableau de bord" sub="Vision globale de l'exploitation" action={<Badge tone={alertesZones ? "amber" : "green"} T={T}>{alertesZones ? `${alertesZones} zone(s) à surveiller` : "Système opérationnel"}</Badge>} />
      <div className="hs-grid-metrics" style={{ marginBottom: 14 }}>
        <MetricCard T={T} icon={Layers} label="Zones actives" value={zones.length} unit="" tone="green" />
        <MetricCard T={T} icon={Sprout} label="Plants" value={zones.reduce((a, z) => a + z.plants, 0)} unit="" tone="green" />
        <MetricCard T={T} icon={Droplet} label="Niveau global" value={Math.round((totalNiveau / totalCap) * 100)} unit="%" tone="blue" />
        <MetricCard T={T} icon={AlertTriangle} label="Alertes" value={alertesData.length} unit="" tone="amber" />
        <MetricCard T={T} icon={Wheat} label="Production prévue" value="1 250" unit="kg" tone="green" />
        <MetricCard T={T} icon={Wallet} label="Bénéfices" value="2,9" unit="M GNF" tone="blue" />
      </div>
      <div style={{ fontWeight: 600, fontSize: 14, color: T.text, margin: "18px 0 10px" }}>Zones</div>
      <div className="hs-grid-cards">
        {zones.map((z) => <ZoneCard key={z.id} T={T} z={z} onOpen={onOpenZone} compact />)}
      </div>
    </div>
  );
}

/* ============================== ZONES ============================== */
function ZoneCard({ T, z, onOpen }) {
  const alert = z.etat !== "ok";
  return (
    <Card T={T} style={{ border: `1px solid ${alert ? T.red + "55" : T.border}` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif", fontSize: 15, color: T.text }}>{z.nom}</div>
        <Badge tone={alert ? "red" : "green"} T={T}>{alert ? "Critique" : "Normal"}</Badge>
      </div>
      <div style={{ fontSize: 12, color: T.textMuted, margin: "4px 0 12px" }}>{z.culture} · {z.plants} plants · {z.systeme}</div>
      <ReservoirGauge T={T} niveau={z.niveau} capacite={z.capacite} />
      <div style={{ display: "flex", gap: 12, marginTop: 12, fontSize: 12, color: T.text, flexWrap: "wrap" }}>
        <span>pH <b style={{ color: hors(seuils.ph, z.ph) ? T.amber : T.text }}>{z.ph}</b></span>
        <span>EC <b style={{ color: hors(seuils.ec, z.ec) ? T.amber : T.text }}>{z.ec}</b></span>
        <Badge tone={z.pompe ? "green" : "red"} T={T}>{z.pompe ? "Pompe active" : "Pompe arrêtée"}</Badge>
      </div>
      <div className="hs-btn-row" style={{ marginTop: 14 }}>
        <Btn T={T} small onClick={() => onOpen(z.id, "apercu")}>Voir la zone</Btn>
      </div>
    </Card>
  );
}

function AddZoneModal({ T, onClose, onAdd }) {
  return (
    <Modal T={T} title="Ajouter une zone" onClose={onClose} width={460}>
      <Field T={T} label="Nom de la zone"><input placeholder="Zone E" style={inputStyle(T)} /></Field>
      <Field T={T} label="Culture">
        <select style={inputStyle(T)}>{CULTURES_DEFAUT.map((c) => <option key={c.id}>{c.nom}</option>)}</select>
      </Field>
      <Field T={T} label="Nombre de plants"><input type="number" placeholder="200" style={inputStyle(T)} /></Field>
      <Field T={T} label="Système hydroponique">
        <select style={inputStyle(T)}><option>NFT</option><option>DWC</option><option>Ebb & Flow</option><option>Substrat</option></select>
      </Field>
      <Field T={T} label="Réservoir associé (capacité)"><input type="number" placeholder="400" style={inputStyle(T)} /></Field>
      <Field T={T} label="Pompes / Électrovannes / Capteurs"><input placeholder="Auto-détectés à la connexion IoT" style={inputStyle(T)} /></Field>
      <Btn T={T} icon={Plus} onClick={onAdd} style={{ width: "100%", justifyContent: "center" }}>Créer la zone</Btn>
    </Modal>
  );
}

function Zones({ T, zones, onOpenZone }) {
  const [modal, setModal] = useState(false);
  return (
    <div>
      <PageHeader T={T} title="Zones" sub="Chaque zone gère indépendamment sa culture, son réservoir et ses équipements" action={<Btn T={T} icon={Plus} onClick={() => setModal(true)}>Ajouter une zone</Btn>} />
      <div className="hs-grid-cards">{zones.map((z) => <ZoneCard key={z.id} T={T} z={z} onOpen={onOpenZone} />)}</div>
      {modal && <AddZoneModal T={T} onClose={() => setModal(false)} onAdd={() => setModal(false)} />}
    </div>
  );
}

/* ---- Zone detail ---- */
function FillModal({ T, onClose, zone, onUpdate, onLog }) {
  const [step, setStep] = useState("form");
  const [qte, setQte] = useState(100);
  const [current, setCurrent] = useState(zone.niveau);
  const target = Math.min(zone.capacite, zone.niveau + Number(qte || 0));
  useEffect(() => {
    if (step !== "running") return;
    const t = setInterval(() => setCurrent((c) => {
      const next = Math.min(target, c + 10);
      if (next >= target) {
        clearInterval(t);
        onUpdate(next);
        onLog && onLog({ type: "eau_remplissage", zone: zone.nom, action: `Remplissage — ${zone.niveau} L → ${target} L` });
        setTimeout(() => setStep("done"), 350);
      }
      return next;
    }), 300);
    return () => clearInterval(t);
  }, [step]);
  const pct = Math.round(((current - zone.niveau) / (target - zone.niveau || 1)) * 100);
  return (
    <Modal T={T} title={`Ajouter de l'eau — ${zone.nom}`} onClose={onClose}>
      {step === "form" && (<>
        <Field T={T} label="Volume actuel"><div style={{ fontSize: 13, color: T.text }}>{zone.niveau} L / {zone.capacite} L</div></Field>
        <Field T={T} label="Quantité souhaitée (L)"><input type="number" value={qte} onChange={(e) => setQte(e.target.value)} style={inputStyle(T)} /></Field>
        <Field T={T} label="Destination"><input disabled value={`Réservoir ${zone.nom}`} style={{ ...inputStyle(T), opacity: 0.7 }} /></Field>
        <Btn T={T} icon={Play} onClick={() => setStep("running")} style={{ width: "100%", justifyContent: "center" }}>Démarrer</Btn>
      </>)}
      {step === "running" && (<>
        <div style={{ fontSize: 13, color: T.text, marginBottom: 10 }}>Remplissage en cours…</div>
        <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 15, color: T.text, marginBottom: 8 }}>{current} L → {target} L</div>
        <div style={{ height: 8, background: T.panel2, borderRadius: 6, overflow: "hidden", marginBottom: 10 }}><div style={{ height: "100%", width: `${pct}%`, background: T.blue, transition: "width .3s linear" }} /></div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: T.textMuted }}><span>Débit: 10 L/min</span><span>Temps restant: {Math.max(0, Math.round((target - current) / 10))} min</span></div>
      </>)}
      {step === "done" && (<div style={{ textAlign: "center", padding: "16px 0" }}><CheckCircle2 size={30} color={T.green} /><div style={{ fontSize: 13.5, fontWeight: 600, color: T.text, marginTop: 8 }}>Remplissage terminé</div><Btn T={T} onClick={onClose} variant="outline" small style={{ marginTop: 12 }}>Fermer</Btn></div>)}
    </Modal>
  );
}

function RenewModal({ T, onClose, zone, onLog }) {
  const steps = ["Arrêt des pompes", "Ouverture vanne évacuation", "Vidange", "Fermeture vanne", "Ouverture arrivée d'eau", "Remplissage", "Dosage nutriments", "Contrôle pH / EC", "Redémarrage pompes"];
  const [idx, setIdx] = useState(-1); const [confirmed, setConfirmed] = useState(false);
  useEffect(() => {
    if (!confirmed || idx >= steps.length - 1) return;
    const t = setTimeout(() => {
      const next = idx + 1;
      setIdx(next);
      if (next >= steps.length - 1) onLog && onLog({ type: "eau_renouvellement", zone: zone.nom, action: "Renouvellement d'eau complet — cycle terminé" });
    }, 600);
    return () => clearTimeout(t);
  }, [confirmed, idx]);
  return (
    <Modal T={T} title={`Renouveler l'eau — ${zone.nom}`} onClose={onClose}>
      {!confirmed ? (<>
        <div style={{ fontSize: 12.5, color: T.text, background: T.amberSoft, padding: 12, borderRadius: 10, marginBottom: 14 }}>Cette opération va vidanger le réservoir puis le remplir avec de l'eau neuve.</div>
        <Btn T={T} variant="danger" icon={RotateCcw} onClick={() => { setIdx(0); setConfirmed(true); }} style={{ width: "100%", justifyContent: "center" }}>Confirmer</Btn>
      </>) : (<div>
        {steps.map((s, i) => (
          <div key={s} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 0", opacity: i <= idx ? 1 : 0.4 }}>
            {i < idx ? <CheckCircle2 size={15} color={T.green} /> : i === idx ? <Activity size={15} color={T.blue} /> : <div style={{ width: 15, height: 15, borderRadius: "50%", border: `2px solid ${T.border}` }} />}
            <span style={{ fontSize: 12.5, color: T.text }}>{s}</span>
          </div>
        ))}
        {idx >= steps.length - 1 && <div style={{ textAlign: "center", marginTop: 14 }}><CheckCircle2 size={28} color={T.green} /><Btn T={T} onClick={onClose} variant="outline" small style={{ marginTop: 12 }}>Fermer</Btn></div>}
      </div>)}
    </Modal>
  );
}

function VidangerModal({ T, zone, onClose, onDrained }) {
  const [step, setStep] = useState("form");
  const [niveau, setNiveau] = useState(zone.niveau);
  useEffect(() => {
    if (step !== "running") return;
    const t = setInterval(() => setNiveau((n) => {
      const next = Math.max(0, n - Math.round(zone.capacite / 12));
      if (next <= 0) { clearInterval(t); onDrained(); setTimeout(() => setStep("done"), 300); }
      return next;
    }), 250);
    return () => clearInterval(t);
  }, [step]);
  const pct = Math.round((1 - niveau / zone.niveau) * 100);
  return (
    <Modal T={T} title={`Vidanger — ${zone.nom}`} onClose={onClose}>
      {step === "form" && (<>
        <div style={{ fontSize: 12.5, color: T.text, background: T.amberSoft, padding: 12, borderRadius: 10, marginBottom: 16 }}>
          Cette opération va vider le réservoir de {zone.nom} ({zone.niveau} L actuellement). La pompe sera arrêtée automatiquement pendant la vidange.
        </div>
        <Btn T={T} variant="danger" icon={Square} onClick={() => setStep("running")} style={{ width: "100%", justifyContent: "center" }}>Confirmer la vidange</Btn>
      </>)}
      {step === "running" && (<>
        <div style={{ fontSize: 13, color: T.text, marginBottom: 10 }}>Vidange en cours…</div>
        <div style={{ height: 8, background: T.panel2, borderRadius: 6, overflow: "hidden", marginBottom: 8 }}><div style={{ height: "100%", width: `${pct}%`, background: T.amber, transition: "width .25s linear" }} /></div>
        <div style={{ fontSize: 12, color: T.textMuted }}>Niveau restant : {niveau} L</div>
      </>)}
      {step === "done" && (<div style={{ textAlign: "center", padding: "16px 0" }}><CheckCircle2 size={30} color={T.green} /><div style={{ fontSize: 13.5, fontWeight: 600, color: T.text, marginTop: 8 }}>✅ Réservoir vidangé</div><Btn T={T} onClick={onClose} variant="outline" small style={{ marginTop: 12 }}>Fermer</Btn></div>)}
    </Modal>
  );
}

function ZoneDetail({ T, zone, initialTab, onBack, onUpdateZone, nutrients, onApplyRecette, onLog }) {
  const [tab, setTab] = useState(initialTab || "apercu");
  const [range, setRange] = useState("24h");
  const [modal, setModal] = useState(null);
  const [pompe, setPompe] = useState(zone.pompe);
  const [vEntree, setVEntree] = useState(zone.vanneEntree);
  const [vEvac, setVEvac] = useState(zone.vanneEvac);
  const phData = [6.0, 6.1, 5.9, 6.2, 6.1, 6.0, zone.ph];
  const ecData = [1.5, 1.6, 1.7, 1.6, 1.8, 1.7, zone.ec];
  return (
    <div>
      <PageHeader T={T} back={onBack} title={`${zone.nom} — ${zone.culture}`} sub={`${zone.plants} plants · ${zone.systeme}`} />
      <div className="hs-btn-row" style={{ marginBottom: 16 }}>
        <button onClick={() => setTab("apercu")} style={{ fontSize: 12.5, fontWeight: 600, padding: "8px 16px", borderRadius: 10, border: `1px solid ${T.border}`, background: tab === "apercu" ? T.green : "transparent", color: tab === "apercu" ? "#fff" : T.textMuted, cursor: "pointer" }}>Aperçu</button>
        <button onClick={() => setTab("controle")} style={{ fontSize: 12.5, fontWeight: 600, padding: "8px 16px", borderRadius: 10, border: `1px solid ${T.border}`, background: tab === "controle" ? T.green : "transparent", color: tab === "controle" ? "#fff" : T.textMuted, cursor: "pointer" }}>Contrôle</button>
      </div>

      {tab === "apercu" && (<>
        <div className="hs-grid-metrics" style={{ marginBottom: 14 }}>
          <MetricCard T={T} icon={Sprout} label="Plants" value={zone.plants} unit="" tone="green" />
          <MetricCard T={T} icon={FlaskConical} label="pH" value={zone.ph} unit="" tone={hors(seuils.ph, zone.ph) ? "amber" : "green"} />
          <MetricCard T={T} icon={Activity} label="EC" value={zone.ec} unit="mS/cm" tone={hors(seuils.ec, zone.ec) ? "amber" : "green"} />
          <MetricCard T={T} icon={Thermometer} label="Eau" value={zone.temp} unit="°C" tone="blue" />
          <MetricCard T={T} icon={Gauge} label="Débit" value={zone.debit} unit="L/min" tone="blue" />
        </div>
        <Card T={T}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, flexWrap: "wrap", gap: 8 }}>
            <div style={{ fontWeight: 600, fontSize: 13.5, color: T.text }}>Évolution pH / EC</div>
            <div style={{ display: "flex", gap: 6 }}>{["24h", "7j", "30j"].map((r) => <button key={r} onClick={() => setRange(r)} style={{ fontSize: 11, padding: "4px 9px", borderRadius: 7, border: `1px solid ${T.border}`, background: range === r ? T.green : "transparent", color: range === r ? "#fff" : T.textMuted, cursor: "pointer" }}>{r}</button>)}</div>
          </div>
          <MiniChart data={phData} color={T.green} /><MiniChart data={ecData} color={T.blue} />
        </Card>
      </>)}

      {tab === "controle" && (<>
        <Card T={T} style={{ marginBottom: 14 }}>
          <div style={{ fontWeight: 600, fontSize: 13.5, color: T.text, marginBottom: 12 }}>Contrôle de l'eau</div>
          <ReservoirGauge T={T} niveau={zone.niveau} capacite={zone.capacite} />
          <div className="hs-btn-row" style={{ marginTop: 14 }}>
            <Btn T={T} icon={Plus} small onClick={() => setModal("fill")}>Ajouter de l'eau</Btn>
            <Btn T={T} icon={Square} small variant="subtle" onClick={() => setModal("vidanger")}>Vidanger</Btn>
            <Btn T={T} icon={RotateCcw} small variant="danger" onClick={() => setModal("renew")}>Renouveler l'eau</Btn>
            <Btn T={T} icon={FlaskConical} small variant="subtle" onClick={() => setModal("dose")}>Doser nutriments</Btn>
          </div>
        </Card>

        <div className="hs-two-col">
          <Card T={T} style={{ flex: 1, minWidth: 220 }}>
            <div style={{ fontWeight: 600, fontSize: 13.5, color: T.text, marginBottom: 10 }}>Pompe principale</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Badge tone={pompe ? "green" : "red"} T={T}>{pompe ? "Active" : "Arrêtée"}</Badge>
              <Btn T={T} small variant={pompe ? "danger" : "primary"} onClick={() => { const next = !pompe; setPompe(next); onLog && onLog({ type: "pompe", zone: zone.nom, action: `Pompe ${next ? "activée" : "arrêtée"}` }); }}>{pompe ? "Arrêter" : "Activer"}</Btn>
            </div>
          </Card>
          <Card T={T} style={{ flex: 1, minWidth: 220 }}>
            <div style={{ fontWeight: 600, fontSize: 13.5, color: T.text, marginBottom: 10 }}>Électrovannes</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0" }}><span style={{ fontSize: 12.5, color: T.text }}>Arrivée d'eau</span><div style={{ display: "flex", gap: 10, alignItems: "center" }}><Badge tone={vEntree ? "green" : "red"} T={T}>{vEntree ? "Ouverte" : "Fermée"}</Badge><Toggle T={T} on={vEntree} onClick={() => setVEntree((v) => !v)} /></div></div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "6px 0" }}><span style={{ fontSize: 12.5, color: T.text }}>Évacuation</span><div style={{ display: "flex", gap: 10, alignItems: "center" }}><Badge tone={vEvac ? "green" : "red"} T={T}>{vEvac ? "Ouverte" : "Fermée"}</Badge><Toggle T={T} on={vEvac} onClick={() => setVEvac((v) => !v)} /></div></div>
          </Card>
        </div>
      </>)}

      {modal === "fill" && <FillModal T={T} zone={zone} onClose={() => setModal(null)} onUpdate={(n) => onUpdateZone(zone.id, { niveau: n })} onLog={onLog} />}
      {modal === "vidanger" && <VidangerModal T={T} zone={zone} onClose={() => setModal(null)} onDrained={() => onUpdateZone(zone.id, { niveau: 0, pompe: false })} />}
      {modal === "renew" && <RenewModal T={T} zone={zone} onClose={() => setModal(null)} onLog={onLog} />}
      {modal === "dose" && (
        <ApplyRecetteModal
          T={T}
          recette={recettesData.find((r) => r.culture === zone.culture) || { culture: zone.culture, a: 250, b: 250, ph: "5,8–6,5", ec: "1,2–1,8" }}
          zones={[zone]}
          nutrients={nutrients}
          onApplied={onApplyRecette}
          onClose={() => setModal(null)}
        />
      )}
    </div>
  );
}

/* ============================== CULTURES ============================== */
function AddCultureModal({ T, onClose }) {
  return (
    <Modal T={T} title="Ajouter une culture" onClose={onClose} width={460}>
      <Field T={T} label="Nom"><input placeholder="Ex: Épinard" style={inputStyle(T)} /></Field>
      <Field T={T} label="Variété"><input style={inputStyle(T)} /></Field>
      <Field T={T} label="Durée du cycle (jours avant récolte)"><input type="number" placeholder="45" style={inputStyle(T)} /></Field>
      <div className="hs-two-col">
        <div style={{ flex: 1, minWidth: 140 }}><Field T={T} label="pH recommandé"><input placeholder="5,8–6,5" style={inputStyle(T)} /></Field></div>
        <div style={{ flex: 1, minWidth: 140 }}><Field T={T} label="EC recommandé"><input placeholder="1,4–2,0" style={inputStyle(T)} /></Field></div>
      </div>
      <Field T={T} label="Température recommandée"><input placeholder="18–24°C" style={inputStyle(T)} /></Field>
      <Field T={T} label="Système hydroponique recommandé"><select style={inputStyle(T)}><option>NFT</option><option>DWC</option><option>Ebb & Flow</option><option>Substrat</option></select></Field>
      <Field T={T} label="Notes"><textarea rows={2} style={{ ...inputStyle(T), resize: "vertical" }} /></Field>
      <Btn T={T} icon={Plus} onClick={onClose} style={{ width: "100%", justifyContent: "center" }}>Ajouter la culture</Btn>
    </Modal>
  );
}

function Cultures({ T }) {
  const [modal, setModal] = useState(false);
  return (
    <div>
      <PageHeader T={T} title="Cultures" sub="Catalogue des cultures et paramètres recommandés" action={<Btn T={T} icon={Plus} onClick={() => setModal(true)}>Ajouter une culture</Btn>} />
      <div className="hs-grid-cards">
        {CULTURES_DEFAUT.map((c) => (
          <Card T={T} key={c.id}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ fontSize: 24 }}>{c.emoji}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14.5, color: T.text }}>{c.nom}</div>
                <div style={{ fontSize: 11.5, color: T.textMuted }}>Cycle: {c.cycle} · {c.systeme}</div>
              </div>
            </div>
            <div style={{ fontSize: 11.5, color: T.textMuted, marginTop: 12, lineHeight: 1.8 }}>pH: {c.ph} · EC: {c.ec}<br />Température: {c.temp}</div>
          </Card>
        ))}
      </div>
      {modal && <AddCultureModal T={T} onClose={() => setModal(false)} />}
    </div>
  );
}

/* ============================== NUTRIMENTS / AUTOMATISATION / CAPTEURS / ALERTES ============================== */
function ApplyRecetteModal({ T, recette, zones, nutrients, onApplied, onClose }) {
  const [zoneId, setZoneId] = useState(zones[0]?.id || "");
  const [ph, setPh] = useState(recette.ph);
  const [ec, setEc] = useState(recette.ec);
  const [a, setA] = useState(recette.a);
  const [b, setB] = useState(recette.b);
  const [volume, setVolume] = useState(100);
  const [step, setStep] = useState("form");
  const [error, setError] = useState("");

  const zone = zones.find((z) => z.id === zoneId);
  const zoneNom = zone?.nom || "";

  const submit = () => {
    setError("");
    if (!zoneId) { setError("Choisis une zone avant d'appliquer la recette."); return; }
    if (!ph.trim() || !ec.trim() || a === "" || b === "" || volume === "") { setError("Tous les champs doivent être remplis."); return; }

    if (zone && zone.culture !== recette.culture) {
      setError(`Cette recette est conçue pour la culture "${recette.culture}", mais ${zone.nom} cultive "${zone.culture}". Choisis une zone compatible ou une autre recette.`);
      return;
    }

    if (zone?.lastDoseAt) {
      const last = new Date(zone.lastDoseAt);
      const now = new Date();
      const memeJour = last.toDateString() === now.toDateString();
      if (memeJour) {
        const heure = last.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
        setError(`Un dosage a déjà été effectué aujourd'hui à ${heure} pour ${zone.nom}. Un seul dosage par jour et par zone est autorisé — réessaie demain.`);
        return;
      }
    }

    const numA = Number(a), numB = Number(b), numVol = Number(volume);
    if (!Number.isFinite(numA) || !Number.isFinite(numB) || !Number.isFinite(numVol) || numA <= 0 || numB <= 0 || numVol <= 0) {
      setError("Les quantités doivent être des nombres valides et positifs.");
      return;
    }
    const MAX_PAR_100L = 2000; // ml — au-delà, la valeur est jugée anormale pour une recette
    if (numA > MAX_PAR_100L || numB > MAX_PAR_100L) {
      setError(`Quantité anormalement élevée (max ${MAX_PAR_100L} ml pour 100 L). Vérifie la valeur saisie.`);
      return;
    }
    const phVal = parseNum(ph), ecVal = parseNum(ec);
    if (Number.isNaN(phVal) || phVal < 4 || phVal > 8) { setError("pH cible hors plage réaliste (4–8)."); return; }
    if (Number.isNaN(ecVal) || ecVal < 0.2 || ecVal > 4.5) { setError("EC cible hors plage réaliste (0,2–4,5 mS/cm)."); return; }

    const neededA = Math.round((numA / 100) * numVol);
    const neededB = Math.round((numB / 100) * numVol);
    const stockA = nutrients.find((n) => n.id === "a")?.ml ?? 0;
    const stockB = nutrients.find((n) => n.id === "b")?.ml ?? 0;
    if (neededA > stockA || neededB > stockB) {
      setError(`Doseuse insuffisante — besoin de ${neededA} ml (A) / ${neededB} ml (B) pour ${numVol} L, mais seulement ${stockA} ml (A) / ${stockB} ml (B) disponibles. Réduis le volume ou réapprovisionne le stock.`);
      return;
    }

    setStep("sending");
    setTimeout(() => {
      onApplied({ zoneId, neededA, neededB, phVal, ecVal });
      setStep("done");
    }, 900);
  };

  return (
    <Modal T={T} title={`Appliquer la recette — ${recette.culture}`} onClose={onClose} width={460}>
      {step === "form" && (<>
        <Field T={T} label="Zone concernée">
          <select value={zoneId} onChange={(e) => setZoneId(e.target.value)} style={inputStyle(T)}>
            {zones.map((z) => <option key={z.id} value={z.id}>{z.nom} — {z.culture}</option>)}
          </select>
        </Field>
        {zone && zone.culture !== recette.culture && (
          <div style={{ fontSize: 11.5, color: T.amber, background: T.amberSoft, borderRadius: 10, padding: "8px 12px", marginBottom: 12 }}>
            ⚠ Cette zone cultive "{zone.culture}", pas "{recette.culture}" — l'application sera bloquée sauf si tu changes de zone.
          </div>
        )}
        {zone?.lastDoseAt && new Date(zone.lastDoseAt).toDateString() === new Date().toDateString() && (
          <div style={{ fontSize: 11.5, color: T.amber, background: T.amberSoft, borderRadius: 10, padding: "8px 12px", marginBottom: 12 }}>
            ⚠ {zone.nom} a déjà reçu un dosage aujourd'hui à {new Date(zone.lastDoseAt).toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" })}.
          </div>
        )}
        <Field T={T} label="Volume d'eau à traiter (L)"><input type="number" value={volume} onChange={(e) => setVolume(e.target.value)} style={inputStyle(T)} /></Field>
        <div className="hs-two-col">
          <div style={{ flex: 1, minWidth: 140 }}><Field T={T} label="pH cible (modifiable)"><input value={ph} onChange={(e) => setPh(e.target.value)} style={inputStyle(T)} /></Field></div>
          <div style={{ flex: 1, minWidth: 140 }}><Field T={T} label="EC cible (modifiable)"><input value={ec} onChange={(e) => setEc(e.target.value)} style={inputStyle(T)} /></Field></div>
        </div>
        <div className="hs-two-col">
          <div style={{ flex: 1, minWidth: 140 }}><Field T={T} label="Nutriment A (ml / 100 L)"><input type="number" min="1" max="2000" value={a} onChange={(e) => setA(e.target.value)} style={inputStyle(T)} /></Field></div>
          <div style={{ flex: 1, minWidth: 140 }}><Field T={T} label="Nutriment B (ml / 100 L)"><input type="number" min="1" max="2000" value={b} onChange={(e) => setB(e.target.value)} style={inputStyle(T)} /></Field></div>
        </div>
        <div style={{ fontSize: 11, color: T.textMuted, marginBottom: 12 }}>Doseuses disponibles : {nutrients.find((n) => n.id === "a")?.ml ?? 0} ml (A) · {nutrients.find((n) => n.id === "b")?.ml ?? 0} ml (B)</div>
        {error && <div style={{ fontSize: 12, color: T.red, background: T.redSoft, borderRadius: 10, padding: "9px 12px", marginBottom: 12 }}>❌ {error}</div>}
        <Btn T={T} icon={Play} onClick={submit} style={{ width: "100%", justifyContent: "center" }}>Appliquer la recette</Btn>
      </>)}
      {step === "sending" && (
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <Activity size={26} color={T.blue} />
          <div style={{ fontSize: 13, color: T.text, marginTop: 10 }}>Vérification et envoi à {zoneNom}…</div>
        </div>
      )}
      {step === "done" && (
        <div style={{ textAlign: "center", padding: "16px 0" }}>
          <CheckCircle2 size={30} color={T.green} />
          <div style={{ fontSize: 13.5, fontWeight: 600, color: T.text, marginTop: 10 }}>✅ Recette appliquée avec succès</div>
          <div style={{ fontSize: 12, color: T.textMuted, marginTop: 4 }}>{zoneNom} — pH cible {ph}, EC cible {ec} mS/cm</div>
          <Btn T={T} onClick={onClose} variant="outline" small style={{ marginTop: 14 }}>Fermer</Btn>
        </div>
      )}
    </Modal>
  );
}

function AddNutrientModal({ T, nutrients, onAdd, onClose }) {
  const [mode, setMode] = useState("existant"); // "existant" | "nouveau"
  const [nutrimentId, setNutrimentId] = useState(nutrients[0]?.id || "");
  const [nomNouveau, setNomNouveau] = useState("");
  const [litres, setLitres] = useState("5");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = () => {
    setError("");
    const v = Number(litres);
    if (!Number.isFinite(v) || v <= 0) { setError("Indique une quantité positive en litres."); return; }
    if (v > 50) { setError("Quantité anormalement élevée pour un réapprovisionnement (max 50 L)."); return; }
    if (mode === "nouveau") {
      if (!nomNouveau.trim()) { setError("Donne un nom au nouveau nutriment."); return; }
      if (nutrients.some((n) => n.nom.toLowerCase() === nomNouveau.trim().toLowerCase())) { setError("Ce nutriment existe déjà."); return; }
      onAdd({ isNew: true, nom: nomNouveau.trim(), litres: v });
    } else {
      onAdd({ isNew: false, id: nutrimentId, litres: v });
    }
    setDone(true);
  };

  return (
    <Modal T={T} title="Ajouter des nutriments" onClose={onClose} width={420}>
      {!done ? (<>
        <div className="hs-btn-row" style={{ marginBottom: 14 }}>
          <Btn T={T} small variant={mode === "existant" ? "primary" : "subtle"} onClick={() => setMode("existant")}>Nutriment existant</Btn>
          <Btn T={T} small variant={mode === "nouveau" ? "primary" : "subtle"} onClick={() => setMode("nouveau")}>+ Nouveau nutriment</Btn>
        </div>
        {mode === "existant" ? (
          <Field T={T} label="Nutriment">
            <select value={nutrimentId} onChange={(e) => setNutrimentId(e.target.value)} style={inputStyle(T)}>
              {nutrients.map((n) => <option key={n.id} value={n.id}>{n.nom} — {(n.ml / 1000).toFixed(2)} L en stock</option>)}
            </select>
          </Field>
        ) : (
          <Field T={T} label="Nom du nouveau nutriment"><input value={nomNouveau} onChange={(e) => setNomNouveau(e.target.value)} placeholder="Ex: Cal-Mag, Oligo-éléments…" style={inputStyle(T)} /></Field>
        )}
        <Field T={T} label="Quantité à ajouter (L)"><input type="number" min="0.1" max="50" value={litres} onChange={(e) => setLitres(e.target.value)} style={inputStyle(T)} /></Field>
        {error && <div style={{ fontSize: 12, color: T.red, background: T.redSoft, borderRadius: 10, padding: "9px 12px", marginBottom: 12 }}>❌ {error}</div>}
        <Btn T={T} icon={Plus} onClick={submit} style={{ width: "100%", justifyContent: "center" }}>Ajouter au stock</Btn>
      </>) : (
        <div style={{ textAlign: "center", padding: "16px 0" }}>
          <CheckCircle2 size={30} color={T.green} />
          <div style={{ fontSize: 13.5, fontWeight: 600, color: T.text, marginTop: 10 }}>✅ Stock mis à jour</div>
          <Btn T={T} onClick={onClose} variant="outline" small style={{ marginTop: 14 }}>Fermer</Btn>
        </div>
      )}
    </Modal>
  );
}

function Nutriments({ T, zones, nutrients, onApplyRecette, onAddStock }) {
  const [modalRecette, setModalRecette] = useState(null);
  const [modalAdd, setModalAdd] = useState(false);
  return (
    <div>
      <PageHeader T={T} title="Nutriments" sub="Stocks et recettes nutritives — liste extensible" action={<Btn T={T} icon={Plus} onClick={() => setModalAdd(true)}>Ajouter des nutriments</Btn>} />
      <div className="hs-grid-cards" style={{ marginBottom: 20 }}>
        {nutrients.map((n) => {
          const s = n.ml / 1000;
          return (
            <Card T={T} key={n.id}>
              <div style={{ fontWeight: 600, fontSize: 13.5, color: T.text }}>{n.nom}</div>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 20, color: T.text, marginTop: 6 }}>{s.toFixed(2)} L</div>
              <Badge tone={s > 2 ? "green" : "amber"} T={T}>{s > 2 ? "Doseuse disponible" : "Stock bas"}</Badge>
            </Card>
          );
        })}
      </div>
      <div style={{ fontWeight: 600, fontSize: 14, color: T.text, marginBottom: 10 }}>Recettes nutritives</div>
      <div className="hs-grid-cards">
        {recettesData.map((r) => (
          <Card T={T} key={r.culture}>
            <div style={{ fontWeight: 700, fontFamily: "'Space Grotesk',sans-serif", fontSize: 14, color: T.text, marginBottom: 8 }}>{r.culture} — 100 L</div>
            <div style={{ fontSize: 12, color: T.textMuted, lineHeight: 1.8 }}>Nutriment A: {r.a} ml, B: {r.b} ml<br />pH cible: {r.ph}<br />EC cible: {r.ec} mS/cm</div>
            <Btn T={T} small variant="subtle" onClick={() => setModalRecette(r)} style={{ marginTop: 10 }}>Appliquer à une zone</Btn>
          </Card>
        ))}
      </div>
      {modalRecette && <ApplyRecetteModal T={T} recette={modalRecette} zones={zones} nutrients={nutrients} onApplied={onApplyRecette} onClose={() => setModalRecette(null)} />}
      {modalAdd && <AddNutrientModal T={T} nutrients={nutrients} onAdd={onAddStock} onClose={() => setModalAdd(false)} />}
    </div>
  );
}

function RuleForm({ T, rule, onSave, onCancel }) {
  const [metric, setMetric] = useState(rule?.metric || "niveau");
  const [operator, setOperator] = useState(rule?.operator || "<");
  const [value, setValue] = useState(rule ? String(rule.value) : "30");
  const [action, setAction] = useState(rule?.action || "remplir");
  const [actionValue, setActionValue] = useState(rule?.actionValue != null ? String(rule.actionValue) : "80");
  const [error, setError] = useState("");

  const metricInfo = METRICS.find((m) => m.id === metric);
  const actionInfo = ACTIONS.find((a) => a.id === action);

  const save = () => {
    setError("");
    if (metric === "pompe") {
      // condition d'état, pas de valeur numérique
    } else {
      const v = parseNum(value);
      if (Number.isNaN(v)) { setError("La valeur seuil doit être un nombre."); return; }
    }
    if (actionInfo.unit && (actionValue === "" || Number.isNaN(Number(actionValue)) || Number(actionValue) <= 0)) {
      setError(`La valeur de l'action (${actionInfo.unit}) doit être un nombre positif.`);
      return;
    }
    onSave({
      id: rule?.id || `au${Date.now()}`,
      metric, metricLabel: metricInfo.label, unit: metricInfo.unit,
      operator: metric === "pompe" ? "=" : operator,
      value: metric === "pompe" ? "défaillante" : parseNum(value),
      action, actionLabel: actionInfo.label,
      actionValue: actionInfo.unit ? Number(actionValue) : null,
      actionUnit: actionInfo.unit,
      on: rule?.on ?? true,
    });
  };

  return (
    <Card T={T} style={{ border: `1px dashed ${T.green}` }}>
      <div style={{ fontWeight: 600, fontSize: 12.5, color: T.textMuted, marginBottom: 10 }}>SI…</div>
      <div className="hs-two-col">
        <div style={{ flex: 1, minWidth: 130 }}>
          <Field T={T} label="Condition sur">
            <select value={metric} onChange={(e) => setMetric(e.target.value)} style={inputStyle(T)}>
              {METRICS.map((m) => <option key={m.id} value={m.id}>{m.label}</option>)}
            </select>
          </Field>
        </div>
        {metric !== "pompe" && (<>
          <div style={{ flex: "0 0 70px" }}>
            <Field T={T} label="Op.">
              <select value={operator} onChange={(e) => setOperator(e.target.value)} style={inputStyle(T)}>
                <option value="<">{"<"}</option><option value=">">{">"}</option>
              </select>
            </Field>
          </div>
          <div style={{ flex: 1, minWidth: 100 }}>
            <Field T={T} label={`Valeur (${metricInfo.unit || "—"})`}><input value={value} onChange={(e) => setValue(e.target.value)} style={inputStyle(T)} /></Field>
          </div>
        </>)}
      </div>
      <div style={{ fontWeight: 600, fontSize: 12.5, color: T.textMuted, margin: "6px 0 10px" }}>ALORS…</div>
      <div className="hs-two-col">
        <div style={{ flex: 1, minWidth: 160 }}>
          <Field T={T} label="Action">
            <select value={action} onChange={(e) => setAction(e.target.value)} style={inputStyle(T)}>
              {ACTIONS.map((a) => <option key={a.id} value={a.id}>{a.label}</option>)}
            </select>
          </Field>
        </div>
        {actionInfo.unit && (
          <div style={{ flex: 1, minWidth: 100 }}>
            <Field T={T} label={`Valeur (${actionInfo.unit})`}><input value={actionValue} onChange={(e) => setActionValue(e.target.value)} style={inputStyle(T)} /></Field>
          </div>
        )}
      </div>
      {error && <div style={{ fontSize: 12, color: T.red, background: T.redSoft, borderRadius: 10, padding: "8px 12px", marginBottom: 10 }}>❌ {error}</div>}
      <div className="hs-btn-row">
        <Btn T={T} small onClick={save}>Enregistrer</Btn>
        <Btn T={T} small variant="outline" onClick={onCancel}>Annuler</Btn>
      </div>
    </Card>
  );
}

function ruleLabel(r) {
  const condVal = r.metric === "pompe" ? "défaillante" : `${r.operator} ${r.value}${r.unit ? " " + r.unit : ""}`;
  const cond = `SI ${r.metricLabel} ${condVal}`;
  const act = `→ ${r.actionLabel}${r.actionValue != null ? ` ${r.actionValue} ${r.actionUnit}` : ""}`;
  return { cond, act };
}

function Automatisation({ T, rules, setRules }) {
  const [editingId, setEditingId] = useState(null);
  const [adding, setAdding] = useState(false);
  const [toDelete, setToDelete] = useState(null);

  return (
    <div>
      <PageHeader T={T} title="Automatisation" sub="Règles automatiques — conditions et seuils modifiables" action={<Btn T={T} icon={Plus} onClick={() => setAdding(true)}>Ajouter une automatisation</Btn>} />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {adding && (
          <RuleForm T={T} onCancel={() => setAdding(false)} onSave={(r) => { setRules((rs) => [...rs, r]); setAdding(false); }} />
        )}
        {rules.map((r) => {
          if (editingId === r.id) {
            return <RuleForm key={r.id} T={T} rule={r} onCancel={() => setEditingId(null)} onSave={(updated) => { setRules((rs) => rs.map((x) => x.id === r.id ? updated : x)); setEditingId(null); }} />;
          }
          const { cond, act } = ruleLabel(r);
          return (
            <Card T={T} key={r.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
              <div>
                <div style={{ fontSize: 13, color: T.text, fontFamily: "'IBM Plex Mono',monospace" }}>{cond}</div>
                <div style={{ fontSize: 12.5, color: T.textMuted, marginTop: 3 }}>{act}</div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <button onClick={() => setEditingId(r.id)} style={{ background: T.panel2, border: `1px solid ${T.border}`, borderRadius: 8, padding: 7, cursor: "pointer" }}><Pencil size={13} color={T.textMuted} /></button>
                <button onClick={() => setToDelete(r)} style={{ background: T.panel2, border: `1px solid ${T.border}`, borderRadius: 8, padding: 7, cursor: "pointer" }}><Trash2 size={13} color={T.textMuted} /></button>
                <Toggle T={T} on={r.on} onClick={() => setRules((rs) => rs.map((x) => x.id === r.id ? { ...x, on: !x.on } : x))} />
              </div>
            </Card>
          );
        })}
      </div>
      {toDelete && (
        <ConfirmDeleteModal
          T={T} label="cette automatisation"
          onCancel={() => setToDelete(null)}
          onConfirm={() => { setRules((rs) => rs.filter((x) => x.id !== toDelete.id)); setToDelete(null); }}
        />
      )}
    </div>
  );
}

function CapteurForm({ T, capteur, zones, onSave, onCancel }) {
  const [nom, setNom] = useState(capteur?.nom || "");
  const [type, setType] = useState(capteur?.type || TYPES_CAPTEUR[0]);
  const [typeAutre, setTypeAutre] = useState("");
  const [zone, setZone] = useState(capteur?.zone || zones[0]?.nom || "Exploitation");
  const [unite, setUnite] = useState(capteur?.unite ?? "");
  const [valeur, setValeur] = useState(capteur ? String(capteur.valeur) : "0");
  const [min, setMin] = useState(capteur ? String(capteur.min) : "0");
  const [max, setMax] = useState(capteur ? String(capteur.max) : "100");
  const [error, setError] = useState("");

  const save = () => {
    setError("");
    const typeFinal = type === "Autre" ? typeAutre.trim() : type;
    if (!nom.trim() || !typeFinal) { setError("Le nom et le type sont obligatoires."); return; }
    const v = Number(valeur), mi = Number(min), ma = Number(max);
    if (!Number.isFinite(v) || !Number.isFinite(mi) || !Number.isFinite(ma)) { setError("Valeur / min / max doivent être des nombres."); return; }
    if (mi >= ma) { setError("Le minimum doit être inférieur au maximum."); return; }
    onSave({
      id: capteur?.id || `s${Date.now()}`,
      nom: nom.trim(), type: typeFinal, zone, unite: unite.trim(),
      valeur: v, min: mi, max: ma,
      connecte: capteur?.connecte ?? true,
      maj: "à l'instant",
    });
  };

  return (
    <Modal T={T} title={capteur ? "Modifier le capteur" : "Ajouter un capteur"} onClose={onCancel} width={440}>
      <Field T={T} label="Nom du capteur"><input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Ex: pH — Zone B" style={inputStyle(T)} /></Field>
      <div className="hs-two-col">
        <div style={{ flex: 1, minWidth: 140 }}>
          <Field T={T} label="Type">
            <select value={type} onChange={(e) => setType(e.target.value)} style={inputStyle(T)}>
              {TYPES_CAPTEUR.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </Field>
        </div>
        <div style={{ flex: 1, minWidth: 140 }}>
          <Field T={T} label="Zone">
            <select value={zone} onChange={(e) => setZone(e.target.value)} style={inputStyle(T)}>
              <option value="Exploitation">Exploitation (global)</option>
              {zones.map((z) => <option key={z.id} value={z.nom}>{z.nom}</option>)}
            </select>
          </Field>
        </div>
      </div>
      {type === "Autre" && <Field T={T} label="Précise le type"><input value={typeAutre} onChange={(e) => setTypeAutre(e.target.value)} style={inputStyle(T)} /></Field>}
      <div className="hs-two-col">
        <div style={{ flex: 1, minWidth: 100 }}><Field T={T} label="Unité"><input value={unite} onChange={(e) => setUnite(e.target.value)} placeholder="%, mS/cm, °C…" style={inputStyle(T)} /></Field></div>
        <div style={{ flex: 1, minWidth: 100 }}><Field T={T} label={capteur ? "Valeur actuelle (simulation)" : "Valeur initiale"}><input value={valeur} onChange={(e) => setValeur(e.target.value)} style={inputStyle(T)} /></Field></div>
      </div>
      <div className="hs-two-col">
        <div style={{ flex: 1, minWidth: 100 }}><Field T={T} label="Seuil minimum"><input value={min} onChange={(e) => setMin(e.target.value)} style={inputStyle(T)} /></Field></div>
        <div style={{ flex: 1, minWidth: 100 }}><Field T={T} label="Seuil maximum"><input value={max} onChange={(e) => setMax(e.target.value)} style={inputStyle(T)} /></Field></div>
      </div>
      {error && <div style={{ fontSize: 12, color: T.red, background: T.redSoft, borderRadius: 10, padding: "9px 12px", marginBottom: 12 }}>❌ {error}</div>}
      <Btn T={T} icon={capteur ? Pencil : Plus} onClick={save} style={{ width: "100%", justifyContent: "center" }}>{capteur ? "Enregistrer les modifications" : "Ajouter le capteur"}</Btn>
      {capteur && <div style={{ fontSize: 10.5, color: T.textMuted, marginTop: 10, textAlign: "center" }}>Mode simulation — la nouvelle valeur se répercute immédiatement sur le capteur.</div>}
    </Modal>
  );
}

function ConfirmDeleteModal({ T, label, onConfirm, onCancel }) {
  return (
    <Modal T={T} title="Confirmer la suppression" onClose={onCancel} width={380}>
      <div style={{ fontSize: 13, color: T.text, marginBottom: 16 }}>Voulez-vous vraiment supprimer <b>{label}</b> ? Cette action est irréversible.</div>
      <div className="hs-btn-row">
        <Btn T={T} variant="danger" icon={Trash2} onClick={onConfirm}>Supprimer</Btn>
        <Btn T={T} variant="outline" onClick={onCancel}>Annuler</Btn>
      </div>
    </Modal>
  );
}

function Capteurs({ T, capteurs, zones, onSave, onDelete }) {
  const [modal, setModal] = useState(null); // null | "add" | capteur object
  const [toDelete, setToDelete] = useState(null);
  return (
    <div>
      <PageHeader T={T} title="Capteurs" sub="Gestion et simulation des capteurs connectés" action={<Btn T={T} icon={Plus} onClick={() => setModal("add")}>Ajouter un capteur</Btn>} />
      <div className="hs-grid-cards">
        {capteurs.map((c) => {
          const bad = c.valeur < c.min || c.valeur > c.max;
          return (
            <Card T={T} key={c.id} style={{ border: `1px solid ${!c.connecte ? T.red + "55" : bad ? T.amber + "55" : T.border}` }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12.5, color: T.text, fontWeight: 600 }}>{c.nom}</span>
                <Wifi size={13} color={c.connecte ? T.green : T.red} />
              </div>
              <div style={{ fontSize: 10.5, color: T.textMuted, marginTop: 2 }}>{c.type} · {c.zone}</div>
              <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 17, color: bad ? T.amber : T.text, marginTop: 8 }}>{c.valeur} {c.unite}</div>
              <div style={{ fontSize: 11, color: T.textMuted, marginTop: 6 }}>Min {c.min} · Max {c.max}</div>
              <div style={{ fontSize: 11, color: T.textMuted, marginTop: 2 }}>Mis à jour {c.maj} · {c.connecte ? "Connecté" : "Déconnecté"}</div>
              <div className="hs-btn-row" style={{ marginTop: 12 }}>
                <Btn T={T} small variant="subtle" icon={Pencil} onClick={() => setModal(c)}>Modifier</Btn>
                <Btn T={T} small variant="subtle" icon={Trash2} onClick={() => setToDelete(c)}>Suppr.</Btn>
              </div>
            </Card>
          );
        })}
      </div>
      {modal && (
        <CapteurForm
          T={T} zones={zones}
          capteur={modal === "add" ? null : modal}
          onCancel={() => setModal(null)}
          onSave={(c) => { onSave(c); setModal(null); }}
        />
      )}
      {toDelete && (
        <ConfirmDeleteModal
          T={T} label={`le capteur "${toDelete.nom}"`}
          onCancel={() => setToDelete(null)}
          onConfirm={() => { onDelete(toDelete.id); setToDelete(null); }}
        />
      )}
    </div>
  );
}

function Alertes({ T }) {
  return (
    <div>
      <PageHeader T={T} title="Centre d'alertes" sub="Notifications système par zone" />
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {alertesData.map((a, i) => (
          <Card T={T} key={i}>
            <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <AlertTriangle size={16} color={a.niveau === "red" ? T.red : a.niveau === "amber" ? T.amber : T.green} style={{ marginTop: 2, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 6 }}><span style={{ fontSize: 13.5, fontWeight: 600, color: T.text }}>{a.titre}</span><span style={{ fontSize: 11.5, color: T.textMuted }}>{a.heure}</span></div>
                <div style={{ fontSize: 12, color: T.textMuted, marginTop: 3 }}>{a.zone}</div>
                <div style={{ fontSize: 12.5, color: T.text, marginTop: 6 }}>{a.desc}</div>
                <div style={{ fontSize: 11.5, color: T.textMuted, marginTop: 4, fontStyle: "italic" }}>Action recommandée : {a.action}</div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ============================== RECOLTES / STOCK / FINANCES / MAINTENANCE / UTILISATEURS / HISTORIQUE ============================== */
function Recoltes({ T }) {
  const recoltesData = [
    { culture: "Laitue", zone: "Zone A", date: "10/08", poids: "48 kg", qualite: "A", prix: "1 400 000 GNF", client: "Marché central" },
    { culture: "Concombre", zone: "Zone C", date: "02/08", poids: "31 kg", qualite: "A", prix: "930 000 GNF", client: "Restaurant Le Damier" },
  ];
  return (
    <div>
      <PageHeader T={T} title="Récoltes" sub="Enregistrement et statistiques de production" action={<Btn T={T} icon={Plus}>Enregistrer une récolte</Btn>} />
      <div className="hs-grid-metrics" style={{ marginBottom: 18 }}>
        <MetricCard T={T} icon={Wheat} label="Production totale" value="1 250" unit="kg" tone="green" />
        <MetricCard T={T} icon={Layers} label="Par zone" value="4" unit="zones" tone="blue" />
        <MetricCard T={T} icon={Wallet} label="Valeur estimée" value="18,5 M" unit="GNF" tone="blue" />
      </div>
      <div className="hs-table-wrap"><Card T={T} style={{ padding: 0 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
          <thead><tr style={{ textAlign: "left", color: T.textMuted, borderBottom: `1px solid ${T.border}` }}>{["Culture", "Zone", "Date", "Poids", "Qualité", "Prix", "Client"].map((h) => <th key={h} style={{ padding: "10px 14px" }}>{h}</th>)}</tr></thead>
          <tbody>{recoltesData.map((r, i) => (<tr key={i} style={{ borderBottom: `1px solid ${T.border}`, color: T.text }}><td style={{ padding: "10px 14px", fontWeight: 600 }}>{r.culture}</td><td style={{ padding: "10px 14px" }}>{r.zone}</td><td style={{ padding: "10px 14px" }}>{r.date}</td><td style={{ padding: "10px 14px" }}>{r.poids}</td><td style={{ padding: "10px 14px" }}><Badge tone="green" T={T}>{r.qualite}</Badge></td><td style={{ padding: "10px 14px" }}>{r.prix}</td><td style={{ padding: "10px 14px" }}>{r.client}</td></tr>))}</tbody>
        </table>
      </Card></div>
    </div>
  );
}

function AchatSemenceModal({ T, semences, onAdd, onClose }) {
  const [mode, setMode] = useState("existant");
  const [semenceId, setSemenceId] = useState(semences[0]?.id || "");
  const [nomNouveau, setNomNouveau] = useState("");
  const [sachets, setSachets] = useState("10");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = () => {
    setError("");
    const v = Number(sachets);
    if (!Number.isInteger(v) || v <= 0) { setError("Indique un nombre entier de sachets, positif."); return; }
    if (v > 500) { setError("Quantité anormalement élevée pour un seul achat (max 500 sachets)."); return; }
    if (mode === "nouveau") {
      if (!nomNouveau.trim()) { setError("Donne un nom à cette semence."); return; }
      if (semences.some((s) => s.nom.toLowerCase() === nomNouveau.trim().toLowerCase())) { setError("Cette semence existe déjà dans le stock."); return; }
      onAdd({ isNew: true, nom: nomNouveau.trim(), sachets: v });
    } else {
      onAdd({ isNew: false, id: semenceId, sachets: v });
    }
    setDone(true);
  };

  return (
    <Modal T={T} title="Enregistrer un achat de semences" onClose={onClose} width={420}>
      {!done ? (<>
        <div className="hs-btn-row" style={{ marginBottom: 14 }}>
          <Btn T={T} small variant={mode === "existant" ? "primary" : "subtle"} onClick={() => setMode("existant")}>Semence existante</Btn>
          <Btn T={T} small variant={mode === "nouveau" ? "primary" : "subtle"} onClick={() => setMode("nouveau")}>+ Nouvelle semence</Btn>
        </div>
        {mode === "existant" ? (
          <Field T={T} label="Semence">
            <select value={semenceId} onChange={(e) => setSemenceId(e.target.value)} style={inputStyle(T)}>
              {semences.map((s) => <option key={s.id} value={s.id}>{s.nom} — {s.sachets} sachets en stock</option>)}
            </select>
          </Field>
        ) : (
          <Field T={T} label="Nom de la semence"><input value={nomNouveau} onChange={(e) => setNomNouveau(e.target.value)} placeholder="Ex: Graines de poivron" style={inputStyle(T)} /></Field>
        )}
        <Field T={T} label="Nombre de sachets achetés"><input type="number" min="1" max="500" value={sachets} onChange={(e) => setSachets(e.target.value)} style={inputStyle(T)} /></Field>
        {error && <div style={{ fontSize: 12, color: T.red, background: T.redSoft, borderRadius: 10, padding: "9px 12px", marginBottom: 12 }}>❌ {error}</div>}
        <Btn T={T} icon={Plus} onClick={submit} style={{ width: "100%", justifyContent: "center" }}>Enregistrer l'achat</Btn>
      </>) : (
        <div style={{ textAlign: "center", padding: "16px 0" }}>
          <CheckCircle2 size={30} color={T.green} />
          <div style={{ fontSize: 13.5, fontWeight: 600, color: T.text, marginTop: 10 }}>✅ Achat enregistré, stock mis à jour</div>
          <Btn T={T} onClick={onClose} variant="outline" small style={{ marginTop: 14 }}>Fermer</Btn>
        </div>
      )}
    </Modal>
  );
}

function UtiliserSemenceModal({ T, semences, zones, onUse, onClose }) {
  const [semenceId, setSemenceId] = useState(semences[0]?.id || "");
  const [zoneId, setZoneId] = useState(zones[0]?.id || "");
  const [sachets, setSachets] = useState("1");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const semence = semences.find((s) => s.id === semenceId);

  const submit = () => {
    setError("");
    const v = Number(sachets);
    if (!Number.isInteger(v) || v <= 0) { setError("Indique un nombre entier de sachets, positif."); return; }
    if (!zoneId) { setError("Choisis la zone concernée."); return; }
    if (semence && v > semence.sachets) { setError(`Stock insuffisant : seulement ${semence.sachets} sachets de ${semence.nom} en réserve.`); return; }
    onUse(semenceId, v, zoneId);
    setDone(true);
  };

  return (
    <Modal T={T} title="Utiliser des semences pour une zone" onClose={onClose} width={420}>
      {!done ? (<>
        <Field T={T} label="Semence">
          <select value={semenceId} onChange={(e) => setSemenceId(e.target.value)} style={inputStyle(T)}>
            {semences.map((s) => <option key={s.id} value={s.id}>{s.nom} — {s.sachets} sachets disponibles</option>)}
          </select>
        </Field>
        <Field T={T} label="Zone concernée">
          <select value={zoneId} onChange={(e) => setZoneId(e.target.value)} style={inputStyle(T)}>
            {zones.map((z) => <option key={z.id} value={z.id}>{z.nom} — {z.culture}</option>)}
          </select>
        </Field>
        <Field T={T} label="Nombre de sachets utilisés"><input type="number" min="1" value={sachets} onChange={(e) => setSachets(e.target.value)} style={inputStyle(T)} /></Field>
        {error && <div style={{ fontSize: 12, color: T.red, background: T.redSoft, borderRadius: 10, padding: "9px 12px", marginBottom: 12 }}>❌ {error}</div>}
        <Btn T={T} icon={Play} onClick={submit} style={{ width: "100%", justifyContent: "center" }}>Enregistrer et déduire du stock</Btn>
      </>) : (
        <div style={{ textAlign: "center", padding: "16px 0" }}>
          <CheckCircle2 size={30} color={T.green} />
          <div style={{ fontSize: 13.5, fontWeight: 600, color: T.text, marginTop: 10 }}>✅ Semences affectées à la zone, stock déduit</div>
          <Btn T={T} onClick={onClose} variant="outline" small style={{ marginTop: 14 }}>Fermer</Btn>
        </div>
      )}
    </Modal>
  );
}

function Stock({ T, semences, zones, onAchatSemence, onUseSemence }) {
  const [modal, setModal] = useState(null); // null | "achat" | "utiliser"
  return (
    <div>
      <PageHeader T={T} title="Stock" sub="Semences, nutriments, substrats, matériel, produits récoltés" />

      <div style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10, marginBottom: 8 }}>
          <div style={{ fontWeight: 600, fontSize: 13.5, color: T.text }}>Semences</div>
          <div className="hs-btn-row">
            <Btn T={T} small icon={Plus} onClick={() => setModal("achat")}>Ajouter un achat</Btn>
            <Btn T={T} small variant="subtle" icon={Play} onClick={() => setModal("utiliser")}>Utiliser pour une zone</Btn>
          </div>
        </div>
        <div className="hs-grid-cards">
          {semences.map((s) => {
            const bas = s.sachets <= s.min;
            return (
              <Card T={T} key={s.id} style={{ padding: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 12.5, color: T.text }}>{s.nom}</span>
                  {bas && <Badge tone="amber" T={T}>Stock bas</Badge>}
                </div>
                <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 17, color: bas ? T.amber : T.text, marginTop: 6 }}>{s.sachets} sachets</div>
                <div style={{ fontSize: 11, color: T.textMuted, marginTop: 4 }}>Seuil min: {s.min} sachets</div>
              </Card>
            );
          })}
        </div>
      </div>

      {Object.entries(stockData).map(([cat, items]) => (
        <div key={cat} style={{ marginBottom: 18 }}>
          <div style={{ fontWeight: 600, fontSize: 13.5, color: T.text, marginBottom: 8 }}>{cat}</div>
          <div className="hs-grid-cards">
            {items.map((it) => {
              const bas = it.q <= it.min;
              return (
                <Card T={T} key={it.n} style={{ padding: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12.5, color: T.text }}>{it.n}</span>
                    {bas && <Badge tone="amber" T={T}>Stock bas</Badge>}
                  </div>
                  <div style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 17, color: bas ? T.amber : T.text, marginTop: 6 }}>{it.q} {it.u}</div>
                  <div style={{ fontSize: 11, color: T.textMuted, marginTop: 4 }}>Seuil min: {it.min} {it.u}</div>
                </Card>
              );
            })}
          </div>
        </div>
      ))}

      {modal === "achat" && <AchatSemenceModal T={T} semences={semences} onAdd={onAchatSemence} onClose={() => setModal(null)} />}
      {modal === "utiliser" && <UtiliserSemenceModal T={T} semences={semences} zones={zones} onUse={onUseSemence} onClose={() => setModal(null)} />}
    </div>
  );
}

function AddDepenseModal({ T, onAdd, onClose }) {
  const POSTES = ["Semences", "Nutriments", "Eau", "Électricité", "Main-d'œuvre", "Maintenance", "Autre"];
  const [poste, setPoste] = useState(POSTES[0]);
  const [posteAutre, setPosteAutre] = useState("");
  const [montant, setMontant] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = () => {
    setError("");
    const v = Number(montant);
    const libelle = poste === "Autre" ? posteAutre.trim() : poste;
    if (!libelle) { setError("Précise le poste de dépense."); return; }
    if (!Number.isFinite(v) || v <= 0) { setError("Le montant doit être un nombre positif (en GNF)."); return; }
    if (v > 50000000) { setError("Montant anormalement élevé pour une seule dépense (max 50 000 000 GNF)."); return; }
    onAdd({ poste: libelle, montant: v });
    setDone(true);
  };

  return (
    <Modal T={T} title="Enregistrer une dépense" onClose={onClose} width={400}>
      {!done ? (<>
        <Field T={T} label="Poste">
          <select value={poste} onChange={(e) => setPoste(e.target.value)} style={inputStyle(T)}>
            {POSTES.map((p) => <option key={p} value={p}>{p}</option>)}
          </select>
        </Field>
        {poste === "Autre" && <Field T={T} label="Précise le poste"><input value={posteAutre} onChange={(e) => setPosteAutre(e.target.value)} style={inputStyle(T)} /></Field>}
        <Field T={T} label="Montant (GNF)"><input type="number" min="1" value={montant} onChange={(e) => setMontant(e.target.value)} style={inputStyle(T)} /></Field>
        {error && <div style={{ fontSize: 12, color: T.red, background: T.redSoft, borderRadius: 10, padding: "9px 12px", marginBottom: 12 }}>❌ {error}</div>}
        <Btn T={T} icon={Plus} onClick={submit} style={{ width: "100%", justifyContent: "center" }}>Enregistrer la dépense</Btn>
      </>) : (
        <div style={{ textAlign: "center", padding: "16px 0" }}>
          <CheckCircle2 size={30} color={T.green} />
          <div style={{ fontSize: 13.5, fontWeight: 600, color: T.text, marginTop: 10 }}>✅ Dépense enregistrée</div>
          <Btn T={T} onClick={onClose} variant="outline" small style={{ marginTop: 14 }}>Fermer</Btn>
        </div>
      )}
    </Modal>
  );
}

function AddRevenuModal({ T, onAdd, onClose }) {
  const [source, setSource] = useState("");
  const [montant, setMontant] = useState("");
  const [error, setError] = useState("");
  const [done, setDone] = useState(false);

  const submit = () => {
    setError("");
    const v = Number(montant);
    if (!source.trim()) { setError("Indique la source du revenu (client, marché…)."); return; }
    if (!Number.isFinite(v) || v <= 0) { setError("Le montant doit être un nombre positif (en GNF)."); return; }
    if (v > 100000000) { setError("Montant anormalement élevé pour un seul revenu (max 100 000 000 GNF)."); return; }
    onAdd({ source: source.trim(), montant: v });
    setDone(true);
  };

  return (
    <Modal T={T} title="Enregistrer un revenu" onClose={onClose} width={400}>
      {!done ? (<>
        <Field T={T} label="Source"><input value={source} onChange={(e) => setSource(e.target.value)} placeholder="Ex: Marché central, Restaurant X…" style={inputStyle(T)} /></Field>
        <Field T={T} label="Montant (GNF)"><input type="number" min="1" value={montant} onChange={(e) => setMontant(e.target.value)} style={inputStyle(T)} /></Field>
        {error && <div style={{ fontSize: 12, color: T.red, background: T.redSoft, borderRadius: 10, padding: "9px 12px", marginBottom: 12 }}>❌ {error}</div>}
        <Btn T={T} icon={Plus} onClick={submit} style={{ width: "100%", justifyContent: "center" }}>Enregistrer le revenu</Btn>
      </>) : (
        <div style={{ textAlign: "center", padding: "16px 0" }}>
          <CheckCircle2 size={30} color={T.green} />
          <div style={{ fontSize: 13.5, fontWeight: 600, color: T.text, marginTop: 10 }}>✅ Revenu enregistré</div>
          <Btn T={T} onClick={onClose} variant="outline" small style={{ marginTop: 14 }}>Fermer</Btn>
        </div>
      )}
    </Modal>
  );
}

function Finances({ T, finances, onAddDepense, onAddRevenu }) {
  const [modal, setModal] = useState(null); // null | "depense" | "revenu"
  const totalDepenses = finances.depenses.reduce((a, b) => a + b.montant, 0);
  const totalRevenus = finances.revenus.reduce((a, b) => a + b.montant, 0);
  const benefice = totalRevenus - totalDepenses;
  const max = Math.max(...finances.depenses.map((d) => d.montant), 1);
  return (
    <div>
      <PageHeader T={T} title="Finances" sub="Dépenses, revenus et bénéfices" action={
        <div className="hs-btn-row">
          <Btn T={T} small icon={Plus} onClick={() => setModal("depense")}>Enregistrer une dépense</Btn>
          <Btn T={T} small variant="subtle" icon={Plus} onClick={() => setModal("revenu")}>Enregistrer un revenu</Btn>
        </div>
      } />
      <div className="hs-grid-metrics" style={{ marginBottom: 18 }}>
        <MetricCard T={T} icon={Wallet} label="Revenus" value={(totalRevenus / 1000000).toFixed(1)} unit="M GNF" tone="green" />
        <MetricCard T={T} icon={Wallet} label="Dépenses" value={(totalDepenses / 1000000).toFixed(1)} unit="M GNF" tone="amber" />
        <MetricCard T={T} icon={Wallet} label="Bénéfice" value={(benefice / 1000000).toFixed(1)} unit="M GNF" tone="blue" />
      </div>
      <div className="hs-two-col">
        <Card T={T} style={{ flex: 1, minWidth: 260 }}>
          <div style={{ fontWeight: 600, fontSize: 13.5, color: T.text, marginBottom: 14 }}>Répartition des dépenses</div>
          {finances.depenses.map((d, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: T.text, marginBottom: 4 }}><span>{d.poste}</span><span>{d.montant.toLocaleString("fr-FR")} GNF</span></div>
              <div style={{ height: 6, background: T.panel2, borderRadius: 4 }}><div style={{ height: "100%", width: `${(d.montant / max) * 100}%`, background: T.green, borderRadius: 4 }} /></div>
            </div>
          ))}
        </Card>
        <Card T={T} style={{ flex: 1, minWidth: 260 }}>
          <div style={{ fontWeight: 600, fontSize: 13.5, color: T.text, marginBottom: 14 }}>Revenus enregistrés</div>
          {finances.revenus.map((r, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 12.5, color: T.text, padding: "7px 0", borderBottom: `1px solid ${T.border}` }}>
              <span>{r.source}</span><span style={{ fontFamily: "'IBM Plex Mono',monospace" }}>{r.montant.toLocaleString("fr-FR")} GNF</span>
            </div>
          ))}
        </Card>
      </div>
      {modal === "depense" && <AddDepenseModal T={T} onAdd={onAddDepense} onClose={() => setModal(null)} />}
      {modal === "revenu" && <AddRevenuModal T={T} onAdd={onAddRevenu} onClose={() => setModal(null)} />}
    </div>
  );
}

function AddEntretienModal({ T, onAdd, onClose }) {
  const [equip, setEquip] = useState("");
  const [derniere, setDerniere] = useState("");
  const [prochaine, setProchaine] = useState("");
  const [etat, setEtat] = useState("ok");
  const [error, setError] = useState("");

  const submit = () => {
    setError("");
    if (!equip.trim() || !derniere.trim() || !prochaine.trim()) { setError("Tous les champs sont obligatoires."); return; }
    onAdd({ id: `m${Date.now()}`, equip: equip.trim(), etat, derniere, prochaine });
    onClose();
  };

  return (
    <Modal T={T} title="Ajouter un entretien" onClose={onClose} width={420}>
      <Field T={T} label="Équipement concerné"><input value={equip} onChange={(e) => setEquip(e.target.value)} placeholder="Ex: Pompe Zone D" style={inputStyle(T)} /></Field>
      <div className="hs-two-col">
        <div style={{ flex: 1, minWidth: 140 }}><Field T={T} label="Dernière intervention"><input type="date" value={derniere} onChange={(e) => setDerniere(e.target.value)} style={inputStyle(T)} /></Field></div>
        <div style={{ flex: 1, minWidth: 140 }}><Field T={T} label="Prochaine prévue"><input type="date" value={prochaine} onChange={(e) => setProchaine(e.target.value)} style={inputStyle(T)} /></Field></div>
      </div>
      <Field T={T} label="État">
        <select value={etat} onChange={(e) => setEtat(e.target.value)} style={inputStyle(T)}>
          <option value="ok">OK</option>
          <option value="attention">À surveiller</option>
        </select>
      </Field>
      {error && <div style={{ fontSize: 12, color: T.red, background: T.redSoft, borderRadius: 10, padding: "9px 12px", marginBottom: 12 }}>❌ {error}</div>}
      <Btn T={T} icon={Plus} onClick={submit} style={{ width: "100%", justifyContent: "center" }}>Ajouter l'entretien</Btn>
    </Modal>
  );
}

function Maintenance({ T, maintenance, onAdd, onLog }) {
  const [modal, setModal] = useState(false);
  return (
    <div>
      <PageHeader T={T} title="Maintenance" sub="Équipements et interventions" action={<Btn T={T} small icon={Plus} onClick={() => setModal(true)}>Ajouter un entretien</Btn>} />
      <div className="hs-table-wrap"><Card T={T} style={{ padding: 0 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
          <thead><tr style={{ textAlign: "left", color: T.textMuted, borderBottom: `1px solid ${T.border}` }}>{["Équipement", "État", "Dernière", "Prochaine"].map((h) => <th key={h} style={{ padding: "10px 14px" }}>{h}</th>)}</tr></thead>
          <tbody>{maintenance.map((m, i) => (<tr key={m.id || i} style={{ borderBottom: `1px solid ${T.border}`, color: T.text }}><td style={{ padding: "10px 14px", fontWeight: 600 }}>{m.equip}</td><td style={{ padding: "10px 14px" }}><Badge tone={m.etat === "ok" ? "green" : "amber"} T={T}>{m.etat === "ok" ? "OK" : "À surveiller"}</Badge></td><td style={{ padding: "10px 14px" }}>{m.derniere}</td><td style={{ padding: "10px 14px" }}>{m.prochaine}</td></tr>))}</tbody>
        </table>
      </Card></div>
      {modal && <AddEntretienModal T={T} onClose={() => setModal(false)} onAdd={(m) => { onAdd(m); onLog && onLog({ type: "maintenance", zone: m.equip, action: `Entretien ajouté — ${m.equip} (prochaine: ${m.prochaine})` }); }} />}
    </div>
  );
}

function AddUserModal({ T, onAdd, onClose }) {
  const [nom, setNom] = useState("");
  const [role, setRole] = useState("Utilisateur");
  const [error, setError] = useState("");

  const submit = () => {
    setError("");
    if (!nom.trim()) { setError("Le nom est obligatoire."); return; }
    const acces = role === "Administrateur" ? "Accès complet (finances, rapports, utilisateurs, tout)" : "Zones, cultures, eau, nutriments, capteurs, alertes, historique (pas de finances/rapports)";
    onAdd({ id: `u${Date.now()}`, nom: nom.trim(), role, acces });
    onClose();
  };

  return (
    <Modal T={T} title="Ajouter un utilisateur" onClose={onClose} width={420}>
      <Field T={T} label="Nom"><input value={nom} onChange={(e) => setNom(e.target.value)} placeholder="Ex: F. Bah" style={inputStyle(T)} /></Field>
      <Field T={T} label="Rôle">
        <select value={role} onChange={(e) => setRole(e.target.value)} style={inputStyle(T)}>
          <option value="Administrateur">Administrateur — accès complet</option>
          <option value="Utilisateur">Utilisateur — gestion de la plantation uniquement</option>
        </select>
      </Field>
      <div style={{ fontSize: 11, color: T.textMuted, marginBottom: 14 }}>
        L'Administrateur voit tout (finances, rapports, gestion des utilisateurs). L'Utilisateur peut agir sur la plantation (zones, eau, nutriments, capteurs, historique) mais n'a pas accès aux finances ni aux rapports.
      </div>
      {error && <div style={{ fontSize: 12, color: T.red, background: T.redSoft, borderRadius: 10, padding: "9px 12px", marginBottom: 12 }}>❌ {error}</div>}
      <Btn T={T} icon={Plus} onClick={submit} style={{ width: "100%", justifyContent: "center" }}>Ajouter l'utilisateur</Btn>
    </Modal>
  );
}

function Utilisateurs({ T, users, onAdd, onDelete }) {
  const [modal, setModal] = useState(false);
  return (
    <div>
      <PageHeader T={T} title="Utilisateurs" sub="Rôles et permissions" action={<Btn T={T} icon={Plus} onClick={() => setModal(true)}>Ajouter un utilisateur</Btn>} />
      <div className="hs-grid-cards">
        {users.map((u) => (
          <Card T={T} key={u.id || u.nom}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: T.text }}>{u.nom}</div>
              {u.id && <button onClick={() => onDelete(u.id)} style={{ background: T.panel2, border: `1px solid ${T.border}`, borderRadius: 8, padding: 6, cursor: "pointer" }}><Trash2 size={13} color={T.textMuted} /></button>}
            </div>
            <Badge tone={u.role === "Administrateur" ? "green" : "blue"} T={T} style={{ marginTop: 6 }}>{u.role}</Badge>
            <div style={{ fontSize: 12, color: T.textMuted, marginTop: 8 }}>{u.acces}</div>
          </Card>
        ))}
      </div>
      {modal && <AddUserModal T={T} onClose={() => setModal(false)} onAdd={onAdd} />}
    </div>
  );
}

function Historique({ T, historique, semences, nutrients }) {
  const dosages = historique.filter((h) => h.type === "dosage");
  const semencesUtilisees = historique.filter((h) => h.type === "semence_use");
  const totalSachetsUtilises = semencesUtilisees.reduce((a, h) => a + (h.qte || 0), 0);
  const semencesAchetees = historique.filter((h) => h.type === "semence_achat");
  const totalSachetsAchetes = semencesAchetees.reduce((a, h) => a + (h.qte || 0), 0);

  return (
    <div>
      <PageHeader T={T} title="Historique" sub="Journal de toutes les actions effectuées" />

      <div className="hs-grid-metrics" style={{ marginBottom: 18 }}>
        <MetricCard T={T} icon={History} label="Dosages effectués" value={dosages.length} unit="" tone="green" />
        <MetricCard T={T} icon={Package} label="Sachets achetés" value={totalSachetsAchetes} unit="" tone="blue" />
        <MetricCard T={T} icon={Package} label="Sachets utilisés" value={totalSachetsUtilises} unit="" tone="amber" />
        <MetricCard T={T} icon={FlaskConical} label="Nutriments en stock" value={nutrients.reduce((a, n) => a + n.ml, 0) / 1000} unit="L" tone="green" />
      </div>

      <div style={{ fontWeight: 600, fontSize: 13.5, color: T.text, marginBottom: 10 }}>Bilan des semences par type</div>
      <div className="hs-grid-cards" style={{ marginBottom: 20 }}>
        {semences.map((s) => {
          const achete = historique.filter((h) => h.type === "semence_achat" && h.semenceId === s.id).reduce((a, h) => a + h.qte, 0);
          const utilise = historique.filter((h) => h.type === "semence_use" && h.semenceId === s.id).reduce((a, h) => a + h.qte, 0);
          return (
            <Card T={T} key={s.id}>
              <div style={{ fontWeight: 600, fontSize: 13, color: T.text }}>{s.nom}</div>
              <div style={{ fontSize: 11.5, color: T.textMuted, marginTop: 6, lineHeight: 1.8 }}>
                Achetés : <b style={{ color: T.text }}>{achete}</b> sachets<br />
                Utilisés : <b style={{ color: T.text }}>{utilise}</b> sachets<br />
                Stock actuel : <b style={{ color: T.text }}>{s.sachets}</b> sachets
              </div>
            </Card>
          );
        })}
      </div>

      <div style={{ fontWeight: 600, fontSize: 13.5, color: T.text, marginBottom: 10 }}>Journal détaillé</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {historique.map((h, i) => (
          <Card T={T} key={i} style={{ display: "flex", gap: 12, alignItems: "center", padding: 14, flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'IBM Plex Mono',monospace", fontSize: 12, color: T.textMuted, width: 46 }}>{h.h}</span>
            <Badge tone="blue" T={T}>{h.zone}</Badge>
            <span style={{ fontSize: 12.5, color: T.text, flex: 1, minWidth: 140 }}>{h.action}</span>
            <span style={{ fontSize: 11.5, color: T.textMuted }}>{h.user}</span>
          </Card>
        ))}
      </div>
    </div>
  );
}

/* ============================== HYDROAI ============================== */
function analyserQuestion(q, ctx) {
  const { zones, nutrients, capteurs, rules, semences, historique, finances } = ctx;
  const text = q.toLowerCase().trim();
  const norm = text.normalize("NFD").replace(/[\u0300-\u036f]/g, ""); // version sans accents, pour un matching plus tolérant
  const reponses = [];

  // Bilan complet de l'exploitation
  if (/bilan|resume|rapport|synthese/.test(norm)) {
    const risques = zones.filter((z) => z.etat !== "ok" || hors(seuils.ph, z.ph) || hors(seuils.ec, z.ec) || z.niveau / z.capacite < 0.3);
    const capteursHS = capteurs.filter((c) => !c.connecte);
    const nutBas = nutrients.filter((n) => n.ml / 1000 <= 2);
    const semBas = semences.filter((s) => s.sachets <= s.min);
    const total = finances.depenses.reduce((a, b) => a + b.montant, 0);
    const totalRevenus = finances.revenus.reduce((a, b) => a + b.montant, 0);
    const dosages = historique.filter((h) => h.type === "dosage").length;
    const lignes = [
      `📊 BILAN DE L'EXPLOITATION`,
      `Zones : ${zones.length} actives, ${risques.length} à surveiller${risques.length ? " (" + risques.map((z) => z.nom).join(", ") + ")" : ""}.`,
      `Capteurs : ${capteurs.length - capteursHS.length}/${capteurs.length} connectés${capteursHS.length ? " — hors ligne : " + capteursHS.map((c) => c.nom).join(", ") : ""}.`,
      `Nutriments : ${nutrients.map((n) => `${n.nom} ${(n.ml / 1000).toFixed(1)} L`).join(", ")}${nutBas.length ? " ⚠ stock bas sur " + nutBas.map((n) => n.nom).join(", ") : ""}.`,
      `Semences : ${semences.map((s) => `${s.nom} ${s.sachets} sachets`).join(", ")}${semBas.length ? " ⚠ stock bas sur " + semBas.map((s) => s.nom).join(", ") : ""}.`,
      `Finances : revenus ${(totalRevenus / 1000000).toFixed(1)} M GNF, dépenses ${(total / 1000000).toFixed(1)} M GNF, bénéfice ${((totalRevenus - total) / 1000000).toFixed(1)} M GNF.`,
      `Historique : ${historique.length} actions enregistrées, dont ${dosages} dosage(s).`,
      risques.length === 0 ? "État général : 🟢 exploitation saine, rien de critique." : `Recommandation prioritaire : traiter ${risques[0].nom} en premier.`,
    ];
    return lignes.join("\n");
  }

  // Politesse / small talk (tolérant aux accents et à la casse)
  if (/^(bonjour|salut|coucou|hello|bonsoir|hey|yo)\b/.test(norm)) {
    return "Bonjour ! Je surveille actuellement " + zones.length + " zones et " + capteurs.length + " capteurs sur ton exploitation. Que veux-tu savoir ?";
  }
  if (/merci/.test(norm)) return "Avec plaisir 🌱 Dis-moi si tu as une autre question sur ta plantation.";
  if (/^(ca va|comment ca va|comment vas.tu|tu vas bien)/.test(norm)) return "Tout roule de mon côté — je surveille tes zones en continu. Et toi, comment se passe la récolte ?";
  if (/^(qui es.tu|tu es qui|c.est quoi hydroai)/.test(norm)) return "Je suis HydroAI, l'assistant intégré à HydroSmart. J'analyse en direct tes zones, capteurs, nutriments et automatisations pour répondre à tes questions et t'aider à piloter ton exploitation.";
  if (/comment va (ma |mon |l.)?(plantation|exploitation|ferme)/.test(norm) || /(ca va|ça va) (ma |mon |l.)?(plantation|exploitation|ferme)/.test(norm)) {
    return analyserQuestion("bilan", ctx);
  }

  // Comment utiliser l'appli (how-to)
  if (/comment/.test(text)) {
    if (/zone/.test(text)) return "Pour ajouter une zone : va dans « Zones » puis clique sur « + Ajouter une zone ». Tu renseignes la culture, le nombre de plants, le système hydroponique et le réservoir associé.";
    if (/capteur/.test(text)) return "Pour ajouter ou modifier un capteur : va dans « Capteurs », clique sur « + Ajouter un capteur » (ou l'icône crayon sur un capteur existant) pour changer son nom, sa zone, ses seuils, ou simuler sa valeur.";
    if (/(renouveler|eau)/.test(text)) return "Pour renouveler l'eau d'une zone : ouvre la zone concernée, section « Contrôle de l'eau », puis clique sur « Renouveler l'eau ». La séquence (arrêt pompe, vidange, remplissage, dosage, redémarrage) s'affiche étape par étape.";
    if (/automatisation/.test(text)) return "Pour créer une automatisation : va dans « Automatisation », clique sur « + Ajouter une automatisation », choisis la condition (métrique, opérateur, valeur) puis l'action à déclencher.";
    if (/récolte/.test(text)) return "Tes récoltes sont visibles et enregistrables dans l'onglet « Récoltes » — tu peux y ajouter culture, poids, qualité et client.";
    if (/nutriment/.test(text)) return "Dans « Nutriments », tu peux appliquer une recette à une zone, ou cliquer sur « + Ajouter des nutriments » pour réapprovisionner un nutriment existant ou en créer un nouveau.";
  }

  // Capteurs / équipements défaillants ou déconnectés
  if (/(capteur|pompe|équipement).*(défaill|panne|hs\b|marche pas|hors ligne|déconnect)|défaill|hors ligne|déconnect/.test(text)) {
    const capteursHS = capteurs.filter((c) => !c.connecte);
    const capteursHorsPlage = capteurs.filter((c) => c.connecte && (c.valeur < c.min || c.valeur > c.max));
    const pompesHS = zones.filter((z) => !z.pompe);
    if (capteursHS.length === 0 && pompesHS.length === 0 && capteursHorsPlage.length === 0) {
      return "Aucun capteur ni pompe défaillant actuellement. Tous les équipements remontent des données normales. ✅";
    }
    if (capteursHS.length) reponses.push(`Déconnectés : ${capteursHS.map((c) => c.nom).join(", ")}.`);
    if (capteursHorsPlage.length) reponses.push(`Hors plage : ${capteursHorsPlage.map((c) => `${c.nom} (${c.valeur} ${c.unite}, attendu ${c.min}–${c.max})`).join(", ")}.`);
    if (pompesHS.length) reponses.push(`Pompe(s) arrêtée(s) : ${pompesHS.map((z) => z.nom).join(", ")}.`);
    return reponses.join(" ");
  }

  // Liste des capteurs
  if (/(quels?|liste).*capteurs?/.test(text)) {
    return capteurs.map((c) => `${c.nom} (${c.zone}) : ${c.valeur} ${c.unite} — ${c.connecte ? "connecté" : "déconnecté"}`).join(" · ");
  }

  // Nutriment manquant / stock
  if (/nutriment/.test(text) && /(manque|faible|bas|insuffisant|reste|stock)/.test(text)) {
    const bas = nutrients.filter((n) => n.ml / 1000 <= 2);
    if (bas.length === 0) {
      return `Tous les nutriments sont bien approvisionnés (${nutrients.map((n) => `${n.nom}: ${(n.ml / 1000).toFixed(2)} L`).join(", ")}).`;
    }
    return `Stock bas détecté sur : ${bas.map((n) => `${n.nom} (${(n.ml / 1000).toFixed(2)} L restants)`).join(" et ")}. Je te recommande de réapprovisionner depuis la page Nutriments.`;
  }
  if (/nutriment/.test(text) && /(dosage|recette|combien)/.test(text)) {
    return recettesData.map((r) => `${r.culture} (100 L) : A ${r.a} ml, B ${r.b} ml, pH ${r.ph}, EC ${r.ec}`).join(" · ");
  }

  // Zone à risque / attention / analyse générale
  if (/(zone|toute ma plantation|exploitation).*(risque|attention|surveiller|probl[eè]me|analyse)/.test(text) || /analyse/.test(text)) {
    const risques = zones.filter((z) => z.etat !== "ok" || hors(seuils.ph, z.ph) || hors(seuils.ec, z.ec) || z.niveau / z.capacite < 0.3);
    if (risques.length === 0) return "Aucune zone à risque pour le moment — tous les paramètres sont dans les plages normales. 🟢";
    return risques.map((z) => {
      const pts = [];
      if (z.niveau / z.capacite < 0.3) pts.push(`niveau bas (${Math.round((z.niveau / z.capacite) * 100)}%)`);
      if (hors(seuils.ph, z.ph)) pts.push(`pH ${z.ph} hors plage`);
      if (hors(seuils.ec, z.ec)) pts.push(`EC ${z.ec} hors plage`);
      if (!z.pompe) pts.push("pompe arrêtée");
      return `${z.nom} (${z.culture}) nécessite votre attention : ${pts.join(", ")}. Recommandation : vérifier le dosage et la circulation d'eau.`;
    }).join(" ");
  }

  // Comparaison entre zones
  if (/compar/.test(text)) {
    return zones.map((z) => `${z.nom} (${z.culture}) — ${z.plants} plants, ${Math.round((z.niveau / z.capacite) * 100)}% de réservoir, pH ${z.ph}, EC ${z.ec}`).join(" | ");
  }

  // Niveau d'eau / consommation / débit
  if (/(niveau|réservoir).*(eau|bas|faible)/.test(text)) {
    const bas = zones.filter((z) => z.niveau / z.capacite < 0.3);
    if (bas.length === 0) return "Tous les réservoirs sont à un niveau correct (> 30 %).";
    return `Niveau bas : ${bas.map((z) => `${z.nom} (${Math.round((z.niveau / z.capacite) * 100)} %)`).join(", ")}.`;
  }
  if (/consommation.*eau|eau.*consomm/.test(text)) {
    return "Sur les 7 derniers jours (données de démonstration), l'exploitation a consommé environ 640 L d'eau, principalement pour les Zones A et B.";
  }
  if (/débit/.test(text)) {
    return zones.map((z) => `${z.nom} : ${z.debit} L/min`).join(" · ");
  }

  // Récolte / croissance / cycle
  if (/récolte/.test(text)) {
    return "D'après les cycles en cours, la Zone C (Concombre) approche de sa fenêtre de récolte optimale. Vérifie la page Récoltes pour enregistrer une nouvelle récolte.";
  }
  if (/(croissance|cycle|stade)/.test(text)) {
    return zones.map((z) => `${z.nom} — ${z.culture} : système ${z.systeme}, ${z.plants} plants en croissance.`).join(" · ");
  }

  // Exploitation / finances
  if (/(dépense|revenu|bénéfice|finance|coût)/.test(text)) {
    const total = finances.depenses.reduce((a, b) => a + b.montant, 0);
    const totalRevenus = finances.revenus.reduce((a, b) => a + b.montant, 0);
    return `Revenus : ${(totalRevenus / 1000000).toFixed(1)} M GNF · Dépenses : ${(total / 1000000).toFixed(1)} M GNF · Bénéfice estimé : ${((totalRevenus - total) / 1000000).toFixed(1)} M GNF.`;
  }

  // Automatisations
  if (/(automatisation|règle)/.test(text)) {
    const actives = rules.filter((r) => r.on);
    if (actives.length === 0) return "Aucune automatisation n'est active actuellement.";
    return actives.map((r) => { const { cond, act } = ruleLabel(r); return `${cond} ${act}`; }).join(" | ");
  }

  // Équipements (pompes / vannes)
  if (/(pompe|vanne|électrovanne)/.test(text)) {
    return zones.map((z) => `${z.nom} : pompe ${z.pompe ? "active" : "arrêtée"}, vanne entrée ${z.vanneEntree ? "ouverte" : "fermée"}`).join(" · ");
  }

  // pH précis
  if (/pourquoi.*ph|ph.*augment|ph.*mont/.test(text)) {
    return "Une hausse de pH peut venir d'un dosage insuffisant de correcteur pH-, d'une évaporation qui concentre la solution, ou d'un début de colonisation algale dans le réservoir. Vérifie la dernière application de nutriments et l'exposition à la lumière du réservoir.";
  }

  reponses.push("Je n'ai pas de réponse toute faite pour cette question précise, mais voici ce que je peux te dire à partir des données actuelles : ");
  reponses.push(`${zones.length} zones actives, ${capteurs.filter((c) => c.connecte).length}/${capteurs.length} capteurs connectés, ${nutrients.length} nutriments en stock.`);
  reponses.push("Tu peux me demander par exemple : « quelle zone nécessite mon attention ? », « quels capteurs sont hors ligne ? », « compare la Zone A et la Zone C », « quelles sont mes dépenses ce mois-ci ? », ou « comment ajouter une automatisation ? ».");
  return reponses.join(" ");
}

function HydroAI({ T, zones, nutrients, capteurs, rules, semences, historique, finances }) {
  const risques = zones.filter((z) => z.etat !== "ok" || hors(seuils.ph, z.ph) || hors(seuils.ec, z.ec) || z.niveau / z.capacite < 0.3);
  const capteursHS = capteurs.filter((c) => !c.connecte);
  const nutBas = nutrients.filter((n) => n.ml / 1000 <= 2);
  const semBas = semences.filter((s) => s.sachets <= s.min);
  const aDesProblemes = risques.length > 0 || capteursHS.length > 0 || nutBas.length > 0 || semBas.length > 0;

  const messageOuverture = aDesProblemes
    ? [
        "⚠️ Bonjour — j'ai détecté des points à vérifier sur ton exploitation :",
        risques.length ? `• Zone(s) à surveiller : ${risques.map((z) => z.nom).join(", ")}` : null,
        capteursHS.length ? `• Capteur(s) hors ligne : ${capteursHS.map((c) => c.nom).join(", ")}` : null,
        nutBas.length ? `• Stock nutriment bas : ${nutBas.map((n) => n.nom).join(", ")}` : null,
        semBas.length ? `• Stock semences bas : ${semBas.map((s) => s.nom).join(", ")}` : null,
        "Tape « bilan » pour le détail complet, ou demande-moi ce qu'il faut vérifier en premier.",
      ].filter(Boolean).join("\n")
    : "Bonjour 👋 Je suis HydroAI, l'assistant de ton exploitation. Tout est normal actuellement. Pose-moi une question sur tes zones, capteurs, nutriments, automatisations ou finances — ou demande-moi un « bilan » complet.";

  const [messages, setMessages] = useState([{ role: "ai", text: messageOuverture }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [ecoute, setEcoute] = useState(false);
  const recognitionRef = React.useRef(null);
  const [voixDispo, setVoixDispo] = useState(true);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) { setVoixDispo(false); return; }
    const recognition = new SpeechRecognition();
    recognition.lang = "fr-FR";
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.onresult = (event) => {
      let transcript = "";
      for (let i = 0; i < event.results.length; i++) transcript += event.results[i][0].transcript;
      setInput(transcript);
    };
    recognition.onend = () => setEcoute(false);
    recognition.onerror = () => setEcoute(false);
    recognitionRef.current = recognition;
  }, []);

  const toggleEcoute = () => {
    if (!recognitionRef.current) return;
    if (ecoute) {
      recognitionRef.current.stop();
      setEcoute(false);
    } else {
      setInput("");
      recognitionRef.current.start();
      setEcoute(true);
    }
  };


  const send = () => {
    const q = input.trim();
    if (!q) return;
    setMessages((m) => [...m, { role: "user", text: q }]);
    setInput("");
    setTyping(true);
    const delai = 500 + Math.random() * 700; // effet de "réflexion" variable, plus naturel qu'un délai fixe
    setTimeout(() => {
      const reponse = analyserQuestion(q, { zones, nutrients, capteurs, rules, semences, historique, finances });
      setMessages((m) => [...m, { role: "ai", text: reponse }]);
      setTyping(false);
    }, delai);
  };

  return (
    <div>
      <PageHeader T={T} title="HydroAI" sub="Assistant intelligent — analyse les données réelles de l'exploitation" />
      <Card T={T} style={{ padding: 0, display: "flex", flexDirection: "column", height: 480 }}>
        <div style={{ flex: 1, overflowY: "auto", padding: 18, display: "flex", flexDirection: "column", gap: 12 }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
              <div style={{
                maxWidth: "80%", padding: "9px 13px", borderRadius: 14, whiteSpace: "pre-line",
                background: m.role === "user" ? T.green : T.panel2,
                color: m.role === "user" ? "#fff" : T.text, fontSize: 13, lineHeight: 1.5,
              }}>{m.text}</div>
            </div>
          ))}
          {typing && <div style={{ fontSize: 12, color: T.textMuted }}>HydroAI analyse les données…</div>}
        </div>
        <div style={{ display: "flex", gap: 8, padding: 14, borderTop: `1px solid ${T.border}` }}>
          {voixDispo && (
            <button
              onClick={toggleEcoute}
              title={ecoute ? "Arrêter l'écoute" : "Parler à HydroAI"}
              style={{
                background: ecoute ? T.red : T.panel2, border: `1px solid ${ecoute ? T.red : T.border}`,
                borderRadius: 10, padding: "0 14px", cursor: "pointer", display: "flex", alignItems: "center",
                animation: ecoute ? "hs-pulse 1.2s infinite" : "none",
              }}
            >
              {ecoute ? <MicOff size={16} color="#fff" /> : <Mic size={16} color={T.textMuted} />}
            </button>
          )}
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder={ecoute ? "Je t'écoute…" : "Un capteur est-il défaillant ?"}
            style={{ ...inputStyle(T), flex: 1 }}
          />
          <button onClick={send} style={{ background: T.green, border: "none", borderRadius: 10, padding: "0 16px", cursor: "pointer", display: "flex", alignItems: "center" }}><Send size={16} color="#fff" /></button>
        </div>
      </Card>
    </div>
  );
}

function Placeholder({ T, title, sub }) {
  return <div><PageHeader T={T} title={title} sub={sub} /><Card T={T} style={{ textAlign: "center", padding: 46, color: T.textMuted, fontSize: 13 }}>Module en cours de conception — à connecter au backend et aux contrôleurs IoT.</Card></div>;
}

/* ============================== EMERGENCY MODAL ============================== */
function EmergencyModal({ T, onClose, onLog }) {
  const [done, setDone] = useState(false);
  return (
    <Modal T={T} title="Arrêt d'urgence" onClose={onClose}>
      {!done ? (<>
        <div style={{ fontSize: 12.5, color: T.text, background: T.redSoft, padding: 12, borderRadius: 10, marginBottom: 16 }}>Cette action coupe immédiatement toutes les pompes et ferme les électrovannes configurées, sur toutes les zones.</div>
        <Btn T={T} variant="danger" icon={Power} onClick={() => { setDone(true); onLog && onLog({ type: "urgence", zone: "Toutes zones", action: "Arrêt d'urgence déclenché — pompes coupées, vannes fermées" }); }} style={{ width: "100%", justifyContent: "center" }}>Confirmer l'arrêt d'urgence</Btn>
      </>) : (<div style={{ textAlign: "center", padding: "12px 0" }}><CheckCircle2 size={28} color={T.green} /><div style={{ fontSize: 13, fontWeight: 600, color: T.text, marginTop: 8 }}>Système arrêté et sécurisé</div><div style={{ fontSize: 11.5, color: T.textMuted, marginTop: 4 }}>Action enregistrée dans l'historique.</div><Btn T={T} onClick={onClose} variant="outline" small style={{ marginTop: 12 }}>Fermer</Btn></div>)}
    </Modal>
  );
}

/* ============================== APP SHELL ============================== */
export default function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("Administrateur");
  const [mode, setMode] = useState("light");
  const [page, setPage] = useState("dashboard");
  const [zones, setZones] = useState(ZONES_INIT);
  const [nutrients, setNutrients] = useState(NUTRIENTS_INIT);
  const [capteurs, setCapteurs] = useState(CAPTEURS_INIT);
  const [semences, setSemences] = useState(SEMENCES_INIT);
  const [finances, setFinances] = useState(FINANCES_INIT);
  const [maintenance, setMaintenance] = useState(maintenanceData);
  const [users, setUsers] = useState(usersData);
  const [historique, setHistorique] = useState(historiqueData);
  const [rules, setRules] = useState(automatisationsData);
  const [activeZoneId, setActiveZoneId] = useState(null);
  const [zoneTab, setZoneTab] = useState("apercu");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [emergency, setEmergency] = useState(false);
  const T = themes[mode];

  if (!loggedIn) return <Login T={T} onLogin={(r) => { setRole(r); setLoggedIn(true); }} />;

  const isAdmin = role === "Administrateur";

  const updateZone = (id, patch) => setZones((zs) => zs.map((z) => z.id === id ? { ...z, ...patch } : z));
  const activeZone = zones.find((z) => z.id === activeZoneId);
  const openZone = (id, tab = "apercu") => { setActiveZoneId(id); setZoneTab(tab); setPage("zones"); };
  const goNav = (id) => { setPage(id); setActiveZoneId(null); setSidebarOpen(false); };
  const heureActuelle = () => new Date().toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });
  const logHistorique = (entry) => setHistorique((h) => [{ h: heureActuelle(), user: "T. Diallo", ...entry }, ...h]);

  const applyRecette = ({ zoneId, neededA, neededB, phVal, ecVal }) => {
    setNutrients((ns) => ns.map((n) => n.id === "a" ? { ...n, ml: n.ml - neededA } : n.id === "b" ? { ...n, ml: n.ml - neededB } : n));
    updateZone(zoneId, { ph: phVal, ec: ecVal, lastDoseAt: new Date().toISOString() });
    const z = zones.find((x) => x.id === zoneId);
    logHistorique({ type: "dosage", zone: z?.nom || zoneId, action: `Dosage appliqué — Nutriment A ${neededA} ml, B ${neededB} ml (pH cible ${phVal}, EC cible ${ecVal})` });
  };
  const addStock = ({ isNew, id, nom, litres }) => {
    const ml = Math.round(litres * 1000);
    setNutrients((ns) => isNew ? [...ns, { id: `n${Date.now()}`, nom, ml }] : ns.map((n) => n.id === id ? { ...n, ml: n.ml + ml } : n));
    logHistorique({ type: "nutriment_achat", zone: "Stock", action: `Nutriment ${isNew ? nom : nutrients.find((n) => n.id === id)?.nom} — +${litres} L ajoutés au stock` });
  };
  const saveCapteur = (c) => {
    setCapteurs((cs) => {
      const existe = cs.some((x) => x.id === c.id);
      logHistorique({ type: "capteur", zone: c.zone, action: existe ? `Capteur modifié — ${c.nom} (${c.valeur} ${c.unite})` : `Capteur ajouté — ${c.nom}` });
      return existe ? cs.map((x) => x.id === c.id ? c : x) : [...cs, c];
    });
  };
  const deleteCapteur = (id) => setCapteurs((cs) => {
    const c = cs.find((x) => x.id === id);
    if (c) logHistorique({ type: "capteur", zone: c.zone, action: `Capteur supprimé — ${c.nom}` });
    return cs.filter((x) => x.id !== id);
  });
  const achatSemence = ({ isNew, id, nom, sachets }) => {
    setSemences((ss) => isNew ? [...ss, { id: `sem${Date.now()}`, nom, sachets, min: 5 }] : ss.map((s) => s.id === id ? { ...s, sachets: s.sachets + sachets } : s));
    logHistorique({ type: "semence_achat", semenceId: isNew ? null : id, qte: sachets, zone: "Stock", action: `Achat semences — ${isNew ? nom : semences.find((s) => s.id === id)?.nom} +${sachets} sachets` });
  };
  const useSemence = (semenceId, sachets, zoneId) => {
    setSemences((ss) => ss.map((s) => s.id === semenceId ? { ...s, sachets: s.sachets - sachets } : s));
    const z = zones.find((x) => x.id === zoneId);
    const s = semences.find((x) => x.id === semenceId);
    logHistorique({ type: "semence_use", semenceId, qte: sachets, zone: z?.nom || zoneId, action: `Semences utilisées — ${s?.nom} -${sachets} sachets` });
  };
  const addDepense = (d) => {
    setFinances((f) => ({ ...f, depenses: [...f.depenses, d] }));
    logHistorique({ type: "finance", zone: "Finances", action: `Dépense enregistrée — ${d.poste} : ${d.montant.toLocaleString("fr-FR")} GNF` });
  };
  const addRevenu = (r) => {
    setFinances((f) => ({ ...f, revenus: [...f.revenus, r] }));
    logHistorique({ type: "finance", zone: "Finances", action: `Revenu enregistré — ${r.source} : ${r.montant.toLocaleString("fr-FR")} GNF` });
  };

  const pages = {
    dashboard: <Dashboard T={T} zones={zones} onOpenZone={openZone} />,
    zones: activeZone ? <ZoneDetail T={T} zone={activeZone} initialTab={zoneTab} onBack={() => setActiveZoneId(null)} onUpdateZone={updateZone} nutrients={nutrients} onApplyRecette={applyRecette} onLog={logHistorique} /> : <Zones T={T} zones={zones} onOpenZone={openZone} />,
    cultures: <Cultures T={T} />,
    nutriments: <Nutriments T={T} zones={zones} nutrients={nutrients} onApplyRecette={applyRecette} onAddStock={addStock} />,
    automatisation: <Automatisation T={T} rules={rules} setRules={setRules} />,
    hydroai: <HydroAI T={T} zones={zones} nutrients={nutrients} capteurs={capteurs} rules={rules} semences={semences} historique={historique} finances={finances} />,
    capteurs: <Capteurs T={T} capteurs={capteurs} zones={zones} onSave={saveCapteur} onDelete={deleteCapteur} />,
    alertes: <Alertes T={T} />,
    recoltes: <Recoltes T={T} />,
    stock: <Stock T={T} semences={semences} zones={zones} onAchatSemence={achatSemence} onUseSemence={useSemence} />,
    finances: <Finances T={T} finances={finances} onAddDepense={addDepense} onAddRevenu={addRevenu} />,
    maintenance: <Maintenance T={T} maintenance={maintenance} onAdd={(m) => setMaintenance((ms) => [m, ...ms])} onLog={logHistorique} />,
    rapports: <Placeholder T={T} title="Rapports" sub="Synthèses et exports" />,
    utilisateurs: <Utilisateurs T={T} users={users} onAdd={(u) => setUsers((us) => [...us, u])} onDelete={(id) => setUsers((us) => us.filter((u) => u.id !== id))} />,
    historique: <Historique T={T} historique={historique} semences={semences} nutrients={nutrients} />,
    parametres: <Placeholder T={T} title="Paramètres" sub="Préférences de l'exploitation" />,
  };

  return (
    <div style={{ background: T.bg, fontFamily: "'Inter',sans-serif", minHeight: "100vh" }}>
      <style>{GLOBAL_CSS}</style>
      <div className="hs-shell">
        <div className={`hs-overlay ${sidebarOpen ? "open" : ""}`} onClick={() => setSidebarOpen(false)} />
        <div className={`hs-sidebar ${sidebarOpen ? "open" : ""}`} style={{ background: T.sidebar }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 8px", marginBottom: 22 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}><Logo size={32} /></div>
              <span style={{ color: "#fff", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 14.5 }}>HydroSmart</span>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="hs-hamburger" style={{ background: "none", border: "none", cursor: "pointer" }}><X size={16} color={T.sidebarText} /></button>
          </div>
          <div style={{ flex: 1, overflowY: "auto" }}>
            {NAV.filter((n) => isAdmin || !["finances", "rapports", "utilisateurs"].includes(n.id)).map((n) => {
              const Icon = n.icon; const active = page === n.id;
              return <button key={n.id} onClick={() => goNav(n.id)} style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", marginBottom: 2, background: active ? T.green + "22" : "transparent", border: "none", borderRadius: 9, cursor: "pointer", color: active ? T.green : T.sidebarText, fontSize: 12.6, fontWeight: active ? 600 : 500, textAlign: "left" }}><Icon size={15} /> {n.label}</button>;
            })}
          </div>
          <button onClick={() => setLoggedIn(false)} style={{ display: "flex", alignItems: "center", gap: 10, padding: "9px 10px", background: "transparent", border: "none", color: T.sidebarText, fontSize: 12.6, cursor: "pointer" }}><LogOut size={15} /> Déconnexion</button>
        </div>

        <div className="hs-main" style={{ marginLeft: 0 }}>
          <div className="hs-topbar" style={{ borderBottom: `1px solid ${T.border}` }}>
            <button className="hs-hamburger" onClick={() => setSidebarOpen(true)} style={{ background: T.panel2, border: `1px solid ${T.border}`, borderRadius: 9, padding: 8, cursor: "pointer" }}><Menu size={16} color={T.text} /></button>
            <span className="hs-brand-inline" style={{ fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, fontSize: 14, color: T.text }}>HydroSmart</span>
            <div style={{ flex: 1 }} />
            <Btn T={T} variant="danger" small icon={Power} onClick={() => setEmergency(true)}>Arrêt d'urgence</Btn>
            <button onClick={() => setMode(mode === "light" ? "dark" : "light")} style={{ background: T.panel2, border: `1px solid ${T.border}`, borderRadius: 9, padding: 8, cursor: "pointer" }}>{mode === "light" ? <Moon size={15} color={T.text} /> : <Sun size={15} color={T.text} />}</button>
            <button onClick={() => goNav("alertes")} style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: 4, display: "flex" }} title="Voir les alertes">
              <Bell size={17} color={T.textMuted} />
              <span style={{ position: "absolute", top: 2, right: 2, width: 7, height: 7, borderRadius: "50%", background: T.red }} />
            </button>
            <div style={{ width: 30, height: 30, borderRadius: "50%", background: T.green, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0 }}>EX</div>
          </div>
          {(() => {
            const zonesRisque = zones.filter((z) => z.etat !== "ok" || hors(seuils.ph, z.ph) || hors(seuils.ec, z.ec) || z.niveau / z.capacite < 0.3);
            const capteursHS = capteurs.filter((c) => !c.connecte);
            if (zonesRisque.length === 0 && capteursHS.length === 0) return null;
            const points = [];
            if (zonesRisque.length) points.push(`${zonesRisque.length} zone(s) à vérifier (${zonesRisque.map((z) => z.nom).join(", ")})`);
            if (capteursHS.length) points.push(`${capteursHS.length} capteur(s) hors ligne`);
            return (
              <div style={{ background: T.amberSoft, borderBottom: `1px solid ${T.amber}55`, padding: "10px 22px", display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
                <AlertTriangle size={15} color={T.amber} style={{ flexShrink: 0 }} />
                <span style={{ fontSize: 12.5, color: T.text, flex: 1 }}>Veuillez vérifier : {points.join(" · ")}.</span>
                <Btn T={T} small variant="subtle" onClick={() => goNav("hydroai")}>Demander à HydroAI</Btn>
              </div>
            );
          })()}
          <div className="hs-content">{pages[page]}</div>
        </div>
      </div>
      {emergency && <EmergencyModal T={T} onClose={() => setEmergency(false)} onLog={logHistorique} />}
    </div>
  );
}
