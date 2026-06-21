import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:go_router/go_router.dart';

import '../core/app_colors.dart';
import '../widgets/daurin_input.dart';
import '../widgets/primary_button.dart';
import '../widgets/secondary_button.dart';

class SplashScreen extends StatelessWidget {
  const SplashScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () => context.go('/welcome'),
      child: Scaffold(
        backgroundColor: AppColors.primary,
        body: SafeArea(
          child: Stack(
            children: [
              Center(
                child: Padding(
                  padding: const EdgeInsets.all(32),
                  child: Column(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      const Text('🌿', style: TextStyle(fontSize: 80)),
                      const SizedBox(height: 16),
                      Text(
                        'DAURIN',
                        style: Theme.of(context).textTheme.displayLarge?.copyWith(color: Colors.white),
                      ),
                      const SizedBox(height: 12),
                      Text(
                        'Pilah sampah lebih mudah, dapat reward nyata,\ndan lihat dampakmu bagi bumi.',
                        textAlign: TextAlign.center,
                        style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                              color: Colors.white.withValues(alpha: 0.7),
                            ),
                      ),
                      const SizedBox(height: 24),
                      Text(
                        'Tap untuk melanjutkan',
                        style: Theme.of(context).textTheme.bodySmall?.copyWith(
                              color: Colors.white.withValues(alpha: 0.5),
                            ),
                      ),
                    ],
                  ),
                ),
              ),
              Positioned(
                bottom: 32,
                left: 0,
                right: 0,
                child: Text(
                  'v1.0.0',
                  textAlign: TextAlign.center,
                  style: TextStyle(color: Colors.white.withValues(alpha: 0.5), fontSize: 12),
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}

class WelcomeScreen extends StatelessWidget {
  const WelcomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 20),
          child: Column(
            children: [
              Expanded(
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    const Text('🌿', style: TextStyle(fontSize: 72)),
                    const SizedBox(height: 16),
                    Text(
                      'Mulai Perjalanan\nHijau-mu',
                      textAlign: TextAlign.center,
                      style: Theme.of(context).textTheme.displayMedium,
                    ),
                    const SizedBox(height: 16),
                    Text(
                      'Pilah sampah lebih mudah, dapat reward nyata,\ndan lihat dampakmu bagi bumi',
                      textAlign: TextAlign.center,
                      style: Theme.of(context).textTheme.bodyLarge?.copyWith(color: AppColors.textSecondary),
                    ),
                  ],
                ),
              ),
              PrimaryButton(label: 'Masuk', onPressed: () => context.push('/login')),
              const SizedBox(height: 12),
              SecondaryButton(label: 'Daftar', onPressed: () => context.push('/register')),
              const SizedBox(height: 16),
              Text(
                'Dengan mendaftar, kamu menyetujui Syarat &\nKetentuan.',
                textAlign: TextAlign.center,
                style: Theme.of(context).textTheme.bodySmall,
              ),
              const SizedBox(height: 24),
            ],
          ),
        ),
      ),
    );
  }
}

