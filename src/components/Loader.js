import { memo } from "react";
import ReactLoading from "react-loading";
import styled from "styled-components";

const Loader = () => {
  return (
    <LoaderWrap>
      <Container>
        <ReactLoading type="spin" color="#999999" />
      </Container>
    </LoaderWrap>
  );
};
const LoaderWrap = styled.div`
  width: 100%;
  height: 50vh;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  position: absolute;
`;
const Container = styled.div`
  border-radius: 12px;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.8);
`;

export default memo(Loader);
