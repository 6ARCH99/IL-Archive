import * as data from './mock-data.js';

const root = document.getElementById('screen-root');
const bottomNav = document.getElementById('bottom-nav');
const modalRoot = document.getElementById('modal-root');

const state = {
  route: 'splash',
  tab: 'home',
  auth: false,
  onboardingDone: false,
  params: {},
  rewardsTab: 'aktif',
  challengeTab: 'tersedia',
  depositMode: 'drop',
  faqTab: 'faq',
  expandedFaq: -1,
  onboardingPage: 0,
  otpPhone: '+62 812 3456 7890',
  redeemAmount: '',
  selectedEwallet: 'gopay',
};

function navigate(route, params = {}, replace = false) {
  state.route = route;
  state.params = params;
  render();
  if (!replace) window.location.hash = route;
}

function showMainNav(show) {
  bottomNav.classList.toggle('hidden', !show);
}

function setTab(tab) {
  state.tab = tab;
  state.route = tab;
  document.querySelectorAll('.nav-item').forEach((el) => {
    el.classList.toggle('nav-item--active', el.dataset.tab === tab);
  });
  render();
  window.location.hash = tab;
}

function topBar(title, backRoute) {
  const back = backRoute
    ? `<button type="button" class="top-bar__back" data-nav="${backRoute}" aria-label="Kembali">←</button>`
    : '<span class="top-bar__spacer"></span>';
  return `<header class="top-bar">${back}<h1 class="top-bar__title">${title}</h1><span class="top-bar__spacer"></span></header>`;
}

function tabBar3(tabs, active, prefix) {
  return `<div class="tab-bar-3" data-tab-group="${prefix}">${tabs
    .map(
      (t) =>
        `<button type="button" class="tab-bar-3__item${t.id === active ? ' tab-bar-3__item--active' : ''}" data-subtab="${t.id}">${t.label}</button>`
    )
    .join('')}</div>`;
}

// ——— Screens ———

function renderSplash() {
  showMainNav(false);
  root.innerHTML = `
    <div class="screen screen-splash" data-nav="welcome">
      <div class="splash-logo">🌿</div>
      <h1 class="display-large text-on-primary">DAURIN</h1>
      <p class="splash-tagline body-medium text-on-primary">Pilah sampah lebih mudah, dapat reward nyata,<br/>dan lihat dampakmu bagi bumi.</p>
      <p class="splash-version">Tap untuk melanjutkan · v1.0.0</p>
    </div>`;
}

function renderWelcome() {
  showMainNav(false);
  root.innerHTML = `
    <div class="screen screen-welcome">
      <div class="welcome-hero">
        <div class="welcome-logo">🌿</div>
        <h1 class="display-medium">Mulai Perjalanan<br/>Hijau-mu</h1>
        <p class="body-medium text-secondary gap-24" style="margin-top:16px">Pilah sampah lebih mudah, dapat reward nyata,<br/>dan lihat dampakmu bagi bumi</p>
      </div>
      <div class="welcome-actions">
        <button type="button" class="btn-primary" data-nav="login">Masuk</button>
        <button type="button" class="btn-secondary" data-nav="register">Daftar</button>
        <p class="body-small text-center" style="text-align:center;margin-top:8px">Dengan mendaftar, kamu menyetujui <button type="button" class="btn-link" style="display:inline;padding:0;min-height:auto">Syarat & Ketentuan</button>.</p>
      </div>
    </div>`;
}

function renderLogin() {
  showMainNav(false);
  root.innerHTML = `
    <div class="screen screen-auth">
      ${topBar('Masuk', 'welcome')}
      <div class="pad-content">
        <h2 class="heading-large" style="margin-bottom:8px">Selamat Datang Kembali</h2>
        <p class="body-medium text-secondary" style="margin-bottom:24px">Lanjutkan aksi hijaumu hari ini.</p>
        <div class="input-group">
          <label class="input-label">Email atau No. HP</label>
          <input class="input-field" type="text" placeholder="Masukkan Email / no" />
        </div>
        <div class="input-group">
          <label class="input-label">Password</label>
          <input class="input-field" type="password" placeholder="Masukkan Password" />
        </div>
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:24px">
          <label class="body-small" style="display:flex;align-items:center;gap:8px"><input type="checkbox" checked style="accent-color:var(--color-primary)"/> Ingat saya</label>
          <button type="button" class="btn-link" style="min-height:auto;padding:0">Lupa password?</button>
        </div>
        <button type="button" class="btn-primary" data-nav="home" data-auth="1">Masuk</button>
        <div class="divider-or">atau masuk dengan</div>
        <div class="oauth-row">
          <button type="button" class="oauth-btn" data-nav="home" data-auth="1">Google</button>
          <button type="button" class="oauth-btn" data-nav="home" data-auth="1">Facebook</button>
        </div>
        <p class="body-medium text-center" style="text-align:center;margin-top:24px">Belum punya akun? <button type="button" class="btn-link" data-nav="register" style="display:inline;padding:0;min-height:auto">Daftar gratis</button></p>
      </div>
    </div>`;
}

