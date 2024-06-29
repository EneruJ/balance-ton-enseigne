import 'package:ecopotes/src/screens/admin.dart';
import 'package:ecopotes/src/screens/communication.dart';
import 'package:ecopotes/src/screens/home.dart';
import 'package:ecopotes/src/screens/intro_screen.dart';
import 'package:ecopotes/src/screens/manage_reports_screen.dart';
import 'package:ecopotes/src/screens/profile.dart';
import 'package:ecopotes/src/screens/report.dart';
import 'package:ecopotes/src/screens/report_status_screen.dart';
import 'package:ecopotes/src/screens/reportlist.dart';
import 'package:ecopotes/src/screens/signin.dart';
import 'package:ecopotes/src/screens/signup.dart';
import 'package:flutter/material.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';

Future main() async {
  await dotenv.load();
  runApp(const BalanceTonEnseigneApp());
}

class BalanceTonEnseigneApp extends StatelessWidget {
  const BalanceTonEnseigneApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      home: const IntroScreen(),
      onGenerateRoute: (settings) {
        switch (settings.name) {
          case '/signin':
            return MaterialPageRoute(builder: (_) => const SigninScreen());
          case '/signup':
            return MaterialPageRoute(builder: (_) => SignupScreen());
          case '/home':
            final args = settings.arguments as Map<String, dynamic>;
            return MaterialPageRoute(
              builder: (_) => HomeScreen(
                userType: args['userType'],
                isAdmin: args['isAdmin'],
                token: args['token'],
                data: args['data'],
              ),
            );
          case '/report':
            return MaterialPageRoute(builder: (_) => const ReportScreen());
          case '/reportStatus':
            return MaterialPageRoute(builder: (_) => ReportStatusScreen());
          case '/profile':
            final args = settings.arguments as Map<String, dynamic>;
            return MaterialPageRoute(
              builder: (_) => ProfileScreen(data: args['data']),
            );
          case '/manageReports':
            return MaterialPageRoute(builder: (_) => const ManageReportsScreen());
          case '/admin':
            return MaterialPageRoute(builder: (_) => AdminScreen());
          case '/communication':
            final args = settings.arguments as Map<String, dynamic>;
            return MaterialPageRoute(
              builder: (_) => CommunicationScreen(isAdmin: args['isAdmin']),
            );
          case '/reportList':
            final args = settings.arguments as Map<String, dynamic>;
            return MaterialPageRoute(
              builder: (_) => ReportListScreen(data: args['data']),
            );
          default:
            return null;
        }
      },
    );
  }
}
