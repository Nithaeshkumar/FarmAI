export const detectIntent = (
query: string
): "MEDICINE" | "PREVENTION" | "SYMPTOMS" | "CAUSE" | "GENERAL" => {

if (!query) return "GENERAL";

const text = query.toLowerCase();

// -------- MEDICINE --------
if (
text.includes("medicine") ||
text.includes("spray") ||
text.includes("treatment") ||

// Tamil
text.includes("மருந்து") ||

// Hindi
text.includes("दवा") ||

// Telugu
text.includes("మందు")

) {
return "MEDICINE";
}

// -------- PREVENTION --------
if (
text.includes("prevent") ||
text.includes("avoid") ||
text.includes("prevention") ||


// Tamil
text.includes("தடுப்பு") ||
text.includes("தடுக்க") ||

// Hindi
text.includes("बचाव") ||

// Telugu
text.includes("నివారణ")


) {
return "PREVENTION";
}

// -------- SYMPTOMS --------
if (
text.includes("symptom") ||
text.includes("sign") ||
text.includes("problem") ||


// Tamil
text.includes("அறிகுறி") ||

// Hindi
text.includes("लक्षण") ||

// Telugu
text.includes("లక్షణాలు")


) {
return "SYMPTOMS";
}

// -------- CAUSE --------
if (
text.includes("cause") ||
text.includes("reason") ||


// Tamil
text.includes("காரணம்") ||

// Hindi
text.includes("कारण") ||

// Telugu
text.includes("కారణం")


) {
return "CAUSE";
}

return "GENERAL";
};
