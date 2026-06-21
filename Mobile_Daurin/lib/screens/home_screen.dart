import 'package:fl_chart/fl_chart.dart';
import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../core/app_colors.dart';
import '../widgets/daurin_bottom_nav.dart';
import '../widgets/progress_ring.dart';

class HomeScreen extends StatelessWidget {
  const HomeScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return MainShell(
      navIndex: 2,
      child: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            Container(
              padding: EdgeInsets.fromLTRB(20, MediaQuery.paddingOf(context).top + 16, 20, 24),
              color: AppColors.primary,
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Expanded(
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Text('Selamat datang,', style: TextStyle(color: Colors.white.withValues(alpha: 0.85), fontSize: 14)),
                        Text('Putra Pratama', style: Theme.of(context).textTheme.headlineLarge?.copyWith(color: Colors.white)),
                        const SizedBox(height: 10),
                        Container(
                          padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                          decoration: BoxDecoration(
                            color: AppColors.surface,
                            borderRadius: BorderRadius.circular(20),
                            border: Border.all(color: AppColors.accentStreak),
                          ),
                          child: const Text('🔥 Streak: 12 hari berturut-turut', style: TextStyle(color: AppColors.accentStreak, fontWeight: FontWeight.w700, fontSize: 13)),
                        ),
                      ],
                    ),
                  ),
                  const CircleAvatar(radius: 22, backgroundColor: AppColors.secondary, child: Text('PP', style: TextStyle(color: Colors.white, fontWeight: FontWeight.w700))),
                ],
              ),
            ),
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 20, 20, 0),
              child: SizedBox(
                height: 56,
                child: ElevatedButton.icon(
                  onPressed: () => context.push('/scan-result'),
                  icon: const Icon(Icons.document_scanner_outlined),
                  label: const Text('Scan Sampah dengan AI', style: TextStyle(fontWeight: FontWeight.w700)),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: AppColors.primary,
                    foregroundColor: Colors.white,
                    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
                  ),
                ),
              ),
            ),
            const SizedBox(height: 16),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Row(
                children: [
                  _statCard('Total Point kamu', '2,450', '+150 poin minggu ini'),
                  const SizedBox(width: 8),
                  _statCard('CO2 Bulan Ini', '8.3 kg', 'dicegah'),
                  const SizedBox(width: 8),
                  _statCard('Jumlah Setor', '14x', 'bulan ini'),
                ],
              ),
            ),
            const SizedBox(height: 16),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 20),
              child: Card(
                child: Padding(
                  padding: const EdgeInsets.all(16),
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      const Text('Aktivitas Setor  ·  7 Hari terakhir', style: TextStyle(fontSize: 12, color: AppColors.textSecondary)),
                      const SizedBox(height: 4),
                      const Text('Grafik Aktivitas', style: TextStyle(fontWeight: FontWeight.w600)),
                      const SizedBox(height: 12),
                      SizedBox(
                        height: 100,
                        child: BarChart(
                          BarChartData(
                            maxY: 7,
                            gridData: const FlGridData(show: false),
                            borderData: FlBorderData(show: false),
                            titlesData: const FlTitlesData(show: false),
                            barGroups: [3, 5, 2, 4, 6, 3, 5].asMap().entries.map((e) {
                              return BarChartGroupData(
                                x: e.key,
                                barRods: [
                                  BarChartRodData(
                                    toY: e.value.toDouble(),
                                    color: e.value == 6 ? AppColors.secondary : AppColors.secondaryLight,
                                    width: 14,
                                    borderRadius: const BorderRadius.vertical(top: Radius.circular(4)),
                                  ),
                                ],
                              );
                            }).toList(),
                          ),
                        ),
                      ),
                      const Center(child: Text('Aktivitas Setor', style: TextStyle(fontSize: 12, color: AppColors.textSecondary))),
                    ],
                  ),
                ),
              ),
            ),
            const SizedBox(height: 8),
            _actionBtn(context, 'Setor Sampah Sekarang', () => context.go('/deposit')),
            _actionBtn(context, 'Cari Drop Point Terdekat', () => context.go('/deposit?mode=drop')),
            _actionBtn(context, 'Jadwalkan Penjemputan', () => context.go('/deposit?mode=jemput')),
            Padding(
              padding: const EdgeInsets.fromLTRB(20, 24, 20, 12),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('Challenge Aktif', style: Theme.of(context).textTheme.titleLarge),
                  TextButton(onPressed: () => context.go('/challenge'), child: const Text('Lihat Semua')),
                ],
              ),
            ),
            _challengeCard('Kumpulkan 10 Botol Plastik', 7, 10),
            _challengeCard('Kumpulkan 10 Botol Plastik', 7, 10),
            const SizedBox(height: 16),
          ],
        ),
      ),
    );
  }

  Widget _statCard(String label, String value, String sub) {
    return Expanded(
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(12),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              Text(label, style: const TextStyle(fontSize: 10, color: AppColors.textSecondary)),
              const SizedBox(height: 4),
              Text(value, style: const TextStyle(fontSize: 18, fontWeight: FontWeight.w700)),
              Text(sub, style: TextStyle(fontSize: 10, color: sub.contains('poin') ? AppColors.accentPoints : AppColors.textSecondary)),
            ],
          ),
        ),
      ),
    );
  }

  Widget _actionBtn(BuildContext context, String label, VoidCallback onTap) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 4),
      child: SizedBox(
        height: 56,
        width: double.infinity,
        child: ElevatedButton(
          onPressed: onTap,
          style: ElevatedButton.styleFrom(
            backgroundColor: AppColors.primary,
            foregroundColor: Colors.white,
            shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(12)),
          ),
          child: Align(alignment: Alignment.centerLeft, child: Text(label, style: const TextStyle(fontWeight: FontWeight.w700))),
        ),
      ),
    );
  }

  Widget _challengeCard(String title, int cur, int total) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 6),
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              Expanded(child: Text(title, style: const TextStyle(fontWeight: FontWeight.w600))),
              ProgressRing(current: cur, total: total),
            ],
          ),
        ),
      ),
    );
  }
}
