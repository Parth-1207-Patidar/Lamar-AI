import React from "react";
import { useState } from "react";

const API = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${
  import.meta.env.VITE_GEMINI_API_KEY
}`;

const Dashboard = () => {
  const fetchOutput = async (input) => {
    const response = await fetch(API, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              {
                text:
                  input +
                  ", Answer in a way that Lamar Davis from GTA V would respond. Do not add emotions in brackets instead try giving it up in the response.",
              },
            ],
          },
        ],
        generationConfig: {
          maxOutputTokens: 25600,
        },
      }),
    });
    const data = await response.json();
    const generatedText = data.candidates[0].content.parts[0].text;
    setOutput(generatedText);
  };

  const [output, setOutput] = useState("");
  const [input, setInput] = useState("");
  return (
    <div className="dark:bg-[#424242] gap-1 dark:text-white flex flex-row items-center justify-center h-screen">
      <div className="dark:bg-[#212121] rounded-xl w-1/6 h-screen ">
        <div className="w-full h-2/3 flex flex-col items-center justify-center gap-2 border-b-4 border-b-[#424242]">
          <h1 className="absolute top-2">Lamar Davis</h1>
          <button className="w-2/3 bg-purple-700 p-2 rounded-md">+ New Chat</button>
        </div>
        <div className="w-full h-1/3 flex flex-col items-center justify-center gap-2">
          <button className="w-2/3 bg-purple-700 p-2 rounded-md">HOME</button>
          <button className="w-2/3 bg-purple-700 p-2 rounded-md">SAVED</button>
        </div>
      </div>
      <div className="dark:bg-[#212121] rounded-xl gap-2 bg-opacity-90 dark:text-white p-4 flex flex-col items-center justify-center h-screen w-5/6">
        <span>{output}</span>
        <div className="w-2/3 flex flex-row items-center justify-center gap-2">
          <input
            className="dark:bg-[#424242] w-5/6 rounded-full p-3"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Lamar..."
          />
          <button
            className="dark: bg-white dark: text-black rounded-full p-1"
            onClick={() => fetchOutput(input)}
          >
            Ask
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
