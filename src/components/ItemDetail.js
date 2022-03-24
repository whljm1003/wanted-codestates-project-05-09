import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { increaseLike, decreaseLike, addComments } from "../store/dataSlice";
import { AiOutlineLike, AiFillLike } from "react-icons/ai";
import { BsShareFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";
import { useParams } from "react-router-dom";
import ShareModal from "./ShareModal";

const star = [1, 2, 3, 4, 5];

function ItemDetail() {
  const [item, setItem] = useState({});
  const [comment, setComment] = useState("");
  const [isShareModal, setIsShareModal] = useState(false);
  const dataInfo = useSelector((state) => state.data.data);
  const dispatch = useDispatch();
  const id = useParams();
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
  const openModal = () => setIsShareModal(true);
  // url id 값으로 데이터 찾기
  const getItem = () => {
    const data = dataInfo.filter((item) => item.id === id.id);
    setItem(data[0]);
  };
  // 댓글 상태 관리
  const commnetHandler = (e) => {
    setComment(e.target.value);
  };
  // 댓글 리덕스 상태에 추가
  const addComment = (e) => {
    e.preventDefault();
    dispatch(addComments({ id, comment }));
    setComment("");
  };
  // 댓글 추가 되면 리덕스 다시 호출
  useEffect(() => {
    getItem();
  }, [item, dataInfo]);

  return (
    <>
      <Wrapper>
        {isShareModal && <ShareModal setIsShareModal={setIsShareModal} />}
        <Img src={item?.productImg} />
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
              <span>{item?.likeCnt}</span>
            </div>
            <div className="right">
              <ShareIcon onClick={openModal}>
                <BsShareFill />
              </ShareIcon>
            </div>
          </LikeSection>
          <Rating>
            {star.map((start, index) => (
              <Star
                key={index}
                color={item?.reviewRate >= start ? "#fbc531" : null}
              />
            ))}
          </Rating>
          <h1 className="title">{item?.productNm}</h1>
          <textarea className="text" readOnly value={item?.review} />
          <div className="date">{date(item?.createDt)}</div>
        </Info>
        <CommentsSection onSubmit={addComment}>
          {item.comments?.map((comment) => (
            <div className="section" key={comment.commentId}>
              <span className="commentsId">
                {comment.commentId.slice(0, 8)}
              </span>
              <span className="comment">{comment.comment}</span>
            </div>
          ))}
          <Form>
            <Input
              type="text"
              placeholder="댓글 달기"
              value={comment}
              onChange={commnetHandler}
            />
            <Button>게시</Button>
          </Form>
        </CommentsSection>
      </Wrapper>
    </>
  );
}
export default ItemDetail;

const Wrapper = styled.div`
  width: 100%;
  position: relative;
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
const CommentsSection = styled.div`
  font-size: 1.2rem;
  .section {
    display: flex;
    align-items: center;
    margin-bottom: 0.3rem;
  }
  .commentsId {
    color: ${({ theme }) => theme.colors.lightGold};
    padding: 0 1rem;
    font-weight: 700;
    font-size: 1.2rem;
  }
  .comment {
    color: ${({ theme }) => theme.colors.darkGrey};
    font-weight: 5200;
    font-size: 1rem;
  }
`;
const Form = styled.form`
  ${({ theme }) => theme.common.flexRow}
  margin: 2rem 0;
`;

const Input = styled.input`
  width: 60%;
  line-height: 3rem;
  border-radius: 4rem 0 0 4rem;
  padding-left: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  border-right: 0;
  font-size: 1rem;
  outline: none;
`;
const Button = styled.button`
  border-radius: 0 4rem 4rem 0;
  line-height: 3rem;
  width: 5rem;
  cursor: pointer;
  outline: none;
  border: 1px solid ${({ theme }) => theme.colors.lightGrey};
  border-left: 0;
  color: ${({ theme }) => theme.colors.darkGrey};
  font-weight: 600;
  font-size: 1rem;
`;
