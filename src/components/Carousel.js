import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useNavigate } from "react-router-dom";

export const Carousel = ({ id, imgData }) => {
  const navigate = useNavigate();
  // 디테일 페이지 이동
  const goToDetail = (id) => {
    navigate(`/detail/${id}`);
  };
  return (
    <Container>
      <StyledSlider {...settings}>
        {imgData?.map((imgItem) => (
          <img
            alt="img"
            key={imgItem}
            src={imgItem}
            onClick={() => goToDetail(id)}
          />
        ))}
      </StyledSlider>
    </Container>
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

const Container = styled.div``;

const StyledSlider = styled(Slider)`
  .slick-prev {
    display: none;
  }
  .slick-next {
    display: none;
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