function renderRegister() {
  showMainNav(false);
  root.innerHTML = `
    <div class="screen screen-auth">
      ${topBar('Daftar', 'welcome')}
      <div class="pad-content">
        <h2 class="heading-large">Buat Akun Daurin</h2>
        <p class="body-medium text-secondary" style="margin-bottom:20px">Mulai berkontribusi untuk lingkungan.</p>
        ${['Username', 'Password', 'Email', 'Nomor Handphone', 'Konfirmasi Password']
          .map(
            (l) => `
        <div class="input-group">
          <label class="input-label">${l}</label>
          <input class="input-field" type="${l.includes('Password') ? 'password' : 'text'}" placeholder="Masukkan ${l.includes('Konfirmasi') ? 'Password' : l.replace('Nomor Handphone', 'Nomor Handphone')}" />
        </div>`
          )
          .join('')}
        <div class="checkbox-row">
          <input type="checkbox" id="tc" />
          <label for="tc">Saya setuju dengan <button type="button" class="btn-link" style="display:inline;padding:0;min-height:auto">Syarat & Ketentuan</button> dan Kebijakan Privasi</label>
        </div>
        <button type="button" class="btn-primary" data-nav="otp">Daftar Sekarang</button>
      </div>
    </div>`;
}

function renderOtp() {
  showMainNav(false);
  root.innerHTML = `
    <div class="screen screen-auth">
      ${topBar('Verifikasi', 'register')}
      <div class="pad-content" style="text-align:center">
        <h2 class="heading-large">Verifikasi Telepon</h2>
        <p class="body-medium text-secondary" style="margin:12px 0">Masukkan kode yang kami kirim</p>
        <p class="body-small">Kami telah mengirim kode verifikasi ke<br/><strong>${state.otpPhone}</strong></p>
        <button type="button" class="btn-link" data-nav="register">Ubah nomor HP</button>
        <p class="heading-small" style="margin:24px 0 8px">Masukkan Kode OTP</p>
        <div class="otp-row">
          ${[0, 1, 2, 3, 4, 5].map((i) => `<input class="otp-box" type="text" maxlength="1" inputmode="numeric" data-otp="${i}" />`).join('')}
        </div>
        <p class="body-small" style="margin:16px 0">Kirim ulang kode dalam <strong>00:58</strong></p>
        <button type="button" class="btn-link" disabled>Kirim Ulang Kode</button>
        <button type="button" class="btn-primary gap-24" style="margin-top:32px" data-nav="profile-setup">Verifikasi</button>
      </div>
    </div>`;
  setupOtpInputs();
}

function setupOtpInputs() {
  const boxes = root.querySelectorAll('.otp-box');
  boxes.forEach((box, i) => {
    box.addEventListener('input', () => {
      if (box.value.length === 1 && i < 5) boxes[i + 1].focus();
      if ([...boxes].every((b) => b.value.length === 1)) {
        setTimeout(() => navigate('profile-setup'), 300);
      }
    });
    box.addEventListener('keydown', (e) => {
      if (e.key === 'Backspace' && !box.value && i > 0) boxes[i - 1].focus();
    });
  });
  boxes[0]?.focus();
}

function renderProfileSetup() {
  showMainNav(false);
  root.innerHTML = `
    <div class="screen screen-auth">
      ${topBar('Profil', 'otp')}
      <div class="pad-content" style="text-align:center">
        <h2 class="heading-large">Lengkapi Profile</h2>
        <p class="body-medium text-secondary" style="margin-bottom:20px">Bantu kami personalisasi pengalamanmu</p>
        <div class="profile-avatar" style="margin:0 auto 8px;position:relative">R
          <span style="position:absolute;bottom:0;right:0;background:var(--color-primary);width:28px;height:28px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:14px;border:2px solid white">📷</span>
        </div>
        <p class="body-small" style="margin-bottom:20px">Tap untuk ubah foto</p>
        <div class="input-group" style="text-align:left">
          <label class="input-label">Tanggal Lahir</label>
          <input class="input-field" type="date" />
        </div>
        <div class="input-group" style="text-align:left">
          <label class="input-label">Domisili</label>
          <select class="input-field">${data.domisiliOptions.map((o) => `<option>${o}</option>`).join('')}</select>
        </div>
        <div class="input-group" style="text-align:left">
          <label class="input-label">Jenis Kelamin</label>
          <select class="input-field">${data.genderOptions.map((o) => `<option>${o}</option>`).join('')}</select>
        </div>
        <div class="input-group" style="text-align:left">
          <label class="input-label">Kode referral <span class="body-small">(tidak wajib)</span></label>
          <input class="input-field" placeholder="Dapat kode dari teman?" />
        </div>
        <p class="body-small text-points" style="margin:12px 0">Profil lengkap = +50 poin selamat datang 🎉</p>
        <button type="button" class="btn-primary" data-nav="onboarding">Simpan Profil</button>
      </div>
    </div>`;
}

function renderOnboarding() {
  showMainNav(false);
  const slides = [
    { icon: '📸', title: 'Pilah Sampah\nLebih Mudah', desc: 'Scan sampahmu dengan AI dan langsung tahu cara penanganannya — tanpa bingung lagi.' },
    { icon: '💳', title: 'Dapatkan E-Wallet\nRewards', desc: 'Kumpulkan poin dari setiap sampah yang kamu setorkan dan tukarkan dengan saldo GoPay, OVO, dan DANA.' },
    { icon: '🌍', title: 'Lihat Dampakmu\nuntuk Bumi', desc: 'Pantau berapa kg CO₂ yang kamu cegah setiap bulan. Aksi kecilmu nyata adanya.' },
  ];
  const s = slides[state.onboardingPage];
  const isLast = state.onboardingPage === slides.length - 1;
  root.innerHTML = `
    <div class="screen">
      <button type="button" class="btn-link onboarding-skip" data-nav="home" data-auth="1" data-onboard="1">Lewati</button>
      <div class="onboarding-slide">
        <p class="label-small text-secondary">${state.onboardingPage + 1}/3</p>
        <div class="onboarding-illus">${s.icon}</div>
        <h2 class="display-medium" style="white-space:pre-line">${s.title}</h2>
        <p class="body-large text-secondary" style="margin-top:16px;max-width:300px">${s.desc}</p>
        <div class="page-dots">${slides.map((_, i) => `<span class="page-dot${i === state.onboardingPage ? ' page-dot--active' : ''}"></span>`).join('')}</div>
      </div>
      <div class="onboarding-footer">
        <button type="button" class="btn-primary" id="onboard-next">${isLast ? 'Mulai' : 'Lanjut'}</button>
      </div>
    </div>`;
  document.getElementById('onboard-next')?.addEventListener('click', () => {
    if (isLast) {
      state.onboardingDone = true;
      state.auth = true;
      navigate('home');
    } else {
      state.onboardingPage++;
      renderOnboarding();
    }
  });
}

