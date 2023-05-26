import { StarIcon } from "@heroicons/react/24/solid";
import React from "react";
import {
  StarIcon as StarIconOutline,
  ChatBubbleBottomCenterTextIcon,
} from "@heroicons/react/24/outline";

interface ReviewStarsProps {
  /**
   * The rating to display (not rounded)
   */
  rating: number;
}

function ReviewStars({ rating }: ReviewStarsProps) {
  return (
    <div className="flex flex-row items-center">
      {new Array(Math.round(rating)).fill(null).map((_, i) => (
        <div key={i}>
          <StarIcon className="h-5 w-5 text-amber-400" />
        </div>
      ))}
      {new Array(5 - Math.round(rating)).fill(null).map((_, i) => (
        <div key={i}>
          <StarIconOutline className="h-5 w-5 text-amber-400" />
        </div>
      ))}
    </div>
  );
}

export default ReviewStars;
