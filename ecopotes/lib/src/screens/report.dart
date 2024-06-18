// lib/screens/report_screen.dart
import 'package:flutter/material.dart';
import 'dart:io';

class ReportScreen extends StatefulWidget {
  const ReportScreen({super.key});

  @override
  // ignore: library_private_types_in_public_api
  _ReportScreenState createState() => _ReportScreenState();
}

class _ReportScreenState extends State<ReportScreen> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _storeNameController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();
  String? _location;
  File? _image;

  final List<String> _locations = [
    'Location 1',
    'Location 2',
    'Location 3'
  ]; // Provide your locations here

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Signaler une enseigne'),
      ),
      body: Container(
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage(
                "assets/images/night_bg.png"), // Provide your image path here
            fit: BoxFit.cover,
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Form(
            key: _formKey,
            child: ListView(
              children: [
                TextFormField(
                  controller: _storeNameController,
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.black.withOpacity(
                        0.5), // Changez ceci à la couleur que vous voulez
                    labelText: 'Nom de l\'enseigne',
                    labelStyle: const TextStyle(color: Colors.white),
                    border: const OutlineInputBorder(),
                    focusedBorder: const OutlineInputBorder(
                      borderSide: BorderSide(
                          color: Color.fromARGB(255, 249, 238, 90), width: 2.0),
                    ),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Veuillez entrer le nom de l\'enseigne';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 20),
                TextFormField(
                  controller: _descriptionController,
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.black.withOpacity(0.5), // Ajoutez ceci
                    labelText: 'Description',
                    labelStyle: const TextStyle(color: Colors.white),
                    border: const OutlineInputBorder(),
                    focusedBorder: const OutlineInputBorder(
                      borderSide: BorderSide(
                          color: Color.fromARGB(255, 187, 184, 135),
                          width: 2.0),
                    ),
                  ),
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Veuillez décrire le problème';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 20),
                _image == null
                    ? const Text('Aucune image sélectionnée.',
                        style: TextStyle(color: Colors.white))
                    : Image.file(_image!),
                ElevatedButton.icon(
                  icon: const Icon(Icons.camera_alt),
                  label: const Text(
                    'Prendre une photo',
                    style: TextStyle(color: Color.fromARGB(255, 187, 142, 10)),
                  ),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color.fromARGB(255, 249, 238,
                        90), // Changez ceci à la couleur que vous voulez
                  ),
                  onPressed: () {
                    // La logique de prise de photo serait ici
                  },
                ),
                const SizedBox(height: 20),
                DropdownButtonFormField(
                  value: _location,
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.black.withOpacity(
                        0.5), // Changez ceci à la couleur que vous voulez
                    labelText: 'Lieu',
                    labelStyle: const TextStyle(color: Colors.white),
                    border: const OutlineInputBorder(),
                    focusedBorder: const OutlineInputBorder(
                      borderSide: BorderSide(color: Colors.blue, width: 2.0),
                    ),
                  ),
                  items: _locations.map((location) {
                    return DropdownMenuItem(
                      value: location,
                      child: Text(location),
                    );
                  }).toList(),
                  onChanged: (value) {
                    setState(() {
                      _location = value as String;
                    });
                  },
                  validator: (value) {
                    if (value == null || value.isEmpty) {
                      return 'Veuillez choisir un lieu';
                    }
                    return null;
                  },
                ),
                const SizedBox(height: 20),
                ElevatedButton.icon(
                  icon: const Icon(Icons.send),
                  label: const Text(
                    'Envoyer',
                    style: TextStyle(color: Color.fromARGB(255, 187, 142, 10)),
                  ),
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color.fromARGB(255, 249, 238,
                        90), // Changez ceci à la couleur que vous voulez
                  ),
                  onPressed: () {
                    if (_formKey.currentState!.validate()) {
                      // La logique d'envoi des données serait ici
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Signalement envoyé !')),
                      );
                    }
                  },
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
