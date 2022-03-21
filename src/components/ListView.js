import react from "react";
import styled from "styled-components";
import datas from "../assets/data";
import { BiLike } from "react-icons/bi";
import { BsShareFill } from "react-icons/bs";
import { FaStar } from "react-icons/fa";

function ListView() {
  const likeCounteHandler = () => {
    console.log("1증가해라!");
  };
  const shareHandler = () => {
    console.log("공유해랏!");
  };
  return (
    <>
      {datas.map((data) => (
        <Wrapper key={data.id}>
          <Img src={data.productImg} />
          <Info>
            <LikeSection>
              <div className="left">
                <LikeIcon onClick={likeCounteHandler} />
                <span>{data.likeCnt}</span>
              </div>
              <div className="right">
                <ShareIcon onClick={shareHandler} />
              </div>
            </LikeSection>
            <Rating>
              <Star />
              <Star />
              <Star />
              <Star />
              <Star />
            </Rating>
            <h1 className="title">{data.productNm}</h1>
            <textarea className="text" readOnly value={data.review} />
            <div className="date">2022.10.03</div>
          </Info>
        </Wrapper>
      ))}
    </>
  );
}

export default ListView;

const Wrapper = styled.div`
  width: 100%;
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
      font-size: 1.5rem;
    }
  }
  .right {
    ${({ theme }) => theme.common.flexRow}
  }
`;

const LikeIcon = styled(BiLike)`
  cursor: pointer;
`;

const ShareIcon = styled(BsShareFill)`
  cursor: pointer;
`;

const Rating = styled.div`
  margin-bottom: 1rem;
`;

const Star = styled(FaStar)`
  margin-right: 0.3rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.grey};
`;
