import 'dart:math' as math;

import 'package:flutter/material.dart';

import '../core/app_colors.dart';

class ProgressRing extends StatelessWidget {
  const ProgressRing({super.key, required this.current, required this.total, this.size = 64});

  final int current;
  final int total;
  final double size;

  @override
  Widget build(BuildContext context) {
    final pct = total == 0 ? 0.0 : current / total;
    return SizedBox(
      width: size,
      height: size,
      child: CustomPaint(
        painter: _RingPainter(pct),
        child: Center(
          child: Text(
            '$current/$total',
            style: const TextStyle(fontSize: 13, fontWeight: FontWeight.w700),
          ),
        ),
      ),
    );
  }
}

class _RingPainter extends CustomPainter {
  _RingPainter(this.pct);
  final double pct;

  @override
  void paint(Canvas canvas, Size size) {
    final center = Offset(size.width / 2, size.height / 2);
    final radius = size.width / 2 - 4;
    final track = Paint()
      ..color = AppColors.secondaryLight
      ..style = PaintingStyle.stroke
      ..strokeWidth = 6;
    final fill = Paint()
      ..color = AppColors.accentPoints
      ..style = PaintingStyle.stroke
      ..strokeWidth = 6
      ..strokeCap = StrokeCap.round;

    canvas.drawCircle(center, radius, track);
    canvas.drawArc(
      Rect.fromCircle(center: center, radius: radius),
      -math.pi / 2,
      2 * math.pi * pct,
      false,
      fill,
    );
  }

  @override
  bool shouldRepaint(covariant _RingPainter old) => old.pct != pct;
}
