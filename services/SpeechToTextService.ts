import Voice from "@react-native-voice/voice";

export const startListening = async (language: string) => {
  try {
    await Voice.start(language);
  } catch (e) {
    console.log("Speech start error:", e);
  }
};

export const stopListening = async () => {
  try {
    await Voice.stop();
  } catch (e) {
    console.log("Speech stop error:", e);
  }
};