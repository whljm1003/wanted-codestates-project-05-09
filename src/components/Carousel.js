import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export const Carousel = ({ imgData }) => {
  return (
    <StyledSlider {...settings}>
      {imgData?.map((imgItem) => (
        <img alt="img" key={imgItem} src={imgItem} />
      ))}
    </StyledSlider>
  );
};
const settings = {
  dots: true,
  infinite: true,
  autoplay: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  centerPadding: "0px",
};
const StyledSlider = styled(Slider)`
  .slick-prev {
    left: 0px;
    z-index: -999;
  }
  .slick-next {
    right: 0px;
    z-index: -999;
  }
  .slick-dots {
    bottom: 10px;
    li > button {
      &::before {
        color: ${({ theme }) => theme.colors.darkGrey};
        font-size: 0.8rem;
      }
    }
  }
`;
