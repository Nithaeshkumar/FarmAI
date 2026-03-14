import ImageResizer from "react-native-image-resizer";
import RNFS from "react-native-fs";
import jpeg from "jpeg-js";
import { Buffer } from "buffer";

export const preprocessImage = async (uri: string) => {

  try {

    const resized = await ImageResizer.createResizedImage(
      uri,
      224,
      224,
      "JPEG",
      100,
      0,
      undefined,
      false
    );

    const base64 = await RNFS.readFile(resized.uri, "base64");
    const buffer = Buffer.from(base64, "base64");

    const raw = jpeg.decode(buffer, { useTArray: true });

    const { data, width, height } = raw;

    const floatArray = new Float32Array(224 * 224 * 3);

    for (let y = 0; y < height; y++) {

      for (let x = 0; x < width; x++) {

        const idx = (y * width + x) * 4;

        const r = data[idx];
        const g = data[idx + 1];
        const b = data[idx + 2];

        const tensorIndex = (y * width + x) * 3;

        floatArray[tensorIndex] = r/255;
        floatArray[tensorIndex + 1] = g/255;
        floatArray[tensorIndex + 2] = b/255;

      }

    }
    console.log("First pixels:", floatArray.slice(0, 10));
    console.log("Tensor size:", floatArray.length);

    return floatArray;

  } catch (error) {

    console.log("Image preprocessing error:", error);
    throw error;

  }

};