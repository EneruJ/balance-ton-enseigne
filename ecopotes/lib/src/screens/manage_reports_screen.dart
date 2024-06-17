import 'package:flutter/material.dart';

class ManageReportsScreen extends StatefulWidget {
  @override
  _ManageReportsScreenState createState() => _ManageReportsScreenState();
}

class _ManageReportsScreenState extends State<ManageReportsScreen> {
  final List<Map<String, dynamic>> reports = [
    {
      'title': 'Lumières allumées',
      'description':
          'Les lumières de l\'enseigne XYZ restent allumées la nuit.',
      'status': 'Non validé',
    },
    {
      'title': 'Déchets non triés',
      'description': 'L\'enseigne ABC ne trie pas correctement ses déchets.',
      'status': 'Non validé',
    },
    // Ajoutez d'autres signalements ici
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: ListView.builder(
        itemCount: reports.length,
        itemBuilder: (context, index) {
          return ListTile(
            title: Text(reports[index]['title']),
            subtitle: Text(reports[index]['description']),
            trailing: Column(
              children: [
                Text('Statut: ${reports[index]['status']}'),
                ElevatedButton(
                  onPressed: () {
                    setState(() {
                      reports[index]['status'] = 'Validé';
                    });
                    ScaffoldMessenger.of(context).showSnackBar(
                        SnackBar(content: Text('Signalement validé')));
                  },
                  child: Text('Valider'),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
