import { useEffect, useState } from "react";
import {
  ReviewCreateInterface,
  ReviewInterface,
} from "../interfaces/ReviewInterface";
import { AuthenticatedUserInterface } from "../interfaces/UserInterface";
import { fetchReviews } from "./ApiPlatformQueries";
import { createReview } from "./DataQueries";

export function useReview() {
  const [reviews, setReviews] = useState<ReviewInterface[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState<number | null>(null);
  const [reloadReviews, setReloadReviews] = useState(false);

  async function createNewReview(newReview: ReviewCreateInterface) {
    const newCreatedReview = await createReview(newReview);
    if (newCreatedReview.stars) {
      setReloadReviews(!reloadReviews);
    }
  }

  useEffect(() => {
    async function getReviews() {
      const fetchedReviews = await fetchReviews();
      setReviews(fetchedReviews);
      // set rating to average of all ratings of the reviews
      const rating = fetchedReviews?.reduce((acc, review) => {
        return acc + review.stars;
      }, 0);
      setRating(rating / fetchedReviews.length);
      setLoading(false);
    }
    getReviews();
  }, [reloadReviews]);

  return { reviews, loading, rating, createNewReview };
}
