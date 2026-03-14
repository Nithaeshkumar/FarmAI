# 🌱 FarmAI – AI Crop Disease Detection System

FarmAI is an **AI-powered agricultural assistant** that helps farmers detect crop diseases using leaf images and provides guidance in their **local language through voice interaction**.

The system uses **deep learning and mobile AI inference** to identify plant diseases directly on a smartphone, allowing farmers to diagnose crop problems **without requiring internet connectivity**.

---

# 📌 Project Highlights

* 🌿 Detects **38 plant diseases**
* 🧠 Deep Learning model trained on **PlantVillage dataset (~87,000 images)**
* 📱 Runs **completely offline on mobile devices**
* 🔊 Provides **voice guidance in local languages**
* ⚡ Fast inference using **TensorFlow Lite**
* 🌍 Designed for **farmers in low-connectivity rural areas**

---

# 🎯 Problem Statement

Crop diseases spread rapidly and can cause **significant yield losses** if not identified early.

Many farmers in rural regions face challenges such as:

* Limited access to agricultural experts
* Lack of reliable internet connectivity
* Difficulty identifying crop diseases visually

FarmAI addresses these challenges by providing an **AI-based disease detection system that works directly on a smartphone**, enabling farmers to receive immediate guidance.

---

# 🏗 System Architecture

The FarmAI system follows an **edge AI architecture**, where the disease detection model runs directly on the mobile device.

```
Farmer
   ↓
Mobile Camera
   ↓
React Native Mobile App
   ↓
Image Preprocessing
   ↓
TensorFlow Lite Model
   ↓
Disease Prediction
   ↓
Local Knowledge Base
   ↓
Voice/Text Guidance
```

---

# 🧠 AI Model Overview

The system uses a **Convolutional Neural Network (CNN)** for plant disease classification.

CNN models are effective for image analysis because they can automatically learn visual features such as:

* leaf discoloration
* fungal growth patterns
* bacterial spots
* structural leaf damage

---

# 🏛 Model Architecture

The model follows a typical CNN feature extraction pipeline:

```
Input Image (224 × 224 × 3)
      ↓
Convolution Layers
      ↓
Activation Functions
      ↓
Pooling Layers
      ↓
Feature Extraction
      ↓
Fully Connected Layers
      ↓
Softmax Output
```

The network learns visual indicators of plant disease such as:

* leaf texture anomalies
* color variations
* disease spots
* irregular patterns

---

# 📊 Dataset

The model was trained using the **PlantVillage dataset**, which contains labeled images of healthy and diseased plant leaves.

Dataset characteristics:

| Property          | Value   |
| ----------------- | ------- |
| Total Images      | ~87,000 |
| Training Images   | ~70,000 |
| Validation Images | ~17,000 |
| Disease Classes   | 38      |

Each image is labeled with a disease category enabling **supervised deep learning training**.

---

# 🖼 Model Input

The deep learning model expects images in the following format:

```
(224, 224, 3)
```

Where:

* **224** → Image height
* **224** → Image width
* **3** → RGB color channels

During inference the input tensor becomes:

```
(1, 224, 224, 3)
```

The first dimension represents the **batch size**.

---

# ⚙ Image Preprocessing

Before passing images to the model, the system performs preprocessing operations.

### 1️⃣ Image Resizing

All images are resized to:

```
224 × 224 pixels
```

This ensures compatibility with the CNN model.

---

### 2️⃣ Pixel Normalization

Pixel values are normalized so the neural network can process them efficiently.

Normalization formula:

[
x_{normalized} = \frac{x}{127.5} - 1
]

This scales pixel values from:

```
0 – 255 → -1 – 1
```

---

### 3️⃣ Tensor Conversion

The processed image is converted into a tensor format compatible with the **TensorFlow Lite model**.

---

# ⚙ Model Training Pipeline

The model training pipeline is implemented in:

```
plant-disease-detection-system.ipynb
```

Training workflow:

