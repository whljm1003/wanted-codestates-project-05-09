import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { increaseLike, decreaseLike } from "../store/dataSlice";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { BsShareFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import ShareModal from "./ShareModal";

const star = [1, 2, 3, 4, 5];

function ListView({ data }) {
  const [isLoading, setIsLoading] = useState(false);
  const [isShareModal, setIsShareModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const date = (createDt) =>
    new Date(createDt).toLocaleDateString("ko", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  // 좋아요 기능
  const increase = (id) => dispatch(increaseLike(id));
  const decrease = (id) => dispatch(decreaseLike(id));
  // 공유하기 모달 오픈
  const shareHandler = () => setIsShareModal(true);
  // 디테일 페이지 이동
  const goToDetail = (id) => {
    navigate(`/detail/${id}`);
  };
  // 로딩
  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  return (
    <Wrapper>
      {isLoading && <Loader />}
      {isShareModal && <ShareModal setIsShareModal={setIsShareModal} />}
      {data.map((item, index) => (
        <Container key={index}>
          <Img src={item.productImg} onClick={() => goToDetail(item.id)} />
          <Info>
            <LikeSection>
              <div className="left">
                <LikeIcon>
                  {!item.clicked ? (
                    <AiOutlineLike onClick={() => increase(item.id)} />
                  ) : (
                    <AiFillLike onClick={() => decrease(item.id)} />
                  )}
                </LikeIcon>
                <span>{item.likeCnt}</span>
              </div>
              <div className="right">
                <ShareIcon onClick={shareHandler}>
                  <BsShareFill />
                </ShareIcon>
              </div>
            </LikeSection>
            <Rating>
              {star.map((start, index) => (
                <Star
                  key={index}
                  color={item.reviewRate >= start ? "#fbc531" : null}
                />
              ))}
            </Rating>
            <h1 className="title">{item.productNm}</h1>
            <textarea className="text" readOnly value={item.review} />
            <div className="date">{date(item.createDt)}</div>
          </Info>
        </Container>
      ))}
    </Wrapper>
  );
}
export default ListView;

const Wrapper = styled.div`
  position: relative;
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  z-index: -10;
  cursor: pointer;
`;
const Img = styled.img`
  width: 100%;
`;
const Info = styled.div`
  margin: 1rem 0;
  padding: 1rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  .title {
    font-size: 1.2rem;
    font-weight: 800;
  }
  .text {
    width: 100%;
    resize: none;
    border: none;
    overflow: hidden;
    outline: none;
    font-size: 1rem;
    font-weight: 600;
    margin: 0.5rem 0;
  }
  .date {
    font-size: 1rem;
    font-weight: 600;
  }
`;
const LikeSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.3rem;
  font-weight: 700;
  margin-bottom: 1rem;
  .left {
    ${({ theme }) => theme.common.flexRow}
    gap: 0.5rem;
    & > span {
      font-size: 1.3rem;
    }
  }
  .right {
    ${({ theme }) => theme.common.flexRow}
  }
`;
const LikeIcon = styled.div`
  cursor: pointer;
`;

const ShareIcon = styled.div`
  cursor: pointer;
`;
const Rating = styled.div`
  margin-bottom: 1rem;
`;
const Star = styled(FaStar)`
  margin-right: 0.3rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.lightGrey};
`;
