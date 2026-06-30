import { useState, useEffect, useRef } from "react";

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

  ::-webkit-scrollbar { width: 2px; }
  ::-webkit-scrollbar-track { background: var(--void); }
  ::-webkit-scrollbar-thumb { background: var(--gold); opacity: 0.4; }

  /* ---- NAV ---- */
  .nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.75rem 3rem;
    transition: all 0.5s;
  }
  .nav.scrolled {
    padding: 1.25rem 3rem;
    background: rgba(13,11,9,0.92);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(212,168,71,0.1);
  }
  .nav-logo {
    font-family: var(--font-display);
    font-size: 1rem;
    font-weight: 500;
    letter-spacing: 0.3em;
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
    font-size: 0.68rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: rgba(196,168,130,0.6);
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
    width: 22px;
    height: 1px;
    background: var(--parchment);
    transition: 0.3s;
  }

  /* ---- CRACK DIVIDER ---- */
  .crack {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem 0;
  }
  .crack-line {
    width: 1px;
    height: 60px;
    background: linear-gradient(to bottom, transparent, var(--gold), transparent);
    opacity: 0.35;
  }

  /* ---- SECTION SCAFFOLD ---- */
  section { position: relative; }
  .section-inner {
    max-width: 1140px;
    margin: 0 auto;
    padding: 0 2.5rem;
  }

  /* ---- TYPE SCALE ---- */
  .eyebrow {
    font-family: var(--font-body);
    font-size: 0.62rem;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--gold);
    font-weight: 400;
    margin-bottom: 1.5rem;
    opacity: 0.8;
  }
  .heading-display {
    font-family: var(--font-display);
    font-weight: 300;
    line-height: 1.05;
    color: var(--parchment);
  }
  .heading-xl  { font-size: clamp(3.5rem, 8vw,  9rem); }
  .heading-lg  { font-size: clamp(2.8rem, 6vw,  6rem); }
  .heading-md  { font-size: clamp(2rem,   4vw,  3.8rem); }
  .heading-sm  { font-size: clamp(1.6rem, 3vw,  2.6rem); }

  .body-lead {
    font-size: clamp(1.05rem, 1.5vw, 1.25rem);
    color: var(--sand);
    line-height: 1.9;
    font-weight: 300;
  }
  .body-text {
    font-size: clamp(0.9rem, 1.2vw, 1.02rem);
    color: var(--sand);
    line-height: 1.9;
    font-weight: 300;
  }

  /* ---- BUTTONS ---- */
  .btn {
    display: inline-flex;
    align-items: center;
    gap: 0.6rem;
    font-family: var(--font-body);
    font-size: 0.68rem;
    letter-spacing: 0.22em;
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
    padding: 1.1rem 2.8rem;
  }
  .btn-primary:hover { background: var(--parchment); transform: translateY(-2px); }
  .btn-ghost {
    border: 1px solid rgba(212,168,71,0.4);
    color: var(--gold);
    padding: 1rem 2.8rem;
  }
  .btn-ghost:hover {
    border-color: var(--gold);
    background: rgba(212,168,71,0.07);
    transform: translateY(-2px);
  }
  .btn-text {
    color: var(--gold);
    font-size: 0.65rem;
    letter-spacing: 0.22em;
    border-bottom: 1px solid transparent;
    padding: 0;
    transition: border-color 0.3s;
  }
  .btn-text:hover { border-color: var(--gold); }

  /* ======================================================
     HERO — CINEMATIC FULL-SCREEN ENTRY
  ====================================================== */
  #hero {
    position: relative;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    text-align: center;
  }

  /* Hero photo background */
  .hero-atmosphere {
    position: absolute;
    inset: 0;
    z-index: 0;
  }
  .hero-bg-img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center 20%;
  }

  /* Cinematic overlay — deepens the photo, keeps text legible */
  .hero-veil {
    position: absolute;
    inset: 0;
    background: linear-gradient(
      to bottom,
      rgba(13,11,9,0.45) 0%,
      rgba(13,11,9,0.2)  30%,
      rgba(13,11,9,0.5)  70%,
      rgba(13,11,9,0.88) 100%
    );
    z-index: 1;
  }

  .hero-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 900px;
    padding: 0 2rem;
  }

  .hero-pre {
    font-family: var(--font-body);
    font-size: 0.62rem;
    letter-spacing: 0.45em;
    text-transform: uppercase;
    color: rgba(212,168,71,0.65);
    font-weight: 400;
    margin-bottom: 1.75rem;
    animation: heroFadeIn 1.4s ease both;
  }

  .hero-name {
    font-family: var(--font-display);
    font-size: clamp(5rem, 14vw, 13rem);
    font-weight: 300;
    line-height: 0.92;
    color: var(--parchment);
    letter-spacing: -0.01em;
    animation: heroReveal 1.8s cubic-bezier(0.16, 1, 0.3, 1) both;
    animation-delay: 0.2s;
  }
  .hero-name em {
    display: block;
    font-style: italic;
    color: var(--sand);
    font-size: 0.78em;
  }

  .hero-rule {
    width: 1px;
    height: 50px;
    background: linear-gradient(to bottom, transparent, rgba(212,168,71,0.5), transparent);
    margin: 2.5rem 0;
    animation: heroFadeIn 1.4s ease both;
    animation-delay: 0.6s;
  }

  .hero-tagline {
    font-family: var(--font-display);
    font-size: clamp(1.1rem, 2.5vw, 1.6rem);
    font-style: italic;
    font-weight: 300;
    color: var(--sand);
    line-height: 1.6;
    max-width: 540px;
    text-align: center;
    animation: heroFadeIn 1.4s ease both;
    animation-delay: 0.8s;
  }

  .hero-role {
    font-size: 0.65rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--oak);
    margin-top: 1rem;
    font-weight: 400;
    animation: heroFadeIn 1.4s ease both;
    animation-delay: 1s;
  }

  .hero-cta {
    display: flex;
    gap: 1.5rem;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 3rem;
    animation: heroFadeIn 1.4s ease both;
    animation-delay: 1.2s;
  }

  @keyframes heroReveal {
    from { opacity: 0; transform: translateY(40px) scale(0.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }
  @keyframes heroFadeIn {
    from { opacity: 0; transform: translateY(18px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  .hero-scroll {
    position: absolute;
    bottom: 2.5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    opacity: 0.3;
    animation: heroFadeIn 1.4s ease both;
    animation-delay: 1.8s;
  }
  .hero-scroll-line {
    width: 1px;
    height: 40px;
    background: linear-gradient(to bottom, var(--gold), transparent);
    animation: scrollPulse 2.5s ease-in-out infinite;
  }
  @keyframes scrollPulse {
    0%, 100% { opacity: 0.4; transform: scaleY(1); }
    50%       { opacity: 0.8; transform: scaleY(1.1); }
  }
  .hero-scroll-text {
    font-size: 0.55rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--sand);
  }

  /* ======================================================
     VOICE / ABOUT — SPARSE, INTIMATE
  ====================================================== */
  #voice {
    padding: 9rem 0;
    background: linear-gradient(to bottom, var(--void) 0%, var(--deep) 40%, var(--deep) 60%, var(--void) 100%);
  }
  .voice-inner {
    max-width: 760px;
    margin: 0 auto;
    padding: 0 2.5rem;
    text-align: center;
  }
  .voice-quote {
    font-family: var(--font-display);
    font-size: clamp(1.8rem, 4vw, 3.2rem);
    font-style: italic;
    font-weight: 300;
    color: var(--parchment);
    line-height: 1.4;
    margin-bottom: 3rem;
  }
  .voice-quote::before {
    content: '"';
    color: rgba(212,168,71,0.4);
    font-size: 1.5em;
    line-height: 0;
    vertical-align: -0.5em;
    margin-right: 0.05em;
  }
  .voice-line {
    width: 60px;
    height: 1px;
    background: rgba(212,168,71,0.4);
    margin: 2.5rem auto;
  }
  .voice-body {
    font-family: var(--font-display);
    font-size: clamp(1.05rem, 1.8vw, 1.25rem);
    font-weight: 300;
    color: var(--sand);
    line-height: 1.85;
    text-align: center;
  }

  /* ======================================================
     BEFORE WE WERE BROKEN — IMMERSIVE
  ====================================================== */
  #bwwb {
    padding: 10rem 0;
    background: linear-gradient(to bottom, var(--void), #0F0A07, var(--void));
    position: relative;
    overflow: hidden;
  }
  .bwwb-watermark {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-family: var(--font-display);
    font-size: clamp(5rem, 18vw, 20rem);
    font-weight: 300;
    color: rgba(107,58,42,0.06);
    white-space: nowrap;
    pointer-events: none;
    letter-spacing: -0.02em;
    line-height: 1;
    z-index: 0;
  }
  .bwwb-inner {
    position: relative;
    z-index: 1;
    max-width: 800px;
    margin: 0 auto;
    padding: 0 2.5rem;
  }
  .bwwb-title {
    font-family: var(--font-display);
    font-size: clamp(3rem, 8vw, 8rem);
    font-weight: 300;
    line-height: 1;
    color: var(--parchment);
    margin-bottom: 1rem;
  }
  .bwwb-title em {
    font-style: italic;
    color: var(--sand);
  }
  .bwwb-subtitle {
    font-family: var(--font-display);
    font-style: italic;
    font-size: clamp(1rem, 1.8vw, 1.3rem);
    color: var(--oak);
    font-weight: 300;
    margin-bottom: 3rem;
    letter-spacing: 0.02em;
  }
  .gold-rule {
    width: 60px;
    height: 1px;
    background: var(--gold);
    opacity: 0.5;
    margin: 2rem 0;
  }
  .bwwb-body {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    margin-bottom: 3rem;
  }

  /* Media panel — photo or video slots here */
  .bwwb-media {
    position: relative;
    width: 100%;
    aspect-ratio: 16/7;
    margin-top: 5rem;
    overflow: hidden;
  }
  .media-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--bark) 0%, #0f0a07 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(212,168,71,0.08);
    position: relative;
  }
  .media-placeholder-label {
    font-family: var(--font-display);
    font-style: italic;
    color: rgba(196,168,130,0.25);
    font-size: 0.85rem;
    letter-spacing: 0.1em;
    text-align: center;
    padding: 2rem;
    line-height: 1.6;
  }

  /* ======================================================
     THE BRANCHES — WHAT THE WORLD CONTAINS
  ====================================================== */
  #branches {
    padding: 7rem 0;
    background: var(--void);
    border-top: 1px solid rgba(212,168,71,0.06);
  }
  .branches-header {
    margin-bottom: 4.5rem;
  }
  .branches-list {
    display: flex;
    flex-direction: column;
    gap: 0;
  }
  .branch-item {
    display: grid;
    grid-template-columns: 80px 1fr auto;
    align-items: center;
    gap: 3rem;
    padding: 2.5rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.05);
    transition: opacity 0.3s;
    cursor: default;
  }
  .branch-item:hover { opacity: 0.85; }
  .branch-num {
    font-family: var(--font-display);
    font-size: 2.5rem;
    color: rgba(212,168,71,0.12);
    font-weight: 300;
    line-height: 1;
  }
  .branch-info h3 {
    font-family: var(--font-display);
    font-size: clamp(1.4rem, 2.5vw, 2rem);
    font-weight: 300;
    color: var(--parchment);
    margin-bottom: 0.4rem;
    line-height: 1.2;
  }
  .branch-info p {
    font-size: 0.88rem;
    color: var(--oak);
    line-height: 1.6;
    max-width: 500px;
  }
  .branch-badge {
    font-size: 0.58rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    padding: 0.3rem 0.8rem;
    font-weight: 400;
    white-space: nowrap;
    align-self: flex-start;
    margin-top: 0.5rem;
  }
  .badge-active {
    background: rgba(212,168,71,0.12);
    color: var(--gold);
    border: 1px solid rgba(212,168,71,0.25);
  }
  .badge-dev {
    background: rgba(107,58,42,0.15);
    color: var(--oak);
    border: 1px solid rgba(107,58,42,0.25);
  }

  /* ======================================================
     PERFORMANCE — THE MONOLOGUE
  ====================================================== */
  #performance {
    padding: 9rem 0;
    background: linear-gradient(to bottom, var(--void), var(--deep), var(--void));
  }
  .performance-inner {
    max-width: 1000px;
    margin: 0 auto;
    padding: 0 2.5rem;
  }
  .perf-media {
    width: 100%;
    aspect-ratio: 16/9;
    position: relative;
    margin-bottom: 5rem;
  }
  .video-placeholder {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, var(--bark), #0a0706);
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .video-play {
    width: 76px;
    height: 76px;
    border-radius: 50%;
    border: 1px solid rgba(212,168,71,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
    z-index: 1;
  }
  .video-play:hover {
    background: rgba(212,168,71,0.1);
    transform: scale(1.06);
  }
  .video-triangle {
    width: 0; height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 18px solid var(--gold);
    margin-left: 5px;
    opacity: 0.8;
  }
  .video-caption {
    position: absolute;
    bottom: 1.5rem;
    left: 50%;
    transform: translateX(-50%);
    font-size: 0.6rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: rgba(196,168,130,0.4);
    white-space: nowrap;
  }
  .perf-columns {
    display: grid;
    grid-template-columns: 1.1fr 1fr;
    gap: 5rem;
    align-items: start;
  }
  .perf-pull {
    font-family: var(--font-display);
    font-size: clamp(1.6rem, 3vw, 2.4rem);
    font-style: italic;
    font-weight: 300;
    color: var(--parchment);
    line-height: 1.4;
    border-left: 1px solid rgba(212,168,71,0.3);
    padding-left: 2rem;
    margin-bottom: 2.5rem;
  }

  /* ======================================================
     QUOTE BREAK — FULL BLEED
  ====================================================== */
  #quote-break {
    position: relative;
    min-height: 55vh;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    text-align: center;
    background: #06040301;
  }
  .quote-bg {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse 100% 100% at 50% 50%, rgba(44,31,20,0.6) 0%, var(--void) 80%);
  }
  .quote-break-content {
    position: relative;
    z-index: 1;
    padding: 5rem 2rem;
    max-width: 820px;
  }
  .quote-large {
    font-family: var(--font-display);
    font-size: clamp(2.2rem, 6vw, 5.5rem);
    font-style: italic;
    font-weight: 300;
    color: var(--parchment);
    line-height: 1.3;
    letter-spacing: 0.01em;
  }
  .quote-attr {
    margin-top: 2rem;
    font-size: 0.62rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--gold);
    opacity: 0.6;
  }

  /* ======================================================
     THEMES — WHAT THE WORK HOLDS
  ====================================================== */
  #themes {
    padding: 6rem 0;
    background: var(--deep);
    border-top: 1px solid rgba(212,168,71,0.07);
    border-bottom: 1px solid rgba(212,168,71,0.07);
  }
  .themes-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.85rem;
    margin-top: 3rem;
  }
  .theme-chip {
    font-family: var(--font-display);
    font-size: clamp(1rem, 1.8vw, 1.4rem);
    font-style: italic;
    font-weight: 300;
    color: var(--parchment);
    border: 1px solid rgba(212,168,71,0.15);
    padding: 0.7rem 1.8rem;
    transition: all 0.35s;
    cursor: default;
  }
  .theme-chip:hover {
    border-color: var(--gold);
    background: rgba(212,168,71,0.05);
    color: var(--gold);
    transform: translateY(-2px);
  }

  /* ======================================================
     QUESTIONS — POETIC, SPARSE
  ====================================================== */
  #questions {
    padding: 10rem 0;
    background: var(--void);
    overflow: hidden;
  }
  .questions-center {
    max-width: 680px;
    margin: 0 auto;
    padding: 0 2.5rem;
  }
  .questions-intro {
    text-align: center;
    margin-bottom: 5rem;
  }
  .q-intro-text {
    font-family: var(--font-display);
    font-size: clamp(1rem, 1.5vw, 1.2rem);
    font-style: italic;
    color: var(--oak);
  }
  .question-item {
    padding: 2.25rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.035);
    opacity: 0.5;
    transition: opacity 0.4s;
    cursor: default;
  }
  .question-item:hover { opacity: 1; }
  .question-text {
    font-family: var(--font-display);
    font-size: clamp(1.25rem, 2.5vw, 1.9rem);
    font-style: italic;
    font-weight: 300;
    color: var(--parchment);
    line-height: 1.45;
  }

  /* ======================================================
     BOOKING — SIMPLE, DIRECT
  ====================================================== */
  #booking {
    padding: 9rem 0;
    background: linear-gradient(to bottom, var(--void), var(--bark) 50%, var(--void));
  }
  .booking-inner {
    max-width: 900px;
    margin: 0 auto;
    padding: 0 2.5rem;
    display: grid;
    grid-template-columns: 1fr 1.3fr;
    gap: 7rem;
    align-items: start;
  }
  .booking-left h2 {
    font-family: var(--font-display);
    font-size: clamp(2.5rem, 5vw, 4.5rem);
    font-weight: 300;
    line-height: 1.05;
    color: var(--parchment);
    margin-bottom: 2rem;
  }
  .booking-left h2 em { font-style: italic; color: var(--sand); }
  .booking-contact { margin-top: 2.5rem; }
  .booking-contact h4 {
    font-size: 0.6rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1.25rem;
    font-weight: 400;
    opacity: 0.7;
  }
  .contact-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.8rem 0;
    border-bottom: 1px solid rgba(255,255,255,0.04);
    font-size: 0.88rem;
    color: var(--sand);
  }
  .contact-dot {
    width: 4px; height: 4px;
    border-radius: 50%;
    background: rgba(212,168,71,0.4);
    flex-shrink: 0;
  }
  .contact-item a { color: var(--sand); text-decoration: none; transition: color 0.3s; }
  .contact-item a:hover { color: var(--gold); }
  .contact-dim { color: var(--oak) !important; font-size: 0.82rem !important; }
  .avail-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-top: 2.5rem;
  }
  .avail-tag {
    font-size: 0.68rem;
    color: var(--sand);
    border: 1px solid rgba(196,168,130,0.15);
    padding: 0.35rem 0.9rem;
    font-weight: 300;
    letter-spacing: 0.05em;
    transition: border-color 0.3s;
  }
  .avail-tag:hover { border-color: rgba(196,168,130,0.4); }

  .booking-form { display: flex; flex-direction: column; gap: 1.15rem; }
  .form-row { display: grid; grid-template-columns: 1fr 1fr; gap: 1.15rem; }
  .form-field { display: flex; flex-direction: column; gap: 0.45rem; }
  .form-label {
    font-size: 0.6rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--oak);
    font-weight: 400;
  }
  .form-input, .form-select, .form-textarea {
    background: rgba(255,255,255,0.025);
    border: 1px solid rgba(255,255,255,0.07);
    color: var(--parchment);
    padding: 0.85rem 1rem;
    font-family: var(--font-body);
    font-size: 0.88rem;
    font-weight: 300;
    outline: none;
    transition: border-color 0.3s;
    -webkit-appearance: none;
  }
  .form-input::placeholder, .form-textarea::placeholder { color: rgba(196,168,130,0.22); }
  .form-input:focus, .form-select:focus, .form-textarea:focus {
    border-color: rgba(212,168,71,0.35);
    background: rgba(255,255,255,0.035);
  }
  .form-textarea { resize: vertical; min-height: 120px; }
  .form-select option { background: var(--deep); color: var(--parchment); }

  /* ======================================================
     FOOTER
  ====================================================== */
  footer {
    background: #09070501;
    padding: 4rem 0 2.5rem;
    border-top: 1px solid rgba(212,168,71,0.08);
  }
  .footer-inner {
    max-width: 1140px;
    margin: 0 auto;
    padding: 0 2.5rem;
  }
  .footer-top {
    display: grid;
    grid-template-columns: 1.5fr 1fr 1fr;
    gap: 4rem;
    padding-bottom: 3rem;
    border-bottom: 1px solid rgba(255,255,255,0.04);
  }
  .footer-brand {
    font-family: var(--font-display);
    font-size: 1.35rem;
    font-weight: 300;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--parchment);
    margin-bottom: 0.4rem;
  }
  .footer-role {
    font-size: 0.6rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--oak);
    margin-bottom: 1.25rem;
    font-weight: 400;
  }
  .footer-tagline { font-size: 0.88rem; color: var(--oak); line-height: 1.7; }
  .footer-col-title {
    font-size: 0.6rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--gold);
    margin-bottom: 1.5rem;
    font-weight: 400;
    opacity: 0.7;
  }
  .footer-nav-list { list-style: none; display: flex; flex-direction: column; gap: 0.65rem; }
  .footer-nav-list a {
    font-size: 0.82rem;
    color: var(--sand);
    text-decoration: none;
    opacity: 0.55;
    transition: opacity 0.3s;
    letter-spacing: 0.04em;
    font-weight: 300;
  }
  .footer-nav-list a:hover { opacity: 1; }
  .social-links { display: flex; flex-direction: column; gap: 0.65rem; }
  .social-link {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 0.82rem;
    color: var(--sand);
    text-decoration: none;
    opacity: 0.55;
    transition: opacity 0.3s;
    font-weight: 300;
  }
  .social-link:hover { opacity: 1; }
  .social-icon {
    width: 26px;
    height: 26px;
    border: 1px solid rgba(212,168,71,0.18);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.65rem;
    color: var(--gold);
    flex-shrink: 0;
  }
  .footer-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-top: 2rem;
    flex-wrap: wrap;
    gap: 0.75rem;
  }
  .footer-copy { font-size: 0.65rem; color: var(--oak); opacity: 0.45; letter-spacing: 0.04em; }

  /* ======================================================
     FADE-UP ANIMATION
  ====================================================== */
  .fade-up {
    opacity: 0;
    transform: translateY(28px);
    transition: opacity 0.9s ease, transform 0.9s ease;
  }
  .fade-up.visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ======================================================
     MOBILE
  ====================================================== */
  @media (max-width: 900px) {
    .nav-links { display: none; }
    .nav-menu-toggle { display: flex; }
    .nav { padding: 1.5rem 1.5rem; }
    .hero-media-hint { display: none; }
    .booking-inner { grid-template-columns: 1fr; gap: 4rem; }
    .perf-columns { grid-template-columns: 1fr; gap: 3rem; }
    .footer-top { grid-template-columns: 1fr; gap: 2.5rem; }
    .branch-item { grid-template-columns: 50px 1fr; gap: 1.5rem; }
    .branch-badge { display: none; }
  }
  @media (max-width: 600px) {
    .nav { padding: 1.25rem 1.25rem; }
    .hero-name { font-size: 4.5rem; }
    .form-row { grid-template-columns: 1fr; }
    .section-inner { padding: 0 1.25rem; }
    .voice-inner, .questions-center { padding: 0 1.25rem; }
    .bwwb-inner, .performance-inner, .booking-inner { padding: 0 1.25rem; }
  }
