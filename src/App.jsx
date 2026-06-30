import { useState, useEffect, useRef } from "react";

/* ============================================================
   TEMI NAOMI — Storytelling Website Prototype
   Design System:
   - Palette: #0D0B09 (void), #1A1410 (deep), #2C1F14 (bark),
              #8B6D4A (warm oak), #C4A882 (sand), #E8D5B0 (parchment),
              #D4A847 (muted gold), #6B3A2A (ochre/burnt)
   - Display: "Cormorant Garamond" — poetic, editorial, cinematic
   - Body: "Jost" — clean, minimal, contemporary
   - Signature: The large "crack" divider — a hairline golden
     fracture between sections, referencing the brokenness motif
============================================================ */

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&family=Jost:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --void: #0D0B09;
    --deep: #1A1410;
    --bark: #2C1F14;
    --oak: #8B6D4A;
    --sand: #C4A882;
    --parchment: #E8D5B0;
    --gold: #D4A847;
    --ochre: #6B3A2A;
    --font-display: 'Cormorant Garamond', Georgia, serif;
    --font-body: 'Jost', system-ui, sans-serif;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--void);
    color: var(--parchment);
    font-family: var(--font-body);
    font-weight: 300;
    line-height: 1.7;
    overflow-x: hidden;
  }

  /* ---- SCROLLBAR ---- */
  ::-webkit-scrollbar { width: 3px; }
  ::-webkit-scrollbar-track { background: var(--void); }
  ::-webkit-scrollbar-thumb { background: var(--gold); }

  /* ---- NAV ---- */
  .nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 3rem;
    background: linear-gradient(to bottom, rgba(13,11,9,0.97) 0%, transparent 100%);
    transition: background 0.4s;
  }
  .nav.scrolled {
    background: rgba(13,11,9,0.97);
    border-bottom: 1px solid rgba(212,168,71,0.15);
  }
  .nav-logo {
    font-family: var(--font-display);
    font-size: 1.1rem;
    font-weight: 500;
    letter-spacing: 0.25em;
    color: var(--parchment);
    text-decoration: none;
    text-transform: uppercase;
  }
  .nav-links {
    display: flex;
    gap: 2.5rem;
    list-style: none;
  }
  .nav-links a {
    font-size: 0.72rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--sand);
    text-decoration: none;
    transition: color 0.3s;
    font-weight: 400;
  }
  .nav-links a:hover { color: var(--gold); }

  .nav-menu-toggle {
    display: none;
    background: none;
    border: none;
    cursor: pointer;
    flex-direction: column;
    gap: 5px;
  }
  .nav-menu-toggle span {
    display: block;
    width: 24px;
    height: 1px;
    background: var(--parchment);
    transition: 0.3s;
  }

  /* ---- CRACK DIVIDER (signature motif) ---- */
  .crack {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem 0;
  }
  .crack-line {
    width: 1px;
    height: 80px;
    background: linear-gradient(to bottom, transparent, var(--gold), transparent);
    opacity: 0.5;
  }

  /* ---- PLACEHOLDER VISUALS ---- */
  .img-placeholder {
    background: var(--bark);
    position: relative;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .img-placeholder::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(107,58,42,0.3) 0%, rgba(44,31,20,0.6) 100%);
  }
  .img-placeholder-label {
    position: relative;
    z-index: 1;
    font-family: var(--font-display);
    font-style: italic;
    color: var(--sand);
    font-size: 0.85rem;
    letter-spacing: 0.1em;
    padding: 1.5rem;
    line-height: 1.5;
    opacity: 0.8;
  }
  .img-placeholder::after {
    content: '';
    position: absolute;
    inset: 0;
    border: 1px solid rgba(212,168,71,0.1);
    pointer-events: none;
  }

  /* ---- SECTION SCAFFOLDING ---- */
  section { position: relative; }
  .section-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2.5rem;
  }

  /* ---- TYPE SCALE ---- */
  .eyebrow {
    font-family: var(--font-body);
    font-size: 0.65rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 400;
    margin-bottom: 1.25rem;
  }
  .heading-display {
    font-family: var(--font-display);
    font-weight: 300;
    line-height: 1.1;
    color: var(--parchment);
  }
  .heading-xl { font-size: clamp(3.5rem, 8vw, 8rem); }
  .heading-lg { font-size: clamp(2.8rem, 6vw, 5.5rem); }
  .heading-md { font-size: clamp(2rem, 4vw, 3.5rem); }
  .heading-sm { font-size: clamp(1.6rem, 3vw, 2.5rem); }
  .heading-xs { font-size: clamp(1.25rem, 2vw, 1.8rem); }

  .body-lead {
    font-size: clamp(1.05rem, 1.5vw, 1.25rem);
    color: var(--sand);
    line-height: 1.85;
    font-weight: 300;
  }
  .body-text {
    font-size: clamp(0.9rem, 1.2vw, 1.05rem);
    color: var(--sand);
    line-height: 1.85;
    font-weight: 300;
  }

  /* ---- BUTTONS ---- */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    font-family: var(--font-body);
    font-size: 0.72rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    font-weight: 400;
    text-decoration: none;
    cursor: pointer;
    transition: all 0.35s;
    border: none;
    background: none;
  }
  .btn-primary {
    background: var(--gold);
    color: var(--void);
    padding: 1rem 2.5rem;
  }
  .btn-primary:hover {
    background: var(--parchment);
    transform: translateY(-2px);
  }
  .btn-ghost {
    border: 1px solid rgba(212,168,71,0.5);
    color: var(--gold);
    padding: 0.9rem 2.5rem;
  }
  .btn-ghost:hover {
    border-color: var(--gold);
    background: rgba(212,168,71,0.08);
    transform: translateY(-2px);
  }
  .btn-text {
    color: var(--gold);
    padding: 0;
    border-bottom: 1px solid transparent;
    transition: border-color 0.3s;
    font-size: 0.7rem;
    letter-spacing: 0.2em;
  }
  .btn-text:hover { border-color: var(--gold); }
  .btn-arrow::after { content: ' →'; }

  /* ======== HERO ======== */
  #hero {
    min-height: 100vh;
    display: grid;
    grid-template-columns: 1fr 1fr;
    position: relative;
    overflow: hidden;
  }
  .hero-left {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 8rem 3rem 4rem 3rem;
    position: relative;
    z-index: 2;
  }
  .hero-right {
    position: relative;
    overflow: hidden;
  }
  .hero-right .img-placeholder {
    height: 100%;
    min-height: 600px;
  }
  .hero-right::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(to right, var(--void) 0%, transparent 40%);
    z-index: 1;
    pointer-events: none;
  }
  .hero-name {
    font-family: var(--font-display);
    font-size: clamp(1.2rem, 2vw, 1.6rem);
    letter-spacing: 0.4em;
    text-transform: uppercase;
    font-weight: 300;
    color: var(--gold);
    margin-bottom: 0.5rem;
  }
  .hero-title-large {
    font-family: var(--font-display);
    font-size: clamp(4rem, 9vw, 10rem);
    line-height: 0.95;
    font-weight: 300;
    color: var(--parchment);
    margin-bottom: 1rem;
    letter-spacing: -0.01em;
  }
  .hero-title-large em {
    font-style: italic;
    color: var(--sand);
  }
  .hero-role {
    font-family: var(--font-body);
    font-size: 0.7rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--oak);
    margin-bottom: 2.5rem;
    font-weight: 400;
  }
  .hero-headline {
    font-family: var(--font-display);
    font-size: clamp(1.15rem, 2vw, 1.5rem);
    font-weight: 400;
    font-style: italic;
    color: var(--sand);
    line-height: 1.65;
    max-width: 520px;
    margin-bottom: 1.5rem;
  }
  .hero-subline {
    font-size: 0.9rem;
    color: var(--oak);
    max-width: 480px;
    margin-bottom: 3rem;
    line-height: 1.8;
  }
  .hero-buttons { display: flex; gap: 1.25rem; flex-wrap: wrap; }
  .hero-scroll-indicator {
    position: absolute;
    bottom: 2.5rem;
    left: 3rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    opacity: 0.4;
  }
  .hero-scroll-line {
    width: 40px;
    height: 1px;
    background: var(--gold);
  }
  .hero-scroll-text {
    font-size: 0.6rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--sand);
  }

  /* ======== ABOUT ======== */
  #about {
    background: linear-gradient(to bottom, var(--void) 0%, var(--bark) 30%, var(--bark) 70%, var(--void) 100%);
    padding: 8rem 0;
  }
  .about-grid {
    display: grid;
    grid-template-columns: 1fr 1.6fr;
    gap: 6rem;
    align-items: center;
  }
  .about-img .img-placeholder {
    height: 600px;
    border-radius: 1px;
  }
  .about-text-block { position: relative; }
  .about-pull-quote {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    font-style: italic;
    font-weight: 300;
    color: var(--parchment);
    line-height: 1.4;
    border-left: 2px solid var(--gold);
    padding-left: 2rem;
    margin-bottom: 2.5rem;
  }

  /* ======== FEATURED STORY WORLDS ======== */
  #featured-worlds {
    padding: 7rem 0;
    background: var(--void);
  }
  .world-card {
    position: relative;
    overflow: hidden;
    cursor: pointer;
    transition: transform 0.5s;
  }
  .world-card:hover { transform: scale(1.01); }
  .world-card .img-placeholder { height: 70vh; min-height: 500px; }
  .world-card-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(to top, rgba(13,11,9,0.92) 0%, rgba(13,11,9,0.4) 50%, transparent 100%);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    padding: 3.5rem;
    z-index: 2;
  }
  .world-card-label {
    font-size: 0.6rem;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1rem;
    font-weight: 400;
  }
  .world-card-title {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 5vw, 5rem);
    font-weight: 300;
    color: var(--parchment);
    line-height: 1.05;
    margin-bottom: 1rem;
    letter-spacing: 0.02em;
  }
  .world-card-desc {
    color: var(--sand);
    font-size: 0.95rem;
    max-width: 480px;
    margin-bottom: 2rem;
    line-height: 1.7;
  }
  .world-divider {
    width: 60px;
    height: 1px;
    background: var(--gold);
    margin: 1.5rem 0 2rem;
    opacity: 0.6;
  }

  /* ======== BEFORE WE WERE BROKEN ======== */
  #bwwb {
    padding: 8rem 0;
    background: linear-gradient(to bottom, var(--void), #0F0A07, var(--void));
    position: relative;
    overflow: hidden;
  }
  #bwwb::before {
    content: 'BEFORE';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: var(--font-display);
    font-size: clamp(8rem, 20vw, 22rem);
    font-weight: 300;
    color: rgba(107,58,42,0.08);
    white-space: nowrap;
    pointer-events: none;
    letter-spacing: -0.02em;
    line-height: 1;
  }
  .bwwb-inner {
    position: relative;
    z-index: 2;
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 6rem;
    align-items: center;
  }
  .bwwb-text .heading-display { margin-bottom: 0.5rem; }
  .bwwb-subtitle {
    font-family: var(--font-display);
    font-style: italic;
    font-size: clamp(1rem, 1.8vw, 1.35rem);
    color: var(--oak);
    margin-bottom: 2.5rem;
    font-weight: 300;
  }
  .bwwb-img .img-placeholder { height: 550px; }
  .gold-rule {
    width: 80px;
    height: 1px;
    background: var(--gold);
    margin: 2rem 0;
    opacity: 0.6;
  }

  /* ======== STORY BRANCHES ======== */
  #story-branches {
    padding: 6rem 0;
    background: var(--void);
  }
  .branches-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 2px;
    margin-top: 4rem;
  }
  .branch-card {
    background: var(--deep);
    padding: 3rem 2.5rem;
    position: relative;
    border: 1px solid rgba(212,168,71,0.08);
    transition: border-color 0.4s;
    overflow: hidden;
  }
  .branch-card:hover { border-color: rgba(212,168,71,0.25); }
  .branch-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 2px;
    height: 0;
    background: var(--gold);
    transition: height 0.5s;
  }
  .branch-card:hover::before { height: 100%; }
  .branch-status {
    display: inline-block;
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    padding: 0.3rem 0.8rem;
    margin-bottom: 1.5rem;
    font-weight: 400;
  }
  .status-active {
    background: rgba(212,168,71,0.15);
    color: var(--gold);
    border: 1px solid rgba(212,168,71,0.3);
  }
  .status-dev {
    background: rgba(107,58,42,0.2);
    color: var(--oak);
    border: 1px solid rgba(107,58,42,0.3);
  }
  .branch-title {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 2.5vw, 2rem);
    font-weight: 300;
    color: var(--parchment);
    margin-bottom: 1rem;
    line-height: 1.2;
  }
  .branch-img .img-placeholder {
    height: 200px;
    margin: 1.5rem 0;
  }

  /* ======== MONOLOGUE ======== */
  #monologue {
    padding: 8rem 0;
    background: linear-gradient(to bottom, var(--void), var(--deep), var(--void));
  }
  .monologue-hero-img .img-placeholder { height: 60vh; min-height: 400px; }
  .monologue-content {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    margin-top: 5rem;
    align-items: start;
  }
  .mono-quote {
    font-family: var(--font-display);
    font-size: clamp(1.5rem, 3vw, 2.5rem);
    font-style: italic;
    font-weight: 300;
    color: var(--parchment);
    line-height: 1.45;
    margin: 2.5rem 0;
  }
  .mono-quote::before { content: '"'; color: var(--gold); font-size: 1.5em; line-height: 0; vertical-align: -0.5em; margin-right: 0.1em; }
  .video-placeholder {
    background: var(--bark);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    cursor: pointer;
  }
  .video-placeholder::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(107,58,42,0.4) 0%, rgba(13,11,9,0.7) 100%);
  }
  .video-play-btn {
    position: relative;
    z-index: 2;
    width: 72px; height: 72px;
    border-radius: 50%;
    border: 1px solid var(--gold);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
  }
  .video-play-btn:hover {
    background: rgba(212,168,71,0.15);
    transform: scale(1.08);
  }
  .video-play-triangle {
    width: 0; height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 18px solid var(--gold);
    margin-left: 4px;
  }
  .video-label {
    position: absolute;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--sand);
    z-index: 2;
    font-weight: 400;
    white-space: nowrap;
  }
  .perf-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    margin-top: 2rem;
  }
  .perf-img .img-placeholder { height: 220px; }

  /* ======== EXPERIENCE ======== */
  #experience {
    padding: 7rem 0;
    background: var(--void);
  }
  .experience-layout {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5rem;
    align-items: center;
  }
  .video-placeholder-lg { height: 440px; }

  /* ======== THEMES ======== */
  #themes {
    padding: 6rem 0;
    background: var(--deep);
    border-top: 1px solid rgba(212,168,71,0.1);
    border-bottom: 1px solid rgba(212,168,71,0.1);
  }
  .themes-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 3rem;
  }
  .theme-chip {
    font-family: var(--font-display);
    font-size: clamp(1.1rem, 2vw, 1.5rem);
    font-style: italic;
    font-weight: 300;
    color: var(--parchment);
    border: 1px solid rgba(212,168,71,0.2);
    padding: 0.75rem 2rem;
    transition: all 0.35s;
    cursor: default;
  }
  .theme-chip:hover {
    border-color: var(--gold);
    background: rgba(212,168,71,0.06);
    color: var(--gold);
    transform: translateY(-3px);
  }

  /* ======== WHO / WHAT ======== */
  #audience {
    padding: 7rem 0;
    background: var(--void);
  }
  .audience-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    margin-top: 4rem;
  }
  .audience-col h3 {
    font-family: var(--font-display);
    font-size: clamp(1.4rem, 2.5vw, 2rem);
    font-weight: 300;
    color: var(--parchment);
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(212,168,71,0.2);
  }
  .audience-list { list-style: none; }
  .audience-list li {
    font-size: 0.9rem;
    color: var(--sand);
    padding: 0.6rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .audience-list li::before {
    content: '';
    width: 20px;
    height: 1px;
    background: var(--gold);
    opacity: 0.5;
    flex-shrink: 0;
  }
  .impact-list { list-style: none; }
  .impact-item {
    padding: 1.5rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    display: flex;
    gap: 1.5rem;
    align-items: flex-start;
  }
  .impact-num {
    font-family: var(--font-display);
    font-size: 1.5rem;
    color: var(--gold);
    opacity: 0.4;
    font-weight: 300;
    flex-shrink: 0;
    line-height: 1;
    margin-top: 0.1rem;
  }
  .impact-text { font-size: 0.9rem; color: var(--sand); line-height: 1.7; }

  /* ======== SELECTED PERFORMANCES ======== */
  #performances {
    padding: 6rem 0;
    background: var(--deep);
  }
  .perf-list { margin-top: 3.5rem; }
  .perf-item {
    display: grid;
    grid-template-columns: auto 1fr auto;
    gap: 2.5rem;
    align-items: center;
    padding: 2rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.06);
    transition: opacity 0.3s;
  }
  .perf-item:hover { opacity: 0.85; }
  .perf-count {
    font-family: var(--font-display);
    font-size: 1rem;
    color: var(--gold);
    opacity: 0.4;
    font-weight: 300;
    width: 2rem;
  }
  .perf-info h4 {
    font-family: var(--font-display);
    font-size: clamp(1.1rem, 2vw, 1.5rem);
    font-weight: 400;
    color: var(--parchment);
    margin-bottom: 0.25rem;
  }
  .perf-info span {
    font-size: 0.75rem;
    color: var(--oak);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    font-weight: 400;
  }

  /* ======== TECHNICAL REQUIREMENTS ======== */
  #tech-req {
    padding: 6rem 0;
    background: var(--void);
  }
  .tech-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
    margin-top: 3rem;
  }
  .tech-item {
    padding: 2rem;
    border: 1px solid rgba(212,168,71,0.1);
    background: rgba(44,31,20,0.3);
    display: flex;
    gap: 1.25rem;
    align-items: flex-start;
    transition: border-color 0.3s;
  }
  .tech-item:hover { border-color: rgba(212,168,71,0.25); }
  .tech-icon {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: rgba(212,168,71,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    font-size: 0.8rem;
    color: var(--gold);
  }
  .tech-item p { font-size: 0.9rem; color: var(--sand); line-height: 1.6; }
  .tech-item strong { display: block; color: var(--parchment); font-weight: 400; margin-bottom: 0.3rem; font-size: 0.95rem; }

  /* ======== QUOTE BREAK ======== */
  #quote-break {
    position: relative;
    min-height: 60vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    text-align: center;
  }
  .quote-break-bg .img-placeholder {
    position: absolute;
    inset: 0;
    height: 100%;
    filter: brightness(0.25) grayscale(0.6);
  }
  .quote-break-overlay {
    position: absolute;
    inset: 0;
    background: rgba(13,11,9,0.6);
  }
  .quote-break-content {
    position: relative;
    z-index: 2;
    padding: 4rem 2rem;
    max-width: 900px;
  }
  .break-quote-text {
    font-family: var(--font-display);
    font-size: clamp(2rem, 5vw, 5rem);
    font-style: italic;
    font-weight: 300;
    color: var(--parchment);
    line-height: 1.3;
    letter-spacing: 0.01em;
  }
  .break-quote-attr {
    margin-top: 2rem;
    font-size: 0.7rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--gold);
    opacity: 0.7;
  }

  /* ======== MAMA AFRICA ======== */
  #mama-africa {
    padding: 8rem 0;
    background: linear-gradient(to bottom, var(--void), #100D0A, var(--void));
  }
  .mama-header {
    display: flex;
    align-items: baseline;
    gap: 2rem;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }
  .in-dev-badge {
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--ochre);
    border: 1px solid var(--ochre);
    padding: 0.3rem 0.75rem;
    font-weight: 400;
    opacity: 0.8;
  }
  .mama-gallery {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 3px;
    margin-top: 3.5rem;
  }
  .mama-gallery-tall { grid-row: span 2; }
  .mama-tile .img-placeholder { height: 240px; }
  .mama-tile.tall .img-placeholder { height: 483px; }
  .mama-themes {
    display: flex;
    flex-wrap: wrap;
    gap: 0.75rem;
    margin-top: 2.5rem;
  }
  .mama-theme-tag {
    font-size: 0.7rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--oak);
    border: 1px solid rgba(139,109,74,0.3);
    padding: 0.35rem 1rem;
    font-weight: 400;
  }
  .coming-soon-bar {
    text-align: center;
    padding: 1.5rem;
    border: 1px solid rgba(212,168,71,0.15);
    margin-top: 0.25rem;
    font-family: var(--font-display);
    font-style: italic;
    color: var(--oak);
    font-size: 0.9rem;
    letter-spacing: 0.1em;
  }

  /* ======== COMMUNITY CONVERSATIONS ======== */
  #conversations {
    padding: 7rem 0;
    background: var(--void);
  }
  .conv-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin-top: 4rem;
  }
  .conv-card {
    border: 1px solid rgba(212,168,71,0.08);
    overflow: hidden;
    transition: border-color 0.4s;
  }
  .conv-card:hover { border-color: rgba(212,168,71,0.2); }
  .conv-video .video-placeholder { height: 200px; }
  .conv-body { padding: 1.5rem; }
  .conv-tag {
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 0.75rem;
    font-weight: 400;
    opacity: 0.7;
  }
  .conv-title {
    font-family: var(--font-display);
    font-size: 1.1rem;
    font-weight: 400;
    color: var(--parchment);
    margin-bottom: 0.5rem;
    line-height: 1.3;
  }
  .conv-status { font-size: 0.72rem; color: var(--ochre); margin-top: 1rem; letter-spacing: 0.1em; }
  .reflection-cards-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5rem;
    margin-top: 2.5rem;
  }
  .ref-q-card {
    background: rgba(44,31,20,0.2);
    border: 1px solid rgba(212,168,71,0.1);
    padding: 2rem;
  }
  .ref-q-card p {
    font-family: var(--font-display);
    font-style: italic;
    font-size: 1.05rem;
    color: var(--sand);
    line-height: 1.6;
  }
  .ref-q-card::before {
    content: 'Reflection';
    display: block;
    font-size: 0.6rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    opacity: 0.6;
    margin-bottom: 0.75rem;
    font-family: var(--font-body);
    font-style: normal;
    font-weight: 400;
  }

  /* ======== REFLECTIONS ======== */
  #reflections {
    padding: 7rem 0;
    background: var(--deep);
  }
  .reflections-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1.5px;
    margin-top: 4rem;
  }
  .reflection-card {
    background: var(--void);
    padding: 3rem 2.5rem;
    border: 1px solid rgba(212,168,71,0.05);
    transition: all 0.4s;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .reflection-card::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0;
    width: 0;
    height: 1px;
    background: var(--gold);
    transition: width 0.5s;
  }
  .reflection-card:hover::after { width: 100%; }
  .reflection-card:hover { background: rgba(26,20,16,0.8); }
  .refl-num {
    font-family: var(--font-display);
    font-size: 4rem;
    color: rgba(212,168,71,0.08);
    font-weight: 300;
    line-height: 1;
    margin-bottom: 1.5rem;
    display: block;
  }
  .refl-category {
    font-size: 0.6rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--gold);
    opacity: 0.6;
    margin-bottom: 1rem;
    font-weight: 400;
  }
  .refl-title {
    font-family: var(--font-display);
    font-size: clamp(1.1rem, 1.8vw, 1.5rem);
    font-weight: 400;
    color: var(--parchment);
    line-height: 1.35;
    margin-bottom: 1.25rem;
  }
  .refl-preview { font-size: 0.85rem; color: var(--oak); line-height: 1.7; }
  .refl-read {
    margin-top: 2rem;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--gold);
    opacity: 0.6;
    transition: opacity 0.3s;
    font-weight: 400;
  }
  .reflection-card:hover .refl-read { opacity: 1; }

  /* ======== QUESTIONS WORTH CARRYING ======== */
  #questions {
    padding: 9rem 0;
    background: var(--void);
    overflow: hidden;
  }
  .questions-intro {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
    margin-bottom: 5rem;
  }
  .questions-list { max-width: 760px; margin: 0 auto; }
  .question-item {
    padding: 2.5rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    opacity: 0.6;
    transition: opacity 0.4s;
    cursor: default;
  }
  .question-item:hover { opacity: 1; }
  .question-text {
    font-family: var(--font-display);
    font-size: clamp(1.3rem, 2.5vw, 2rem);
    font-style: italic;
    font-weight: 300;
    color: var(--parchment);
    line-height: 1.45;
  }

  /* ======== BOOKING ======== */
  #booking {
    padding: 8rem 0;
    background: linear-gradient(to bottom, var(--void), var(--bark) 50%, var(--void));
  }
  .booking-grid {
    display: grid;
    grid-template-columns: 1fr 1.2fr;
    gap: 6rem;
    align-items: start;
  }
  .booking-avail { margin-top: 3rem; }
  .booking-avail h4 {
    font-size: 0.65rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1.25rem;
    font-weight: 400;
  }
  .avail-list {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
  }
  .avail-tag {
    font-size: 0.72rem;
    color: var(--sand);
    border: 1px solid rgba(196,168,130,0.2);
    padding: 0.4rem 1rem;
    font-weight: 300;
    letter-spacing: 0.05em;
    transition: border-color 0.3s;
  }
  .avail-tag:hover { border-color: rgba(196,168,130,0.5); }
  .booking-contact { margin-top: 3rem; }
  .contact-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    font-size: 0.9rem;
    color: var(--sand);
  }
  .contact-icon { color: var(--gold); font-size: 0.8rem; opacity: 0.7; width: 20px; }
  .contact-item a { color: var(--sand); text-decoration: none; transition: color 0.3s; }
  .contact-item a:hover { color: var(--gold); }

  /* Booking form */
  .booking-form { display: flex; flex-direction: column; gap: 1.25rem; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.25rem; }
  .form-field { display: flex; flex-direction: column; gap: 0.5rem; }
  .form-label {
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--oak);
    font-weight: 400;
  }
  .form-input, .form-select, .form-textarea {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.08);
    color: var(--parchment);
    padding: 0.9rem 1rem;
    font-family: var(--font-body);
    font-size: 0.9rem;
    font-weight: 300;
    outline: none;
    transition: border-color 0.3s;
    -webkit-appearance: none;
  }
  .form-input::placeholder, .form-textarea::placeholder { color: rgba(196,168,130,0.3); }
  .form-input:focus, .form-select:focus, .form-textarea:focus {
    border-color: rgba(212,168,71,0.4);
    background: rgba(255,255,255,0.04);
  }
  .form-textarea { resize: vertical; min-height: 130px; }
  .form-select option { background: var(--deep); color: var(--parchment); }

  /* ======== FOOTER ======== */
  footer {
    background: #0A0806;
    padding: 5rem 0 3rem;
    border-top: 1px solid rgba(212,168,71,0.1);
  }
  .footer-inner {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 2.5rem;
  }
  .footer-top {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 4rem;
    padding-bottom: 4rem;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .footer-brand-name {
    font-family: var(--font-display);
    font-size: 1.5rem;
    font-weight: 300;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--parchment);
    margin-bottom: 0.5rem;
  }
  .footer-brand-role {
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--oak);
    margin-bottom: 1.25rem;
    font-weight: 400;
  }
  .footer-tagline { font-size: 0.9rem; color: var(--oak); line-height: 1.7; }
  .footer-nav-title {
    font-size: 0.65rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1.5rem;
    font-weight: 400;
  }
  .footer-nav-list { list-style: none; display: flex; flex-direction: column; gap: 0.75rem; }
  .footer-nav-list a {
    font-size: 0.85rem;
    color: var(--sand);
    text-decoration: none;
    opacity: 0.7;
    transition: opacity 0.3s;
    letter-spacing: 0.05em;
    font-weight: 300;
  }
  .footer-nav-list a:hover { opacity: 1; }
  .social-links { display: flex; flex-direction: column; gap: 0.75rem; }
  .social-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.85rem;
    color: var(--sand);
    text-decoration: none;
    opacity: 0.7;
    transition: opacity 0.3s;
    font-weight: 300;
  }
  .social-link:hover { opacity: 1; }
  .social-link-icon {
    width: 28px;
    height: 28px;
    border: 1px solid rgba(212,168,71,0.2);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.7rem;
    color: var(--gold);
    flex-shrink: 0;
  }
  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 2.5rem;
    flex-wrap: wrap;
    gap: 1rem;
  }
  .footer-copy { font-size: 0.7rem; color: var(--oak); opacity: 0.6; letter-spacing: 0.05em; }

  /* ======== FADE-IN ANIMATION ======== */
  .fade-up {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.8s ease, transform 0.8s ease;
  }
  .fade-up.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ======== MOBILE ======== */
  @media (max-width: 900px) {
    .nav-links { display: none; }
    .nav-menu-toggle { display: flex; }
    #hero { grid-template-columns: 1fr; }
    .hero-right { display: none; }
    .hero-left { padding: 7rem 1.5rem 4rem; }
    .about-grid,
    .bwwb-inner,
    .monologue-content,
    .experience-layout,
    .audience-grid,
    .booking-grid,
    .footer-top { grid-template-columns: 1fr; gap: 3rem; }
    .branches-grid,
    .conv-grid { grid-template-columns: 1fr; }
    .reflections-grid { grid-template-columns: 1fr; }
    .mama-gallery { grid-template-columns: repeat(2, 1fr); }
    .mama-gallery-tall { grid-row: span 1; }
    .mama-tile.tall .img-placeholder { height: 240px; }
    .perf-grid { grid-template-columns: 1fr; }
    .form-row { grid-template-columns: 1fr; }
    .section-inner { padding: 0 1.5rem; }
    .tech-grid { grid-template-columns: 1fr; }
    .reflection-cards-row { grid-template-columns: 1fr; }
    .perf-item { grid-template-columns: auto 1fr; }
    .perf-item .btn-text { display: none; }
  }

  @media (max-width: 600px) {
    .nav { padding: 1.25rem 1.5rem; }
    .hero-title-large { font-size: 3.5rem; }
    .questions-list { padding: 0; }
    .mama-gallery { grid-template-columns: 1fr; }
    .break-quote-text { font-size: 1.8rem; }
  }