function renderHome() {
  showMainNav(true);
  const u = data.user;
  const maxChart = Math.max(...data.chartData);
  root.innerHTML = `
    <div class="screen nav-screen">
      <div class="home-header">
        <div class="home-header__row">
          <div>
            <p class="home-header__greeting">Selamat datang,</p>
            <h1 class="home-header__name">${u.name}</h1>
            <div class="streak-badge" style="margin-top:10px">🔥 Streak: ${u.streak} hari berturut-turut</div>
          </div>
          <div class="avatar">${u.initials}</div>
        </div>
      </div>
      <div style="padding-top:20px">
        <div class="stat-row">
          <div class="stat-card">
            <div class="stat-card__label">Total Point</div>
            <div class="stat-card__value">${u.points.toLocaleString('id-ID')}</div>
            <div class="stat-card__delta">+${u.pointsDeltaWeek} poin minggu ini</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__label">CO₂ Bulan Ini</div>
            <div class="stat-card__value">${u.co2Kg} kg</div>
            <div class="stat-card__delta" style="color:var(--color-text-secondary)">dicegah</div>
          </div>
          <div class="stat-card">
            <div class="stat-card__label">Jumlah Setor</div>
            <div class="stat-card__value">${u.depositsMonth}x</div>
            <div class="stat-card__delta" style="color:var(--color-text-secondary)">bulan ini</div>
          </div>
        </div>
        <div class="chart-box gap-24">
          <div class="heading-small">Aktivitas Setor · 7 Hari terakhir</div>
          <div class="chart-bars">
            ${data.chartData.map((v, i) => `<div class="chart-bar${v === maxChart ? ' chart-bar--active' : ''}" style="height:${(v / maxChart) * 100}%" title="${data.chartLabels[i]}"></div>`).join('')}
          </div>
        </div>
        <button type="button" class="action-btn" data-nav="scan">📸 Scan Sampah dengan AI</button>
        <button type="button" class="action-btn" data-nav="deposit-drop">📍 Cari Drop Point Terdekat</button>
        <button type="button" class="action-btn" data-nav="jemput-schedules">🚚 Jadwalkan Penjemputan</button>
        <div class="gap-32" style="display:flex;justify-content:space-between;align-items:center;padding:0 20px 12px">
          <h3 class="heading-medium">Challenge Aktif</h3>
          <button type="button" class="btn-link" data-tab="challenge" style="min-height:auto;padding:0">Lihat Semua</button>
        </div>
        ${data.activeChallenges.map((c) => challengeCardHtml(c)).join('')}
      </div>
    </div>`;
}

function challengeCardHtml(c, showStatus) {
  const pct = Math.round((c.progress / c.target) * 100);
  return `
    <div class="challenge-card" data-nav="challenge">
      <div class="challenge-card__info">
        <div class="challenge-card__title">${c.title}</div>
        <div class="challenge-card__meta">${c.daysLeft ? `${c.daysLeft} hari tersisa` : `${c.days} days`} · + ${c.points} pts</div>
        ${showStatus ? `<span class="text-error body-small">Tidak selesai</span>` : ''}
      </div>
      <div class="progress-ring" style="--pct:${pct}"><div class="progress-ring__inner">${c.progress}/${c.target}</div></div>
    </div>`;
}

function renderProfile() {
  showMainNav(true);
  const u = data.user;
  root.innerHTML = `
    <div class="screen nav-screen">
      <div class="profile-header">
        <div class="profile-avatar">${u.initials}</div>
        <h2 class="heading-medium text-on-primary">${u.username}</h2>
        <div class="level-badge">🌿 ${u.levelTitle} · Level ${u.level}</div>
        <div class="progress-linear"><div class="progress-linear__fill" style="width:${u.levelProgress * 100}%"></div></div>
      </div>
      <div class="stat-row gap-24" style="margin-top:-20px;position:relative;z-index:1">
        <div class="stat-card" style="text-align:center"><div class="stat-card__value text-points">${u.points}</div><div class="stat-card__label">Poin</div></div>
        <div class="stat-card" style="text-align:center"><div class="stat-card__value text-streak">${u.streak}</div><div class="stat-card__label">hari streak</div></div>
        <div class="stat-card" style="text-align:center"><div class="stat-card__value">${u.depositsMonth}</div><div class="stat-card__label">total stor</div></div>
      </div>
      <div class="stat-row" style="margin-top:8px">
        <div class="stat-card"><div class="stat-card__label">CO₂ Bulan Ini</div><div class="stat-card__value">${u.co2Kg} kg</div></div>
        <div class="stat-card"><div class="stat-card__label">Jumlah Setor</div><div class="stat-card__value">${u.depositsMonth}x</div></div>
      </div>
      <div class="equiv-row gap-24">
        <div class="equiv-chip"><div class="equiv-chip__icon">🌳</div><div class="equiv-chip__val">4</div><div class="equiv-chip__unit">pohon</div></div>
        <div class="equiv-chip"><div class="equiv-chip__icon">💧</div><div class="equiv-chip__val">230L</div><div class="equiv-chip__unit">air</div></div>
        <div class="equiv-chip"><div class="equiv-chip__icon">⚡</div><div class="equiv-chip__val">18</div><div class="equiv-chip__unit">kWh</div></div>
      </div>
      <div class="menu-list">
        ${[
          ['👤', 'Data User'],
          ['♻️', 'Riwayat Stor Sampah', 'deposit'],
          ['📊', 'Statistik Dampak Lingkungan'],
          ['🔔', 'Notifikasi'],
          ['⚙️', 'Settings'],
          ['❓', 'Bantuan & FAQ', 'faq'],
          ['🚪', 'Logout', 'welcome'],
        ]
          .map(([icon, label, nav]) => `<button type="button" class="menu-item" ${nav ? `data-nav="${nav}"` : ''} ${label === 'Logout' ? 'data-logout="1"' : ''}><span class="menu-item__icon">${icon}</span>${label}</button>`)
          .join('')}
      </div>
    </div>`;
}

