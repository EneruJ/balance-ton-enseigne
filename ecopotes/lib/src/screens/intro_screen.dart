// lib/screens/intro_screen.dart
import 'package:ecopotes/src/screens/signin.dart';
import 'package:flutter/material.dart';
import 'package:introduction_screen/introduction_screen.dart';
import 'signup.dart';

class IntroScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return IntroductionScreen(
      pages: [
        PageViewModel(
          title: "Bienvenue sur Ecopotes !",
          body:
              "Avec notre application, vous pouvez aider à préserver l'environnement en signalant les enseignes commerciales qui ne respectent pas les normes écologiques, comme en laissant leurs lumières allumées la nuit. Ensemble, faisons de notre ville un endroit plus vert et plus respectueux de l'environnement.",
          image: Center(
              child: Image.asset("assets/images/logo_eco.png", height: 175.0)),
        ),
        PageViewModel(
          title: "Signalez facilement les problèmes",
          body:
              "Inscrivez-vous en spécifiant votre ville et commencez à signaler les problèmes écologiques. Prenez une photo, ajoutez une description, et l'application localisera automatiquement votre position. Faites entendre votre voix pour un avenir plus durable.",
          image: Center(
              child: Image.asset("assets/images/light.png", height: 175.0)),
        ),
        PageViewModel(
          title: "Devenez acteur du changement",
          body:
              "Vos signalements sont envoyés directement aux administrateurs de la ville, qui peuvent les traiter et prendre des mesures appropriées. Chaque contribution compte et aide à améliorer la qualité de vie dans notre ville. Merci de votre participation active !",
          image: Center(
              child: Image.asset("assets/images/ecolo.png", height: 175.0)),
        ),
      ],
      onDone: () {
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(builder: (_) => SigninScreen()),
        );
      },
      onSkip: () {
        Navigator.of(context).pushReplacement(
          MaterialPageRoute(builder: (_) => SigninScreen()),
        );
      },
      showSkipButton: true,
      skip: const Icon(Icons.skip_next),
      next: const Icon(Icons.arrow_forward),
      done: const Text("Commencer",
          style: TextStyle(fontWeight: FontWeight.w600)),
      dotsDecorator: DotsDecorator(
        size: const Size.square(10.0),
        activeSize: const Size(22.0, 10.0),
        activeShape: RoundedRectangleBorder(
          borderRadius: BorderRadius.circular(25.0),
        ),
      ),
    );
  }
}
