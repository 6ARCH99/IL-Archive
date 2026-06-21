import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../core/app_colors.dart';
import '../widgets/daurin_bottom_nav.dart';
import '../widgets/daurin_input.dart';
import '../widgets/primary_button.dart';
import '../widgets/secondary_button.dart';

class DepositScreen extends StatefulWidget {
  const DepositScreen({super.key, this.initialMode = 1});

  final int initialMode;

  @override
  State<DepositScreen> createState() => _DepositScreenState();
}

class _DepositScreenState extends State<DepositScreen> {
  late int _mode = widget.initialMode;

  @override
  Widget build(BuildContext context) {
    return MainShell(
      navIndex: 0,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(20, 16, 20, 0),
            child: Text('Setor Sampah', style: Theme.of(context).textTheme.headlineLarge),
          ),
          Padding(
            padding: const EdgeInsets.all(20),
            child: Text('Pilih cara setor yang paling mudah untukmu', style: Theme.of(context).textTheme.bodyMedium?.copyWith(color: AppColors.textSecondary)),
          ),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20),
            child: Container(
              padding: const EdgeInsets.all(4),
              decoration: BoxDecoration(color: AppColors.surfaceVariant, borderRadius: BorderRadius.circular(20)),
              child: Row(
                children: [
                  _seg(0, 'Jemput'),
                  _seg(1, 'Drop Point'),
                ],
              ),
            ),
          ),
          Expanded(
            child: ListView(
              padding: const EdgeInsets.all(20),
              children: _mode == 1 ? _dropContent(context) : _jemputContent(context),
            ),
          ),
        ],
      ),
    );
  }

  Widget _seg(int i, String label) {
    final active = _mode == i;
    return Expanded(
      child: GestureDetector(
        onTap: () => setState(() => _mode = i),
        child: Container(
          padding: const EdgeInsets.symmetric(vertical: 12),
          decoration: BoxDecoration(
            color: active ? AppColors.primary : Colors.transparent,
            borderRadius: BorderRadius.circular(16),
          ),
          child: Text(label, textAlign: TextAlign.center, style: TextStyle(fontWeight: FontWeight.w600, color: active ? Colors.white : AppColors.textSecondary)),
        ),
      ),
    );
  }

  List<Widget> _dropContent(BuildContext context) {
    return [
      Container(
        height: 180,
        decoration: BoxDecoration(
          gradient: const LinearGradient(begin: Alignment.topCenter, end: Alignment.bottomCenter, colors: [Color(0xFFC8E6D4), Color(0xFFA8D4B8)]),
          borderRadius: BorderRadius.circular(16),
        ),
        child: const Stack(
          alignment: Alignment.center,
          children: [
            Text('Lokasi Kamu', style: TextStyle(fontWeight: FontWeight.w600, color: AppColors.primary)),
            Positioned(top: 60, child: Text('📍', style: TextStyle(fontSize: 28))),
          ],
        ),
      ),
      const SizedBox(height: 12),
      const Text('Drop Point Terdekat  ·  3 lokasi', style: TextStyle(fontWeight: FontWeight.w600)),
      const SizedBox(height: 8),
      _drop('EcoHub Batam Center', 'Jl. Engku Putri No. 15', '0.8 km', '4.8', '08:00 - 20:00', true, () => context.push('/navigation')),
      _drop('Recycle Station Harbour Bay', 'Harbour Bay Residences', '2.5 km', '4.9', '10:00 - 18:00', false, () {}),
      const SizedBox(height: 16),
      const Text('Recent Deposits', style: TextStyle(fontWeight: FontWeight.w600)),
      _recent('Plastic', '2.5 kg', 'Today'),
      _recent('Paper', '3.2 kg', 'Yesterday'),
      _recent('Metal', '1.8 kg', '2 days ago'),
    ];
  }

  List<Widget> _jemputContent(BuildContext context) {
    return [
      const Text('Jadwal Penjemputan', style: TextStyle(fontWeight: FontWeight.w600)),
      _slot('Senin, 31 Maret', '09:00 - 12:00'),
      _slot('Senin, 31 Maret', '09:00 - 12:00'),
      _slot('Senin, 31 Maret', '09:00 - 12:00'),
      const SizedBox(height: 16),
      const Text('Recent Deposits', style: TextStyle(fontWeight: FontWeight.w600)),
      _recent('Plastic', '2.5 kg', 'Today'),
      _recent('Paper', '3.2 kg', 'Yesterday'),
      _recent('Metal', '1.8 kg', '2 days ago'),
      const SizedBox(height: 16),
      PrimaryButton(label: 'Konfirmasi Penjemputan', onPressed: () => context.push('/jemput-active')),
    ];
  }

  Widget _drop(String name, String addr, String dist, String rating, String hours, bool open, VoidCallback onTap) {
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      child: InkWell(
        onTap: onTap,
        borderRadius: BorderRadius.circular(16),
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Expanded(child: Text(name, style: const TextStyle(fontWeight: FontWeight.w600))),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                    decoration: BoxDecoration(
                      color: open ? const Color(0x1A3A7D5E) : const Color(0x1AD94040),
                      borderRadius: BorderRadius.circular(8),
                    ),
                    child: Text(open ? 'Buka' : 'Tutup', style: TextStyle(fontSize: 11, fontWeight: FontWeight.w700, color: open ? AppColors.success : AppColors.error)),
                  ),
                ],
              ),
              Text(addr, style: const TextStyle(fontSize: 12, color: AppColors.textSecondary)),
              Text('$dist  ·  ⭐ $rating  ·  $hours', style: const TextStyle(fontSize: 12, color: AppColors.textSecondary)),
            ],
          ),
        ),
      ),
    );
  }

  Widget _slot(String date, String slot) {
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      child: ListTile(
        title: Text(date),
        subtitle: Text('Slot: $slot'),
        trailing: const Text('Available', style: TextStyle(color: AppColors.success, fontWeight: FontWeight.w600, fontSize: 12)),
      ),
    );
  }

  Widget _recent(String type, String kg, String when) {
    return ListTile(
      leading: const CircleAvatar(child: Text('♻️', style: TextStyle(fontSize: 16))),
      title: Text(type),
      subtitle: Text(when),
      trailing: Text(kg, style: const TextStyle(fontWeight: FontWeight.w600)),
    );
  }
}

