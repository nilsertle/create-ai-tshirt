import React, { useState } from "react";

interface SizesSelectProps {
  sizes: { name: string; value: string; inStock: boolean }[];
  onSelect: (size: string) => void;
}

function SizesSelect({ sizes, onSelect }: SizesSelectProps) {
  const [selectedSize, setSelectedSize] = useState(sizes?.[0].name);
  return (
    <div className="flex space-x-3 text-xs">
      {sizes?.map((size) => (
        <div key={size.name} className={`${!size.inStock && "opacity-60"}`}>
          <label>
            <input
              className={"peer sr-only"}
              name="size"
              type="radio"
              disabled={!size.inStock}
              value={size.name}
              checked={selectedSize === size.name}
              onChange={(e) => {
                setSelectedSize(e.target.value);
                onSelect(e.target.value);
              }}
            />
            <div
              className={`flex h-9 w-9 ${
                size.inStock
                  ? "cursor-pointer text-primary"
                  : "cursor-not-allowed text-gray-400"
              } items-center justify-center rounded-xl border border-darkGray  peer-checked:border-primary peer-checked:bg-primary peer-checked:text-white`}
            >
              {size.name}
            </div>
          </label>
        </div>
      ))}
    </div>
  );
}

export default SizesSelect;
