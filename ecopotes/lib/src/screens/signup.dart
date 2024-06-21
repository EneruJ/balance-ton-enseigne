// lib/screens/signup_screen.dart
import 'package:flutter/material.dart';

class SignupScreen extends StatelessWidget {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _cityController = TextEditingController();
  final TextEditingController _nameController = TextEditingController();
  final TextEditingController _emailController = TextEditingController();
  final TextEditingController _passwordController = TextEditingController();

  SignupScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Inscription'),
        backgroundColor: const Color.fromARGB(255, 249, 135, 230),
      ),
      body: Container(
        decoration: const BoxDecoration(
          image: DecorationImage(
            image:
                AssetImage("assets/images/bg.png"), // replace with your image
            fit: BoxFit.cover,
          ),
        ),
        child: Padding(
          padding: const EdgeInsets.all(16.0),
          child: Form(
            key: _formKey,
            child: ListView(
              children: [
                Image.asset('assets/images/logo_eco.png',
                    height: 150), // Add your logo
                const SizedBox(height: 20),
                _buildTextField(_nameController, 'Pseudo', Icons.person),
                const SizedBox(height: 20),
                _buildTextField(_emailController, 'Email', Icons.email),
                const SizedBox(height: 20),
                _buildTextField(
                    _passwordController, 'Mot de passe', Icons.lock),
                const SizedBox(height: 20),
                _buildTextField(_cityController, 'Ville', Icons.location_city),
                const SizedBox(height: 20),
                ElevatedButton(
                  onPressed: () {
                    if (_formKey.currentState!.validate()) {
                      Navigator.pushNamed(context, '/home');
                    }
                  },
                  style: ElevatedButton.styleFrom(
                    foregroundColor: Colors.white,
                    backgroundColor: const Color.fromARGB(255, 249, 135, 230),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(30), // <-- Add this
                    ),
                    padding: const EdgeInsets.symmetric(
                        horizontal: 30, vertical: 10),
                  ),
                  child: const Text('S\'inscrire'),
                ),
              ],
            ),
          ),
        ),
      ),
    );
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
        prefixIcon: Icon(
          icon,
          color: const Color.fromARGB(255, 249, 135, 230),
        ),
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
