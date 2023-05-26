import React, { useState } from "react";
import BigSteps, { Step } from "../../basics/BigSteps";

interface CheckoutProps {}

function Checkout({}: CheckoutProps) {
  const [steps, setSteps] = useState<Step[]>([
    {
      primaryText: "Image Upload",
      secondaryText:
        "Upload your own image or generate a unique one with our AI Art Generator",
      order: 0,
      finished: false,
    },
    {
      primaryText: "Choose a Color",
      secondaryText: "Choose a color for your product",
      order: 1,
      finished: true,
    },
    {
      primaryText: "Choose a Size",
      secondaryText: "Choose a size for your product",
      order: 2,
      finished: false,
    },
    {
      primaryText: "Review",
      secondaryText: "Review your order",
      order: 3,
      finished: true,
    },
  ]);
  return (
    <div className="bg-white h-full w-full p-10 flex gap-y-6 flex-col">
      <h4 className="text-2xl text-primary font-bold">
        Check out your progress
      </h4>
      <BigSteps
        steps={steps}
        onStepClick={(newStep) => {
          console.log("newStep", newStep);
        }}
      />
    </div>
  );
}

export default Checkout;
