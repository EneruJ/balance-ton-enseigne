import 'package:flutter/material.dart';

class ReportStatusScreen extends StatelessWidget {
  final List<Map<String, String>> reports = [
    {'title': 'Lumières allumées', 'status': 'En cours de validation'},
    {'title': 'Déchets non triés', 'status': 'Validé'},
    // Ajoutez d'autres signalements ici
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // appBar: AppBar(
      //   title: Text('Suivi des signalements'),
      // ),
      body: ListView.builder(
        itemCount: reports.length,
        itemBuilder: (context, index) {
          return ListTile(
            title: Text(reports[index]['title']!),
            subtitle: Text('Statut : ${reports[index]['status']}'),
          );
        },
      ),
    );
  }
}
