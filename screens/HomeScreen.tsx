import React, { useState } from "react";
import { View, Text, Button, StyleSheet, Image, Alert, TouchableOpacity } from "react-native";
import { launchCamera, launchImageLibrary } from "react-native-image-picker";
import { TextInput } from "react-native-paper";

export default function HomeScreen({ navigation }: any) {

const [image, setImage] = useState<string | null>(null);
const [query, setQuery] = useState("");

const openCamera = () => {

launchCamera(
  { mediaType: "photo", cameraType: "back" },
  (response) => {

    if (response.assets && response.assets.length > 0) {
      setImage(response.assets[0].uri || null);
    }

  }
);


};

const openGallery = () => {


launchImageLibrary(
  { mediaType: "photo" },
  (response) => {

    if (response.assets && response.assets.length > 0) {
      setImage(response.assets[0].uri || null);
    }

  }
);


};

const uploadImage = () => {


Alert.alert(
  "Upload Crop Image",
  "Choose image source",
  [
    { text: "Camera", onPress: openCamera },
    { text: "Gallery", onPress: openGallery },
    { text: "Cancel", style: "cancel" }
  ]
);


};

const predict = () => {

navigation.navigate("Result", {
  image: image,
  voiceQuery: query
});

};

return (

<View style={styles.container}>

  <Text style={styles.title}>🌱 FarmAI</Text>
  <Text style={styles.subtitle}>Crop Disease Detection</Text>

  <TouchableOpacity
    style={styles.uploadButton}
    onPress={uploadImage}
  >
    <Text style={styles.uploadText}>Upload Crop Image</Text>
  </TouchableOpacity>

  {image && (
    <View style={styles.previewContainer}>

      <Text style={styles.status}>✔ Image Uploaded</Text>

      <Image
        source={{ uri: image }}
        style={styles.preview}
      />

    </View>
  )}

  <TextInput
    mode="outlined"
    placeholder="Ask about treatment, symptoms, prevention..."
    value={query}
    onChangeText={setQuery}
    style={styles.input}
  />

  <TouchableOpacity
    style={[styles.predictButton, !image && styles.disabledButton]}
    onPress={predict}
    disabled={!image}
  >
    <Text style={styles.predictText}>Predict Disease</Text>
  </TouchableOpacity>

</View>

);

}

const styles = StyleSheet.create({

container: {
flex: 1,
justifyContent: "center",
alignItems: "center",
padding: 25,
backgroundColor: "#f5f7fa"
},

title: {
fontSize: 34,
fontWeight: "bold",
marginBottom: 5,
color: "#2c3e50"
},

subtitle: {
fontSize: 16,
color: "#7f8c8d",
marginBottom: 30
},

uploadButton: {
backgroundColor: "#27ae60",
paddingVertical: 14,
paddingHorizontal: 25,
borderRadius: 10,
marginBottom: 20,
elevation: 3
},

uploadText: {
color: "white",
fontSize: 16,
fontWeight: "600"
},

previewContainer: {
alignItems: "center",
marginBottom: 20
},

status: {
marginBottom: 10,
color: "#27ae60",
fontWeight: "500"
},

preview: {
width: 220,
height: 220,
borderRadius: 10
},

input: {
width: "100%",
marginBottom: 20,
backgroundColor: "white"
},

predictButton: {
backgroundColor: "#2980b9",
paddingVertical: 14,
paddingHorizontal: 30,
borderRadius: 10,
elevation: 3
},

predictText: {
color: "white",
fontSize: 16,
fontWeight: "600"
},

disabledButton: {
backgroundColor: "#95a5a6"
}

});
