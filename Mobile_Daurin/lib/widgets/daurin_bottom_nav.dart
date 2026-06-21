import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';

import '../core/app_colors.dart';

class DaurinBottomNav extends StatelessWidget {
  const DaurinBottomNav({super.key, required this.currentIndex});

  final int currentIndex;

  static const _paths = ['/deposit', '/challenge', '/home', '/rewards', '/profile'];
  static const _labels = ['Deposit', 'Challenge', 'Home', 'Reward', 'Profile'];
  static const _icons = [
    Icons.recycling_outlined,
    Icons.emoji_events_outlined,
    Icons.home_outlined,
    Icons.card_giftcard_outlined,
    Icons.person_outline,
  ];

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 64 + MediaQuery.paddingOf(context).bottom,
      padding: EdgeInsets.only(bottom: MediaQuery.paddingOf(context).bottom),
      color: AppColors.primary,
      child: Row(
        children: List.generate(5, (i) {
          final active = i == currentIndex;
          return Expanded(
            child: InkWell(
              onTap: () => context.go(_paths[i]),
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Icon(_icons[i], color: active ? Colors.white : Colors.white.withValues(alpha: 0.55), size: 22),
                  const SizedBox(height: 4),
                  Text(
                    _labels[i].toUpperCase(),
                    style: TextStyle(
                      fontSize: 10,
                      fontWeight: FontWeight.w700,
                      letterSpacing: 0.5,
                      color: active ? Colors.white : Colors.white.withValues(alpha: 0.55),
                    ),
                  ),
                  if (active) ...[
                    const SizedBox(height: 4),
                    Container(
                      width: 4,
                      height: 4,
                      decoration: const BoxDecoration(color: AppColors.secondaryLight, shape: BoxShape.circle),
                    ),
                  ],
                ],
              ),
            ),
          );
        }),
      ),
    );
  }
}

class MainShell extends StatelessWidget {
  const MainShell({super.key, required this.child, required this.navIndex});

  final Widget child;
  final int navIndex;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: child,
      bottomNavigationBar: DaurinBottomNav(currentIndex: navIndex),
    );
  }
}
