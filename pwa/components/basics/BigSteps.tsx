import React from "react";

export type Step = {
  primaryText: string;
  secondaryText: string;
  order: number;
  finished: boolean;
};

interface BigStepsProps {
  steps: Step[];
  onStepClick: (step: Step) => void;
}

function BigSteps({ steps, onStepClick }: BigStepsProps) {
  return (
    <fieldset className="flex flex-col gap-y-4 w-full">
      {steps.map((step, index) => (
        <div key={step.order}>
          <input
            type="radio"
            name={step.primaryText}
            value={step.primaryText}
            id={step.primaryText}
            className="peer hidden [&:checked_+_label_svg]:block"
            checked={step.finished}
            onChange={() => onStepClick(step)}
          />

          <label
            htmlFor={step.primaryText}
            className="block cursor-pointer rounded-lg border border-gray-100 p-4 text-sm font-medium shadow-sm hover:border-gray-200 peer-checked:border-green-300 peer-checked:bg-green-50 peer-checked:ring-1 peer-checked:ring-green-300 "
          >
            <div className="flex items-center justify-between">
              <p className="font-semibold text-primary">{step.primaryText}</p>

              <svg
                className="hidden h-5 w-5 text-green-700"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            <p className="mt-1 text-gray-600">{step.secondaryText}</p>
          </label>
        </div>
      ))}
    </fieldset>
  );
}

export default BigSteps;
