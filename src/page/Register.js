import React from 'react';
import styled from 'styled-components';
import Header from '../components/Header';

function Register() {
  return (
    <Wrapper>
      <Header />
      Register 페이지
    </Wrapper>
  );
}

export default Register;

const Wrapper = styled.div`
  background-color: white;
  max-width: 420px;
  margin: 0 auto;
  width: 100%;
  height: 100vh;
`;
