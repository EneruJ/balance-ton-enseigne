// lib/screens/login_screen.dart

// ignore_for_file: use_build_context_synchronously

import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import 'home.dart';

class SigninScreen extends StatefulWidget {
  const SigninScreen({Key? key}) : super(key: key);

  @override
  _SigninScreenState createState() => _SigninScreenState();
}

class _SigninScreenState extends State<SigninScreen> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  UserType _userType = UserType.user; // Default to user

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Connexion'),
        backgroundColor: const Color.fromARGB(255, 74, 255, 189),
      ),
      body: Container(
        decoration: const BoxDecoration(
          image: DecorationImage(
            image: AssetImage("assets/images/bg.png"), // Replace with your image
            fit: BoxFit.cover,
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Form(
            key: _formKey,
            child: ListView(
              children: [
                DropdownButton<UserType>(
                  value: _userType,
                  onChanged: (UserType? newValue) {
                    setState(() {
                      _userType = newValue!;
                    });
                  },
                  items: const <DropdownMenuItem<UserType>>[
                    DropdownMenuItem<UserType>(
                      value: UserType.user,
                      child: Text("Se connecter en tant qu'utilisateur"),
                    ),
                    DropdownMenuItem<UserType>(
                      value: UserType.admin,
                      child: Text("Se connecter en tant qu'admin"),
                    ),
                    DropdownMenuItem<UserType>(
                      value: UserType.mairie,
                      child: Text("Se connecter en tant que mairie"),
                    ),
                  ],
                ),

                Image.asset('assets/images/logo_eco.png',
                    height: 150), // Add your logo
                const SizedBox(height: 20),
                _buildTextField(_emailController, 'Email', Icons.email),
                const SizedBox(height: 20),
                _buildTextField(
                    _passwordController, 'Mot de passe', Icons.lock),
                const SizedBox(height: 20),

                ElevatedButton(
                  onPressed: _login,
                  style: ElevatedButton.styleFrom(
                    foregroundColor: Colors.white,
                    backgroundColor: const Color.fromARGB(255, 74, 255, 152),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(30), // <-- Add this
                    ),
                    padding: const EdgeInsets.symmetric(
                        horizontal: 30, vertical: 10),
                  ),
                  child: const Text('Se connecter'),
                ),

                const SizedBox(height: 20),
                ElevatedButton(
                  onPressed: () {
                    Navigator.pushNamed(context, '/signup');
                  },
                  style: ElevatedButton.styleFrom(
                    backgroundColor: const Color.fromARGB(255, 88, 110,
                        140), // Utilisez 'primary' pour définir la couleur de fond du bouton
                  ),
                  child: const Text('Créer un nouveau compte'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }

  Future<void> _login() async {
  if (_formKey.currentState!.validate()) {
    const String apiUrl = 'http://locahost:3000/auth/login'; // Replace with your API endpoint

    try {
      final response = await http.post(
        Uri.parse(apiUrl),
        headers: <String, String>{
          'Content-Type': 'application/json; charset=UTF-8',
        },
        body: jsonEncode(<String, String>{
          'email': _emailController.text,
          'password': _passwordController.text,
        }),
      );

      if (response.statusCode == 200) {
        final responseBody = json.decode(response.body);
        print('API Response: $responseBody');

        // Récupérez et traitez la réponse de l'API ici
        // Exemple: Navigation vers la page HomeScreen après une connexion réussie
        Navigator.push(
          context,
          MaterialPageRoute(
            builder: (context) => HomeScreen(
              userType: _userType,
              isAdmin: responseBody['role'] == 'admin', // Exemple: Vérifiez le rôle pour isAdmin
              token: responseBody['data']['token'],
              data: responseBody['data']
            ),
          ),
        );
      } else {
        print('Failed to login: ${response.statusCode}');
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(
            content: Text('Email ou mot de passe incorrect.'),
          ),
        );
      }
    } catch (e) {
      print('Error: $e');
      ScaffoldMessenger.of(context).showSnackBar(
        const SnackBar(
          content: Text('Une erreur est survenue. Veuillez réessayer.'),
        ),
      );
    }
  }
}


  Widget _buildTextField(
      TextEditingController controller, String labelText, IconData icon) {
    return TextFormField(
      controller: controller,
      decoration: InputDecoration(
        labelText: labelText,
        filled: true,
        fillColor: Colors.white70, // make text field semi-transparent
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(30),
        ),
        prefixIcon: Icon(icon, color: const Color.fromARGB(255, 74, 255, 152)),
      ),
      validator: (value) {
        if (value == null || value.isEmpty) {
          return 'Veuillez entrer votre $labelText';
        }
        return null;
      },
    );
  }
}
