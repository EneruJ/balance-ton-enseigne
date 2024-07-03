// lib/screens/report_screen.dart
import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:geolocator/geolocator.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:google_maps_webservice/places.dart';
import 'package:geocoding/geocoding.dart';
import 'package:image_picker/image_picker.dart';
import 'package:flutter_dotenv/flutter_dotenv.dart';
import 'package:http/http.dart' as http;
import 'dart:io';

class ReportScreen extends StatefulWidget {
  final dynamic data;

  const ReportScreen({super.key, required this.data});

  @override
  // ignore: library_private_types_in_public_api
  _ReportScreenState createState() => _ReportScreenState();
}

class _ReportScreenState extends State<ReportScreen> {
  final _formKey = GlobalKey<FormState>();
  final TextEditingController _storeNameController = TextEditingController();
  final TextEditingController _descriptionController = TextEditingController();
  final TextEditingController _locationController = TextEditingController();
  final TextEditingController _photoUrlController = TextEditingController();
  final TextEditingController _cityController = TextEditingController();
  int? userId;

  LatLng? _location;
  File? _image;
  GoogleMapsPlaces? _places;

  final Map<String, dynamic> _formData = {
    'enseigne': null,
    'description': null,
    'location': null,
    'photoUrl': null,
    'city': null,
    'user_id': null,
    'status': null,
    'created_at': null,
    'updated_at': null,
  };

  Future<void> _getUserLocation() async {
    LocationPermission permission = await Geolocator.checkPermission();
    if (permission == LocationPermission.denied) {
      permission = await Geolocator.requestPermission();
      if (permission == LocationPermission.denied) {
        return;
      }
    }

    if (permission == LocationPermission.deniedForever) {
      throw Exception('Location permissions are permanently denied.');
    }

    Position position = await Geolocator.getCurrentPosition();

    List<Placemark> placemarks = await placemarkFromCoordinates(position.latitude, position.longitude);
    Placemark place = placemarks.isNotEmpty ? placemarks[0] : Placemark();

    setState(() {
      _location = LatLng(position.latitude, position.longitude);
      _locationController.text = '${place.street}, ${place.locality}, ${place.administrativeArea}, ${place.postalCode}, ${place.country}';
      _cityController.text = place.locality!;
    });
  }

  Future<void> _sendData() async {
    const String apiUrl = "http://10.192.64.109:3000/reports";

    _formData['created_at'] = _formData['created_at'].toIso8601String();
    _formData['updated_at'] = _formData['updated_at'].toIso8601String();

    try {
      final response = await http.post(
        Uri.parse(apiUrl),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode(_formData),
      );
      print(jsonEncode(_formData));
      if (response.statusCode == 201) {
        print('Report submitted successfully');
      } else {
        print('Failed to submit report');
      }
    } catch (e) {
      print('Error sending report: $e');
    }
  }

  @override
  void initState() {
    super.initState();
    _places = GoogleMapsPlaces(apiKey: dotenv.env['GOOGLE_MAPS_API_KEY']!);
    userId = widget.data['user']['user_id'];
  }

  Future<void> _takePicture() async {
    final picker = ImagePicker();
    final pickedFile = await picker.pickImage(source: ImageSource.camera); // or ImageSource.camera

    if (pickedFile != null) {
      final File imageFile = File(pickedFile.path);
      String cloudinaryUrl = 'https://api.cloudinary.com/v1_1/dmugctz8s/image/upload';
      String apiKey = dotenv.env['CLOUDINARY_API_KEY']!;
      int timestamp = DateTime.now().millisecondsSinceEpoch;

      var request = http.MultipartRequest('POST', Uri.parse(cloudinaryUrl))
        ..fields['upload_preset'] = 'xwoarndc'
        ..fields['api_key'] = apiKey
        ..fields['timestamp'] = timestamp.toString()
      // Add more parameters as needed
        ..files.add(await http.MultipartFile.fromPath(
          'file',
          imageFile.path,
        ));

      print('Fields: ${request.fields}');
      print('Files: ${request.files}');

      var response = await request.send();

      if (response.statusCode == 200) {
        var responseData = await response.stream.bytesToString();
        var decoded = jsonDecode(responseData);
        var imageUrl = decoded['secure_url'];
        print('Upload successful: $imageUrl');
        setState(() {
          _image = imageFile;
          _formData['photoUrl'] = imageUrl;
          _photoUrlController.text = imageUrl;
        });
      } else {
        print('Failed to upload image. Status code: ${response.statusCode}');
        response.stream.transform(utf8.decoder).listen((value) {
          print(value);
        });
      }
    } else {
      print('No image selected.');
    }
  }

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
                    fillColor: Colors.black.withOpacity(0.5),
                    // Changez ceci à la couleur que vous voulez
                    labelText: 'Nom de l\'enseigne',
                    labelStyle: const TextStyle(color: Colors.white),
                    border: const OutlineInputBorder(),
                    focusedBorder: const OutlineInputBorder(
                      borderSide: BorderSide(
                          color: Color.fromARGB(255, 249, 238, 90), width: 2.0),
                    ),
                  ),
                  style: const TextStyle(color: Colors.white),
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
                    fillColor: Colors.black.withOpacity(0.5),
                    // Ajoutez ceci
                    labelText: 'Description',
                    labelStyle: const TextStyle(color: Colors.white),
                    border: const OutlineInputBorder(),
                    focusedBorder: const OutlineInputBorder(
                      borderSide: BorderSide(
                          color: Color.fromARGB(255, 187, 184, 135),
                          width: 2.0),
                    ),
                  ),
                  style: const TextStyle(color: Colors.white),
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
                  onPressed: _takePicture,
                ),
                const SizedBox(height: 20),
                TextFormField(
                  readOnly: true,
                  controller: _locationController,
                  decoration: InputDecoration(
                    filled: true,
                    fillColor: Colors.black.withOpacity(0.5),
                    labelText: 'Lieu',
                    labelStyle: const TextStyle(color: Colors.white),
                    border: const OutlineInputBorder(),
                    focusedBorder: const OutlineInputBorder(
                      borderSide: BorderSide(color: Colors.blue, width: 2.0),
                    ),
                  ),
                  style: const TextStyle(color: Colors.white),
                  onTap: _getUserLocation,
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
                  onPressed: () async {
                    if (_formKey.currentState!.validate()) {
                      // Stockez les valeurs du formulaire dans _formData
                      _formData['enseigne'] = _storeNameController.text;
                      _formData['description'] = _descriptionController.text;
                      _formData['location'] = _locationController.text;
                      _formData['photoUrl'] = _photoUrlController.text;
                      _formData['city'] = 1;
                      _formData['user_id'] = userId;
                      _formData['status'] = "En attente de validation";
                      _formData['created_at'] = DateTime.now();
                      _formData['updated_at'] = DateTime.now();

                      // Send the data
                      await _sendData(); // Await the completion of _sendData

                      // Assuming success, redirect to ReportListScreen
                      Navigator.pushNamed(context, '/reportList', arguments: {
                        'data': widget.data,
                      });

                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Signalement envoyé !')),
                      );
                    } else {
                      ScaffoldMessenger.of(context).showSnackBar(
                        const SnackBar(content: Text('Echec du signalement')),
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