`;

// ---- HOOKS ----
function useFadeUp() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) el.classList.add("visible"); },
      { threshold: 0.1 }
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
    const fn = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const links = [
    ["Home", "#hero"], ["About", "#voice"], ["The Work", "#bwwb"],
    ["Reflections", "#questions"], ["Book", "#booking"]
  ];
  return (
    <nav className={`nav${scrolled ? " scrolled" : ""}`}>
      <a href="#hero" className="nav-logo">Temi Naomi</a>
      <ul className="nav-links">
        {links.map(([label, href]) => (
          <li key={label}><a href={href}>{label}</a></li>
        ))}
      </ul>
      <button className="nav-menu-toggle" aria-label="Menu" onClick={() => setOpen(true)}>
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
              fontFamily: "var(--font-display)", fontSize: "2.2rem",
              fontWeight: 300, color: "var(--parchment)", textDecoration: "none",
              letterSpacing: "0.04em"
            }}>{label}</a>
          ))}
        </div>
      )}
    </nav>
  );
};

// ---- CRACK DIVIDER ----
const Crack = () => (
  <div className="crack"><div className="crack-line" /></div>
);

// ---- GOLD RULE ----
const GoldRule = () => <div className="gold-rule" />;

// ============================================================
// HERO — full-screen cinematic entry
// ============================================================
const Hero = () => (
  <section id="hero">
    <div className="hero-atmosphere">
      <img
        src="/hero-portrait.jpg"
        alt=""
        className="hero-bg-img"
      />
    </div>
    <div className="hero-veil" />

    <div className="hero-content">
      <p className="hero-pre">Temi Naomi</p>
      <h1 className="hero-name">
        Story<em>Teller.</em>
      </h1>
      <div className="hero-rule" />
      <p className="hero-tagline">
        Stories of identity, memory, culture, belonging, and the journey of becoming.
      </p>
      <p className="hero-role">Storyteller &nbsp;·&nbsp; Performance Artist &nbsp;·&nbsp; Creative Explorer</p>
      <div className="hero-cta">
        <a href="#bwwb" className="btn btn-primary">Experience the Work</a>
        <a href="#booking" className="btn btn-ghost">Book a Performance</a>
      </div>
    </div>

    <div className="hero-scroll">
      <div className="hero-scroll-line" />
      <span className="hero-scroll-text">Enter</span>
    </div>
  </section>
);

// ============================================================
// VOICE — who she is, why she tells stories
// ============================================================
const Voice = () => {
  const r1 = useFadeUp(), r2 = useFadeUp();
  return (
    <section id="voice">
      <div style={{
        maxWidth: "1140px", margin: "0 auto", padding: "0 2.5rem",
        display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: "6rem", alignItems: "center"
      }}>
        <div className="fade-up" ref={r1}>
          <img
            src="/about-portrait.jpg"
            alt="Temi Naomi portrait"
            style={{
              width: "100%",
              aspectRatio: "3/4",
              objectFit: "cover",
              objectPosition: "center top",
              display: "block"
            }}
          />
        </div>
        <div className="fade-up" ref={r2}>
          <p className="eyebrow">Why I Tell Stories</p>
          <blockquote className="voice-quote" style={{ textAlign: "left", fontSize: "clamp(1.6rem,3vw,2.6rem)" }}>
            I believe understanding how we became who we are allows us to consciously choose who we want to become.
          </blockquote>
          <div className="voice-line" style={{ margin: "2rem 0" }} />
          <p className="voice-body" style={{ textAlign: "left" }}>
            Through storytelling, performance, visual art, and conversation, my work explores the cultures, histories, memories, beliefs, and experiences that shape identity.
            <br /><br />
            I am interested in the stories we inherit — from family, community, faith, culture, and lived experience — and the ways those stories influence how we see ourselves and the world around us.
            <br /><br />
            <em style={{ color: "var(--parchment)", fontFamily: "var(--font-display)", fontStyle: "italic" }}>Because before we decide what to carry forward, we must first understand what shaped us.</em>
          </p>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// BEFORE WE WERE BROKEN
// ============================================================
const BWWB = () => {
  const r1 = useFadeUp(), r2 = useFadeUp();
  return (
    <section id="bwwb">
      <div className="bwwb-watermark" aria-hidden="true">BEFORE</div>
      <div className="bwwb-inner">
        <div className="fade-up" ref={r1}>
          <p className="eyebrow">Story World</p>
          <h2 className="bwwb-title">Before We<br /><em>Were Broken</em></h2>
          <p className="bwwb-subtitle">
            A story world exploring identity, memory, belonging, culture,<br />and the stories we inherit.
          </p>
          <GoldRule />
          <div className="bwwb-body">
            <p className="body-text">
              Before We Were Broken is a storytelling project exploring identity, memory, belonging, culture, and the stories we inherit.
            </p>
            <p className="body-text">
              Through performance, visual storytelling, conversation, film, visual art, and creative expression, the project examines how family, culture, faith, history, and lived experiences shape who we become.
            </p>
            <p className="body-text" style={{ fontStyle: "italic", color: "var(--parchment)", fontFamily: "var(--font-display)" }}>
              Rooted in the belief that understanding how we became who we are allows us to consciously choose who we want to become — the project invites audiences to reflect on the values, beliefs, traditions, and narratives they have inherited and consider what is worth carrying forward.
            </p>
          </div>
          <a href="#branches" className="btn btn-ghost">Explore The Story Branches</a>
        </div>

        <div className="bwwb-media fade-up" ref={r2}>
          <img
            src="/bwwb-dance.jpg"
            alt="Temi Naomi performing — movement, live percussion, audience"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top" }}
          />
        </div>
      </div>
    </section>
  );
};

// ============================================================
// STORY BRANCHES
// ============================================================
const Branches = () => {
  const r = useFadeUp();
  const items = [
    {
      num: "01", status: "Active", badgeClass: "badge-active",
      title: "The Monologue",
      desc: "A live spoken word performance — combining spoken word, movement, and live percussion — exploring identity, memory, and the journey of becoming.",
      href: "#performance"
    },
    {
      num: "02", status: "In Development", badgeClass: "badge-dev",
      title: "Mama Africa",
      desc: "A visual storytelling series exploring origin, ancestry, cultural remembrance, and the journey of understanding how we became who we are.",
      href: "#booking"
    },
    {
      num: "03", status: "In Development", badgeClass: "badge-dev",
      title: "Community Conversations",
      desc: "A storytelling series exploring how culture, faith, family, language, tradition, and lived experience shape identity — through real conversations.",
      href: "#booking"
    }
  ];
  return (
    <section id="branches">
      <div className="section-inner">
        <div className="branches-header fade-up" ref={r}>
          <p className="eyebrow">Within Before We Were Broken</p>
          <h2 className="heading-display heading-md">
            The story world unfolds<br /><em>through many doors.</em>
          </h2>
        </div>
        <div className="branches-list">
          {items.map((b) => {
            const rr = useFadeUp();
            return (
              <a key={b.num} href={b.href} className="branch-item fade-up" ref={rr} style={{ textDecoration: "none" }}>
                <span className="branch-num">{b.num}</span>
                <div className="branch-info">
                  <h3>{b.title}</h3>
                  <p>{b.desc}</p>
                </div>
                <span className={`branch-badge ${b.badgeClass}`}>{b.status}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ============================================================
// PERFORMANCE — THE MONOLOGUE
// ============================================================
const Performance = () => {
  const r1 = useFadeUp(), r2 = useFadeUp();
  return (
    <section id="performance">
      <div className="performance-inner">
        <div className="fade-up" ref={r1}>
          <p className="eyebrow">The Monologue</p>
          <h2 className="heading-display heading-lg" style={{ marginBottom: "3rem" }}>
            Before We Were Broken:<br /><em>The Monologue</em>
          </h2>
        </div>

        {/* Stage image — swap for a <video> embed when footage is available */}
        <div className="perf-media fade-up" ref={r2}>
          <img
            src="/performance-stage.jpg"
            alt="Temi Naomi performing live on stage with microphone and audience"
            style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 30%" }}
          />
        </div>

        <div className="perf-columns">
          <div>
            <GoldRule />
            <p className="body-lead" style={{ marginBottom: "1.5rem" }}>
              A live spoken word performance exploring remembrance, identity, and the journey of becoming.
            </p>
            <p className="body-text" style={{ marginBottom: "1.25rem" }}>
              Rooted in Black stories yet resonant across cultures, the work reflects on what happens when people become disconnected from themselves, their history, their culture, or their humanity.
            </p>
            <p className="body-text" style={{ marginBottom: "2rem" }}>
              Through spoken word, movement, embodiment, and live percussion, the performance invites audiences to consider the forces that shape us — family, culture, faith, history, expectations, and lived experiences.
            </p>
            <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
              <a href="#booking" className="btn btn-primary">Book This Performance</a>
            </div>
          </div>
          <div>
            <blockquote className="perf-pull">
              What parts of ourselves, our values, and our stories are worth carrying forward?
            </blockquote>
            <p className="body-text" style={{ marginBottom: "1.5rem" }}>
              A 10–15 minute live spoken word performance exploring identity, memory, and belonging beyond inherited narratives. The piece invites audiences to reconnect with the parts of themselves that existed before expectation, distortion, and division.
            </p>
            <div style={{
              padding: "1.75rem",
              borderLeft: "1px solid rgba(212,168,71,0.25)",
              background: "rgba(44,31,20,0.15)"
            }}>
              <p style={{
                fontFamily: "var(--font-display)",
                fontStyle: "italic",
                fontSize: "1rem",
                color: "var(--sand)",
                lineHeight: 1.65,
                marginBottom: "0.75rem"
              }}>
                "The performance stayed with me long after it ended. It asked questions I hadn't thought to ask myself."
              </p>
              <p style={{ fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold)", opacity: 0.5, fontWeight: 400 }}>
                Audience Testimonial — replace with real quote
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// QUOTE BREAK
// ============================================================
const QuoteBreak = () => (
  <section id="quote-break">
    <img
      src="/profile-bw.png"
      alt=""
      style={{
        position: "absolute", inset: 0,
        width: "100%", height: "100%",
        objectFit: "cover", objectPosition: "center 20%",
        filter: "brightness(0.22) grayscale(0.3)",
        zIndex: 0
      }}
    />
    <div className="quote-bg" style={{ zIndex: 1 }} />
    <div className="quote-break-content" style={{ zIndex: 2 }}>
      <p className="quote-large">"Before the world named us…<br />we were."</p>
      <p className="quote-attr">— Before We Were Broken</p>
    </div>
  </section>
);

// ============================================================
// THEMES
// ============================================================
const Themes = () => {
  const r = useFadeUp();
  const themes = ["Identity", "Cultural Remembrance", "Belonging", "Self-Worth", "Memory", "Community", "Human Connection"];
  return (
    <section id="themes">
      <div className="section-inner">
        <div className="fade-up" ref={r}>
          <p className="eyebrow">Themes Explored</p>
          <h2 className="heading-display heading-md">At the heart<br /><em>of the work.</em></h2>
          <div className="themes-grid">
            {themes.map(t => <div key={t} className="theme-chip">{t}</div>)}
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================
// QUESTIONS WORTH CARRYING
// ============================================================
const Questions = () => {
  const r = useFadeUp();
  const qs = [
    "Who were you before the world told you who to be?",
    "What shaped the way you see the world?",
    "What beliefs have shaped your identity?",
    "What values have you inherited?",
    "Which of those values are worth carrying forward?",
    "What stories no longer serve you?",
    "What parts of your story are worth carrying forward?",
    "Who are you becoming?",
  ];
  return (
    <section id="questions">
      <div className="questions-center">
        <div className="questions-intro fade-up" ref={r}>
          <p className="eyebrow">Questions Worth Carrying</p>
          <p className="q-intro-text">Some questions do not need answers. They need to be held.</p>
        </div>
        {qs.map((q, i) => {
          const rr = useFadeUp();
          return (
            <div key={i} className="question-item fade-up" ref={rr}>
              <p className="question-text">{q}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
};

// ============================================================
// BOOKING
// ============================================================
const Booking = () => {
  const r1 = useFadeUp(), r2 = useFadeUp();
  const avail = [
    "Festivals", "Schools", "Universities & Colleges", "Community Organizations",
    "Cultural Events", "Black History Month", "Libraries & Museums",
    "Youth Programs", "Arts & Heritage Events", "Speaking Engagements",
    "Live Performances", "Creative Collaborations"
  ];
  const contacts = [
    { label: "Nayytee66@gmail.com", href: "mailto:Nayytee66@gmail.com" },
    { label: "519 902 0754", href: "tel:5199020754" },
    { label: "@its._Naomi_ on Instagram", href: "https://instagram.com/its._Naomi_" },
  ];
  const socials = [
    { icon: "IG", label: "Instagram", href: "https://instagram.com/its._Naomi_" },
    { icon: "YT", label: "YouTube", href: "#" },
    { icon: "FB", label: "Facebook", href: "#" },
    { icon: "✉", label: "Email", href: "mailto:Nayytee66@gmail.com" },
  ];
  return (
    <section id="booking">
      <div className="booking-inner">
        <div className="fade-up" ref={r1}>
          <h2 className="booking-left" style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.4rem,5vw,4.2rem)", fontWeight: 300, lineHeight: 1.05, color: "var(--parchment)", marginBottom: "2rem" }}>
            Let's create<br /><em style={{ fontStyle: "italic", color: "var(--sand)" }}>something together.</em>
          </h2>
          <p className="body-text">
            Available for performances, conversations, cultural programming, speaking engagements, and creative collaborations.
          </p>
          <div className="booking-contact">
            <h4>Contact Directly</h4>
            {contacts.map(c => (
              <div key={c.label} className="contact-item">
                <span className="contact-dot" />
                <a href={c.href} target={c.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">{c.label}</a>
              </div>
            ))}
            <div className="contact-item">
              <span className="contact-dot" />
              <span className="contact-dim">Facebook — coming soon</span>
            </div>
            <div className="contact-item">
              <span className="contact-dot" />
              <span className="contact-dim">Twitter / X — coming soon</span>
            </div>
            <div className="contact-item">
              <span className="contact-dot" />
              <span className="contact-dim">LinkedIn — coming soon</span>
            </div>
          </div>
          <div className="avail-tags" style={{ marginTop: "2.5rem" }}>
            <p style={{ width: "100%", fontSize: "0.6rem", letterSpacing: "0.25em", textTransform: "uppercase", color: "var(--gold)", opacity: 0.6, marginBottom: "0.5rem", fontWeight: 400 }}>Available For</p>
            {avail.map(a => <span key={a} className="avail-tag">{a}</span>)}
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
                <label className="form-label">Email</label>
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
    </section>
  );
};

// ============================================================
// FOOTER
// ============================================================
const Footer = () => {
  const navLinks = ["Home", "About", "The Work", "Questions", "Book"];
  const hrefs    = ["#hero", "#voice", "#bwwb", "#questions", "#booking"];
  const socials  = [
    { icon: "IG", label: "Instagram", href: "https://instagram.com/its._Naomi_" },
    { icon: "YT", label: "YouTube", href: "#" },
    { icon: "FB", label: "Facebook", href: "#" },
    { icon: "TW", label: "Twitter / X", href: "#" },
    { icon: "✉",  label: "Email", href: "mailto:Nayytee66@gmail.com" },
  ];
  return (
    <footer>
      <div className="footer-inner">
        <div className="footer-top">
          <div>
            <p className="footer-brand">Temi Naomi</p>
            <p className="footer-role">Storyteller &nbsp;·&nbsp; Performance Artist &nbsp;·&nbsp; Creative Explorer</p>
            <GoldRule />
            <p className="footer-tagline">Stories of identity, memory, culture, belonging, and becoming.</p>
          </div>
          <div>
            <p className="footer-col-title">Navigation</p>
            <ul className="footer-nav-list">
              {navLinks.map((label, i) => (
                <li key={label}><a href={hrefs[i]}>{label}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="footer-col-title">Connect</p>
            <div className="social-links">
              {socials.map(s => (
                <a key={s.label} href={s.href} className="social-link" target="_blank" rel="noopener noreferrer">
                  <span className="social-icon">{s.icon}</span>
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

// ============================================================
// APP
// ============================================================
export default function App() {
  return (
    <>
      <style>{styles}</style>
      <Nav />
      <main>
        <Hero />
        <Crack />
        <Voice />
        <Crack />
        <BWWB />
        <Branches />
        <Crack />
        <Performance />
        <QuoteBreak />
        <Themes />
        <Crack />
        <Questions />
        <Crack />
        <Booking />
      </main>
      <Footer />
    </>
  );
}
