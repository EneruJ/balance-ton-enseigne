import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

class ManageReportsScreen extends StatefulWidget {
  final Map<String, dynamic> data;

  const ManageReportsScreen({required this.data, super.key});

  @override
  // ignore: library_private_types_in_public_api
  _ManageReportsScreenState createState() => _ManageReportsScreenState();
}

class _ManageReportsScreenState extends State<ManageReportsScreen> {
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

      return reports;
    } else {
      throw Exception('Failed to load reports');
    }
  }

  void showReportDetailsModal(BuildContext context, Map<String, dynamic> report) {
    showModalBottomSheet(
      context: context,
      builder: (BuildContext bc) {
        return Wrap(
          children: <Widget>[
            ListTile(
              leading: const Icon(Icons.info),
              title: Text(report['enseigne']),
              subtitle: Text(report['description']),
            ),
            ListTile(
              leading: const Icon(Icons.check),
              title: const Text('Statut "Validé"'),
              onTap: () => changeStatusAndUpdateUI(context, report['report_id'], 'Validé'),
            ),
            ListTile(
              leading: const Icon(Icons.hourglass_empty),
              title: const Text('Statut "En cours"'),
              onTap: () => changeStatusAndUpdateUI(context, report['report_id'], 'En cours'),
            ),
          ],
        );
      },
    );
  }

  void changeStatusAndUpdateUI(BuildContext context, int reportId, String newStatus) {
    updateReportStatus(reportId, newStatus).then((success) {
      Navigator.pop(context); // Close the modal
      if (success) {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Statut mis à jour en $newStatus')));
        // Optionally refresh the list of reports here
      } else {
        ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Erreur lors de la mise à jour')));
      }
    }).catchError((error) {
      Navigator.pop(context); // Close the modal
      ScaffoldMessenger.of(context).showSnackBar(SnackBar(content: Text('Erreur lors de la mise à jour: $error')));
    });
  }

  Future<bool> updateReportStatus(int reportId, String newStatus) async {
    print('http://10.192.64.109:3000/reports/$reportId/status');
    final response = await http.put(
      Uri.parse('http://10.192.64.109:3000/reports/$reportId/status/'),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
      },
      body: jsonEncode(<String, String>{
        'status': newStatus,
      }),
    );

    if (response.statusCode == 200) {
      return true;
    } else {
      // Imprimer le corps de la réponse pour déboguer
      print('Erreur lors de la mise à jour: ${response.body}');
      return false;
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
                    child: Column(
                      children: [
                        Image.network(
                          reports[index]['photoUrl'] ?? 'https://via.placeholder.com/150',
                          width: double.infinity, // Makes the image take the full width of the card
                          height: 200, // Increase the height for a larger image
                          fit: BoxFit.cover,
                        ),
                        ListTile(
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
                          onTap: () => showReportDetailsModal(context, reports[index]),
                        ),
                      ],
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

