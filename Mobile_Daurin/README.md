# DAURIN (Flutter)

Flutter mobile UI matching **Prototype.pdf** (31 screens) — auth, home, deposit, rewards, challenge, profile, scan result, FAQ, badges, leaderboard.

## Prerequisites

1. Install [Flutter SDK](https://docs.flutter.dev/get-started/install) (3.22+ recommended).
2. Add Flutter to your PATH, then verify:

```bash
flutter doctor
```

## First-time setup

From this folder:

```bash
# Generate android/ and ios/ if missing
flutter create . --org com.daurin --project-name daurin

flutter pub get
flutter run
```

Use Chrome for quick preview: `flutter run -d chrome`  
Use an emulator/device for the real mobile layout.

## App flow (matches PDF)

| # | Screen |
|---|--------|
| 1 | Splash → tap → Welcome |
| 2 | Masuk / Daftar |
| 3–5 | Login, Register, OTP |
| 6 | Profile setup |
| 7–9 | Onboarding (3 slides) |
| 10 | Home |
| 11 | Profile |
| 12 | Deposit (bottom tab) |
| 13–15 | Rewards: Aktif / Tersedia / Selesai |
| 16–18 | Challenge tabs |
| 19 | Scan result (AI) |
| 20–23 | Setor Sampah, Drop Point, Jemput, schedules |
| 24–27 | FAQ / Bantuan |
| 28–29 | Badges, Leaderboard |
| 30 | Navigation (EcoHub) |

Copy and numbers follow the PDF (e.g. Putra Pratama, 2,450 poin, PUTRA24, EcoHub Batam Center).

## Project layout

```
lib/
  main.dart
  core/          # colors, theme
  router/        # go_router routes
  widgets/       # buttons, tabs, bottom nav
  screens/       # all PDF screens
```

## Note on old web files

`index.html` / `js/` / `css/` were an earlier browser prototype. The **Flutter app** in `lib/` is the intended frontend.
