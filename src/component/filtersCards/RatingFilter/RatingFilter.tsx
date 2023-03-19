import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { all, filterByRating } from "../../../data/resturantSlicer";
import "./RatingFilter.css";

const RatingFilter = () => {
  const dispatch = useDispatch();
  const ratingArr: number[] = [1, 2, 3, 4, 5];
  const [rating, setRating] = useState<number[]>([]);
  const handleRatingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const option = parseInt(event.target.value, 10);
    const isChecked = event.target.checked;
    if (isChecked) {
      setRating([...rating, option]);
    } else {
      setRating(rating.filter((r) => r !== option));
    }
  };
  useEffect(() => {
    if (rating.length) {
      dispatch(filterByRating(rating));
    } else {
      dispatch(all());
    }
  }, [rating]);
  return (
    <div className="Rating">
      <h4>Rating</h4>
      <div className="ratingCheckBox">
        {ratingArr.map((r: number) => (
          <label key={r}>
            <input
              className="checkboxRating"
              type="checkbox"
              value={r}
              checked={rating.includes(r)}
              onChange={handleRatingChange}
            />
            <img
              src={"/imges/starRating/rate-" + r + ".svg"}
              alt={"rate-" + r}
            />
          </label>
        ))}
      </div>
    </div>
  );
};

export default RatingFilter;