```
Dataset Loading
      ↓
Image Preprocessing
      ↓
Training / Validation Split
      ↓
CNN Model Creation
      ↓
Model Training
      ↓
Model Evaluation
      ↓
Model Export
      ↓
TensorFlow Lite Conversion
```

Training metrics such as **accuracy and loss** are monitored during the training process.

---

# 📱 TensorFlow Lite Conversion

Since the system runs on smartphones, the trained model is converted into **TensorFlow Lite format**.

```
model.tflite
```

TensorFlow Lite provides:

* Faster inference speed
* Reduced memory usage
* Smaller model size
* Efficient mobile deployment

This enables **on-device AI inference without requiring a server connection**.

---

# 🗣 Language Detection and Translation

The system includes a **language detection module** that identifies the language used by the farmer.

After detecting the language, the system provides responses accordingly.

Supported interaction methods include:

* voice commands
* text-based input

---

# 🧠 Intent Recognition

The system processes farmer queries using an intent recognition module.

Supported intents include:

* disease detection request
* treatment guidance
* prevention information
* general assistance

The system interprets the user query and generates an appropriate response.

---

# 🔊 Text-to-Speech Output

After generating a response, the system converts text into spoken audio.

Pipeline:

```
System Response
      ↓
Text Processing
      ↓
Speech Synthesis
      ↓
Audio Output
```

This enables farmers to receive guidance through **voice-based interaction**.

---

# 🔄 End-to-End Inference Pipeline

When a farmer uses the application, the following process occurs:

```
Leaf Image Capture
        ↓
Image Preprocessing
        ↓
TensorFlow Lite Model
        ↓
Disease Prediction
        ↓
Language Detection
        ↓
Intent Processing
        ↓
Text Response Generation
        ↓
Text-to-Speech Output
```

The farmer receives the **detected disease and recommended treatment** through both text and voice.

---

# 📱 Integration with Mobile Application

The AI model integrates with a **React Native mobile application**.

Inside the mobile application:

* User captures a leaf image
* Image is preprocessed
* TensorFlow Lite model performs prediction
* Language detection identifies user language
* The system communicates results via text and voice

This allows farmers to interact with the system **naturally and receive immediate results**.

---

# 🚜 Setup Instructions (For Farmers)

This application is designed so that **farmers can use it easily without technical knowledge**.

---

## Step 1: Install the Application

1. Download the **FarmAI mobile application** from the installation link provided by the project team.
2. Install the application on your Android smartphone.
3. Allow permissions for:

* Camera
* Microphone
* Storage

---

## Step 2: Open the Application

1. Tap on the **FarmAI app icon**.
2. The home screen will appear.

---

## Step 3: Capture the Leaf Image

1. Tap the **Camera Button**.
2. Hold the phone above the leaf.
3. Ensure the leaf is clearly visible.
4. Tap **Capture Image**.

---

## Step 4: Disease Detection

The AI model analyzes the leaf image and detects the disease.

Example output:

```
Detected Disease: Tomato Early Blight
Confidence: 92%
```

---

## Step 5: Receive Guidance

The system provides:

* disease description
* cause of the disease
* prevention steps
* treatment suggestions

The response is delivered as **text and voice guidance**.

---

## Step 6: Ask Questions Using Voice

Farmers can interact with the system by speaking.

Examples:

```
What is the treatment for this disease?
How can I prevent this disease?
Explain the symptoms.
```

---

# 📋 System Requirements

| Requirement      | Specification         |
| ---------------- | --------------------- |
| Operating System | Android 8.0 or higher |
| Camera           | Minimum 8 MP          |
| RAM              | 3 GB recommended      |
| Storage          | 200 MB free space     |

---

# 🔮 Future Improvements

* Support additional crop types
* Expand disease knowledge base
* Improve model accuracy using real farm images
* Add severity detection for diseases

---

# 📜 License

This project is developed for the **SASTRA Annual Tech-Tonic AI Hackathon**.

---

