import 'package:flutter_test/flutter_test.dart';

import 'package:daurin/main.dart';

void main() {
  testWidgets('Splash shows DAURIN', (WidgetTester tester) async {
    await tester.pumpWidget(const DaurinApp());
    expect(find.text('DAURIN'), findsOneWidget);
  });
}
