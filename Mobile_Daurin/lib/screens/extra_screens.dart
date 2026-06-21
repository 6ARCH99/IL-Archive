import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../core/app_colors.dart';
import '../widgets/tab_bar_3.dart';

class FaqScreen extends StatefulWidget {
  const FaqScreen({super.key});

  @override
  State<FaqScreen> createState() => _FaqScreenState();
}

class _FaqScreenState extends State<FaqScreen> {
  int _tab = 0;
  int? _expanded;

  static const _questions = [
  'Apa itu Tunas?',
  'Bagaimana cara mendapatkan poin?',
  'Dimana lokasi drop point terdekat?',
  'Jenis sampah apa saja yang diterima?',
  'Bagaimana cara menukar poin dengan reward?',
  'Apakah ada biaya untuk menggunakan Tunas?',
  'Bagaimana cara mengajak teman?',
  'Apa itu badge dan bagaimana cara mendapatkannya?',
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Bantuan & FAQ'),
        leading: BackButton(onPressed: () => context.pop()),
      ),
      body: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const Padding(
            padding: EdgeInsets.fromLTRB(20, 8, 20, 0),
            child: Text('Kami siap membantu Anda', style: TextStyle(color: AppColors.textSecondary)),
          ),
          const SizedBox(height: 12),
          TabBar3(tabs: const ['FAQ', 'Hubungi Kami'], selectedIndex: _tab, onChanged: (i) => setState(() => _tab = i)),
          Expanded(
            child: _tab == 0
                ? ListView(
                    children: [
                      const Padding(
                        padding: EdgeInsets.fromLTRB(20, 8, 20, 8),
                        child: Text('Pertanyaan Umum', style: TextStyle(fontWeight: FontWeight.w600)),
                      ),
                      ...List.generate(_questions.length, (i) {
                        return Column(
                          children: [
                            ListTile(
                              title: Text(_questions[i]),
                              trailing: Icon(_expanded == i ? Icons.expand_less : Icons.expand_more, color: AppColors.secondary),
                              onTap: () => setState(() => _expanded = _expanded == i ? null : i),
                            ),
                            if (_expanded == i)
                              const Padding(
                                padding: EdgeInsets.fromLTRB(20, 0, 20, 12),
                                child: Align(
                                  alignment: Alignment.centerLeft,
                                  child: Text('Jawaban akan ditampilkan di sini.', style: TextStyle(color: AppColors.textSecondary)),
                                ),
                              ),
                            const Divider(height: 1),
                          ],
                        );
                      }),
                    ],
                  )
                : ListView(
                    padding: const EdgeInsets.symmetric(horizontal: 20),
                    children: [
                      Text('Hubungi Tim Kami', style: Theme.of(context).textTheme.titleLarge),
                      const SizedBox(height: 8),
                      const Text('Tidak menemukan jawaban yang Anda cari? Tim support kami siap membantu Anda.', style: TextStyle(color: AppColors.textSecondary, fontSize: 14)),
                      const SizedBox(height: 16),
                      _contact(Icons.email_outlined, 'Email', 'support@tunas.id'),
                      _contact(Icons.chat_outlined, 'WhatsApp', '+62 812-3456-7890'),
                      _contact(Icons.forum_outlined, 'Live Chat', 'Chat dengan kami'),
                      const SizedBox(height: 16),
                      Container(
                        padding: const EdgeInsets.all(16),
                        decoration: BoxDecoration(color: AppColors.surfaceVariant, borderRadius: BorderRadius.circular(12)),
                        child: const Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Text('Tips Cepat', style: TextStyle(fontWeight: FontWeight.w600)),
                            SizedBox(height: 8),
                            Text('• Respons email biasanya dalam 24 jam'),
                            Text('• Live chat tersedia 08:00 - 20:00 WIB'),
                            Text('• Siapkan screenshot untuk laporan bug'),
                          ],
                        ),
                      ),
                    ],
                  ),
          ),
        ],
      ),
    );
  }

  Widget _contact(IconData icon, String title, String sub) {
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      child: ListTile(leading: Icon(icon, color: AppColors.secondary), title: Text(title, style: const TextStyle(fontWeight: FontWeight.w600)), subtitle: Text(sub), trailing: const Icon(Icons.chevron_right)),
    );
  }
}

