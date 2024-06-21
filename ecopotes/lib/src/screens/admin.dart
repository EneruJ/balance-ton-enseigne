// lib/screens/admin_screen.dart
import 'package:flutter/material.dart';

class AdminScreen extends StatelessWidget {
  final List<Map<String, String>> reports = [
    {
      'title': 'Lumières allumées',
      'description': 'Les lumières de l\'enseigne XYZ restent allumées la nuit.'
    },
    {
      'title': 'Déchets non triés',
      'description': 'L\'enseigne ABC ne trie pas correctement ses déchets.'
    },
    // Ajoutez d'autres signalements ici
  ];

  AdminScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView.builder(
        itemCount: reports.length,
        itemBuilder: (context, index) {
          return ListTile(
            title: Text(reports[index]['title']!),
            subtitle: Text(reports[index]['description']!),
          );
        },
      ),
    );
  }
}
