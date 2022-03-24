import React from "react";
import styled from "styled-components";
import icon from "../assets/logo.png";
import x_icon from "../assets/x_icon.png";
import back_icon from "../assets/back_icon.png";
import { Link } from "react-router-dom";

function Header({ isDetail }) {
  return (
    <Container>
      {isDetail ? (
        <>
          <Span>
            <Link to="/">
              <img className="back_icon" alt="back_icon" src={back_icon} />
            </Link>
          </Span>
          <Review>리뷰 상세보기</Review>
          <Span>
            <Link to="/">
              <img className="x_icon" alt="x_icon" src={x_icon} />
            </Link>
          </Span>
        </>
      ) : (
        <>
          <Title>
            <Link to="/">
              <img className="logo" alt="logo" src={icon} />
            </Link>
          </Title>
          <Link to="/register">
            <Btn>리뷰 등록</Btn>
          </Link>
        </>
      )}
    </Container>
  );
}
export default Header;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto 1rem auto;
  max-width: 428px;
  padding: 0 15px;
  height: 4rem;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.lightGrey};
`;
const Title = styled.div`
  display: inline-block;
  cursor: pointer;
  .logo {
    width: 10rem;
    height: 1.7rem;
  }
`;
const Btn = styled.button`
  width: 4.5rem;
  height: 2rem;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
`;

const Span = styled.span`
  .x_icon {
    height: 1.7rem;
  }
  .back_icon {
    height: 1.7rem;
  }
`;
const Review = styled.span`
  line-height: 1.7rem;
  font-size: 1.3rem;
  font-weight: 800;
`;