class ScanResultScreen extends StatelessWidget {
  const ScanResultScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('AI Result'), leading: BackButton(onPressed: () => context.pop())),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Row(
              children: [
                _catTab('Organik', false),
                _catTab('Anorganik', true),
                _catTab('B3', false),
              ],
            ),
            const SizedBox(height: 16),
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    const Text('Botol Plastik PET', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600)),
                    Container(
                      margin: const EdgeInsets.symmetric(vertical: 8),
                      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
                      decoration: BoxDecoration(color: const Color(0x1A3A7D5E), borderRadius: BorderRadius.circular(8)),
                      child: const Text('94.5% akurat', style: TextStyle(color: AppColors.success, fontWeight: FontWeight.w700, fontSize: 12)),
                    ),
                    const Text('CO₂ Dicegah\n0.3 kg', style: TextStyle(fontSize: 14)),
                    const SizedBox(height: 8),
                    const Text('Poin Didapat\n+50', style: TextStyle(fontSize: 14, color: AppColors.accentPoints, fontWeight: FontWeight.w700)),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),
            const Text('Cara Penanganan', style: TextStyle(fontWeight: FontWeight.w600)),
            ...[
              'Kosongkan dan bilas botol dari sisa cairan',
              'Lepaskan label dan tutup botol (pisahkan)',
              'Remas botol untuk menghemat ruang',
              'Masukkan ke tempat sampah anorganik\natau drop point terdekat',
            ].asMap().entries.map((e) => Padding(
                  padding: const EdgeInsets.symmetric(vertical: 8),
                  child: Row(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      CircleAvatar(radius: 12, backgroundColor: AppColors.primary, child: Text('${e.key + 1}', style: const TextStyle(color: Colors.white, fontSize: 12))),
                      const SizedBox(width: 12),
                      Expanded(child: Text(e.value)),
                    ],
                  ),
                )),
            const SizedBox(height: 16),
            PrimaryButton(label: 'Lanjut Setor', onPressed: () => context.go('/deposit')),
            TextButton(onPressed: () {}, child: const Text('Hasil kurang tepat? Koreksi manual')),
          ],
        ),
      ),
    );
  }

  Widget _catTab(String label, bool active) {
    return Expanded(
      child: Container(
        margin: const EdgeInsets.symmetric(horizontal: 4),
        padding: const EdgeInsets.symmetric(vertical: 10),
        decoration: BoxDecoration(
          color: active ? AppColors.primary : AppColors.surfaceVariant,
          borderRadius: BorderRadius.circular(20),
        ),
        child: Text(label, textAlign: TextAlign.center, style: TextStyle(fontWeight: FontWeight.w600, color: active ? Colors.white : AppColors.textSecondary, fontSize: 13)),
      ),
    );
  }
}

