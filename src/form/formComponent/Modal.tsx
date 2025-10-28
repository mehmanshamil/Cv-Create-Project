// SectionWithAdd.tsx
"use client";
import React, { useState } from "react";

interface SectionProps {
  title: string;
  items: string[];
  onChange: (items: string[]) => void;
}

const SectionWithAdd: React.FC<SectionProps> = ({ title, items, onChange }) => {
  const [inputValue, setInputValue] = useState("");

  const handleAdd = () => {
    if (inputValue.trim() === "") return; // boş əlavə etmə
    onChange([...items, inputValue.trim()]); // mövcud list + yeni item
    setInputValue(""); // inputu təmizlə
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

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-semibold">{title}</h2>
      </div>
      <div className="flex gap-2 mb-2">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={`Add ${title}`}
          className="flex-1 px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="button"
          onClick={handleAdd}
          className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          +
        </button>
      </div>
      <ul className="list-disc list-inside">
        {items.map((item, index) => (
          <li key={index} className="flex justify-between items-center">
            {item}
            <button
              type="button"
              onClick={() => removeItem(index)}
              className="text-red-500 font-bold px-2"
            >
              x
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectionWithAdd;
