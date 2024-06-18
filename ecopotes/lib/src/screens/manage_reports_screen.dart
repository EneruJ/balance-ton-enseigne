import 'package:flutter/material.dart';

class ManageReportsScreen extends StatefulWidget {
  const ManageReportsScreen({super.key});

  @override
  // ignore: library_private_types_in_public_api
  _ManageReportsScreenState createState() => _ManageReportsScreenState();
}

class _ManageReportsScreenState extends State<ManageReportsScreen> {
  final List<Map<String, dynamic>> reports = [
    {
      'title': 'Lumières allumées',
      'description':
          'Les lumières de l\'enseigne XYZ restent allumées la nuit.',
      'status': 'Non validé',
      'image': 'assets/images/exemple.jpg',
    },
    {
      'title': 'Déchets non triés',
      'description': 'L\'enseigne ABC ne trie pas correctement ses déchets.',
      'status': 'Non validé',
      'image': 'assets/images/exemple.jpg',
    },
    // Ajoutez d'autres signalements ici
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Management des signalements'),
      ),
      body: ListView.builder(
        itemCount: reports.length,
        itemBuilder: (context, index) {
          return Card(
            child: Column(
              children: <Widget>[
                Image.asset(
                    reports[index]['image'] ?? 'assets/images/exemple.jpg'),
                ListTile(
                  title: Text(reports[index]['title'] ?? 'Default Title'),
                  subtitle: Text(
                      reports[index]['description'] ?? 'Default Description'),
                  trailing: Column(
                    children: [
                      Text(
                          'Statut: ${reports[index]['status'] ?? 'Default Status'}'),
                      ElevatedButton(
                        onPressed: () {
                          setState(() {
                            reports[index]['status'] = 'Validé';
                          });
                          ScaffoldMessenger.of(context).showSnackBar(
                              const SnackBar(
                                  content: Text('Signalement validé')));
                        },
                        child: const Text('Valider'),
                      ),
                    ],
                  ),
                ),
              ],
            ),
          );
        },
      ),
    );
  }
}
