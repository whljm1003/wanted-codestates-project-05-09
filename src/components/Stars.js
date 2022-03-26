import React, { useMemo } from "react";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";

const Stars = ({
  index,
  rating,
  hoverRating,
  setHoverRating,
  ratingHandler,
}) => {
  const onMouseEnter = (index) => setHoverRating(index);
  const onMouseLeave = () => setHoverRating(0);
  // hover, onclick 이벤트
  const fillColor = useMemo(() => {
    if (hoverRating >= index) {
      return "#fbc531";
    } else if (!hoverRating && rating >= index) {
      return "#fbc531";
    }
    return "#dcdde1";
  }, [rating, hoverRating, index]);

  return (
    <div
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={() => onMouseLeave()}
      onClick={() => ratingHandler(index)}
    >
      <Star color={fillColor} />
    </div>
  );
};

export default Stars;

const Star = styled(FaStar)`
  font-size: 3.5rem;
  margin-right: 0.7rem;
  cursor: pointer;
`;