`;

// ---- HELPER: Image Placeholder ----
const ImgPlaceholder = ({ label, style = {}, className = "" }) => (
  <div className={`img-placeholder ${className}`} style={style}>
    <span className="img-placeholder-label">{label}</span>
  </div>
);

// ---- HELPER: Video Placeholder ----
const VideoPlaceholder = ({ label, className = "", style = {} }) => (
  <div className={`video-placeholder ${className}`} style={style}>
    <div className="video-play-btn">
      <div className="video-play-triangle" />
    </div>
    <span className="video-label">{label}</span>
  </div>
);

// ---- HELPER: Crack Divider ----
const Crack = () => (
  <div className="crack">
    <div className="crack-line" />
  </div>
);

// ---- HELPER: Gold Rule ----
const GoldRule = () => <div className="gold-rule" />;

// ---- HOOK: Intersection Observer for fade-ups ----
function useFadeUp() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return ref;
}

// ---- NAV ----
const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const links = [
    ["Home", "#hero"], ["About", "#about"], ["Story Worlds", "#featured-worlds"],
    ["Before We Were Broken", "#bwwb"], ["Reflections", "#reflections"],
    ["Booking", "#booking"], ["Contact", "#booking"]
  ];
  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <a href="#hero" className="nav-logo">Temi Naomi</a>
      <ul className="nav-links">
        {links.map(([label, href]) => (
          <li key={label}><a href={href}>{label}</a></li>
        ))}
      </ul>
      <button className="nav-menu-toggle" aria-label="Menu" onClick={() => setOpen(!open)}>
        <span /><span /><span />
      </button>
      {open && (
        <div style={{
          position: "fixed", inset: 0, background: "rgba(13,11,9,0.97)",
          zIndex: 200, display: "flex", flexDirection: "column",
          alignItems: "center", justifyContent: "center", gap: "2.5rem"
        }}>
          <button onClick={() => setOpen(false)} style={{
            position: "absolute", top: "1.5rem", right: "1.5rem",
            background: "none", border: "none", color: "var(--parchment)",
            fontSize: "1.5rem", cursor: "pointer"
          }}>✕</button>
          {links.map(([label, href]) => (
            <a key={label} href={href} onClick={() => setOpen(false)} style={{
              fontFamily: "var(--font-display)", fontSize: "2rem",
              fontWeight: 300, color: "var(--parchment)", textDecoration: "none",
              letterSpacing: "0.05em"
            }}>{label}</a>
          ))}
        </div>
      )}
    </nav>
  );
};

// ---- HERO ----
const Hero = () => {
  const ref = useFadeUp();
  return (
    <section id="hero">
      <div className="hero-left">
        <div className="fade-up visible" ref={ref}>
          <p className="hero-name">Temi Naomi</p>
          <h1 className="hero-title-large">Story<br /><em>Teller.</em></h1>
          <p className="hero-role">Storyteller &nbsp;|&nbsp; Performance Artist &nbsp;|&nbsp; Creative Explorer</p>
          <p className="hero-headline">
            I create stories that explore identity, culture, memory, belonging, and the human experience through performance, visual storytelling, and conversation.
          </p>
          <p className="hero-subline">
            Through story, reflection, and cultural exploration, my work examines the beliefs, values, traditions, and experiences that shape who we become — and invites us to consider what is worth carrying forward.
          </p>
          <div className="hero-buttons">
            <a href="#monologue" className="btn btn-primary">Experience the Work</a>
            <a href="#featured-worlds" className="btn btn-ghost">Explore All Projects</a>
            <a href="#bwwb" className="btn btn-text btn-arrow">Enter Before We Were Broken</a>
          </div>
        </div>
        <div className="hero-scroll-indicator">
          <div className="hero-scroll-line" />
          <span className="hero-scroll-text">Scroll to explore</span>
        </div>
      </div>
      <div className="hero-right">
        <ImgPlaceholder label="[REPLACE: Temi Naomi cinematic portrait — warm amber lighting, expressive gaze, dark background, jewellery detail — from existing hero photo]" />
      </div>
    </section>
  );
};

// ---- ABOUT ----
const About = () => {
  const r1 = useFadeUp(), r2 = useFadeUp();
  return (
    <section id="about">
      <div className="section-inner">
        <div className="about-grid">
          <div className="about-img fade-up" ref={r1}>
            <ImgPlaceholder label="[REPLACE: Temi Naomi reflective editorial portrait — intimate composition, warm shadows — use alternate portrait from existing photo set]" />
          </div>
          <div className="about-text-block fade-up" ref={r2}>
            <p className="eyebrow">Why I Tell Stories</p>
            <blockquote className="about-pull-quote">
              I believe understanding how we became who we are allows us to consciously choose who we want to become.
            </blockquote>
            <p className="body-lead" style={{ marginBottom: "1.5rem" }}>
              Through storytelling, performance, visual art, and conversation, my work explores the cultures, histories, memories, beliefs, and experiences that shape identity.
            </p>
            <GoldRule />
            <p className="body-text" style={{ marginBottom: "1.25rem" }}>
              I am interested in the stories we inherit — from family, community, faith, culture, and lived experience — and the ways those stories influence how we see ourselves and the world around us.
            </p>
            <p className="body-text" style={{ marginBottom: "1.25rem" }}>
              My work does not ask people to reject what they have inherited, nor does it assume every inherited belief should remain unchanged. Instead, it invites reflection, curiosity, and conversation.
            </p>
            <p className="body-text" style={{ fontStyle: "italic", color: "var(--parchment)" }}>
              Because before we decide what to carry forward, we must first understand what shaped us.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---- FEATURED STORY WORLDS ----
const FeaturedWorlds = () => {
  const r = useFadeUp();
  return (
    <section id="featured-worlds">
      <div className="section-inner" style={{ marginBottom: "3rem" }}>
        <div className="fade-up" ref={r}>
          <p className="eyebrow">Featured Story Worlds</p>
          <h2 className="heading-display heading-lg">
            Worlds built<br /><em>to be entered.</em>
          </h2>
        </div>
      </div>
      <div className="world-card">
        <ImgPlaceholder
          label="[REPLACE: Full-width cinematic performance image — use stage performance photo with two performers in white, warm blue-amber lighting from Afro Fusion / existing performance set]"
          style={{ height: "70vh", minHeight: "500px" }}
        />
        <div className="world-card-overlay">
          <p className="world-card-label">Story World — Active</p>
          <h3 className="world-card-title">Before We Were<br />Broken</h3>
          <div className="world-divider" />
          <p className="world-card-desc">
            A storytelling project exploring identity, memory, belonging, culture, and the stories we inherit.
          </p>
          <a href="#bwwb" className="btn btn-ghost">Enter The World</a>
        </div>
      </div>
    </section>
  );
};

// ---- BEFORE WE WERE BROKEN ----
const BWWB = () => {
  const r1 = useFadeUp(), r2 = useFadeUp();
  return (
    <section id="bwwb">
      <div className="section-inner">
        <div className="bwwb-inner">
          <div className="bwwb-text fade-up" ref={r1}>
            <p className="eyebrow">Story World</p>
            <h2 className="heading-display heading-lg">Before We<br />Were Broken</h2>
            <p className="bwwb-subtitle">
              A story world exploring identity, memory, belonging, culture, and the stories we inherit.
            </p>
            <GoldRule />
            <p className="body-text" style={{ marginBottom: "1.25rem" }}>
              Before We Were Broken is a storytelling project exploring identity, memory, belonging, culture, and the stories we inherit.
            </p>
            <p className="body-text" style={{ marginBottom: "1.25rem" }}>
              Through performance, visual storytelling, conversation, film, visual art, and creative expression, the project examines how family, culture, faith, history, and lived experiences shape who we become.
            </p>
            <p className="body-text" style={{ marginBottom: "1.25rem" }}>
              The project also asks what parts of us existed before shame, expectation, division, or inherited narratives.
            </p>
            <GoldRule />
            <p className="body-text" style={{ fontStyle: "italic", color: "var(--parchment)", marginBottom: "2rem" }}>
              Rooted in the belief that understanding how we became who we are allows us to consciously choose who we want to become, the project invites audiences to reflect on the values, beliefs, traditions, and narratives they have inherited and consider what is worth carrying forward.
            </p>
            <a href="#story-branches" className="btn btn-ghost btn-arrow">Explore The Story Branches</a>
          </div>
          <div className="bwwb-img fade-up" ref={r2}>
            <ImgPlaceholder
              label="[REPLACE: Temi Naomi hero portrait from BWWB Canva page — warm amber glow, facing camera, jewellery, dark cinematic background]"
              style={{ height: "550px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

// ---- STORY BRANCHES ----
const StoryBranches = () => {
  const r = useFadeUp();
  const branches = [
    {
      status: "Active", statusClass: "status-active", title: "The Monologue",
      desc: "A live spoken word performance exploring remembrance, identity, and the journey of becoming. Combining spoken word, movement, and live percussion.",
      href: "#monologue", cta: "Enter The Monologue →",
      img: "Performance stage image placeholder — intimate theatrical lighting"
    },
    {
      status: "In Development", statusClass: "status-dev", title: "Mama Africa",
      desc: "A visual storytelling series exploring origin, ancestry, cultural remembrance, and the journey of understanding how we became who we are.",
      href: "#mama-africa", cta: "Explore Coming Work →",
      img: "Visual storytelling gallery placeholder — ancestral warmth, cultural imagery"
    },
    {
      status: "In Development", statusClass: "status-dev", title: "Community Conversations",
      desc: "A storytelling series exploring how culture, faith, family, language, tradition, and lived experience shape identity — through real conversations.",
      href: "#conversations", cta: "Preview The Series →",
      img: "Community conversation video placeholder — intimate interview setting"
    }
  ];
  return (
    <section id="story-branches">
      <div className="section-inner">
        <div className="fade-up" ref={r}>
          <p className="eyebrow">Within Before We Were Broken</p>
          <h2 className="heading-display heading-md">
            The story world unfolds<br /><em>through many doors.</em>
          </h2>
          <p className="body-text" style={{ marginTop: "1rem", maxWidth: "580px" }}>
            The story world unfolds through performance, visual storytelling, conversation, and reflection.
          </p>
        </div>
        <div className="branches-grid">
          {branches.map((b) => {
            const rr = useFadeUp();
            return (
              <div key={b.title} className="branch-card fade-up" ref={rr}>
                <span className={`branch-status ${b.statusClass}`}>{b.status}</span>
                <h3 className="branch-title">{b.title}</h3>
                <div className="branch-img">
                  <ImgPlaceholder label={b.img} />
                </div>
                <p className="body-text" style={{ fontSize: "0.88rem", marginBottom: "1.5rem" }}>{b.desc}</p>
                <a href={b.href} className="btn btn-text">{b.cta}</a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ---- MONOLOGUE ----
const Monologue = () => {
  const r1 = useFadeUp(), r2 = useFadeUp(), r3 = useFadeUp();
  return (
    <section id="monologue">
      <div className="section-inner">
        <div className="fade-up" ref={r1}>
          <p className="eyebrow">The Monologue</p>
          <h2 className="heading-display heading-lg">Before We Were Broken:<br /><em>The Monologue</em></h2>
          <p className="bwwb-subtitle" style={{ marginTop: "0.5rem" }}>A spoken word performance on identity, memory, and becoming.</p>
        </div>
        <div className="monologue-hero-img fade-up" ref={r2} style={{ marginTop: "3rem" }}>
          <ImgPlaceholder
            label="[REPLACE: Stage performance photo — two performers on stage, white costumes, dramatic warm-blue lighting — from Celebrating Black Brilliance / Olundara Foundation performance set]"
            style={{ height: "60vh", minHeight: "400px" }}
          />
        </div>
        <div className="monologue-content fade-up" ref={r3}>
          <div>
            <GoldRule />
            <p className="body-lead" style={{ marginBottom: "1.5rem" }}>
              A live spoken word performance exploring remembrance, identity, and the journey of becoming.
            </p>
            <p className="body-text" style={{ marginBottom: "1.25rem" }}>
              Rooted in Black stories yet resonant across cultures, the work reflects on what happens when people become disconnected from themselves, their history, their culture, or their humanity.
            </p>
            <p className="body-text" style={{ marginBottom: "1.25rem" }}>
              Through spoken word, movement, embodiment, and live percussion, the performance invites audiences to consider the forces that shape us — family, culture, faith, history, expectations, and lived experiences.
            </p>
            <blockquote className="mono-quote">
              What parts of ourselves, our values, and our stories are worth carrying forward?
            </blockquote>
            <p className="body-text" style={{ marginBottom: "2rem" }}>
              Before We Were Broken is a 10–15 minute live spoken word performance exploring identity, memory, and belonging beyond inherited narratives. Through a journey of remembrance and reflection, the piece invites audiences to reconnect with the parts of themselves that existed before expectation, distortion, and division.
            </p>
            <a href="#booking" className="btn btn-primary">Book This Performance</a>
          </div>
          <div>
            <VideoPlaceholder
              label="Performance clip placeholder"
              style={{ height: "300px", marginBottom: "1.5rem" }}
            />
            <div className="perf-grid">
              <div className="perf-img">
                <ImgPlaceholder label="[REPLACE: Live percussion performer image — from Afro Fusion Fashion Show, Uplift Black event]" style={{ height: "220px" }} />
              </div>
              <div className="perf-img">
                <ImgPlaceholder label="[REPLACE: Temi on stage — movement/spoken word moment — from Black History Month Showcase, Olundara Foundation]" style={{ height: "220px" }} />
              </div>
              <div className="perf-img">
                <ImgPlaceholder label="[REPLACE: Duo stage performance — two performers, warm blue lighting — from Celebrating Black Brilliance, Nigerians in Barrie]" style={{ height: "220px" }} />
              </div>
              <div className="perf-img">
                <ImgPlaceholder label="[REPLACE: Post-show or candid connection moment — audience or performer engagement photo]" style={{ height: "220px" }} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---- EXPERIENCE ----
const Experience = () => {
  const r1 = useFadeUp(), r2 = useFadeUp();
  return (
    <section id="experience" style={{ background: "var(--deep)", padding: "7rem 0" }}>
      <div className="section-inner">
        <div className="experience-layout">
          <div className="fade-up" ref={r1}>
            <VideoPlaceholder
              label="[REPLACE: Embed performance video or testimonial clip — referenced as 'click to view video | Testimonial' on existing Canva page. Link to YouTube video when available.]"
              className="video-placeholder-lg"
              style={{ height: "440px" }}
            />
          </div>
          <div className="fade-up" ref={r2}>
            <p className="eyebrow">The Experience</p>
            <h2 className="heading-display heading-md">An immersive<br /><em>reflective journey.</em></h2>
            <GoldRule />
            <p className="body-text" style={{ marginBottom: "1.25rem" }}>
              Audiences are taken through a reflective and emotionally immersive experience that blends spoken word, movement, live percussion, and visual storytelling.
            </p>
            <p className="body-text" style={{ marginBottom: "1.25rem" }}>
              As the performance unfolds, viewers move through moments of remembrance, disruption, resilience, and reconnection, creating space to pause, reflect, and engage with the stories being shared.
            </p>
            <p className="body-text" style={{ marginBottom: "2.5rem" }}>
              The experience encourages audiences to consider identity, cultural memory, and human connection while recognizing themselves within the narratives unfolding on stage.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="#booking" className="btn btn-ghost">View Video</a>
              <a href="#booking" className="btn btn-text btn-arrow">Read Testimonials</a>
            </div>
            <div style={{
              marginTop: "2.5rem",
              padding: "2rem",
              borderLeft: "2px solid rgba(212,168,71,0.3)",
              background: "rgba(44,31,20,0.2)"
            }}>
              <p style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "1.05rem",
                color: "var(--sand)",
                lineHeight: 1.65,
                marginBottom: "0.75rem"
              }}>
                "The performance stayed with me long after it ended. It asked questions I hadn't thought to ask myself."
              </p>
              <p style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", opacity: 0.6, fontWeight: 400 }}>
                [Audience Testimonial Placeholder — Replace with real quote]
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---- THEMES EXPLORED ----
const ThemesExplored = () => {
  const r = useFadeUp();
  const themes = ["Identity", "Cultural Remembrance", "Belonging", "Self-Worth", "Memory", "Community", "Human Connection"];
  return (
    <section id="themes">
      <div className="section-inner">
        <div className="fade-up" ref={r}>
          <p className="eyebrow">Themes Explored</p>
          <h2 className="heading-display heading-md">At the heart<br /><em>of the work.</em></h2>
          <div className="themes-grid">
            {themes.map(t => (
              <div key={t} className="theme-chip">{t}</div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ---- AUDIENCE ----
const AudienceSections = () => {
  const r1 = useFadeUp(), r2 = useFadeUp();
  const audiences = [
    "Universities & Colleges", "Black History Month Programming", "Cultural Festivals",
    "Community Organizations", "Libraries & Museums", "Youth Programs",
    "Arts & Heritage Events", "Schools & Universities", "Cultural Organizations",
    "Cultural Events", "Speaking Engagements", "Performance Opportunities",
    "Creative Collaborations"
  ];
  const impacts = [
    "A deeper connection to identity and belonging",
    "Greater appreciation for Black stories, history, and cultural memory",
    "Reflection on the narratives that shape how we see ourselves",
    "A renewed sense of dignity, humanity, and self-worth",
    "Meaningful connection across cultures and lived experiences"
  ];
  return (
    <section id="audience">
      <div className="section-inner">
        <p className="eyebrow">The Reach of the Work</p>
        <div className="audience-grid">
          <div className="fade-up" ref={r1}>
            <h3>Who This Is For</h3>
            <ul className="audience-list">
              {audiences.map(a => <li key={a}>{a}</li>)}
            </ul>
          </div>
          <div className="fade-up" ref={r2}>
            <h3>What They Leave With</h3>
            <ul className="impact-list">
              {impacts.map((imp, i) => (
                <li key={i} className="impact-item">
                  <span className="impact-num">0{i + 1}</span>
                  <p className="impact-text">{imp}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---- SELECTED PERFORMANCES ----
const SelectedPerformances = () => {
  const r = useFadeUp();
  const perfs = [
    { name: "Black History Month Showcase", org: "Olundara Foundation" },
    { name: "Celebrating Black Brilliance", org: "Experience Nigerians in Barrie" },
    { name: "Afro Fusion Fashion Show", org: "Uplift Black" }
  ];
  return (
    <section id="performances">
      <div className="section-inner">
        <div className="fade-up" ref={r}>
          <p className="eyebrow">Selected Performances</p>
          <h2 className="heading-display heading-md">On stages<br /><em>that matter.</em></h2>
          <div className="perf-list">
            {perfs.map((p, i) => (
              <div key={p.name} className="perf-item">
                <span className="perf-count">0{i + 1}</span>
                <div className="perf-info">
                  <h4>{p.name}</h4>
                  <span>{p.org}</span>
                </div>
                <a href="#booking" className="btn btn-text">Inquire →</a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ---- TECHNICAL REQUIREMENTS ----
const TechnicalRequirements = () => {
  const r = useFadeUp();
  const reqs = [
    { icon: "◻", label: "Performance Space", desc: "Stage or open floor — flexible configurations supported for venue and event type." },
    { icon: "◈", label: "Basic Sound System", desc: "Microphone and speaker setup — standard PA system or equivalent audio support." },
    { icon: "▶", label: "Playback Support", desc: "Capability to play back subtle sound elements and ambient audio during the performance." },
    { icon: "◎", label: "Live Percussion Space", desc: "Space for live percussion setup, when the percussionist is included in the booking." }
  ];
  return (
    <section id="tech-req">
      <div className="section-inner">
        <div className="fade-up" ref={r}>
          <p className="eyebrow">Technical Requirements</p>
          <h2 className="heading-display heading-sm">What the performance needs.</h2>
          <div className="tech-grid">
            {reqs.map(req => (
              <div key={req.label} className="tech-item">
                <div className="tech-icon">{req.icon}</div>
                <div>
                  <strong>{req.label}</strong>
                  <p>{req.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ---- QUOTE BREAK ----
const QuoteBreak = () => (
  <section id="quote-break">
    <div className="quote-break-bg">
      <ImgPlaceholder
        label="[REPLACE: Temi Naomi dramatic side-profile B&W portrait — from existing photo set — used as quote section background in Canva page; crop tight, high contrast]"
        style={{ position: "absolute", inset: 0, height: "100%", filter: "brightness(0.2) grayscale(0.5)" }}
      />
    </div>
    <div className="quote-break-overlay" />
    <div className="quote-break-content">
      <p className="break-quote-text">
        "Before the world named us…<br />we were."
      </p>
      <p className="break-quote-attr">— Before We Were Broken</p>
    </div>
  </section>
);

// ---- MAMA AFRICA ----
const MamaAfrica = () => {
  const r1 = useFadeUp(), r2 = useFadeUp();
  const themes = ["Origin", "Ancestry", "Remembrance", "Identity", "Becoming", "Human Connection"];
  const tiles = [
    { label: "Ancestral portrait placeholder — symbolic, warm, cinematic", tall: true },
    { label: "Cultural texture image placeholder — fabric, earth, pattern", tall: false },
    { label: "Hands and roots image placeholder — identity and belonging", tall: false },
    { label: "Journey image placeholder — landscape, movement, memory", tall: false },
    { label: "Community gathering image placeholder — warmth and connection", tall: false },
    { label: "Reflection image placeholder — water, mirror, shadow, light", tall: false },
    { label: "Cultural artifact image placeholder — symbolic objects and memory", tall: false },
  ];
  return (
    <section id="mama-africa">
      <div className="section-inner">
        <div className="fade-up" ref={r1}>
          <div className="mama-header">
            <p className="eyebrow" style={{ margin: 0 }}>Story Branch</p>
            <span className="in-dev-badge">In Development</span>
          </div>
          <h2 className="heading-display heading-lg">Mama Africa</h2>
          <GoldRule />
          <p className="body-lead" style={{ maxWidth: "680px", marginBottom: "1.5rem" }}>
            A visual storytelling series exploring origin, ancestry, cultural remembrance, and the journey of understanding how we became who we are so we can consciously choose who we want to become.
          </p>
          <div className="mama-themes">
            {themes.map(t => <span key={t} className="mama-theme-tag">{t}</span>)}
          </div>
        </div>
        <div className="fade-up" ref={r2}>
          <div className="mama-gallery" style={{ marginTop: "3.5rem" }}>
            {tiles.map((tile, i) => (
              <div key={i} className={`mama-tile${tile.tall ? " tall mama-gallery-tall" : ""}`}>
                <ImgPlaceholder
                  label={tile.label}
                  style={{ height: tile.tall ? "483px" : "240px" }}
                />
              </div>
            ))}
          </div>
          <div className="coming-soon-bar">Visual Chapters Coming Soon</div>
        </div>
      </div>
    </section>
  );
};

// ---- COMMUNITY CONVERSATIONS ----
const CommunityConversations = () => {
  const r = useFadeUp();
  const convCards = [
    { tag: "Series 01", title: "Ethiopian Conversations", desc: "Exploring how faith, family, and cultural tradition shape identity and belonging across generations." },
    { tag: "Series 02", title: "Indian Conversations", desc: "A conversation on heritage, expectation, and the experience of navigating cultural identity." },
    { tag: "Coming Soon", title: "Future Cultural Conversations", desc: "New voices, new cultural perspectives, new conversations about identity and the human experience." }
  ];
  return (
    <section id="conversations">
      <div className="section-inner">
        <div className="fade-up" ref={r}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "1.5rem", flexWrap: "wrap", marginBottom: "1rem" }}>
            <p className="eyebrow" style={{ margin: 0 }}>Community Conversations</p>
            <span className="in-dev-badge">In Development</span>
          </div>
          <h2 className="heading-display heading-lg">Stories<br /><em>in dialogue.</em></h2>
          <GoldRule />
          <p className="body-lead" style={{ maxWidth: "660px", marginBottom: "1rem" }}>
            A storytelling series exploring how culture, faith, family, language, tradition, and lived experience shape identity.
          </p>
          <p className="body-text" style={{ maxWidth: "640px" }}>
            Through conversations with people from different backgrounds, the series explores the values, beliefs, stories, and traditions that shape how we see ourselves and the world around us.
          </p>
          <div className="conv-grid">
            {convCards.map((c) => (
              <div key={c.title} className="conv-card">
                <div className="conv-video">
                  <VideoPlaceholder
                    label={`${c.title} — video placeholder`}
                    style={{ height: "200px" }}
                  />
                </div>
                <div className="conv-body">
                  <p className="conv-tag">{c.tag}</p>
                  <h3 className="conv-title">{c.title}</h3>
                  <p className="body-text" style={{ fontSize: "0.85rem" }}>{c.desc}</p>
                  <p className="conv-status">Coming Soon — YouTube Series</p>
                </div>
              </div>
            ))}
          </div>
          <div className="reflection-cards-row">
            {[
              "What values have shaped how you see yourself?",
              "What did your culture teach you about who you are?"
            ].map(q => (
              <div key={q} className="ref-q-card">
                <p>{q}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

// ---- REFLECTIONS ----
const Reflections = () => {
  const r = useFadeUp();
  const cards = [
    { num: "01", cat: "Culture & Memory", title: "What Happens When a Culture Remembers Itself?", preview: "A reflection on what becomes possible when communities reconnect with the stories, values, and traditions that shaped them." },
    { num: "02", cat: "Identity", title: "What Stories Have You Inherited?", preview: "An exploration of the narratives passed down through family, faith, and culture — and how they shape the way we see ourselves." },
    { num: "03", cat: "Faith & Culture", title: "Culture, Faith, and Identity", preview: "On the relationship between belief, belonging, and the stories that connect us to something larger than ourselves." },
    { num: "04", cat: "Values", title: "What Values Are Worth Carrying Forward?", preview: "Not every inherited belief serves us. This reflection asks which values, when examined, are still worth holding on to." },
    { num: "05", cat: "Remembrance", title: "Before We Were Broken: Why Remembrance Matters", preview: "On the importance of honoring where we come from before we decide where we are going." },
  ];
  return (
    <section id="reflections">
      <div className="section-inner">
        <div className="fade-up" ref={r}>
          <p className="eyebrow">Reflections</p>
          <h2 className="heading-display heading-md">Written<br /><em>observations.</em></h2>
          <p className="body-text" style={{ maxWidth: "560px", marginTop: "1rem", marginBottom: "0" }}>
            A collection of written reflections, essays, and observations inspired by performances, conversations, culture, identity, and the human experience.
          </p>
        </div>
        <div className="reflections-grid" style={{ marginTop: "3rem" }}>
          {cards.map((c) => {
            const rr = useFadeUp();
            return (
              <div key={c.num} className="reflection-card fade-up" ref={rr}>
                <span className="refl-num">{c.num}</span>
                <p className="refl-category">{c.cat}</p>
                <h3 className="refl-title">{c.title}</h3>
                <p className="refl-preview">{c.preview}</p>
                <p className="refl-read">Read Reflection →</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ---- QUESTIONS WORTH CARRYING ----
const QuestionsWorthCarrying = () => {
  const r = useFadeUp();
  const questions = [
    "Who were you before the world told you who to be?",
    "What shaped the way you see the world?",
    "What beliefs have shaped your identity?",
    "What values have you inherited?",
    "Which of those values are worth carrying forward?",
    "What stories no longer serve you?",
    "What parts of your story are worth carrying forward?",
    "Who are you becoming?",
    "What can we learn from one another's cultures, histories, and experiences?"
  ];
  return (
    <section id="questions">
      <div className="section-inner">
        <div className="questions-intro fade-up" ref={r}>
          <p className="eyebrow">Questions Worth Carrying</p>
          <p className="body-text">Some questions do not need answers. They need to be held.</p>
        </div>
        <div className="questions-list">
          {questions.map((q, i) => {
            const rr = useFadeUp();
            return (
              <div key={i} className="question-item fade-up" ref={rr}>
                <p className="question-text">{q}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ---- BOOKING ----
const Booking = () => {
  const r1 = useFadeUp(), r2 = useFadeUp();
  const availList = [
    "Festivals", "Schools", "Universities & Colleges", "Community Organizations",
    "Cultural Organizations", "Cultural Events", "Black History Month Programming",
    "Libraries & Museums", "Youth Programs", "Arts & Heritage Events",
    "Speaking Engagements", "Live Performances", "Creative Collaborations"
  ];
  return (
    <section id="booking">
      <div className="section-inner">
        <div style={{ textAlign: "center", marginBottom: "5rem" }}>
          <p className="eyebrow">Booking & Collaboration</p>
          <h2 className="heading-display heading-lg">
            Let's create<br /><em>something together.</em>
          </h2>
          <GoldRule style={{ margin: "2rem auto" }} />
          <p className="body-text" style={{ maxWidth: "540px", margin: "0 auto" }}>
            Temi Naomi is available for performances, conversations, cultural programming, speaking engagements, and creative collaborations.
          </p>
        </div>
        <div className="booking-grid">
          <div className="fade-up" ref={r1}>
            <div className="booking-avail">
              <h4>Available For</h4>
              <div className="avail-list">
                {availList.map(a => <span key={a} className="avail-tag">{a}</span>)}
              </div>
            </div>
            <div className="booking-contact" style={{ marginTop: "3rem" }}>
              <h4 style={{ fontSize: "0.65rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", marginBottom: "0.5rem", fontWeight: 400 }}>Contact Directly</h4>
              <div className="contact-item">
                <span className="contact-icon">✉</span>
                <a href="mailto:Nayytee66@gmail.com">Nayytee66@gmail.com</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">✆</span>
                <a href="tel:5199020754">519 902 0754</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">◎</span>
                <a href="https://instagram.com/its._Naomi_" target="_blank" rel="noopener noreferrer">@its._Naomi_ on Instagram</a>
              </div>
              <div className="contact-item">
                <span className="contact-icon">◎</span>
                <span style={{ color: "var(--oak)", fontSize: "0.85rem" }}>Facebook — [link coming soon]</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">◎</span>
                <span style={{ color: "var(--oak)", fontSize: "0.85rem" }}>Twitter / X — [link coming soon]</span>
              </div>
              <div className="contact-item">
                <span className="contact-icon">◎</span>
                <span style={{ color: "var(--oak)", fontSize: "0.85rem" }}>LinkedIn — [link coming soon]</span>
              </div>
            </div>
          </div>
          <div className="fade-up" ref={r2}>
            <p className="eyebrow">Send an Inquiry</p>
            <div className="booking-form">
              <div className="form-row">
                <div className="form-field">
                  <label className="form-label">Your Name</label>
                  <input className="form-input" type="text" placeholder="Full name" />
                </div>
                <div className="form-field">
                  <label className="form-label">Email Address</label>
                  <input className="form-input" type="email" placeholder="your@email.com" />
                </div>
              </div>
              <div className="form-field">
                <label className="form-label">Organization / Event</label>
                <input className="form-input" type="text" placeholder="Organization name or event" />
              </div>
              <div className="form-field">
                <label className="form-label">Type of Collaboration</label>
                <select className="form-select">
                  <option value="">Select inquiry type</option>
                  <option>Live Performance</option>
                  <option>Speaking Engagement</option>
                  <option>Cultural Programming</option>
                  <option>Creative Collaboration</option>
                  <option>Community Event</option>
                  <option>Other</option>
                </select>
              </div>
              <div className="form-field">
                <label className="form-label">Tell Me About Your Vision</label>
                <textarea className="form-textarea" placeholder="Share your event details, vision, and how you'd like to collaborate..." />
              </div>
              <button className="btn btn-primary" style={{ alignSelf: "flex-start" }}>Send Inquiry</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ---- FOOTER ----
const Footer = () => {
  const navLinks = ["Home", "About", "Story Worlds", "Before We Were Broken", "Reflections", "Booking", "Contact"];
  const hrefs = ["#hero", "#about", "#featured-worlds", "#bwwb", "#reflections", "#booking", "#booking"];
  const socials = [
    { icon: "IG", label: "Instagram", href: "https://instagram.com/its._Naomi_" },
    { icon: "YT", label: "YouTube", href: "#" },
    { icon: "FB", label: "Facebook", href: "#" },
    { icon: "TW", label: "Twitter / X", href: "#" },
    { icon: "LI", label: "LinkedIn", href: "#" },
    { icon: "✉", label: "Email", href: "mailto:Nayytee66@gmail.com" }
  ];
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <p className="footer-brand-name">Temi Naomi</p>
            <p className="footer-brand-role">Storyteller | Performance Artist | Creative Explorer</p>
            <GoldRule />
            <p className="footer-tagline">Stories of identity, memory, culture, belonging, and becoming.</p>
          </div>
          <div>
            <p className="footer-nav-title">Navigation</p>
            <ul className="footer-nav-list">
              {navLinks.map((label, i) => (
                <li key={label}><a href={hrefs[i]}>{label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="footer-nav-title">Connect</p>
            <div className="social-links">
              {socials.map(s => (
                <a key={s.label} href={s.href} className="social-link" target="_blank" rel="noopener noreferrer">
                  <span className="social-link-icon">{s.icon}</span>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© {new Date().getFullYear()} Temi Naomi. All rights reserved.</p>
          <p className="footer-copy">Stories worth telling. Stories worth carrying.</p>
        </div>
      </div>
    </footer>
  );
};

// ---- APP ----
export default function App() {
  return (
    <>
      <style>{styles}</style>
      <Nav />
      <main>
        <Hero />
        <Crack />
        <About />
        <Crack />
        <FeaturedWorlds />
        <Crack />
        <BWWB />
        <StoryBranches />
        <Monologue />
        <Experience />
        <ThemesExplored />
        <AudienceSections />
        <SelectedPerformances />
        <TechnicalRequirements />
        <QuoteBreak />
        <MamaAfrica />
        <Crack />
        <CommunityConversations />
        <Crack />
        <Reflections />
        <QuestionsWorthCarrying />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
