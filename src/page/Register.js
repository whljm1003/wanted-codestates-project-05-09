import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addReview } from "../store/dataSlice";
import Stars from "../components/Stars";

function Register() {
  const [review, setReview] = useState({
    id: 0,
    productNm: "",
    review: "",
    productImg: "",
    reviewRate: 0,
    createDt: new Date().getTime(),
  });
  const ratings = [1, 2, 3, 4, 5];
  const [hoverRating, setHoverRating] = useState(0);
  const imgRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // titleHandler
  const titleHandler = (e) => {
    const { value } = e.target;
    setReview({ ...review, id: value.charCodeAt(), productNm: value });
  };
  // textHandler
  const textHandler = (e) => setReview({ ...review, review: e.target.value });
  // ratingHandler
  const ratingHandler = (rating) =>
    setReview({ ...review, reviewRate: rating });
  // imgHandler
  const imgHandler = (e) => {
    e.preventDefault();
    imgRef.current.click();
  };
  const saveFileImage = (e) => {
    setReview({
      ...review,
      productImg: URL.createObjectURL(e.target.files[0]),
    });
  };
  // submit
  const submit = (e) => {
    e.preventDefault();
    dispatch(addReview(review));
    navigate("/");
  };
  // test useEfeect
  useEffect(() => {
    console.log(review);
  }, [review]);
  return (
    <Wrapper>
      <Header />
      <Form onSubmit={submit}>
        <Section>
          <Name>제목</Name>
          <Title
            type="text"
            maxLength={30}
            placeholder="리뷰 제목을 작성해주세요"
            onChange={titleHandler}
          />
        </Section>
        <Section>
          <Name>내용</Name>
          <Contents
            type="text"
            maxLength={250}
            placeholder="리뷰 내용을 작성해주세요"
            onChange={textHandler}
          />
        </Section>
        <ImgSection>
          {review.productImg && (
            <Preview alt="preview" src={review.productImg} />
          )}
          <input
            style={{ display: "none" }}
            ref={imgRef}
            type="file"
            accept="image/*"
            onChange={saveFileImage}
          />
          <Btn onClick={imgHandler}>이미지 업로드</Btn>
        </ImgSection>
        <Section>
          <Name>평점</Name>
          <Rating>
            {ratings.map((star) => (
              <Stars
                key={star}
                index={star}
                rating={review.reviewRate}
                hoverRating={hoverRating}
                setHoverRating={setHoverRating}
                ratingHandler={ratingHandler}
              />
            ))}
          </Rating>
        </Section>
        <Btn onClick={submit}>리뷰 등록하기</Btn>
      </Form>
    </Wrapper>
  );
}

export default Register;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  max-width: 420px;
  height: 100vh;
  margin: 0 auto;
  @media screen and (max-width: 375px) {
    height: 120vh;
  }
`;
const Form = styled.form`
  margin: 2rem;
`;
const Section = styled.div`
  width: 100%;
`;
const Name = styled.label`
  display: block;
  font-size: 1.8rem;
  font-weight: 700;
  margin-bottom: 0.3rem;
`;
const Title = styled.input`
  display: block;
  outline-color: ${({ theme }) => theme.colors.black};
  border: 1px solid ${({ theme }) => theme.colors.grey};
  box-sizing: border-box;
  border-radius: 5px;
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1rem;
`;
const Contents = styled.textarea`
  box-sizing: border-box;
  border: 1px solid ${({ theme }) => theme.colors.grey};
  outline-color: ${({ theme }) => theme.colors.black};
  border-radius: 5px;
  width: 100%;
  height: 7rem;
  padding: 0.2rem;
  font-size: 1rem;
  resize: none;
  &::placeholder {
    font-size: 1rem;
  }
`;
const ImgSection = styled.div`
  ${({ theme }) => theme.common.flexColumn};
  margin-top: 1rem;
  width: 100%;
`;
const Preview = styled.img`
  ${({ theme }) => theme.common.flexRow};
  width: 40%;
  border-radius: 50%;
`;

const Rating = styled.div`
  ${({ theme }) => theme.common.flexRow};
  margin: 0.3rem;
`;

const Btn = styled.button`
  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.lightWhite};
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 700;
  width: 100%;
  height: 3rem;
  margin: 1rem 0;
`;
