import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class ReportListScreen extends StatefulWidget {
  final Map<String, dynamic> data;

  const ReportListScreen({required this.data, super.key});

  @override
  _ReportListScreenState createState() => _ReportListScreenState();
}

class _ReportListScreenState extends State<ReportListScreen> {
  late Future<List<Map<String, dynamic>>> _reports;

  @override
  void initState() {
    super.initState();
    _reports = fetchReports();
  }

  Future<List<Map<String, dynamic>>> fetchReports() async {
    const String apiUrl = 'http://localhost:3000/reports';
    final response = await http.get(Uri.parse(apiUrl));

    if (response.statusCode == 200) {
      final Map<String, dynamic> jsonResponse = json.decode(response.body);
      List<Map<String, dynamic>> reports = List<Map<String, dynamic>>.from(jsonResponse['data']);
      print(widget.data['user']);
      // Filtrer les rapports en fonction de l'ID de l'utilisateur
      int userId = widget.data['user']['user_id'];
      reports = reports.where((report) => report['user_id'] == userId).toList();

      return reports;
    } else {
      throw Exception('Failed to load reports');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Liste des signalements'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: FutureBuilder<List<Map<String, dynamic>>>(
          future: _reports,
          builder: (context, snapshot) {
            if (snapshot.connectionState == ConnectionState.waiting) {
              return const Center(child: CircularProgressIndicator());
            } else if (snapshot.hasError) {
              return Center(child: Text('Erreur: ${snapshot.error}'));
            } else if (!snapshot.hasData || snapshot.data!.isEmpty) {
              return const Center(child: Text('Aucun signalement trouvé.'));
            } else {
              final reports = snapshot.data!;
              return ListView.separated(
                itemCount: reports.length,
                separatorBuilder: (context, index) => const SizedBox(height: 10),
                itemBuilder: (context, index) {
                  return Card(
                    elevation: 5,
                    child: ListTile(
                      title: Text(
                        reports[index]['enseigne'],
                        style: const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      subtitle: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          Text(reports[index]['description']),
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
              );
            }
          },
        ),
      ),
    );
  }
}