class BadgesScreen extends StatelessWidget {
  const BadgesScreen({super.key});

  static const _badges = <List<String>>[
    ['🛍️', 'Use a reusable bag', 'DAY', '5/5', '100%'],
    ['🚲', 'Bike to work', 'WEEK', '3/3', '100%'],
    ['🥤', 'Avoid single-use straws', 'WEEK', '7/7', '100%'],
    ['🌱', 'Compost food scraps', 'DAY', '2/2', '100%'],
    ['💡', 'Turn off unused lights', 'DAY', '8/8', '100%'],
    ['💧', 'Use refillable water bottle', 'DAY', '4/4', '100%'],
    ['📄', 'Print double-sided', 'WEEK', '6/6', '100%'],
    ['👕', 'Donate old clothes', 'MONTH', '1/1', '100%'],
    ['🥬', 'Buy local produce', 'WEEK', '9/9', '100%'],
    ['🍴', 'Avoid plastic utensils', 'DAY', '3/3', '100%'],
    ['🚰', 'Fix leaky faucets', 'MONTH', '2/2', '100%'],
    ['💡', 'Use energy-efficient bulbs', 'WEEK', '5/5', '100%'],
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Badges'), leading: BackButton(onPressed: () => context.pop())),
      body: SingleChildScrollView(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text('Collection Progress', style: TextStyle(color: AppColors.textSecondary, fontSize: 12)),
            const Text('Keep collecting badges! 2/6', style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600)),
            const SizedBox(height: 8),
            const Text('33% complete', style: TextStyle(color: AppColors.textSecondary)),
            const SizedBox(height: 8),
            ClipRRect(
              borderRadius: BorderRadius.circular(4),
              child: const LinearProgressIndicator(value: 0.33, minHeight: 8, backgroundColor: AppColors.secondaryLight, color: AppColors.secondary),
            ),
            const SizedBox(height: 16),
            GridView.builder(
              shrinkWrap: true,
              physics: const NeverScrollableScrollPhysics(),
              gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount: 3, crossAxisSpacing: 8, mainAxisSpacing: 8, childAspectRatio: 0.85),
              itemCount: _badges.length,
              itemBuilder: (_, i) {
                final b = _badges[i];
                return Card(
                  child: Padding(
                    padding: const EdgeInsets.all(8),
                    child: Column(
                      mainAxisAlignment: MainAxisAlignment.center,
                      children: [
                        Text(b[0], style: const TextStyle(fontSize: 24)),
                        Text(b[1], textAlign: TextAlign.center, maxLines: 2, overflow: TextOverflow.ellipsis, style: const TextStyle(fontSize: 10, fontWeight: FontWeight.w600)),
                        Container(
                          margin: const EdgeInsets.only(top: 4),
                          padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                          decoration: BoxDecoration(color: AppColors.secondaryLight, borderRadius: BorderRadius.circular(6)),
                          child: Text(b[2], style: const TextStyle(fontSize: 9, fontWeight: FontWeight.w700)),
                        ),
                        Text('${b[3]}  ${b[4]}', style: const TextStyle(fontSize: 10, color: AppColors.textSecondary)),
                      ],
                    ),
                  ),
                );
              },
            ),
          ],
        ),
      ),
    );
  }
}

