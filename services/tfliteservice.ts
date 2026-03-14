import {useTensorflowModel} from "react-native-fast-tflite";

export const loadModel = () => {
  const model = useTensorflowModel(
    require("../assets/plant_disease_model.tflite")
  );

  return model;
};