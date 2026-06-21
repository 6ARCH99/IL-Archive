import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../core/app_colors.dart';
import '../widgets/daurin_bottom_nav.dart';
import '../widgets/progress_ring.dart';
import '../widgets/secondary_button.dart';
import '../widgets/tab_bar_3.dart';

class ChallengeScreen extends StatefulWidget {
  const ChallengeScreen({super.key});

  @override
  State<ChallengeScreen> createState() => _ChallengeScreenState();
}

class _ChallengeScreenState extends State<ChallengeScreen> {
  int _tab = 1;

  @override
  Widget build(BuildContext context) {
    return MainShell(
      navIndex: 1,
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          Padding(
            padding: const EdgeInsets.fromLTRB(20, 16, 20, 0),
            child: Text('Challenge', style: Theme.of(context).textTheme.headlineLarge),
          ),
          const SizedBox(height: 12),
          TabBar3(tabs: const ['Aktif', 'Tersedia', 'Selesai'], selectedIndex: _tab, onChanged: (i) => setState(() => _tab = i)),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
            child: Row(
              children: [
                Expanded(child: SecondaryButton(label: 'Badges · Collection', onPressed: () => context.push('/badges'))),
                const SizedBox(width: 8),
                Expanded(child: SecondaryButton(label: 'Leaderboard · Global', onPressed: () => context.push('/leaderboard'))),
              ],
            ),
          ),
          Expanded(
            child: ListView(
              padding: const EdgeInsets.only(bottom: 16),
              children: _tab == 1
                  ? [
                      _featured(),
                      _card('Bike to Work', 'Use bicycle for commute', '5 days', 400, 2, 5),
                      _card('Bike to Work', 'Use bicycle for commute', '5 days', 400, 2, 5),
                      _card('Bike to Work', 'Use bicycle for commute', '5 days', 400, 2, 5),
                    ]
                  : _tab == 0
                      ? [
                          _featured(),
                          _card('Bike to Work', 'Use bicycle for commute', '5 days', 400, 2, 5, active: true),
                          _card('Bike to Work', 'Use bicycle for commute', '5 days', 400, 2, 5, active: true),
                          _card('Bike to Work', 'Use bicycle for commute', '5 days', 400, 2, 5, active: true),
                        ]
                      : [
                          const Padding(padding: EdgeInsets.symmetric(horizontal: 20), child: Text('Maret 2025', style: TextStyle(fontWeight: FontWeight.w700, color: AppColors.textSecondary))),
                          _card('Bike to Work', 'Use bicycle for commute', '5 days', 400, 2, 5, done: true),
                          _card('Bike to Work', 'Use bicycle for commute', '5 days', 400, 2, 5),
                          _card('Bike to Work', 'Use bicycle for commute', '5 days', 400, 2, 5),
                          const Padding(padding: EdgeInsets.symmetric(horizontal: 20), child: Text('April 2025', style: TextStyle(fontWeight: FontWeight.w700, color: AppColors.textSecondary))),
                          _card('Bike to Work', 'Use bicycle for commute', '5 days', 400, 2, 5),
                          _card('Bike to Work', 'Use bicycle for commute', '5 days', 400, 2, 5),
                          _card('Bike to Work', 'Use bicycle for commute', '5 days', 400, 2, 5),
                        ],
            ),
          ),
        ],
      ),
    );
  }

  Widget _featured() {
    return Container(
      margin: const EdgeInsets.symmetric(horizontal: 20, vertical: 8),
      padding: const EdgeInsets.all(16),
      decoration: BoxDecoration(
        gradient: const LinearGradient(colors: [AppColors.primary, AppColors.secondary]),
        borderRadius: BorderRadius.circular(16),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          const Text('🔥 Challenge Unggulan', style: TextStyle(color: Colors.white70, fontSize: 12)),
          const Text('Pilah 10 kg Minggu Ini', style: TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.w700)),
          const Text('128 orang bergabung · Berakhir dalam 2 hari', style: TextStyle(color: Colors.white70, fontSize: 12)),
          const SizedBox(height: 12),
          OutlinedButton(
            onPressed: () {},
            style: OutlinedButton.styleFrom(foregroundColor: Colors.white, side: const BorderSide(color: Colors.white)),
            child: const Text('Buat Sekarang'),
          ),
        ],
      ),
    );
  }

  Widget _card(String title, String desc, String days, int pts, int cur, int total, {bool active = false, bool done = false}) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 20, vertical: 6),
      child: Card(
        child: Padding(
          padding: const EdgeInsets.all(16),
          child: Row(
            children: [
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(title, style: const TextStyle(fontWeight: FontWeight.w600)),
                    Text(desc, style: const TextStyle(fontSize: 13, color: AppColors.textSecondary)),
                    const SizedBox(height: 4),
                    Text('$days  ·  + $pts pts', style: const TextStyle(fontSize: 12, color: AppColors.textSecondary)),
                    if (active) const Text('Active', style: TextStyle(fontSize: 12, color: AppColors.secondary, fontWeight: FontWeight.w600)),
                    if (done) const Text('Selesai', style: TextStyle(fontSize: 12, color: AppColors.success, fontWeight: FontWeight.w600)),
                  ],
                ),
              ),
              ProgressRing(current: cur, total: total),
            ],
          ),
        ),
      ),
    );
  }
}
