import React, { useState } from "react";

interface ShippingProgressProps {
  defaultShippingState: 0 | 1 | 2 | 3;
}

function ShippingProgress({ defaultShippingState }: ShippingProgressProps) {
  const [shippingState, setShippingState] = useState<0 | 1 | 2 | 3>(
    defaultShippingState
  );
  return (
    <div className="flex flex-col gap-5">
      <p className="font-semibold">
        {shippingState === 0 && "Order placed on 12/12/2020"}
        {shippingState === 1 && "Preparing to ship on 12/12/2020"}
        {shippingState === 2 && "Shipped on 12/12/2020"}
        {shippingState === 3 && "You're package has arrived on 12/12/2020"}
      </p>
      <div className="h-2 w-full rounded-full bg-gray-200 dark:bg-gray-700">
        <div
          className="h-2 rounded-full bg-secondary"
          style={{
            width: `${(shippingState / 3) * 100}%`,
          }}
        ></div>
      </div>
      <div className="hidden flex-row items-center justify-between md:flex">
        <p className={`${shippingState >= 0 && "text-secondary"}`}>
          Order placed
        </p>
        <p className={`${shippingState >= 1 && "text-secondary"}`}>
          Processing
        </p>
        <p className={`${shippingState >= 2 && "text-secondary"}`}>Shipped</p>
        <p className={`${shippingState >= 3 && "text-secondary"}`}>Delivered</p>
      </div>
    </div>
  );
}

export default ShippingProgress;
