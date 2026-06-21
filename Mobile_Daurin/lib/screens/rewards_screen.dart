import 'package:flutter/material.dart';

import '../core/app_colors.dart';
import '../widgets/daurin_bottom_nav.dart';
import '../widgets/primary_button.dart';
import '../widgets/tab_bar_3.dart';

class RewardsScreen extends StatefulWidget {
  const RewardsScreen({super.key});

  @override
  State<RewardsScreen> createState() => _RewardsScreenState();
}

class _RewardsScreenState extends State<RewardsScreen> {
  int _tab = 0;

  @override
  Widget build(BuildContext context) {
    return MainShell(
      navIndex: 3,
      child: Column(
        children: [
          Container(
            width: double.infinity,
            padding: const EdgeInsets.fromLTRB(20, 16, 20, 20),
            color: AppColors.primary,
            child: Column(
              children: [
                const Text('Rewards', style: TextStyle(color: Colors.white70, fontSize: 14)),
                RichText(
                  text: const TextSpan(
                    children: [
                      TextSpan(text: '2,450', style: TextStyle(fontSize: 36, fontWeight: FontWeight.w700, color: AppColors.accentPoints, fontFamily: 'Playfair Display')),
                      TextSpan(text: 'Total Poin', style: TextStyle(fontSize: 14, color: Colors.white70)),
                    ],
                  ),
                ),
                const SizedBox(height: 8),
                const Text('Butuh 550 poin lagi untuk reward Rp 25.000', style: TextStyle(color: Colors.white70, fontSize: 12)),
                const SizedBox(height: 12),
                ClipRRect(
                  borderRadius: BorderRadius.circular(4),
                  child: const LinearProgressIndicator(value: 0.78, minHeight: 8, backgroundColor: Colors.white24, color: AppColors.secondary),
                ),
              ],
            ),
          ),
          const SizedBox(height: 12),
          TabBar3(tabs: const ['Aktif', 'Tersedia', 'Selesai'], selectedIndex: _tab, onChanged: (i) => setState(() => _tab = i)),
          Expanded(child: _tab == 0 ? _aktif() : _tab == 1 ? _tersedia() : _selesai()),
        ],
      ),
    );
  }

  Widget _aktif() {
    return ListView(
      padding: const EdgeInsets.fromLTRB(20, 0, 20, 16),
      children: [
        const Text('Masukkan Jumlah Poin', style: TextStyle(fontWeight: FontWeight.w600)),
        const SizedBox(height: 8),
        const TextField(
          decoration: InputDecoration(
            hintText: '0',
            filled: true,
            fillColor: AppColors.surfaceVariant,
            border: OutlineInputBorder(borderRadius: BorderRadius.all(Radius.circular(12)), borderSide: BorderSide.none),
          ),
        ),
        const SizedBox(height: 12),
        PrimaryButton(label: 'Tukar', onPressed: () {}),
        const SizedBox(height: 16),
        _ewallet('G', 'Gopay', 'Transfer ke Gopay', const Color(0xFF00AED6)),
        _ewallet('O', 'Ovo', 'Transfer ke Ovo', const Color(0xFF4C3494)),
        _ewallet('D', 'Dana', 'Transfer ke Dana', const Color(0xFF108EE9)),
      ],
    );
  }

  Widget _ewallet(String letter, String name, String sub, Color color) {
    return Card(
      margin: const EdgeInsets.only(bottom: 8),
      child: ListTile(
        leading: CircleAvatar(backgroundColor: color, child: Text(letter, style: const TextStyle(color: Colors.white, fontWeight: FontWeight.w700))),
        title: Text(name, style: const TextStyle(fontWeight: FontWeight.w600)),
        subtitle: Text(sub),
      ),
    );
  }

  Widget _tersedia() {
    return ListView(
      children: [
        _month('Maret 2025', [
          _tx('Tukar 500 poin ke Gopay', 'Berhasil', '-500', '29 Mar'),
          _tx('Tukar 300 poin ke Ovo', 'Berhasil', '-300', '29 Mar'),
          _tx('Bonus Referral dari Ahmad', 'Berhasil', '+200', '29 Mar'),
        ]),
        _month('Februari 2025', [
          _tx('Tukar 500 poin ke Gopay', 'Berhasil', '-500', '29 Mar'),
          _tx('Tukar 300 poin ke Ovo', 'Berhasil', '-300', '29 Mar'),
          _tx('Bonus Referral dari Ahmad', 'Berhasil', '+200', '29 Mar'),
        ]),
      ],
    );
  }

  Widget _selesai() {
    return ListView(
      padding: const EdgeInsets.symmetric(horizontal: 20),
      children: [
        Card(
          child: Padding(
            padding: const EdgeInsets.all(16),
            child: Column(
              children: [
                const Text('Kode Unikmu', style: TextStyle(color: AppColors.textSecondary, fontSize: 12)),
                const Text('PUTRA24', style: TextStyle(fontSize: 24, fontWeight: FontWeight.w700, letterSpacing: 2)),
                Row(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    OutlinedButton(onPressed: () {}, child: const Text('Salin')),
                    const SizedBox(width: 8),
                    ElevatedButton(onPressed: () {}, style: ElevatedButton.styleFrom(backgroundColor: AppColors.primary), child: const Text('Bagikan')),
                  ],
                ),
                const SizedBox(height: 16),
                Row(
                  children: [
                    Expanded(child: Column(children: [const Text('8', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700)), const Text('Teman Diajak', style: TextStyle(fontSize: 11))])),
                    Expanded(child: Column(children: [const Text('1,600', style: TextStyle(fontSize: 20, fontWeight: FontWeight.w700, color: AppColors.accentPoints)), const Text('Poin Bonus', style: TextStyle(fontSize: 11))])),
                  ],
                ),
              ],
            ),
          ),
        ),
        const Text('Teman Berhasil diajak', style: TextStyle(fontWeight: FontWeight.w600)),
        _friend('A', 'Ahmad Rizky', '20 Mar 2025'),
        _friend('S', 'Siti Nurhaliza', '15 Mar 2025'),
        _friend('B', 'Budi Santoso', '10 Mar 2025'),
      ],
    );
  }

  Widget _month(String m, List<Widget> items) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Padding(padding: const EdgeInsets.fromLTRB(20, 16, 20, 8), child: Text(m.toUpperCase(), style: const TextStyle(fontSize: 12, fontWeight: FontWeight.w700, color: AppColors.textSecondary))),
        ...items,
      ],
    );
  }

  Widget _tx(String desc, String status, String delta, String date) {
    final pos = delta.startsWith('+');
    return ListTile(
      title: Text(desc),
      subtitle: Text('$status · $date'),
      trailing: Text(delta, style: TextStyle(fontWeight: FontWeight.w700, color: pos ? AppColors.success : AppColors.accentPoints)),
    );
  }

  Widget _friend(String initial, String name, String date) {
    return ListTile(
      leading: CircleAvatar(backgroundColor: AppColors.secondary, child: Text(initial, style: const TextStyle(color: Colors.white))),
      title: Text(name),
      subtitle: Text(date),
      trailing: const Text('+200', style: TextStyle(color: AppColors.accentPoints, fontWeight: FontWeight.w700)),
    );
  }
}
