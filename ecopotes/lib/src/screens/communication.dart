import 'package:flutter/material.dart';

class CommunicationScreen extends StatefulWidget {
  final bool isAdmin;

  const CommunicationScreen({super.key, required this.isAdmin});

  @override
  // ignore: library_private_types_in_public_api
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
      appBar: AppBar(
        title: const Text('Communication'),
      ),
      body: Container(
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage(
                "assets/images/sun_bg.png"), // Assurez-vous que le chemin vers l'image est correct
            fit: BoxFit.cover,
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            children: <Widget>[
              if (widget.isAdmin) ...[
                TextField(
                  controller: titleController,
                  decoration: const InputDecoration(labelText: 'Titre'),
                ),
                TextField(
                  controller: contentController,
                  decoration: const InputDecoration(labelText: 'Contenu'),
                ),
                const SizedBox(height: 16),
                ElevatedButton(
                  onPressed: _addNewsletter,
                  child: const Text('Ajouter Newsletter'),
                ),
                const SizedBox(height: 16),
              ],
              Expanded(
                child: ListView.builder(
                  itemCount: newsletters.length,
                  itemBuilder: (context, index) {
                    return Container(
                      margin: const EdgeInsets.only(top: 10.0), // Ajoutez ceci
                      color: Colors.white.withOpacity(0.8), // Ajoutez ceci
                      child: ExpansionTile(
                        title: Text(newsletters[index]['title']!),
                        children: <Widget>[
                          Padding(
                            padding: const EdgeInsets.all(8.0),
                            child: Text(newsletters[index]['content']!),
                          ),
                        ],
                      ),
                    );
                  },
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
