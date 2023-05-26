import { XMarkIcon } from "@heroicons/react/24/outline";
import React, { useState } from "react";

interface ColorSelectProps {
  colors: {
    name: string;
    hex: string;
    inStock: boolean;
  }[];
  onSelect: (color: string) => void;
}

function ColorSelect({ colors, onSelect }: ColorSelectProps) {
  const [selectedColor, setSelectedColor] = useState(colors?.[0].name);
  return (
    <div className="flex flex-wrap gap-3">
      {colors?.map((color) => (
        <div key={color.name} className={`${!color.inStock && "opacity-60"}`}>
          <input
            type="radio"
            name="ColorOption"
            value={color.name}
            id={color.name}
            disabled={!color.inStock}
            className="peer hidden"
            checked={selectedColor === color.name}
            onChange={(e) => {
              console.log(`chosen color:${color.name}:${color.hex}`);
              setSelectedColor(e.target.value);
              onSelect(e.target.value);
            }}
          />

          <label
            htmlFor={color.name}
            style={{ backgroundColor: color.hex }}
            className={`block h-6 w-6 ${
              color.name === "White" && "border border-gray-300"
            } relative cursor-pointer rounded-full  shadow-sm peer-checked:ring-2 peer-checked:ring-primary peer-checked:ring-offset-2`}
          >
            {!color.inStock && (
              <XMarkIcon className="absolute bottom-0 left-0 right-0 top-0 m-auto h-4 w-4 cursor-not-allowed text-gray-400" />
            )}
            <span className="sr-only">{color.name}</span>
          </label>
        </div>
      ))}

      {/* <div>
        <input
          type="radio"
          name="ColorOption"
          value="ColorRed"
          id="ColorRed"
          className="peer hidden"
        />

        <label
          htmlFor="ColorRed"
          className="block h-8 w-8 cursor-pointer rounded-full bg-red-500 shadow-sm peer-checked:ring-2 peer-checked:ring-red-500 peer-checked:ring-offset-2"
        >
          <span className="sr-only">Fiesta Red</span>
        </label>
      </div>

      <div>
        <input
          type="radio"
          name="ColorOption"
          value="ColorBlue"
          id="ColorBlue"
          className="peer hidden"
        />

        <label
          htmlFor="ColorBlue"
          className="block h-8 w-8 cursor-pointer rounded-full bg-blue-500 shadow-sm peer-checked:ring-2 peer-checked:ring-blue-500 peer-checked:ring-offset-2"
        >
          <span className="sr-only">Cobalt Blue</span>
        </label>
      </div>

      <div>
        <input
          type="radio"
          name="ColorOption"
          value="ColorGold"
          id="ColorGold"
          className="peer hidden"
        />

        <label
          htmlFor="ColorGold"
          className="block h-8 w-8 cursor-pointer rounded-full bg-amber-500 shadow-sm peer-checked:ring-2 peer-checked:ring-amber-500 peer-checked:ring-offset-2"
        >
          <span className="sr-only">Goldtop</span>
        </label>
      </div> */}
    </div>
  );
}

export default ColorSelect;
