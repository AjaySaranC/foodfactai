"use client";
import React, { useState } from "react";
import { GoogleGenerativeAI, Content } from "@google/generative-ai";

const Home: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [responseText, setResponseText] = useState<string | null>(null);
  const [analysisType, setAnalysisType] = useState<string>("calorie");
  const [isEstimating, setIsEstimating] = useState<boolean>(false);
  const [warningMessage, setWarningMessage] = useState<string>("");

  const genAI = new GoogleGenerativeAI('AIzaSyD9Sk3BLXqwn4BIzj-Pui1tDDx6v9okJU0');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      setWarningMessage(""); // Clear any previous warning message
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEstimateClick = async () => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Image = reader.result?.toString().split(",")[1];

        if (base64Image) {
          setIsEstimating(true); // Start estimating

          const prompt = `
            You are an expert nutritionist. Analyze the food items in the image
            and calculate the total ${analysisType}. Also, provide details of every food item with ${analysisType} intake
            in the following format:
            
            1. Item 1 - no of ${analysisType}
            2. Item 2 - no of ${analysisType}
          `;

          const imageParts = [
            {
              inlineData: {
                data: base64Image,
                mimeType: selectedImage.type,
              },
            },
          ];

          console.log("Image Parts:", imageParts);
          const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
          const result = await model.generateContent([prompt, ...imageParts]);
          const response = await result.response;
          const ftext = response.text();
          console.log(ftext);
          console.log(analysisType);

          // Update the response text state
          setResponseText(ftext);
        }

        setIsEstimating(false); // End estimating
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setWarningMessage("Please upload an image before estimating.");
    }
  };

  return (
    <div>
      <div className="flex justify-center mb-4">
        <select
          className="block appearance-none bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
          value={analysisType}
          onChange={(e) => setAnalysisType(e.target.value)}
        >
          <option value="calorie">Calorie</option>
          <option value="protein">Protein</option>
        </select>
      </div>
      <div className="flex justify-center mb-4">
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
      {imagePreview && (
        <div className="flex justify-center mb-4">
          <img src={imagePreview} alt="Selected" className="w-52 h-52 object-cover rounded-lg" />
        </div>
      )}
      <div className="flex justify-center">
        <button className="p-[3px] relative" onClick={handleEstimateClick} disabled={isEstimating}>
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
            {isEstimating ? "Estimating..." : "Estimate"}
          </div>
        </button>
      </div>
      <div className="flex justify-center mt-4">
        {warningMessage && <p className="text-white text-lg">{warningMessage}</p>}
        <p className="text-white whitespace-pre-wrap">{responseText}</p>
      </div>
    </div>
  );
};

export default Home;
