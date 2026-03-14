import Tts from "react-native-tts";

export const speakAnswer = (text: string, language: string) => {

Tts.stop();
if (language === "tamil") {
Tts.setDefaultLanguage("ta-IN");
}

else if (language === "hindi") {
Tts.setDefaultLanguage("hi-IN");
}

else if (language === "telugu") {
Tts.setDefaultLanguage("te-IN");
}

else {
Tts.setDefaultLanguage("en-US");
}

Tts.speak(text);

};
