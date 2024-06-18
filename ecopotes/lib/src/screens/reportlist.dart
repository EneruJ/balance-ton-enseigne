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

  ReportListScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Liste des signalements'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: ListView.separated(
          itemCount: reports.length,
          separatorBuilder: (context, index) => const SizedBox(height: 10),
          itemBuilder: (context, index) {
            return Card(
              elevation: 5,
              child: ListTile(
                title: Text(
                  reports[index]['title']!,
                  style: const TextStyle(fontWeight: FontWeight.bold),
                ),
                subtitle: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: <Widget>[
                    Text(reports[index]['description']!),
                    Text(
                      'Statut : ${reports[index]['status']}',
                      style: TextStyle(
                        color: reports[index]['status'] == 'Validé'
                            ? Colors.green
                            : Colors.orange,
                        fontWeight: FontWeight.bold,
                      ),
                    ),
                  ],
                ),
              ),
            );
          },
        ),
      ),
    );
  }
}
