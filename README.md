<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>دزه سوق | Dazha Souq</title>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700;900&display=swap" rel="stylesheet">
<style>
  :root {
    --orange: #FF6B00;
    --orange-l: #FF8C35;
    --orange-dim: #FFF3E8;
    --dark: #0F1C3F;
    --dark2: #16213E;
    --dark3: #0A1628;
    --gray: #64748B;
    --gray-l: #F1F5F9;
    --border: #E2E8F0;
    --white: #FFFFFF;
    --green: #10B981;
    --red: #EF4444;
  }
  * { margin:0; padding:0; box-sizing:border-box; }
  html { scroll-behavior: smooth; }
  body {
    font-family: 'Cairo', sans-serif;
    background: #F8FAFC;
    color: var(--dark);
    direction: rtl;
  }
  a { text-decoration: none; color: inherit; }
  button { font-family: 'Cairo', sans-serif; cursor: pointer; }
  input, textarea { font-family: 'Cairo', sans-serif; }

  /* ── SCROLLBAR ── */
  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: var(--border); border-radius: 10px; }

  /* ── NAVBAR ── */
  .navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 1000;
    background: rgba(15,28,63,0.97);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid rgba(255,255,255,0.06);
    padding: 0 5%;
    display: flex; align-items: center; justify-content: space-between;
    height: 68px;
    box-shadow: 0 4px 30px rgba(0,0,0,0.2);
  }
  .logo {
    font-size: 24px; font-weight: 900; color: white; letter-spacing: -0.5px;
    display: flex; align-items: center; gap: 6px;
  }
  .logo span { color: var(--orange); }
  .logo-dot { width: 8px; height: 8px; background: var(--orange); border-radius: 50%; margin-top: 2px; animation: pulse 2s infinite; }
  @keyframes pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.6;transform:scale(1.3)} }

  .nav-links { display: flex; align-items: center; gap: 8px; }
  .nav-link {
    color: rgba(255,255,255,0.75); font-size: 14px; font-weight: 600;
    padding: 8px 16px; border-radius: 10px; transition: all .2s;
    border: none; background: none;
  }
  .nav-link:hover, .nav-link.active {
    color: white; background: rgba(255,255,255,0.08);
  }
  .nav-link.active { color: var(--orange); }
  .nav-actions { display: flex; align-items: center; gap: 10px; }
  .btn-nav-outline {
    border: 1.5px solid rgba(255,255,255,0.2); background: none;
    color: white; padding: 8px 18px; border-radius: 10px;
    font-size: 13px; font-weight: 600; transition: all .2s;
  }
  .btn-nav-outline:hover { border-color: var(--orange); color: var(--orange); }
  .btn-nav-solid {
    background: var(--orange); color: white; border: none;
    padding: 8px 20px; border-radius: 10px; font-size: 13px; font-weight: 700;
    transition: all .2s; box-shadow: 0 4px 14px rgba(255,107,0,.35);
  }
  .btn-nav-solid:hover { background: var(--orange-l); transform: translateY(-1px); }

  /* ── HERO ── */
  .hero {
    min-height: 100vh;
    background: linear-gradient(135deg, var(--dark3) 0%, var(--dark2) 50%, #0D2B55 100%);
    display: flex; align-items: center; justify-content: center;
    text-align: center; padding: 100px 5% 60px;
    position: relative; overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute; inset: 0;
    background: radial-gradient(ellipse 60% 50% at 50% 60%, rgba(255,107,0,0.12) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero-grid {
    position: absolute; inset: 0; opacity: 0.04;
    background-image: linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px);
    background-size: 40px 40px;
  }
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(255,107,0,0.15); border: 1px solid rgba(255,107,0,0.3);
    color: #FFB380; font-size: 13px; font-weight: 600;
    padding: 6px 16px; border-radius: 20px; margin-bottom: 28px;
    animation: fadeDown .6s ease both;
  }
  .hero h1 {
    font-size: clamp(36px, 6vw, 72px); font-weight: 900;
    color: white; line-height: 1.15; margin-bottom: 22px;
    animation: fadeUp .7s ease .1s both;
  }
  .hero h1 em { color: var(--orange); font-style: normal; }
  .hero p {
    font-size: clamp(15px, 2vw, 19px); color: rgba(255,255,255,.65);
    max-width: 600px; margin: 0 auto 40px; line-height: 1.7;
    animation: fadeUp .7s ease .2s both;
  }
  .hero-btns {
    display: flex; gap: 14px; justify-content: center; flex-wrap: wrap;
    animation: fadeUp .7s ease .3s both;
  }
  .btn-hero-primary {
    background: var(--orange); color: white; border: none;
    padding: 14px 34px; border-radius: 14px; font-size: 15px; font-weight: 700;
    box-shadow: 0 10px 30px rgba(255,107,0,.4); transition: all .25s;
  }
  .btn-hero-primary:hover { transform: translateY(-3px); box-shadow: 0 16px 40px rgba(255,107,0,.5); }
  .btn-hero-secondary {
    background: rgba(255,255,255,.08); color: white;
    border: 1.5px solid rgba(255,255,255,.2);
    padding: 14px 34px; border-radius: 14px; font-size: 15px; font-weight: 600;
    transition: all .25s; backdrop-filter: blur(4px);
  }
  .btn-hero-secondary:hover { background: rgba(255,255,255,.14); transform: translateY(-3px); }

  .hero-stats {
    display: flex; justify-content: center; gap: 40px; margin-top: 60px;
    animation: fadeUp .7s ease .4s both; flex-wrap: wrap;
  }
  .stat-item { text-align: center; }
  .stat-num { font-size: 30px; font-weight: 900; color: var(--orange); }
  .stat-lbl { font-size: 12px; color: rgba(255,255,255,.5); font-weight: 600; margin-top: 2px; }

  /* ── SEARCH BAR ── */
  .search-section {
    background: white; padding: 32px 5%;
    box-shadow: 0 4px 20px rgba(0,0,0,.07);
    position: sticky; top: 68px; z-index: 900;
    border-bottom: 1px solid var(--border);
  }
  .search-box {
    max-width: 900px; margin: 0 auto;
    display: flex; gap: 12px; align-items: center;
  }
  .search-input-wrap {
    flex: 1; display: flex; align-items: center;
    border: 2px solid var(--border); border-radius: 14px;
    padding: 0 16px; gap: 10px; transition: border-color .2s;
    background: white;
  }
  .search-input-wrap:focus-within { border-color: var(--orange); }
  .search-input-wrap span { font-size: 20px; }
  .search-input-wrap input {
    flex: 1; border: none; outline: none; font-size: 15px;
    padding: 14px 0; color: var(--dark); background: transparent;
  }
  .search-input-wrap input::placeholder { color: #94A3B8; }
  .search-select {
    border: 2px solid var(--border); border-radius: 14px;
    padding: 14px 16px; font-size: 14px; outline: none;
    font-family: 'Cairo', sans-serif; color: var(--dark);
    background: white; cursor: pointer; min-width: 140px;
    transition: border-color .2s;
  }
  .search-select:focus { border-color: var(--orange); }
  .btn-search {
    background: var(--orange); color: white; border: none;
    padding: 14px 28px; border-radius: 14px; font-size: 15px; font-weight: 700;
    display: flex; align-items: center; gap: 8px; transition: all .2s;
    box-shadow: 0 4px 14px rgba(255,107,0,.3);
    white-space: nowrap;
  }
  .btn-search:hover { background: var(--orange-l); transform: translateY(-1px); }

  /* ── CATEGORIES ── */
  .section { padding: 60px 5%; }
  .section-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 32px; }
  .section-title { font-size: 26px; font-weight: 900; color: var(--dark); }
  .section-title span { color: var(--orange); }
  .btn-see-all {
    color: var(--orange); background: var(--orange-dim); border: none;
    padding: 8px 18px; border-radius: 10px; font-size: 13px; font-weight: 700;
    transition: all .2s;
  }
  .btn-see-all:hover { background: var(--orange); color: white; }

  .cats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; }
  .cat-card {
    border-radius: 22px; overflow: hidden; cursor: pointer;
    position: relative; aspect-ratio: 4/3;
    transition: transform .25s, box-shadow .25s;
    box-shadow: 0 4px 20px rgba(0,0,0,.1);
  }
  .cat-card:hover { transform: translateY(-6px); box-shadow: 0 16px 40px rgba(0,0,0,.18); }
  .cat-card-bg { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 80px; }
  .cat-card-overlay {
    position: absolute; inset: 0;
    background: linear-gradient(0deg, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 60%, transparent 100%);
  }
  .cat-card-info { position: absolute; bottom: 0; left: 0; right: 0; padding: 22px; }
  .cat-card-name { color: white; font-size: 22px; font-weight: 800; }
  .cat-card-count { color: rgba(255,255,255,.7); font-size: 13px; margin-top: 4px; font-weight: 600; }
  .cat-card-btn {
    display: inline-flex; align-items: center; gap: 6px;
    background: var(--orange); color: white; border: none;
    padding: 7px 16px; border-radius: 20px; font-size: 12px; font-weight: 700;
    margin-top: 10px; transition: all .2s;
  }
  .cat-card:hover .cat-card-btn { background: white; color: var(--orange); }

  /* ── ADS GRID ── */
  .ads-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 22px; }
  .ad-card {
    background: white; border-radius: 20px; overflow: hidden;
    box-shadow: 0 2px 14px rgba(0,0,0,.07);
    transition: transform .22s, box-shadow .22s;
    cursor: pointer;
  }
  .ad-card:hover { transform: translateY(-5px); box-shadow: 0 14px 36px rgba(0,0,0,.13); }
  .ad-img {
    height: 190px; display: flex; align-items: center; justify-content: center;
    font-size: 80px; position: relative;
  }
  .ad-badge {
    position: absolute; top: 12px; right: 12px;
    padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 700;
  }
  .badge-featured { background: #FFF7ED; color: #EA580C; border: 1px solid #FED7AA; }
  .badge-new      { background: #F0FDF4; color: #16A34A; border: 1px solid #BBF7D0; }
  .badge-used     { background: #F8FAFC; color: #64748B; border: 1px solid #CBD5E1; }
  .badge-sale     { background: #EFF6FF; color: #2563EB; border: 1px solid #BFDBFE; }
  .badge-rent     { background: #FFF7ED; color: #EA580C; border: 1px solid #FED7AA; }
  .heart-btn {
    position: absolute; top: 12px; left: 12px;
    width: 34px; height: 34px; border-radius: 50%;
    background: white; border: none; font-size: 16px;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 2px 10px rgba(0,0,0,.12); transition: transform .15s;
  }
  .heart-btn:hover { transform: scale(1.15); }
  .ad-body { padding: 16px; }
  .ad-title { font-size: 15px; font-weight: 700; color: var(--dark); margin-bottom: 6px; }
  .ad-meta { display: flex; gap: 12px; color: var(--gray); font-size: 12px; margin-bottom: 12px; flex-wrap: wrap; }
  .ad-footer { display: flex; justify-content: space-between; align-items: center; }
  .ad-price { font-size: 20px; font-weight: 900; color: var(--orange); }
  .ad-price small { font-size: 12px; color: var(--gray); font-weight: 600; }
  .btn-contact {
    background: var(--orange); color: white; border: none;
    padding: 7px 18px; border-radius: 20px; font-size: 12px; font-weight: 700;
    transition: all .2s;
  }
  .btn-contact:hover { background: var(--orange-l); transform: scale(1.04); }

  /* ── BANNER ── */
  .banner-section { padding: 0 5% 60px; }
  .banner-inner {
    background: linear-gradient(135deg, var(--orange) 0%, #C94400 100%);
    border-radius: 28px; padding: 50px 60px;
    display: flex; align-items: center; justify-content: space-between;
    gap: 30px; position: relative; overflow: hidden;
    box-shadow: 0 20px 50px rgba(255,107,0,.35);
  }
  .banner-inner::before {
    content: '';
    position: absolute; top: -60px; left: -60px;
    width: 300px; height: 300px;
    background: rgba(255,255,255,0.07); border-radius: 50%;
  }
  .banner-text { position: relative; }
  .banner-text h2 { font-size: clamp(22px, 3vw, 36px); font-weight: 900; color: white; margin-bottom: 10px; }
  .banner-text p { color: rgba(255,255,255,.8); font-size: 15px; max-width: 440px; line-height: 1.6; }
  .banner-btns { display: flex; gap: 12px; margin-top: 24px; flex-wrap: wrap; }
  .btn-banner-white {
    background: white; color: var(--orange); border: none;
    padding: 12px 28px; border-radius: 12px; font-size: 14px; font-weight: 800;
    transition: all .2s;
  }
  .btn-banner-white:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(0,0,0,.15); }
  .btn-banner-outline {
    background: rgba(255,255,255,.15); color: white;
    border: 1.5px solid rgba(255,255,255,.4);
    padding: 12px 28px; border-radius: 12px; font-size: 14px; font-weight: 600;
    transition: all .2s;
  }
  .btn-banner-outline:hover { background: rgba(255,255,255,.25); }
  .banner-emoji { font-size: 100px; position: relative; z-index: 1; line-height: 1; flex-shrink: 0; }

  /* ── HOW IT WORKS ── */
  .how-section { background: var(--dark2); padding: 70px 5%; }
  .how-section .section-title { color: white; }
  .steps-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 28px; margin-top: 40px; }
  .step-card {
    text-align: center; padding: 32px 24px;
    background: rgba(255,255,255,.05); border-radius: 20px;
    border: 1px solid rgba(255,255,255,.08); transition: all .25s;
  }
  .step-card:hover { background: rgba(255,107,0,.08); border-color: rgba(255,107,0,.2); transform: translateY(-4px); }
  .step-num {
    width: 52px; height: 52px; border-radius: 50%;
    background: var(--orange); color: white; font-size: 20px; font-weight: 900;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 16px;
  }
  .step-emoji { font-size: 36px; margin-bottom: 14px; }
  .step-title { color: white; font-size: 17px; font-weight: 700; margin-bottom: 8px; }
  .step-desc { color: rgba(255,255,255,.55); font-size: 13px; line-height: 1.7; }

  /* ── FILTERS TABS ── */
  .filter-tabs { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 28px; }
  .filter-tab {
    padding: 8px 20px; border-radius: 20px; font-size: 13px; font-weight: 600;
    border: 1.5px solid var(--border); background: white; color: var(--gray);
    transition: all .18s;
  }
  .filter-tab:hover { border-color: var(--orange); color: var(--orange); }
  .filter-tab.active { background: var(--orange); color: white; border-color: var(--orange); }

  /* ── FOOTER ── */
  footer {
    background: var(--dark3); padding: 60px 5% 30px;
    border-top: 1px solid rgba(255,255,255,.05);
  }
  .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 40px; }
  .footer-brand p { color: rgba(255,255,255,.5); font-size: 14px; line-height: 1.7; margin-top: 12px; max-width: 280px; }
  .footer-social { display: flex; gap: 10px; margin-top: 18px; }
  .social-btn {
    width: 38px; height: 38px; border-radius: 10px;
    background: rgba(255,255,255,.07); color: white; font-size: 16px;
    display: flex; align-items: center; justify-content: center;
    border: 1px solid rgba(255,255,255,.08); transition: all .2s;
  }
  .social-btn:hover { background: var(--orange); border-color: var(--orange); }
  .footer-col h4 { color: white; font-size: 15px; font-weight: 700; margin-bottom: 16px; }
  .footer-col a { display: block; color: rgba(255,255,255,.5); font-size: 13px; margin-bottom: 10px; transition: color .2s; }
  .footer-col a:hover { color: var(--orange); }
  .footer-bottom {
    border-top: 1px solid rgba(255,255,255,.06);
    padding-top: 24px; display: flex; justify-content: space-between; align-items: center; flex-wrap: gap;
  }
  .footer-bottom p { color: rgba(255,255,255,.35); font-size: 13px; }

  /* ── MODAL ── */
  .modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,.55);
    backdrop-filter: blur(4px); z-index: 2000;
    display: flex; align-items: center; justify-content: center; padding: 20px;
    opacity: 0; pointer-events: none; transition: opacity .25s;
  }
  .modal-overlay.open { opacity: 1; pointer-events: all; }
  .modal {
    background: white; border-radius: 24px; width: 100%; max-width: 480px;
    padding: 36px; position: relative;
    transform: translateY(30px); transition: transform .25s;
    max-height: 90vh; overflow-y: auto;
  }
  .modal-overlay.open .modal { transform: translateY(0); }
  .modal-close {
    position: absolute; top: 16px; left: 16px;
    width: 34px; height: 34px; border-radius: 50%;
    background: var(--gray-l); border: none; font-size: 16px;
    display: flex; align-items: center; justify-content: center; cursor: pointer;
    transition: background .15s;
  }
  .modal-close:hover { background: var(--border); }
  .modal h2 { font-size: 22px; font-weight: 800; color: var(--dark); margin-bottom: 6px; }
  .modal p { color: var(--gray); font-size: 14px; margin-bottom: 28px; }
  .form-group { margin-bottom: 18px; }
  .form-label { display: block; font-size: 13px; font-weight: 600; color: var(--dark); margin-bottom: 7px; }
  .form-input {
    width: 100%; border: 1.5px solid var(--border); border-radius: 12px;
    padding: 12px 16px; font-size: 14px; outline: none; transition: border-color .2s;
    color: var(--dark); background: white;
  }
  .form-input:focus { border-color: var(--orange); }
  .btn-full {
    width: 100%; background: var(--orange); color: white; border: none;
    padding: 14px; border-radius: 12px; font-size: 15px; font-weight: 700;
    transition: all .2s; box-shadow: 0 6px 18px rgba(255,107,0,.3);
  }
  .btn-full:hover { background: var(--orange-l); transform: translateY(-1px); }

  /* ── ADD AD WIZARD ── */
  .wizard-steps { display: flex; gap: 0; margin-bottom: 28px; }
  .w-step { flex: 1; display: flex; align-items: center; }
  .w-step-circle {
    width: 32px; height: 32px; border-radius: 50%; flex-shrink: 0;
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 800; transition: all .25s;
  }
  .w-step-line { flex: 1; height: 2px; transition: background .25s; }
  .w-step.done .w-step-circle { background: var(--orange); color: white; }
  .w-step.active .w-step-circle { background: var(--orange); color: white; box-shadow: 0 0 0 4px rgba(255,107,0,.2); }
  .w-step.pending .w-step-circle { background: #E2E8F0; color: var(--gray); }
  .w-step.done .w-step-line { background: var(--orange); }
  .w-step.pending .w-step-line { background: #E2E8F0; }
  .cat-option {
    display: flex; align-items: center; gap: 16px;
    border: 2px solid var(--border); border-radius: 16px;
    padding: 18px 20px; margin-bottom: 12px; cursor: pointer;
    transition: all .18s;
  }
  .cat-option:hover, .cat-option.selected { border-color: var(--orange); background: var(--orange-dim); }
  .cat-option-icon { width: 54px; height: 54px; border-radius: 14px; display: flex; align-items: center; justify-content: center; font-size: 28px; flex-shrink: 0; }
  .cat-option-name { font-size: 16px; font-weight: 700; color: var(--dark); }
  .cat-option-desc { font-size: 12px; color: var(--gray); margin-top: 2px; }
  .plan-card {
    display: flex; justify-content: space-between; align-items: center;
    border: 2px solid var(--border); border-radius: 16px;
    padding: 18px 20px; margin-bottom: 12px; cursor: pointer; transition: all .18s;
  }
  .plan-card:hover { border-color: var(--orange); }
  .plan-card.hot { border-color: var(--orange); background: var(--orange-dim); }
  .plan-price { font-size: 22px; font-weight: 900; color: var(--dark); }
  .plan-card.hot .plan-price { color: var(--orange); }

  /* ── TOAST ── */
  .toast {
    position: fixed; bottom: 30px; left: 50%; transform: translateX(-50%) translateY(80px);
    background: var(--dark); color: white; padding: 14px 24px; border-radius: 14px;
    font-size: 14px; font-weight: 600; z-index: 3000;
    box-shadow: 0 10px 30px rgba(0,0,0,.25); transition: transform .3s;
    display: flex; align-items: center; gap: 10px;
  }
  .toast.show { transform: translateX(-50%) translateY(0); }

  /* ── ANIMATIONS ── */
  @keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeDown { from{opacity:0;transform:translateY(-14px)} to{opacity:1;transform:translateY(0)} }
  .reveal { opacity:0; transform:translateY(24px); transition: opacity .6s ease, transform .6s ease; }
  .reveal.visible { opacity:1; transform:translateY(0); }

  /* ── RESPONSIVE ── */
  @media(max-width: 900px) {
    .cats-grid { grid-template-columns: 1fr; }
    .footer-grid { grid-template-columns: 1fr 1fr; }
    .banner-emoji { display: none; }
    .banner-inner { padding: 36px 28px; }
    .nav-links { display: none; }
  }
  @media(max-width: 600px) {
    .search-box { flex-direction: column; }
    .footer-grid { grid-template-columns: 1fr; }
    .hero-stats { gap: 22px; }
    .ads-grid { grid-template-columns: 1fr; }
  }
</style>
</head>
<body>

<!-- ══ NAVBAR ══ -->
<nav class="navbar">
  <div class="logo">
    <div class="logo-dot"></div>
    دزه <span>سوق</span>
  </div>
  <div class="nav-links">
    <button class="nav-link active" onclick="scrollTo('#home')">الرئيسية</button>
    <button class="nav-link" onclick="filterSection('cars')">سيارات</button>
    <button class="nav-link" onclick="filterSection('phones')">هواتف</button>
    <button class="nav-link" onclick="filterSection('realestate')">عقارات</button>
  </div>
  <div class="nav-actions">
    <button class="btn-nav-outline" onclick="openModal('login')">تسجيل الدخول</button>
    <button class="btn-nav-solid" onclick="openModal('add')">+ أضف إعلان</button>
  </div>
</nav>

<!-- ══ HERO ══ -->
<section class="hero" id="home">
  <div class="hero-grid"></div>
  <div style="position:relative;z-index:1;max-width:800px">
    <div class="hero-badge">🔥 السوق الرقمي الأول في العراق</div>
    <h1>اشتري وبع بكل <em>سهولة وأمان</em></h1>
    <p>منصة متكاملة لبيع وشراء السيارات والهواتف والعقارات. آلاف الإعلانات يومياً بأسعار تنافسية.</p>
    <div class="hero-btns">
      <button class="btn-hero-primary" onclick="document.getElementById('ads').scrollIntoView({behavior:'smooth'})">تصفح الإعلانات</button>
      <button class="btn-hero-secondary" onclick="openModal('add')">+ أضف إعلانك مجاناً</button>
    </div>
    <div class="hero-stats">
      <div class="stat-item"><div class="stat-num">5,100+</div><div class="stat-lbl">إعلان نشط</div></div>
      <div class="stat-item"><div class="stat-num">12,000+</div><div class="stat-lbl">مستخدم مسجل</div></div>
      <div class="stat-item"><div class="stat-num">3</div><div class="stat-lbl">أقسام رئيسية</div></div>
      <div class="stat-item"><div class="stat-num">98%</div><div class="stat-lbl">رضا المستخدمين</div></div>
    </div>
  </div>
</section>

<!-- ══ SEARCH ══ -->
<section class="search-section">
  <div class="search-box">
    <div class="search-input-wrap">
      <span>🔍</span>
      <input type="text" placeholder="ابحث عن سيارة، هاتف، أو عقار..." id="mainSearch">
    </div>
    <select class="search-select" id="catSelect">
      <option value="">كل الأقسام</option>
      <option value="cars">🚗 سيارات</option>
      <option value="phones">📱 هواتف</option>
      <option value="realestate">🏢 عقارات</option>
    </select>
    <button class="btn-search" onclick="doSearch()">🔍 بحث</button>
  </div>
</section>

<!-- ══ CATEGORIES ══ -->
<section class="section reveal" id="categories">
  <div class="section-header">
    <h2 class="section-title">تصفح <span>الأقسام</span></h2>
  </div>
  <div class="cats-grid">
    <div class="cat-card" onclick="filterSection('cars')" style="background:linear-gradient(135deg,#1A1A2E,#16213E)">
      <div class="cat-card-bg">🚗</div>
      <div class="cat-card-overlay"></div>
      <div class="cat-card-info">
        <div class="cat-card-name">سوق السيارات</div>
        <div class="cat-card-count">2,340 إعلان نشط</div>
        <button class="cat-card-btn">تصفح الآن ←</button>
      </div>
    </div>
    <div class="cat-card" onclick="filterSection('phones')" style="background:linear-gradient(135deg,#0D1B3E,#1E3A5F)">
      <div class="cat-card-bg">📱</div>
      <div class="cat-card-overlay"></div>
      <div class="cat-card-info">
        <div class="cat-card-name">سوق الهواتف</div>
        <div class="cat-card-count">1,820 إعلان نشط</div>
        <button class="cat-card-btn">تصفح الآن ←</button>
      </div>
    </div>
    <div class="cat-card" onclick="filterSection('realestate')" style="background:linear-gradient(135deg,#091C39,#0F3460)">
      <div class="cat-card-bg">🏢</div>
      <div class="cat-card-overlay"></div>
      <div class="cat-card-info">
        <div class="cat-card-name">سوق العقارات</div>
        <div class="cat-card-count">945 إعلان نشط</div>
        <button class="cat-card-btn">تصفح الآن ←</button>
      </div>
    </div>
  </div>
</section>

<!-- ══ ADS ══ -->
<section class="section reveal" id="ads" style="padding-top:20px">
  <div class="section-header">
    <h2 class="section-title">أحدث <span>الإعلانات</span></h2>
    <button class="btn-see-all" onclick="openModal('add')">+ أضف إعلانك</button>
  </div>

  <div class="filter-tabs">
    <button class="filter-tab active" onclick="setFilter(this,'all')">الكل</button>
    <button class="filter-tab" onclick="setFilter(this,'cars')">🚗 سيارات</button>
    <button class="filter-tab" onclick="setFilter(this,'phones')">📱 هواتف</button>
    <button class="filter-tab" onclick="setFilter(this,'realestate')">🏢 عقارات</button>
    <button class="filter-tab" onclick="setFilter(this,'featured')">⭐ مميزة</button>
  </div>

  <div class="ads-grid" id="adsGrid"></div>
</section>

<!-- ══ BANNER ══ -->
<section class="banner-section reveal">
  <div class="banner-inner">
    <div class="banner-text">
      <h2>ابدأ بيعك اليوم — مجاناً تماماً!</h2>
      <p>أضف إعلانك الأول خلال دقيقتين فقط. صور، وصف، وسعر — وابدأ تلقي الاتصالات فوراً.</p>
      <div class="banner-btns">
        <button class="btn-banner-white" onclick="openModal('add')">أضف إعلانك الآن</button>
        <button class="btn-banner-outline" onclick="openModal('login')">إنشاء حساب مجاني</button>
      </div>
    </div>
    <div class="banner-emoji">📢</div>
  </div>
</section>

<!-- ══ HOW IT WORKS ══ -->
<section class="how-section reveal">
  <div style="text-align:center;margin-bottom:10px">
    <h2 class="section-title" style="color:white">كيف يعمل <span>دزه سوق</span>؟</h2>
    <p style="color:rgba(255,255,255,.5);margin-top:10px;font-size:15px">أربع خطوات بسيطة وأنت جاهز</p>
  </div>
  <div class="steps-grid">
    <div class="step-card">
      <div class="step-emoji">📝</div>
      <div class="step-num">1</div>
      <div class="step-title">أنشئ حسابك</div>
      <div class="step-desc">سجّل بالهاتف أو البريد الإلكتروني في أقل من دقيقة</div>
    </div>
    <div class="step-card">
      <div class="step-emoji">📸</div>
      <div class="step-num">2</div>
      <div class="step-title">أضف إعلانك</div>
      <div class="step-desc">التقط صوراً واكتب وصفاً وحدد السعر بكل سهولة</div>
    </div>
    <div class="step-card">
      <div class="step-emoji">💬</div>
      <div class="step-num">3</div>
      <div class="step-title">تواصل مع المشترين</div>
      <div class="step-desc">تلقَّ رسائل مباشرة من المهتمين عبر نظام المراسلة</div>
    </div>
    <div class="step-card">
      <div class="step-emoji">🤝</div>
      <div class="step-num">4</div>
      <div class="step-title">أتم الصفقة</div>
      <div class="step-desc">لتق بالمشتري وأتم البيع أو الإيجار بأمان تام</div>
    </div>
  </div>
</section>

<!-- ══ FOOTER ══ -->
<footer>
  <div class="footer-grid">
    <div class="footer-brand">
      <div class="logo" style="font-size:20px">دزه <span>سوق</span></div>
      <p>سوق إلكتروني متكامل للسيارات والهواتف والعقارات في العراق. نربط البائعين بالمشترين بكل أمان وسهولة.</p>
      <div class="footer-social">
        <a class="social-btn" href="#">f</a>
        <a class="social-btn" href="#">t</a>
        <a class="social-btn" href="#">in</a>
        <a class="social-btn" href="#">📸</a>
      </div>
    </div>
    <div class="footer-col">
      <h4>الأقسام</h4>
      <a href="#" onclick="filterSection('cars')">سوق السيارات</a>
      <a href="#" onclick="filterSection('phones')">سوق الهواتف</a>
      <a href="#" onclick="filterSection('realestate')">سوق العقارات</a>
    </div>
    <div class="footer-col">
      <h4>الشركة</h4>
      <a href="#">من نحن</a>
      <a href="#">تواصل معنا</a>
      <a href="#">سياسة الخصوصية</a>
      <a href="#">شروط الاستخدام</a>
    </div>
    <div class="footer-col">
      <h4>الدعم</h4>
      <a href="#">مركز المساعدة</a>
      <a href="#">الأسئلة الشائعة</a>
      <a href="#">الإبلاغ عن مشكلة</a>
      <a href="#">اقتراحات</a>
    </div>
  </div>
  <div class="footer-bottom">
    <p>© 2025 دزه سوق — جميع الحقوق محفوظة</p>
    <p style="color:rgba(255,255,255,.25)">صُنع بـ ❤️ في العراق</p>
  </div>
</footer>

<!-- ══ MODAL: LOGIN ══ -->
<div class="modal-overlay" id="modal-login" onclick="closeModal(event,'login')">
  <div class="modal">
    <button class="modal-close" onclick="closeModalById('login')">✕</button>
    <h2>تسجيل الدخول</h2>
    <p>مرحباً بك مجدداً في دزه سوق</p>
    <div class="form-group">
      <label class="form-label">رقم الهاتف أو البريد</label>
      <input class="form-input" type="text" placeholder="+964 7XX XXX XXXX">
    </div>
    <div class="form-group">
      <label class="form-label">كلمة المرور</label>
      <input class="form-input" type="password" placeholder="أدخل كلمة المرور">
    </div>
    <button class="btn-full" onclick="showToast('✅ تم تسجيل الدخول بنجاح!');closeModalById('login')">تسجيل الدخول</button>
    <p style="text-align:center;margin-top:16px;color:var(--gray);font-size:13px">
      ليس لديك حساب؟ <a href="#" style="color:var(--orange);font-weight:700" onclick="closeModalById('login');openModal('register')">إنشاء حساب</a>
    </p>
  </div>
</div>

<!-- ══ MODAL: REGISTER ══ -->
<div class="modal-overlay" id="modal-register" onclick="closeModal(event,'register')">
  <div class="modal">
    <button class="modal-close" onclick="closeModalById('register')">✕</button>
    <h2>إنشاء حساب جديد</h2>
    <p>انضم إلى آلاف البائعين والمشترين</p>
    <div class="form-group">
      <label class="form-label">الاسم الكامل</label>
      <input class="form-input" type="text" placeholder="أدخل اسمك الكامل">
    </div>
    <div class="form-group">
      <label class="form-label">رقم الهاتف</label>
      <input class="form-input" type="text" placeholder="+964 7XX XXX XXXX">
    </div>
    <div class="form-group">
      <label class="form-label">البريد الإلكتروني</label>
      <input class="form-input" type="email" placeholder="example@email.com">
    </div>
    <div class="form-group">
      <label class="form-label">كلمة المرور</label>
      <input class="form-input" type="password" placeholder="أدخل كلمة مرور قوية">
    </div>
    <button class="btn-full" onclick="showToast('🎉 تم إنشاء حسابك بنجاح!');closeModalById('register')">إنشاء الحساب</button>
  </div>
</div>

<!-- ══ MODAL: ADD AD ══ -->
<div class="modal-overlay" id="modal-add" onclick="closeModal(event,'add')">
  <div class="modal">
    <button class="modal-close" onclick="closeModalById('add');resetWizard()">✕</button>
    <h2>إضافة إعلان جديد</h2>
    <p id="wizardSubtitle">اختر قسم الإعلان للبدء</p>

    <!-- Steps indicator -->
    <div class="wizard-steps" id="wizardSteps">
      <div class="w-step active" id="ws1"><div class="w-step-circle">1</div><div class="w-step-line"></div></div>
      <div class="w-step pending" id="ws2"><div class="w-step-circle">2</div><div class="w-step-line"></div></div>
      <div class="w-step pending" id="ws3"><div class="w-step-circle">3</div><div class="w-step-line"></div></div>
      <div class="w-step pending" id="ws4"><div class="w-step-circle" style="width:32px;height:32px">4</div></div>
    </div>

    <!-- Step 1: Category -->
    <div id="step1">
      <div class="cat-option" id="opt-cars" onclick="selectCat('cars')">
        <div class="cat-option-icon" style="background:#FEF9C3">🚗</div>
        <div><div class="cat-option-name">سيارات</div><div class="cat-option-desc">بيع سيارتك الجديدة أو المستعملة</div></div>
      </div>
      <div class="cat-option" id="opt-phones" onclick="selectCat('phones')">
        <div class="cat-option-icon" style="background:#DBEAFE">📱</div>
        <div><div class="cat-option-name">هواتف وإكسسوارات</div><div class="cat-option-desc">أجهزة جديدة ومستعملة وملحقات</div></div>
      </div>
      <div class="cat-option" id="opt-realestate" onclick="selectCat('realestate')">
        <div class="cat-option-icon" style="background:#DCFCE7">🏢</div>
        <div><div class="cat-option-name">عقارات</div><div class="cat-option-desc">بيع أو إيجار بيوت وشقق وأراضي</div></div>
      </div>
    </div>

    <!-- Step 2: Details -->
    <div id="step2" style="display:none">
      <div class="form-group">
        <label class="form-label">عنوان الإعلان</label>
        <input class="form-input" type="text" placeholder="مثال: تويوتا كامري 2022 فل كامل">
      </div>
      <div class="form-group">
        <label class="form-label">السعر (دولار $)</label>
        <input class="form-input" type="number" placeholder="أدخل السعر">
      </div>
      <div class="form-group">
        <label class="form-label">المدينة والمنطقة</label>
        <input class="form-input" type="text" placeholder="مثال: بغداد — الكرادة">
      </div>
      <div class="form-group">
        <label class="form-label">وصف الإعلان</label>
        <textarea class="form-input" rows="3" placeholder="اكتب وصفاً مفصلاً..." style="resize:none"></textarea>
      </div>
      <div style="display:flex;gap:10px">
        <button class="btn-full" style="background:var(--gray-l);color:var(--dark);box-shadow:none;flex:1" onclick="goStep(1)">رجوع</button>
        <button class="btn-full" style="flex:2" onclick="goStep(3)">التالي ←</button>
      </div>
    </div>

    <!-- Step 3: Photos -->
    <div id="step3" style="display:none">
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:16px">
        <div onclick="showToast('📷 جاري فتح الكاميرا...')" style="aspect-ratio:1;background:var(--orange-dim);border:2px dashed var(--orange);border-radius:14px;display:flex;flex-direction:column;align-items:center;justify-content:center;cursor:pointer">
          <span style="font-size:24px">📷</span>
          <span style="font-size:11px;color:var(--orange);font-weight:700;margin-top:4px">إضافة</span>
        </div>
        <div style="aspect-ratio:1;background:var(--gray-l);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:28px">🖼️</div>
        <div style="aspect-ratio:1;background:var(--gray-l);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:28px">🖼️</div>
        <div style="aspect-ratio:1;background:var(--gray-l);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:28px">🖼️</div>
        <div style="aspect-ratio:1;background:var(--gray-l);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:28px">🖼️</div>
        <div style="aspect-ratio:1;background:var(--gray-l);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:28px">🖼️</div>
      </div>
      <div style="background:var(--gray-l);border:1.5px dashed var(--border);border-radius:14px;padding:20px;text-align:center;margin-bottom:16px;cursor:pointer" onclick="showToast('🎥 جاري رفع الفيديو...')">
        <div style="font-size:32px;margin-bottom:6px">🎥</div>
        <div style="font-weight:700;color:var(--dark);font-size:14px">أضف فيديو (اختياري)</div>
        <div style="color:var(--gray);font-size:12px;margin-top:3px">حتى 60 ثانية · MP4</div>
      </div>
      <div style="display:flex;gap:10px">
        <button class="btn-full" style="background:var(--gray-l);color:var(--dark);box-shadow:none;flex:1" onclick="goStep(2)">رجوع</button>
        <button class="btn-full" style="flex:2" onclick="goStep(4)">التالي ←</button>
      </div>
    </div>

    <!-- Step 4: Plan -->
    <div id="step4" style="display:none">
      <div class="plan-card" onclick="selectPlan(this)">
        <div style="display:flex;align-items:center;gap:12px">
          <span style="font-size:26px">✅</span>
          <div><div style="font-weight:700;color:var(--dark)">مجاني</div><div style="font-size:12px;color:var(--gray)">30 يوم · عرض عادي</div></div>
        </div>
        <div class="plan-price">0$</div>
      </div>
      <div class="plan-card" onclick="selectPlan(this)">
        <div style="display:flex;align-items:center;gap:12px">
          <span style="font-size:26px">⭐</span>
          <div><div style="font-weight:700;color:var(--dark)">مميز</div><div style="font-size:12px;color:var(--gray)">30 يوم · ظهور أعلى في النتائج</div></div>
        </div>
        <div class="plan-price">5$</div>
      </div>
      <div class="plan-card hot" onclick="selectPlan(this)">
        <div style="display:flex;align-items:center;gap:12px">
          <span style="font-size:26px">🚀</span>
          <div><div style="font-weight:700;color:var(--orange)">بريميوم 🔥</div><div style="font-size:12px;color:var(--gray)">60 يوم · بانر + إشعارات للمستخدمين</div></div>
        </div>
        <div class="plan-price" style="color:var(--orange)">15$</div>
      </div>
      <button class="btn-full" style="margin-top:8px" onclick="publishAd()">🚀 انشر الإعلان الآن</button>
    </div>
  </div>
</div>

<!-- ══ TOAST ══ -->
<div class="toast" id="toast">✅ تم!</div>

<script>
// ── DATA ──
const ADS = [
  { id:1, cat:'cars',       title:'تويوتا كامري 2022',        price:'45,000', unit:'$',    loc:'بغداد · الكرادة',   info:'32,000 كم · مستعملة',  badge:'featured', bg:'#FEF9C3', emoji:'🚗' },
  { id:2, cat:'cars',       title:'كيا سبورتاج 2023',         price:'62,000', unit:'$',    loc:'أربيل · عنكاوا',    info:'0 كم · جديدة',          badge:'new',      bg:'#DBEAFE', emoji:'🚙' },
  { id:3, cat:'cars',       title:'هيونداي توسان 2021',       price:'38,500', unit:'$',    loc:'البصرة',             info:'55,000 كم · مستعملة',  badge:'',         bg:'#DCFCE7', emoji:'🚘' },
  { id:4, cat:'cars',       title:'BMW 3 Series 2020',        price:'72,000', unit:'$',    loc:'بغداد · المنصور',   info:'48,000 كم · مستعملة',  badge:'featured', bg:'#EDE9FE', emoji:'🏎️' },
  { id:5, cat:'phones',     title:'iPhone 15 Pro Max',        price:'1,850',  unit:'$',    loc:'بغداد',              info:'256GB · تيتانيوم',     badge:'new',      bg:'#F0F9FF', emoji:'📱' },
  { id:6, cat:'phones',     title:'Samsung Galaxy S24 Ultra', price:'950',    unit:'$',    loc:'أربيل',              info:'128GB · أسود',         badge:'used',     bg:'#F0FDF4', emoji:'📲' },
  { id:7, cat:'phones',     title:'Xiaomi 14 Ultra',          price:'780',    unit:'$',    loc:'النجف',              info:'512GB · أبيض',         badge:'used',     bg:'#FFF7ED', emoji:'📱' },
  { id:8, cat:'phones',     title:'OnePlus 12',               price:'620',    unit:'$',    loc:'البصرة',             info:'256GB · أخضر',         badge:'new',      bg:'#ECFDF5', emoji:'📱' },
  { id:9, cat:'realestate', title:'فيلا فاخرة · حي الجامعة', price:'250,000',unit:'$',    loc:'بغداد',              info:'فيلا · 450م²  · 5 غرف',badge:'sale',     bg:'#1A1A2E', emoji:'🏡' },
  { id:10,cat:'realestate', title:'شقة 3 غرف · برج أربيل',   price:'1,200',  unit:'$/شهر',loc:'أربيل',              info:'شقة · 150م² · للإيجار', badge:'rent',    bg:'#0F1C3F', emoji:'🏢' },
  { id:11,cat:'realestate', title:'قطعة أرض تجارية',          price:'85,000', unit:'$',    loc:'كركوك',              info:'أرض · 800م²',           badge:'sale',    bg:'#0A1628', emoji:'🏗️' },
];

let currentFilter = 'all';
let favorites = new Set();

function badgeClass(b) {
  const m = { featured:'badge-featured', new:'badge-new', used:'badge-used', sale:'badge-sale', rent:'badge-rent' };
  return m[b] || '';
}
function badgeText(b) {
  const m = { featured:'مميز', new:'جديد', used:'مستعمل', sale:'للبيع', rent:'للإيجار' };
  return m[b] || '';
}

function renderAds(filter = 'all') {
  const grid = document.getElementById('adsGrid');
  const filtered = filter === 'all' ? ADS : filter === 'featured' ? ADS.filter(a => a.badge === 'featured') : ADS.filter(a => a.cat === filter);
  grid.innerHTML = filtered.map(ad => `
    <div class="ad-card" onclick="showAdDetail(${ad.id})">
      <div class="ad-img" style="background:${ad.cat==='realestate'?'linear-gradient(135deg,'+ad.bg+',#0A1628)':ad.bg}">
        <span style="font-size:72px">${ad.emoji}</span>
        ${ad.badge ? `<span class="ad-badge ${badgeClass(ad.badge)}">${badgeText(ad.badge)}</span>` : ''}
        <button class="heart-btn" onclick="toggleFav(event,${ad.id})" id="heart-${ad.id}">${favorites.has(ad.id)?'❤️':'🤍'}</button>
      </div>
      <div class="ad-body">
        <div class="ad-title">${ad.title}</div>
        <div class="ad-meta">
          <span>📍 ${ad.loc}</span>
          <span>ℹ️ ${ad.info}</span>
        </div>
        <div class="ad-footer">
          <div class="ad-price">${ad.price} <small>${ad.unit}</small></div>
          <button class="btn-contact" onclick="contactAd(event,${ad.id})">تواصل</button>
        </div>
      </div>
    </div>
  `).join('');
}

function toggleFav(e, id) {
  e.stopPropagation();
  if (favorites.has(id)) { favorites.delete(id); showToast('💔 تم إزالته من المفضلة'); }
  else { favorites.add(id); showToast('❤️ تم إضافته للمفضلة'); }
  document.getElementById('heart-'+id).textContent = favorites.has(id) ? '❤️' : '🤍';
}

function contactAd(e, id) {
  e.stopPropagation();
  showToast('💬 جاري فتح المحادثة...');
}

function showAdDetail(id) {
  const ad = ADS.find(a => a.id === id);
  showToast(`🔍 عرض: ${ad.title}`);
}

function setFilter(btn, filter) {
  document.querySelectorAll('.filter-tab').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  currentFilter = filter;
  renderAds(filter);
}

function filterSection(cat) {
  document.getElementById('ads').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    const tabs = document.querySelectorAll('.filter-tab');
    tabs.forEach(t => t.classList.remove('active'));
    const map = { cars:1, phones:2, realestate:3 };
    if (map[cat] !== undefined) tabs[map[cat]].classList.add('active');
    renderAds(cat);
  }, 600);
}

function doSearch() {
  const q = document.getElementById('mainSearch').value.toLowerCase();
  const cat = document.getElementById('catSelect').value;
  document.getElementById('ads').scrollIntoView({ behavior: 'smooth' });
  setTimeout(() => {
    const filtered = ADS.filter(a =>
      (!cat || a.cat === cat) &&
      (!q || a.title.toLowerCase().includes(q) || a.loc.toLowerCase().includes(q))
    );
    const grid = document.getElementById('adsGrid');
    grid.innerHTML = filtered.length ? filtered.map(ad => `
      <div class="ad-card" onclick="showAdDetail(${ad.id})">
        <div class="ad-img" style="background:${ad.cat==='realestate'?'linear-gradient(135deg,'+ad.bg+',#0A1628)':ad.bg}">
          <span style="font-size:72px">${ad.emoji}</span>
          ${ad.badge ? `<span class="ad-badge ${badgeClass(ad.badge)}">${badgeText(ad.badge)}</span>` : ''}
          <button class="heart-btn" onclick="toggleFav(event,${ad.id})" id="heart-${ad.id}">${favorites.has(ad.id)?'❤️':'🤍'}</button>
        </div>
        <div class="ad-body">
          <div class="ad-title">${ad.title}</div>
          <div class="ad-meta"><span>📍 ${ad.loc}</span><span>ℹ️ ${ad.info}</span></div>
          <div class="ad-footer">
            <div class="ad-price">${ad.price} <small>${ad.unit}</small></div>
            <button class="btn-contact" onclick="contactAd(event,${ad.id})">تواصل</button>
          </div>
        </div>
      </div>
    `).join('') : '<p style="color:var(--gray);text-align:center;padding:40px;grid-column:1/-1">لا توجد نتائج مطابقة 😕</p>';
    showToast(`🔍 وجدت ${filtered.length} نتيجة`);
  }, 600);
}

// ── MODALS ──
function openModal(id) {
  document.getElementById('modal-'+id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeModalById(id) {
  document.getElementById('modal-'+id).classList.remove('open');
  document.body.style.overflow = '';
}
function closeModal(e, id) {
  if (e.target === e.currentTarget) closeModalById(id);
}

// ── WIZARD ──
let wStep = 1, selectedCat = null;

function goStep(n) {
  document.getElementById('step'+wStep).style.display = 'none';
  wStep = n;
  document.getElementById('step'+wStep).style.display = 'block';
  // Update step indicators
  for (let i = 1; i <= 4; i++) {
    const el = document.getElementById('ws'+i);
    el.className = 'w-step ' + (i < wStep ? 'done' : i === wStep ? 'active' : 'pending');
  }
  const subtitles = ['اختر قسم الإعلان للبدء','أضف تفاصيل إعلانك','أضف صور ومقاطع مرئية','اختر خطة النشر'];
  document.getElementById('wizardSubtitle').textContent = subtitles[n-1];
}

function selectCat(cat) {
  selectedCat = cat;
  document.querySelectorAll('.cat-option').forEach(o => o.classList.remove('selected'));
  document.getElementById('opt-'+cat).classList.add('selected');
  setTimeout(() => goStep(2), 200);
}

function selectPlan(el) {
  document.querySelectorAll('.plan-card').forEach(c => c.style.outline = 'none');
  el.style.outline = '2px solid var(--orange)';
}

function resetWizard() {
  wStep = 1;
  document.querySelectorAll('[id^="step"]').forEach((s,i) => s.style.display = i===0?'block':'none');
  document.querySelectorAll('.cat-option').forEach(o => o.classList.remove('selected'));
  selectedCat = null;
  for (let i = 1; i <= 4; i++) {
    document.getElementById('ws'+i).className = 'w-step ' + (i===1?'active':'pending');
  }
}

function publishAd() {
  showToast('🚀 تم نشر إعلانك بنجاح!');
  closeModalById('add');
  resetWizard();
}

// ── TOAST ──
let toastTimer;
function showToast(msg) {
  const t = document.getElementById('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2800);
}

// ── SCROLL REVEAL ──
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

// ── SEARCH ENTER KEY ──
document.getElementById('mainSearch').addEventListener('keydown', e => { if (e.key === 'Enter') doSearch(); });

// ── INIT ──
renderAds();
</script>
</body>
</html>
