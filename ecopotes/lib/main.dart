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

void main() {
  runApp(const BalanceTonEnseigneApp());
}

class BalanceTonEnseigneApp extends StatelessWidget {
  const BalanceTonEnseigneApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,

      home: const IntroScreen(), // Démarrer avec l'écran de connexion
      routes: {
        '/signin': (context) => const SigninScreen(),
        '/signup': (context) => SignupScreen(),
        '/home': (context) => const HomeScreen(
              userType: UserType.user, // default value
              isAdmin: false, // default value
            ),
        '/report': (context) => const ReportScreen(),
        '/reportStatus': (context) => ReportStatusScreen(),
        '/profile': (context) => const ProfileScreen(),
        '/manageReports': (context) => const ManageReportsScreen(),
        '/admin': (context) => AdminScreen(),

        '/communication': (context) =>
            const CommunicationScreen(isAdmin: false), // default value

        '/reportList': (context) => ReportListScreen(),
      },
    );
  }
}