function renderRewards() {
  showMainNav(true);
  const u = data.user;
  const tabs = [
    { id: 'aktif', label: 'Aktif' },
    { id: 'tersedia', label: 'Tersedia' },
    { id: 'selesai', label: 'Selesai' },
  ];
  let content = '';
  if (state.rewardsTab === 'aktif') {
    content = `
      <div class="pad-screen" style="padding-top:8px">
        <label class="input-label">Masukkan Jumlah Poin</label>
        <input class="input-field" type="number" id="redeem-input" placeholder="0" value="${state.redeemAmount}" />
        <p class="body-small text-secondary" style="margin:8px 0 16px">Min. 500 poin · 100 poin = Rp 1.000</p>
        <button type="button" class="btn-primary" id="btn-tukar" style="margin-bottom:20px">Tukar</button>
      </div>
      ${[
        { id: 'gopay', name: 'Gopay', sub: 'Transfer ke Gopay', cls: 'gopay', letter: 'G' },
        { id: 'ovo', name: 'Ovo', sub: 'Transfer ke Ovo', cls: 'ovo', letter: 'O' },
        { id: 'dana', name: 'Dana', sub: 'Transfer ke Dana', cls: 'dana', letter: 'D' },
      ]
        .map(
          (w) => `
      <div class="ewallet-card" data-ewallet="${w.id}">
        <div class="ewallet-card__logo ewallet-card__logo--${w.cls}">${w.letter}</div>
        <div><div class="heading-small">${w.name}</div><div class="body-small">${w.sub}</div></div>
      </div>`
        )
        .join('')}`;
  } else if (state.rewardsTab === 'tersedia') {
    content = data.transactions
      .map(
        (g) => `
      <div class="month-header">${g.month}</div>
      ${g.items
        .map(
          (t) => `
        <div class="tx-item">
          <div class="tx-item__icon tx-item__icon--${t.type}">${t.type === 'earn' ? '🌿' : '🪙'}</div>
          <div class="tx-item__main">
            <div class="body-medium">${t.desc}</div>
            <div class="body-small">${t.status} · ${t.date}</div>
          </div>
          <div class="tx-item__delta tx-item__delta--${t.delta > 0 ? 'pos' : 'neg'}">${t.delta > 0 ? '+' : ''}${t.delta}</div>
        </div>`
        )
        .join('')}`
      )
      .join('');
  } else {
    content = `
      <div class="referral-box">
        <div class="body-small text-secondary">Kode Unikmu</div>
        <div class="referral-code">${u.referralCode}</div>
        <div class="referral-actions">
          <button type="button" class="btn-secondary" style="width:auto;padding:0 20px" id="btn-copy">Salin</button>
          <button type="button" class="btn-primary" style="width:auto;padding:0 20px" id="btn-share">Bagikan</button>
        </div>
        <div class="stat-row" style="margin-top:16px;padding:0">
          <div class="stat-card"><div class="stat-card__value">${u.friendsInvited}</div><div class="stat-card__label">Teman Diajak</div></div>
          <div class="stat-card"><div class="stat-card__value text-points">${u.bonusPoints}</div><div class="stat-card__label">Poin Bonus</div></div>
        </div>
      </div>
      ${data.referralFriends
        .map(
          (f) => `
        <div class="tx-item">
          <div class="avatar" style="width:40px;height:40px;font-size:14px">${f.initial}</div>
          <div class="tx-item__main"><div class="body-medium">${f.name}</div><div class="body-small">${f.date}</div></div>
          <div class="tx-item__delta tx-item__delta--pos">+${f.points}</div>
        </div>`
        )
        .join('')}`;
  }

  root.innerHTML = `
    <div class="screen nav-screen">
      <div class="rewards-header">
        <p class="body-small" style="opacity:0.8">Rewards</p>
        <div class="rewards-header__points">${u.points.toLocaleString('id-ID')}</div>
        <p class="body-small" style="opacity:0.85">Total Poin</p>
        <p class="body-small" style="margin-top:12px;opacity:0.9">Butuh ${u.nextRewardPoints} poin lagi untuk reward Rp ${u.nextRewardIdr.toLocaleString('id-ID')}</p>
        <div class="progress-linear" style="margin-top:12px"><div class="progress-linear__fill" style="width:78%"></div></div>
      </div>
      ${tabBar3(tabs, state.rewardsTab, 'rewards')}
      ${content}
    </div>`;

  document.getElementById('btn-tukar')?.addEventListener('click', showRedeemModal);
  document.getElementById('btn-copy')?.addEventListener('click', () => {
    navigator.clipboard?.writeText(u.referralCode);
    toast('Kode disalin!');
  });
  document.getElementById('btn-share')?.addEventListener('click', () => {
    const text = `Yuk ikut DAURIN! Gunakan kode ${u.referralCode} saat daftar.`;
    if (navigator.share) navigator.share({ title: 'DAURIN', text });
    else navigator.clipboard?.writeText(text);
  });
  document.getElementById('redeem-input')?.addEventListener('input', (e) => {
    state.redeemAmount = e.target.value;
  });
}