class LoginScreen extends StatelessWidget {
  const LoginScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(leading: BackButton(onPressed: () => context.pop())),
      body: SingleChildScrollView(
        padding: const EdgeInsets.fromLTRB(20, 8, 20, 24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text('Selamat Datang\nKembali', style: Theme.of(context).textTheme.headlineLarge),
            const SizedBox(height: 8),
            Text('Lanjutkan aksi hijaumu hari ini.', style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: AppColors.textSecondary)),
            const SizedBox(height: 24),
            const DaurinInput(label: 'Email atau No. HP', hint: 'Masukkan Email / no'),
            const SizedBox(height: 12),
            const DaurinInput(label: 'Password', hint: 'Masukkan Password', obscure: true),
            const SizedBox(height: 8),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Row(
                  children: [
                    Checkbox(value: true, onChanged: (_) {}, activeColor: AppColors.primary),
                    const Text('Ingat saya', style: TextStyle(fontSize: 13)),
                  ],
                ),
                TextButton(onPressed: () {}, child: const Text('Lupa password?')),
              ],
            ),
            const SizedBox(height: 16),
            PrimaryButton(label: 'Masuk', onPressed: () => context.go('/home')),
            const SizedBox(height: 20),
            Row(children: [
              const Expanded(child: Divider()),
              Padding(
                padding: const EdgeInsets.symmetric(horizontal: 12),
                child: Text('atau masuk dengan', style: Theme.of(context).textTheme.bodySmall),
              ),
              const Expanded(child: Divider()),
            ]),
            const SizedBox(height: 16),
            Row(
              children: [
                Expanded(child: OutlinedButton(onPressed: () => context.go('/home'), child: const Text('Google'))),
                const SizedBox(width: 12),
                Expanded(child: OutlinedButton(onPressed: () => context.go('/home'), child: const Text('Facebook'))),
              ],
            ),
            const SizedBox(height: 24),
            Center(
              child: Text.rich(
                TextSpan(
                  text: 'Belum punya akun? ',
                  style: Theme.of(context).textTheme.bodyMedium,
                  children: [
                    WidgetSpan(
                      child: GestureDetector(
                        onTap: () => context.push('/register'),
                        child: const Text('Daftar gratis', style: TextStyle(color: AppColors.secondary, fontWeight: FontWeight.w600)),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class RegisterScreen extends StatelessWidget {
  const RegisterScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(leading: BackButton(onPressed: () => context.pop())),
      body: SingleChildScrollView(
        padding: const EdgeInsets.fromLTRB(20, 8, 20, 24),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Text('Buat Akun Daurin', style: Theme.of(context).textTheme.headlineLarge),
            const SizedBox(height: 8),
            Text('Mulai berkontribusi untuk lingkungan.', style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: AppColors.textSecondary)),
            const SizedBox(height: 20),
            const DaurinInput(label: 'Username', hint: 'Masukkan Username'),
            const SizedBox(height: 12),
            const DaurinInput(label: 'Password', hint: 'Masukkan Password', obscure: true),
            const SizedBox(height: 12),
            const DaurinInput(label: 'Email', hint: 'Masukkan Email'),
            const SizedBox(height: 12),
            const DaurinInput(label: 'Nomor Handphone', hint: 'Masukkan Nomor Handphone'),
            const SizedBox(height: 12),
            const DaurinInput(label: 'Konfirmasi Password', hint: 'Masukkan Password', obscure: true),
            const SizedBox(height: 12),
            Row(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Checkbox(value: true, onChanged: (_) {}, activeColor: AppColors.primary),
                Expanded(
                  child: Text(
                    'Saya setuju dengan Syarat & Ketentuan dan\nKebijakan Privasi',
                    style: Theme.of(context).textTheme.bodySmall?.copyWith(color: AppColors.textSecondary),
                  ),
                ),
              ],
            ),
            const SizedBox(height: 16),
            PrimaryButton(label: 'Daftar Sekarang', onPressed: () => context.push('/otp')),
          ],
        ),
      ),
    );
  }
}

class OtpScreen extends StatefulWidget {
  const OtpScreen({super.key});

  @override
  State<OtpScreen> createState() => _OtpScreenState();
}

class _OtpScreenState extends State<OtpScreen> {
  final _controllers = List.generate(6, (_) => TextEditingController());

  @override
  void dispose() {
    for (final c in _controllers) {
      c.dispose();
    }
    super.dispose();
  }

  void _onChanged(int index, String value) {
    if (value.length == 1 && index < 5) {
      FocusScope.of(context).nextFocus();
    }
    if (_controllers.every((c) => c.text.isNotEmpty)) {
      context.push('/profile-setup');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(leading: BackButton(onPressed: () => context.pop())),
      body: SingleChildScrollView(
        padding: const EdgeInsets.fromLTRB(20, 8, 20, 24),
        child: Column(
          children: [
            Text('Verifikasi Telepon', style: Theme.of(context).textTheme.headlineLarge),
            const SizedBox(height: 12),
            Text('Masukkan kode yang kami kirim', style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: AppColors.textSecondary)),
            const SizedBox(height: 8),
            const Text('Kami telah mengirim kode verifikasi ke'),
            const Text('+62 812 3456 7890', style: TextStyle(fontWeight: FontWeight.w700)),
            TextButton(onPressed: () => context.pop(), child: const Text('Ubah nomor HP')),
            const SizedBox(height: 16),
            Text('Masukkan Kode OTP', style: Theme.of(context).textTheme.titleMedium),
            const SizedBox(height: 12),
            Row(
              mainAxisAlignment: MainAxisAlignment.center,
              children: List.generate(6, (i) {
                return Padding(
                  padding: const EdgeInsets.symmetric(horizontal: 4),
                  child: SizedBox(
                    width: 48,
                    height: 56,
                    child: TextField(
                      controller: _controllers[i],
                      textAlign: TextAlign.center,
                      keyboardType: TextInputType.number,
                      maxLength: 1,
                      inputFormatters: [FilteringTextInputFormatter.digitsOnly],
                      onChanged: (v) => _onChanged(i, v),
                      decoration: InputDecoration(
                        counterText: '',
                        filled: true,
                        fillColor: AppColors.surfaceVariant,
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(12), borderSide: BorderSide.none),
                      ),
                    ),
                  ),
                );
              }),
            ),
            const SizedBox(height: 16),
            Text('Kirim ulang kode dalam 00:58', style: Theme.of(context).textTheme.bodySmall),
            TextButton(onPressed: () {}, child: const Text('Kirim Ulang Kode')),
            const SizedBox(height: 24),
            PrimaryButton(label: 'Verifikasi', onPressed: () => context.push('/profile-setup')),
          ],
        ),
      ),
    );
  }
}

