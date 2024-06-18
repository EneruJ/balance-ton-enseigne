import 'package:flutter/material.dart';

class ReportStatusScreen extends StatelessWidget {
  final List<Map<String, dynamic>> reports = [
    {
      'title': 'Lumières allumées',
      'description': 'Les lumières de la poste restent allumées la nuit.',
      'status': 'En cours de validation',
      'image': 'assets/images/exemple.jpg',
    },
    {
      'title': 'Déchets non triés',
      'description': 'L\'enseigne ABC ne trie pas correctement ses déchets.',
      'status': 'Validé',
      'image': 'assets/images/exemple.jpg',
    },
    // Ajoutez d'autres signalements ici
  ];

  ReportStatusScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Suivi des signalements'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: ListView.separated(
          itemCount: reports.length,
          separatorBuilder: (context, index) => const SizedBox(height: 10),
          itemBuilder: (context, index) {
            return Card(
              elevation: 5,
              child: Column(
                children: <Widget>[
                  Image.asset(
                      reports[index]['image'] ?? 'assets/images/exemple.jpg'),
                  ListTile(
                    title: Text(
                      reports[index]['title'] ?? 'Titre par défaut',
                      style: const TextStyle(fontWeight: FontWeight.bold),
                    ),
                    subtitle: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: <Widget>[
                        Text(reports[index]['description'] ??
                            'Description par défaut'),
                        Text(
                          'Statut : ${reports[index]['status'] ?? 'Statut par défaut'}',
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
                ],
              ),
            );
          },
        ),
      ),
    );
  }
}
