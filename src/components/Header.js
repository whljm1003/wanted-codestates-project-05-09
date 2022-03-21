import React from 'react';
import styled from 'styled-components';
import icon from '../assets/logo.png';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const goToHome = () => {
    navigate('/');
  };

  const BtnHandler = () => {
    console.log('register 컴포넌트 호출!!');
  };

  return (
    <Container>
      <Title onClick={goToHome}>
        <img className="logo" alt="logo" src={icon} />
      </Title>
      <Btn onClick={BtnHandler}>리뷰 등록</Btn>
    </Container>
  );
}

export default Header;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto 0.5rem auto;
  max-width: 428px;
  padding: 0 15px;
  height: 5vh;
  background-color: ${({ theme }) => theme.colors.white};
  border-bottom: 0.5px solid ${({ theme }) => theme.colors.grey};
`;
const Title = styled.div`
  display: inline-block;
  cursor: pointer;
  .logo {
    width: 11rem;
    height: 2rem;
  }
`;
const Btn = styled.button`
  width: 5rem;
  height: 2rem;
  border-radius: 12px;
  background-color: ${({ theme }) => theme.colors.black};
  color: ${({ theme }) => theme.colors.white};
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
`;