function showRedeemModal() {
  const pts = parseInt(state.redeemAmount, 10) || 0;
  const idr = pts * 10;
  modalRoot.innerHTML = `
    <div class="modal-backdrop" id="modal-close">
      <div class="modal-sheet" onclick="event.stopPropagation()">
        <h3 class="heading-medium" style="margin-bottom:12px">Konfirmasi Penukaran</h3>
        <p class="body-medium text-secondary" style="margin-bottom:24px">Tukar <strong>${pts}</strong> poin menjadi <strong>Rp ${idr.toLocaleString('id-ID')}</strong> ke ${state.selectedEwallet.toUpperCase()}?</p>
        <button type="button" class="btn-primary" id="modal-confirm">Konfirmasi</button>
        <button type="button" class="btn-secondary" style="margin-top:8px" id="modal-cancel">Batal</button>
      </div>
    </div>`;
  document.getElementById('modal-close')?.addEventListener('click', closeModal);
  document.getElementById('modal-cancel')?.addEventListener('click', closeModal);
  document.getElementById('modal-confirm')?.addEventListener('click', () => {
    closeModal();
    state.rewardsTab = 'tersedia';
    toast('Penukaran berhasil! Saldo sedang diproses.');
    render();
  });
}

function closeModal() {
  modalRoot.innerHTML = '';
}

function toast(msg) {
  const t = document.createElement('div');
  t.textContent = msg;
  t.style.cssText =
    'position:fixed;bottom:90px;left:50%;transform:translateX(-50%);background:#1B3A2D;color:#fff;padding:12px 20px;border-radius:12px;font-size:14px;z-index:200;max-width:320px;text-align:center';
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2500);
}

function renderChallenge() {
  showMainNav(true);
  const tabs = [
    { id: 'aktif', label: 'Aktif' },
    { id: 'tersedia', label: 'Tersedia' },
    { id: 'selesai', label: 'Selesai' },
  ];
  let content = '';
  if (state.challengeTab === 'aktif') {
    const feat = data.availableChallenges.find((c) => c.featured);
    content = feat
      ? `<div class="featured-banner">
        <div class="featured-banner__tag">🔥 Challenge Unggulan</div>
        <div class="featured-banner__title">${feat.title}</div>
        <div class="featured-banner__meta">${feat.desc} · Berakhir dalam ${feat.days} hari</div>
        <button type="button" class="btn-secondary" style="border-color:white;color:white">Buat Sekarang</button>
      </div>`
      : '';
    content += data.activeChallenges.map((c) => challengeCardHtml(c)).join('');
    content += data.availableChallenges.filter((c) => !c.featured).map((c) => challengeCardHtml({ ...c, progress: 2, target: 5, daysLeft: c.days })).join('');
  } else if (state.challengeTab === 'tersedia') {
    content = data.availableChallenges.map((c) => challengeCardHtml({ ...c, progress: 0, target: c.target || 5 })).join('');
  } else {
    content = `<div class="month-header">Maret 2025</div>`;
    content += data.completedChallenges.map((c) => challengeCardHtml(c, true)).join('');
  }

  root.innerHTML = `
    <div class="screen nav-screen">
      <div class="pad-screen" style="padding-top:8px;padding-bottom:0"><h2 class="heading-large">Challenge</h2></div>
      ${tabBar3(tabs, state.challengeTab, 'challenge')}
      <div style="display:flex;gap:8px;padding:0 20px 12px">
        <button type="button" class="btn-secondary" style="flex:1;height:40px;font-size:13px" data-nav="badges">Badges · Collection</button>
        <button type="button" class="btn-secondary" style="flex:1;height:40px;font-size:13px" data-nav="leaderboard">Leaderboard · Global</button>
      </div>
      ${content || '<div class="empty-state"><div class="empty-state__icon">🏆</div><p>Belum ada tantangan di tab ini</p></div>'}
    </div>`;
}

function renderDeposit() {
  showMainNav(true);
  const mode = state.depositMode;
  root.innerHTML = `
    <div class="screen nav-screen">
      ${topBar('Setor Sampah', 'home')}
      <p class="body-medium text-secondary pad-screen" style="padding-bottom:0">Pilih cara setor yang paling mudah untukmu</p>
      <div class="segment-control" data-segment="deposit">
        <button type="button" class="segment-control__item${mode === 'jemput' ? ' segment-control__item--active' : ''}" data-mode="jemput">Jemput</button>
        <button type="button" class="segment-control__item${mode === 'drop' ? ' segment-control__item--active' : ''}" data-mode="drop">Drop Point</button>
      </div>
      ${
        mode === 'drop'
          ? `
        <div class="map-placeholder">🗺️ Peta · Lokasi Kamu<span class="map-pin" style="top:40%;left:45%">📍</span></div>
        <p class="heading-small pad-screen" style="padding-bottom:8px">Drop Point Terdekat · ${data.dropPoints.length} lokasi</p>
        ${data.dropPoints.map((d) => dropCardHtml(d)).join('')}
      `
          : `
        <p class="heading-small pad-screen">Jadwal Penjemputan</p>
        <div class="card drop-card" style="cursor:pointer" data-nav="jemput-schedules">
          <div class="body-medium"><strong>Senin, 31 Maret</strong></div>
          <div class="body-small">Slot: 09:00 - 12:00 · Available</div>
        </div>
        <button type="button" class="btn-primary pad-screen" style="width:calc(100% - 40px);margin:16px auto" data-nav="jemput-new">Konfirmasi Penjemputan</button>
      `
      }
      <h3 class="section-title gap-24">Deposit Terbaru</h3>
      ${data.recentDeposits
        .map(
          (d) => `
        <div class="tx-item">
          <div class="tx-item__icon tx-item__icon--earn">♻️</div>
          <div class="tx-item__main"><div class="body-medium">${d.type}</div><div class="body-small">${d.when}</div></div>
          <div class="body-medium" style="font-weight:600">${d.weight}</div>
        </div>`
        )
        .join('')}
    </div>`;
}

