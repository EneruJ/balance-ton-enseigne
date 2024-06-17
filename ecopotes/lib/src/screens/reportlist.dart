import 'package:flutter/material.dart';

class ReportListScreen extends StatelessWidget {
  final List<Map<String, String>> reports = [
    {
      'title': 'Lumières allumées',
      'description':
          'Les lumières de l\'enseigne XYZ restent allumées la nuit.',
      'status': 'En cours de validation'
    },
    {
      'title': 'Déchets non triés',
      'description': 'L\'enseigne ABC ne trie pas correctement ses déchets.',
      'status': 'Validé'
    },
    // Ajoutez d'autres signalements ici
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      //appBar: AppBar(
      // title: Text('Liste des signalements'),
      //),
      body: ListView.builder(
        itemCount: reports.length,
        itemBuilder: (context, index) {
          return ListTile(
            title: Text(reports[index]['title']!),
            subtitle: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: <Widget>[
                Text(reports[index]['description']!),
                Text('Statut : ${reports[index]['status']}'),
              ],
            ),
          );
        },
      ),
    );
  }
}
