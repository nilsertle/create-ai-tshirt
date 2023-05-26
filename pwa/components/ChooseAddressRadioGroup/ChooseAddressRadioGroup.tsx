import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import { CheckCircleIcon, CheckIcon } from "@heroicons/react/24/outline";
import { AddressInterface } from "../../interfaces/AddressInterface";
import { UserContext } from "../../providers/UserContext";

interface ChooseAddressRadioGroupProps {
  onSelect: (address: AddressInterface) => void;
}

function ChooseAddressRadioGroup({ onSelect }: ChooseAddressRadioGroupProps) {
  const [selected, setSelected] = useState<AddressInterface | null>(null);

  const { user } = useContext(UserContext);

  function handleChange(value: any) {
    setSelected(value);
    onSelect(value);
  }

  useEffect(() => {
    if (user && user.shippingAddresses) {
      setSelected(user.shippingAddresses[0]);
    }
  }, [user]);

  return (
    <div className="w-full">
      <RadioGroup value={selected} onChange={handleChange} className="">
        <div className=" grid grid-cols-2 gap-6 ">
          {user?.shippingAddresses &&
            user.shippingAddresses.map((shippingAddress) => (
              <RadioGroup.Option
                key={shippingAddress["@id"]}
                value={shippingAddress}
                className={({ active, checked }) =>
                  `${
                    active
                      ? "ring-2 ring-white ring-opacity-60 ring-offset-2 ring-offset-darkGray"
                      : ""
                  }
                      ${checked ? "bg-primary text-white" : "bg-white"}
                        relative col-span-1 flex cursor-pointer rounded-lg px-5 py-4 shadow-md focus:outline-none`
                }
              >
                {({ active, checked }) => (
                  <>
                    <div className="flex w-full items-center justify-between">
                      <div className="flex items-center">
                        <div className="flex flex-col gap-2 text-sm">
                          <RadioGroup.Label
                            as="p"
                            className={`font-medium  ${
                              checked ? "text-white" : "text-primary"
                            }`}
                          >
                            {shippingAddress.city}
                          </RadioGroup.Label>
                          <RadioGroup.Description
                            as="div"
                            className={`flex flex-col gap-2  ${
                              checked ? "text-sky-100" : "text-gray-500"
                            }`}
                          >
                            <p>
                              {shippingAddress.country}, {shippingAddress.state}
                            </p>
                            <p>
                              {shippingAddress.street},{" "}
                              {shippingAddress.streetNumber}
                            </p>
                            <p>
                              {shippingAddress.zip}, {shippingAddress.city}
                            </p>
                          </RadioGroup.Description>
                        </div>
                      </div>
                      {checked && (
                        <div className="shrink-0 text-white">
                          <CheckCircleIcon className="h-6 w-6" />
                        </div>
                      )}
                    </div>
                  </>
                )}
              </RadioGroup.Option>
            ))}
        </div>
      </RadioGroup>
    </div>
  );
}

export default ChooseAddressRadioGroup;