function dropCardHtml(d) {
  return `
    <div class="card drop-card" data-nav="navigation" data-id="${d.id}">
      <div class="drop-card__row">
        <span class="heading-small">${d.name}</span>
        <span class="${d.open ? 'badge-open' : 'badge-closed'}">${d.open ? 'Buka' : 'Tutup'}</span>
      </div>
      <p class="body-small">${d.address}</p>
      <p class="body-small" style="margin-top:6px">${d.distance} · ⭐ ${d.rating} · ${d.hours}</p>
    </div>`;
}

function renderScan() {
  showMainNav(false);
  root.innerHTML = `
    <div class="screen" style="display:flex;flex-direction:column;background:#1a1a1a;min-height:100%">
      <header class="top-bar top-bar--transparent" style="position:absolute;top:0;left:0;right:0;z-index:10">
        <button type="button" class="top-bar__back" data-nav="home" aria-label="Kembali" style="color:white">←</button>
        <h1 class="top-bar__title" style="color:white">Scan Sampah</h1>
        <span class="top-bar__spacer"></span>
      </header>
      <div class="scan-viewfinder">
        <div class="scan-overlay"></div>
        <p class="text-on-primary body-medium" style="text-align:center;padding-top:80px;opacity:0.7">Arahkan kamera ke sampah</p>
        <div class="scan-tabs">
          ${['Organik', 'Anorganik', 'B3'].map((t, i) => `<button type="button" class="scan-tab${i === 1 ? ' scan-tab--active' : ''}">${t}</button>`).join('')}
        </div>
        <button type="button" class="capture-btn" data-nav="scan-result" aria-label="Capture"></button>
      </div>
    </div>`;
}

function renderScanResult() {
  showMainNav(false);
  const r = data.scanResult;
  const high = r.confidence >= 70;
  root.innerHTML = `
    <div class="screen screen-auth">
      ${topBar('Hasil Scan', 'scan')}
      <div class="pad-content">
        ${!high ? '<div class="card" style="background:#fff8f0;border:1px solid var(--color-warning);margin-bottom:12px"><p class="body-small">Hasil kurang yakin. Coba lagi atau koreksi manual.</p></div>' : ''}
        <div class="card">
          <div class="heading-medium">${r.item}</div>
          <span class="confidence-badge confidence-badge--${high ? 'high' : 'low'}">${r.confidence}% akurat</span>
          <p class="body-medium" style="margin-top:12px">🌿 CO₂ Dicegah: <strong>${r.co2} kg</strong></p>
          <p class="body-medium text-points">🪙 Poin Didapat: +${r.points}</p>
        </div>
        <h3 class="heading-small" style="margin:20px 0 8px">Cara Penanganan</h3>
        <ol class="steps-list">${r.steps.map((s, i) => `<li><span class="step-num">${i + 1}</span><span>${s}</span></li>`).join('')}</ol>
        <button type="button" class="btn-primary" data-nav="deposit">Lanjut Setor</button>
        <button type="button" class="btn-link" style="width:100%;text-align:center;margin-top:8px">Hasil kurang tepat? Koreksi manual</button>
      </div>
    </div>`;
}

function renderNavigation() {
  showMainNav(false);
  const d = data.dropPoints[0];
  root.innerHTML = `
    <div class="screen screen-auth">
      ${topBar('Navigasi', 'deposit')}
      <div class="pad-content" style="text-align:center;padding-top:24px">
        <h2 class="heading-large">${d.name}</h2>
        <p class="body-small text-secondary" style="margin:8px 0 24px">${d.address}</p>
        <div class="stat-row">
          <div class="stat-card"><div class="stat-card__label">Distance</div><div class="stat-card__value">${d.distance}</div></div>
          <div class="stat-card"><div class="stat-card__label">ETA</div><div class="stat-card__value">3 min</div></div>
          <div class="stat-card"><div class="stat-card__label">Reward</div><div class="stat-card__value text-points">+150</div></div>
        </div>
        <button type="button" class="btn-primary gap-24" style="margin-top:32px" onclick="window.open('https://maps.google.com','_blank')">Start Navigation · Buka di Maps</button>
      </div>
    </div>`;
}

