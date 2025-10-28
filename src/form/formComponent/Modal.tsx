// SectionWithAdd.tsx
"use client";
import React, { useState } from "react";

interface SectionProps {
  title: string;
  items: string[];
  onChange: (items: string[]) => void;
  thema: boolean; // dark/light mövzu prop-u əlavə olundu
}

const SectionWithAdd: React.FC<SectionProps> = ({ title, items, onChange, thema }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim() === "") return;
    onChange([...items, inputValue.trim()]);
    setInputValue("");
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const removeItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    onChange(newItems);
  };

  // Rəngləri thema görə dəyişdiririk
  const inputClass = `flex-1 px-3 py-2 border rounded focus:outline-none ${
    thema ? "bg-white text-black border-gray-300 focus:ring-blue-500" : "bg-gray-800 text-white border-gray-600 focus:ring-blue-300"
  }`;

  const addButtonClass = `px-3 py-2 rounded font-bold ${
    thema ? "bg-green-500 text-white hover:bg-green-600" : "bg-green-700 text-white hover:bg-green-600"
  }`;

  const removeButtonClass = `text-red-500 font-bold px-2 cursor-pointer`;

  const listClass = `${thema ? "text-black" : "text-white"}`;

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className={`text-xl font-semibold ${thema ? "text-black" : "text-white"}`}>{title}</h2>
      </div>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={`Add ${title}`}
          className={inputClass}
        />
        <button type="button" onClick={handleAdd} className={addButtonClass}>
          +
        </button>
      </div>
      <ul className={`list-disc list-inside ${listClass}`}>
        {items.map((item, index) => (
          <li key={index} className="flex justify-between items-center">
            {item}
            <button type="button" onClick={() => removeItem(index)} className={removeButtonClass}>
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectionWithAdd;
