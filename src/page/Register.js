import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addReview } from "../store/dataSlice";
import Stars from "../components/Stars";

function Register() {
  const [review, setReview] = useState({
    productNm: "",
    review: "",
    productImg: [],
    reviewRate: 0,
    createDt: new Date().getTime(),
  });
  const ratings = [1, 2, 3, 4, 5];
  const [hoverRating, setHoverRating] = useState(0);
  const imgRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //오류메시지 상태저장
  const [nameMessage, setNameMessage] = useState("");
  const [reviewMessage, setReviewMessage] = useState("");
  // 유효성 검사
  const [nameValidation, setNameValidation] = useState(false);
  const [reviewValidation, setReviewValidation] = useState(false);
  const [imgValidation, setImgValidation] = useState(false);
  const [rateValidation, setRateValidation] = useState(false);
  const [store, setStore] = useState(false);
  // 제목
  const titleHandler = (e) => {
    const { value } = e.target;
    setReview({ ...review, productNm: value });
    if (review.productNm.length < 5) {
      setNameMessage("5글자 이상 작성해주세요");
    } else {
      setNameMessage("");
      setNameValidation(true);
    }
  };
  // 내용
  const textHandler = (e) => {
    setReview({ ...review, review: e.target.value });
    if (review.review.length < 20) {
      setReviewMessage("20글자 이상 작성해주세요");
    } else {
      setReviewMessage("");
      setReviewValidation(true);
    }
  };
  // 별점
  const ratingHandler = (rating) => {
    setReview({ ...review, reviewRate: rating });
    setRateValidation(true);
  };
  // 이미지
  const imgHandler = (e) => {
    e.preventDefault();
    imgRef.current.click();
  };
  // 이미지 저장
  const saveFileImage = (e) => {
    const { files } = e.target;
    setReview({
      ...review,
      productImg: [URL.createObjectURL(files[0])],
    });
    setImgValidation(true);
  };
  // 리뷰 등록하기
  const submit = (e) => {
    e.preventDefault();
    if (!store) {
      alert("필수항목을 입력해주세요");
    } else {
      dispatch(addReview(review));
      navigate("/");
    }
  };
  // 유효성 검사
  useEffect(() => {
    if (nameValidation && reviewValidation && imgValidation && rateValidation) {
      setStore(true);
    }
  }, [
    review,
    nameValidation,
    reviewValidation,
    imgValidation,
    rateValidation,
    store,
  ]);
  // test useEfeect
  // useEffect(() => {
  //   console.log(review);
  // }, [review]);
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
            nameMessage={nameMessage}
          />
          <AlertMessage>{nameMessage}</AlertMessage>
        </Section>
        <Section>
          <Name>내용</Name>
          <Contents
            type="text"
            maxLength={250}
            placeholder="리뷰 내용을 작성해주세요"
            onChange={textHandler}
            reviewMessage={reviewMessage}
          />
          <AlertMessage>{reviewMessage}</AlertMessage>
        </Section>
        <ImgSection>
          <Preview>
            {review.productImg.length >= 1 &&
              review.productImg.map((img, index) => (
                <Img alt="preview" key={index} src={img} />
              ))}
          </Preview>
          <input
            style={{ display: "none" }}
            ref={imgRef}
            type="file"
            accept="image/*"
            onChange={saveFileImage}
            multiple
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
                setRateValidation={setRateValidation}
              />
            ))}
          </Rating>
        </Section>
        <Btn store={store} onClick={submit}>
          리뷰 등록하기
        </Btn>
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
  &:nth-child(2) {
    margin-top: 1rem;
  }
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
  border: 1px solid
    ${({ theme, nameMessage }) => (nameMessage ? "red" : theme.colors.grey)};
  box-sizing: border-box;
  border-radius: 5px;
  width: 100%;
  height: 2.5rem;
  padding: 0.5rem;
  font-size: 1rem;
`;
const Contents = styled.textarea`
  box-sizing: border-box;
  border: 1px solid
    ${({ theme, reviewMessage }) => (reviewMessage ? "red" : theme.colors.grey)};
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
const Preview = styled.div`
  ${({ theme }) => theme.common.flexRow};
  width: 100%;
`;
const Img = styled.img`
  width: 6rem;
  border-radius: 50%;
  margin-right: 0.5rem;
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
  opacity: ${({ store }) => store === false && "0.4"};
`;

const AlertMessage = styled.div`
  color: red;
  font-size: 0.8rem;
  margin: 0.5rem;
`;
