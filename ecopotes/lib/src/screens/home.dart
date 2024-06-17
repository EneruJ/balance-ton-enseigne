import 'package:ecopotes/src/screens/profile.dart';
import 'package:ecopotes/src/screens/report.dart';
import 'package:ecopotes/src/screens/report_status_screen.dart';
import 'package:ecopotes/src/screens/reportlist.dart';
import 'package:flutter/material.dart';

import 'communication.dart';
import 'manage_reports_screen.dart';

enum UserType {
  user,
  admin,
  mairie,
}

class HomeScreen extends StatefulWidget {
  final UserType userType; // Remplacez 'role' par 'userType'
  HomeScreen({required this.userType, required bool isAdmin});

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 0;

  List<Widget> _userOptions = <Widget>[
    ReportScreen(),
    CommunicationScreen(isAdmin: false),
    ProfileScreen(),
  ];

  List<Widget> _adminOptions = <Widget>[
    ReportStatusScreen(),
    ManageReportsScreen(),
  ];

  List<Widget> _mairieOptions = <Widget>[
    ReportListScreen(),
    CommunicationScreen(isAdmin: true),
    ProfileScreen(),
  ];

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }

  @override
  Widget build(BuildContext context) {
    List<BottomNavigationBarItem> items;
    List<Widget> options;

    if (widget.userType == UserType.user) {
      items = const <BottomNavigationBarItem>[
        BottomNavigationBarItem(
          icon: Icon(Icons.report),
          label: 'Signaler',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.notifications),
          label: 'Communication',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.person),
          label: 'Profil',
        ),
      ];
      options = _userOptions;
    } else if (widget.userType == UserType.admin) {
      items = const <BottomNavigationBarItem>[
        BottomNavigationBarItem(
          icon: Icon(Icons.track_changes),
          label: 'Suivi des reports',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.admin_panel_settings),
          label: 'Validation des reports',
        ),
      ];
      options = _adminOptions;
    } else {
      items = const <BottomNavigationBarItem>[
        BottomNavigationBarItem(
          icon: Icon(Icons.list),
          label: 'Liste des reports',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.notifications),
          label: 'Communication',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.person),
          label: 'Profil',
        ),
      ];
      options = _mairieOptions;
    }

    return Scaffold(
      appBar: AppBar(
        title: Text('Balance ton enseigne'),
      ),
      body: options.elementAt(_selectedIndex),
      bottomNavigationBar: BottomNavigationBar(
        items: items,
        currentIndex: _selectedIndex,
        selectedItemColor: Colors.blue,
        onTap: _onItemTapped,
      ),
    );
  }
}
