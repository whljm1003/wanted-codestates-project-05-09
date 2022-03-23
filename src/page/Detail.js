import React from "react";
import styled from "styled-components";
import ItemDetail from "../components/ItemDetail";
import Header from "../components/Header";
function Detail() {
  const item = {
    id: "d710dabc-9af7-11ec-b909-0242ac120002",
    productNm: "여성 스웨터",
    productImg: [
      "https://i.balaan.io/review/00ea8946346246c2096e70ffa5c96ca0.webp",
    ],
    createDt: 1646265600,
    review: "색감이 두께나 초봄에 입기 좋을 것 같습니다!",
    reviewRate: 5,
    likeCnt: 14,
    comments: [],
  };

  return (
    <Wrapper>
      <Header />
      <ItemDetail item={item} />
    </Wrapper>
  );
}

export default Detail;

const Wrapper = styled.div`
  background-color: ${({ theme }) => theme.colors.white};
  max-width: 420px;
  margin: 0 auto;
  height: 100vh;
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;
