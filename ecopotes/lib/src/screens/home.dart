import 'package:flutter/material.dart';
import 'package:ecopotes/src/screens/profile.dart';
import 'package:ecopotes/src/screens/report.dart';
import 'package:ecopotes/src/screens/report_status_screen.dart';
import 'package:ecopotes/src/screens/reportlist.dart';
import 'package:ecopotes/src/screens/communication.dart';
import 'package:ecopotes/src/screens/manage_reports_screen.dart';

enum UserType {
  user,
  admin,
  mairie,
}

class HomeScreen extends StatefulWidget {
  final UserType userType;
  final dynamic token;
  final bool isAdmin;
  final dynamic data;

  const HomeScreen({
    Key? key,
    required this.userType,
    required this.isAdmin,
    required this.token,
    required this.data,
  }) : super(key: key);

  @override
  _HomeScreenState createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  int _selectedIndex = 0;

  List<Widget> _userOptions = [];

  List<Widget> _adminOptions = [];

  List<Widget> _mairieOptions = [];

  @override
  void initState() {
    super.initState();
    
    // Initialize options based on user type
    if (widget.userType == UserType.user) {
      _userOptions = [
        const ReportScreen(),
        ReportListScreen(),
        CommunicationScreen(isAdmin: false),
        ProfileScreen(data: widget.data),
      ];
    } else if (widget.userType == UserType.admin) {
      _adminOptions = [
        ReportStatusScreen(),
        const ManageReportsScreen(),
      ];
    } else if (widget.userType == UserType.mairie) {
      _mairieOptions = [
        ReportListScreen(),
        CommunicationScreen(isAdmin: true),
        ProfileScreen(data: widget.data),
      ];
    }
  }

  @override
  Widget build(BuildContext context) {
    List<Widget>? options;

    // Assign the correct options list based on user type
    if (widget.userType == UserType.user) {
      options = _userOptions;
    } else if (widget.userType == UserType.admin) {
      options = _adminOptions;
    } else if (widget.userType == UserType.mairie) {
      options = _mairieOptions;
    }

    return Scaffold(
      body: options![_selectedIndex], // Display the selected screen
      bottomNavigationBar: BottomNavigationBar(
        items: _bottomNavBarItems(),
        currentIndex: _selectedIndex,
        selectedItemColor: Colors.blue,
        onTap: _onItemTapped,
      ),
    );
  }

  List<BottomNavigationBarItem> _bottomNavBarItems() {
    if (widget.userType == UserType.user) {
      return const <BottomNavigationBarItem>[
        BottomNavigationBarItem(
          icon: Icon(Icons.report),
          label: 'Signaler',
        ),
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
    } else if (widget.userType == UserType.admin) {
      return const <BottomNavigationBarItem>[
        BottomNavigationBarItem(
          icon: Icon(Icons.track_changes),
          label: 'Suivi des reports',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.admin_panel_settings),
          label: 'Validation des reports',
        ),
      ];
    } else {
      return const <BottomNavigationBarItem>[
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
    }
  }

  void _onItemTapped(int index) {
    setState(() {
      _selectedIndex = index;
    });
  }
}
