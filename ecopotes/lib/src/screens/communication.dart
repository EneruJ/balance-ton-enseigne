import 'package:flutter/material.dart';

class CommunicationScreen extends StatefulWidget {
  final bool isAdmin;

  CommunicationScreen({required this.isAdmin});

  @override
  _CommunicationScreenState createState() => _CommunicationScreenState();
}

class _CommunicationScreenState extends State<CommunicationScreen> {
  final List<Map<String, String>> newsletters = [
    {
      'title': 'Campagne de Sensibilisation',
      'content': 'Détails de la campagne...'
    },
    {
      'title': 'Nouvelles Initiatives',
      'content': 'Détails des nouvelles initiatives...'
    },
  ];

  final TextEditingController titleController = TextEditingController();
  final TextEditingController contentController = TextEditingController();

  void _addNewsletter() {
    setState(() {
      newsletters.add({
        'title': titleController.text,
        'content': contentController.text,
      });
      titleController.clear();
      contentController.clear();
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      // appBar: AppBar(
      //  title: Text('Communication'),
      //  ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: <Widget>[
            if (widget.isAdmin) ...[
              TextField(
                controller: titleController,
                decoration: InputDecoration(labelText: 'Titre'),
              ),
              TextField(
                controller: contentController,
                decoration: InputDecoration(labelText: 'Contenu'),
              ),
              SizedBox(height: 16),
              ElevatedButton(
                onPressed: _addNewsletter,
                child: Text('Ajouter Newsletter'),
              ),
              SizedBox(height: 16),
            ],
            Expanded(
              child: ListView.builder(
                itemCount: newsletters.length,
                itemBuilder: (context, index) {
                  return ListTile(
                    title: Text(newsletters[index]['title']!),
                    subtitle: Text(newsletters[index]['content']!),
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