function renderJemputSchedules() {
  showMainNav(false);
  const s = data.pickupSchedule;
  root.innerHTML = `
    <div class="screen screen-auth">
      ${topBar('Jadwal Aktif', 'deposit')}
      <div class="pad-content">
        <div class="card schedule-card" style="flex-direction:column;align-items:stretch">
          <span class="badge-open" style="align-self:flex-start;margin-bottom:12px">${s.status}</span>
          <div style="display:flex;gap:12px">
            <div class="schedule-date"><span class="schedule-date__day">31</span><span class="schedule-date__mon">Mar</span></div>
            <div>
              <p class="body-small text-secondary">Tanggal & Waktu</p>
              <p class="body-medium"><strong>${s.date}, ${s.time}</strong></p>
              <p class="body-small text-secondary" style="margin-top:12px">Lokasi</p>
              <p class="body-medium">${s.address}</p>
              <p class="body-small text-secondary" style="margin-top:12px">Estimasi Berat</p>
              <p class="body-medium">${s.weight}</p>
            </div>
          </div>
          <button type="button" class="btn-secondary" style="margin-top:16px">Ubah Jadwal</button>
        </div>
        <button type="button" class="btn-primary" data-nav="jemput-new" style="margin-top:16px">+ Buat Jadwal Baru</button>
      </div>
    </div>`;
}

function renderJemputNew() {
  showMainNav(false);
  root.innerHTML = `
    <div class="screen screen-auth">
      ${topBar('Jadwal Baru', 'jemput-schedules')}
      <div class="pad-content">
        <div class="input-group"><label class="input-label">Pilih Tanggal</label><input class="input-field" type="date" /></div>
        <div class="input-group"><label class="input-label">Pilih Waktu</label><select class="input-field"><option>09:00 - 12:00</option><option>13:00 - 16:00</option><option disabled>17:00 - 20:00 (Penuh)</option></select></div>
        <div class="input-group"><label class="input-label">Estimasi Berat (kg)</label><input class="input-field" type="number" placeholder="8" /></div>
        <div class="input-group"><label class="input-label">Alamat Penjemputan</label><textarea class="input-field" style="height:80px;padding:14px 16px;resize:none" placeholder="Masukkan alamat lengkap...">${data.user.domisili}</textarea></div>
        <button type="button" class="btn-primary" data-nav="jemput-schedules">Konfirmasi Jadwal</button>
      </div>
    </div>`;
}

function renderFaq() {
  showMainNav(false);
  const isFaq = state.faqTab === 'faq';
  root.innerHTML = `
    <div class="screen screen-auth">
      ${topBar('Bantuan & FAQ', 'profile')}
      <p class="body-medium text-secondary pad-screen">Kami siap membantu Anda</p>
      <div class="tab-bar-3" data-tab-group="faq">
        <button type="button" class="tab-bar-3__item${isFaq ? ' tab-bar-3__item--active' : ''}" data-faq-tab="faq">FAQ</button>
        <button type="button" class="tab-bar-3__item${!isFaq ? ' tab-bar-3__item--active' : ''}" data-faq-tab="hubungi">Hubungi Kami</button>
      </div>
      ${
        isFaq
          ? data.faqItems
              .map(
                (f, i) => `
        <div class="faq-item${state.expandedFaq === i ? ' faq-item--open' : ''}">
          <button type="button" class="faq-question" data-faq="${i}">${f.q}<span>${state.expandedFaq === i ? '−' : '+'}</span></button>
          <div class="faq-answer">${f.a}</div>
        </div>`
              )
              .join('')
          : `
        <p class="body-medium text-secondary pad-screen">Tidak menemukan jawaban? Tim support kami siap membantu.</p>
        <a class="contact-card" href="mailto:support@daurin.id"><span style="font-size:24px">✉️</span><div><div class="heading-small">Email</div><div class="body-small">support@daurin.id</div></div><span>→</span></a>
        <a class="contact-card" href="https://wa.me/6281234567890"><span style="font-size:24px">💬</span><div><div class="heading-small">WhatsApp</div><div class="body-small">+62 812-3456-7890</div></div><span>→</span></a>
        <div class="contact-card"><span style="font-size:24px">💭</span><div><div class="heading-small">Live Chat</div><div class="body-small">Chat dengan kami</div></div><span>→</span></div>
        <div class="tips-box"><strong>Tips Cepat</strong><ul><li>Respons email biasanya dalam 24 jam</li><li>Live chat tersedia 08:00 - 20:00 WIB</li><li>Siapkan screenshot untuk laporan bug</li></ul></div>
      `
      }
    </div>`;
}

function renderBadges() {
  showMainNav(false);
  const unlocked = data.badges.filter((b) => !b.locked).length;
  root.innerHTML = `
    <div class="screen screen-auth">
      ${topBar('Badges', 'challenge')}
      <div class="pad-screen" style="padding-bottom:8px">
        <p class="body-small">Collection Progress</p>
        <p class="heading-medium">Keep collecting badges! ${unlocked}/${data.badges.length}</p>
        <div class="progress-linear gap-24"><div class="progress-linear__fill" style="width:${Math.round((unlocked / data.badges.length) * 100)}%;background:var(--color-secondary)"></div></div>
      </div>
      <div class="badge-grid">
        ${data.badges
          .map(
            (b) => `
          <div class="badge-tile${b.locked ? ' badge-tile--locked' : ''}">
            <div class="badge-tile__icon">${b.icon}</div>
            <div class="body-small" style="font-weight:600;margin-top:4px">${b.name}</div>
            <span class="freq-chip">${b.freq}</span>
            <div class="body-small" style="margin-top:4px">${b.pct}%</div>
          </div>`
          )
          .join('')}
      </div>
    </div>`;
}