class LeaderboardScreen extends StatelessWidget {
  const LeaderboardScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Leaderboard'), leading: BackButton(onPressed: () => context.pop())),
      body: SingleChildScrollView(
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.stretch,
          children: [
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
              child: Row(
                children: ['RT', 'Kota', 'Provinsi', 'Negara'].map((f) => _chip(f, f == 'RT')).toList(),
              ),
            ),
            SingleChildScrollView(
              scrollDirection: Axis.horizontal,
              padding: const EdgeInsets.symmetric(horizontal: 16),
              child: Row(
                children: ['Minggu', 'Bulan', 'Tahun'].map((f) => _chip(f, f == 'Minggu')).toList(),
              ),
            ),
            const Padding(
              padding: EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text('Collection Progress', style: TextStyle(fontSize: 12, color: AppColors.textSecondary)),
                  Text('Keep collecting badges! 2/6', style: TextStyle(fontWeight: FontWeight.w600)),
                  Text('33% complete', style: TextStyle(fontSize: 12, color: AppColors.textSecondary)),
                ],
              ),
            ),
            const Padding(
              padding: EdgeInsets.symmetric(horizontal: 20),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  Text('Top Champions', style: TextStyle(fontWeight: FontWeight.w600)),
                  Text('Live', style: TextStyle(color: AppColors.success, fontWeight: FontWeight.w700, fontSize: 12)),
                ],
              ),
            ),
            SizedBox(
              height: 200,
              child: Row(
                crossAxisAlignment: CrossAxisAlignment.end,
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  _podium('Andi', '2120', '2', 60, const Color(0xFFB0B7C3)),
                  _podium('Putra', '2450', '1', 80, const Color(0xFFF5C842)),
                  _podium('Siti', '1890', '3', 50, const Color(0xFFCD7F32)),
                ],
              ),
            ),
            const Padding(
              padding: EdgeInsets.fromLTRB(20, 8, 20, 4),
              child: Text('Rankings 4-10', style: TextStyle(fontWeight: FontWeight.w600)),
            ),
            ...[
              ['#4 Kian', '6 day streak', '1820', '+60'],
              ['#4 Soren', '5 day streak', '1740', '+60'],
              ['#4 Lyra', '4 day streak', '1680', '+60'],
              ['#4 Orin', '3 day streak', '1600', '+60'],
              ['#4 Mirael', '2 day streak', '1550', '+60'],
              ['#4 Zane', '1 day streak', '1480', '+60'],
              ['#4 Vela', '1 day streak', '1400', '+60'],
              ['#4 Talia', '1 day streak', '1350', '+60'],
            ].map((r) => ListTile(
                  title: Text(r[0]),
                  subtitle: Text(r[1]),
                  trailing: Column(
                    mainAxisAlignment: MainAxisAlignment.center,
                    crossAxisAlignment: CrossAxisAlignment.end,
                    children: [
                      Text(r[2], style: const TextStyle(fontWeight: FontWeight.w700)),
                      Container(
                        padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
                        decoration: BoxDecoration(color: const Color(0x1A3A7D5E), borderRadius: BorderRadius.circular(6)),
                        child: Text(r[3], style: const TextStyle(fontSize: 11, color: AppColors.success, fontWeight: FontWeight.w700)),
                      ),
                    ],
                  ),
                )),
            const SizedBox(height: 24),
          ],
        ),
      ),
    );
  }

  Widget _chip(String label, bool active) {
    return Container(
      margin: const EdgeInsets.only(right: 8),
      padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 8),
      decoration: BoxDecoration(
        color: active ? AppColors.primary : AppColors.surface,
        border: Border.all(color: active ? AppColors.primary : AppColors.border),
        borderRadius: BorderRadius.circular(20),
      ),
      child: Text(label, style: TextStyle(fontWeight: FontWeight.w600, fontSize: 13, color: active ? Colors.white : AppColors.textPrimary)),
    );
  }

  Widget _podium(String name, String pts, String rank, double h, Color color) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 8),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.end,
        children: [
          CircleAvatar(backgroundColor: AppColors.secondary, child: Text(name[0])),
          Text(name, style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w600)),
          Text('$pts poin', style: const TextStyle(fontSize: 11, color: AppColors.accentPoints)),
          const SizedBox(height: 4),
          Container(
            width: 72,
            height: h,
            alignment: Alignment.bottomCenter,
            padding: const EdgeInsets.only(bottom: 8),
            decoration: BoxDecoration(color: color, borderRadius: const BorderRadius.vertical(top: Radius.circular(8))),
            child: Text('#$rank', style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w700)),
          ),
        ],
      ),
    );
  }
}