class ProfileSetupScreen extends StatelessWidget {
  const ProfileSetupScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(leading: BackButton(onPressed: () => context.pop())),
      body: SingleChildScrollView(
        padding: const EdgeInsets.fromLTRB(20, 8, 20, 24),
        child: Column(
          children: [
            Text('Lengkapi Profile', style: Theme.of(context).textTheme.headlineLarge),
            const SizedBox(height: 8),
            Text('Bantu kami personalisasi pengalamanmu', style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: AppColors.textSecondary)),
            const SizedBox(height: 20),
            Stack(
              alignment: Alignment.bottomRight,
              children: [
                CircleAvatar(radius: 48, backgroundColor: AppColors.secondary, child: const Text('R', style: TextStyle(fontSize: 32, color: Colors.white, fontWeight: FontWeight.w700))),
                Container(
                  padding: const EdgeInsets.all(6),
                  decoration: const BoxDecoration(color: AppColors.primary, shape: BoxShape.circle),
                  child: const Icon(Icons.camera_alt, color: Colors.white, size: 16),
                ),
              ],
            ),
            const SizedBox(height: 8),
            Text('Tap untuk ubah foto', style: Theme.of(context).textTheme.bodySmall),
            const SizedBox(height: 20),
            const DaurinInput(label: 'Tanggal Lahir', hint: ''),
            const SizedBox(height: 12),
            const DaurinInput(label: 'Domisili', hint: ''),
            const SizedBox(height: 12),
            const DaurinInput(label: 'Jenis Kelamin', hint: ''),
            const SizedBox(height: 12),
            const DaurinInput(label: 'Kode referral', hint: 'Dapat kode dari teman?'),
            Text('(tidak wajib di isi)', style: Theme.of(context).textTheme.bodySmall),
            const SizedBox(height: 12),
            const Text('Profil lengkap = +50 poin\nselamat datang 🎉', textAlign: TextAlign.center, style: TextStyle(color: AppColors.accentPoints, fontWeight: FontWeight.w600)),
            const SizedBox(height: 24),
            PrimaryButton(label: 'Simpan Profil', onPressed: () => context.push('/onboarding')),
          ],
        ),
      ),
    );
  }
}

class OnboardingScreen extends StatefulWidget {
  const OnboardingScreen({super.key});

  @override
  State<OnboardingScreen> createState() => _OnboardingScreenState();
}

class _OnboardingScreenState extends State<OnboardingScreen> {
  final _page = PageController();
  int _index = 0;

  static const _slides = [
    (icon: '📸', title: 'Pilah Sampah\nLebih Mudah', body: 'Scan sampahmu dengan AI dan\nlangsung tahu, cara penanganannya\n— tanpa bingung lagi.'),
    (icon: '💳', title: 'Dapatkan E - Wallet\nRewards', body: 'Kumpulkan poin dari setiap sampah\nyang kamu setorkan dan tukarkan\ndengan saldo e-wallet favoritmu\nseperti GoPay, OVO, dan DANA.'),
    (icon: '🌍', title: 'Lihat\nDampakmu\nuntuk Bumi', body: 'Pantau berapa kg CO₂ yang\nkamu cegah setiap bulan. Aksi\nkecilmu nyata adanya'),
  ];

  @override
  void dispose() {
    _page.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: SafeArea(
        child: Stack(
          children: [
            Positioned(
              top: 8,
              right: 20,
              child: TextButton(onPressed: () => context.go('/home'), child: const Text('Lewati')),
            ),
            Column(
              children: [
                Padding(
                  padding: const EdgeInsets.only(top: 48),
                  child: Text('${_index + 1}/3', style: Theme.of(context).textTheme.bodySmall),
                ),
                Expanded(
                  child: PageView.builder(
                    controller: _page,
                    itemCount: 3,
                    onPageChanged: (i) => setState(() => _index = i),
                    itemBuilder: (_, i) {
                      final s = _slides[i];
                      return Padding(
                        padding: const EdgeInsets.symmetric(horizontal: 24),
                        child: Column(
                          mainAxisAlignment: MainAxisAlignment.center,
                          children: [
                            Text(s.icon, style: const TextStyle(fontSize: 100)),
                            const SizedBox(height: 32),
                            Text(s.title, textAlign: TextAlign.center, style: Theme.of(context).textTheme.displayMedium),
                            const SizedBox(height: 16),
                            Text(s.body, textAlign: TextAlign.center, style: Theme.of(context).textTheme.bodyLarge?.copyWith(color: AppColors.textSecondary)),
                          ],
                        ),
                      );
                    },
                  ),
                ),
                Padding(
                  padding: const EdgeInsets.all(20),
                  child: PrimaryButton(
                    label: 'Lanjut',
                    onPressed: () {
                      if (_index < 2) {
                        _page.nextPage(duration: const Duration(milliseconds: 300), curve: Curves.easeOut);
                      } else {
                        context.go('/home');
                      }
                    },
                  ),
                ),
              ],
            ),
          ],
        ),
      ),
    );
  }
}
