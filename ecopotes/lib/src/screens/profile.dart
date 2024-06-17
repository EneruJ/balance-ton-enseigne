// lib/screens/profile_screen.dart
import 'package:flutter/material.dart';

class ProfileScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            CircleAvatar(
              radius: 50,
              backgroundImage:
                  AssetImage('assets/images/profil.png'), // Placeholder image
            ),
            SizedBox(height: 16),
            Text(
              'Nom: John Doe',
              style: TextStyle(fontSize: 18),
            ),
            SizedBox(height: 8),
            Text(
              'Email: john.doe@example.com',
              style: TextStyle(fontSize: 18),
            ),
            SizedBox(height: 8),
            Text(
              'Ville: Paris',
              style: TextStyle(fontSize: 18),
            ),
            SizedBox(height: 24),
            ElevatedButton(
              onPressed: () {
                // Logique de déconnexion ou de modification du profil ici
                ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(content: Text('Modifier le profil')));
              },
              child: Text('Modifier le profil'),
            ),
            SizedBox(height: 16),
            ElevatedButton(
              onPressed: () {
                // Logique de déconnexion ici
                ScaffoldMessenger.of(context)
                    .showSnackBar(SnackBar(content: Text('Déconnexion')));
              },
              style: ElevatedButton.styleFrom(primary: Colors.red),
              child: Text('Déconnexion'),
            ),
          ],
        ),
      ),
    );
  }
}
