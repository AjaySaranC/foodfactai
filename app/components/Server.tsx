"use client";
import React, { useState } from 'react';

const Home: React.FC = () => {
  const [image, setImage] = useState<any>(null);
  const [preview, setPreview] = useState<any>(null);
  const [response, setResponse] = useState<string>("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      
    setPreview(URL.createObjectURL(e.target.files?.[0] as any))
    setImage((e.target.files?.[0] as any))
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (!image) {
      console.error("No image selected");
      return;
    }

    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await fetch("/api/", {
        method: "POST",
        body: JSON.stringify({image})
      });

      if (!res.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await res.json();
      setResponse(data.response);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-center mb-4">
        <input type="file" accept="image/*" onChange={handleImageChange} />
      </div>

      {preview && (
        <div className="flex justify-center mb-4">
          <img src={preview} alt="Selected" className="w-52 h-52 object-cover rounded-lg" />
        </div>
      )}

      <div className="flex justify-center">
        <button onClick={handleSubmit} className="p-[3px] relative">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg" />
          <div className="px-8 py-2 bg-black rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
            Estimate
          </div>
        </button>
      </div>

      {response && (
        <div className="flex justify-center mt-4">
          <p className="text-white">{response}</p>
        </div>
      )}
    </div>
  );
};

export default Home;
