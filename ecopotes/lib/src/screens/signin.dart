// lib/screens/login_screen.dart
import 'package:flutter/material.dart';
import 'home.dart';

class SigninScreen extends StatefulWidget {
  const SigninScreen({super.key});

  @override
  // ignore: library_private_types_in_public_api
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
                  onPressed: () {
                    if (_formKey.currentState!.validate()) {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => HomeScreen(
                              userType: _userType,
                              isAdmin: _userType == UserType.admin),
                        ),
                      );
                    }
                  },
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