function renderLeaderboard() {
  showMainNav(false);
  const lb = data.leaderboard;
  root.innerHTML = `
    <div class="screen screen-auth">
      ${topBar('Leaderboard', 'challenge')}
      <div class="filter-chips">
        ${['RT', 'Kota', 'Provinsi', 'Negara'].map((f, i) => `<button type="button" class="filter-chip${i === 0 ? ' filter-chip--active' : ''}">${f}</button>`).join('')}
      </div>
      <div class="filter-chips">
        ${['Minggu', 'Bulan', 'Tahun'].map((f, i) => `<button type="button" class="filter-chip${i === 0 ? ' filter-chip--active' : ''}">${f}</button>`).join('')}
      </div>
      <p class="heading-small pad-screen" style="padding-top:8px">Top Champions · <span class="text-success">Live</span></p>
      <div class="podium">
        ${[lb.topThree[0], lb.topThree[1], lb.topThree[2]]
          .map((p, i) => {
            const order = [1, 0, 2][i];
            const item = lb.topThree[order];
            const barClass = ['podium-bar--2', 'podium-bar--1', 'podium-bar--3'][i];
            return `
          <div class="podium-item">
            <div class="podium-avatar">${item.name[0]}</div>
            <div class="body-small" style="font-weight:600;margin-top:4px">${item.name}</div>
            <div class="body-small text-points">${item.points} poin</div>
            <div class="podium-bar ${barClass}">#${item.rank}</div>
          </div>`;
          })
          .join('')}
      </div>
      <p class="heading-small pad-screen">Rankings 4-10</p>
      ${lb.rows
        .map(
          (r) => `
        <div class="lb-row">
          <span class="rank-pill">#${r.rank}</span>
          <div class="avatar" style="width:36px;height:36px;font-size:12px">${r.name[0]}</div>
          <div style="flex:1"><div class="body-medium">${r.name}</div><div class="body-small">${r.streak} day streak</div></div>
          <div style="text-align:right"><div class="body-medium" style="font-weight:700">${r.points}</div><span class="delta-pill">+${r.delta}</span></div>
        </div>`
        )
        .join('')}
    </div>`;
}

// ——— Router ———

const routes = {
  splash: renderSplash,
  welcome: renderWelcome,
  login: renderLogin,
  register: renderRegister,
  otp: renderOtp,
  'profile-setup': renderProfileSetup,
  onboarding: renderOnboarding,
  home: renderHome,
  profile: renderProfile,
  rewards: renderRewards,
  challenge: renderChallenge,
  deposit: renderDeposit,
  'deposit-drop': () => {
    state.depositMode = 'drop';
    state.route = 'deposit';
    showMainNav(true);
    renderDeposit();
  },
  scan: renderScan,
  'scan-result': renderScanResult,
  navigation: renderNavigation,
  'jemput-schedules': renderJemputSchedules,
  'jemput-new': renderJemputNew,
  faq: renderFaq,
  badges: renderBadges,
  leaderboard: renderLeaderboard,
};

const mainTabs = ['deposit', 'challenge', 'home', 'rewards', 'profile'];

function render() {
  const r = state.route;
  if (mainTabs.includes(r)) {
    showMainNav(true);
    document.querySelectorAll('.nav-item').forEach((el) => {
      el.classList.toggle('nav-item--active', el.dataset.tab === r);
    });
  }
  const fn = routes[r];
  if (fn) fn();
  else if (mainTabs.includes(r)) {
    const tabRenderers = { home: renderHome, profile: renderProfile, rewards: renderRewards, challenge: renderChallenge, deposit: renderDeposit };
    tabRenderers[r]?.();
  }
  bindEvents();
}

function bindEvents() {
  root.querySelectorAll('[data-nav]').forEach((el) => {
    el.addEventListener('click', (e) => {
      const route = el.dataset.nav;
      if (el.dataset.auth) state.auth = true;
      if (el.dataset.onboard) state.onboardingDone = true;
      if (el.dataset.logout) {
        state.auth = false;
        navigate('welcome');
        return;
      }
      if (route === 'deposit-drop') {
        state.depositMode = 'drop';
        state.route = 'deposit';
        render();
        return;
      }
      navigate(route);
    });
  });

  root.querySelectorAll('[data-tab]').forEach((el) => {
    el.addEventListener('click', () => setTab(el.dataset.tab));
  });

  root.querySelectorAll('[data-subtab]').forEach((el) => {
    el.addEventListener('click', () => {
      const group = el.closest('[data-tab-group]')?.dataset.tabGroup;
      if (group === 'rewards') state.rewardsTab = el.dataset.subtab;
      if (group === 'challenge') state.challengeTab = el.dataset.subtab;
      render();
    });
  });

  root.querySelectorAll('[data-faq-tab]').forEach((el) => {
    el.addEventListener('click', () => {
      state.faqTab = el.dataset.faqTab;
      render();
    });
  });

  root.querySelectorAll('[data-faq]').forEach((el) => {
    el.addEventListener('click', () => {
      const i = parseInt(el.dataset.faq, 10);
      state.expandedFaq = state.expandedFaq === i ? -1 : i;
      render();
    });
  });

  root.querySelectorAll('[data-mode]').forEach((el) => {
    el.addEventListener('click', () => {
      state.depositMode = el.dataset.mode;
      render();
    });
  });

  root.querySelectorAll('[data-ewallet]').forEach((el) => {
    el.addEventListener('click', () => {
      state.selectedEwallet = el.dataset.ewallet;
      toast(`Dipilih: ${el.dataset.ewallet.toUpperCase()}`);
    });
  });

  bottomNav.querySelectorAll('.nav-item').forEach((el) => {
    el.onclick = () => setTab(el.dataset.tab);
  });
}

// Init
function initFromHash() {
  const hash = (window.location.hash || '#splash').slice(1);
  if (routes[hash] || mainTabs.includes(hash)) {
    state.route = hash;
    if (mainTabs.includes(hash)) state.tab = hash;
  }
}

window.addEventListener('hashchange', initFromHash);

initFromHash();
if (state.route === 'splash') {
  render();
  setTimeout(() => navigate('welcome'), 2500);
} else {
  render();
}
