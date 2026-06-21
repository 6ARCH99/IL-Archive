import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../core/app_colors.dart';
import '../widgets/daurin_bottom_nav.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return MainShell(
      navIndex: 4,
      child: SingleChildScrollView(
        child: Column(
          children: [
            Container(
              width: double.infinity,
              padding: EdgeInsets.fromLTRB(20, MediaQuery.paddingOf(context).top + 24, 20, 24),
              color: AppColors.primary,
              child: Column(
                children: [
                  const CircleAvatar(radius: 40, backgroundColor: AppColors.secondary, child: Text('PP', style: TextStyle(fontSize: 24, color: Colors.white, fontWeight: FontWeight.w700))),
                  const SizedBox(height: 12),
                  const Text('PUTRA SAPUTRA', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w700, fontSize: 18)),
                  const SizedBox(height: 8),
                  Container(
                    padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 6),
                    decoration: BoxDecoration(color: AppColors.secondary, borderRadius: BorderRadius.circular(20)),
                    child: const Text('🌿 Eco Warrior · Level 5', style: TextStyle(color: Colors.white, fontSize: 12, fontWeight: FontWeight.w700)),
                  ),
                  const SizedBox(height: 16),
                  ClipRRect(
                    borderRadius: BorderRadius.circular(4),
                    child: LinearProgressIndicator(value: 0.65, minHeight: 8, backgroundColor: Colors.white24, color: AppColors.secondary),
                  ),
                ],
              ),
            ),
            Transform.translate(
              offset: const Offset(0, -16),
              child: Padding(
                padding: const EdgeInsets.symmetric(horizontal: 20),
                child: Row(
                  children: [
                    _chip('2400', 'Poin'),
                    const SizedBox(width: 8),
                    _chip('12', 'hari streak'),
                    const SizedBox(width: 8),
                    _chip('28', 'total stor'),
                  ],
                ),
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Row(
                children: [
                  Expanded(child: _miniStat('CO2 Bulan Ini', '8.3 kg dicegah')),
                  const SizedBox(width: 8),
                  Expanded(child: _miniStat('Jumlah Setor', '14x bulan ini')),
                ],
              ),
            ),
            const SizedBox(height: 12),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Row(
                children: [
                  _equiv('🌳', '4', 'pohon'),
                  const SizedBox(width: 8),
                  _equiv('💧', '230L', 'air'),
                  const SizedBox(width: 8),
                  _equiv('⚡', '18', 'kwh'),
                ],
              ),
            ),
            const SizedBox(height: 8),
            _menu(context, 'Data User', Icons.person_outline),
            _menu(context, 'Riwayat Stor Sampah', Icons.history),
            _menu(context, 'Statistik Dampak Lingkungan', Icons.bar_chart_outlined),
            _menu(context, 'Notifikasi', Icons.notifications_outlined),
            _menu(context, 'Settings', Icons.settings_outlined),
            _menu(context, 'Bantuan & FAQ', Icons.help_outline, route: '/faq'),
            _menu(context, 'Logout', Icons.logout, route: '/welcome'),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  Widget _chip(String val, String label) {
    return Expanded(
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Column(
            children: [
              Text(val, style: TextStyle(fontWeight: FontWeight.w700, fontSize: 18, color: label == 'Poin' ? AppColors.accentPoints : (label.contains('streak') ? AppColors.accentStreak : AppColors.textPrimary))),
              Text(label, style: const TextStyle(fontSize: 11, color: AppColors.textSecondary)),
            ],
          ),
        ),
      ),
    );
  }

  Widget _miniStat(String t, String v) => Card(
        child: Padding(padding: const EdgeInsets.all(12), child: Column(crossAxisAlignment: CrossAxisAlignment.start, children: [Text(t, style: const TextStyle(fontSize: 11, color: AppColors.textSecondary)), Text(v, style: const TextStyle(fontWeight: FontWeight.w700))])),
      );

  Widget _equiv(String icon, String val, String unit) {
    return Expanded(
      child: Container(
        padding: const EdgeInsets.all(12),
        decoration: BoxDecoration(color: AppColors.surfaceVariant, borderRadius: BorderRadius.circular(12)),
        child: Column(children: [Text(icon, style: const TextStyle(fontSize: 20)), Text(val, style: const TextStyle(fontWeight: FontWeight.w700)), Text(unit, style: const TextStyle(fontSize: 11, color: AppColors.textSecondary))]),
      ),
    );
  }

  Widget _menu(BuildContext context, String title, IconData icon, {String? route}) {
    return ListTile(
      leading: Icon(icon, color: AppColors.primary),
      title: Text(title.contains('Notifikasi') ? '🔔 Notifikasi' : title),
      trailing: const Icon(Icons.chevron_right, color: AppColors.textSecondary),
      onTap: route != null ? () => context.go(route) : null,
    );
  }
}
