// lib/screens/profile_screen.dart
// ignore_for_file: prefer_interpolation_to_compose_strings

import 'package:flutter/material.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;

class ProfileScreen extends StatefulWidget {
  final dynamic data;

  const ProfileScreen({Key? key, required this.data}) : super(key: key);

  @override
  _ProfileScreenState createState() => _ProfileScreenState();
}

class _ProfileScreenState extends State<ProfileScreen> {
  String? roleName;
  String? cityName;

  @override
  void initState() {
    super.initState();
    fetchRoleName(widget.data['user']['role']);
    fetchCityName(widget.data['user']['city']);
  }

  Future<void> fetchRoleName(int roleId) async {
    final response = await http.get(Uri.parse('http://localhost:3000/roles/$roleId'));
    if (response.statusCode == 200) {
      final jsonData = jsonDecode(response.body);
      setState(() {
        roleName = jsonData['data']['name'];
      });
    } else {
      throw Exception('Failed to load role name');
    }
  }

  Future<void> fetchCityName(int cityId) async {
    final response = await http.get(Uri.parse('http://localhost:3000/cities/$cityId'));
    if (response.statusCode == 200) {
      final jsonData = jsonDecode(response.body);
      setState(() {
        cityName = jsonData['data']['name'];
      });
    } else {
      throw Exception('Failed to load city name');
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Profile'),
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              const CircleAvatar(
                radius: 50,
                backgroundImage: AssetImage('assets/images/profil.png'), // Placeholder image
              ),
              const SizedBox(height: 16),
              Text(
                'Nom: ' + widget.data['user']['name'],
                style: const TextStyle(fontSize: 18),
              ),
              const SizedBox(height: 8),
              Text(
                'Email: ' + widget.data['user']['email'],
                style: const TextStyle(fontSize: 18),
              ),
              const SizedBox(height: 8),
              Text(
                'Ville: ' + (cityName ?? 'Chargement...'),
                style: const TextStyle(fontSize: 18),
              ),
              const SizedBox(height: 8),
              Text(
                'Statut: ' + (roleName ?? 'Chargement...'),
                style: const TextStyle(fontSize: 18),
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: () {
                  // Logique de déconnexion ou de modification du profil ici
                  ScaffoldMessenger.of(context).showSnackBar(
                    const SnackBar(content: Text('Modifier le profil')),
                  );
                },
                child: const Text('Modifier le profil'),
              ),
              const SizedBox(height: 16),
            ],
          ),
        ),
      ),
    );
  }
}
