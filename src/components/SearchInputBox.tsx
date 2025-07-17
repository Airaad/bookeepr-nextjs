import React from "react";
import Search from "./icons/Search";

interface SearchBoxProps {
  type?: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  size: "md" | "lg" | "xl";
}

const boxSize = {
  md: "max-w-md",
  lg: "max-w-lg",
  xl: "max-w-xl",
};

function SearchInputBox({
  type = "text",
  placeholder,
  value,
  onChange,
  size,
}: SearchBoxProps) {
  return (
    <div className={`mb-6 ${boxSize[size]} mx-auto relative`}>
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Search />
      </div>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full border border-gray-300 shadow-sm rounded-md py-2 pl-10 pr-3 focus:outline-none focus:ring-2 focus:ring-green-700"
      />
    </div>
  );
}

export default SearchInputBox;
