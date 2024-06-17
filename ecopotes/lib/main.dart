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
  runApp(BalanceTonEnseigneApp());
}

class BalanceTonEnseigneApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'Balance Ton Enseigne',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: IntroScreen(), // Démarrer avec l'écran de connexion
      routes: {
        '/signin': (context) => SigninScreen(),
        '/signup': (context) => SignupScreen(),
        '/home': (context) => HomeScreen(
              userType: UserType.user, // default value
              isAdmin: false, // default value
            ),
        '/report': (context) => ReportScreen(),
        '/reportStatus': (context) => ReportStatusScreen(),
        '/profile': (context) => ProfileScreen(),
        '/manageReports': (context) => ManageReportsScreen(),
        '/admin': (context) => AdminScreen(),

        '/communication': (context) =>
            CommunicationScreen(isAdmin: false), // default value

        '/reportList': (context) => ReportListScreen(),
      },
    );
  }
}
