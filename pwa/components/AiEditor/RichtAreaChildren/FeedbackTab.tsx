import { ArrowLeftCircleIcon, BackwardIcon } from "@heroicons/react/24/outline";
import { ArrowLeftIcon, StarIcon } from "@heroicons/react/24/solid";
import React, { useState } from "react";
import { useReview } from "../../../helpers/useReview";
import FancyButton from "../../basics/FancyButton";
import ReviewStars from "../../Feedback/ReviewStars";

interface FeedbackTabProps {
  onBack: () => void;
}

function FeedbackTab({ onBack }: FeedbackTabProps) {
  const { loading, rating, reviews, createNewReview } = useReview();
  const [comment, setComment] = useState("");
  return (
    <div className="flex h-full flex-col justify-between gap-y-6">
      <div className="flex flex-row items-center gap-2">
        <button onClick={onBack}>
          <ArrowLeftCircleIcon className="h-6 w-6 text-primary" />
        </button>

        <h2 className="text-xl font-bold text-primary">Reviews</h2>
      </div>
      <div className="flex flex-col items-start gap-y-6">
        {reviews?.map((review) => {
          return (
            <div key={review.id} className="flex flex-col gap-y-2">
              <div className="flex flex-row items-center gap-2">
                <div className="flex flex-row items-center gap-2">
                  <StarIcon className="h-5 w-5 text-primary" />
                  <p className="text-sm font-bold text-gray-900 dark:text-white">
                    {review.stars}
                  </p>
                </div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">
                  by{" "}
                  <span className="font-bold">
                    {review.author ? (
                      `${review.author?.firstName} ${review.author?.lastName}`
                    ) : (
                      <span className="text-xsm font-normal">Anonymous</span>
                    )}
                  </span>
                </p>
              </div>
              <p className="text-sm text-gray-900 dark:text-white">
                {review.comment}
              </p>
            </div>
          );
        })}
      </div>

      {/* <form>
        <div className="mb-4 w-full rounded-lg border border-gray-200 bg-gray-50 dark:border-gray-600 dark:bg-gray-700">
          <div className="flex items-center justify-between border-b px-3 py-2 dark:border-gray-600">
            <ReviewStars rating={3} />
            <FancyButton
              primaryText={"Publish Review"}
              bgColor="primary"
              sqaure
              onClick={() => {
                createNewReview({
                  stars: 3,
                  comment: comment,
                  product: "/api/products/2",
                });
              }}
            />{" "}
          </div>
          <div className="rounded-b-lg bg-white px-4 py-2 dark:bg-gray-800">
            <label htmlFor="editor" className="sr-only">
              Publish post
            </label>
            <textarea
              id="editor"
              rows={4}
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              className="block w-full resize-none border-0 bg-white px-0 text-sm text-gray-800 focus:ring-0 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              placeholder="Write what you think about this product..."
            ></textarea>
          </div>
        </div>
      </form> */}
    </div>
  );
}

export default FeedbackTab;
