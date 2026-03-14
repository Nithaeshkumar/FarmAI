import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator, StyleSheet, ScrollView } from "react-native";
import { useTensorflowModel } from "react-native-fast-tflite";

import { labels } from "../data/labels";
import { preprocessImage } from "../services/ImagePreprocessing";
import diseaseKnowledge from "../data/diseaseKnowledge.json";
import { detectIntent } from "../services/IntentService";
import { detectLanguage } from "../services/DetectLanguage";
import { speakAnswer } from "../services/TTSService";
import Tts from "react-native-tts";
export default function ResultScreen({ route, navigation }: any) {

const { image, voiceQuery } = route.params;

const plugin = useTensorflowModel(
require("../assets/plant_disease_model.tflite")
);

const [diseaseName, setDiseaseName] = useState("");
const [confidence, setConfidence] = useState("");
const [answer, setAnswer] = useState("");

const language = detectLanguage(voiceQuery || "");

// 🔊 Function to read the result
const speakResult = () => {
speakAnswer(`${diseaseName}. ${answer}`, language);
};

// Add 🔊 button to top right header
useEffect(() => {


navigation.setOptions({
  headerRight: () => (
    <Text
      style={{ fontSize: 22, marginRight: 15 }}
      onPress={speakResult}
    >
      🔊
    </Text>
  )
});


}, [diseaseName, answer]);

useEffect(() => {


const runPrediction = async () => {

  if (plugin.state !== "loaded") return;

  try {

    const input = await preprocessImage(image);

    const output = plugin.model.runSync([input]);

    const prediction = [...output[0]].map((v:any)=>Number(v));

    let maxProb = -Infinity;
    let predictedIndex = 0;

    for (let i = 0; i < prediction.length; i++) {

      if (prediction[i] > maxProb) {

        maxProb = prediction[i];
        predictedIndex = i;

      }

    }

    const predictedLabel = labels[predictedIndex];

    const intent = detectIntent(voiceQuery || "");

    const diseaseInfo = diseaseKnowledge.find(
      (item:any)=> item.class_name === predictedLabel
    );

    if (!diseaseInfo) return;

    const disease = diseaseInfo.disease[language];

    let resultAnswer = "";

    if (intent === "MEDICINE") {

      resultAnswer = diseaseInfo.treatment?.[language]?.join("\n\n");

    }

    else if (intent === "PREVENTION") {

      resultAnswer = diseaseInfo.prevention?.[language]?.join("\n\n");

    }

    else if (intent === "SYMPTOMS") {

      resultAnswer = diseaseInfo.symptoms?.[language]?.join("\n\n");

    }

    else {

      const symptoms = diseaseInfo.symptoms?.[language]?.join("\n") || "";
      const treatment = diseaseInfo.treatment?.[language]?.join("\n") || "";
      const prevention = diseaseInfo.prevention?.[language]?.join("\n") || "";

      resultAnswer =
        `Symptoms:\n${symptoms}\n\n` +
        `Treatment:\n${treatment}\n\n` +
        `Prevention:\n${prevention}`;

    }

    setDiseaseName(disease);
    setConfidence((maxProb * 100).toFixed(2));
    setAnswer(resultAnswer);

  }

  catch (error) {

    console.log("Prediction error:", error);

  }

};

runPrediction();


}, [plugin.state, image]);
useEffect(() => {
  return () => {
    Tts.stop();
  };
}, []);

if (plugin.state !== "loaded") {


return (

  <View style={styles.center}>
    <ActivityIndicator size="large" />
    <Text style={styles.loadingText}>Loading AI Model...</Text>
  </View>

);


}

return (


<ScrollView contentContainerStyle={styles.container}>

  <Text style={styles.title}>🌿 Disease Detection Result</Text>

  <View style={styles.card}>

    <Text style={styles.label}>Disease</Text>
    <Text style={styles.value}>{diseaseName}</Text>

    <Text style={styles.label}>Confidence</Text>
    <Text style={styles.confidence}>{confidence}%</Text>

  </View>

  <View style={styles.answerCard}>
    <Text style={styles.answerText}>{answer}</Text>
  </View>

</ScrollView>


);

}

const styles = StyleSheet.create({

container:{
flexGrow:1,
padding:25,
alignItems:"center",
backgroundColor:"#f5f7fa"
},

center:{
flex:1,
justifyContent:"center",
alignItems:"center"
},

loadingText:{
marginTop:10,
fontSize:16
},

title:{
fontSize:24,
fontWeight:"bold",
marginBottom:20,
color:"#2c3e50"
},

card:{
width:"100%",
backgroundColor:"white",
padding:20,
borderRadius:12,
marginBottom:20,
elevation:3,
alignItems:"center"
},

label:{
fontSize:14,
color:"#7f8c8d",
marginTop:10
},

value:{
fontSize:22,
fontWeight:"bold",
color:"#2c3e50",
textAlign:"center"
},

confidence:{
fontSize:20,
fontWeight:"bold",
color:"#27ae60",
marginTop:5
},

answerCard:{
width:"100%",
backgroundColor:"white",
padding:20,
borderRadius:12,
elevation:3
},

answerText:{
fontSize:16,
lineHeight:24,
textAlign:"left"
}

});
