import { Tab } from "@headlessui/react";
import React, { useState } from "react";

interface TabGroupProps {
  tabs: (string | React.ReactNode)[];
  children: React.ReactNode[];
}

function TabGroup({ children, tabs }: TabGroupProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Tab.Group selectedIndex={selectedIndex} onChange={setSelectedIndex}>
      <Tab.List
        className={
          "mb-2 flex w-full items-center justify-center rounded-lg border border-gray-100 bg-darkGray p-1 shadow-inner"
        }
      >
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            className={({ selected }) =>
              `flex w-full transform items-center justify-center gap-2 rounded-md px-4 py-2 text-sm text-gray-500 transition-all duration-200 ease-in-out hover:text-gray-700 ${
                selected
                  ? "transform bg-white text-primary transition-all duration-200 ease-in-out"
                  : "text-primary"
              }`
            }
          >
            {tab}
          </Tab>
        ))}
      </Tab.List>
      <Tab.Panels>
        {children.map((child, index) => (
          <Tab.Panel key={index}>{child}</Tab.Panel>
        ))}
      </Tab.Panels>
    </Tab.Group>
  );
}

export default TabGroup;
