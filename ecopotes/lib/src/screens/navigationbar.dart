import 'package:flutter/material.dart';

class NavigationBar extends StatelessWidget {
  final int selectedIndex;
  final Function(int) onItemTapped;

  const NavigationBar(
      {super.key, required this.selectedIndex, required this.onItemTapped});

  @override
  Widget build(BuildContext context) {
    return BottomNavigationBar(
      items: const <BottomNavigationBarItem>[
        BottomNavigationBarItem(
          icon: Icon(Icons.home),
          label: 'Home',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.report),
          label: 'Report',
        ),
        BottomNavigationBarItem(
          icon: Icon(Icons.account_circle),
          label: 'Profile',
        ),
      ],
      currentIndex: selectedIndex,
      selectedItemColor: const Color.fromARGB(255, 21, 224, 92),
      onTap: onItemTapped,
    );
  }
}