class JemputActiveScreen extends StatelessWidget {
  const JemputActiveScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Jadwal Aktif'), leading: BackButton(onPressed: () => context.pop())),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Card(
              child: Padding(
                padding: const EdgeInsets.all(16),
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Container(
                      padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 4),
                      decoration: BoxDecoration(color: const Color(0x1A3A7D5E), borderRadius: BorderRadius.circular(8)),
                      child: const Text('Terjadwal', style: TextStyle(color: AppColors.success, fontWeight: FontWeight.w700, fontSize: 11)),
                    ),
                    const SizedBox(height: 12),
                    Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          width: 48,
                          height: 56,
                          decoration: BoxDecoration(color: AppColors.primary, borderRadius: BorderRadius.circular(8)),
                          child: const Column(mainAxisAlignment: MainAxisAlignment.center, children: [Text('31', style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w700)), Text('MAR', style: TextStyle(color: Colors.white70, fontSize: 10))]),
                        ),
                        const SizedBox(width: 12),
                        const Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text('Tanggal & Waktu', style: TextStyle(fontSize: 12, color: AppColors.textSecondary)),
                              Text('31 Mar 2026, 09:00 - 12:00', style: TextStyle(fontWeight: FontWeight.w600)),
                              SizedBox(height: 12),
                              Text('Lokasi', style: TextStyle(fontSize: 12, color: AppColors.textSecondary)),
                              Text('Jl. Melati No. 15, Jakarta Selatan'),
                              SizedBox(height: 12),
                              Text('Estimasi Berat', style: TextStyle(fontSize: 12, color: AppColors.textSecondary)),
                              Text('8 kg'),
                            ],
                          ),
                        ),
                      ],
                    ),
                    const SizedBox(height: 16),
                    SecondaryButton(label: 'Ubah Jadwal', onPressed: () {}),
                  ],
                ),
              ),
            ),
            const SizedBox(height: 16),
            PrimaryButton(label: '+ Buat Jadwal Baru', onPressed: () => context.push('/jemput-new')),
          ],
        ),
      ),
    );
  }
}

class JemputNewScreen extends StatelessWidget {
  const JemputNewScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Jadwal Penjemputan Baru'), leading: BackButton(onPressed: () => context.pop())),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            const DaurinInput(label: 'Pilih Tanggal'),
            const SizedBox(height: 12),
            const DaurinInput(label: 'Pilih Waktu'),
            const SizedBox(height: 12),
            const DaurinInput(label: 'Estimasi Berat (kg)'),
            const SizedBox(height: 12),
            const DaurinInput(label: 'Alamat Penjemputan', hint: 'Masukkan alamat lengkap...', maxLines: 3),
            const SizedBox(height: 24),
            PrimaryButton(label: 'Konfirmasi Jadwal', onPressed: () => context.pop()),
          ],
        ),
      ),
    );
  }
}

class NavigationScreen extends StatelessWidget {
  const NavigationScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(leading: BackButton(onPressed: () => context.pop())),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          children: [
            Text('EcoHub Batam Center', style: Theme.of(context).textTheme.headlineLarge, textAlign: TextAlign.center),
            const SizedBox(height: 8),
            const Text('Jl. Engku Putri No. 15', textAlign: TextAlign.center, style: TextStyle(color: AppColors.textSecondary)),
            const SizedBox(height: 24),
            Row(
              children: [
                Expanded(child: _navStat('Distance', '0.8 km')),
                Expanded(child: _navStat('ETA', '3 min')),
                Expanded(child: _navStat('Reward', '+150 pts', points: true)),
              ],
            ),
            const Spacer(),
            PrimaryButton(label: 'Start Navigation', onPressed: () {}),
          ],
        ),
      ),
    );
  }

  Widget _navStat(String label, String value, {bool points = false}) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(12),
        child: Column(children: [
          Text(label, style: const TextStyle(fontSize: 11, color: AppColors.textSecondary)),
          Text(value, style: TextStyle(fontWeight: FontWeight.w700, color: points ? AppColors.accentPoints : AppColors.textPrimary)),
        ]),
      ),
    );
  }
}
