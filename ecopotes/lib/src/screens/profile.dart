// lib/screens/profile_screen.dart
import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  const ProfileScreen({super.key});

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
            mainAxisAlignment: MainAxisAlignment.center, // Ajoutez ceci
            children: <Widget>[
              const CircleAvatar(
                radius: 50,
                backgroundImage:
                    AssetImage('assets/images/profil.png'), // Placeholder image
              ),
              const SizedBox(height: 16),
              const Text(
                'Nom: John Doe',
                style: TextStyle(fontSize: 18),
              ),
              const SizedBox(height: 8),
              const Text(
                'Email: john.doe@example.com',
                style: TextStyle(fontSize: 18),
              ),
              const SizedBox(height: 8),
              const Text(
                'Ville: Paris',
                style: TextStyle(fontSize: 18),
              ),
              const SizedBox(height: 8),
              const Text(
                // Ajoutez ceci
                'Statut: Admin',
                style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
              ),
              const SizedBox(height: 24),
              ElevatedButton(
                onPressed: () {
                  // Logique de déconnexion ou de modification du profil ici
                  ScaffoldMessenger.of(context).showSnackBar(
                      const SnackBar(content: Text('Modifier le profil')));
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
